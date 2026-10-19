import { expect, test } from 'bun:test'
import { insertionSort } from './insertionsort'

test('小さい順に並ぶ', () => {
  expect(insertionSort([1, 3, 2])).toEqual([1, 2, 3])
})

test('同じ数があっても消えない', () => {
  expect(insertionSort([2, 1, 2])).toEqual([1, 2, 2])
})

test('空の配列はそのまま', () => {
  expect(insertionSort([])).toEqual([])
})

test('入力は変わらない', () => {
  const input = [1, 3, 2]
  insertionSort(input)
  expect(input).toEqual([1, 3, 2])
})
