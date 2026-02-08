import { Check, Clock, Bell, Rocket, Sparkles, Coffee } from 'lucide-react';

// Mock data - in production, fetch from PocketBase
const publishedCourse = {
  id: '1',
  title: 'Build SaaS dengan AI + No-Code',
  slug: 'build-saas-ai-nocode',
  short_desc: 'Pelajari cara membangun aplikasi SaaS dari nol menggunakan AI dan tools no-code. Dari ide sampai monetisasi.',
  price: 150000,
  discount_price: 100000,
  status: 'published',
  is_free: false,
  chapters: [
    'Setup Project & Environment',
    'Desain Database dengan AI',
    'Build Landing Page',
    'Payment Gateway Integration',
    'Deploy ke Production',
    'Marketing & Launch Strategy',
  ],
  totalLessons: 24,
  tags: ['🎬 Video Tutorial', '💻 Source Code', '🎓 Live Session', '💬 WA Support'],
};

const comingSoonCourses = [
  {
    id: '2',
    title: 'Automation Workflow dengan n8n',
    short_desc: 'Otomatiskan bisnis kamu dengan workflow automation.',
    status: 'coming_soon',
  },
  {
    id: '3',
    title: 'Build Mobile App dengan FlutterFlow',
    short_desc: 'Bikin app mobile tanpa coding.',
    status: 'coming_soon',
  },
  {
    id: '4',
    title: 'Email Marketing Automation',
    short_desc: 'Setup email sequences yang convert.',
    status: 'coming_soon',
  },
  {
    id: '5',
    title: 'AI Chatbot untuk Customer Service',
    short_desc: 'Chatbot pintar yang handle customer 24/7.',
    status: 'coming_soon',
  },
];

const formatRupiah = (amount: number) => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

const Courses = () => {
  const discountPercentage = Math.round(
    ((publishedCourse.price - publishedCourse.discount_price) / publishedCourse.price) * 100
  );

  return (
    <section id="courses" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <span className="eyebrow mb-3 block">COURSES</span>
          <h2 className="mb-4 max-w-lg">Mulai Dari Sini</h2>
          <p className="text-text-body text-lg max-w-xl">
            Course praktis yang langsung bisa kamu terapkan. Bukan teori doang.
          </p>
        </div>

        {/* Published Course - Featured Card */}
        <div className="card-custom mb-10 overflow-hidden fade-up" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 8px 40px rgba(0,0,0,0.04)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Cover Image / Placeholder */}
            <div 
              className="aspect-[4/3] lg:aspect-auto flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, hsl(152, 81%, 91%), hsl(152, 81%, 80%))' }}
            >
              <Rocket size={64} className="text-primary-700" strokeWidth={1.5} />
            </div>
            
            {/* Content */}
            <div className="p-7 lg:p-10">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge-new">NEW</span>
                <span className="badge-default">SaaS</span>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-extrabold mb-4">{publishedCourse.title}</h2>
              
              {/* Description */}
              <p className="text-text-body mb-6">{publishedCourse.short_desc}</p>
              
              {/* Materi List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {publishedCourse.chapters.map((chapter, i) => (
                  <div key={i} className="flex items-center gap-2 bg-primary-50 rounded-xl px-3 py-2">
                    <Check size={16} className="text-primary-500 flex-shrink-0" />
                    <span className="text-sm text-text-body">{chapter}</span>
                  </div>
                ))}
              </div>
              
              {/* Lesson Count */}
              <p className="text-sm text-text-muted mb-6">
                📚 {publishedCourse.totalLessons} video lessons
              </p>
              
              {/* Divider */}
              <div className="border-t border-border-light mb-6" />
              
              {/* Price Section */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-text-muted line-through text-lg">
                  {formatRupiah(publishedCourse.price)}
                </span>
                <span className="text-3xl font-extrabold text-primary-500">
                  {formatRupiah(publishedCourse.discount_price)}
                </span>
                <span className="badge-new">Hemat {discountPercentage}%</span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {publishedCourse.tags.map((tag, i) => (
                  <span key={i} className="badge-default text-xs">{tag}</span>
                ))}
              </div>
              
              {/* CTA */}
              <button className="btn-primary w-full text-center">
                Beli Sekarang 🛒
              </button>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Sparkles size={20} className="text-amber-500" />
            Coming Soon
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comingSoonCourses.map((course, index) => (
              <div
                key={course.id}
                className="card-custom p-6 opacity-90 hover:opacity-100 transition-opacity fade-up"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  border: '2px dashed hsl(var(--border))',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-text-muted" />
                  <span className="badge-coming-soon">COMING SOON</span>
                </div>
                <h4 className="font-bold text-text-body mb-2">{course.title}</h4>
                <p className="text-sm text-text-muted line-clamp-2 mb-4">{course.short_desc}</p>
                <button className="btn-outline w-full text-sm py-2.5">
                  🔔 Notify Me
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-sell Banner */}
        <div 
          className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-4"
          style={{ background: 'linear-gradient(135deg, hsl(152, 76%, 97%), hsl(152, 81%, 91%))', border: '1px solid hsl(152, 81%, 80%)' }}
        >
          <span className="text-3xl">🎉</span>
          <p className="text-center md:text-left font-semibold text-primary-700">
            Beli sekarang, dapat diskon 30% untuk course berikutnya.
          </p>
        </div>

        {/* Donation Section */}
        <div 
          className="mt-8 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: 'hsl(43, 100%, 98%)', border: '1px solid hsl(38, 92%, 80%)' }}
        >
          <div className="flex items-center gap-3">
            <Coffee size={24} className="text-amber-500" />
            <span className="font-medium text-text-body">Traktir kopi buat support creator</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Rp 10rb', 'Rp 25rb', 'Rp 50rb'].map((amount) => (
              <button key={amount} className="btn-outline text-sm py-2 px-4 rounded-full">
                {amount}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
