/**
 * クイックソート
 * https://ja.wikipedia.org/wiki/%E3%82%AF%E3%82%A4%E3%83%83%E3%82%AF%E3%82%BD%E3%83%BC%E3%83%88
 */
export function quicksort(xs: readonly number[]) {
  if (xs.length <= 1) return [...xs]
  const pivot = xs[Math.floor(xs.length / 2)]!
  const lesser: number[] = quicksort(xs.filter((x) => x < pivot))
  const equal = xs.filter((x) => x === pivot)
  const greater: number[] = quicksort(xs.filter((x) => x > pivot))
  return [...lesser, ...equal, ...greater]
}
