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
  slug: string;
  chapter_id: string;
  title: string;
  order_index: number;
  is_free_preview: boolean;
  video_url: string | null;
  duration_minutes: number;
  content_markdown: string;
  code_snippets: CodeSnippet[];
}

export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  is_completed: boolean;
  completed_at: string | null;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  payment_status: "pending" | "paid" | "free" | "failed";
  enrolled_at: string;
  progress: number;
}

export interface Transaction {
  id: string;
  user_id: string;
  course_id: string;
  amount: number;
  original_price: number;
  discount_applied: number;
  payment_method: string;
  payment_ref: string;
  status: "pending" | "success" | "failed";
  created: string;
}

export interface Donation {
  id: string;
  user_id: string | null;
  donor_name: string;
  course_id: string;
  amount: number;
  message: string;
  status: "pending" | "success";
  created: string;
}

export interface WaitlistEntry {
  id: string;
  course_id: string;
  email: string;
  wa_number: string;
  created: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  wa_number: string;
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

// Mock lessons (basic metadata - full content in learningData.ts)
export const mockLessons: Lesson[] = [
  // Course 1 - Chapter 1
  { id: "l-1", slug: "intro-apa-yang-akan-kamu-bangun", chapter_id: "ch-1", title: "Intro & Apa yang Akan Kamu Bangun", order_index: 1, is_free_preview: true, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 8, content_markdown: "", code_snippets: [] },
  { id: "l-2", slug: "setup-akun-lovable", chapter_id: "ch-1", title: "Setup Akun Lovable", order_index: 2, is_free_preview: true, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 5, content_markdown: "", code_snippets: [] },
  { id: "l-3", slug: "setup-supabase-project", chapter_id: "ch-1", title: "Setup Supabase Project", order_index: 3, is_free_preview: false, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 12, content_markdown: "", code_snippets: [] },
  // Course 1 - Chapter 2
  { id: "l-4", slug: "prompting-yang-efektif", chapter_id: "ch-2", title: "Prompting yang Efektif", order_index: 1, is_free_preview: false, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 15, content_markdown: "", code_snippets: [] },
  { id: "l-5", slug: "build-landing-page", chapter_id: "ch-2", title: "Build Landing Page", order_index: 2, is_free_preview: false, video_url: null, duration_minutes: 20, content_markdown: "", code_snippets: [] },
  { id: "l-6", slug: "build-dashboard", chapter_id: "ch-2", title: "Build Dashboard", order_index: 3, is_free_preview: false, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 25, content_markdown: "", code_snippets: [] },
  // Course 1 - Chapter 3
  { id: "l-7", slug: "setup-database-schema", chapter_id: "ch-3", title: "Setup Database Schema", order_index: 1, is_free_preview: false, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 18, content_markdown: "", code_snippets: [] },
  { id: "l-8", slug: "implement-auth", chapter_id: "ch-3", title: "Implement Auth", order_index: 2, is_free_preview: false, video_url: null, duration_minutes: 22, content_markdown: "", code_snippets: [] },
  // Course 1 - Chapter 4
  { id: "l-9", slug: "setup-mayar-account", chapter_id: "ch-4", title: "Setup Mayar Account", order_index: 1, is_free_preview: false, video_url: null, duration_minutes: 10, content_markdown: "", code_snippets: [] },
  { id: "l-10", slug: "integrate-payment-flow", chapter_id: "ch-4", title: "Integrate Payment Flow", order_index: 2, is_free_preview: false, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 30, content_markdown: "", code_snippets: [] },
  // Course 1 - Chapter 5
  { id: "l-11", slug: "deploy-ke-production", chapter_id: "ch-5", title: "Deploy ke Production", order_index: 1, is_free_preview: false, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 15, content_markdown: "", code_snippets: [] },
  { id: "l-12", slug: "setup-custom-domain", chapter_id: "ch-5", title: "Setup Custom Domain", order_index: 2, is_free_preview: false, video_url: null, duration_minutes: 8, content_markdown: "", code_snippets: [] },
  // Course 2 - Chapters
  { id: "l-13", slug: "apa-itu-make-com", chapter_id: "ch-6", title: "Apa itu Make.com?", order_index: 1, is_free_preview: true, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 10, content_markdown: "", code_snippets: [] },
  { id: "l-14", slug: "interface-tour", chapter_id: "ch-6", title: "Interface Tour", order_index: 2, is_free_preview: true, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 12, content_markdown: "", code_snippets: [] },
  { id: "l-15", slug: "connect-google-sheets", chapter_id: "ch-7", title: "Connect Google Sheets", order_index: 1, is_free_preview: false, video_url: null, duration_minutes: 15, content_markdown: "", code_snippets: [] },
  { id: "l-16", slug: "email-automation", chapter_id: "ch-7", title: "Email Automation", order_index: 2, is_free_preview: false, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 18, content_markdown: "", code_snippets: [] },
  { id: "l-17", slug: "multi-step-scenarios", chapter_id: "ch-8", title: "Multi-step Scenarios", order_index: 1, is_free_preview: false, video_url: null, duration_minutes: 20, content_markdown: "", code_snippets: [] },
  { id: "l-18", slug: "error-handling", chapter_id: "ch-8", title: "Error Handling", order_index: 2, is_free_preview: false, video_url: "https://youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 14, content_markdown: "", code_snippets: [] },
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
  },
  {
    id: "enroll-2",
    user_id: "user-1",
    course_id: "course-1", // Paid course
    payment_status: "paid",
    enrolled_at: "2024-02-20T14:30:00Z",
    progress: 25
  }
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    user_id: "user-1",
    course_id: "course-2",
    amount: 0,
    original_price: 0,
    discount_applied: 0,
    payment_method: "free",
    payment_ref: "FREE-001",
    status: "success",
    created: "2024-01-15T10:00:00Z"
  },
  {
    id: "tx-2",
    user_id: "user-1",
    course_id: "course-1",
    amount: 99000,
    original_price: 150000,
    discount_applied: 51000,
    payment_method: "mayar",
    payment_ref: "MAYAR-12345",
    status: "success",
    created: "2024-02-20T14:30:00Z"
  }
];

// Mock donations
export const mockDonations: Donation[] = [
  {
    id: "don-1",
    user_id: "user-1",
    donor_name: "Ahmad Budiman",
    course_id: "course-2",
    amount: 25000,
    message: "Terima kasih atas course gratisnya! 🙏",
    status: "success",
    created: "2024-01-16T08:30:00Z"
  },
  {
    id: "don-2",
    user_id: null,
    donor_name: "Siti Nurhaliza",
    course_id: "course-2",
    amount: 50000,
    message: "Sangat membantu untuk belajar automation",
    status: "success",
    created: "2024-01-20T14:15:00Z"
  },
  {
    id: "don-3",
    user_id: null,
    donor_name: "Budi Santoso",
    course_id: "course-2",
    amount: 10000,
    message: "",
    status: "pending",
    created: "2024-02-01T09:00:00Z"
  }
];

// Mock waitlist
export const mockWaitlist: WaitlistEntry[] = [
  {
    id: "wl-1",
    course_id: "course-3",
    email: "user1@example.com",
    wa_number: "081234567001",
    created: "2024-01-10T10:00:00Z"
  },
  {
    id: "wl-2",
    course_id: "course-3",
    email: "user2@example.com",
    wa_number: "",
    created: "2024-01-12T11:30:00Z"
  },
  {
    id: "wl-3",
    course_id: "course-4",
    email: "",
    wa_number: "081234567003",
    created: "2024-01-15T09:45:00Z"
  },
  {
    id: "wl-4",
    course_id: "course-4",
    email: "user4@example.com",
    wa_number: "081234567004",
    created: "2024-02-05T16:20:00Z"
  }
];

// Mock current user
export const mockCurrentUser: User = {
  id: "user-1",
  name: "Ahmad Budiman",
  email: "ahmad.budiman@gmail.com",
  avatar: "",
  wa_number: "081234567890"
};

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
