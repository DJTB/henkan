const { omit, partialRight, flowRight, flattenDeep, uniqBy, sortBy } = require('lodash');

const isV1 = (tag) => tag === 'v1';

const append = (str = '') => ({ value = '' } = {}) => value + str;
const strip = (str = '') => ({ value = '' } = {}) => value.replace(RegExp(`/${str}$/i`), '');

const derivePassive = ({ value, tag }) => `${value}${isV1(tag) ? 'ら' : ''}れる`;
const deriveCausative = ({ value, tag }) => `${value}${isV1(tag) ? 'さ' : ''}せる`;
const deriveCausativePassive = ({ value, tag }) => `${value}${isV1(tag) ? 'さ' : ''}せられる`;
const deriveCausativeAlt = ({ value, tag }) => `${value}${isV1(tag) ? 'さ' : ''}す`;
const deriveCausativePassiveAlt = ({ value, tag }) => (isV1(tag) ? '' : `${value}される`);

const getStem = (stems = {}) => ({ form = '', tag = '' } = {}) => {
  if (!Object.values(stems[form]).length) {
    throw Error('Cannot derive stem');
  }
  return append(stems[form][tag])({ value: '' });
};

const buildStems = (forms = []) => (data = {}) =>
  forms.reduce((obj, entry) => {
    const stem = entry.derive({ ...data, form: entry.form });
    const derivations = entry.forms.map(({ derive, ...rest }) => ({
      value: derive({ tag: data.tag, ...entry, value: stem }),
      ...rest,
    }));
    const baseDetail = {
      value: stem,
      form: entry.form,
      path: [...data.path, entry.form],
      derivations,
    };
    if (entry.tag) {
      baseDetail.tag = entry.tag;
    }
    return Object.assign(obj, { [entry.form]: baseDetail });
  }, {});

const buildInflections = (stems = {}) => (data = {}) => {
  const addStemToBase = (stem = '') => append(stem)({ value: data.base });

  const inflectForm = (entry = {}) => ({
    ...omit(entry, ['derivations', 'form']),
    value: addStemToBase(entry.value),
    path: [...data.path, entry.form],
  });

  const inflectSubForm = ({ path = [] } = {}) => (derivation = {}) => ({
    ...omit(derivation, ['form']),
    value: addStemToBase(derivation.value),
    path: [...path, derivation.form],
  });

  const inflected = Object.values(stems).map((root) => [
    inflectForm(root),
    ...root.derivations.map(inflectSubForm(root)),
  ]);

  return flowRight(
    partialRight(uniqBy, 'value'),
    // TODO: re-enable when derivations finished checking
    //    partialRight(sortBy, ({ value }) => value.length),
    flattenDeep
  )(inflected);
};

module.exports = {
  isV1,
  append,
  strip,
  derivePassive,
  deriveCausative,
  deriveCausativePassive,
  deriveCausativeAlt,
  deriveCausativePassiveAlt,
  getStem,
  buildStems,
  buildInflections,
};
