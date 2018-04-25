const { partialRight, flowRight, last, flattenDeep, uniqBy, sortBy } = require('lodash');

const REGULAR_TAGS = ['v5u', 'v5t', 'v5r', 'v5n', 'v5m', 'v5b', 'v5k', 'v5g', 'v5s', 'v1'];
const IRREGULAR_TAGS = ['vs', 'vk', 'v5k-s'];
const TAGS = [...REGULAR_TAGS, ...IRREGULAR_TAGS];

const isV1 = (tag) => tag === 'v1';
const derivePassive = ({ value, tag }) => `${value}${isV1(tag) ? 'ら' : ''}れる`;
const deriveCausative = ({ value, tag }) => `${value}${isV1(tag) ? 'さ' : ''}せる`;
const deriveCausativePassive = ({ value, tag }) => `${value}${isV1(tag) ? 'さ' : ''}せられる`;
const deriveCausativeAlt = ({ value, tag }) => `${value}${isV1(tag) ? 'さ' : ''}す`;
const deriveCausativePassiveAlt = ({ value, tag }) => (isV1(tag) ? '' : `${value}される`);

const append = (str = '') => ({ value = '' } = {}) => value + str;
const strip = (str = '') => ({ value = '' } = {}) => value.replace(RegExp(`/${str}$/i`), '');
const isIrregularVerb = (tag) => IRREGULAR_TAGS.includes(tag);
const isRegularVerb = (tag) => REGULAR_TAGS.includes(tag);

const STEMS = {
  PLAIN: {
    v5u: 'う',
    v5t: 'つ',
    v5r: 'る',
    v5n: 'ぬ',
    v5m: 'む',
    v5b: 'ぶ',
    v5k: 'く',
    v5g: 'ぐ',
    v5s: 'す',
    v1: 'る',
  },
  CONJUNCTIVE: {
    v5u: 'い',
    v5t: 'ち',
    v5r: 'り',
    v5n: 'に',
    v5m: 'み',
    v5b: 'び',
    v5k: 'き',
    v5g: 'ぎ',
    v5s: 'し',
    v1: '',
  },
  POLITE: {
    v5u: 'い',
    v5t: 'ち',
    v5r: 'り',
    v5n: 'に',
    v5m: 'み',
    v5b: 'び',
    v5k: 'き',
    v5g: 'ぎ',
    v5s: 'し',
    v1: '',
  },
  IMPERFECTIVE: {
    v5u: 'わ',
    v5t: 'た',
    v5r: 'ら',
    v5n: 'な',
    v5m: 'ま',
    v5b: 'ば',
    v5k: 'か',
    v5g: 'が',
    v5s: 'さ',
    v1: '',
  },
  IMPERATIVE: {
    v5u: 'え',
    v5t: 'て',
    v5r: 'れ',
    v5n: 'ね',
    v5m: 'め',
    v5b: 'べ',
    v5k: 'け',
    v5g: 'げ',
    v5s: 'せ',
    v1: 'ろ',
  },
  CONDITIONAL: {
    v5u: 'えば',
    v5t: 'てば',
    v5r: 'れば',
    v5n: 'ねば',
    v5m: 'めば',
    v5b: 'べば',
    v5k: 'けば',
    v5g: 'げば',
    v5s: 'せば',
    v1: 'れば',
  },
  POTENTIAL: {
    v5u: 'える',
    v5t: 'てる',
    v5r: 'れる',
    v5n: 'ねる',
    v5m: 'める',
    v5b: 'べる',
    v5k: 'ける',
    v5g: 'げる',
    v5s: 'せる',
    v1: 'られる',
  },
  VOLITIONAL: {
    v5u: 'おう',
    v5t: 'とう',
    v5r: 'ろう',
    v5n: 'のう',
    v5m: 'もう',
    v5b: 'ぼう',
    v5k: 'こう',
    v5g: 'ごう',
    v5s: 'そう',
    v1: 'よう',
  },
  TE: {
    v5u: 'って',
    v5t: 'って',
    v5r: 'って',
    v5n: 'んで',
    v5m: 'んで',
    v5b: 'んで',
    v5k: 'いて',
    v5g: 'いで',
    v5s: 'して',
    v1: 'て',
  },
  TA: {
    v5u: 'った',
    v5t: 'った',
    v5r: 'った',
    v5n: 'んだ',
    v5m: 'んだ',
    v5b: 'んだ',
    v5k: 'いた',
    v5g: 'いだ',
    v5s: 'した',
    v1: 'た',
  },
};

const getBase = ({ value = '', tag = '' } = {}) => {
  const canDerive = isRegularVerb(tag) && Object.values(STEMS.PLAIN).includes(last(value));
  if (!canDerive) throw Error('Cannot derive base');
  return value.slice(0, -1);
};

const getStem = ({ form = '', tag = '' } = {}) => append(STEMS[form][tag])({ value: '' });

//-----------------------------------------------------------------------------
//  PLAIN FORM 辞書形 じしょけい
//-----------------------------------------------------------------------------
const PLAIN = {
  form: 'PLAIN',
  derive: getStem,
  desc: 'non-past',
  forms: {
    /*    NA: { derive: append('な'), desc: 'negative imperative', form: 'NA',  },
    TO: { derive: append('と'), desc: 'if ~ definitely...', form: 'TO',  },
    GA_HAYAI_KA: { derive: append('がはやいか'), desc: 'as soon as', form: 'GA_HAYAI_KA',  },
    TOMONAKU: { derive: append('ともなく'), desc: 'without intent', form: 'TOMONAKU',  },
    BEKI: { derive: append('べき'), desc: 'idealistic should', form: 'BEKI',  },
    MAI: { derive: append('まい'), desc: 'negative volitional, formal', form: 'MAI',  },
    MITAI: { derive: append('みたい'), desc: 'seems that ~', form: 'MITAI', tag: 'adj-i' },
    SOU: { derive: append('そう'), desc: 'claimed to be ~', form: 'SOU',  },
    RASHII: { derive: append('らしい'), desc: 'apparently', form: 'RASHII', tag: 'adj-i' },
    HAZU: { derive: append('はず'), desc: 'expectation', form: 'HAZU',  },
    NARA: { derive: append('なら'), desc: 'contextual if', form: 'NARA',  },
    TSUMORI: { derive: append('つもり'), desc: 'intention', form: 'TSUMORI',  }, */
  },
};

//-----------------------------------------------------------------------------
//  CONJUNCTIVE 連用形 れんようけい
//-----------------------------------------------------------------------------
const CONJUNCTIVE = {
  form: 'CONJUNCTIVE',
  derive: getStem,
  desc: 'conjunctive',
  forms: {
    TAI: { derive: append('たい'), desc: "speaker's desire", form: 'TAI', tag: 'adj-i' },
    TAGARU: { derive: append('たがる'), desc: "non-speaker's desire", form: 'TAGARU', tag: 'v5r' },
    NAGARA: { derive: append('ながら'), desc: 'while ~ing', form: 'NAGARA' },
    GACHI: { derive: append('がち'), desc: 'tends to ~', form: 'GACHI' },
    KATA: { derive: append('かた'), desc: 'way of ~ing', form: 'KATA' },
    SOU: { derive: append('そう'), desc: 'looks to be ~', form: 'SOU' },
    TSUTSU: { derive: append('つつ'), desc: 'continuing to ~', form: 'TSUTSU' },
    YAGARU: { derive: append('やがる'), desc: 'yakuza rude', form: 'YAGARU', tag: 'v5r' },
    SUGIRU: { derive: append('すぎる'), desc: 'excess ~', form: 'SUGIRU', tag: 'v5r' },
    YASUI: { derive: append('やすい'), desc: 'easy to ~', form: 'YASUI', tag: 'adj-i' },
    NIKUI: { derive: append('にくい'), desc: 'difficult to ~', form: 'NIKUI', tag: 'adj-i' },
  },
};

const POLITE = {
  form: 'POLITE',
  derive: getStem,
  desc: 'polite',
  forms: {
    MASU: { derive: append('ます'), form: 'MASU', desc: 'non-past' },
    MASEN: { derive: append('ません'), form: 'MASEN', desc: 'negative' },
    MASENU: { derive: append('ませぬ'), form: 'MASENU', desc: 'negative, archaic' },
    MASHITA: { derive: append('ました'), form: 'MASHITA', desc: 'past' },
    MASHOU: { derive: append('ましょう'), form: 'MASHOU', desc: 'volitional' },
    MASHITE: { derive: append('まして'), form: 'MASHITE', desc: 'conjunctive' },
    MASUREBA: { derive: append('ますれば'), form: 'MASUREBA', desc: 'conditional' },
    NASAI: { derive: append('なさい'), form: 'NASAI', desc: 'authoritative' },
    NA: { derive: append('な'), form: 'NA', desc: 'imperative informal' },
  },
};

//-----------------------------------------------------------------------------
//  IMPERFECTIVE 未然形 みぜんけい
//-----------------------------------------------------------------------------
const IMPERFECTIVE = {
  form: 'IMPERFECTIVE',
  derive: getStem,
  desc: 'imperfective',
  forms: {
    NAI: { derive: append('ない'), form: 'NAI', desc: 'negative', tag: ' adj-i' },
    N: { derive: append('ん'), form: 'N', desc: 'curt negative, informal, archaic' },
    ZU: { derive: append('ず'), form: 'ZU', desc: 'negative perfect' },
    NAIDE: { derive: append('ないで'), form: 'NAIDE', desc: 'without ~ing' },
    ZUNI: { derive: append('ずに'), form: 'ZUNI', desc: 'without ~ing, formal' },
    NAKUTE: { derive: append('なくて'), form: 'TE', desc: 'negative て form' },
    NAKATTA: { derive: append('なかった'), form: 'TA', desc: 'negative た form' },
    /*  NAIDE_KUDASAI: {
      derive: append('ないでください'),
      form: 'NAIDE_KUDASAI',
      desc: 'negative request'
    }, */
    NAKEREBA: {
      derive: append('なければ'),
      form: 'CONDITIONAL',
      desc: 'negative conditional',
    },
    NAKYA: {
      derive: append('なきゃ'),
      form: 'NAKYA',
      desc: 'obligation, informal',
    },
    /*     NAITO: {
      derive: append('ないと'),
      form: 'NAITO',
      desc: 'obligation, informal'
    }, */
    NAKUCHA: {
      derive: append('なくちゃ'),
      form: 'NAKUCHA',
      desc: 'obligation, informal',
    },
    PASSIVE: { derive: derivePassive, form: 'PASSIVE', desc: 'passive', tag: 'v1' },
    CAUSATIVE: { derive: deriveCausative, form: 'CAUSATIVE', desc: 'causative', tag: ' v1' },
    CAUSATIVE_PASSIVE: {
      derive: deriveCausativePassive,
      form: 'CAUSATIVE_PASSIVE',
      desc: 'causative passive',
      tag: ' v1',
    },
    CAUSATIVE_ALT: {
      derive: deriveCausativeAlt,
      form: 'CAUSATIVE_ALT',
      desc: 'causative alternative',
      tag: ' v5s',
    },
    CAUSATIVE_PASSIVE_ALT: {
      derive: deriveCausativePassiveAlt,
      form: 'CAUSATIVE_PASSIVE_ALT',
      desc: 'causative passive alternative',
      tag: ' v1',
    },
  },
};

//-----------------------------------------------------------------------------
//  IMPERATIVE 命令形 めいれいけい
//-----------------------------------------------------------------------------
const IMPERATIVE = {
  form: 'IMPERATIVE',
  derive: getStem,
  desc: 'imperative',
  forms: {},
};

//-----------------------------------------------------------------------------
//   HYPOTHETICAL 仮定形 かていけい
//-----------------------------------------------------------------------------
const CONDITIONAL = {
  form: 'CONDITIONAL',
  derive: getStem,
  desc: '~ba conditional',
  forms: {
    // FIXME: objects
    /*     いい: 'I should ~',
    よかった: 'I should have ~', */
  },
};

const POTENTIAL = {
  form: 'POTENTIAL',
  derive: getStem,
  desc: 'potential',
  forms: {},
  tag: 'v1',
};

//-----------------------------------------------------------------------------
//   VOLITIONAL 推量刑 すいりょうけい
//-----------------------------------------------------------------------------
const VOLITIONAL = {
  form: 'VOLITIONAL',
  derive: getStem,
  desc: 'volitional',
  forms: {},
};

//-----------------------------------------------------------------------------
//  TE テ刑
//-----------------------------------------------------------------------------
const TE = {
  form: 'TE',
  derive: getStem,
  desc: 'te form',
  forms: {
    /*     いく: 'changing state', // -> irregular 行く
    ある: 'changed state', // -> irregular 有る (negative)
    おり: 'conjunctive, formal',
    くる: 'state change', // -> irregular vk
    おる: 'continuous, archaic', // irregular humble 居る
    とる: 'continuous, archaic, informal', // irregular humble 居る // NOTE: need to slice って・て
    いる: 'continuous, habitual', // -> v1
    る: 'continuous, habitual, informal', // -> v1
    おく: 'preparatory', // v5k
    く: 'preparatory, informal', // v5k //
    しまう: 'completed, unintentional', // -> v5u
    ちゃう: 'completed, unintentional, informal', // -> v5u NOTE: need to slice て・って
    じゃう: 'completed, unintentional, informal', // -> v5u NOTE: need to slice で・っで
    よかった: 'glad that...',
    みる: 'try ~ and see',
    ほしい: 'favour request',
    から: 'after ~ing...',
    はいけない: 'must not ~',
    はならない: 'must not ~',
    はだめ: 'must not ~',
    もかまわない: 'permissive',
    もいい: 'permissive',
    いい: 'permissive, informal',
    すみません: 'apologetic',
    も: 'even though ~',
    ください: 'request', // -> honorific irregular
    あげる: 'benefit',
    げる: 'benefit, informal, simplified',
    くれる: 'benefit',
    もらう: 'benefit', */
  },
};

//-----------------------------------------------------------------------------
//  TA タ刑
//-----------------------------------------------------------------------------
const TA = {
  form: 'TA',
  derive: getStem,
  desc: 'ta form',
  forms: {
    RI: { derive: append('り'), desc: 'representative', form: 'RI' },
    RA: { derive: append('ら'), desc: 'if/when ~', form: 'RA' },
    ROU: { derive: append('ろう'), desc: 'past volitional, rare', form: 'ROU' },
    /*
    // FIXME: objects
    から: '...because ~',
    ところ: 'just happened',
    ばかり: 'just happened',
    ほうがいい: 'suggestive',
    ことがある: 'past experience',
    だろう: 'past presumptive', */
  },
};

const BASE_FORMS = [
  PLAIN,
  CONJUNCTIVE,
  POLITE,
  IMPERFECTIVE,
  IMPERATIVE,
  CONDITIONAL,
  POTENTIAL,
  VOLITIONAL,
  TE,
  TA,
];

const buildStems = (data = {}) =>
  BASE_FORMS.reduce((obj, baseForm) => {
    const stem = baseForm.derive({ ...data, form: baseForm.form });
    const derivations = Object.values(baseForm.forms).map(({ derive, ...rest }) => ({
      value: derive({ tag: data.tag, ...baseForm, value: stem }),
      ...rest,
    }));
    const baseDetail = {
      value: stem,
      desc: baseForm.desc,
      form: baseForm.form,
      derivations,
    };
    if (baseForm.tag) {
      baseDetail.tag = baseForm.tag;
    }
    return Object.assign(obj, { [baseForm.form]: baseDetail });
  }, {});

const buildInflections = (stems, base) => {
  const addStemToBase = (stem = '') => append(stem)({ value: base });
  return flowRight(
    partialRight(uniqBy, 'value'),
    partialRight(sortBy, ({ value }) => value.length),
    flattenDeep
  )(
    Object.values(stems).map((root) => [
      { value: addStemToBase(root.value), desc: root.desc, path: [root.form] },
      ...root.derivations.map((derivation) => ({
        value: addStemToBase(derivation.value),
        desc: `${root.desc} + ${derivation.desc}`,
        path: [root.form, derivation.form],
      })),
    ])
  );
};

const inflect = ({ value = '', tag = '' } = {}) => {
  if (!value || !TAGS.includes(tag)) throw Error('A valid value and tag must be provided.');
  const data = { value, tag };
  const base = getBase(data);
  const stems = buildStems(data);
  const inflections = buildInflections(stems, base);

  return {
    stems,
    inflections,
  };
};