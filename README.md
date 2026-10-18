# favorites-2-sort

Wikipedia の[ソート](https://ja.wikipedia.org/wiki/%E3%82%BD%E3%83%BC%E3%83%88)の一覧から、クイックソートと挿入ソートを選んで TypeScript で実装しました。

どちらも、再代入をせず、渡された配列をいじらずに書けます。変数の値が途中で変わらないので、どの行を見ても「この名前はこの値」と言い切れて読むのが楽です。入力と出力が別物なので、呼ぶ側は渡した配列が壊れる心配をしなくて済みます。この書き方が好きで、それが素直にできる 2 つを選びました。

## クイックソート

[Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AF%E3%82%A4%E3%83%83%E3%82%AF%E3%82%BD%E3%83%BC%E3%83%88) / `src/quicksort.ts` / `src/quicksort.test.ts`

```ts
export function quicksort(xs: readonly number[]) {
  if (xs.length <= 1) return [...xs];
  const pivot = xs[Math.floor(xs.length / 2)]!;
  const lesser: number[] = quicksort(xs.filter((x) => x < pivot));
  const equal = xs.filter((x) => x === pivot);
  const greater: number[] = quicksort(xs.filter((x) => x > pivot));
  return [...lesser, ...equal, ...greater];
}
```

```mermaid
sequenceDiagram
  participant main
  participant q1 as quicksort([3, 1, 2])
  participant q2 as quicksort([3, 2])
  participant q3 as quicksort([3])
  main->>q1: 呼ぶ
  Note over q1: pivot = 1<br/>lesser = [], equal = [1], greater = [3, 2]
  q1->>q1: quicksort([]) → []
  q1->>q2: greater をソート
  Note over q2: pivot = 2<br/>lesser = [], equal = [2], greater = [3]
  q2->>q2: quicksort([]) → []
  q2->>q3: greater をソート
  q3-->>q2: [3]
  q2-->>q1: [2, 3]
  q1-->>main: [1, 2, 3]
```

「ピボットより小さいものをソートしたもの、ピボット、大きいものをソートしたもの、をつなげる」という説明と、コードの行が 1 対 1 で対応しているのが好きです。並べ替えの手順ではなく「ソート済みとはこういうもの」を書いたら、結果がついてくる感じがします。

## 挿入ソート

[Wikipedia](https://ja.wikipedia.org/wiki/%E6%8C%BF%E5%85%A5%E3%82%BD%E3%83%BC%E3%83%88) / `src/insertionsort.ts` / `src/insertionsort.test.ts`

```ts
export function insertionSort(xs: readonly number[]) {
  // ソート済みの sorted に、x を小さい順の場所に差し込んだ新しい配列を返す
  const insert = (sorted: number[], x: number) => {
    const left = sorted.filter((y) => y <= x); // x 以下は左へ
    const right = sorted.filter((y) => y > x); // x より大きいは右へ
    return [...left, x, ...right];
  };

  return xs.reduce<number[]>(insert, []);
}
```

```mermaid
sequenceDiagram
  participant main
  participant s as insertionSort([3, 1, 2])
  participant f as insert
  main->>s: 呼ぶ
  s->>f: sorted = [], x = 3
  f-->>s: [3]
  s->>f: sorted = [3], x = 1
  f-->>s: [1, 3]
  s->>f: sorted = [1, 3], x = 2
  f-->>s: [1, 2, 3]
  s-->>main: [1, 2, 3]
```

ソートという問題が「ソート済みの列に 1 つ足す」という小さい問題に置き換わっているのが好きです。小さい方は見れば正しいと分かるくらい単純で、それを `reduce` で繰り返すだけで全体ができてしまいます。

## 動かし方

```sh
bun install
bun test
```
