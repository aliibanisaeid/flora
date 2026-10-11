import { asset } from './asset'
import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties, FormEvent, ReactNode } from 'react'
import { Check, Flower2, Menu, Minus, Plus, ShoppingBag, X, Download } from 'lucide-react'
import { careItems, number, priceFor, products, readCart, words } from './content'
import ScrollCinema, { flowerStory, scrollToFlowerChapter } from './ScrollCinema'
import { Collections, Occasions } from './Editorial'
import BloomMark from './BloomMark'
import type { CartItem, Language, Mood, Size, Wrap } from './content'

const moods: Mood[] = ['coral', 'ivory', 'apricot', 'lilac']
const sizes: Size[] = ['petite', 'signature', 'abundant']
const wraps: Wrap[] = ['paper', 'linen']
const chapters = ['bloom', 'collection', 'compose', 'atelier', 'care', 'moments']

function Logo({ small = false }: { small?: boolean }) {
  return <span className={`logo ${small ? 'logo-small' : ''}`} dir="ltr">
    <img className="brand-logo" src={asset(small ? '/brand/flora-mark.svg' : '/brand/flora-logo.svg')} alt="" aria-hidden="true" />
  </span>
}

function Modal({ open, onClose, title, children, className = '' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  const id = useId()
  const previous = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) { previous.current = document.activeElement as HTMLElement; dialog.showModal(); document.body.style.overflow = 'hidden' }
    if (!open && dialog.open) { dialog.close(); document.body.style.overflow = ''; previous.current?.focus() }
    return () => { document.body.style.overflow = '' }
  }, [open])
  return <dialog ref={ref} className={`modal ${className}`} aria-labelledby={id} onCancel={e => { e.preventDefault(); onClose() }} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose() } }}>
    <h2 id={id} className="sr-only">{title}</h2>
    {children}
  </dialog>
}

function localToday() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tehran', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()) }
function normalizePhone(value: string) { return value.replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632)).replace(/[\s()-]/g, '') }

export default function App() {
  const [lang, setLang] = useState<Language>(() => { try { return localStorage.getItem('flora-language') === 'en' ? 'en' : 'fa' } catch { return 'fa' } })
  const t = words[lang]
  const [cart, setCart] = useState<CartItem[]>(readCart)
  const [bagOpen, setBagOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [mood, setMood] = useState<Mood>('coral')
  const [size, setSize] = useState<Size>('signature')
  const [wrap, setWrap] = useState<Wrap>('paper')
  const [careOpen, setCareOpen] = useState<number | null>(null)
  const [productOpen, setProductOpen] = useState<Mood | null>(null)
  const [productSize, setProductSize] = useState<Size>('signature')
  const [preorderOpen, setPreorderOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', date: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [storageError, setStorageError] = useState(false)
  const toastTimer = useRef(0)
  const savedOrder = useRef('')
  const selected = products.find(p => p.id === mood)!
  const quickProduct = products.find(p => p.id === productOpen)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + priceFor(products.find(p => p.id === item.productId)!.price, item.size, item.wrap) * item.quantity, 0)
  const money = (value: number) => `${number(value, lang)} ${t.toman}`
  const nav = [t.bloom, t.shop, t.compose, t.story, t.care, t.moments]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
    document.title = lang === 'fa' ? 'فلورا | دسته گل، باکس گل و طراحی اختصاصی' : 'Flora | Bouquets, flower boxes & bespoke arrangements'
    const description = lang === 'fa' ? 'مجموعه‌های گل فلورا را ببینید، برای مناسبت خود گل انتخاب کنید و رنگ، اندازه و پوشش ترکیب اختصاصی‌تان را بسازید' : 'Explore Flora bouquets, flower boxes and vase arrangements. Choose flowers for your occasion and personalize the color, size and wrapping'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    try { localStorage.setItem('flora-language', lang) } catch { /* Language still works without persistence. */ }
  }, [lang])
  useEffect(() => { try { localStorage.setItem('flora-bag', JSON.stringify(cart)); setStorageError(false) } catch { setStorageError(true) } }, [cart])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }) }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [lang])
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  function add(productId: Mood, selectedSize: Size, selectedWrap: Wrap = 'paper', custom = false) {
    const id = `${custom ? 'custom' : 'collection'}-${productId}-${selectedSize}-${selectedWrap}`
    setCart(items => {
      const found = items.find(i => i.id === id)
      return found ? items.map(i => i.id === id ? { ...i, quantity: Math.min(i.quantity + 1, 20) } : i) : [...items, { id, productId, custom, size: selectedSize, wrap: selectedWrap, quantity: 1 }]
    })
    setToast(t.added); clearTimeout(toastTimer.current); toastTimer.current = window.setTimeout(() => setToast(''), 3200)
  }
  function changeQuantity(id: string, delta: number) { setCart(items => items.map(i => i.id === id ? { ...i, quantity: Math.min(i.quantity + delta, 20) } : i).filter(i => i.quantity > 0)) }
  function openPreorder() {
    if (!cart.length) add(mood, size, wrap, true)
    setBagOpen(false); setSubmitted(false); setErrors({}); setPreorderOpen(true)
  }
  function submit(e: FormEvent) {
    e.preventDefault()
    const issues: Record<string, string> = {}
    if (form.name.trim().length < 2) issues.name = t.nameError
    if (!/^\+?\d{10,15}$/.test(normalizePhone(form.phone))) issues.phone = t.phoneError
    if (!form.date || form.date < localToday()) issues.date = t.dateError
    setErrors(issues)
    if (Object.keys(issues).length) { document.getElementById(`order-${Object.keys(issues)[0]}`)?.focus(); return }
    const itemLines = cart.map(i => { const p = products.find(p => p.id === i.productId)!; return `${i.custom ? t.customName : p.name[lang]} | ${t.moodNames[i.productId]} | ${t[i.size]} | ${t[i.wrap]} | ${t.quantity}: ${number(i.quantity, lang)} | ${money(priceFor(p.price, i.size, i.wrap) * i.quantity)}` })
    savedOrder.current = [lang === 'fa' ? 'فلورا | انتخاب نمایشی گل' : 'FLORA | Demonstration flower selection', '', ...itemLines, '', `${t.total}: ${money(total)}`, `${t.name}: ${form.name.trim()}`, `${t.phone}: ${normalizePhone(form.phone)}`, `${t.date}: ${form.date}`, `${t.gift}: ${form.message.trim()}`, '', t.demoNote].join('\n')
    try { localStorage.setItem('flora-reservation', JSON.stringify({ ...form, phone: normalizePhone(form.phone), items: cart, total, createdAt: new Date().toISOString(), demo: true })); setSubmitted(true) }
    catch { setErrors({ storage: lang === 'fa' ? 'ذخیره‌سازی مرورگر در دسترس نیست. لطفاً دوباره امتحان کنید' : 'Browser storage is unavailable. Please try again' }) }
  }
  function download() { const url = URL.createObjectURL(new Blob([savedOrder.current], { type: 'text/plain;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = 'flora-selection.txt'; a.click(); window.setTimeout(() => URL.revokeObjectURL(url), 2000) }

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header">
      <a href="#bloom" aria-label={lang === 'fa' ? 'فلورا، صفحه نخست' : 'Flora home'}><Logo /></a>
      <nav className="desktop-nav" aria-label={t.menu} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <a href="#collections">{t.shop}</a>
        <a href="#moments">{t.moments}</a>
        <a href="#compose">{t.compose}</a>
        <a href="#atelier">{t.story}</a>
      </nav>
      <div className="header-actions">
        <button className="language-switch" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} aria-label={t.language} dir="ltr"><span className={lang === 'fa' ? 'selected' : ''}>FA</span><span>/</span><span className={lang === 'en' ? 'selected' : ''}>EN</span></button>
        <button className="bag-button" onClick={() => setBagOpen(true)} aria-label={`${t.bag}, ${number(count, lang)}`}><ShoppingBag size={19} /><span>{number(count, lang)}</span></button>
        <button className="mobile-menu-button icon-button" aria-label={t.menu} onClick={() => setMenuOpen(true)}><Menu size={22} /></button>
      </div>
    </header>

    <main id="main">
      <ScrollCinema lang={lang} mood={mood} onMood={setMood} onReserve={openPreorder} />

      <div className="flower-marquee" aria-label={t.marquee.join('، ')}>
        <div className="marquee-track" aria-hidden="true">{[0, 1, 2].flatMap(repeat => t.marquee.map((text, i) => <span key={`${repeat}-${i}`}>{text}<Logo small /></span>))}</div>
      </div>

      <Collections lang={lang} onMood={setMood} onFilter={setFilter} />

      <section id="collection" className="collection section-pad section-anchor">
        <div className="section-heading reveal"><h2>{t.collectionTitle}</h2><p>{t.collectionBody}</p></div>
        <div className="collection-filters" role="group" aria-label={t.shop}>{(['all', 'bouquets', 'boxes', 'vases'] as const).map(key => <button key={key} aria-pressed={filter === key} className={filter === key ? 'selected' : ''} onClick={() => setFilter(key)}>{t[key]}</button>)}</div>
        <div className="product-grid">
          {products.filter(p => filter === 'all' || p.category === filter).map((product, i) => <article className="product-card" key={product.id} style={{ '--card-color': product.color, '--delay': `${i * 60}ms` } as CSSProperties}>
            <button className="product-photo" onClick={() => { setProductOpen(product.id); setProductSize('signature') }} aria-label={`${t.details}: ${product.name[lang]}`}><img src={product.image} alt={product.name[lang]} loading="lazy" /><span className="photo-action"><Plus size={22} /></span></button>
            <div className="product-title"><h3>{product.name[lang]}</h3><span className="product-color" aria-hidden="true" /></div>
            <p className="product-details">{product.detail[lang]}</p>
            <div className="product-bottom"><span>{t.from} {money(priceFor(product.price, 'petite'))}</span><button onClick={() => { setProductOpen(product.id); setProductSize('signature') }} aria-label={`${t.details}: ${product.name[lang]}`}><BloomMark size={21} /></button></div>
          </article>)}
        </div>
      </section>

      <Occasions lang={lang} onMood={setMood} />

      <section id="compose" className="composer section-anchor">
        <div className="composer-art">
          <div className="composer-art-word" dir="ltr" aria-hidden="true">yours</div>
          {products.map(p => <img key={p.id} className={`composer-image ${mood === p.id ? 'selected' : ''}`} src={p.image} alt={mood === p.id ? p.name[lang] : ''} aria-hidden={mood !== p.id} loading="lazy" style={{ '--bouquet-scale': size === 'petite' ? 0.78 : size === 'abundant' ? 1.08 : 0.95 } as CSSProperties} />)}
          <div className={`ribbon ${wrap}`} aria-hidden="true"><span /><span /></div>
          <p className="composer-image-caption">{t.customHint}</p>
        </div>
        <div className="composer-panel">
          <h2>{t.composeTitle}</h2><p>{t.composeBody}</p>
          <fieldset className="mood-picker"><legend>{t.mood}</legend><div className="mood-options">{moods.map(value => <button key={value} className={mood === value ? 'selected' : ''} aria-pressed={mood === value} onClick={() => setMood(value)}><span className="swatch" style={{ background: products.find(p => p.id === value)!.color }}>{mood === value && <Check size={14} />}</span><span>{t.moodNames[value]}</span></button>)}</div></fieldset>
          <fieldset><legend>{t.size}</legend><div className="segmented-options">{sizes.map(value => <button key={value} aria-pressed={size === value} className={size === value ? 'selected' : ''} onClick={() => setSize(value)}>{t[value]}</button>)}</div></fieldset>
          <fieldset><legend>{t.wrap}</legend><div className="wrap-options">{wraps.map(value => <button key={value} aria-pressed={wrap === value} className={wrap === value ? 'selected' : ''} onClick={() => setWrap(value)}><span className={`material-sample ${value}`} />{t[value]}{wrap === value && <Check size={15} />}</button>)}</div></fieldset>
          <div className="composer-summary"><span>{t.total}</span><strong>{money(priceFor(selected.price, size, wrap))}</strong></div>
          <button className="primary-button composer-add" onClick={() => add(mood, size, wrap, true)}>{t.add}<Plus size={19} /></button>
        </div>
      </section>

      <section id="atelier" className="atelier section-pad section-anchor">
        <div className="atelier-copy reveal"><p className="eyebrow">{t.atelierEyebrow}</p><h2>{t.atelierTitle}</h2><p>{t.atelierBody}</p><p>{t.atelierBody2}</p><a href="#compose" className="text-link">{t.atelierLink}<BloomMark size={20} /></a></div>
        <figure className="atelier-photo reveal"><img src={asset('/images/atelier.webp')} alt={lang === 'fa' ? 'دست‌های گل‌آرا در حال چیدن پیونی، رز و اکالیپتوس' : 'A florist arranging peonies, roses and eucalyptus by hand'} loading="lazy" /><figcaption>{t.atelierCaption}</figcaption></figure>
      </section>

      <section id="care" className="care section-pad section-anchor">
        <div className="care-intro reveal"><h2>{t.careTitle}</h2><p>{t.careBody}</p><div className="care-still"><img src={asset('/images/lilac.webp')} alt={lang === 'fa' ? 'ترکیب گل‌های یاسی در گلدان سرامیکی' : 'Lilac flowers in a ceramic vase'} loading="lazy" /><span>{t.careImageCaption}</span></div></div>
        <div className="care-accordion">{careItems.map((item, i) => <div className={`care-row ${careOpen === i ? 'open' : ''}`} key={i}><h3><button aria-expanded={careOpen === i} aria-controls={`care-answer-${i}`} onClick={() => setCareOpen(careOpen === i ? null : i)}><span>{item.title[lang]}</span>{careOpen === i ? <Minus size={19} /> : <Plus size={19} />}</button></h3><div id={`care-answer-${i}`} className="care-answer" hidden={careOpen !== i}><p>{item.body[lang]}</p></div></div>)}</div>
      </section>

      <section id="celebrate" className="moments section-anchor">
        <div className="moments-copy reveal"><p className="eyebrow">{t.momentsTag}</p><h2>{t.momentsTitle}</h2><p>{t.momentsBody}</p><button className="reserve-button" onClick={openPreorder}>{t.preorder}<BloomMark size={20} /></button></div>
        <div className="moments-flowers" aria-hidden="true"><img src={asset('/images/apricot.webp')} className="moment-flower-back" alt="" loading="lazy" /><img src={asset('/images/coral.webp')} className="moment-flower-front" alt="" loading="lazy" /></div>
      </section>
    </main>

    <footer className="site-footer"><div className="footer-top"><a href="#bloom" aria-label="Flora"><Logo /></a><span>{t.footerBody}</span><a href="#bloom" className="back-top">{t.backTop}<BloomMark size={17} /></a></div><div className="footer-bottom"><span>{t.footerNote}</span><span dir="ltr">flora · flowers with feeling</span><button className="footer-language" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}>{lang === 'fa' ? 'English' : 'فارسی'}</button></div></footer>

    <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast && <><Check size={18} /><span>{toast}</span><button onClick={() => { setToast(''); setBagOpen(true) }}>{t.viewBag}</button></>}</div>

    <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title={t.menu} className="menu-modal"><div className="modal-header"><Logo /><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label={t.close}><X /></button></div><div className="menu-story"><span>{lang === 'fa' ? 'قصه یک دسته گل' : 'The flower story'}</span><div>{flowerStory[lang].map((chapter, i) => <button key={i} onClick={() => { setMenuOpen(false); scrollToFlowerChapter(i) }}>{chapter.nav}</button>)}</div></div><nav>{chapters.map((id, i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{nav[i]}<BloomMark size={23} /></a>)}</nav></Modal>

    <Modal open={!!productOpen} onClose={() => setProductOpen(null)} title={quickProduct?.name[lang] || t.shop} className="product-modal">
      {quickProduct && <><button className="modal-close icon-button" onClick={() => setProductOpen(null)} aria-label={t.close}><X /></button><div className="quick-photo"><img src={quickProduct.image} alt={quickProduct.name[lang]} /></div><div className="quick-info"><span className="botanical-name" dir="ltr">{quickProduct.botanical}</span><h2>{quickProduct.name[lang]}</h2><p>{quickProduct.description[lang]}</p><fieldset><legend>{t.size}</legend><div className="segmented-options">{sizes.map(value => <button key={value} className={productSize === value ? 'selected' : ''} aria-pressed={productSize === value} onClick={() => setProductSize(value)}>{t[value]}</button>)}</div></fieldset><strong className="quick-price">{money(priceFor(quickProduct.price, productSize))}</strong><button className="primary-button" onClick={() => { add(quickProduct.id, productSize); setProductOpen(null) }}>{t.add}<Plus size={19} /></button></div></>}
    </Modal>

    <Modal open={bagOpen} onClose={() => setBagOpen(false)} title={t.bag} className="bag-modal">
      <div className="modal-header"><h2>{t.bag}<small>{number(count, lang)}</small></h2><button className="icon-button" onClick={() => setBagOpen(false)} aria-label={t.close}><X /></button></div>
      {cart.length === 0 ? <div className="empty-bag"><Flower2 size={60} strokeWidth={1} /><h3>{t.emptyBag}</h3><p>{t.emptyBagBody}</p><button className="primary-button" onClick={() => { setBagOpen(false); document.getElementById('collection')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }}>{t.explore}<BloomMark size={18} /></button></div> : <><div className="bag-items">{cart.map(item => { const p = products.find(p => p.id === item.productId)!; return <article className="bag-item" key={item.id}><img src={p.image} alt={p.name[lang]} /><div><h3>{item.custom ? t.customName : p.name[lang]}</h3><p>{t.moodNames[item.productId]} · {t[item.size]} · {t[item.wrap]}</p><strong>{money(priceFor(p.price, item.size, item.wrap))}</strong><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`${t.decrease}: ${p.name[lang]}`}><Minus size={13} /></button><span>{number(item.quantity, lang)}</span><button disabled={item.quantity >= 20} onClick={() => changeQuantity(item.id, 1)} aria-label={`${t.increase}: ${p.name[lang]}`}><Plus size={13} /></button></div></div><button className="remove-item icon-button" onClick={() => setCart(items => items.filter(i => i.id !== item.id))} aria-label={`${t.remove}: ${p.name[lang]}`}><X size={17} /></button></article> })}</div><div className="bag-total"><span>{t.total}</span><strong>{money(total)}</strong></div><p className="small-note">{t.cartNote}</p>{storageError && <p role="alert" className="form-error">{lang === 'fa' ? 'ذخیره سبد در مرورگر در دسترس نیست' : 'Your browser cannot save this bag'}</p>}<button className="primary-button" onClick={openPreorder}>{t.checkout}<BloomMark size={19} /></button><button className="bag-continue" onClick={() => setBagOpen(false)}>{t.continue}</button></>}
    </Modal>

    <Modal open={preorderOpen} onClose={() => setPreorderOpen(false)} title={t.preorderTitle} className="preorder-modal">
      <div className="modal-header"><Logo small /><button className="icon-button" onClick={() => setPreorderOpen(false)} aria-label={t.close}><X /></button></div>
      {submitted ? <div className="saved-order"><span className="saved-icon"><Check size={30} /></span><h2>{t.savedTitle}</h2><p>{t.savedBody}</p><button className="primary-button" onClick={download}>{t.download}<Download size={18} /></button><button className="text-link" onClick={() => setPreorderOpen(false)}>{t.done}</button><button className="clear-preview" onClick={() => { try { localStorage.removeItem('flora-reservation') } catch { /* Clearing the open preview still works. */ } savedOrder.current = ''; setForm({ name: '', phone: '', date: '', message: '' }); setSubmitted(false); setPreorderOpen(false) }}>{t.clearSaved}</button></div> : <><h2>{t.preorderTitle}</h2><p className="preorder-description">{t.preorderBody}</p><div className="order-summary">{cart.map(item => { const p = products.find(p => p.id === item.productId)!; return <div key={item.id}><img src={p.image} alt="" /><span>{item.custom ? t.customName : p.name[lang]}<small>{t.moodNames[item.productId]} · {t[item.size]} · {number(item.quantity, lang)}</small></span><strong>{money(priceFor(p.price, item.size, item.wrap) * item.quantity)}</strong></div> })}</div><form onSubmit={submit} noValidate><div className="form-grid">{(['name', 'phone', 'date'] as const).map(field => <div className={`form-field ${field === 'date' ? 'wide' : ''}`} key={field}><label htmlFor={`order-${field}`}>{t[field]}</label><input id={`order-${field}`} value={form[field]} onChange={e => { setForm(f => ({ ...f, [field]: e.target.value })); setErrors(previous => { const next = { ...previous }; delete next[field]; return next }) }} type={field === 'date' ? 'date' : field === 'phone' ? 'tel' : 'text'} min={field === 'date' ? localToday() : undefined} autoComplete={field === 'name' ? 'name' : field === 'phone' ? 'tel' : 'off'} placeholder={field === 'name' ? t.namePlaceholder : field === 'phone' ? t.phonePlaceholder : undefined} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined} required />{errors[field] && <span className="form-error" id={`${field}-error`}>{errors[field]}</span>}</div>)}</div><div className="form-field"><label htmlFor="order-message">{t.message} <small>({t.optional})</small></label><textarea id="order-message" maxLength={500} rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder={t.messagePlaceholder} /></div><p className="demo-note">{t.demoNote}</p>{errors.storage && <p className="form-error" role="alert">{errors.storage}</p>}<button type="submit" className="primary-button">{t.saveOrder}<Check size={18} /></button></form></>}
    </Modal>
  </>
}
