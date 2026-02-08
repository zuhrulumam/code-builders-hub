import { useState } from "react";
import { ChevronDown, Lock, Unlock, PlayCircle, Clock } from "lucide-react";
import { Chapter, Lesson, getLessonsByChapterId } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface CurriculumAccordionProps {
  chapters: Chapter[];
  lessons: Lesson[];
  isEnrolled: boolean;
}

const CurriculumAccordion = ({ chapters, lessons, isEnrolled }: CurriculumAccordionProps) => {
  const [openChapters, setOpenChapters] = useState<string[]>([chapters[0]?.id || ""]);

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

  const totalLessons = lessons.length;
  const totalDuration = lessons.reduce((acc, l) => acc + l.duration_minutes, 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
        <span className="flex items-center gap-1.5">
          <PlayCircle className="w-4 h-4" />
          {totalLessons} lessons
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {Math.floor(totalDuration / 60)}h {totalDuration % 60}m total
        </span>
        <span>•</span>
        <span>{chapters.length} chapters</span>
      </div>
      
      {/* Chapters */}
      {chapters.map((chapter, chapterIndex) => {
        const chapterLessons = getLessonsForChapter(chapter.id);
        const isOpen = openChapters.includes(chapter.id);
        
        return (
          <div key={chapter.id} className="border border-border rounded-xl overflow-hidden bg-white">
            {/* Chapter Header */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {chapterIndex + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-foreground">{chapter.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {chapterLessons.length} lessons • {chapterLessons.reduce((acc, l) => acc + l.duration_minutes, 0)} min
                  </p>
                </div>
              </div>
              <ChevronDown className={cn(
                "w-5 h-5 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )} />
            </button>
            
            {/* Lessons List */}
            <div className={cn(
              "overflow-hidden transition-all duration-300",
              isOpen ? "max-h-[1000px]" : "max-h-0"
            )}>
              <div className="border-t border-border">
                {chapterLessons.map((lesson, lessonIndex) => {
                  const canAccess = isEnrolled || lesson.is_free_preview;
                  
                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        "flex items-center gap-3 p-4 border-b border-border last:border-b-0",
                        canAccess ? "hover:bg-primary/5" : "opacity-60"
                      )}
                    >
                      {/* Lock/Unlock Icon */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/50">
                        {canAccess ? (
                          lesson.is_free_preview && !isEnrolled ? (
                            <Unlock className="w-4 h-4 text-primary" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-primary" />
                          )
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      
                      {/* Lesson Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{lesson.title}</span>
                          {lesson.is_free_preview && !isEnrolled && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              🔓 Free Preview
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          {lesson.video_url && <span>🎬 Video</span>}
                          <span>{lesson.duration_minutes} min</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CurriculumAccordion;
