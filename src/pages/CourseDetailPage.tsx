import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Play, 
  Video, 
  Code, 
  Users, 
  MessageCircle,
  Clock,
  BookOpen,
  ShoppingCart,
  ExternalLink
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CurriculumAccordion from "@/components/courses/CurriculumAccordion";
import PaymentModal from "@/components/courses/PaymentModal";
import DonationSection from "@/components/courses/DonationSection";
import { Progress } from "@/components/ui/progress";
import { 
  getCourseBySlug, 
  getChaptersByCourseId, 
  getLessonsByCourseId,
  getEnrollmentByCourseId,
  formatRupiah,
  mockEnrollments,
  Enrollment
} from "@/lib/mockData";

const CourseDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Simulate logged in state
  const isLoggedIn = true;
  const currentUserId = "user-1";
  
  const course = useMemo(() => getCourseBySlug(slug || ""), [slug]);
  const chapters = useMemo(() => course ? getChaptersByCourseId(course.id) : [], [course]);
  const lessons = useMemo(() => course ? getLessonsByCourseId(course.id) : [], [course]);
  const enrollment = useMemo(() => course ? getEnrollmentByCourseId(course.id, currentUserId) : undefined, [course]);
  
  const isEnrolled = enrollment && (enrollment.payment_status === "paid" || enrollment.payment_status === "free");
  const isFree = course?.is_free;
  
  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold mb-4">Course tidak ditemukan</h1>
          <Link to="/courses" className="btn-primary">
            Kembali ke Courses
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const finalPrice = course.discount_price || course.price;
  const totalLessons = lessons.length;
  const totalDuration = lessons.reduce((acc, l) => acc + l.duration_minutes, 0);

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=/courses/${slug}`);
      return;
    }
    setShowPaymentModal(true);
  };

  const handleJoinFree = async () => {
    // Create free enrollment
    const newEnrollment: Enrollment = {
      id: `enroll-${Date.now()}`,
      user_id: currentUserId,
      course_id: course.id,
      payment_status: "free",
      enrolled_at: new Date().toISOString(),
      progress: 0
    };
    mockEnrollments.push(newEnrollment);
    
    navigate(`/payment/callback?course=${course.slug}&status=success&free=true`);
  };

  const handleMockPayment = async () => {
    // Create paid enrollment
    const newEnrollment: Enrollment = {
      id: `enroll-${Date.now()}`,
      user_id: currentUserId,
      course_id: course.id,
      payment_status: "paid",
      enrolled_at: new Date().toISOString(),
      progress: 0
    };
    mockEnrollments.push(newEnrollment);
  };

  const handleStartLearning = () => {
    navigate(`/learn/${course.slug}`);
  };

  const featureBadges = [
    { icon: Video, label: "Video Tutorial" },
    { icon: Code, label: "Source Code" },
    { icon: Users, label: "Live Session" },
    { icon: MessageCircle, label: "WA Support" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
            Courses
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium truncate max-w-[200px]">{course.title}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden relative">
              {course.cover_image && course.cover_image !== "/placeholder.svg" ? (
                <img 
                  src={course.cover_image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                </div>
              )}
              
              {/* Enrolled Badge */}
              {isEnrolled && (
                <div className="absolute top-4 left-4">
                  <span className="badge-enrolled text-sm px-4 py-2">
                    ✓ Kamu sudah terdaftar
                  </span>
                </div>
              )}
            </div>
            
            {/* Title & Description */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.short_desc}</p>
              
              {/* Feature Badges */}
              <div className="flex flex-wrap gap-3">
                {featureBadges.map((badge) => (
                  <div key={badge.label} className="badge-default flex items-center gap-2">
                    <badge.icon className="w-4 h-4" />
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progress (if enrolled) */}
            {isEnrolled && enrollment && (
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Progress Belajar</h3>
                  <span className="text-primary font-bold">{enrollment.progress}%</span>
                </div>
                <Progress value={enrollment.progress} className="h-3 mb-3" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(totalLessons * enrollment.progress / 100)} dari {totalLessons} lessons selesai
                </p>
              </div>
            )}
            
            {/* Long Description */}
            {course.long_desc && (
              <div className="prose prose-slate max-w-none">
                <h2 className="text-xl font-bold mb-4">Tentang Course Ini</h2>
                <div 
                  className="text-muted-foreground space-y-4"
                  dangerouslySetInnerHTML={{ __html: course.long_desc.replace(/\n/g, '<br/>') }}
                />
              </div>
            )}
            
            {/* Curriculum */}
            <div>
              <h2 className="text-xl font-bold mb-6">Kurikulum</h2>
              <CurriculumAccordion 
                chapters={chapters} 
                lessons={lessons}
                isEnrolled={!!isEnrolled}
              />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              <div className="card-custom p-6">
                {isEnrolled ? (
                  <>
                    {/* Enrolled State */}
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">Siap Belajar!</h3>
                      <p className="text-sm text-muted-foreground">Kamu punya akses penuh ke course ini</p>
                    </div>
                    
                    <button 
                      onClick={handleStartLearning}
                      className="btn-primary w-full justify-center gap-2 mb-4"
                    >
                      <Play className="w-5 h-5" />
                      Mulai Belajar
                    </button>
                    
                    {/* WA Group Link */}
                    {course.wa_group_link && (
                      <a 
                        href={course.wa_group_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary w-full justify-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Join WhatsApp Group
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    {/* Not Enrolled State */}
                    {/* Price */}
                    <div className="mb-6">
                      {isFree ? (
                        <div className="text-center">
                          <span className="text-3xl font-bold text-primary">Gratis</span>
                          <p className="text-sm text-muted-foreground mt-1">Akses penuh tanpa biaya</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          {course.discount_price && course.discount_price < course.price && (
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <span className="text-lg text-muted-foreground line-through">
                                {formatRupiah(course.price)}
                              </span>
                              <span className="badge-new">
                                Hemat {Math.round((1 - course.discount_price / course.price) * 100)}%
                              </span>
                            </div>
                          )}
                          <span className="text-3xl font-bold text-primary">
                            {formatRupiah(finalPrice)}
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">Akses selamanya</p>
                        </div>
                      )}
                    </div>
                    
                    {/* CTA Button */}
                    {isFree ? (
                      <button 
                        onClick={handleJoinFree}
                        className="btn-primary w-full justify-center gap-2"
                      >
                        Gabung Gratis 🎉
                      </button>
                    ) : (
                      <button 
                        onClick={handleBuyNow}
                        className="btn-primary w-full justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Beli Sekarang
                      </button>
                    )}
                    
                    {/* Features List */}
                    <div className="mt-6 pt-6 border-t border-border space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Video className="w-5 h-5 text-primary" />
                        <span>{totalLessons} video lessons</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m total durasi</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <span>{chapters.length} chapters</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <span>WhatsApp support</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Donation Section (for free courses) */}
              {isFree && (
                <DonationSection 
                  onDonate={(amount) => {
                    console.log("Donate:", amount);
                    // Redirect to Mayar donation page
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Sticky CTA */}
      {!isEnrolled && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 lg:hidden z-40">
          <div className="flex items-center justify-between gap-4">
            <div>
              {isFree ? (
                <span className="text-xl font-bold text-primary">Gratis</span>
              ) : (
                <div>
                  {course.discount_price && course.discount_price < course.price && (
                    <span className="text-sm text-muted-foreground line-through mr-2">
                      {formatRupiah(course.price)}
                    </span>
                  )}
                  <span className="text-xl font-bold text-primary">{formatRupiah(finalPrice)}</span>
                </div>
              )}
            </div>
            <button 
              onClick={isFree ? handleJoinFree : handleBuyNow}
              className="btn-primary px-6"
            >
              {isFree ? "Gabung Gratis 🎉" : "Beli Sekarang"}
            </button>
          </div>
        </div>
      )}
      
      <div className={!isEnrolled ? "pb-24 lg:pb-0" : ""}>
        <Footer />
      </div>
      
      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        course={course}
        onConfirmMockPayment={handleMockPayment}
      />
    </div>
  );
};

export default CourseDetailPage;
