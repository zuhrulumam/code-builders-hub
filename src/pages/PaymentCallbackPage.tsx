import { useEffect, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, MessageCircle, Play, RefreshCw, Home } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import { getCourseBySlug } from "@/lib/mockData";

const PaymentCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const courseSlug = searchParams.get("course");
  const status = searchParams.get("status");
  const isFree = searchParams.get("free") === "true";
  
  const course = useMemo(() => getCourseBySlug(courseSlug || ""), [courseSlug]);
  
  const isSuccess = status === "success";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-custom section-padding">
        <div className="max-w-lg mx-auto text-center">
          {isSuccess ? (
            <>
              {/* Success State */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="text-3xl font-bold mb-3">
                {isFree ? "Selamat Bergabung! 🎉" : "Pembayaran Berhasil! 🎉"}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                {isFree 
                  ? "Kamu sekarang punya akses penuh ke course ini. Yuk mulai belajar!"
                  : "Terima kasih atas pembelianmu. Kamu sekarang punya akses penuh ke course ini."
                }
              </p>
              
              {course && (
                <div className="bg-white rounded-2xl border border-border p-6 mb-8 text-left">
                  <h3 className="font-semibold mb-2">Course yang kamu beli:</h3>
                  <p className="text-lg font-bold text-primary">{course.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{course.short_desc}</p>
                </div>
              )}
              
              <div className="space-y-4">
                {/* WA Group Button */}
                {course?.wa_group_link && (
                  <a 
                    href={course.wa_group_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    💬 Join WhatsApp Group
                  </a>
                )}
                
                {/* Start Learning Button */}
                <Link 
                  to={`/learn/${courseSlug}`}
                  className="btn-primary w-full justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Mulai Belajar Sekarang
                </Link>
                
                {/* Back to Courses */}
                <Link 
                  to="/courses"
                  className="btn-outline w-full justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Kembali ke Courses
                </Link>
              </div>
              
              {/* Confetti-like decoration */}
              <div className="mt-12 text-6xl">🎊</div>
            </>
          ) : (
            <>
              {/* Failed State */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-destructive" />
              </div>
              
              <h1 className="text-3xl font-bold mb-3">Pembayaran Gagal</h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Maaf, terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.
              </p>
              
              {course && (
                <div className="bg-white rounded-2xl border border-border p-6 mb-8 text-left">
                  <h3 className="font-semibold mb-2">Course:</h3>
                  <p className="text-lg font-bold">{course.title}</p>
                </div>
              )}
              
              <div className="space-y-4">
                {/* Retry Button */}
                <Link 
                  to={`/courses/${courseSlug}`}
                  className="btn-primary w-full justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Coba Lagi
                </Link>
                
                {/* Back to Courses */}
                <Link 
                  to="/courses"
                  className="btn-outline w-full justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Kembali ke Courses
                </Link>
              </div>
              
              {/* Help Text */}
              <p className="mt-8 text-sm text-muted-foreground">
                Butuh bantuan? Hubungi kami di{" "}
                <a href="mailto:support@codewithmam.com" className="text-primary underline">
                  support@codewithmam.com
                </a>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaymentCallbackPage;
