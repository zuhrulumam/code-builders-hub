import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, CheckCircle2, Play, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  mockCourses, 
  mockEnrollments, 
  Course,
  Enrollment
} from "@/lib/mockData";

const MyCourses = () => {
  const currentUserId = "user-1";

  // Get enrolled courses with progress
  const enrolledCourses = useMemo(() => {
    const validEnrollments = mockEnrollments.filter(
      e => e.user_id === currentUserId && e.payment_status !== "pending"
    );
    
    return validEnrollments.map(enrollment => {
      const course = mockCourses.find(c => c.id === enrollment.course_id);
      return { enrollment, course };
    }).filter(item => item.course !== undefined) as { enrollment: Enrollment; course: Course }[];
  }, []);

  // Stats
  const stats = useMemo(() => {
    const total = enrolledCourses.length;
    const inProgress = enrolledCourses.filter(
      ({ enrollment }) => enrollment.progress > 0 && enrollment.progress < 100
    ).length;
    const completed = enrolledCourses.filter(
      ({ enrollment }) => enrollment.progress === 100
    ).length;

    return { total, inProgress, completed };
  }, [enrolledCourses]);

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-custom p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Course</p>
            </div>
          </div>
        </div>

        <div className="card-custom p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">Sedang Dipelajari</p>
            </div>
          </div>
        </div>

        <div className="card-custom p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.completed}</p>
              <p className="text-sm text-muted-foreground">Selesai</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4">Course Saya</h2>
        
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map(({ course, enrollment }) => (
              <div key={course.id} className="card-custom overflow-hidden">
                <div className="flex gap-4 p-4">
                  {/* Cover Image */}
                  <div className="w-24 h-20 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {course.cover_image && course.cover_image !== "/placeholder.svg" ? (
                      <img 
                        src={course.cover_image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Play className="w-8 h-8 text-primary" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm line-clamp-2">{course.title}</h3>
                      {enrollment.progress === 100 && (
                        <span className="badge-enrolled text-xs whitespace-nowrap">
                          ✅ Selesai
                        </span>
                      )}
                    </div>
                    
                    {/* Progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold text-primary">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-4 pb-4">
                  <Link
                    to={`/learn/${course.slug}`}
                    className="btn-primary w-full justify-center gap-2 text-sm py-2.5"
                  >
                    <Play className="w-4 h-4" />
                    {enrollment.progress === 100 ? "Review Materi" : "Lanjut Belajar"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-custom p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Belum ada course</h3>
            <p className="text-muted-foreground mb-6">
              Yuk mulai belajar dengan pilih course yang cocok buat kamu!
            </p>
            <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
              Lihat Semua Course
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
