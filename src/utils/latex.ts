export function toLatex(text: string) {
  const s = `
    {,\\{
    },\\}

    𝑆,S
    𝑋,X
    𝑊,W
    𝑥,x

    →,\\to

    𝜆,\\lambda

    ⊄,\\not\\subset
    ⊂,\\subset
    ⊎,\\uplus
    ∪,\\cup

    ∉,\\notin
    ∈,\\in
    ≡,\\equiv
    ≈,\\approx
    ′,'
    `
  const rules = s
    .split('\n')
    .map((_) => _.trim().split(','))
    .filter((_) => _.length == 2)
  console.log(rules)
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    text = text.replaceAll(rule[0], rule[1])
  }
  return text
}
