import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'cataract-phaco-treatment',
    title: 'المياه البيضاء (الكتاراكت): الأسباب، الأعراض، وأحدث طرق العلاج بالفيكو',
    excerpt: 'تعد المياه البيضاء من أكثر أمراض العيون شيوعاً مع تقدم العمر. نتعرف في هذا المقال على أحدث تقنيات إزالة المياه البيضاء بالموجات فوق الصوتية (الفيكو) وزراعة العدسات المطوية.',
    content: `تعتبر المياه البيضاء (الكتاراكت) حتمية لدى قطاع كبير من كبار السن، حيث تحدث عتامة تدريجية في عدسة العين الطبيعية مما يعيق مرور الضوء ويسبب ضبابية في الرؤية.

### أعراض المياه البيضاء:
- ضبابية أو غشاوة في الرؤية تشبه النظر من خلال زجاج مغبش.
- صعوبة الرؤية ليلاً أو أثناء القيادة.
- رؤية هالات حول الأضواء الساطعة.
- تغير مستمر في مقاسات النظارات الطبية.

### أحدث طرق العلاج بالفيكو:
يتم إجراء العملية بتقنية الفيكو (Phacoemulsification) عبر فتحة دقيقة جداً لا تتجاوز 2 ملم، حيث تستخدم الموجات فوق الصوتية لتفتيت العدسة المعتمة وشفطها، ثم زراعة عدسة صناعية شفافة مرنة تعيش مدى الحياة دون الحاجة لغرز جراحية.`,
    category: 'عمليات العيون',
    author: 'د. محمد عمار',
    date: '15 يوليو 2026',
    readTime: '4 دقائق',
    image: './assets/interior.jpg',
  },
  {
    id: 'femto-lasik-vision-correction',
    title: 'تصحيح الإبصار بالفيمتو ليزك: كل ما تحتاج معرفته قبل وبعد العملية',
    excerpt: 'احصل على رؤية حادة بدون نظارات أو عدسات لاصقة. تعرف على الفرق بين الليزك التقليدي والفيمتو ليزك وكيف تختار التقنية الأنسب لعينيك.',
    content: `شهدت جراحات تصحيح الإبصار تطوراً هائلاً بفضل تقنية الفيمتو ليزك، حيث يستخدم ليزر الفيمتو ثانية في رفع طبقة القرنية بدقة متناهية ودون استخدام أية شفرات جراحية.

### مميزات الفيمتو ليزك:
- دقة متناهية وأمان أعلى للقرنية.
- سرعة التعافي والعودة للحياة الطبيعية خلال 24-48 ساعة.
- تصحيح حالات قصر النظر، طول النظر، والأنستجماتيزم بدرجات عالية.
- تناسب الحالات ذات القرنية الأقل سماكة.`,
    category: 'تصحيح الإبصار',
    author: 'د. محمد عمار',
    date: '10 يوليو 2026',
    readTime: '5 دقائق',
    image: './assets/diagnostics.jpg',
  },
  {
    id: 'diabetic-retinopathy-guide',
    title: 'اعتلال الشبكية السكري: كيف تحمي عينيك من مضاعفات مرض السكري؟',
    excerpt: 'مرض السكري يؤثر بشكل مباشر على الأوعية الدموية بالشبكية. الفحص الدوري لقاع العين هو الخط الدفاعي الأول للحفاظ على سلامة البصر.',
    content: `يُعد اعتلال الشبكية السكري من أهم أسباب ضعف البصر المكتسب لدى البالغين. يتسبب ارتفاع السكر في الدم لفترات طويلة في تلف الأوعية الدموية الدقيقة في شبكية العين، مما يؤدي إلى تسريب السوائل أو نمو أوعية دموية غير طبيعية.

### نصائح الوقاية للمصابين بالسكري:
1. إجراء فحص قاع العين سنوياً أو كل 6 أشهر حسب تعليمات الطبيب.
2. ضبط مستوى السكر في الدم والتراكمي HbA1c أقل من 7%.
3. التحكم في ضغط الدم ومستويات الكوليسترول.
4. مراجعة طبيب العيون فوراً عند ملاحظة أي ذباب طائر أو هبوط مفاجئ في النظر.`,
    category: 'شبكية العين',
    author: 'د. محمد عمار',
    date: '1 يوليو 2026',
    readTime: '4 دقائق',
    image: './assets/eye-clinics.jpg',
  },
  {
    id: 'glaucoma-prevention-and-care',
    title: 'الجلوكوما (المياه الزرقاء): سارق البصر الخفي وطرق الوقاية منه',
    excerpt: 'تسمى الجلوكوما بسارق البصر الخفي لأنها تتلف العصب البصري تدريجياً دون ألم في البداية. قياس ضغط العين المنتظم ينقذ رؤيتك.',
    content: `الجلوكوما أو المياه الزرقاء هي مجموعة من أمراض العيون التي تصيب العصب البصري نتيجة ارتفاع ضغط العين الداخلي. ترجح أهمية الاكتشاف المبكر للجلوكوما إلى أن التلف الحادث في العصب البصري لا يمكن استرداده.

### طرق العلاج والمتابعة:
- استخدام قطرات خفض ضغط العين بانتظام.
- العلاج بالليزر لفتح زوايا تصريف العين.
- الجراحة لتخفيض الضغط في الحالات المتقدمة.`,
    category: 'الفحوصات والأشعة',
    author: 'د. محمد عمار',
    date: '20 يونيو 2026',
    readTime: '3 دقائق',
    image: './assets/contact-lens.jpg',
  },
];

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['الكل', 'عمليات العيون', 'تصحيح الإبصار', 'شبكية العين', 'الفحوصات والأشعة'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'الكل' || post.category === selectedCategory;
    const matchesSearch = post.title.includes(searchQuery) || post.excerpt.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-bg min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 bg-gradient-brand text-white text-center overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-white/30">
            المدونة الطبية
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-4">مقالات ومعلومات طب العيون</h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            نصائح ومقالات طازجة بإشراف د. محمد عمار وفريق مركز مودة لجراحات العيون بأشمون.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-card'
                    : 'bg-white text-navy hover:bg-primary-50 border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="w-full bg-white text-navy pr-10 pl-4 py-2.5 rounded-2xl border border-border text-sm outline-none focus:border-primary transition-all"
            />
            <Search size={18} className="absolute right-3 top-3 text-muted" />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-primary" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-primary" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-primary" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-navy mb-3 leading-snug hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Link
                  to={`/blog`}
                  className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:gap-2.5 transition-all"
                >
                  اقرأ المقال كاملاً
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
