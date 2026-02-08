import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PartyPopper, ArrowRight } from "lucide-react";
import CourseCard from "@/components/courses/CourseCard";
import { mockCourses, mockEnrollments } from "@/lib/mockData";

const BrowseCourses = () => {
  const currentUserId = "user-1";

  // Get courses not enrolled
  const unenrolledCourses = useMemo(() => {
    const enrolledCourseIds = mockEnrollments
      .filter(e => e.user_id === currentUserId && e.payment_status !== "pending")
      .map(e => e.course_id);
    
    return mockCourses.filter(
      c => c.status === "published" && !enrolledCourseIds.includes(c.id)
    );
  }, []);

  const allPurchased = unenrolledCourses.length === 0;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h2 className="text-xl font-bold mb-1">Browse Course</h2>
        <p className="text-muted-foreground">
          {allPurchased 
            ? "Semua course sudah kamu beli!" 
            : "Course yang belum kamu beli"
          }
        </p>
      </div>

      {allPurchased ? (
        <div className="card-custom p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <PartyPopper className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">🎉 Semua course sudah kamu beli!</h3>
          <p className="text-muted-foreground mb-6">
            Keren! Kamu sudah punya akses ke semua course yang tersedia. 
            Tunggu course baru ya!
          </p>
          <Link to="/dashboard" className="btn-outline inline-flex items-center gap-2">
            Lihat Course Saya
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unenrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseCourses;
