import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CourseCard from "@/components/courses/CourseCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCourses, mockEnrollments, getEnrollmentByCourseId } from "@/lib/mockData";

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Simulate logged in state (will be replaced with real auth)
  const isLoggedIn = true;
  const currentUserId = "user-1";

  // Filter courses based on status
  const availableCourses = mockCourses.filter(c => c.status !== "draft");
  
  const filteredCourses = useMemo(() => {
    return availableCourses.filter(course => {
      const enrollment = getEnrollmentByCourseId(course.id, currentUserId);
      const isEnrolled = enrollment && (enrollment.payment_status === "paid" || enrollment.payment_status === "free");
      
      switch (activeTab) {
        case "enrolled":
          return isEnrolled;
        case "not-enrolled":
          return !isEnrolled && course.status === "published";
        default:
          return true;
      }
    });
  }, [activeTab, availableCourses]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-custom section-padding">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Courses</span>
        </div>
        
        {/* Header */}
        <div className="mb-10">
          <span className="eyebrow block mb-2">COURSES</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Semua Course</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Pilih course yang cocok buat kamu. Dari pemula sampai advanced.
          </p>
        </div>
        
        {/* Filter Tabs (only for logged in users) */}
        {isLoggedIn && (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-white border border-border">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Semua
              </TabsTrigger>
              <TabsTrigger value="enrolled" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Sudah Dibeli
              </TabsTrigger>
              <TabsTrigger value="not-enrolled" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Belum Dibeli
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        
        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const enrollment = getEnrollmentByCourseId(course.id, currentUserId);
              return (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  enrollment={enrollment}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              {activeTab === "enrolled" 
                ? "Kamu belum punya course. Yuk mulai belajar!" 
                : "Tidak ada course yang tersedia."}
            </p>
            {activeTab === "enrolled" && (
              <button 
                onClick={() => setActiveTab("all")}
                className="btn-primary"
              >
                Lihat Semua Course
              </button>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CoursesPage;
