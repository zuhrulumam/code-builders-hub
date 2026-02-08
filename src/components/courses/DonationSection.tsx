import { useState } from "react";
import { Coffee, Heart } from "lucide-react";
import { formatRupiah } from "@/lib/mockData";

const donationOptions = [
  { amount: 10000, label: "Rp 10rb" },
  { amount: 25000, label: "Rp 25rb" },
  { amount: 50000, label: "Rp 50rb" },
];

interface DonationSectionProps {
  onDonate?: (amount: number) => void;
}

const DonationSection = ({ onDonate }: DonationSectionProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = () => {
    const amount = selectedAmount || parseInt(customAmount) || 0;
    if (amount > 0 && onDonate) {
      onDonate(amount);
    }
  };

  return (
    <div className="bg-accent border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Coffee className="w-5 h-5 text-secondary" />
        <span className="font-semibold text-foreground">
          Traktir kopi buat support creator
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Course ini gratis, tapi kalau kamu terbantu, boleh dong traktir kopi ☕
      </p>
      
      {/* Quick Amount Buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {donationOptions.map((option) => (
          <button
            key={option.amount}
            onClick={() => {
              setSelectedAmount(option.amount);
              setCustomAmount("");
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedAmount === option.amount
                ? "bg-secondary text-secondary-foreground"
                : "bg-white border border-border text-foreground hover:border-secondary"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      {/* Custom Amount */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            Rp
          </span>
        <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            placeholder="Nominal lain"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
          />
        </div>
        <button
          onClick={handleDonate}
          disabled={!selectedAmount && !customAmount}
          className="px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Heart className="w-4 h-4" />
          Donasi
        </button>
      </div>
    </div>
  );
};

export default DonationSection;
