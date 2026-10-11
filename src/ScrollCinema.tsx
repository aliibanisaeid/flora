import { asset } from './asset'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Check } from 'lucide-react'
import BloomMark from './BloomMark'
import { products, words } from './content'
import type { Language, Mood } from './content'
import './cinema.css'

export const flowerStory = {
  fa: [
    { nav: 'ساقه', eyebrow: 'استودیوی گل فلورا', title: ['برای آنچه', 'می‌خواهید بگویید'], body: 'دسته گل، باکس و گل در گلدان؛ ترکیبی برای هدیه دادن، به سلیقه شما', fact: '' },
    { nav: 'غنچه', eyebrow: 'قصه یک دسته گل', title: ['زیبایی', 'از اینجا آغاز می‌شود'], body: 'یک غنچه پیونی، پیش از باز شدن گلبرگ‌ها؛ شروعی آرام برای یک ترکیب پررنگ', fact: 'پیونی مرجانی' },
    { nav: 'گلبرگ', eyebrow: 'رنگ، فرم، بافت', title: ['گلبرگ به گلبرگ', 'رنگ جان می‌گیرد'], body: 'مرجانی گرم و گلبرگ‌های لایه‌لایه؛ جزئیاتی که به هر گل شخصیت می‌دهند', fact: 'مرجانی · صورتی گرم' },
    { nav: 'چیدمان', eyebrow: 'یک ترکیب، چند زیبایی', title: ['کنار هم', 'یک قصه تازه'], body: 'پیونی، رز باغی و اکالیپتوس؛ رنگ و بافت هر ساقه، ترکیب را کامل می‌کند', fact: 'پیونی · رز باغی · اکالیپتوس' },
    { nav: 'دسته گل', eyebrow: 'جزئیاتی برای هدیه دادن', title: ['گل‌ها آماده‌اند', 'پیام با شما'], body: 'فرم آزاد گل‌ها در کاغذی لطیف؛ انتخابی شخصی که می‌توانید پیام خود را به آن اضافه کنید', fact: 'گل، پوشش، پیام شما' },
    { nav: 'رنگ‌ها', eyebrow: 'مجموعه فلورا', title: ['چهار رنگ', 'برای انتخاب شما'], body: 'مرجانی، ابری، زردآلویی یا یاسی؛ طیف محبوبتان را انتخاب کنید', fact: '' },
  ],
  en: [
    { nav: 'The stem', eyebrow: 'FLORA FLOWER STUDIO', title: ['For everything', 'you want to say'], body: 'Bouquets, flower boxes and vase arrangements. A personal choice for someone on your mind', fact: '' },
    { nav: 'The bud', eyebrow: 'THE MAKING OF A BOUQUET', title: ['Beauty', 'begins here'], body: 'A coral peony before its petals open. A quiet beginning for an expressive arrangement', fact: 'CORAL PEONY' },
    { nav: 'The petals', eyebrow: 'COLOR, SHAPE, TEXTURE', title: ['Petal by petal', 'color comes alive'], body: 'Warm coral and layer upon layer of petals. The details that give a flower its character', fact: 'CORAL · WARM PINK' },
    { nav: 'The arrangement', eyebrow: 'ONE COMPOSITION, MANY DETAILS', title: ['Together', 'a new story'], body: 'Peonies, garden roses and eucalyptus. Every stem brings its own color and texture to the whole', fact: 'PEONY · GARDEN ROSE · EUCALYPTUS' },
    { nav: 'The bouquet', eyebrow: 'THE DETAILS OF GIVING', title: ['The flowers are ready', 'the words are yours'], body: 'Free-flowing flowers gathered in soft paper. A personal choice, with room for a message of your own', fact: 'FLOWERS, WRAPPING, YOUR MESSAGE' },
    { nav: 'The colors', eyebrow: 'THE FLORA COLLECTION', title: ['Four colors', 'your choice'], body: 'Coral blush, ivory cloud, apricot sun or lilac haze. Choose the palette that feels right', fact: '' },
  ],
}

export function scrollToFlowerChapter(index: number) {
  const root = document.getElementById('bloom')
  if (!root) return
  const start = root.getBoundingClientRect().top + window.scrollY
  const distance = Math.max(root.offsetHeight - window.innerHeight, 0)
  const target = root.dataset.reduced === 'true'
    ? document.getElementById(`flower-chapter-${index}`)!.getBoundingClientRect().top + window.scrollY - 110
    : start + distance * (index === 0 ? 0 : (index + 0.45) / 6)
  window.scrollTo({ top: target, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}

interface CinemaProps {
  lang: Language
  mood: Mood
  onMood: (mood: Mood) => void
  onReserve: () => void
}

export default function ScrollCinema({ lang, mood, onMood, onReserve }: CinemaProps) {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const motion = useRef({ progress: 0, target: 0, duration: 15, frame: 0 })
  const [active, setActive] = useState(0)
  const [painted, setPainted] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [failed, setFailed] = useState(false)
  const copy = flowerStory[lang]

  useEffect(() => {
    const root = rootRef.current!
    const video = videoRef.current!
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const controller = new AbortController()
    let blobUrl = ''
    let alive = true
    let started = false
    let lastChapter = -1
    let frameCallback = 0

    // Seeking is coalesced: a fast gesture queues the latest requested time.
    const seek = () => {
      if (!video.duration || !Number.isFinite(video.duration) || video.seeking || media.matches) return
      const target = Math.min(motion.current.target, video.duration - 0.04)
      if (Math.abs(video.currentTime - target) > 0.025) video.currentTime = target
    }
    const onPaint = () => { if (alive) setPainted(true) }
    const onSeeked = () => {
      if ('requestVideoFrameCallback' in video) frameCallback = video.requestVideoFrameCallback(onPaint)
      else onPaint()
      seek()
    }
    const onData = () => {
      motion.current.duration = video.duration
      motion.current.target = Math.min(motion.current.progress * 1.2, 1) * Math.max(video.duration - 0.04, 0)
      // Nudge the first frame so the poster is held until a real video paint.
      if (motion.current.target < 0.02) video.currentTime = 0.02
      else seek()
    }
    const loadFilm = async () => {
      if (started || media.matches) return
      started = true
      try {
        const source = matchMedia('(max-width: 760px)').matches ? 'mobile' : 'desktop'
        const response = await fetch(asset(`/images/flora-film-${source}.mp4`), { signal: controller.signal })
        if (!response.ok) throw new Error('Film unavailable')
        const blob = await response.blob()
        if (!alive || media.matches) return
        blobUrl = URL.createObjectURL(blob)
        video.src = blobUrl
        video.load()
      } catch (error) {
        if (alive && !(error instanceof DOMException && error.name === 'AbortError')) setFailed(true)
      }
    }
    const update = () => {
      motion.current.frame = 0
      const rect = root.getBoundingClientRect()
      const distance = root.offsetHeight - window.innerHeight
      const progress = distance > 0 ? Math.max(0, Math.min(1, -rect.top / distance)) : 0
      motion.current.progress = progress
      motion.current.target = Math.min(progress * 1.2, 1) * Math.max(motion.current.duration - 0.04, 0)
      let chapter = Math.min(5, Math.floor(progress * 6))
      if (media.matches) {
        const articles = root.querySelectorAll<HTMLElement>('.cinema-chapter')
        articles.forEach((article, i) => { if (article.getBoundingClientRect().top < window.innerHeight * 0.5) chapter = i })
      }
      if (chapter !== lastChapter) { lastChapter = chapter; setActive(chapter) }
      stageRef.current?.style.setProperty('--story-progress', String(progress))
      stageRef.current?.style.setProperty('--colors-opacity', String(Math.max(0, Math.min(1, (progress - 0.77) / 0.075))))
      if (!media.matches) seek()
    }
    const queue = () => { if (!motion.current.frame) motion.current.frame = requestAnimationFrame(update) }
    const changeMotion = () => {
      setReduced(media.matches)
      if (media.matches) { video.pause(); video.removeAttribute('src'); video.load(); setPainted(false) }
      else { started = false; void loadFilm() }
      queue()
    }
    const onError = () => { if (alive && video.getAttribute('src')) setFailed(true) }
    video.addEventListener('loadeddata', onData)
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('error', onError)
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    media.addEventListener('change', changeMotion)
    setReduced(media.matches)
    const nearby = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) void loadFilm() }, { rootMargin: '100% 0px' })
    nearby.observe(root)
    update()
    return () => {
      alive = false; controller.abort(); nearby.disconnect()
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue)
      media.removeEventListener('change', changeMotion)
      video.removeEventListener('loadeddata', onData); video.removeEventListener('seeked', onSeeked); video.removeEventListener('error', onError)
      cancelAnimationFrame(motion.current.frame)
      if (frameCallback) video.cancelVideoFrameCallback(frameCallback)
      video.pause(); video.removeAttribute('src'); video.load()
      if (blobUrl) URL.revokeObjectURL(blobUrl)
    }
  }, [])

  return <section ref={rootRef} id="bloom" className="scroll-cinema" data-reduced={reduced} aria-label={lang === 'fa' ? 'قصه شکفتن گل، در شش فصل' : 'The flower story, in six chapters'}>
    <div ref={stageRef} className={`cinema-stage ${active === 5 ? 'colors-chapter' : ''}`}>
      <div className="cinema-world" aria-hidden="true">
        <picture className={`cinema-poster ${painted && !failed ? 'painted' : ''}`}>
          <source media="(max-width:760px)" srcSet={asset(`/images/film-posters/mobile-${active}.jpg`)} />
          <img src={asset(`/images/film-posters/desktop-${active}.jpg`)} alt="" fetchPriority="high" />
        </picture>
        <video ref={videoRef} muted playsInline preload="none" className={painted && !failed ? 'painted' : ''} aria-hidden="true" />
        <div className="cinema-veil" />
        <div className="cinema-colors">
          {products.map((p, i) => <img src={p.image} key={p.id} className={`floating-bouquet bouquet-${i} ${mood === p.id ? 'chosen' : ''}`} alt="" loading="lazy" />)}
        </div>
      </div>
      <div className="cinema-copy-list">
        {copy.map((chapter, i) => <article key={i} id={`flower-chapter-${i}`} className={`cinema-chapter ${active === i ? 'active' : ''} ${i === 5 ? 'cinema-finale' : ''}`} aria-hidden={reduced ? undefined : active !== i} inert={!reduced && active !== i}>
          <div className="cinema-copy">
            <p className="cinema-eyebrow">{chapter.eyebrow}</p>
            {i === 0 ? <h1>{chapter.title[0]}<br />{chapter.title[1]}</h1> : <h2>{chapter.title[0]}<br />{chapter.title[1]}</h2>}
            <p className="cinema-description">{chapter.body}</p>
            {i === 5 ? <>
              <div className="cinema-moods" role="group" aria-label={words[lang].mood}>{products.map(p => <button key={p.id} aria-pressed={mood === p.id} onClick={() => onMood(p.id)}><span style={{ background: p.color }}>{mood === p.id && <Check size={13} />}</span>{words[lang].moodNames[p.id]}</button>)}</div>
              <button className="cinema-reserve" onClick={onReserve}>{words[lang].preorder}<BloomMark size={18} /></button>
            </> : null}
          </div>
        </article>)}
      </div>
      <div className="cinema-footer">
        <span className="cinema-maker" dir="ltr">FLORA FLOWER STUDIO</span>
        <button className="cinema-scroll" aria-label={lang === 'fa' ? 'ادامه قصه گل' : 'Continue the flower story'} onClick={() => { if (active < 5) scrollToFlowerChapter(active + 1); else document.getElementById('collections')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }) }}><ArrowDown size={20} /></button>
      </div>
      <div className="cinema-progress" aria-hidden="true"><span /></div>
    </div>
  </section>
}
