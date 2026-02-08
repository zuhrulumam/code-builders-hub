import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronDown, 
  CheckCircle2, 
  Circle,
  PlayCircle,
  Menu,
  X
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Course, Chapter, Lesson } from "@/lib/mockData";
import { isLessonCompleted } from "@/lib/learningData";
import { cn } from "@/lib/utils";

interface LearningSidebarProps {
  course: Course;
  chapters: Chapter[];
  lessons: Lesson[];
  currentLessonId: string;
  onLessonSelect: (lessonSlug: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const LearningSidebar = ({ 
  course, 
  chapters, 
  lessons, 
  currentLessonId,
  onLessonSelect,
  isMobileOpen,
  onMobileClose
}: LearningSidebarProps) => {
  const [openChapters, setOpenChapters] = useState<string[]>(
    chapters.map(ch => ch.id)
  );

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => 
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const getLessonsForChapter = (chapterId: string) => {
    return lessons.filter(l => l.chapter_id === chapterId).sort((a, b) => a.order_index - b.order_index);
  };

  // Calculate progress
  const completedLessons = lessons.filter(l => isLessonCompleted(l.id)).length;
  const totalLessons = lessons.length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Link 
          to={`/courses/${course.slug}`}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-3"
        >
          <ChevronLeft className="w-4 h-4" />
          Kembali ke Course
        </Link>
        <h2 className="font-semibold text-sm line-clamp-2">{course.title}</h2>
        
        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-primary">
              {completedLessons}/{totalLessons} selesai ({progressPercent}%)
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>

      {/* Chapters */}
      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter, chapterIndex) => {
          const chapterLessons = getLessonsForChapter(chapter.id);
          const chapterCompleted = chapterLessons.filter(l => isLessonCompleted(l.id)).length;
          const isOpen = openChapters.includes(chapter.id);

          return (
            <div key={chapter.id} className="border-b border-border">
              {/* Chapter Header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    {chapterIndex + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">{chapter.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {chapterCompleted}/{chapterLessons.length} selesai
                    </p>
                  </div>
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )} />
              </button>

              {/* Lessons */}
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-[1000px]" : "max-h-0"
              )}>
                {chapterLessons.map((lesson) => {
                  const isCompleted = isLessonCompleted(lesson.id);
                  const isActive = lesson.id === currentLessonId;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        onLessonSelect(lesson.slug);
                        onMobileClose();
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left transition-all",
                        isActive 
                          ? "bg-primary/10 border-l-4 border-primary" 
                          : "hover:bg-muted/50 border-l-4 border-transparent"
                      )}
                    >
                      {/* Status Icon */}
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm line-clamp-1",
                          isActive ? "font-semibold text-primary" : "text-foreground"
                        )}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          {lesson.video_url && (
                            <span className="flex items-center gap-1">
                              <PlayCircle className="w-3 h-3" />
                              Video
                            </span>
                          )}
                          <span>{lesson.duration_minutes} min</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-border fixed left-0 top-0 bottom-0 z-40 overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold">Materi</span>
          <button onClick={onMobileClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
};

export default LearningSidebar;
