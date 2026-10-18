import { expect, test } from "bun:test";
import { quicksort } from "./quicksort";

test("小さい順に並ぶ", () => {
  expect(quicksort([3, 1, 2])).toEqual([1, 2, 3]);
});

test("同じ数があっても消えない", () => {
  expect(quicksort([2, 1, 2])).toEqual([1, 2, 2]);
});

test("空の配列はそのまま", () => {
  expect(quicksort([])).toEqual([]);
});

test("入力は変わらない", () => {
  const input = [3, 1, 2];
  quicksort(input);
  expect(input).toEqual([3, 1, 2]);
});
