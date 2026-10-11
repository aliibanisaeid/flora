import { asset } from './asset'
import BloomMark from './BloomMark'
import type { Language, Mood } from './content'

interface EditorialProps { lang: Language; onMood: (mood: Mood) => void; onFilter: (category: string) => void }

export function Collections({ lang, onMood, onFilter }: EditorialProps) {
  const fa = lang === 'fa'
  return <section id="collections" className="editorial-collections section-anchor">
    <div className="editorial-intro reveal">
      <span className="editorial-overline" dir="ltr">THE FLORA COLLECTION</span>
      <h2>{fa ? 'گل، با نگاهی تازه' : 'A fresh perspective on flowers'}</h2>
      <p>{fa ? 'فرم‌های آزاد و رنگ‌های زنده، در دسته گل، باکس و گلدان؛ از یک هدیه کوچک تا حضوری پرشکوه' : 'Free-flowing shapes and expressive colors, in bouquets, boxes and vases. From a small gesture to a grand arrangement'}</p>
    </div>
    <div className="editorial-grid">
      <a href="#collection" className="editorial-tile seasonal-tile" onClick={() => onFilter('bouquets')}>
        <img src={asset('/images/woshe/floral-pink.webp')} alt={fa ? 'دسته گل رز صورتی در کاغذ روشن، در یک تصویر شهری' : 'A sculptural pink rose bouquet wrapped in light paper, in a city setting'} loading="lazy" />
        <div className="editorial-tile-copy"><span dir="ltr">THE BOUQUET EDIT</span><h3>{fa ? 'رنگی برای روزهای روشن' : 'Color for brighter days'}</h3><span className="editorial-link">{fa ? 'مشاهده دسته گل‌ها' : 'View the bouquets'}<BloomMark size={21} /></span></div>
      </a>
      <a href="#compose" className="editorial-tile personal-tile" onClick={() => onMood('lilac')}>
        <img src={asset('/images/woshe/floral-garden.webp')} alt={fa ? 'یک دسته گل پرحجم از گل‌های صورتی، هلویی و یاسی در پوشش آبی' : 'An abundant bouquet of pink, peach and lilac flowers in blue wrapping'} loading="lazy" />
        <div className="editorial-tile-copy"><span dir="ltr">THE PERSONAL EDIT</span><h3>{fa ? 'ترکیبی با امضای شما' : 'A composition with your signature'}</h3><span className="editorial-link">{fa ? 'طراحی ترکیب شما' : 'Compose your flowers'}<BloomMark size={21} /></span></div>
      </a>
    </div>
    <div className="flower-category-links">
      {[['bouquets', fa ? 'دسته گل' : 'Hand-tied bouquets', fa ? 'فرم آزاد، زیبایی فصل' : 'Free shapes, seasonal beauty'], ['boxes', fa ? 'باکس گل' : 'Flower boxes', fa ? 'یک هدیه، با جزئیات بیشتر' : 'A gift, thoughtfully gathered'], ['vases', fa ? 'گل در گلدان' : 'Flowers in a vase', fa ? 'گوشه‌ای از خانه، شبیه باغ' : 'A little garden for your home']].map(([category, title, body]) => <a key={category} href="#collection" onClick={() => onFilter(category)}><div><h3>{title}</h3><span>{body}</span></div><BloomMark size={25} /></a>)}
    </div>
  </section>
}

export function Occasions({ lang, onMood }: Pick<EditorialProps, 'lang' | 'onMood'>) {
  const fa = lang === 'fa'
  const occasions: { id: string; mood: Mood; image: string; title: string; body: string; alt: string }[] = [
    { id: 'birthday', mood: 'apricot', image: asset('/images/woshe/birthday.webp'), title: fa ? 'برای تولد' : 'For a birthday', body: fa ? 'رنگ‌های گرم، برای یک شروع تازه' : 'Warm colors for a new beginning', alt: fa ? 'پرتره لطیف در میان گل‌های روشن برای جشن تولد' : 'A soft portrait among light flowers, for a birthday celebration' },
    { id: 'together', mood: 'ivory', image: asset('/images/woshe/wedding.webp'), title: fa ? 'برای یک بله' : 'For your yes', body: fa ? 'گل‌های سپید، برای آغاز با هم بودن' : 'White flowers for the beginning of together', alt: fa ? 'جزئیات یک لباس عروس و گل‌های سفید' : 'Bridal details and delicate white flowers' },
    { id: 'love', mood: 'coral', image: asset('/images/woshe/floral-white.webp'), title: fa ? 'برای دوست داشتن' : 'For someone you love', body: fa ? 'یک پیام ساده، با گل‌های مرجانی' : 'A simple message in coral blooms', alt: fa ? 'دسته گل رزهای قرمز و صورتی در یک فضای آرام' : 'A red and pink rose bouquet in a quiet interior' },
  ]
  return <section id="moments" className="occasion-section section-anchor">
    <div className="editorial-intro reveal"><span className="editorial-overline" dir="ltr">FLOWERS FOR THE OCCASION</span><h2>{fa ? 'هر مناسبت، انتخاب خودش' : 'A thoughtful choice for every occasion'}</h2><p>{fa ? 'از مناسبت شروع کنید؛ یک طیف رنگ پیشنهادی را ببینید و آن را به سلیقه خود تغییر دهید' : 'Start with the occasion. Explore a suggested palette, then make it your own'}</p></div>
    <div className="occasion-grid">{occasions.map(occasion => <a key={occasion.id} className={`occasion-card occasion-${occasion.id}`} href="#compose" onClick={() => onMood(occasion.mood)}><img src={occasion.image} alt={occasion.alt} loading="lazy" /><div><h3>{occasion.title}</h3><p>{occasion.body}</p><span>{fa ? 'انتخاب گل' : 'Find your flowers'}<BloomMark size={18} /></span></div></a>)}</div>
  </section>
}
