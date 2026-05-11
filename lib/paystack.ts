export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

export const adPackages = [
  { id: "bronze", name: "Bronze Package", price: 50000, color: "orisun-earth" },
  { id: "silver", name: "Silver Package", price: 150000, color: "orisun-gold" },
  { id: "gold", name: "Gold Package", price: 500000, color: "orisun-adire" },
];

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}
