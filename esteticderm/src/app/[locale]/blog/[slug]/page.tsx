import Link from "next/link";
import { ArrowLeft, CalendarDays, User, Share2 } from "lucide-react";

export default async function BlogPost({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;

  // Mock post fetch
  const post = {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: "Lazer Epilasyon",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    date: "12 Kasım 2023",
    author: "Uzm. Estetisyen Ayşe Yılmaz",
    content: [
      "Lazer epilasyon günümüzde istenmeyen tüylerden kurtulmanın en güvenilir, konforlu ve kalıcı yöntemidir. Ancak, işlemden elde edilecek başarı sadece kliniğin kullandığı cihaza veya uzmanın tecrübesine bağlı değildir. Sizin işlem öncesinde ve sonrasında yapacağınız uygulamalar da kalıcılık oranını doğrudan etkiler.",
      "İşte pürüzsüz bir cilde giden yolda dikkat etmeniz gereken 5 altın kural:",
      "1. Güneşten Korunun: İşlemden en az 2 hafta öncesinden itibaren solaryuma girmemeli ve aktif güneşlenmekten kaçınmalısınız. Yanık ciltte leke kalma riski bulunur.",
      "2. Kökten Alma İşlemlerini Durdurun: Ağda, epilatör veya cımbız gibi kılı kökünden koparan işlemler kıl kökünün lazer ışınını görmesini engeller. Sadece jilet kullanmalısınız.",
      "3. Bol Su Tüketin: Cildinizin nem dengesi lazerin atışlarının ciltte daha homojen yayılmasını sağlar.",
      "Bizi tercih ettiğiniz için teşekkür ederiz. Konu hakkında detaylı bilgi ve ücretsiz ön görüşme için kliniğimizi ziyaret edebilirsiniz."
    ]
  };

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-charcoal/60 z-10" />
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <div className="bg-cream/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-cream uppercase tracking-wider mb-6">
            {post.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-cream mb-6 leading-tight max-w-4xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-cream/80">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl -mt-16 relative z-30">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 border border-charcoal/5">
          
          <div className="flex justify-between items-center mb-12">
            <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-charcoal/50 hover:text-gold-600 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Tüm Yazılara Dön
            </Link>
            
            <button className="inline-flex items-center gap-2 text-charcoal/50 hover:text-gold-600 transition-colors text-sm font-medium">
              <Share2 className="w-4 h-4" />
              Paylaş
            </button>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/70 prose-a:text-gold-600 max-w-none">
            {post.content.map((paragraph, idx) => {
              if (paragraph.match(/^\d\./)) {
                return <h3 key={idx} className="text-2xl font-serif text-charcoal mt-8 mb-4">{paragraph}</h3>;
              }
              return <p key={idx} className="leading-loose mb-6">{paragraph}</p>;
            })}
          </article>
          
          {/* CTA Box */}
          <div className="mt-16 bg-cream p-8 rounded-2xl border border-gold-400/20 text-center">
            <h4 className="text-2xl font-serif text-charcoal mb-3">Sorularınız Mı Var?</h4>
            <p className="text-charcoal/60 mb-6 text-sm">Uzman ekibimiz size en doğru bilgiyi vermek için hazır.</p>
            <button className="px-8 py-3 bg-charcoal text-cream rounded-full text-sm tracking-wider font-medium hover:bg-gold-600 transition-colors">
              Hemen İletişime Geçin
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
