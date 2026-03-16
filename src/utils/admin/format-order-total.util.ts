export function formatOrderTotal(total: string) {
  return `$${Number(total).toFixed(2)}`;
}