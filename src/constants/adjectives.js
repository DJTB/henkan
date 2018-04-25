export const I_ADJ_TYPES = ['adj-i', 'adj-ix'];
export const NA_ADJ_TYPES = ['adj-na'];

//-----------------------------------------------------------------------------
//  い adjectives 形容詞 けいようし
//-----------------------------------------------------------------------------

const isYoi = (tag, stem) => tag === 'adj-ix' || stem === 'いい';
const getIAdj = (tag = '', stem = '') => (isYoi(tag, stem) ? 'よ' : stem.slice(0, stem.length - 1));
export const I_ADJECTIVE = {
  'adj-i': '硬',
  'adj-ix': 'よ',
  forms: {
    い: 'plain',
    かった: 'past',
    かったら: 'conditional',
    ければ: 'provisional',
    くて: 'conjunctive',
    く: 'adverbial',
    そう: 'seems to be', // FIXME: よい => よさそう == isYoiEdgeCase ? `さ${form}` : form) // -> adj-na
    くない: 'negative', // -> adj-i
    くなかった: 'negative past',
    くなかったら: 'negative conditional',
    くなければ: 'negative provisional',
    くなくて: 'negative conjunctive',
    なさそう: 'negative seems to be',
    かろう: 'tentative',
    すぎる: 'excess', // -> v1
  },
};

//-----------------------------------------------------------------------------
//  な adjectives 形容動詞 けいようどうし
//-----------------------------------------------------------------------------

export const NA_ADJECTIVE = {
  'adj-na': '感嘆',
  forms: {
    に: 'adverbial',
    な: 'attributive',
  },
};
