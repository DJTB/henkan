// 連用形 れんようけい
const CONJUNCTIVE = {
  vs: { stub: 'し' }, // する (NOTE: allow 'vs-s' as alias for 'vs')
  vk: { stub: 'き' }, // 来る
};

// NOTE: extract out passive/causative/passive-causative
// 未然形 みぜんけい
const NEGATIVE = {
  vs: { stub: 'し' }, // NOTE: さ instead for passive/causative!
  vk: { stub: 'こ' },
};

// 命令形 めいれいけい
const IMPERATIVE = {
  vs: { stub: 'しろ' },
  vk: { stub: 'こい' },
};

const CONDITIONAL = {
  vs: { stub: 'すれば' },
  vk: { stub: 'くれば' },
};

const POTENTIAL = {
  vs: { stub: 'できる' },
  vk: { stub: 'こられる' },
};

// 推量刑 すいりょうけい
const VOLITIONAL = {
  vs: { stub: 'しよ' },
  vk: { stub: 'こよ' },
};

// テ刑
const TE = {
  vs: { stub: 'して' },
  vk: { stub: 'きて' },
};

// タ刑
const TA = {
  vs: { stub: 'した' },
  vk: { stub: 'きた' },
};
