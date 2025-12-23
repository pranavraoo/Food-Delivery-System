export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered';


export function resolveOrderStatus(
  createdAt: Date,
  etaEndTime: number
): OrderStatus {
  const now = Date.now();
  const start = createdAt.getTime();
  const total = etaEndTime - start;

  if (total <= 0) return 'delivered';

  const progress = (now - start) / total;

  if (progress >= 1) return 'delivered';
  if (progress >= 0.75) return 'out_for_delivery';
  if (progress >= 0.4) return 'preparing';
  if (progress >= 0.15) return 'confirmed';

  return 'placed';
}

export function getRemainingTime(etaEndTime: number) {
  const remainingMs = Math.max(0, etaEndTime - Date.now());

  return {
    minutes: Math.floor(remainingMs / 60000),
    seconds: Math.floor((remainingMs % 60000) / 1000),
  };
}
