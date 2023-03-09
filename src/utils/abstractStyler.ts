import Enumerable from 'linq'
// prettier-ignore
const nonLexicalWords = ["the", "of", "and", "to", "a", "in", "for", "is", "on", "that", "by", "this", "with", "i", "you", "it",
  "not", "or", "be", "are", "from", "at", "as", "your", "all", "have", "new", "more", "an", "was", "we", "will", "home",
  "can", "us", "about", "if", "page", "my", "has", "free", "but", "our", "one", "other", "do", "no", "information", "time",
  "they", "site", "he", "up", "may", "what", "which", "their", "news", "out", "use", "any", "there", "see", "only", "so",
  "his", "when", "contact", "here", "business", "who", "web", "also", "now", "help", "get", "pm", "view", "online", "c",
  "e", "first", "am", "been", "would", "how", "were", "me", "s", "services", "some", "these", "click", "its", "like",
  "service", "x", "than", "find", "price", "date", "back", "top", "people", "had", "list", "name", "just", "over",
  "state", "year", "day", "into", "email", "two", "health", "n", "world", "re", "next", "used", "go", "b", "work", "last",
  "most", "products", "music", "buy", "make", "them", "should", "product", "post", "her", "city", "t", "add", "policy",
  "number", "such", "please", "available", "copyright", "support", "message", "after", "best", "software", "then", "jan",
  "good", "video", "well", "d", "where", "info", "rights", "public", "books", "high", "school", "through", "m", "each",
  "links", "she", "review", "years", "order", "very", "book", "items", "company", "r", "read", "group",
  "sex", "need", "many", "user", "said", "de", "does", "set", "under", "general", "research", "university",
  "january", "mail", "full", "map", "reviews", "program", "life"
];
// prettier-ignore
const transitionWords = ["however", "despite", "nevertheless", "but", "although"];
// eslint-disable-next-line no-useless-escape
export const punctuation = /[!"#$%&\'()*+,-.\/:;<=>?@\[\\\]\^_`{\|}~]$/g

export function styleAbstract(
  originAbs: string,
  highlights: string[] | null = null
): string | null {
  const colorNumber = 5

  if (originAbs == null) return null

  originAbs = originAbs.replaceAll('&lt;/u&gt;', '').replaceAll('&lt;u&gt;', '')

  highlights = highlights || []

  const isTransitionWord = (word: string) => transitionWords.indexOf(word) > -1
  const isNonLexicalWord = (word: string) => nonLexicalWords.indexOf(word) > -1
  const isLexicalWord = (word: string) => !isNonLexicalWord(word)
  const standardize = (word: string) =>
    word.replace(punctuation, '').toLowerCase()
  const wrapClass = (content: string, cls: string) =>
    `<span class="${cls}">${content}</span>`

  const getColors = (count: number) => {
    const number = colorNumber
    const baseColors = Enumerable.range(1, number).select((i) => `color-${i}`)
    const steps = Math.ceil(count / number)
    const colors = baseColors
      .select((_) =>
        Enumerable.range(1, steps)
          .select((i) => `${_}-${i}`)
          .toArray()
      )
      .toArray()

    const outputs = []
    for (let i = 0; i < count; i++) {
      const m = i % number
      const n = Math.floor(i / number)
      outputs.push(colors[m][n])
    }
    return outputs
  }

  const wordsStats = Enumerable.from(originAbs.split(' '))
    .select(standardize)
    .where(isLexicalWord)
    .groupBy((_) => _)
    .select((_) => ({
      word: _.key(),
      num: _.getSource().length,
    }))
    .where((_) => _.num > 1)
    .toArray()

  const colors = getColors(wordsStats.length)
  const wordStyle = Enumerable.from(wordsStats)
    .orderByDescending((_) => _.num)
    .select((_, i) => ({
      word: _.word,
      color: colors[i],
    }))
    .toArray()

  const hls = Enumerable.from(highlights)
    .select((hl) => hl.split(' ').map(standardize))
    .toArray()

  const words = originAbs.split(' ')
  const wordList: string[] = []

  words.forEach((word) => {
    const lowWord = standardize(word) // pureWord.toLowerCase();
    let resultWord = word
    if (resultWord.endsWith('.') && resultWord.length > 2)
      resultWord = resultWord.replace('.', '.<span class="end"></span>')

    if (isTransitionWord(lowWord)) {
      wordList.push(wrapClass(resultWord, 'transition'))
    } else if (isNonLexicalWord(lowWord)) {
      wordList.push(wrapClass(resultWord, 'nonlexical'))
    } else {
      const style = wordStyle.find((_) => _.word == lowWord)
      if (!style) {
        wordList.push(wrapClass(resultWord, 'other'))
      } else {
        wordList.push(wrapClass(resultWord, style.color))
      }
    }
  })

  function FindStartingIndices<T>(arr: T[], subArr: T[]): number[] {
    let index = Enumerable.range(0, arr.length - subArr.length + 1).toArray()
    for (let i = 0; i < subArr.length; i++) {
      index = index.filter((n) => arr[n + i] == subArr[i])
    }
    return index
  }

  // highlight
  const pureWords = Enumerable.from(originAbs.split(' '))
    .select(standardize)
    .toArray()
  hls.forEach((hl) => {
    const idxs = FindStartingIndices(pureWords, hl)
    idxs.forEach((idx) => {
      wordList[idx] = '<span class="highlight">' + wordList[idx]
      wordList[idx + hl.length - 1] += '</span>'
    })
  })

  return wordList.join(' ')
}

// export function styleAbstractDivs() {
//     const abselements = document.querySelectorAll("div.abstract");

//     for (let i = 0; i < abselements.length; i++) {
//         const absele = abselements[i];
//         const p = absele.querySelector("p");
//         const lis = absele.querySelectorAll("li");
//         const hls = Array.from(lis).map(_ => _.innerText);

//         const newdiv = document.createElement('p');
//         newdiv.innerHTML = styleAbstract(p.innerText, hls);

//         p.parentNode.replaceChild(newdiv, p)
//         absele.querySelector("ul")?.remove();
//     }
// }
