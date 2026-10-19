/**
 * 挿入ソート
 * https://ja.wikipedia.org/wiki/%E6%8C%BF%E5%85%A5%E3%82%BD%E3%83%BC%E3%83%88
 */
export function insertionSort(xs: readonly number[]) {
  // ソート済みの sorted に、x を小さい順の場所に差し込んだ新しい配列を返す
  const insert = (sorted: number[], x: number) => {
    const left = sorted.filter((y) => y <= x) // x 以下は左へ
    const right = sorted.filter((y) => y > x) // x より大きいは右へ
    return [...left, x, ...right]
  }

  return xs.reduce<number[]>(insert, [])
}
