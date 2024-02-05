export function formatPrice(price: number): string {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(2)} %`;
}
