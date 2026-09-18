import Link from "next/link";
import { ArrowRight, CalendarDays, User } from "lucide-react";

// Mock database for blog posts
const blogPosts = [
  {
    slug: "lazer-epilasyon-oncesi-ve-sonrasi-dikkat-edilmesi-gerekenler",
    title: "Lazer Epilasyon Öncesi ve Sonrası Dikkat Edilmesi Gereken 5 Altın Kural",
    category: "Lazer Epilasyon",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    date: "12 Kasım 2023",
    author: "Uzm. Estetisyen Ayşe Yılmaz",
    excerpt: "Lazer epilasyon işleminden maksimum verim almak ve cilt sağlığınızı korumak için seans öncesinde ve sonrasında uygulamanız gereken en önemli adımlar nelerdir?"
  },
  {
    slug: "kisin-cilt-bakimi-nasil-yapilmali",
    title: "Soğuk Havalarda Cildinizi Korumanın Yolları: Kış Cilt Bakım Rehberi",
    category: "Cilt Bakımı",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop",
    date: "28 Ekim 2023",
    author: "Dr. Deniz Şahin",
    excerpt: "Kışın kuruyan ve matlaşan cildinizi canlandırmak için evde yapabileceğiniz rutinler ve klinikte uyguladığımız nem bombası (Hydrafacial) protokolleri."
  },
  {
    slug: "bolgesel-incelmede-g5-masaji-etkisi",
    title: "Bölgesel İncelmede G5 Masajı Efsane mi Gerçek mi?",
    category: "Vücut Bakımı",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    date: "15 Eylül 2023",
    author: "Uzm. Estetisyen Ayşe Yılmaz",
    excerpt: "Selülit tedavisinde devrim yaratan G5 masajı hakkında bilmeniz gereken her şey. Kaç seansta etki gösterir, kimlere uygulanabilir?"
  }
];

export default async function BlogListing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <main className="min-h-screen bg-cream pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Güzellik Rehberi</span>
          <h1 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight max-w-2xl mb-6">
            Estetik ve Güzelliğe Dair <br/><span className="italic text-charcoal/70">Uzman Görüşleri</span>
          </h1>
          <p className="text-charcoal/60 max-w-xl text-lg">
            Kliniğimizdeki en yeni uygulamalar, cilt bakım ipuçları ve merak edilen tüm soruların cevapları bloğumuzda.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <Link href={`/${locale}/blog/${post.slug}`} key={i} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-charcoal/5 shadow-xl shadow-charcoal/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-20 bg-cream/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gold-700 uppercase tracking-wider">
                  {post.category}
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-charcoal/50 mb-4">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="text-xl font-serif text-charcoal mb-4 line-clamp-2 group-hover:text-gold-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-charcoal/60 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-charcoal border-t border-charcoal/10 pt-4 mt-auto group-hover:text-gold-600 transition-colors">
                  Devamını Oku 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
