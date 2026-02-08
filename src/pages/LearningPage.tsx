import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Menu, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  Home,
  ListOrdered
} from "lucide-react";
import LearningSidebar from "@/components/learning/LearningSidebar";
import VideoPlayer from "@/components/learning/VideoPlayer";
import MarkdownContent from "@/components/learning/MarkdownContent";
import CodeSnippets from "@/components/learning/CodeSnippets";
import TableOfContents from "@/components/learning/TableOfContents";
import { 
  getCourseBySlug, 
  getChaptersByCourseId, 
  getLessonsByCourseId 
} from "@/lib/mockData";
import { 
  mockLessonsWithContent, 
  isLessonCompleted,
  mockLessonProgress
} from "@/lib/learningData";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const LearningPage = () => {
  const { courseSlug, lessonSlug } = useParams<{ courseSlug: string; lessonSlug?: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  // Fetch course data
  const course = useMemo(() => getCourseBySlug(courseSlug || ""), [courseSlug]);
  const chapters = useMemo(() => course ? getChaptersByCourseId(course.id) : [], [course]);
  const lessons = useMemo(() => course ? getLessonsByCourseId(course.id) : [], [course]);

  // Get current lesson
  const currentLesson = useMemo(() => {
    if (!lessonSlug) {
      // Default to first lesson
      return mockLessonsWithContent.find(l => 
        chapters.some(ch => ch.id === l.chapter_id)
      );
    }
    return mockLessonsWithContent.find(l => 
      l.slug === lessonSlug && chapters.some(ch => ch.id === l.chapter_id)
    );
  }, [lessonSlug, chapters]);

  // Get lesson index for navigation
  const allCourseLessons = useMemo(() => {
    return mockLessonsWithContent.filter(l => 
      chapters.some(ch => ch.id === l.chapter_id)
    ).sort((a, b) => {
      const chapterA = chapters.find(ch => ch.id === a.chapter_id)!;
      const chapterB = chapters.find(ch => ch.id === b.chapter_id)!;
      if (chapterA.order_index !== chapterB.order_index) {
        return chapterA.order_index - chapterB.order_index;
      }
      return a.order_index - b.order_index;
    });
  }, [chapters]);

  const currentLessonIndex = allCourseLessons.findIndex(l => l.id === currentLesson?.id);
  const prevLesson = currentLessonIndex > 0 ? allCourseLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allCourseLessons.length - 1 ? allCourseLessons[currentLessonIndex + 1] : null;
  const isLastLesson = currentLessonIndex === allCourseLessons.length - 1;
  const isCompleted = currentLesson ? isLessonCompleted(currentLesson.id) : false;

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson tidak ditemukan</h1>
          <Link to="/courses" className="btn-primary">
            Kembali ke Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleLessonSelect = (newLessonSlug: string) => {
    navigate(`/learn/${courseSlug}/${newLessonSlug}`);
  };

  const handleMarkComplete = () => {
    if (!isCompleted) {
      // Add to progress (in real app, save to DB)
      mockLessonProgress.push({
        id: `lp-${Date.now()}`,
        user_id: "user-1",
        lesson_id: currentLesson.id,
        course_id: course.id,
        is_completed: true,
        completed_at: new Date().toISOString()
      });

      toast({
        title: "Lesson selesai! 🎉",
        description: "Progress kamu sudah disimpan."
      });
    }

    // Navigate to next lesson
    if (nextLesson) {
      navigate(`/learn/${courseSlug}/${nextLesson.slug}`);
    } else {
      // Last lesson - go to dashboard
      navigate("/dashboard");
      toast({
        title: "Selamat! 🎊",
        description: "Kamu sudah menyelesaikan semua lesson di course ini!"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <LearningSidebar
        course={course}
        chapters={chapters}
        lessons={lessons}
        currentLessonId={currentLesson.id}
        onLessonSelect={handleLessonSelect}
        isMobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold text-sm truncate max-w-[200px]">
            {currentLesson.title}
          </span>
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="p-2 rounded-lg hover:bg-muted xl:hidden"
          >
            <ListOrdered className="w-5 h-5" />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Main Content */}
          <main className="flex-1 max-w-4xl mx-auto px-4 lg:px-8 py-8 pb-32">
            {/* Lesson Title */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Link to={`/courses/${courseSlug}`} className="hover:text-primary">
                  {course.title}
                </Link>
                <span>/</span>
                <span className="truncate">{currentLesson.title}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold">{currentLesson.title}</h1>
              {isCompleted && (
                <div className="flex items-center gap-2 text-primary mt-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Sudah selesai</span>
                </div>
              )}
            </div>

            {/* Video */}
            {currentLesson.video_url && (
              <div className="mb-8">
                <VideoPlayer videoUrl={currentLesson.video_url} />
              </div>
            )}

            {/* Markdown Content */}
            <MarkdownContent content={currentLesson.content_markdown} />

            {/* Code Snippets */}
            <CodeSnippets snippets={currentLesson.code_snippets} />
          </main>

          {/* Table of Contents - Desktop */}
          <TableOfContents content={currentLesson.content_markdown} />
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-72 bg-white border-t border-border px-4 py-4 z-30">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            {/* Previous */}
            {prevLesson ? (
              <button
                onClick={() => navigate(`/learn/${courseSlug}/${prevLesson.slug}`)}
                className="btn-outline gap-2 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
            ) : (
              <div />
            )}

            {/* Mark Complete & Continue */}
            <button
              onClick={handleMarkComplete}
              className="btn-primary gap-2 flex-1 max-w-xs justify-center"
            >
              {isLastLesson ? (
                <>
                  <Home className="w-4 h-4" />
                  🎉 Selesai! Ke Dashboard
                </>
              ) : isCompleted ? (
                <>
                  Lanjut
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Tandai Selesai & Lanjut
                </>
              )}
            </button>

            {/* Next */}
            {nextLesson ? (
              <button
                onClick={() => navigate(`/learn/${courseSlug}/${nextLesson.slug}`)}
                className="btn-outline gap-2 text-sm"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* Mobile TOC Drawer */}
      {tocOpen && (
        <>
          <div 
            className="xl:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setTocOpen(false)}
          />
          <div className="xl:hidden fixed right-0 top-0 bottom-0 w-72 bg-white z-50 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">On This Page</h4>
              <button onClick={() => setTocOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <TableOfContents content={currentLesson.content_markdown} />
          </div>
        </>
      )}
    </div>
  );
};

export default LearningPage;
