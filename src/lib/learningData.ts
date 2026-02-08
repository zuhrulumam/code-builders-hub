import { Lesson, LessonProgress } from "./mockData";

// Enhanced mock lessons with content
export const mockLessonsWithContent: Lesson[] = [
  // Course 1 - Chapter 1
  { 
    id: "l-1", 
    slug: "intro-apa-yang-akan-kamu-bangun",
    chapter_id: "ch-1", 
    title: "Intro & Apa yang Akan Kamu Bangun", 
    order_index: 1, 
    is_free_preview: true, 
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    duration_minutes: 8,
    content_markdown: `## Selamat Datang! 🎉

Di lesson ini, kamu akan belajar apa yang akan kita bangun bersama selama course ini.

### Apa yang Akan Kita Bangun?

Kita akan membangun sebuah **SaaS Application** lengkap dari nol sampai production. Berikut adalah fitur-fitur yang akan kita implementasi:

1. **Landing Page** - Halaman depan yang menarik
2. **Authentication** - Login dengan Google dan Email
3. **Dashboard** - Panel kontrol untuk user
4. **Payment Integration** - Terima pembayaran dengan Mayar
5. **Admin Panel** - Kelola data dan user

### Tech Stack

Kita akan menggunakan teknologi modern:

| Technology | Purpose |
|------------|---------|
| Lovable | AI-first development |
| Supabase | Database & Auth |
| Tailwind CSS | Styling |
| React | Frontend framework |

### Kenapa Belajar Ini?

> "The best way to learn is by doing. Build real projects, not just tutorials."

Dengan mengikuti course ini, kamu akan punya **portfolio project** yang bisa kamu tunjukkan ke calon employer atau client.

### Prerequisites

Sebelum mulai, pastikan kamu sudah:

- Punya akun Google
- Familiar dengan basic HTML/CSS
- Semangat untuk belajar! 🚀

Kalau kamu stuck, jangan ragu untuk tanya di WhatsApp group ya!
`,
    code_snippets: []
  },
  { 
    id: "l-2", 
    slug: "setup-akun-lovable",
    chapter_id: "ch-1", 
    title: "Setup Akun Lovable", 
    order_index: 2, 
    is_free_preview: true, 
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    duration_minutes: 5,
    content_markdown: `## Setup Akun Lovable

Langkah pertama adalah membuat akun di Lovable.

### Langkah-langkah

1. Buka [lovable.dev](https://lovable.dev)
2. Klik **Sign Up** di pojok kanan atas
3. Pilih **Continue with Google**
4. Pilih project plan yang sesuai

### Tips

\`\`\`bash
# Kamu bisa langsung mulai dengan free plan
# Upgrade kapanpun kalau butuh fitur lebih
\`\`\`

Setelah akun dibuat, kamu akan masuk ke dashboard Lovable.

### Membuat Project Pertama

Klik **New Project** dan beri nama project kamu. Misalnya:

\`my-awesome-saas\`

> **Pro tip**: Gunakan nama yang singkat dan deskriptif!
`,
    code_snippets: []
  },
  { 
    id: "l-3", 
    slug: "setup-supabase-project",
    chapter_id: "ch-1", 
    title: "Setup Supabase Project", 
    order_index: 3, 
    is_free_preview: false, 
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    duration_minutes: 12,
    content_markdown: `## Setup Supabase Project

Supabase adalah backend-as-a-service yang akan kita gunakan untuk database dan authentication.

### Membuat Project di Supabase

1. Buka [supabase.com](https://supabase.com)
2. Sign up atau login
3. Klik **New Project**
4. Isi detail project:
   - **Name**: my-saas-app
   - **Database Password**: (buat password kuat)
   - **Region**: Singapore (untuk latency rendah)

### Mendapatkan API Keys

Setelah project dibuat, kamu perlu mendapatkan API keys:

1. Pergi ke **Settings** → **API**
2. Copy **Project URL**
3. Copy **anon public** key

### Environment Variables

Simpan credentials di environment variables:

\`\`\`env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
\`\`\`

> ⚠️ **PENTING**: Jangan pernah commit API keys ke Git!

### Database Schema

Kita akan membuat schema berikut:

| Table | Description |
|-------|-------------|
| profiles | User profiles |
| products | SaaS products |
| subscriptions | User subscriptions |

Di lesson berikutnya, kita akan setup table-table ini.
`,
    code_snippets: [
      {
        filename: ".env.local",
        language: "bash",
        code: `# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Don't commit this file!`
      },
      {
        filename: "supabaseClient.ts",
        language: "typescript",
        code: `import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)`
      }
    ]
  },
  // Course 1 - Chapter 2
  { 
    id: "l-4", 
    slug: "prompting-yang-efektif",
    chapter_id: "ch-2", 
    title: "Prompting yang Efektif", 
    order_index: 1, 
    is_free_preview: false, 
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    duration_minutes: 15,
    content_markdown: `## Seni Prompting yang Efektif

Kunci sukses dengan Lovable adalah **prompting yang baik**.

### Prinsip Dasar

1. **Be Specific** - Jelaskan dengan detail apa yang kamu mau
2. **Give Context** - Berikan konteks project kamu
3. **Iterate** - Jangan takut untuk refine hasil

### Contoh Prompt yang Baik

❌ **Buruk**:
> "Buatkan landing page"

✅ **Bagus**:
> "Buatkan landing page untuk SaaS app dengan hero section yang ada headline, subheadline, CTA button, dan ilustrasi. Gunakan warna hijau emerald sebagai primary color."

### Template Prompt

\`\`\`
Saya ingin membuat [FITUR] dengan spesifikasi:
- [DETAIL 1]
- [DETAIL 2]
- [DETAIL 3]

Design style: [STYLE]
Reference: [JIKA ADA]
\`\`\`

### Tips Pro

1. Gunakan **bullet points** untuk list fitur
2. Sebutkan **design system** yang dipakai
3. Berikan **reference** kalau ada
4. **Iterate** hasil sampai sesuai ekspektasi
`,
    code_snippets: []
  },
  { 
    id: "l-5", 
    slug: "build-landing-page",
    chapter_id: "ch-2", 
    title: "Build Landing Page", 
    order_index: 2, 
    is_free_preview: false, 
    video_url: null, 
    duration_minutes: 20,
    content_markdown: `## Build Landing Page

Sekarang kita akan membuat landing page untuk SaaS app kita.

### Struktur Landing Page

Landing page kita akan terdiri dari:

1. **Navbar** - Logo, navigation links, CTA
2. **Hero Section** - Main headline dan value proposition
3. **Features** - 3-4 fitur utama
4. **Testimonials** - Social proof
5. **Pricing** - Tabel harga
6. **Footer** - Links dan contact

### Komponen Hero Section

\`\`\`tsx
const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-slate-900">
          Build Your SaaS <span className="text-emerald-500">Faster</span>
        </h1>
        <p className="text-xl text-slate-600 mt-4">
          From idea to production in days, not months.
        </p>
        <button className="mt-8 bg-emerald-500 text-white px-8 py-3 rounded-full">
          Get Started Free
        </button>
      </div>
    </section>
  );
};
\`\`\`

### Best Practices

- Gunakan **clear headline** yang menjelaskan value
- CTA button harus **stand out**
- Mobile responsive adalah **WAJIB**
- Loading time harus **cepat**
`,
    code_snippets: [
      {
        filename: "HeroSection.tsx",
        language: "tsx",
        code: `import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
            🚀 Launch your SaaS today
          </span>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Build Your SaaS{' '}
            <span className="text-emerald-500">10x Faster</span>
          </h1>
          
          <p className="text-xl text-slate-600 mt-6 leading-relaxed">
            From idea to production in days, not months. 
            Let AI handle the boring parts while you focus on what matters.
          </p>
          
          <div className="flex gap-4 mt-8">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-slate-200 hover:border-emerald-500 px-8 py-4 rounded-xl font-semibold transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;`
      }
    ]
  },
  { 
    id: "l-6", 
    slug: "build-dashboard",
    chapter_id: "ch-2", 
    title: "Build Dashboard", 
    order_index: 3, 
    is_free_preview: false, 
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    duration_minutes: 25,
    content_markdown: `## Build Dashboard

Dashboard adalah jantung dari SaaS app. Di sini user akan menghabiskan sebagian besar waktunya.

### Komponen Dashboard

- **Sidebar** - Navigation utama
- **Header** - Search, notifications, profile
- **Main Content** - Area konten dinamis
- **Stats Cards** - Quick overview metrics

### Layout Pattern

\`\`\`
┌──────────────────────────────────────┐
│  Header                              │
├──────┬───────────────────────────────┤
│      │                               │
│ Side │    Main Content Area          │
│ bar  │                               │
│      │                               │
└──────┴───────────────────────────────┘
\`\`\`

### Tips UX

1. **Consistent navigation** - Sidebar harus selalu visible
2. **Quick actions** - Tombol-tombol penting harus mudah diakses
3. **Data visualization** - Gunakan charts untuk metrics
4. **Empty states** - Handle kasus ketika data kosong
`,
    code_snippets: []
  },
  // Add more lessons...
  { id: "l-7", slug: "setup-database-schema", chapter_id: "ch-3", title: "Setup Database Schema", order_index: 1, is_free_preview: false, video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 18, content_markdown: "## Setup Database Schema\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-8", slug: "implement-auth", chapter_id: "ch-3", title: "Implement Auth", order_index: 2, is_free_preview: false, video_url: null, duration_minutes: 22, content_markdown: "## Implement Auth\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-9", slug: "setup-mayar-account", chapter_id: "ch-4", title: "Setup Mayar Account", order_index: 1, is_free_preview: false, video_url: null, duration_minutes: 10, content_markdown: "## Setup Mayar Account\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-10", slug: "integrate-payment-flow", chapter_id: "ch-4", title: "Integrate Payment Flow", order_index: 2, is_free_preview: false, video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 30, content_markdown: "## Integrate Payment Flow\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-11", slug: "deploy-ke-production", chapter_id: "ch-5", title: "Deploy ke Production", order_index: 1, is_free_preview: false, video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 15, content_markdown: "## Deploy ke Production\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-12", slug: "setup-custom-domain", chapter_id: "ch-5", title: "Setup Custom Domain", order_index: 2, is_free_preview: false, video_url: null, duration_minutes: 8, content_markdown: "## Setup Custom Domain\n\nLesson content coming soon...", code_snippets: [] },
  // Course 2
  { id: "l-13", slug: "apa-itu-make-com", chapter_id: "ch-6", title: "Apa itu Make.com?", order_index: 1, is_free_preview: true, video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 10, content_markdown: "## Apa itu Make.com?\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-14", slug: "interface-tour", chapter_id: "ch-6", title: "Interface Tour", order_index: 2, is_free_preview: true, video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 12, content_markdown: "## Interface Tour\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-15", slug: "connect-google-sheets", chapter_id: "ch-7", title: "Connect Google Sheets", order_index: 1, is_free_preview: false, video_url: null, duration_minutes: 15, content_markdown: "## Connect Google Sheets\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-16", slug: "email-automation", chapter_id: "ch-7", title: "Email Automation", order_index: 2, is_free_preview: false, video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 18, content_markdown: "## Email Automation\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-17", slug: "multi-step-scenarios", chapter_id: "ch-8", title: "Multi-step Scenarios", order_index: 1, is_free_preview: false, video_url: null, duration_minutes: 20, content_markdown: "## Multi-step Scenarios\n\nLesson content coming soon...", code_snippets: [] },
  { id: "l-18", slug: "error-handling", chapter_id: "ch-8", title: "Error Handling", order_index: 2, is_free_preview: false, video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration_minutes: 14, content_markdown: "## Error Handling\n\nLesson content coming soon...", code_snippets: [] },
];

// Mock lesson progress
export const mockLessonProgress: LessonProgress[] = [
  { id: "lp-1", user_id: "user-1", lesson_id: "l-1", course_id: "course-1", is_completed: true, completed_at: "2024-02-21T10:00:00Z" },
  { id: "lp-2", user_id: "user-1", lesson_id: "l-2", course_id: "course-1", is_completed: true, completed_at: "2024-02-21T11:00:00Z" },
  { id: "lp-3", user_id: "user-1", lesson_id: "l-3", course_id: "course-1", is_completed: true, completed_at: "2024-02-22T09:00:00Z" },
  { id: "lp-4", user_id: "user-1", lesson_id: "l-13", course_id: "course-2", is_completed: true, completed_at: "2024-01-16T10:00:00Z" },
  { id: "lp-5", user_id: "user-1", lesson_id: "l-14", course_id: "course-2", is_completed: true, completed_at: "2024-01-16T11:00:00Z" },
  { id: "lp-6", user_id: "user-1", lesson_id: "l-15", course_id: "course-2", is_completed: true, completed_at: "2024-01-17T09:00:00Z" },
];

// Helper functions
export const getLessonWithContent = (lessonId: string): Lesson | undefined => {
  return mockLessonsWithContent.find(l => l.id === lessonId);
};

export const getLessonBySlug = (courseSlug: string, lessonSlug: string, chapters: { id: string; course_id: string }[]): Lesson | undefined => {
  const courseChapterIds = chapters.map(ch => ch.id);
  return mockLessonsWithContent.find(l => 
    l.slug === lessonSlug && courseChapterIds.includes(l.chapter_id)
  );
};

export const getLessonProgressForCourse = (courseId: string, userId: string = "user-1"): LessonProgress[] => {
  return mockLessonProgress.filter(lp => lp.course_id === courseId && lp.user_id === userId);
};

export const isLessonCompleted = (lessonId: string, userId: string = "user-1"): boolean => {
  return mockLessonProgress.some(lp => lp.lesson_id === lessonId && lp.user_id === userId && lp.is_completed);
};
