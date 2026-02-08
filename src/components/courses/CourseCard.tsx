import { Link } from "react-router-dom";
import { Clock, ArrowRight, Bell, Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Course, Enrollment, formatRupiah } from "@/lib/mockData";

interface CourseCardProps {
  course: Course;
  enrollment?: Enrollment;
}

const CourseCard = ({ course, enrollment }: CourseCardProps) => {
  const isEnrolled = !!enrollment && (enrollment.payment_status === "paid" || enrollment.payment_status === "free");
  const isComingSoon = course.status === "coming_soon";
  const isFree = course.is_free;

  const getBadge = () => {
    if (isEnrolled) {
      return <span className="badge-enrolled">ENROLLED ✓</span>;
    }
    if (isFree) {
      return <span className="badge-free">FREE</span>;
    }
    if (isComingSoon) {
      return <span className="badge-coming-soon">COMING SOON</span>;
    }
    return null;
  };

  const getPrice = () => {
    if (isEnrolled) return null;
    if (isFree) return <span className="font-bold text-primary">Gratis</span>;
    
    if (course.discount_price && course.discount_price < course.price) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground line-through">
            {formatRupiah(course.price)}
          </span>
          <span className="font-bold text-lg text-primary">
            {formatRupiah(course.discount_price)}
          </span>
        </div>
      );
    }
    
    return <span className="font-bold text-lg">{formatRupiah(course.price)}</span>;
  };

  const getCTA = () => {
    if (isEnrolled) {
      return (
        <Link
          to={`/learn/${course.slug}`}
          className="btn-primary w-full justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Lanjut Belajar
        </Link>
      );
    }
    
    if (isComingSoon) {
      return (
        <button
          className="btn-outline w-full justify-center gap-2 opacity-70 cursor-not-allowed"
          disabled
        >
          <Bell className="w-4 h-4" />
          Notify Me
        </button>
      );
    }
    
    return (
      <Link
        to={`/courses/${course.slug}`}
        className="btn-outline w-full justify-center gap-2"
      >
        Lihat Detail
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  };

  return (
    <div className={`card-custom flex flex-col ${isComingSoon ? 'opacity-85' : ''}`}>
      {/* Cover Image */}
      <div className="relative aspect-video bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        {course.cover_image && course.cover_image !== "/placeholder.svg" ? (
          <img 
            src={course.cover_image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Play className="w-8 h-8 text-primary" />
          </div>
        )}
        
        {/* Badge */}
        {getBadge() && (
          <div className="absolute top-3 left-3">
            {getBadge()}
          </div>
        )}
        
        {/* Coming Soon Overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-white/30 flex items-center justify-center">
            <Clock className="w-10 h-10 text-muted-foreground/60" />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {course.short_desc}
        </p>
        
        {/* Progress Bar (only if enrolled) */}
        {isEnrolled && enrollment && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">{enrollment.progress}% selesai</span>
            </div>
            <Progress value={enrollment.progress} className="h-2" />
          </div>
        )}
        
        <div className="mt-auto space-y-3">
          {/* Price */}
          {getPrice() && (
            <div className="pt-3 border-t border-border">
              {getPrice()}
            </div>
          )}
          
          {/* CTA */}
          {getCTA()}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
