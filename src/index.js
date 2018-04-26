const { REGULAR_TAGS, BASE_FORMS } = require('./constants/regularVerbs');
const { buildStems, buildInflections } = require('./utils');

// const IRREGULAR_TAGS = ['vs', 'vk', 'v5k-s'];
const TAGS = [...REGULAR_TAGS];
// const isIrregularVerb = (tag) => IRREGULAR_TAGS.includes(tag);

const inflect = ({ value = '', tag = '', desc = '', form = '', path = [] } = {}) => {
  if (!value || !TAGS.includes(tag)) {
    throw Error('A valid value and tag must be provided.');
  }
  // FIXME: if not plain form / regular verb, base creation will likely have to change
  const data = { value, base: value.slice(0, -1), tag, desc, form, path };
  const stems = buildStems(BASE_FORMS)(data);
  const inflections = buildInflections(stems)(data);

  return inflections;
};

const first = inflect({
  value: '示す',
  tag: 'v5s',
});

// FIXME: figure out a whitelist or blacklist for reinflecting
// NOTE: probably need to store whitelist on forms/subforms themselves, since there seem to be a lot of variations/combos
const second = first.map(
  (entry) => (TAGS.includes(entry.tag) ? { ...entry, derivationsToCheck: inflect(entry) } : entry)
);

const fs = require('fs');
fs.writeFileSync('derps.json', JSON.stringify(second));

module.exports = {
  inflect,
};
