import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  mockCourses, 
  mockChapters, 
  mockLessons, 
  Chapter, 
  Lesson,
  CodeSnippet 
} from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  GripVertical, 
  Video, 
  FileText,
  ChevronUp,
  ChevronDown,
  X
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import MarkdownContent from "@/components/learning/MarkdownContent";

const LANGUAGES = [
  "javascript", "typescript", "go", "python", "bash", 
  "dockerfile", "yaml", "json", "sql", "php", "html", "css"
];

const AdminCourseContent = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  const course = mockCourses.find(c => c.id === courseId);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ type: "chapter" | "lesson"; id: string } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (courseId) {
      setChapters(mockChapters.filter(ch => ch.course_id === courseId).sort((a, b) => a.order_index - b.order_index));
      const courseChapterIds = mockChapters.filter(ch => ch.course_id === courseId).map(ch => ch.id);
      setLessons(mockLessons.filter(l => courseChapterIds.includes(l.chapter_id)).sort((a, b) => a.order_index - b.order_index));
    }
  }, [courseId]);

  const getLessonsForChapter = (chapterId: string) => {
    return lessons.filter(l => l.chapter_id === chapterId).sort((a, b) => a.order_index - b.order_index);
  };

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `ch-new-${Date.now()}`,
      course_id: courseId!,
      title: "Chapter Baru",
      order_index: chapters.length + 1,
    };
    setChapters([...chapters, newChapter]);
    toast.success("Chapter ditambahkan");
  };

  const addLesson = (chapterId: string) => {
    const chapterLessons = getLessonsForChapter(chapterId);
    const newLesson: Lesson = {
      id: `l-new-${Date.now()}`,
      slug: `lesson-${Date.now()}`,
      chapter_id: chapterId,
      title: "Lesson Baru",
      order_index: chapterLessons.length + 1,
      is_free_preview: false,
      video_url: null,
      duration_minutes: 0,
      content_markdown: "",
      code_snippets: [],
    };
    setLessons([...lessons, newLesson]);
    setSelectedLesson(newLesson);
    toast.success("Lesson ditambahkan");
  };

  const updateChapter = (id: string, title: string) => {
    setChapters(prev => prev.map(ch => ch.id === id ? { ...ch, title } : ch));
  };

  const updateLesson = (id: string, updates: Partial<Lesson>) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    if (selectedLesson?.id === id) {
      setSelectedLesson(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const moveChapter = (index: number, direction: "up" | "down") => {
    const newChapters = [...chapters];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newChapters.length) return;
    
    [newChapters[index], newChapters[targetIndex]] = [newChapters[targetIndex], newChapters[index]];
    newChapters.forEach((ch, i) => ch.order_index = i + 1);
    setChapters(newChapters);
  };

  const moveLesson = (chapterId: string, index: number, direction: "up" | "down") => {
    const chapterLessons = getLessonsForChapter(chapterId);
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= chapterLessons.length) return;
    
    const lessonId = chapterLessons[index].id;
    const targetLessonId = chapterLessons[targetIndex].id;
    
    setLessons(prev => prev.map(l => {
      if (l.id === lessonId) return { ...l, order_index: targetIndex + 1 };
      if (l.id === targetLessonId) return { ...l, order_index: index + 1 };
      return l;
    }));
  };

  const confirmDelete = () => {
    if (!deleteDialog) return;
    
    if (deleteDialog.type === "chapter") {
      setChapters(prev => prev.filter(ch => ch.id !== deleteDialog.id));
      setLessons(prev => prev.filter(l => l.chapter_id !== deleteDialog.id));
      toast.success("Chapter dan semua lesson terhapus");
    } else {
      setLessons(prev => prev.filter(l => l.id !== deleteDialog.id));
      if (selectedLesson?.id === deleteDialog.id) {
        setSelectedLesson(null);
      }
      toast.success("Lesson terhapus");
    }
    setDeleteDialog(null);
  };

  const addCodeSnippet = () => {
    if (!selectedLesson) return;
    const newSnippet: CodeSnippet = {
      filename: "file.js",
      language: "javascript",
      code: "",
    };
    updateLesson(selectedLesson.id, {
      code_snippets: [...(selectedLesson.code_snippets || []), newSnippet],
    });
  };

  const updateCodeSnippet = (index: number, updates: Partial<CodeSnippet>) => {
    if (!selectedLesson) return;
    const newSnippets = [...(selectedLesson.code_snippets || [])];
    newSnippets[index] = { ...newSnippets[index], ...updates };
    updateLesson(selectedLesson.id, { code_snippets: newSnippets });
  };

  const removeCodeSnippet = (index: number) => {
    if (!selectedLesson) return;
    const newSnippets = (selectedLesson.code_snippets || []).filter((_, i) => i !== index);
    updateLesson(selectedLesson.id, { code_snippets: newSnippets });
  };

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Course not found</p>
        <Button variant="link" onClick={() => navigate("/admin")}>
          Kembali ke Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground mt-1">{course.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Chapter & Lesson Tree */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Chapters & Lessons</h2>
            <Button size="sm" onClick={addChapter} className="gap-1">
              <Plus className="w-4 h-4" />
              Chapter
            </Button>
          </div>

          <div className="card-custom p-4 space-y-2 max-h-[70vh] overflow-y-auto">
            <Accordion type="multiple" className="space-y-2">
              {chapters.map((chapter, chapterIndex) => (
                <AccordionItem 
                  key={chapter.id} 
                  value={chapter.id}
                  className="border rounded-xl px-3 bg-muted/30"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <button 
                        onClick={() => moveChapter(chapterIndex, "up")}
                        disabled={chapterIndex === 0}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => moveChapter(chapterIndex, "down")}
                        disabled={chapterIndex === chapters.length - 1}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    <AccordionTrigger className="flex-1 hover:no-underline py-3">
                      <Input
                        value={chapter.title}
                        onChange={(e) => updateChapter(chapter.id, e.target.value)}
                        className="h-8 text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </AccordionTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteDialog({ type: "chapter", id: chapter.id })}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <AccordionContent className="pb-3">
                    <div className="space-y-1 mt-2">
                      {getLessonsForChapter(chapter.id).map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                            selectedLesson?.id === lesson.id
                              ? "bg-primary/10 border-l-4 border-primary"
                              : "hover:bg-muted"
                          )}
                        >
                          <div className="flex flex-col">
                            <button 
                              onClick={(e) => { e.stopPropagation(); moveLesson(chapter.id, lessonIndex, "up"); }}
                              disabled={lessonIndex === 0}
                              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); moveLesson(chapter.id, lessonIndex, "down"); }}
                              disabled={lessonIndex === getLessonsForChapter(chapter.id).length - 1}
                              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{lesson.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {lesson.video_url && <Video className="w-3 h-3" />}
                              {lesson.is_free_preview && <span className="text-primary">Free</span>}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive hover:text-destructive"
                            onClick={(e) => { e.stopPropagation(); setDeleteDialog({ type: "lesson", id: lesson.id }); }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-muted-foreground"
                        onClick={() => addLesson(chapter.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Lesson
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {chapters.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Belum ada chapter. Klik tombol "+ Chapter" untuk memulai.
              </p>
            )}
          </div>
        </div>

        {/* Right Panel - Editor */}
        <div className="lg:col-span-2">
          {selectedLesson ? (
            <div className="card-custom p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Edit Lesson</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? "Editor" : "Preview"}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="lesson_title">Title</Label>
                  <Input
                    id="lesson_title"
                    value={selectedLesson.title}
                    onChange={(e) => updateLesson(selectedLesson.id, { title: e.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="video_url">Video URL (YouTube)</Label>
                  <Input
                    id="video_url"
                    value={selectedLesson.video_url || ""}
                    onChange={(e) => updateLesson(selectedLesson.id, { video_url: e.target.value || null })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="mt-1.5"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Switch
                    id="is_free_preview"
                    checked={selectedLesson.is_free_preview}
                    onCheckedChange={(checked) => updateLesson(selectedLesson.id, { is_free_preview: checked })}
                  />
                  <Label htmlFor="is_free_preview">Bisa diakses gratis (preview)</Label>
                </div>

                <div>
                  <Label>Content (Markdown)</Label>
                  {previewMode ? (
                    <div className="mt-1.5 border rounded-xl p-4 min-h-[300px] bg-white">
                      <MarkdownContent content={selectedLesson.content_markdown || ""} />
                    </div>
                  ) : (
                    <Textarea
                      value={selectedLesson.content_markdown}
                      onChange={(e) => updateLesson(selectedLesson.id, { content_markdown: e.target.value })}
                      placeholder="# Heading&#10;&#10;Tulis konten lesson di sini..."
                      className="mt-1.5 font-mono text-sm min-h-[300px]"
                    />
                  )}
                </div>

                {/* Code Snippets */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Code Snippets</Label>
                    <Button variant="outline" size="sm" onClick={addCodeSnippet}>
                      <Plus className="w-4 h-4 mr-1" />
                      Tambah Snippet
                    </Button>
                  </div>

                  {(selectedLesson.code_snippets || []).map((snippet, index) => (
                    <div key={index} className="border rounded-xl p-4 space-y-3 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Input
                          value={snippet.filename}
                          onChange={(e) => updateCodeSnippet(index, { filename: e.target.value })}
                          placeholder="filename.js"
                          className="flex-1 font-mono text-sm"
                        />
                        <Select
                          value={snippet.language}
                          onValueChange={(value) => updateCodeSnippet(index, { language: value })}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGES.map(lang => (
                              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeCodeSnippet(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea
                        value={snippet.code}
                        onChange={(e) => updateCodeSnippet(index, { code: e.target.value })}
                        placeholder="// Your code here..."
                        className="font-mono text-sm min-h-[150px]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={() => toast.success("Lesson disimpan")} className="w-full">
                Simpan Lesson
              </Button>
            </div>
          ) : (
            <div className="card-custom p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Pilih Lesson</h3>
              <p className="text-muted-foreground">
                Klik lesson di panel kiri untuk mulai mengedit konten.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              {deleteDialog?.type === "chapter" 
                ? "Semua lesson di chapter ini akan ikut terhapus. Aksi ini tidak bisa dibatalkan."
                : "Lesson ini akan dihapus. Aksi ini tidak bisa dibatalkan."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(null)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourseContent;
