import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, CreditCard, CheckCircle2, Loader2 } from "lucide-react";
import { Course, formatRupiah } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onConfirmMockPayment: () => Promise<void>;
}

const PaymentModal = ({ isOpen, onClose, course, onConfirmMockPayment }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const finalPrice = course.discount_price || course.price;

  const handleMockPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    await onConfirmMockPayment();
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Redirect after success
    setTimeout(() => {
      navigate(`/payment/callback?course=${course.slug}&status=success`);
    }, 1500);
  };

  const handleRealPayment = () => {
    // For real payment, redirect to Mayar
    // First create pending enrollment, then redirect
    window.location.href = course.mayar_link;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isSuccess ? "Pembayaran Berhasil! 🎉" : "Konfirmasi Pembelian"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess 
              ? "Selamat! Kamu sekarang punya akses ke course ini."
              : "Review pembelian kamu sebelum melanjutkan."
            }
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Mengalihkan ke halaman sukses...</p>
          </div>
        ) : (
          <>
            {/* Order Summary */}
            <div className="bg-muted/30 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-2">{course.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Akses selamanya</p>
                </div>
              </div>
              
              <div className="border-t border-border pt-3 space-y-2">
                {course.discount_price && course.discount_price < course.price && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Harga asli</span>
                    <span className="line-through text-muted-foreground">{formatRupiah(course.price)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Diskon</span>
                  <span className="text-primary font-medium">
                    -{formatRupiah(course.price - finalPrice)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{formatRupiah(finalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              {/* Mock Payment Button (Development) */}
              <button
                onClick={handleMockPayment}
                disabled={isProcessing}
                className="btn-primary w-full justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Simulasi Bayar (Dev Mode)
                  </>
                )}
              </button>
              
              {/* Real Payment Button */}
              {course.mayar_link && (
                <button
                  onClick={handleRealPayment}
                  className="btn-outline w-full justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Bayar via Mayar
                </button>
              )}

              <p className="text-xs text-center text-muted-foreground">
                Dengan membeli, kamu setuju dengan <a href="#" className="text-primary underline">Syarat & Ketentuan</a>
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
