const {
  append,
  getStem,
  derivePassive,
  deriveCausative,
  deriveCausativePassive,
  deriveCausativeAlt,
  deriveCausativePassiveAlt,
} = require('../utils');

const REGULAR_TAGS = ['v5u', 'v5t', 'v5r', 'v5n', 'v5m', 'v5b', 'v5k', 'v5g', 'v5s', 'v1'];

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

//-----------------------------------------------------------------------------
//  PLAIN FORM 辞書形 じしょけい
//-----------------------------------------------------------------------------
/*
  const NA = { derive: append('な'), desc: 'negative imperative', form: 'NA',  };
  const TO = { derive: append('と'), desc: 'if ~ definitely...', form: 'TO',  };
  const GA_HAYAI_KA = { derive: append('がはやいか'), desc: 'as soon as', form: 'GA_HAYAI_KA',  };
  const TOMONAKU = { derive: append('ともなく'), desc: 'without intent', form: 'TOMONAKU',  };
  const BEKI = { derive: append('べき'), desc: 'idealistic should', form: 'BEKI',  };
  const MAI = { derive: append('まい'), desc: 'negative volitional, formal', form: 'MAI',  };
  const MITAI = { derive: append('みたい'), desc: 'seems that ~', form: 'MITAI', tag: 'adj-i' };
  const SOU = { derive: append('そう'), desc: 'claimed to be ~', form: 'SOU',  };
  const RASHII = { derive: append('らしい'), desc: 'apparently', form: 'RASHII', tag: 'adj-i' };
  const HAZU = { derive: append('はず'), desc: 'expectation', form: 'HAZU',  };
  const NARA = { derive: append('なら'), desc: 'contextual if', form: 'NARA',  };
  const TSUMORI = { derive: append('つもり'), desc: 'intention', form: 'TSUMORI',  },;
*/
const PLAIN = {
  form: 'PLAIN',
  derive: getStem(STEMS),
  desc: 'non-past',
  forms: [],
};

//-----------------------------------------------------------------------------
//  CONJUNCTIVE 連用形 れんようけい
//  + POLITE
//-----------------------------------------------------------------------------
const TAI = { derive: append('たい'), desc: "speaker's desire", form: 'TAI', tag: 'adj-i' };
const TAGARU = {
  derive: append('たがる'),
  desc: "non-speaker's desire",
  form: 'TAGARU',
  tag: 'v5r',
};
const NAGARA = { derive: append('ながら'), desc: 'while ~ing', form: 'NAGARA' };
const GACHI = { derive: append('がち'), desc: 'tends to ~', form: 'GACHI' };
const KATA = { derive: append('かた'), desc: 'way of ~ing', form: 'KATA' };
const SAE = { derive: append('さえ'), desc: 'minimum requirement', form: 'SAE' };
const SOU = { derive: append('そう'), desc: 'looks to be ~', form: 'SOU' };
const TSUTSU = { derive: append('つつ'), desc: 'continuing to ~', form: 'TSUTSU' };
const YAGARU = { derive: append('やがる'), desc: 'yakuza rude', form: 'YAGARU', tag: 'v5r' };
const SUGIRU = { derive: append('すぎる'), desc: 'excess ~', form: 'SUGIRU', tag: 'v1' };
const YASUI = { derive: append('やすい'), desc: 'easy to ~', form: 'YASUI', tag: 'adj-i' };
const NIKUI = { derive: append('にくい'), desc: 'difficult to ~', form: 'NIKUI', tag: 'adj-i' };

const CONJUNCTIVE = {
  form: 'CONJUNCTIVE',
  derive: getStem(STEMS),
  desc: 'conjunctive',
  forms: [TAI, TAGARU, NAGARA, GACHI, KATA, SAE, SOU, TSUTSU, YAGARU, SUGIRU, YASUI, NIKUI],
};

const MASU = { derive: append('ます'), form: 'MASU', desc: 'non-past' };
const MASEN = { derive: append('ません'), form: 'MASEN', desc: 'negative' };
const MASENU = { derive: append('ませぬ'), form: 'MASENU', desc: 'negative, archaic' };
const MASHITA = { derive: append('ました'), form: 'MASHITA', desc: 'past' };
const MASHOU = { derive: append('ましょう'), form: 'MASHOU', desc: 'volitional' };
const MASHITE = { derive: append('まして'), form: 'MASHITE', desc: 'conjunctive' };
const MASUREBA = { derive: append('ますれば'), form: 'MASUREBA', desc: 'conditional' };
const NASAI = { derive: append('なさい'), form: 'NASAI', desc: 'authoritative' };
const NA = { derive: append('な'), form: 'NA', desc: 'imperative informal' };

const POLITE = {
  form: 'POLITE',
  derive: getStem(STEMS),
  desc: 'polite',
  forms: [MASU, MASEN, MASENU, MASHITA, MASHOU, MASHITE, MASUREBA, NASAI, NA],
};

//-----------------------------------------------------------------------------
//  IMPERFECTIVE 未然形 みぜんけい
//-----------------------------------------------------------------------------
const NAI = { derive: append('ない'), form: 'NAI', desc: 'negative', tag: 'adj-i' };
const N = { derive: append('ん'), form: 'N', desc: 'curt negative, informal, archaic' };
const ZU = { derive: append('ず'), form: 'ZU', desc: 'negative perfect' };
const NAIDE = { derive: append('ないで'), form: 'NAIDE', desc: 'without ~ing' };
const ZUNI = { derive: append('ずに'), form: 'ZUNI', desc: 'without ~ing, formal' };
const NAKUTE = { derive: append('なくて'), form: 'TE', desc: 'negative て form' };
const NAKATTA = { derive: append('なかった'), form: 'TA', desc: 'negative た form' };
const NAKEREBA = { derive: append('なければ'), form: 'CONDITIONAL', desc: 'negative conditional' };
const NAKYA = { derive: append('なきゃ'), form: 'NAKYA', desc: 'obligation, informal' };
const NAKUCHA = { derive: append('なくちゃ'), form: 'NAKUCHA', desc: 'obligation, informal' };
const PASSIVE = { derive: derivePassive, form: 'PASSIVE', desc: 'passive', tag: 'v1' };
const CAUSATIVE = { derive: deriveCausative, form: 'CAUSATIVE', desc: 'causative', tag: 'v1' };
const CAUSATIVE_PASSIVE = {
  derive: deriveCausativePassive,
  form: 'CAUSATIVE_PASSIVE',
  desc: 'causative passive',
  tag: 'v1',
};
const CAUSATIVE_ALT = {
  derive: deriveCausativeAlt,
  form: 'CAUSATIVE_ALT',
  desc: 'causative alternative',
  tag: 'v5s',
};
const CAUSATIVE_PASSIVE_ALT = {
  derive: deriveCausativePassiveAlt,
  form: 'CAUSATIVE_PASSIVE_ALT',
  desc: 'causative passive alternative',
  tag: 'v1',
};
/*
  const NAIDE_KUDASAI = { derive: append('ないでください'), form: 'NAIDE_KUDASAI', desc: 'negative request' };
  const NAITO = { derive: append('ないと'), form: 'NAITO', desc: 'obligation, informal' }
*/
const IMPERFECTIVE = {
  form: 'IMPERFECTIVE',
  derive: getStem(STEMS),
  desc: 'imperfective',
  forms: [
    NAI,
    N,
    ZU,
    NAIDE,
    ZUNI,
    NAKUTE,
    NAKATTA,
    NAKEREBA,
    NAKYA,
    NAKUCHA,
    PASSIVE,
    CAUSATIVE,
    CAUSATIVE_PASSIVE,
    CAUSATIVE_ALT,
    CAUSATIVE_PASSIVE_ALT,
  ],
};

//-----------------------------------------------------------------------------
//  IMPERATIVE 命令形 めいれいけい
//-----------------------------------------------------------------------------
const IMPERATIVE = {
  form: 'IMPERATIVE',
  derive: getStem(STEMS),
  desc: 'imperative',
  forms: [],
};

//-----------------------------------------------------------------------------
//   HYPOTHETICAL 仮定形 かていけい
//-----------------------------------------------------------------------------
/*
  const いい = { derive: append('いい'), form: 'いい', desc: 'I should ~' };
  const よかった = { derive: append('よかった'), form: 'よかった', desc: 'I should have ~' };
*/
const CONDITIONAL = {
  form: 'CONDITIONAL',
  derive: getStem(STEMS),
  desc: '~ba conditional',
  forms: [
    /* いい, よかった */
  ],
};

const POTENTIAL = {
  form: 'POTENTIAL',
  derive: getStem(STEMS),
  desc: 'potential',
  forms: [],
  tag: 'v1',
};

//-----------------------------------------------------------------------------
//   VOLITIONAL 推量刑 すいりょうけい
//-----------------------------------------------------------------------------
const VOLITIONAL = {
  form: 'VOLITIONAL',
  derive: getStem(STEMS),
  desc: 'volitional',
  forms: [],
};

//-----------------------------------------------------------------------------
//  TE テ刑
//-----------------------------------------------------------------------------
/*
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
*/
const TE = {
  form: 'TE',
  derive: getStem(STEMS),
  desc: 'te form',
  forms: [],
};

//-----------------------------------------------------------------------------
//  TA タ刑
//-----------------------------------------------------------------------------
/*
  から: '...because ~',
  ところ: 'just happened',
  ばかり: 'just happened',
  ほうがいい: 'suggestive',
  ことがある: 'past experience',
  だろう: 'past presumptive',
*/
const RI = { derive: append('り'), desc: 'representative', form: 'RI' };
const RA = { derive: append('ら'), desc: 'if/when ~', form: 'RA' };
const ROU = { derive: append('ろう'), desc: 'past volitional, rare', form: 'ROU' };
const TA = {
  form: 'TA',
  derive: getStem(STEMS),
  desc: 'ta form',
  forms: [RI, RA, ROU],
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

module.exports = {
  REGULAR_TAGS,
  BASE_FORMS,
};
