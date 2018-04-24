export const REGULAR_TAGS = ['v5u', 'v5t', 'v5r', 'v5n', 'v5m', 'v5b', 'v5k', 'v5g', 'v5s', 'v1'];
export const withTagsFrom = (source = {}, target = {}, transform) => {
  REGULAR_TAGS.reduce(
    (acc, tag) => {
      acc[tag] = transform ? transform(tag, source[tag]) : source[tag];
      return acc;
    },
    { ...target }
  );
};

// TODO: forms should be functions since some aren't prefixes only (IE: honorific)
// TODO: forms will need explicit branch identifiers (currently as line comments with "->")

// propably want to pass an object to inner function instead?
const append = (str = '') => (value = '') => value + str;
//-----------------------------------------------------------------------------
//  PLAIN FORM 辞書形 じしょけい
//-----------------------------------------------------------------------------
export const PLAIN = {
  stems: {
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
  forms: {
    NA: { derive: append('な'), desc: 'negative imperative', tag: '' },
    TO: { derive: append('と'), desc: 'if ~ definitely...', tag: '' },
    GA_HAYAI_KA: { derive: append('がはやいか'), desc: 'as soon as', tag: '' },
    TOMONAKU: { derive: append('ともなく'), desc: 'without intent', tag: '' },
    BEKI: { derive: append('べき'), desc: 'idealistic should', tag: '' },
    MAI: { derive: append('まい'), desc: 'negative volitional}, formal', tag: '' },
    MITAI: { derive: append('みたい'), desc: 'seems that ~', tag: 'adj-i' },
    SOU: { derive: append('そう'), desc: 'claimed to be ~', tag: '' },
    RASHII: { derive: append('らしい'), desc: 'apparently', tag: 'adj-i' },
    HAZU: { derive: append('はず'), desc: 'expectation', tag: '' },
    NARA: { derive: append('なら'), desc: 'contextual if', tag: '' },
    TSUMORI: { derive: append('つもり'), desc: 'intention', tag: '' },
  },
};

//-----------------------------------------------------------------------------
//  CONJUNCTIVE 連用形 れんようけい
//-----------------------------------------------------------------------------
export const CONJUNCTIVE = {
  v5u: '使い',
  v5t: '待ち',
  v5r: '走り',
  v5n: '死に',
  v5m: '読み',
  v5b: '呼び',
  v5k: '焼き',
  v5g: '泳ぎ',
  v5s: '示し',
  v1: '食べ',
  forms: {
    たい: "speaker's desire", // -> adj-i
    たがる: "non-speaker's desire", // -> v5r
    はしない: 'strong negative desire',
    ながら: 'while ~ing',
    がち: 'tends to ~',
    かた: 'way of ~ing',
    そう: 'looks to be ~',
    つつ: 'continuing to ~',
    やがる: 'yakuza rude',
    すぎる: 'excess ~', // -> v5r
    にいく: 'go and do ~',
    やすい: 'easy to ~', // -> adj-i
    にくい: 'difficult to ~', // -> adj-i
    もの: 'noun for verb target',
  },
};

export const POLITE = withTagsFrom(CONJUNCTIVE, {
  forms: {
    ます: 'non-past',
    ません: 'negative',
    ませぬ: 'negative, archaic',
    ました: 'past',
    ませんでした: 'past negative',
    ましょう: 'volitional',
    まして: 'conjunctive',
    ますれば: 'conditional',
    なさい: 'authoritative',
    な: 'imperative informal',
  },
});

export const createHonorific = (tag, stem) => `お${stem}になる`; // -> v5r
export const createHonorificAlt = (tag, stem) => `お${stem}なさる`; // -> irregular honorific
export const createHumble = (tag, stem) => `お${stem}する`; // -> vs-s
export const HONORIFIC = withTagsFrom(CONJUNCTIVE, {}, createHonorific);
export const HONORIFIC_ALT = withTagsFrom(CONJUNCTIVE, {}, createHonorificAlt);
export const HUMBLE = withTagsFrom(CONJUNCTIVE, {}, createHumble);

//-----------------------------------------------------------------------------
//  IMPERFECTIVE 未然形 みぜんけい
//-----------------------------------------------------------------------------
export const IMPERFECTIVE = {
  v5u: '使わ',
  v5t: '待た',
  v5r: '走ら',
  v5n: '死な',
  v5m: '読ま',
  v5b: '呼ば',
  v5k: '焼か',
  v5g: '泳が',
  v5s: '示さ',
  v1: '食べ',
  forms: {
    ない: 'negative', // -> adj-i
    ん: 'curt negative, informal, archaic', // TODO: separate into description + tags?
    ず: 'negative perfect',
    ないで: 'without ~ing',
    ずに: 'without ~ing, formal',
    なくて: 'negative て form', // -> て form
    なかった: 'negative た form', // -> た form
    ないでください: 'negative request',
    なければ: 'negative conditional',
    なければいけない: 'obligation, must/have to',
    なきゃ: 'obligation, must/have to, informal',
    ないといけない: 'obligation, must/have to',
    ないと: 'obligation, must/have to, informal',
    なくてはいけない: 'obligation, must/have to',
    なくちゃ: 'obligation, must/have to, informal',
  },
};

export const isV1 = (tag) => tag === 'v1';
export const createPassive = (tag, stem) => `${stem}${isV1(tag) ? 'ら' : ''}れる`; // -> v1
export const createCausative = (tag, stem) => `${stem}${isV1(tag) ? 'さ' : ''}せる`; // -> v1
export const createCausativePassive = (tag, stem) => `${stem}${isV1(tag) ? 'さ' : ''}せられる`; // -> v1
export const createCausativeAlt = (tag, stem) => `${stem}${isV1(tag) ? 'さ' : ''}す`; // -> v5s
export const createCausativePassiveAlt = (tag, stem) => (stem + isV1(tag) ? '' : 'られる'); // -> v5r

export const PASSIVE = withTagsFrom(IMPERFECTIVE, {}, createPassive); // -> v1
export const CAUSATIVE = withTagsFrom(IMPERFECTIVE, {}, createCausative); // -> v1
export const CAUSATIVE_PASSIVE = withTagsFrom(IMPERFECTIVE, {}, createCausativePassive); // -> v1;
export const CAUSATIVE_ALT = withTagsFrom(IMPERFECTIVE, {}, createCausativeAlt); // -> v5s
export const CAUSATIVE_PASSIVE_ALT = withTagsFrom(IMPERFECTIVE, {}, createCausativePassiveAlt); // -> v5r;

//-----------------------------------------------------------------------------
//  IMPERATIVE 命令形 めいれいけい
//-----------------------------------------------------------------------------
export const IMPERATIVE = {
  v5u: '使え',
  v5t: '待て',
  v5r: '走れ',
  v5n: '死ね',
  v5m: '読め',
  v5b: '呼べ',
  v5k: '焼け',
  v5g: '泳げ',
  v5s: '示せ',
  v1: '食べろ',
};

//-----------------------------------------------------------------------------
//  HYPOTHETICAL 仮定形 かていけい
//-----------------------------------------------------------------------------
export const createConditional = (tag, stem) =>
  isV1(tag) ? `${CONJUNCTIVE[tag]}れば` : `${stem}ば`;
export const CONDITIONAL = withTagsFrom(
  IMPERATIVE,
  {
    forms: {
      いい: 'I should ~',
      よかった: 'I should have ~',
    },
  },
  createConditional
);

export const createPotential = (tag) => (isV1(tag) ? `${CONJUNCTIVE[tag]}られる` : `${stem}る`);
export const POTENTIAL = withTagsFrom(
  IMPERATIVE,
  {},
  createPotential // -> v1
);

//-----------------------------------------------------------------------------
//   VOLITIONAL 推量刑 すいりょうけい
//-----------------------------------------------------------------------------
export const VOLITIONAL = {
  v5u: '使おう',
  v5t: '待とう',
  v5r: '走ろう',
  v5n: '死のう',
  v5m: '読もう',
  v5b: '呼ぼう',
  v5k: '焼こう',
  v5g: '泳ごう',
  v5s: '示そう',
  v1: '食べよう',
};

//-----------------------------------------------------------------------------
//  TE テ刑
//-----------------------------------------------------------------------------
export const TE = {
  v5u: '使って',
  v5t: '待って',
  v5r: '走って',
  v5n: '死んで',
  v5m: '読んで',
  v5b: '呼んで',
  v5k: '焼いて',
  v5g: '泳いで',
  v5s: '示して',
  v1: '食べて',
  forms: {
    いく: 'changing state', // -> irregular 行く
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
    もらう: 'benefit',
  },
};

//-----------------------------------------------------------------------------
//  TA タ刑
//-----------------------------------------------------------------------------
export const TA = {
  v5u: '使った',
  v5t: '待った',
  v5r: '走った',
  v5n: '死んだ',
  v5m: '読んだ',
  v5b: '呼んだ',
  v5k: '焼いた',
  v5g: '泳いだ',
  v5s: '示した',
  v1: '食べた',
  forms: {
    から: '...because ~',
    り: 'representative',
    ら: 'if/when ~',
    ところ: 'just happened',
    ばかり: 'just happened',
    ほうがいい: 'suggestive',
    ことがある: 'past experience',
    だろう: 'past presumptive',
    ろう: 'past volitional, rare',
  },
};
