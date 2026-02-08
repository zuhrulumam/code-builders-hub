import { useState } from "react";
import { Bell, Mail, Phone, Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface NotifyMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
}

const NotifyMeModal = ({ isOpen, onClose, courseTitle }: NotifyMeModalProps) => {
  const [contactType, setContactType] = useState<"email" | "whatsapp">("email");
  const [contactValue, setContactValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactValue.trim()) {
      toast({
        title: "Error",
        description: contactType === "email" ? "Masukkan email kamu" : "Masukkan nomor WhatsApp kamu",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, save to waitlist collection
    console.log("Notify me:", { contactType, contactValue, courseTitle });
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Siap! 🚀",
      description: "Kamu bakal dikabarin pertama pas course ini launch!"
    });
    
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setContactValue("");
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setIsSuccess(false);
    setContactValue("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            {isSuccess ? "Berhasil Terdaftar! 🎉" : "Notify Me"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess 
              ? "Kamu akan mendapat kabar pertama saat course ini rilis."
              : `Dapatkan notifikasi saat "${courseTitle}" sudah tersedia.`
            }
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Sampai jumpa! 👋</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Type Toggle */}
            <div className="flex gap-2 p-1 bg-muted rounded-xl">
              <button
                type="button"
                onClick={() => setContactType("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  contactType === "email"
                    ? "bg-white shadow-sm text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setContactType("whatsapp")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  contactType === "whatsapp"
                    ? "bg-white shadow-sm text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
            
            {/* Input */}
            <div>
              <Input
                type={contactType === "email" ? "email" : "tel"}
                placeholder={contactType === "email" ? "email@example.com" : "08123456789"}
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                className="h-12"
              />
            </div>
            
            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  Kabari Saya
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-muted-foreground">
              Kami tidak akan spam. Hanya notifikasi penting.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotifyMeModal;
