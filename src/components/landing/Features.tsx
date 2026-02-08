import { MessageCircle, Video, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Support Lifetime',
    description: 'Stuck? Chat langsung. Dijawab dalam 24 jam.',
  },
  {
    icon: Video,
    title: 'Live Session Min 2x/Bulan',
    description: 'Zoom bareng, tanya jawab, troubleshoot real-time.',
  },
  {
    icon: RefreshCw,
    title: 'Free Update Materi Selamanya',
    description: 'Course di-upgrade, kamu otomatis dapat akses.',
  },
];

const Features = () => {
  return (
    <section className="section-padding" style={{ background: 'hsl(43, 100%, 98%)' }}>
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <span className="eyebrow mb-3 block">YANG KAMU DAPAT</span>
          <h2 className="mb-4 max-w-lg">Bukan Cuma Video Tutorial</h2>
          <p className="text-text-body text-lg">Ini yang bikin CodeWithUmam beda.</p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-custom p-7 fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="icon-container mb-5">
                <feature.icon size={28} className="text-primary-500" strokeWidth={2} />
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-text-body">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
