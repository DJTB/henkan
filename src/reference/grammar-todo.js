// TODO: peruse this list for any missing inflections
const N5 = [
  ['だ', 'to be/is'],
  ['です', 'to be/is'],
  ['は', 'denotes sentence topic'],
  ['も', 'also・too'],
  ['これ', 'this'],
  ['の', 'indicates possession'],
  ['いい', "adjective meaning 'good'"],
  ['か', 'question particle'],
  ['でしょう', 'right?・probably'],
  ['が', 'subject marker'],
  ['それ', 'that'],
  ['る-Verbs', 'Ichidan verbs:'],
  ['がある', 'there is'],
  ['ここ', 'here'],
  ['と', 'and・with'],
  ['の(は)', 'verb nominalizer'],
  ['～んです', 'explains or indicates'],
  ['だろう', 'probably'],
  ['あれ', 'that'],
  ['そこ', 'there'],
  ['を', 'particle that marks th...'],
  ['する', 'To do'],
  ['がいる', 'there is'],
  ['い - Adj...', 'adjectives'],
  ['で', 'at・in'],
  ['う-Verbs', 'Godan verbs:'],
  ['ている', 'is・am・are ~ing'],
  ['な - Adj...', 'adjectives'],
  ['あそこ', 'over there'],
  ['この', 'this'],
  ['へ行く', 'to go to/toward'],
  ['に', 'exists'],
  ['か', 'or'],
  ['のが好き', 'like・love doing'],
  ['V + てもいい', '[Verbs] is okay'],
  ['で', 'with・by'],
  ['その', 'that'],
  ['へ', 'to・toward'],
  ['来る', 'to come'],
  ['だった', 'to be/is'],
  ['Verb[た]', 'Verb past tense form'],
  ['もう', 'already・anymore'],
  ['だけ', 'only・just'],
  ['が', 'but・however'],
  ['から', 'because・since'],
  ['N + てもいい', '[Nouns ・Adj.] ~ is okay'],
  ['あの', 'that'],
  ['V + に行く', 'to go in order to'],
  ['じゃない', 'is not'],
  ['じゃなかった', 'was not'],
  ['Verb[ない]', 'negative verbs'],
  ['から', 'from'],
  ['前に', 'before'],
  ['けれども', 'but・although'],
  ['の中で～が一番～', 'Out of all ~'],
  ['どこ', 'where'],
  ['～になる', 'to become'],
  ['N + まで', 'until・till'],
  ['たい', 'want to'],
  ['てください', 'please do…'],
  ['くらい', 'about・approximately'],
  ['ので', 'because・so・since '],
  ['たことがある', 'have done before'],
  ['てから', 'after doing'],
  ['ないでください', 'please don’t'],
  ['な', 'don’t'],
  ['てはいけない', 'must not・may not'],
  ['方がいい', 'it’d be better to'],
  ['ない方がいい', 'it’d be better not to'],
  ['ましょう', 'let’s・shall we'],
  ['ね', "isn't it?・right?"],
  ['まだ', 'still・not yet'],
  ['より ~ の方が', 'is more ~ than ~'],
  ['なくちゃ', 'has to be done'],
  ['～ましょうか', 'shall we'],
  ['すぎる', 'too much'],
  ['のが上手', 'be good at'],
  ['よ', '[adds emphasis]'],
  ['たり～たりする', 'things like ~ and ~'],
  ['つもりだ', 'plan to・intend to'],
  ['や', 'and'],
  ['ませんか', 'won’t you'],
  ['まだ～ていません', 'Still hasn’t done some...'],
  ['にする', 'to decide on'],
  ['のが下手', 'to be bad at'],
  ['がある + Noun', 'Noun that has the qual...'],
  ['と', 'Quotation'],
  ['～した～', 'Verb Modified Noun'],
  ['って', 'Can replace と'],
  ['結構', "set phrase: 'no thank ..."],
  ['V + まで', 'until something happens'],
  ['けど', 'but'],
  ['て Form', 'Present Tense'],
];
const N4 = [
  ['なくてはいけない', 'must do'],
  ['なくてはならない', 'must do'],
  ['でも', 'or something'],
  ['など', 'such as'],
  ['やすい', 'easy to'],
  ['ほしい', 'to want something'],
  ['てあげる', 'to do something for so...'],
  ['とき', 'when'],
  ['と思う', 'I think'],
  ['なさい', 'command to do'],
  ['ないで', 'without doing'],
  ['みたい', 'like'],
  ['こと', 'Conversion of a Verb i...'],
  ['てみる', 'to try to'],
  ['にくい', 'difficult to'],
  ['てほしい', 'I need/want you to'],
  ['たら', 'if・after・when'],
  ['てくれる', 'Do something for'],
  ['までに', 'by'],
  ['そう ', 'look like・appear'],
  ['てすみません', 'I’m sorry for'],
  ['みたいに', 'Similar to'],
  ['より', 'more than'],
  ['だけで', 'just by'],
  ['ことができる', 'can'],
  ['さ', 'Converts an Adjective ...'],
  ['がる', 'to feel・to think'],
  ['かもしれない', 'might・maybe'],
  ['てもらう', 'to get someone to do'],
  ['始める', 'to start'],
  ['後で', 'after'],
  ['がする', 'smell・hear・taste'],
  ['そうに/そうな ', 'seem'],
  ['Number + も', 'Emphasis'],
  ['かな', 'I wonder'],
  ['〜よう', "Let's"],
  ['(よ)うと思う', 'I think I will'],
  ['なら', 'if'],
  ['たがる', 'to want to'],
  ['ごろ', 'around'],
  ['終わる', 'to finish'],
  ['必要', 'need'],
  ['てくる ', 'to come to・to become'],
  ['といいです', 'I hope'],
  ['のに ', 'despite'],
  ['とか～とか', 'among other things'],
  ['Verb[Po...', 'to be able to do somet...'],
  ['場合は', 'in the event of'],
  ['ていただけませんか', 'could you please'],
  ['ところ', 'about to'],
  ['ていた ', 'was doing something'],
  ['ていく', 'to go on'],
  ['ように/ような', 'as・like'],
  ['必要がある', 'it is necessary to'],
  ['てよかった', 'I’m glad that'],
  ['し～し ', 'and'],
  ['に (Freq...', '(times) in each (time ...'],
  ['と', 'if・when'],
  ['そんなに', 'so'],
  ['Verb [P...', "Against one's will"],
  ['たところ', 'just finished doing'],
  ['といってもいい', 'you could say'],
  ['ながら', 'while'],
  ['ようだ', 'it seems that'],
  ['ているところ ', 'in the process of doing'],
  ['はずだ', 'expected to'],
  ['と～と、どちらが ', 'between ~ which one'],
  ['Verb[Ca...', 'to make・let・have'],
  ['ば', 'if… then'],
  ['らしい', 'seems like'],
  ['かどうか', 'whether or not'],
  ['と聞いた', 'I heard that'],
  ['ようにする', 'to try to'],
  ['てある ', 'something is done'],
  ['ている間に', 'While'],
  ['はずがない', 'hardly possible'],
  ['ておく', 'to do something in adv...'],
  ['ばよかった', 'Should have'],
  ['Verb[Ca...', 'to be made to do somet...'],
  ['たばかり', 'just did'],
  ['にみえる', 'to look'],
  ['に気がつく', 'to notice'],
  ['ようになる', 'to reach the point that'],
  ['なければいけない', 'must do'],
  ['なければならない', 'must do'],
  ['なくてもいい', 'don’t have to'],
  ['てしまう', 'to do something by acc...'],
  ['じゃないか', 'isn’t it'],
  ['ても', 'even if'],
  ['かい', 'question marker'],
  ['Transit...', 'Done through action vs...'],
  ['たらどう', 'why don’t you'],
  ['だす', 'to suddenly begin'],
  ['とみえる', 'it seems that'],
  ['つづける', 'to continue'],
  ['予定だ', 'plan to'],
  ['しか～ない ', 'there’s only'],
  ['のなかで', 'in'],
  ['といわれている', 'it is said that'],
  ['ということ', 'Phrase to Noun'],
  ['それでも', 'but still'],
  ['ございます', 'to be'],
  ['でございます', 'to be (honorific)'],
  ['お～ください ', 'please do (honorific)'],
  ['お～になる ', 'to do (honorific)'],
  ['いらっしゃる', 'to be (honorific)'],
  ['いたす', 'to do (humble)'],
  ['なさる', 'to do (honorific)'],
  ['かしら', 'I wonder'],
  ['どんどん', 'progressively'],
  ['まず', 'to start with'],
  ['また', 'also・as well'],
  ['そういう', 'like that'],
  ['～のだろうか', 'I wonder...'],
  ['ほとんど', 'almost・about'],
  ['とうとう', 'finally'],
  ['そんな', 'such a・kind of'],
  ['だが', 'but・still'],
  ['てくれてありがとう', 'Thank you for ~ ing'],
  ['まで(も)', 'even・to even'],
  ['のように', 'like (noun)'],
  ['あまり～ない', 'not very・not much'],
  ['全然', '(not) at all'],
  ['たとえば', 'for example'],
  ['もし', 'If [for emphasis]'],
  ['～ない～はない', 'There is not ~ that is...'],
  ['ように～てほしい', 'Want ~ to ~ like ~'],
  ['だけでなく', 'not only… but also'],
  ['少しも～ない', 'not at all'],
  ['～以上', 'more than (or equal to)'],
  ['～以下', 'Less than (or equal to)'],
  ['なるべく', 'as ~ as possible'],
  ['～ら', 'them・they'],
  ['ように言う', 'To tell/inform/request...'],
  ['〜でも 〜でも', 'Whether ~ or'],
  ['ごとに', 'each・every'],
  ['それに', 'and・besides'],
  ['以外', 'except・besides'],
  ['～は～の一つだ', '〜 is one of (many) 〜'],
  ['と考えられている', 'Is considered'],
  ['直す', 'To do over'],
  ['真(っ)', 'Completely'],
  ['他に(も)', 'other・another'],
];
const N3 = [
  ['ばいい', 'should'],
  ['べき', 'must do'],
  ['中', 'during'],
  ['上で', 'after'],
  ['ことだ', 'should'],
  ['そうだ ', 'I heard that'],
  ['ほど', 'the more'],
  ['という', 'called'],
  ['なぜなら〜から', 'because'],
  ['によると', 'according to'],
  ['ため(に)', 'for'],
  ['ところが', 'even so'],
  ['ば〜ほど', 'the more…the more'],
  ['ばよかった', 'should have'],
  ['べきではない', 'must not do'],
  ['の間に', 'while'],
  ['うちに', 'while'],
  ['たらいい', 'it would be nice if'],
  ['もの', 'because (indicate reas...'],
  ['によって', 'by means of'],
  ['ために', 'because of'],
  ['ということだ', 'I’ve heard that'],
  ['ところで', 'by the way'],
  ['あまり', 'so much...that'],
  ['ばかり', 'only'],
  ['どんなに〜ても', 'no matter how'],
  ['ほど~ない', 'is not as…as'],
  ['ことがある', 'have experienced'],
  ['ものだ', 'used to do something'],
  ['に比べて', 'compared to'],
  ['について', 'concerning'],
  ['最中に', 'in the middle of'],
  ['といっても', 'although I say'],
  ['というのは', 'means'],
  ['わけだ', 'for that reason'],
  ['あまりに', 'so much...that'],
  ['ばかりだ', 'continue to'],
  ['いくら〜でも', 'no matter how'],
  ['ことはない', 'there is no need to'],
  ['くらい', 'to the extent that'],
  ['まま', 'as is'],
  ['に関する', 'related to'],
  ['に対して', 'in contrast to'],
  ['おかげで', 'thanks to'],
  ['てもかまわない', 'it doesn’t matter if'],
  ['といえば', 'speaking of'],
  ['わけではない', 'it doesn’t mean that'],
  ['ばかりに', 'simply because'],
  ['だらけ', 'covered all over in'],
  ['から言うと', 'in terms of'],
  ['ことか', 'how…what...'],
  ['んだって', 'I heard that'],
  ['にとって', 'to'],
  ['さえ', 'even'],
  ['しかない', 'have no choice but'],
  ['というより', 'not just...but...'],
  ['としたら', 'if it were the case that'],
  ['つまり', 'in other words'],
  ['わけがない', 'there is no reason'],
  ['ような気がする', 'have a feeling that'],
  ['ばかりでなく', 'not only…but also'],
  ['別に〜ない', 'not really'],
  ['がたい', 'hard to'],
  ['こそ', 'for sure (emphasis)'],
  ['ことから', 'from the fact that'],
  ['まるで', 'as if'],
  ['向き', 'suitable for'],
  ['にしても', 'even if'],
  ['をはじめ', 'for example'],
  ['さえ〜ば', 'if only…then'],
  ['として', 'as (i.e. in the role of)'],
  ['わけにはいかない', 'must not'],
  ['ようとする', 'try to'],
  ['決して〜ない', 'never'],
  ['ふりをする', 'to pretend'],
  ['ことに', 'extremely'],
  ['めったに〜ない', 'hardly'],
  ['向け', 'intended for'],
  ['にしては', 'for'],
  ['せいで', 'because of'],
  ['そうもない', 'very unlikely to'],
  ['たとえ〜ても', 'even if…is the case'],
  ['てはじめて', 'not until'],
  ['とは限らない', 'not necessarily so'],
  ['ようとしない', 'not try to'],
  ['一方だ', 'more and more'],
  ['代わりに', 'instead of'],
  ['切る', 'to do something comple...'],
  ['ことになる', 'it will end up being'],
  ['もしかしたら', 'perhaps'],
  ['ながらも', 'but'],
  ['に違いない', 'I’m sure'],
  ['において', 'in・on・at'],
  ['その結果', 'as a result'],
  ['とおり', 'in the way'],
  ['ついでに', 'while you are at it'],
  ['とともに', 'together with'],
  ['一方で', 'on one hand'],
  ['切れない', 'being unable to finish...'],
  ['ことにする', 'to decide on'],
  ['くせに', 'even though'],
  ['なんか', 'such as'],
  ['に代わって', 'instead of'],
  ['につれて', 'as…then'],
  ['っぱなし', 'leaving something in a...'],
  ['次第', 'as soon as'],
  ['たびに', 'each time'],
  ['わりに', 'although'],
  ['ずに', 'without doing'],
  ['どころか', 'far from'],
  ['がち', 'apt to do'],
  ['気味', '-like'],
  ['かけ', 'half-'],
  ['っけ', 'what is…again?'],
  ['きり', 'only'],
  ['ないことはない', 'can'],
  ['にかけて', 'over (a period)'],
  ['っぽい', '-ish'],
  ['たとたん', 'the instant'],
  ['てごらん', '(please) try to'],
  ['ずにはいられない', 'can’t help but feel'],
  ['って', 'casual は'],
  ['～である', 'Formal だ'],
  [' なかなか', 'very・quite'],
  ['すると', 'and then'],
  ['全く～ない', 'not~at all'],
  ['のに', 'in order to'],
  ['～は～で有名', 'Is famous for'],
  [' ～と言っても', 'Although ~ might say t...'],
  ['的', '~ly・~like・~al'],
  ['なかなか～ない', 'not really'],
  ['そうすると', 'having done that'],
  ['からこそ', 'emphasized because'],
  ['そのため（に）', 'For that reason'],
  ['ところだった', 'Almost・nearly'],
  ['それぞれ', 'each'],
  ['では', 'Well then'],
  ['ないうちに', 'before it becomes'],
  ['だって', 'I heard'],
  ['と同時に', 'at the same time as'],
  ['そこで', 'Accordingly'],
  ['～というのは事実だ', 'It is a fact that ~'],
  ['～ても～なくても', '(Even) if you do or yo...'],
  ['に合わせて', 'In accordance with'],
  ['さて', 'well'],
  ['むしろ', 'rather・instead・over'],
  ['とても～ない', 'Not at all'],
  ['当たり', 'per~・a~ '],
  ['み', '~ness'],
  ['はもちろん', 'not only but also'],
  ['かえって', 'All the more'],
  ['再び', 'again'],
  ['もっとも', 'most'],
  ['まさか', 'incredible'],
  ['前者は', 'the former・the latter'],
  ['は～くらいです', 'about the only'],
  ['連用形', 'Formal Conjunctive'],
  ['できれば', 'If possible'],
  ['に限る', 'nothing better than'],
  ['直ちに', 'at once'],
  ['ではなくて', 'A not B'],
  ['一体', 'What the ...'],
  ['でよければ', 'If it is alright'],
  ['あるいは', 'or ~ possibly'],
  ['おきに', 'repeated at intervals'],
  ['上がる', 'To finish'],
  ['益々', 'increasingly・more and ...'],
  ['だけでなく(て)～も', 'Not only ~ but ~ also'],
  ['～ようとしたが', 'Tried to ~ but ~'],
  ['たて', 'Just done'],
  ['すでに', 'Already'],
  ['遂に', 'finally'],
  ['必ずしも ', 'Not always'],
  ['たものだ', 'used to'],
  ['つい', 'accidentally'],
  ['だけしか', " To emphasize '~only'"],
  ['即ち', 'in other words'],
  ['どうしても', 'by all means'],
  ['わざわざ', 'On purpose'],
  ['もしも~なら', ' Emphasize もし'],
  ['と同じで', 'like・similar to'],
  ['に基づいて', 'based on'],
];
const N2 = [
  ['上', 'from the standpoint of'],
  ['以上', 'since'],
  ['ぶりに', 'for the first time in'],
  ['思うように', 'as one hopes'],
  ['だけに', ' …being the case'],
  ['得る / 得る', 'is able to'],
  ['逆に', 'on the contrary'],
  ['から見ると', 'from the point of view of'],
  ['でしかない', 'merely'],
  ['ことになっている', 'to be expected to'],
  ['も～ば～も', '…and…'],
  ['に向かって', 'towards'],
  ['にしたら', 'from the point of view of'],
  ['にしても～にしても', 'regardless of whether'],
  ['にすぎない', 'no more than'],
  ['しかも', 'moreover'],
  ['そういえば', 'speaking of which'],
  ['つもりで', 'with the intention of ...'],
  ['ずに済む', 'get by without doing s...'],
  ['だけあって', '…being the case'],
  ['えない', 'unable to'],
  ['上に', 'as well'],
  ['以上に', 'more than'],
  ['とか', 'I heard that…'],
  ['からすると', 'judging from'],
  ['としても', 'assuming'],
  ['ことだから', 'it is exactly because'],
  ['まい', 'won’t'],
  ['もかまわず', 'without worrying about'],
  ['ということは', 'that means'],
  ['ものだから', 'because'],
  ['ないことには～ない', ' unless you do something'],
  ['には', 'in order to'],
  ['次第だ', 'depending on'],
  ['それにしても', 'nevertheless'],
  ['確かに', 'surely'],
  ['てこそ', 'now that'],
  ['てならない', "can't help but"],
  ['～を～に任せる', 'leave 〜 up to'],
  ['上は', 'now that・since'],
  ['ざるを得ない', 'can’t help doing'],
  ['だけは', 'to do all that one can'],
  ['が気になる', 'To be interested in'],
  ['としては', 'as for'],
  ['からには', 'as long as・since'],
  ['なくはない', 'it’s not that…'],
  ['ことにはならない', 'just because… doesn’t ...'],
  ['ないわけにはいかない', "Can't not"],
  ['ではないだろうか', 'I think something...'],
  ['ものがある', 'strong judgement'],
  ['何といっても', 'By any account'],
  ['にて', 'in'],
  ['それなのに', 'and yet'],
  ['手前', 'before'],
  ['てたまらない', 'very'],
  ['といった', 'such… as'],
  ['ところだった', 'was just about to do s...'],
  ['ようでは', 'if'],
  ['ものですから', 'reason・excuse'],
];
