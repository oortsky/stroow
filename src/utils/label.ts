export function getLabel<T extends { value: string; label: string }>(
  items: readonly T[],
  value: string
): string {
  return items.find(item => item.value === value)?.label ?? value;
}