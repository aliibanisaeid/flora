import { asset } from './asset'
export type Language = 'fa' | 'en'
export type Localized = Record<Language, string>
export type Mood = 'coral' | 'ivory' | 'apricot' | 'lilac'
export type Size = 'petite' | 'signature' | 'abundant'
export type Wrap = 'paper' | 'linen'

export const words = {
  fa: {
    shop: 'مجموعه‌ها', compose: 'طراحی اختصاصی', story: 'استودیوی فلورا', care: 'مراقبت از گل‌ها', moments: 'مناسبت‌ها', bloom: 'شکفتن',
    bag: 'سبد گل', menu: 'فهرست', close: 'بستن', language: 'Switch to English', skip: 'رفتن به محتوای اصلی',
    heroEyebrow: 'استودیوی گل فلورا', heroLine1: 'بعضی احساس‌ها', heroLine2: 'فقط گل می‌خواهند',
    heroBody: 'برای حرف‌هایی که گفتنشان آسان نیست، گلی انتخاب کن که از تو بگوید', explore: 'مشاهده مجموعه',
    heroSecondary: 'یک گل، هزار احساس', replay: 'تماشای شکفتن', pause: 'توقف شکفتن', bloomSlider: 'میزان شکفتن گل',
    flowerCaption: 'پیونی مرجانی', flowerSubcaption: 'شکفتن، به وقت تو',
    marquee: ['چهار طیف رنگ', 'دسته گل، باکس و گلدان', 'سه اندازه', 'کاغذ یا کتان'],
    collectionTitle: 'انتخابی به رنگ شما', collectionBody: 'از دسته گل مرجانی تا گلدان یاسی؛ ترکیب، اندازه و جزئیات هر انتخاب را ببینید',
    all: 'همه گل‌ها', bouquets: 'دسته گل', boxes: 'باکس گل', vases: 'گل در گلدان', details: 'مشاهده جزئیات',
    from: 'از', toman: 'تومان', emptyCollection: 'در این مجموعه هنوز گلی نداریم',
    composeTitle: 'با سلیقه شما، از ابتدا', composeBody: 'رنگ، اندازه و پوشش را انتخاب کنید؛ تصویر و قیمت ترکیب شما هم‌زمان تغییر می‌کند',
    mood: 'طیف رنگ', size: 'اندازه ترکیب', wrap: 'پوشش گل', petite: 'جمع‌وجور', signature: 'کلاسیک', abundant: 'پرشکوه',
    paper: 'کاغذ لطیف', linen: 'پارچه کتانی', linenNote: 'پوشش کتانی', total: 'مجموع', add: 'افزودن به سبد', added: 'به سبد گل اضافه شد',
    customName: 'ترکیب اختصاصی شما', customHint: 'تصویر، رنگ و فرم انتخاب شما را نشان می‌دهد',
    atelierEyebrow: 'در استودیوی فلورا', atelierTitle: 'زیبایی در انتخاب جزئیات',
    atelierBody: 'یک پیونی مرجانی، چند رز باغی و شاخه‌های اکالیپتوس؛ هویت هر ترکیب از کنار هم نشستن رنگ، فرم و بافت شکل می‌گیرد',
    atelierBody2: 'در فلورا، انتخاب از سلیقه شما آغاز می‌شود. ترکیب محبوبتان را پیدا کنید و اندازه و پوشش آن را با لحظه‌ای که در نظر دارید هماهنگ کنید',
    atelierLink: 'طراحی ترکیب شما', atelierCaption: 'هر ساقه، بخشی از یک قصه',
    careTitle: 'زیبایی را تازه نگه دارید', careBody: 'آب تازه، برش ساقه و جای خنک؛ چند نکته ساده برای مراقبت از گل‌ها',
    careImageCaption: 'گل‌ها، زندگی را نرم‌تر می‌کنند',
    momentsTitle: 'برای کسی که در فکر شماست', momentsBody: 'از یک تولد تا یک تشکر ساده؛ گل را انتخاب کنید و پیام خود را به آن اضافه کنید',
    preorder: 'پیش‌سفارش گل', momentsTag: 'یک انتخاب شخصی، برای یک نفر خاص',
    footerTitle: 'بگذار گل‌ها بگویند', footerBody: 'برای آنچه می‌خواهید بگویید', backTop: 'بازگشت به بالا', footerNote: 'فلورا، استودیوی گل',
    viewBag: 'مشاهده سبد', emptyBag: 'اولین گل را انتخاب کنید', emptyBagBody: 'از مجموعه‌ها شروع کنید یا ترکیب اختصاصی خود را بسازید',
    remove: 'حذف گل', increase: 'افزایش تعداد', decrease: 'کاهش تعداد', quantity: 'تعداد', checkout: 'پیش‌نمایش سفارش',
    cartNote: 'قیمت‌ها مربوط به این مجموعه نمایشی هستند', continue: 'ادامه انتخاب',
    preorderTitle: 'جزئیات انتخاب شما', preorderBody: 'گل‌ها، روز موردنظر و پیام هدیه را در یک پیش‌نمایش کنار هم ببینید',
    name: 'نام شما', phone: 'شماره تماس', date: 'روز موردنظر', message: 'متن کارت هدیه', optional: 'اختیاری',
    namePlaceholder: 'نام و نام خانوادگی', phonePlaceholder: '۰۹۱۲۱۲۳۴۵۶۷', messagePlaceholder: 'پیامی که می‌خواهید همراه گل‌ها باشد',
    saveOrder: 'ذخیره انتخاب', demoNote: 'این نسخه نمایشی است؛ سفارش به فروشگاه ارسال نمی‌شود و پرداختی انجام نمی‌شود',
    nameError: 'لطفاً نام خود را وارد کنید', phoneError: 'شماره تماس معتبر وارد کنید', dateError: 'امروز یا یکی از روزهای آینده را انتخاب کنید',
    savedTitle: 'انتخاب شما ذخیره شد', savedBody: 'جزئیات در همین مرورگر ذخیره شد. این یک سفارش نهایی یا تأیید تحویل نیست',
    download: 'دریافت جزئیات', done: 'برگشت به گل‌ها', gift: 'کارت هدیه', edit: 'ویرایش انتخاب', clearSaved: 'پاک کردن پیش‌نمایش ذخیره‌شده',
    moodNames: { coral: 'مرجانی', ivory: 'ابری', apricot: 'زردآلویی', lilac: 'یاسی' },
  },
  en: {
    shop: 'Collections', compose: 'Bespoke', story: 'The studio', care: 'Flower care', moments: 'Occasions', bloom: 'The bloom',
    bag: 'Flower bag', menu: 'Menu', close: 'Close', language: 'تغییر زبان به فارسی', skip: 'Skip to main content',
    heroEyebrow: 'FLORA FLOWER STUDIO', heroLine1: 'Some feelings', heroLine2: 'need flowers',
    heroBody: 'For the things that are hard to say, choose a flower that speaks for you', explore: 'View the collection',
    heroSecondary: 'One bloom, a thousand feelings', replay: 'Watch it bloom', pause: 'Pause the bloom', bloomSlider: 'Flower bloom progress',
    flowerCaption: 'Coral peony', flowerSubcaption: 'A bloom, at your pace',
    marquee: ['Four color palettes', 'Bouquets, boxes & vases', 'Three sizes', 'Paper or linen'],
    collectionTitle: 'Find your kind of flowers', collectionBody: 'From coral bouquets to lilac vase arrangements. Explore the flowers, sizes and details of each design',
    all: 'All flowers', bouquets: 'Bouquets', boxes: 'Flower boxes', vases: 'Vase arrangements', details: 'View the details',
    from: 'From', toman: 'Toman', emptyCollection: 'More flowers will grow here soon',
    composeTitle: 'A composition of your own', composeBody: 'Choose the color, size and wrapping. See your arrangement and its price change as you go',
    mood: 'Color palette', size: 'Arrangement size', wrap: 'The wrapping', petite: 'Petite', signature: 'Signature', abundant: 'Abundant',
    paper: 'Soft paper', linen: 'Natural linen', linenNote: 'Linen wrapping', total: 'Total', add: 'Add to bag', added: 'Added to your flower bag',
    customName: 'Your bespoke arrangement', customHint: 'The image shows your chosen color and shape',
    atelierEyebrow: 'INSIDE THE FLORA STUDIO', atelierTitle: 'Beauty is in the details',
    atelierBody: 'A coral peony, garden roses and free-flowing eucalyptus. Every composition begins with a conversation between color, shape and texture',
    atelierBody2: 'At Flora, the choice begins with you. Find a design you love, then choose the size and wrapping that suit the moment you have in mind',
    atelierLink: 'Compose your flowers', atelierCaption: 'Every stem is part of a story',
    careTitle: 'Keep your flowers beautiful', careBody: 'Fresh water, a stem trim and a cool spot. Simple ways to care for your flowers',
    careImageCaption: 'Flowers make life a little softer',
    momentsTitle: 'For the person on your mind', momentsBody: 'A birthday, a small thank-you or simply because. Choose your flowers and add a message of your own',
    preorder: 'Reserve your flowers', momentsTag: 'A PERSONAL CHOICE, FOR SOMEONE SPECIAL',
    footerTitle: 'Let flowers say it', footerBody: 'For everything you want to say', backTop: 'Back to top', footerNote: 'FLORA FLOWER STUDIO',
    viewBag: 'View your bag', emptyBag: 'Choose your first flowers', emptyBagBody: 'Start with the collection or compose an arrangement of your own',
    remove: 'Remove flowers', increase: 'Increase quantity', decrease: 'Decrease quantity', quantity: 'Quantity', checkout: 'Preview your order',
    cartNote: 'Prices belong to this demonstration collection', continue: 'Keep exploring',
    preorderTitle: 'Your selection, in detail', preorderBody: 'Bring your flowers, preferred day and gift message together in one preview',
    name: 'Your name', phone: 'Phone number', date: 'Preferred day', message: 'Your gift note', optional: 'Optional',
    namePlaceholder: 'First and last name', phonePlaceholder: '+98 912 123 4567', messagePlaceholder: 'Something you would like the flowers to say',
    saveOrder: 'Save your selection', demoNote: 'This is a demonstration. No order is sent to a shop and no payment is taken',
    nameError: 'Please enter your name', phoneError: 'Please enter a valid phone number', dateError: 'Choose today or a future date',
    savedTitle: 'Your selection is saved', savedBody: 'The details are saved in this browser. This is not a final order or a delivery confirmation',
    download: 'Download details', done: 'Back to the flowers', gift: 'Gift note', edit: 'Edit your selection', clearSaved: 'Clear the saved preview',
    moodNames: { coral: 'Coral blush', ivory: 'Ivory cloud', apricot: 'Apricot sun', lilac: 'Lilac haze' },
  },
}

export const products = [
  { id: 'coral', category: 'bouquets', name: { fa: 'صبح مرجانی', en: 'Coral morning' },
    detail: { fa: 'پیونی، رز باغی و برگ‌های اکالیپتوس', en: 'Peonies, garden roses & eucalyptus' },
    description: { fa: 'پیونی مرجانی و رز باغی در کنار اکالیپتوس؛ یک دسته گل با فرم آزاد و طیف صورتی گرم', en: 'Coral peonies and garden roses with eucalyptus. A free-flowing bouquet in a warm pink palette' },
    price: 2900000, image: asset('/images/coral.webp'), color: '#d7a5a0', botanical: 'Peony · Garden rose' },
  { id: 'ivory', category: 'boxes', name: { fa: 'ابر سپید', en: 'Ivory cloud' },
    detail: { fa: 'ارکیده، رز سفید و آلاله', en: 'Orchids, white roses & ranunculus' },
    description: { fa: 'سپیدی آرام گل‌ها در یک باکس سبز ملایم؛ انتخابی برای لحظه‌های ساده و عمیق', en: 'Soft white blooms gathered in a pale sage box. A quiet arrangement for a meaningful moment' },
    price: 3800000, image: asset('/images/ivory.webp'), color: '#e6dfc6', botanical: 'Orchid · White rose' },
  { id: 'apricot', category: 'bouquets', name: { fa: 'آفتاب زردآلویی', en: 'Apricot sunlight' },
    detail: { fa: 'لاله‌های هلویی و رزهای کرم', en: 'Peach tulips & cream roses' },
    description: { fa: 'لاله‌های هلویی و رزهای کرم در یک دسته گل روشن؛ انتخابی گرم برای تولد یا قدردانی', en: 'Peach tulips and cream roses in a bright bouquet. A warm palette for a birthday or a thank-you' },
    price: 1950000, image: asset('/images/apricot.webp'), color: '#e6b692', botanical: 'Tulip · Cream rose' },
  { id: 'lilac', category: 'vases', name: { fa: 'مه یاسی', en: 'Lilac daydream' },
    detail: { fa: 'لیسیانتوس، هورتانسیا و رز یاسی', en: 'Lisianthus, hydrangea & mauve roses' },
    description: { fa: 'یاسی‌های لطیف در گلدانی ساده؛ ترکیبی که گوشه‌ای از خانه را به باغ تبدیل می‌کند', en: 'Lilac-colored lisianthus, hydrangeas and roses in a ceramic vase. A soft palette for your home or a thoughtful gift' },
    price: 3400000, image: asset('/images/lilac.webp'), color: '#bbb1cb', botanical: 'Lisianthus · Hydrangea' },
] as const

export const careItems = [
  { title: { fa: 'اول، کمی آب تازه', en: 'Start with fresh water' }, body: { fa: 'گلدان را تمیز کنید و با آب تازه و خنک پر کنید. برگ‌هایی را که زیر آب قرار می‌گیرند جدا کنید تا آب تمیزتر بماند', en: 'Use a clean vase and fresh, cool water. Remove leaves that sit below the waterline to help keep the water clean' } },
  { title: { fa: 'یک برش کوچک، یک شروع تازه', en: 'A fresh cut, a fresh start' }, body: { fa: 'انتهای ساقه‌ها را با ابزار تمیز حدود دو سانتی‌متر به صورت مورب کوتاه کنید تا گل‌ها راحت‌تر آب بگیرند', en: 'With a clean tool, trim about two centimeters from the stems at an angle to help the flowers drink' } },
  { title: { fa: 'نور ملایم، جای خنک', en: 'Gentle light, a cool corner' }, body: { fa: 'گل‌ها را دور از آفتاب مستقیم، وسایل گرمایشی و ظرف میوه نگه دارید. نور غیرمستقیم و هوای خنک برایشان بهتر است', en: 'Keep flowers away from direct sunlight, heaters and fruit bowls. Indirect light and a cool room are kinder to the petals' } },
  { title: { fa: 'هر دو روز، یک رسیدگی', en: 'A little care, every other day' }, body: { fa: 'آب گلدان را هر دو روز عوض کنید، ساقه‌ها را دوباره کمی کوتاه کنید و گلبرگ‌های پژمرده را جدا کنید. برای باکس گل، اسفنج را مرطوب نگه دارید', en: 'Change the water every other day, give the stems another small trim and remove fading petals. For a flower box, keep its floral foam moist' } },
]

export const sizeFactors: Record<Size, number> = { petite: 0.75, signature: 1, abundant: 1.4 }
export const priceFor = (price: number, size: Size, wrap: Wrap = 'paper') => Math.round(price * sizeFactors[size] / 10000) * 10000 + (wrap === 'linen' ? 180000 : 0)
export const number = (value: number, lang: Language) => new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(value)

export interface CartItem { id: string; productId: Mood; custom: boolean; size: Size; wrap: Wrap; quantity: number }
export function readCart(): CartItem[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem('flora-bag') || '[]')
    if (!Array.isArray(data)) return []
    return data.filter((i): i is CartItem => i && typeof i.id === 'string' && products.some(p => p.id === i.productId) && ['petite', 'signature', 'abundant'].includes(i.size) && ['paper', 'linen'].includes(i.wrap) && typeof i.custom === 'boolean' && Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 20).slice(0, 24)
  } catch { return [] }
}
