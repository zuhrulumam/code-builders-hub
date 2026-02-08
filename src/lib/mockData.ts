// Mock data for courses - will be replaced with PocketBase data
export interface Course {
  id: string;
  title: string;
  slug: string;
  short_desc: string;
  long_desc: string;
  cover_image: string;
  price: number;
  discount_price: number | null;
  status: "published" | "coming_soon" | "draft";
  is_free: boolean;
  order_index: number;
  mayar_link: string;
  wa_group_link: string;
}

export interface Chapter {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
}

export interface Lesson {
  id: string;
  chapter_id: string;
  title: string;
  order_index: number;
  is_free_preview: boolean;
  video_url: string | null;
  duration_minutes: number;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  payment_status: "pending" | "paid" | "free" | "failed";
  enrolled_at: string;
  progress: number;
}

// Mock courses
export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Build & Deploy SaaS dengan AI Tools",
    slug: "build-deploy-saas-ai-tools",
    short_desc: "Dari ide sampai live, deploy SaaS pertamamu dengan bantuan AI. Cocok untuk pemula yang mau langsung praktek.",
    long_desc: `# Belajar Build SaaS dari Nol

Course ini akan mengajarkan kamu cara membangun aplikasi SaaS dari awal sampai deploy.

## Yang Akan Kamu Pelajari

- Setup project dengan Lovable + Supabase
- Integrasi payment dengan Mayar
- Deploy ke production
- Marketing dasar untuk SaaS

## Untuk Siapa Course Ini?

- Pemula yang mau belajar coding
- Non-technical founder yang mau bikin produk sendiri
- Developer yang mau belajar workflow AI-first`,
    cover_image: "/placeholder.svg",
    price: 150000,
    discount_price: 99000,
    status: "published",
    is_free: false,
    order_index: 1,
    mayar_link: "https://mayar.id/codewith umam/saas-course",
    wa_group_link: "https://chat.whatsapp.com/abc123"
  },
  {
    id: "course-2",
    title: "Automation dengan Make.com",
    slug: "automation-make-com",
    short_desc: "Automasikan bisnis kamu tanpa coding. Dari email marketing sampai integrasi apps.",
    long_desc: `# Master Automation dengan Make.com

Pelajari cara mengotomatisasi workflow bisnis kamu menggunakan Make.com (Integromat).`,
    cover_image: "/placeholder.svg",
    price: 0,
    discount_price: null,
    status: "published",
    is_free: true,
    order_index: 2,
    mayar_link: "",
    wa_group_link: "https://chat.whatsapp.com/def456"
  },
  {
    id: "course-3",
    title: "Mobile App tanpa Code",
    slug: "mobile-app-no-code",
    short_desc: "Bikin aplikasi mobile pakai FlutterFlow. Publish ke Play Store & App Store.",
    long_desc: "",
    cover_image: "/placeholder.svg",
    price: 200000,
    discount_price: null,
    status: "coming_soon",
    is_free: false,
    order_index: 3,
    mayar_link: "",
    wa_group_link: ""
  },
  {
    id: "course-4",
    title: "AI Chatbot untuk Bisnis",
    slug: "ai-chatbot-bisnis",
    short_desc: "Build chatbot customer service yang smart dengan ChatGPT API.",
    long_desc: "",
    cover_image: "/placeholder.svg",
    price: 175000,
    discount_price: null,
    status: "coming_soon",
    is_free: false,
    order_index: 4,
    mayar_link: "",
    wa_group_link: ""
  }
];

// Mock chapters
export const mockChapters: Chapter[] = [
  { id: "ch-1", course_id: "course-1", title: "Persiapan & Setup Environment", order_index: 1 },
  { id: "ch-2", course_id: "course-1", title: "Build MVP dengan Lovable", order_index: 2 },
  { id: "ch-3", course_id: "course-1", title: "Database & Authentication", order_index: 3 },
  { id: "ch-4", course_id: "course-1", title: "Payment Integration", order_index: 4 },
  { id: "ch-5", course_id: "course-1", title: "Deploy & Go Live", order_index: 5 },
  { id: "ch-6", course_id: "course-2", title: "Pengenalan Make.com", order_index: 1 },
  { id: "ch-7", course_id: "course-2", title: "Integrasi Antar Apps", order_index: 2 },
  { id: "ch-8", course_id: "course-2", title: "Advanced Automation", order_index: 3 },
];

// Mock lessons
export const mockLessons: Lesson[] = [
  // Course 1 - Chapter 1
  { id: "l-1", chapter_id: "ch-1", title: "Intro & Apa yang Akan Kamu Bangun", order_index: 1, is_free_preview: true, video_url: "https://youtube.com/watch?v=abc", duration_minutes: 8 },
  { id: "l-2", chapter_id: "ch-1", title: "Setup Akun Lovable", order_index: 2, is_free_preview: true, video_url: "https://youtube.com/watch?v=def", duration_minutes: 5 },
  { id: "l-3", chapter_id: "ch-1", title: "Setup Supabase Project", order_index: 3, is_free_preview: false, video_url: "https://youtube.com/watch?v=ghi", duration_minutes: 12 },
  // Course 1 - Chapter 2
  { id: "l-4", chapter_id: "ch-2", title: "Prompting yang Efektif", order_index: 1, is_free_preview: false, video_url: "https://youtube.com/watch?v=jkl", duration_minutes: 15 },
  { id: "l-5", chapter_id: "ch-2", title: "Build Landing Page", order_index: 2, is_free_preview: false, video_url: "https://youtube.com/watch?v=mno", duration_minutes: 20 },
  { id: "l-6", chapter_id: "ch-2", title: "Build Dashboard", order_index: 3, is_free_preview: false, video_url: "https://youtube.com/watch?v=pqr", duration_minutes: 25 },
  // Course 1 - Chapter 3
  { id: "l-7", chapter_id: "ch-3", title: "Setup Database Schema", order_index: 1, is_free_preview: false, video_url: "https://youtube.com/watch?v=stu", duration_minutes: 18 },
  { id: "l-8", chapter_id: "ch-3", title: "Implement Auth", order_index: 2, is_free_preview: false, video_url: "https://youtube.com/watch?v=vwx", duration_minutes: 22 },
  // Course 1 - Chapter 4
  { id: "l-9", chapter_id: "ch-4", title: "Setup Mayar Account", order_index: 1, is_free_preview: false, video_url: "https://youtube.com/watch?v=yza", duration_minutes: 10 },
  { id: "l-10", chapter_id: "ch-4", title: "Integrate Payment Flow", order_index: 2, is_free_preview: false, video_url: "https://youtube.com/watch?v=bcd", duration_minutes: 30 },
  // Course 1 - Chapter 5
  { id: "l-11", chapter_id: "ch-5", title: "Deploy ke Production", order_index: 1, is_free_preview: false, video_url: "https://youtube.com/watch?v=efg", duration_minutes: 15 },
  { id: "l-12", chapter_id: "ch-5", title: "Setup Custom Domain", order_index: 2, is_free_preview: false, video_url: "https://youtube.com/watch?v=hij", duration_minutes: 8 },
  // Course 2 - Chapters
  { id: "l-13", chapter_id: "ch-6", title: "Apa itu Make.com?", order_index: 1, is_free_preview: true, video_url: "https://youtube.com/watch?v=klm", duration_minutes: 10 },
  { id: "l-14", chapter_id: "ch-6", title: "Interface Tour", order_index: 2, is_free_preview: true, video_url: "https://youtube.com/watch?v=nop", duration_minutes: 12 },
  { id: "l-15", chapter_id: "ch-7", title: "Connect Google Sheets", order_index: 1, is_free_preview: false, video_url: "https://youtube.com/watch?v=qrs", duration_minutes: 15 },
  { id: "l-16", chapter_id: "ch-7", title: "Email Automation", order_index: 2, is_free_preview: false, video_url: "https://youtube.com/watch?v=tuv", duration_minutes: 18 },
  { id: "l-17", chapter_id: "ch-8", title: "Multi-step Scenarios", order_index: 1, is_free_preview: false, video_url: "https://youtube.com/watch?v=wxy", duration_minutes: 20 },
  { id: "l-18", chapter_id: "ch-8", title: "Error Handling", order_index: 2, is_free_preview: false, video_url: "https://youtube.com/watch?v=zab", duration_minutes: 14 },
];

// Mock enrollments (for logged in user simulation)
export const mockEnrollments: Enrollment[] = [
  {
    id: "enroll-1",
    user_id: "user-1",
    course_id: "course-2", // Free course
    payment_status: "free",
    enrolled_at: "2024-01-15T10:00:00Z",
    progress: 60
  }
];

// Helper functions
export const getCourseBySlug = (slug: string): Course | undefined => {
  return mockCourses.find(c => c.slug === slug);
};

export const getChaptersByCourseId = (courseId: string): Chapter[] => {
  return mockChapters.filter(ch => ch.course_id === courseId).sort((a, b) => a.order_index - b.order_index);
};

export const getLessonsByChapterId = (chapterId: string): Lesson[] => {
  return mockLessons.filter(l => l.chapter_id === chapterId).sort((a, b) => a.order_index - b.order_index);
};

export const getLessonsByCourseId = (courseId: string): Lesson[] => {
  const chapterIds = mockChapters.filter(ch => ch.course_id === courseId).map(ch => ch.id);
  return mockLessons.filter(l => chapterIds.includes(l.chapter_id));
};

export const getEnrollmentByCourseId = (courseId: string, userId: string = "user-1"): Enrollment | undefined => {
  return mockEnrollments.find(e => e.course_id === courseId && e.user_id === userId);
};

export const formatRupiah = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};
