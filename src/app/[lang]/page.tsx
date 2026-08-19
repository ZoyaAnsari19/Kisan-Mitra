import { notFound } from "next/navigation";

import { intlLocales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher, LanguageSwitcherBlock } from "./LanguageSwitcher";

const IMG = {
  farmerPortrait:
    'https://sspark.genspark.ai/cfimages?u1=w5UBdqESyGdmZLN5ithMmV9sRlRpD9zwhG3q6jxZsi2lAF9bwMvC%2Br1QBhBM8NSVbugqxjhUoRYzDSKSj7k0i6WBu4qZBBPetuA5jwBTtoTLqrJJ7Jz63qstWWbf5mFEXY%2FugMXxq0peHxRR2ZlkW4Fp1BtSmo0xLw%3D%3D&u2=Ch17D5qzIFufYCUL&width=2560',
  farmerLeader:
    'https://sspark.genspark.ai/cfimages?u1=7zdUgZk14WcriweXcYMhuNswb0NEkhtTmMAsYtuy7Jvd9opvoeZIB35ULnXz2NZe18HamV74Oau2GyHPZjFFjk5OvLy7IPNLC3ix2Q8o49kUJ2I1Wxxn6RG0Kshg3Iv8l3fjJQXByi8f8IBblT%2FUxhCEWIPAwQmAZQ%3D%3D&u2=6J4AjohGOqRGkpFV&width=2560',
  farmerWoman:
    'https://sspark.genspark.ai/cfimages?u1=wejG8a6IJsgTjxY5MSQDFCUQyFG2ALTgzVyh7gHeeil3WaeQIFbs8%2BsDri5sOsVq3u2hegFv96MResl4jEecPnZndFVApDVGANtTj8XD9YHlMYyLywi%2FSttHb2vDh4dMA4jOYHuHmLTcPhKpoZnkaqlKosJcBDdRUw%3D%3D&u2=xENoRUlcIToc3X4h&width=2560',
  farmerSorghum:
    'https://sspark.genspark.ai/cfimages?u1=cRdannD2BnqeBxIdIjmYafZq%2FQ2DHDmF3u1ufqSRfyyCcOw1%2FnEnU%2FRZO2bW37jAxZGzzRJi6GsynjPWLstzf4jvMR3dhM27n9kUdjYqnxMPY57Kk0b0u8O3CM22Ck0uQZ%2BxKMo1im4T7v%2BLno1DuPvyTprVRu2jIw%3D%3D&u2=LkD2SdOUVjMjnn%2B7&width=2560',
  farmerCotton:
    'https://sspark.genspark.ai/cfimages?u1=hcxHFpq5fCY7I7P%2BY4Eez%2F4cEa1UKqdLAIiDwAbmvSsW4JKDVNPE2Vgw7ZLOg0uqJysmkvwvL9zpQyG1MM3n65lktkxWglOcDl0GXNlP2yg%2FlARF6KqZChtmvAyg6%2Fc2JeD5DXMyH28UKPahArZlyFdEZl4IITI3sQ%3D%3D&u2=UAGeVp7pU7UAUU6M&width=2560',
  farmStay:
    'https://sspark.genspark.ai/cfimages?u1=y1pMFrU2mjzSJ7EsmFxWqUe45Uv%2Ba5kwrYoCbXTjFJPx4mvTRjDS5axcaD0%2BT8IExLZo2iXhLeQB8X43G2cyjCAa%2BgB1jtvzO2oeqao5yor9gEmb3BOOfyoHuUuhy8jXZeO79Lk9%2FsrDbW%2BEumC%2FX8Crz8Py7vRYSw%3D%3D&u2=JTm4PNP7Jb8AIjOp&width=2560',
  villageIndia:
    'https://sspark.genspark.ai/cfimages?u1=X45yCFqGlofM5xRWPoowjScliMiz1oOU7dG86VKL8NXhq48ytoreU8o1O0GBkaZ%2FmL9W%2FGDXthEuzIr9KCaIqpK0M9%2BFiZ1taEZ7WqG0m66FWR6dmYMXe7fIF2kjkVQwIPT8npa4W6IoRA33CuzqGEaQ4Tq%2Bcxa5lGTIL655sPIW4yRgo%2FHUTCrQhhjzhhRhGBqVAZKn0l%2BG5TMCkAwy3ramxMYukJjvzUpgXSuv%2FdtpDCIJf3AKIIK4C22CyBTINfZxP1on3ZJ%2FsR3vFFtVSlbrp8jpbPWtHLOBzNOTdjMlDSE4CARA2IRLMKFma8a3m7LWxB4v8Q%3D%3D&u2=UQa2cC0NzifZMFSu&width=2560',
  villageRice:
    'https://sspark.genspark.ai/cfimages?u1=4gEYMjzpW1uEvrHhIBpitk9flBKaTgnC624pTnLtLvtK0yd723ehjA8OmgiwzQFBaquiEH7qiiyU5gxQN88qdnjSgB3a8VIx6jCZ1u60Jcw9kr9EuOixuv7tGGzfGtyW6JSptA1sJLSrFt4JXftr3P785zsHJRMEZOdk2J0L0xbA5cPXgKcA6LHWYWTKnLu2JHR3cIrJJDw9Q4UWNO7rzDElsgjuMZlpWHt7Zi26ntzfVw%2FCyKmE9Kw5Bb9kGnnU7HNoOp1%2BFQQ2JhRwg%2B6xD9oOQhVZr0AKDsiEtKJIfO4cKZRHttqeW00ncprEbeImrvwhaSLcVwY3slvsB%2FumilBxRc99KhYd6VlleG95npR%2BNEXj%2BOE8%2FbLbpzCggEEBtLOdoA%3D%3D&u2=5XG9xOv1Wq22ciEB&width=2560',
  villageAerial:
    'https://sspark.genspark.ai/cfimages?u1=H23sFZvhumXSVDi%2F5KX3qrsT6hKsOJcquiwlNqMjMbQN9hQeheA%2FG3WwU8dw9GtiQqxeQs5CIO75ycWEeYouW%2Bu0eAyifZA%3D&u2=kkUBTbqKGMYyXu0c&width=2560',
  fields:
    'https://sspark.genspark.ai/cfimages?u1=stjV1XQy3VJ5kKR%2Fs%2FUY%2Ff%2FAvWXKbKa6EwMP8765Oj8s4yLFzz8n46tcjNziFXzUtOiU44oOurc2W3RGsa9mb2FbYWgiVbjWa8hyZrDsnt6sbtuiTecTaU%2FPY2KuFQi7Wd4xAlxrdba2FkkwagGXsXRtWOZD7ono&u2=L1gd7a7RijxeiMd9&width=2560',
  solarIrrigation:
    'https://sspark.genspark.ai/cfimages?u1=VqxXC62YOZvOxZLQvCY87MC%2FOXTxufA0UMevj%2FTVEcg10%2FjtrOfxR%2F6v%2BGUCWK5bD0hiBo5tApOONO7zZDgAhGF7CdJUCbg6InkKH6yCvqg%3D&u2=UxQ8mtXjK6uZwwkZ&width=2560',
  solarPlant:
    'https://sspark.genspark.ai/cfimages?u1=fTRyZdynLCioliv6vN5lkTJOo54KZn213pYdP577BckZOxUbiAmU9vJlLlG%2BCZMkoY3DdG%2FIIvGnoB8h%2Fx9hpwjXaWyK2MTG3f%2FMA9VqPP0%2F4kp9IUnicPZdQ%2B9oua4VG%2BC1QrCaFZShCJvuR7e46GXP3JIr3UDnW46hKCUJTeg6YHC%2Bxpej2sRPjsdUZToTakCZFw%2FNxA%3D%3D&u2=qZNT3%2BwIHUSmqxd0&width=2560',
  solarField:
    'https://sspark.genspark.ai/cfimages?u1=L4iS%2BPN2pMqwhBVwUVZPvK5xWFVC8eS22%2BYz%2BzcqkLKCoFgurfD5oSo7Yz9%2BmduDS7hn3mEPzQtBq7qfwwMJsCn6nALZ38mIKsPoHfOO%2BbsxiJr0lzB5U947RDKi0hqjocUqllPL49e4y%2Bi4JAsHbOMBq4bcHMRCfQ%3D%3D&u2=pSlzu8G86hXbWzyR&width=2560',
  drone:
    'https://sspark.genspark.ai/cfimages?u1=H9Ne9oz39r7IK388LIRBv5oE%2BF%2Fd80FQTcRkIJ8ewg7H6druudO6lcACBxz17pAmbIGzCAlRS3gdl5r7uP3JD11mErDmDDi3ZoNozY09N9tI&u2=UKn3ulFxuTpZzgan&width=2560',
  droneField:
    'https://sspark.genspark.ai/cfimages?u1=iJ%2BhJrRt1%2FOb5hUL1l8BzBwXJ1o1ajUnDJ8trxJLG10QLQ14tg64TrDX5JnQWETyJQC0yl91jlUJXbx3XHT4hUfUXK44XrqV2IvYQo4y&u2=KsyMjWIfUThuWIvX&width=2560',
  waterPlant:
    'https://sspark.genspark.ai/cfimages?u1=byhBIPq%2B3ijLhrZAbk1KyFUG1Zf4z7lVCKU8nHlwIo17l8nDTVqIeUgUOA6mI3GwRqfo9NHWSXBXVSZEGWaFCTTmqF7R1R%2Bq9bdQNiJ3KoH0XyeYqA%3D%3D&u2=Uh8iNYn6LNQQgUoq&width=2560',
  waterPlant2:
    'https://sspark.genspark.ai/cfimages?u1=zuDmI5xMtF8Zf5J5ZPlIVEVvuu%2BbVTMWvbMvemBVghRyIiLofIhv3Yc8VZcBm1bS%2BLaZXWxayhGL3zufbyM2XL5d95b%2FNk3E6B4bEDgKtaXfCrZCLCHTHGrsVzv4jK7XVzb2E04%3D&u2=r8SNr9%2F%2F21TPUd6J&width=2560',
  waterRural:
    'https://sspark.genspark.ai/cfimages?u1=zXL79r%2FlsxAm27Cm919YjkY%2BEhctAxCepco60Kpy5u64ZfmCM6WtIE8wg8Q8gX%2Bc6cVLcGpjnFHCdFEvStIYS3Ldry%2Bp0j0mwc%2BN9ALGFRFbpA%3D%3D&u2=en9oBQmQAjpqrcUl&width=2560',
  warehouse:
    'https://sspark.genspark.ai/cfimages?u1=Hl9u%2BlWXmk2w0S1qEprn8ETzx78yeVVNUBS95wTOrsghdAsAEK9ENaByKLi8jP%2F5j%2BGn%2FyoPVRb9l0VZSJkt9JylHNHgYNFa6gpWU2bSbGIUQSzqdE5Im7ilEJKUV%2FIZkxiQTArkWFWNfQ%3D%3D&u2=Mqh6Lq5I5ONa7bW3&width=2560',
  silo:
    'https://sspark.genspark.ai/cfimages?u1=Ct3vC5Tg6bJX8wtaIO3%2Bw2PXCJFeenT%2F7ob%2Bla7a5mtOZvqGUUxaH6xAP9Ijr%2FuzdXUawRrMKCZsdpsrS%2FTMFJ9e%2FRjYi7ccv2BaI5kDuza8qJOn3aDCjzTBiJmGCBok1q4BNRPQstMfIjev9M61fVA95Zx6&u2=BZXIz9sThucdMuGL&width=2560',
  storeRural:
    'https://sspark.genspark.ai/cfimages?u1=hZkANy5A098zb2QubInsTQwmkh%2BU%2FKsFTjG1SV1ybu%2BKOyp3%2BB8bNzHJxROAXIaQ1Ycti3maVG4tlLaVmm8YgjpLevSCYmqdnTrZ5j9DFf9YzWgtG%2BY6Oc6XZpmM%2FXMB%2BgFSD4ujjrLGFvCKK4S55s%2F3JTDCX%2B%2Fn67OcYZyqraumwXbMUC4Q8tx8Sg%3D%3D&u2=p23vyVluMcVo7tfA&width=2560',
  storeInterior:
    'https://sspark.genspark.ai/cfimages?u1=2kcHUPQ4tvR3UWWUcuIXaZsADHZ4fJKhC20MzHGIwhJslYSUws4XRv%2BV5uevWupSdcmOXuq8w8tEJzSWanFkVwunJeylOMCPjuVOKlJn&u2=jxPZVN9zcoI%2B97eJ&width=2560',
  storeRoad:
    'https://sspark.genspark.ai/cfimages?u1=Koakl19fqcq4G6hbH0gs4l9tBuY1xozI2qz89pCTAu3FnFpuifIUj0LUsD5iEGUp22fY9Ly0dH6tm4%2BJI8XkYT1FuXwtYRM6YlOZ5dqNdnuhJUF4jgWaaGap%2FA%3D%3D&u2=Wsdl7IPugYyowMw9&width=2560',
  appUi:
    'https://sspark.genspark.ai/cfimages?u1=cnTWtFl5KJAVpo1woilPgNy0abC6r2oRokJKlXeYuttteA8wfK0I4bazVf8EhROsUHAOP%2FlffwmC%2F0YRzevKpOGA2fxmskRpt%2FHcMDa0AdR41yt1%2Bh5jXI%2BotV7tih9s4g%3D%3D&u2=v9PQW00DAmhVNGY9&width=2560',
  appField:
    'https://sspark.genspark.ai/cfimages?u1=uuQylCEOfu3uvLZBCoVAJC58o8rjxE8N%2FoXRvPF8%2FJKclA3MsgrwGhG5k4gKxXEmkVtDGDU4rFceZabMvgeVMQh%2BojF4QchowNGJ%2FSZXt%2B1Zj0Xf4ueyXUtKq44%3D&u2=JgCjQ%2BKvbWU8EoJ0&width=2560',
}

/**
 * Structural data — icons, imagery, coordinates and numbers. Deliberately kept
 * out of the dictionaries: translators should never have to touch a Font
 * Awesome class or an SVG coordinate.
 */
const HERO_STAT_VALUES = [600, 452, 11, 200];

const OS_NODE_ICONS = [
  { i: 'fa-seedling',              top: '4%',  left: '46%' },
  { i: 'fa-id-badge',              top: '14%', left: '12%' },
  { i: 'fa-warehouse',             top: '14%', left: '80%' },
  { i: 'fa-basket-shopping',       top: '46%', left: '2%'  },
  { i: 'fa-droplet',               top: '46%', left: '90%' },
  { i: 'fa-solar-panel',           top: '78%', left: '12%' },
  { i: 'fa-snowflake',             top: '78%', left: '80%' },
  { i: 'fa-store',                 top: '88%', left: '46%' },
  { i: 'fa-truck',                 top: '32%', left: '28%' },
  { i: 'fa-mobile-screen-button',  top: '62%', left: '64%' },
];

const SERVICE_IMAGES = [
  IMG.farmerSorghum,
  IMG.solarIrrigation,
  IMG.fields,
  IMG.farmerLeader,
  IMG.villageIndia,
  IMG.farmerCotton,
  IMG.drone,
  IMG.solarField,
  IMG.warehouse,
  IMG.farmStay,
];

const TIER_STYLES = ['passport-clay', 'passport-gold', 'passport-forest'];

const IMPACT_METRICS = [
  { v: 600,    suf: '+', w: 'col-span-12 md:col-span-6' },
  { v: 184250, suf: '',  w: 'col-span-12 md:col-span-6' },
  { v: 38.6,   suf: '',  w: 'col-span-12 md:col-span-4', dec: 1, crore: true },
  { v: 148,    suf: '',  w: 'col-span-12 md:col-span-4' },
  { v: 920,    suf: '',  w: 'col-span-12 md:col-span-4' },
];

const APP_FEATURE_ICONS = [
  'fa-id-card-clip',
  'fa-location-dot',
  'fa-cloud-arrow-up',
  'fa-flask',
  'fa-landmark',
  'fa-leaf',
];

const MALL_CATEGORY_MEDIA = [
  { i: 'fa-seedling',       img: IMG.fields },
  { i: 'fa-plug',           img: IMG.appUi },
  { i: 'fa-trowel-bricks',  img: IMG.warehouse },
  { i: 'fa-cheese',         img: IMG.farmStay },
];

const ONBOARD_SERVICE_ICONS = [
  'fa-flask', 'fa-droplet', 'fa-tractor', 'fa-helicopter', 'fa-snowflake',
  'fa-basket-shopping', 'fa-rupee-sign', 'fa-solar-panel', 'fa-cow', 'fa-landmark',
];

const VERIFY_ICONS = ['fa-id-card', 'fa-mobile', 'fa-stamp'];

const VOICE_IMAGES = [IMG.farmerWoman, IMG.farmerPortrait, IMG.farmerCotton];

const SOCIAL_ICONS = [
  'fa-x-twitter',
  'fa-instagram',
  'fa-youtube',
  'fa-linkedin-in',
  'fa-facebook-f',
];

function formatCount(n: number, locale: Locale, decimals = 0): string {
  return decimals > 0
    ? n.toFixed(decimals)
    : Math.round(n).toLocaleString(intlLocales[locale]);
}

function liveClockText(locale: Locale, prefix: string): string {
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return `${prefix} · ${new Date().toLocaleDateString(intlLocales[locale], opts).toUpperCase()}`;
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const d = getDictionary(lang);
  const num = (n: number, decimals = 0) => formatCount(n, lang, decimals);

  const NAV = [
    { href: '#ecosystem',      label: d.nav.links.ecosystem },
    { href: '#services',       label: d.nav.links.services },
    { href: '#infrastructure', label: d.nav.links.infrastructure },
    { href: '#membership',     label: d.nav.links.membership },
    { href: '#leadership',     label: d.nav.links.leadership },
    { href: '#mall',           label: d.nav.links.mall },
    { href: '#impact',         label: d.nav.links.impact },
  ];

  return (
    <>
      {/* ============ HEADER ============ */}
      <header
        id="site-header"
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      >
        <div className="mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10 pt-4 sm:pt-5">
          <div className="glass rounded-3xl lg:rounded-full pl-4 sm:pl-5 pr-2 sm:pr-3 py-2.5 sm:py-3 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group min-w-0">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory shrink-0">
                <span className="font-serif text-lg leading-none">क</span>
                <span className="absolute -inset-1 rounded-full border border-gold/40"></span>
              </span>
              <div className="leading-tight min-w-0">
                <div className="font-serif text-[15px] tracking-tight text-forest truncate">{d.nav.brand}</div>
                <div className="text-[10px] tracking-[0.28em] text-brown uppercase truncate">{d.nav.brandSub}</div>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-7 text-[13.5px] text-forest/85">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="hover:text-forest">{n.label}</a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <span
                id="liveclock"
                suppressHydrationWarning
                data-prefix={d.nav.clockPrefix}
                className="hidden xl:inline-block text-[10.5px] tracking-[0.28em] text-brown font-mono"
              >
                {liveClockText(lang, d.nav.clockPrefix)}
              </span>
              <LanguageSwitcher current={lang} label={d.nav.languageLabel} />
              <a href="#onboard" className="btn-primary py-2.5 px-4 sm:px-5 text-[12px] sm:text-[13px] whitespace-nowrap">
                <span className="hidden sm:inline">{d.nav.cta}</span>
                <span className="sm:hidden">{d.nav.ctaShort}</span>
                <span className="arrow">↗</span>
              </a>
              {/* Mobile hamburger — visible only below lg */}
              <button
                id="mobile-menu-btn"
                aria-label={d.nav.toggleMenu}
                aria-controls="mobile-menu"
                aria-expanded="false"
                className="lg:hidden ml-1 inline-flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-full hover:bg-forest/5 transition"
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
          </div>

          {/* Mobile menu panel (below lg only) */}
          <div id="mobile-menu" className="lg:hidden mt-0">
            <div className="glass rounded-3xl p-5 sm:p-6">
              <div className="kicker mb-4"><span className="dot"></span>{d.nav.navigate}</div>
              <nav className="grid grid-cols-1 divide-y divide-forest/10">
                {NAV.map((n) => (
                  <a key={n.href} href={n.href} className="font-serif text-xl text-forest py-3 flex items-center justify-between hover:text-forest-soft transition">
                    <span>{n.label}</span>
                    <span className="text-gold text-base">→</span>
                  </a>
                ))}
              </nav>
              <a href="#onboard" className="btn-primary w-full justify-center mt-5">
                {d.nav.cta} <span className="arrow">→</span>
              </a>
              <LanguageSwitcherBlock current={lang} label={d.nav.languageLabel} />
            </div>
          </div>
        </div>
      </header>

      {/* ============ 1 · CINEMATIC HERO ============ */}
      <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-ivory-grad grain">
        {/* organic blobs */}
        <div className="blob bg-clay/50 w-[520px] h-[520px] -top-40 -left-40 animate-float-slower"></div>
        <div className="blob bg-dusty/50 w-[600px] h-[600px] top-1/3 -right-48 animate-float-slow"></div>
        <div className="blob bg-gold/30 w-[380px] h-[380px] bottom-0 left-1/3 animate-float-slower"></div>

        {/* Top kicker bar */}
        <div className="relative z-10 pt-28 sm:pt-32 md:pt-36">
          <div className="mx-auto max-w-[1480px] px-6 md:px-10 flex flex-wrap items-center justify-between gap-4">
            <div className="kicker flex items-center">
              <span className="inline-flex w-2 h-2 rounded-full bg-copper mr-3 animate-pulse"></span>
              {d.hero.kickerLeft}
              <span className="dot"></span>
              {d.hero.kickerLeftTail}
            </div>
            <div className="kicker kicker-gold hidden md:flex items-center">
              <span className="font-serif italic text-base text-forest mr-3 normal-case tracking-normal">{d.hero.kickerScript}</span>
              <span className="dot"></span>{d.hero.kickerRight}
            </div>
          </div>
        </div>

        {/* Main split editorial */}
        <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 pt-8 sm:pt-10 md:pt-16 grid grid-cols-12 gap-6 md:gap-10 items-start">
          {/* LEFT — copy */}
          <div className="col-span-12 lg:col-span-6 pb-6 lg:pb-10">
            <h1 className="reveal font-serif text-forest hero-headline text-[clamp(1.75rem,2.5vw,2.375rem)] leading-[1.06] tracking-[-0.03em]">
              <span className="block">{d.hero.headline.line1}</span>
              <span className="block italic font-light text-brown">{d.hero.headline.line2}</span>
              <span className="block">{d.hero.headline.line3} <span className="italic font-light">{d.hero.headline.line3Accent}</span></span>
              <span className="block">
                <span className="relative inline-block pr-3">{d.hero.headline.line4}
                  <span className="absolute -right-2 -top-1 text-gold text-2xl">✦</span>
                </span>
              </span>
            </h1>

            <p className="reveal reveal-delay-1 mt-8 max-w-xl text-[17px] leading-relaxed text-forest/75">
              {d.hero.body}
            </p>

            <div className="reveal reveal-delay-2 mt-10 flex flex-wrap items-center gap-4">
              <a href="#onboard" className="btn-primary">
                {d.hero.ctaPrimary} <span className="arrow">→</span>
              </a>
              <a href="#ecosystem" className="btn-ghost">
                {d.hero.ctaGhost}
              </a>
            </div>

            <div className="reveal reveal-delay-3 mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 max-w-xl">
              {d.hero.stats.map((s, i) => (
                <div key={s.label}>
                  <div className="num-stack text-3xl md:text-4xl text-forest tabular" data-count={HERO_STAT_VALUES[i]}>{num(HERO_STAT_VALUES[i])}</div>
                  <div className="metric-line my-2"></div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-brown">{s.label}</div>
                  <div className="text-[11px] text-forest/55 mt-1 leading-tight">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — visual collage */}
          <div className="col-span-12 lg:col-span-6 pb-6 lg:pb-10 lg:pt-1">
            <div className="hero-collage w-full lg:max-w-[540px] lg:ml-auto">
              <div className="hero-collage__grid">
                {/* village aerial */}
                <div className="hero-collage__village img-frame">
                  <img src={IMG.villageIndia} alt={d.alt.village} className="w-full h-full object-cover img-warm" />
                  <div className="chip chip-tl absolute top-3 left-3 sm:top-4 sm:left-4 glass rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3 animate-float-slow z-10">
                    <i className="fa-solid fa-tractor text-olive shrink-0"></i>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-brown">{d.hero.chips.liveLabel}</div>
                      <div className="text-[11px] sm:text-[13px] text-forest leading-tight">{d.hero.chips.liveValue}</div>
                    </div>
                  </div>
                </div>

                {/* big portrait — main */}
                <div className="hero-collage__main img-frame">
                  <img src={IMG.farmerPortrait} alt={d.alt.farmerPortrait} className="w-full h-full object-cover img-warm" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-ivory/90 gap-2 z-10">
                    <div className="font-serif italic text-xs sm:text-sm truncate">{d.hero.chips.portraitCaption}</div>
                    <span className="stamp border-ivory/60 shrink-0 hidden sm:inline-flex">{d.hero.chips.portraitStamp}</span>
                  </div>
                  <div className="chip chip-br absolute top-3 right-3 sm:top-4 sm:right-4 glass rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3 animate-float-slow z-10 max-w-[calc(100%-1.5rem)]">
                    <span className="inline-flex w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-forest text-ivory items-center justify-center text-xs font-mono shrink-0">VLE</span>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-brown">{d.hero.chips.officerLabel}</div>
                      <div className="text-[11px] sm:text-[13px] text-forest leading-tight truncate">{d.hero.chips.officerValue}</div>
                    </div>
                  </div>
                </div>

                {/* solar accent */}
                <div className="hero-collage__solar img-frame">
                  <img src={IMG.solarIrrigation} alt={d.alt.solarIrrigation} className="w-full h-full object-cover img-warm" />
                  <div className="chip chip-ml absolute top-3 left-3 sm:top-4 sm:left-4 glass rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 animate-float-slower z-10">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-brown">{d.hero.chips.soilLabel}</div>
                    <div className="num font-serif text-xl sm:text-2xl text-forest leading-none mt-1">6.8 <span className="text-sm text-olive">{d.hero.chips.soilNote}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom marquee */}
        <div className="relative z-10 mt-6 border-y border-forest/10 bg-ivory/40 backdrop-blur-sm py-5 overflow-hidden">
          <div className="marquee text-forest/70 font-serif italic">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                {d.hero.marquee.map((m) => (
                  <span key={m} className="contents">
                    <span>{m}</span><span className="text-gold">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 2 · ECOSYSTEM STORY ============ */}
      <section id="ecosystem" className="relative bg-ivory py-32 md:py-44">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          {/* Section masthead */}
          <div className="grid grid-cols-12 gap-10 items-end mb-24">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker"><span className="dot"></span>{d.ecosystem.chapter}</div>
              <div className="mt-6 font-serif text-7xl text-forest leading-none">02.</div>
              <div className="text-xs tracking-[0.3em] text-brown mt-2 uppercase">{d.ecosystem.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega text-forest">
                {d.ecosystem.title}
                <span className="italic font-light text-brown"> {d.ecosystem.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-[17px] text-forest/70 leading-relaxed">
                {d.ecosystem.body}
              </p>
            </div>
          </div>

          {/* Timeline storytelling */}
          <div className="space-y-32">
            {/* Story block 1 */}
            <article className="grid grid-cols-12 gap-10 md:items-stretch">
              <div className="col-span-12 md:col-span-7 order-2 md:order-1 flex flex-col justify-center">
                <div className="kicker"><span className="dot"></span>{d.ecosystem.story1.kicker}</div>
                <h3 className="reveal font-serif text-huge mt-4 text-forest">
                  {d.ecosystem.story1.title}
                </h3>
                <p className="reveal reveal-delay-1 mt-6 text-forest/70 text-[16.5px] leading-relaxed max-w-xl">
                  {d.ecosystem.story1.body}
                </p>
                <ul className="reveal reveal-delay-2 mt-8 space-y-2 text-forest/80">
                  {d.ecosystem.story1.bullets.map((b) => (
                    <li key={b} className="bullet">{b}</li>
                  ))}
                </ul>
              </div>
              <div className="col-span-12 md:col-span-5 order-1 md:order-2 flex min-h-[320px] md:min-h-0 md:h-full">
                <div className="img-frame w-full h-full aspect-[4/5] md:aspect-auto" data-parallax="0.10">
                  <img src={IMG.farmerSorghum} alt={d.alt.farmerField} className="w-full h-full object-cover img-warm" />
                </div>
              </div>
            </article>

            {/* Story block 2 — full bleed */}
            <article className="relative">
              <div className="img-frame img-frame-legend h-[60vh] min-h-[440px]" data-parallax="0.08">
                <img src={IMG.villageRice} alt={d.alt.villageIndia} className="w-full h-full object-cover img-warm" />
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-forest/95 via-forest/60 to-forest/10 pointer-events-none" aria-hidden="true" />
                <div className="absolute inset-0 z-[2] flex items-end p-10 md:p-16">
                  <div className="max-w-2xl img-legend-copy">
                    <div className="kicker kicker-gold text-ivory"><span className="dot"></span>{d.ecosystem.story2.kicker}</div>
                    <h3 className="reveal font-serif text-mega text-ivory mt-3">
                      {d.ecosystem.story2.title}
                    </h3>
                  </div>
                </div>
              </div>
            </article>

            {/* Story block 3 */}
            <article className="grid grid-cols-12 gap-10 md:items-stretch">
              <div className="col-span-12 md:col-span-5 flex min-h-[400px] md:min-h-0 md:h-full">
                <div className="img-frame w-full h-full aspect-[4/5] md:aspect-auto" data-parallax="0.12">
                  <img src={IMG.solarIrrigation} alt={d.alt.solar} className="w-full h-full object-cover img-warm" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 min-w-0">
                <div className="kicker"><span className="dot"></span>{d.ecosystem.story3.kicker}</div>
                <h3 className="reveal font-serif text-huge mt-4 text-forest">
                  {d.ecosystem.story3.title}
                </h3>
                <p className="reveal reveal-delay-1 mt-6 text-forest/70 text-[16.5px] leading-relaxed max-w-xl">
                  {d.ecosystem.story3.body}
                </p>

                <div className="reveal reveal-delay-2 mt-10 grid grid-cols-3 gap-6 max-w-xl">
                  {[11, 4, 1].map((v, i) => (
                    <div key={d.ecosystem.story3.stats[i]}>
                      <div className="num-stack text-4xl text-forest" data-count={v}>{num(v)}</div>
                      <div className="text-[11px] tracking-[0.22em] uppercase text-brown mt-2">{d.ecosystem.story3.stats[i]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ 3 · RURAL OPERATING SYSTEM (ARCHITECTURE) ============ */}
      <section className="relative bg-forest-grad text-ivory py-32 md:py-44 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob bg-gold/20 w-[600px] h-[600px] -top-40 right-0 animate-float-slower"></div>
          <div className="blob bg-olive/30 w-[500px] h-[500px] bottom-0 -left-40 animate-float-slow"></div>
        </div>

        <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 items-end mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker kicker-gold"><span className="dot"></span>{d.ruralOs.chapter}</div>
              <div className="mt-6 font-serif text-7xl text-ivory leading-none">03.</div>
              <div className="text-xs tracking-[0.3em] text-clay/80 mt-2 uppercase">{d.ruralOs.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega">
                {d.ruralOs.title}
                <span className="italic font-light text-clay"> {d.ruralOs.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-[17px] text-ivory/70 leading-relaxed">
                {d.ruralOs.body}
              </p>
            </div>
          </div>

          {/* Architecture diagram — desktop radial (≥lg) */}
          <div className="rural-os-radial relative h-[640px] md:h-[720px] max-w-5xl mx-auto">
            <svg className="absolute inset-0 w-full h-full connector" viewBox="0 0 800 720" fill="none">
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#B89968" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#B89968" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* connectors */}
              {[
                'M400,360 L 140, 140','M400,360 L 660, 140','M400,360 L 80,360',
                'M400,360 L 720,360','M400,360 L 140,580','M400,360 L 660,580',
                'M400,360 L 400, 80','M400,360 L 400, 640','M400,360 L 260, 250','M400,360 L 540, 470',
              ].map((path, i) => (
                <path key={i} d={path} stroke="rgba(184,153,104,0.45)" strokeWidth="1"/>
              ))}
              <circle cx="400" cy="360" r="160" fill="url(#glow)"/>
            </svg>

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 md:w-52 md:h-52 rounded-full glass-dark flex flex-col items-center justify-center text-center">
              <div className="kicker kicker-gold mb-2">{d.ruralOs.coreLabel}</div>
              <div className="font-serif text-2xl text-ivory leading-tight">{d.ruralOs.coreBrandLine1}<br/>{d.ruralOs.coreBrandLine2}</div>
              <div className="text-[10px] tracking-[0.3em] text-clay/80 mt-2 uppercase">{d.ruralOs.coreSub}</div>
            </div>

            {/* Nodes */}
            {d.ruralOs.nodes.map((label, i) => (
              <div
                key={label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: OS_NODE_ICONS[i].top, left: OS_NODE_ICONS[i].left }}
              >
                <div className="glass-dark rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-forest/80 transition">
                  <i className={`fa-solid ${OS_NODE_ICONS[i].i} text-gold`}></i>
                  <span className="text-[13px] text-ivory whitespace-nowrap">{label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture diagram — mobile/tablet grid (<lg) */}
          <div className="rural-os-grid hidden">
            {/* Centered core hub above grid */}
            <div className="flex justify-center mb-8">
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full glass-dark flex flex-col items-center justify-center text-center">
                <div className="kicker kicker-gold mb-2">{d.ruralOs.coreLabel}</div>
                <div className="font-serif text-2xl text-ivory leading-tight">{d.ruralOs.coreBrandLine1}<br/>{d.ruralOs.coreBrandLine2}</div>
                <div className="text-[10px] tracking-[0.3em] text-clay/80 mt-2 uppercase">{d.ruralOs.coreSub}</div>
              </div>
            </div>
            {/* Same 10 nodes — responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {d.ruralOs.nodes.map((label, i) => (
                <div key={label} className="glass-dark rounded-2xl px-3 py-3 sm:px-4 flex items-center gap-2.5 sm:gap-3">
                  <i className={`fa-solid ${OS_NODE_ICONS[i].i} text-gold shrink-0`}></i>
                  <span className="text-[12px] sm:text-[13px] text-ivory leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer detail strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-ivory/10 pt-10">
            {d.ruralOs.meta.map((m) => (
              <div key={m.k}>
                <div className="text-[10px] tracking-[0.28em] uppercase text-clay/80">{m.k}</div>
                <div className="font-serif text-lg text-ivory mt-2 leading-tight">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 · FARMER SERVICES ============ */}
      <section id="services" className="relative bg-ivory py-32 md:py-44">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          {/* masthead */}
          <div className="grid grid-cols-12 gap-10 items-end mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker"><span className="dot"></span>{d.services.chapter}</div>
              <div className="mt-6 font-serif text-7xl text-forest leading-none">04.</div>
              <div className="text-xs tracking-[0.3em] text-brown mt-2 uppercase">{d.services.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega text-forest">
                {d.services.title} <span className="italic font-light text-brown">{d.services.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-forest/70 text-[17px] leading-relaxed">
                {d.services.body}
              </p>
            </div>
          </div>

          {/* Alternating editorial panels */}
          {d.services.items.map((s, i) => {
            const n = String(i + 1).padStart(2, '0');
            return (
              <article key={s.t} className="grid grid-cols-12 gap-10 items-center py-16 border-t border-forest/10">
                <div className={`col-span-12 md:col-span-6 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="img-frame aspect-[16/10] svc-panel" data-parallax="0.08">
                    <img src={SERVICE_IMAGES[i]} alt={s.t} className="w-full h-full object-cover img-warm" />
                    <div className="absolute top-4 left-4 stamp text-ivory border-ivory/60">{d.services.serviceStamp} · {n}</div>
                  </div>
                </div>
                <div className={`col-span-12 md:col-span-6 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="kicker"><span className="dot"></span>{d.services.moduleLabel} {n}</div>
                  <h3 className="reveal font-serif text-huge text-forest mt-4">{s.t}</h3>
                  <p className="reveal reveal-delay-1 mt-5 text-[16.5px] text-forest/70 leading-relaxed">{s.d}</p>
                  <ul className="reveal reveal-delay-2 mt-7 grid grid-cols-1 gap-2">
                    {s.meta.map((m) => <li key={m} className="bullet text-forest/85">{m}</li>)}
                  </ul>
                  <a href="#onboard" className="mt-8 inline-flex items-center gap-2 text-forest border-b border-gold/50 pb-1 hover:border-gold transition">
                    {d.services.cta} <span className="text-gold">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============ 5 · MEMBERSHIP PASSPORTS ============ */}
      <section id="membership" className="relative bg-sand-grad py-32 md:py-44 overflow-hidden">
        <div className="blob bg-gold/30 w-[600px] h-[600px] -top-40 -right-40 animate-float-slower"></div>
        <div className="blob bg-dusty/30 w-[500px] h-[500px] bottom-0 -left-40 animate-float-slow"></div>

        <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 items-end mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker"><span className="dot"></span>{d.membership.chapter}</div>
              <div className="mt-6 font-serif text-7xl text-forest leading-none">05.</div>
              <div className="text-xs tracking-[0.3em] text-brown mt-2 uppercase">{d.membership.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega text-forest">
                {d.membership.title}
                <span className="italic font-light text-brown"> {d.membership.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-forest/70 text-[17px] leading-relaxed">
                {d.membership.body}
              </p>
            </div>
          </div>

          {/* Passport cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {d.membership.tiers.map((p, i) => {
              const style = TIER_STYLES[i];
              const featured = i === 1;
              return (
                <div key={p.tier} className={`passport ${style} relative lift ${featured ? 'md:-mt-6 shadow-premium' : 'shadow-depth'}`}>
                  {featured && (
                    <div className="absolute top-5 right-5 stamp border-ivory/70 text-ivory">{d.membership.mostChosen}</div>
                  )}
                  <div className="relative z-10 p-8 pb-10 min-h-[480px] flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="kicker" style={style.includes('forest') || style.includes('gold') ? { color: '#E6D7B8' } : undefined}>
                          <span className="dot"></span>{d.membership.passportLabel}
                        </div>
                        <div className="mt-3 font-hindi text-2xl opacity-90">{p.native}</div>
                        <h3 className="font-serif text-4xl mt-1">{p.tier}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] tracking-[0.28em] uppercase opacity-70">{d.membership.issueLabel}</div>
                        <div className="font-mono text-sm mt-1">{p.stamp}</div>
                      </div>
                    </div>

                    <p className="mt-6 text-[14.5px] opacity-85 leading-relaxed">{p.desc}</p>

                    <ul className="mt-7 space-y-2 text-[14px] flex-1">
                      {p.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-3">
                          <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
                          <span className="opacity-95">{perk}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-current/20 flex items-end justify-between">
                      <div>
                        <div className="text-[10px] tracking-[0.28em] uppercase opacity-70">{d.membership.payAtHarvest}</div>
                        <div className="font-serif text-2xl mt-1">{p.price}</div>
                      </div>
                      <a href="#onboard" className={style.includes('forest') ? 'btn-gold' : 'btn-primary'}>
                        {d.membership.choose} · {p.tier} <span className="arrow">→</span>
                      </a>
                    </div>

                    {/* chip + signature */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="w-10 h-7 rounded bg-current/15"></div>
                      <div className="font-serif italic text-sm opacity-80">{d.membership.signature}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center mt-12 text-forest/60 text-sm">
            {d.membership.notePre} <span className="font-serif italic">{d.membership.noteEm}</span> {d.membership.notePost}
          </p>
        </div>
      </section>

      {/* ============ 6 · SMART VILLAGE INFRASTRUCTURE ============ */}
      <section id="infrastructure" className="relative bg-ivory py-32 md:py-44">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 items-end mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker"><span className="dot"></span>{d.infrastructure.chapter}</div>
              <div className="mt-6 font-serif text-7xl text-forest leading-none">06.</div>
              <div className="text-xs tracking-[0.3em] text-brown mt-2 uppercase">{d.infrastructure.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega text-forest">
                {d.infrastructure.title}
                <span className="italic font-light text-brown"> {d.infrastructure.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-forest/70 text-[17px] leading-relaxed">
                {d.infrastructure.body}
              </p>
            </div>
          </div>

          {/* Blueprint layout */}
          <div className="infra-grid grid grid-cols-12 gap-6 auto-rows-[180px]">
            {/* Big featured */}
            <div className="col-span-12 md:col-span-7 row-span-3 img-frame relative" data-parallax="0.06">
              <img src={IMG.waterPlant} alt={d.alt.waterPlant} className="w-full h-full object-cover img-warm" />
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div className="stamp text-ivory border-ivory/70">{d.infrastructure.water.module}</div>
                <div className="glass rounded-full px-3 py-1.5 text-[11px] text-forest">{d.infrastructure.water.live}</div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <div className="kicker kicker-gold text-clay"><span className="dot"></span>{d.infrastructure.water.kicker}</div>
                <h3 className="font-serif text-4xl md:text-5xl mt-2">{d.infrastructure.water.title}</h3>
                <p className="mt-2 max-w-md text-ivory/85 text-sm">{d.infrastructure.water.desc}</p>
              </div>
            </div>

            <div className="col-span-6 md:col-span-5 row-span-2 img-frame relative" data-parallax="0.10">
              <img src={IMG.solarField} alt={d.alt.solar} className="w-full h-full object-cover img-warm" />
              <div className="absolute bottom-4 left-4 text-ivory">
                <div className="kicker kicker-gold text-clay"><span className="dot"></span>{d.infrastructure.solar.kicker}</div>
                <h3 className="font-serif text-2xl mt-1">{d.infrastructure.solar.title}</h3>
              </div>
            </div>

            <div className="col-span-6 md:col-span-5 row-span-1 img-frame relative" data-parallax="0.12">
              <img src={IMG.silo} alt={d.alt.silos} className="w-full h-full object-cover img-warm" />
              <div className="absolute bottom-3 left-4 text-ivory">
                <div className="kicker kicker-gold text-clay"><span className="dot"></span>{d.infrastructure.storage.kicker}</div>
                <h3 className="font-serif text-xl mt-0.5">{d.infrastructure.storage.title}</h3>
              </div>
            </div>

            <div className="col-span-6 md:col-span-4 row-span-2 img-frame relative" data-parallax="0.08">
              <img src={IMG.warehouse} alt={d.alt.warehouse} className="w-full h-full object-cover img-warm" />
              <div className="absolute bottom-4 left-4 text-ivory">
                <div className="kicker kicker-gold text-clay"><span className="dot"></span>{d.infrastructure.cold.kicker}</div>
                <h3 className="font-serif text-2xl mt-1">{d.infrastructure.cold.title}</h3>
              </div>
            </div>

            <div className="col-span-6 md:col-span-3 row-span-2 glass rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="kicker"><span className="dot"></span>{d.infrastructure.processing.kicker}</div>
                <h3 className="font-serif text-2xl text-forest mt-3 leading-tight">{d.infrastructure.processing.titleLine1}<br/>{d.infrastructure.processing.titleLine2}</h3>
              </div>
              <div>
                <div className="num-stack text-3xl text-forest" data-count="42">{num(42)}</div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-brown mt-1">{d.infrastructure.processing.statLabel}</div>
              </div>
            </div>

            <div className="col-span-6 md:col-span-5 row-span-2 img-frame relative" data-parallax="0.12">
              <img src={IMG.storeRoad} alt={d.alt.mandi} className="w-full h-full object-cover img-warm" />
              <div className="absolute bottom-4 left-4 text-ivory">
                <div className="kicker kicker-gold text-clay"><span className="dot"></span>{d.infrastructure.mandi.kicker}</div>
                <h3 className="font-serif text-2xl mt-1">{d.infrastructure.mandi.title}</h3>
              </div>
            </div>

            <div className="col-span-12 md:col-span-3 row-span-2 bg-forest text-ivory rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden grain">
              <div>
                <div className="kicker kicker-gold"><span className="dot"></span>{d.infrastructure.ev.kicker}</div>
                <h3 className="font-serif text-2xl mt-3 leading-tight">{d.infrastructure.ev.titleLine1}<br/>{d.infrastructure.ev.titleLine2}</h3>
                <p className="text-ivory/70 text-sm mt-3">{d.infrastructure.ev.desc}</p>
              </div>
              <div className="flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-clay/80">
                <span>{d.infrastructure.ev.code}</span><span>{d.infrastructure.ev.live}</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 row-span-2 glass rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="kicker"><span className="dot"></span>{d.infrastructure.iot.kicker}</div>
                <h3 className="font-serif text-2xl text-forest mt-3 leading-tight">{d.infrastructure.iot.titleLine1}<br/>{d.infrastructure.iot.titleLine2}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="num-stack text-2xl text-forest" data-count="11400">{num(11400)}</div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-brown mt-1">{d.infrastructure.iot.sensorsLabel}</div>
                </div>
                <div>
                  <div className="num-stack text-2xl text-forest" data-count="600">{num(600)}</div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-brown mt-1">{d.infrastructure.iot.officesLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7 · LEADERSHIP NETWORK ============ */}
      <section id="leadership" className="relative bg-forest-grad text-ivory py-32 md:py-44 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob bg-gold/20 w-[500px] h-[500px] top-1/4 -right-40 animate-float-slow"></div>
        </div>
        <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 items-end mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker kicker-gold"><span className="dot"></span>{d.leadership.chapter}</div>
              <div className="mt-6 font-serif text-7xl leading-none">07.</div>
              <div className="text-xs tracking-[0.3em] text-clay/80 mt-2 uppercase">{d.leadership.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega">
                {d.leadership.title}
                <span className="italic font-light text-clay"> {d.leadership.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-ivory/70 text-[17px] leading-relaxed">
                {d.leadership.body}
              </p>
            </div>
          </div>

          {/* Hierarchy diagram */}
          <div className="grid grid-cols-12 gap-6 mb-16">
            {d.leadership.officers.map((o) => (
              <div key={o.code} className="col-span-12 md:col-span-3 lift">
                <div className="glass-dark rounded-3xl p-7 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-mono text-gold">{o.code}</div>
                    <div className="stamp border-ivory/40 text-ivory/70">{o.region}</div>
                  </div>
                  <h3 className="font-serif text-2xl mt-6">{o.name}</h3>
                  <p className="text-ivory/65 text-sm mt-3 flex-1">{o.desc}</p>
                  <div className="mt-6 pt-5 border-t border-ivory/10 flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.22em] uppercase text-clay/80">{d.leadership.deploymentLabel}</span>
                    <span className="font-serif text-lg">{o.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Command center mock */}
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-5">
              <div className="kicker kicker-gold"><span className="dot"></span>{d.leadership.command.kicker}</div>
              <h3 className="reveal font-serif text-huge mt-4">{d.leadership.command.title}</h3>
              <p className="reveal reveal-delay-1 mt-5 text-ivory/70 text-[16.5px] leading-relaxed max-w-md">
                {d.leadership.command.body}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 max-w-md">
                <div>
                  <div className="num-stack text-4xl text-ivory" data-count="452">{num(452)}</div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80 mt-2">{d.leadership.command.statOfficers}</div>
                </div>
                <div>
                  <div className="num-stack text-4xl text-ivory" data-count="184">{num(184)}</div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80 mt-2">{d.leadership.command.statEvs}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="glass-dark rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-copper animate-pulse"></span>
                    <span className="text-[11px] tracking-[0.22em] uppercase text-clay/80">{d.leadership.command.panelLive}</span>
                  </div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-clay/60">{d.leadership.command.panelWeather}</div>
                </div>

                {/* Mock map */}
                <div className="relative rounded-2xl bg-forest/60 h-72 overflow-hidden map-grid">
                  <svg viewBox="0 0 600 280" className="absolute inset-0 w-full h-full">
                    <path d="M30,220 C140,170 220,260 320,180 S 530,80 580,140" stroke="rgba(184,153,104,0.7)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
                    {[
                      [80,190],[170,210],[240,170],[310,180],[390,150],[460,120],[540,140]
                    ].map((p, i) => (
                      <g key={i}>
                        <circle cx={p[0]} cy={p[1]} r="6" fill="#B89968"/>
                        <circle cx={p[0]} cy={p[1]} r="14" fill="none" stroke="rgba(184,153,104,0.4)"/>
                        <text x={Number(p[0])+10} y={Number(p[1])-8} fill="#F7F3EA" fontSize="10" fontFamily="DM Mono">VLE-{(i+1).toString().padStart(2,'0')}</text>
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  {d.leadership.command.metrics.map((m) => (
                    <div key={m.l} className="glass rounded-2xl py-4">
                      <div className="font-serif text-2xl text-forest">{m.v}</div>
                      <div className="text-[10px] tracking-[0.22em] uppercase text-brown mt-1">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8 · EXAM & RECRUITMENT ============ */}
      <section className="relative bg-ivory py-32 md:py-44 overflow-hidden">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 items-end mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker"><span className="dot"></span>{d.recruitment.chapter}</div>
              <div className="mt-6 font-serif text-7xl text-forest leading-none">08.</div>
              <div className="text-xs tracking-[0.3em] text-brown mt-2 uppercase">{d.recruitment.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega text-forest">
                {d.recruitment.title}
                <span className="italic font-light text-brown"> {d.recruitment.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-forest/70 text-[17px] leading-relaxed">
                {d.recruitment.body}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Exam terminal mock */}
            <div className="col-span-12 lg:col-span-7">
              <div className="rounded-3xl bg-forest text-ivory p-8 shadow-premium relative overflow-hidden grain">
                <div className="flex items-center justify-between">
                  <div className="kicker kicker-gold"><span className="dot"></span>{d.recruitment.terminal.kicker}</div>
                  <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-clay/80">
                    <span className="w-2 h-2 rounded-full bg-copper animate-pulse"></span>
                    {d.recruitment.terminal.proctoring}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-7 min-w-0">
                    <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80">{d.recruitment.terminal.section}</div>
                    <h3 className="font-serif text-2xl mt-2 leading-snug">
                      {d.recruitment.terminal.question}
                    </h3>
                    <ul className="mt-6 space-y-3">
                      {d.recruitment.terminal.options.map((opt, i) => (
                        <li key={opt} className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${i===2 ? 'border-gold/60 bg-gold/10' : 'border-ivory/15 hover:border-ivory/30'}`}>
                          <span className="font-mono text-clay/80 text-xs w-5">{String.fromCharCode(65+i)}</span>
                          <span className="text-ivory/90">{opt}</span>
                          {i===2 && <span className="ml-auto text-gold text-xs">{d.recruitment.terminal.selected}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-12 md:col-span-5 space-y-4">
                    <div className="glass-dark rounded-2xl p-5">
                      <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80">{d.recruitment.terminal.candidateLabel}</div>
                      <div className="font-serif text-xl mt-2">{d.recruitment.terminal.candidateName}</div>
                      <div className="text-[12px] text-ivory/65 mt-1">{d.recruitment.terminal.candidateMeta}</div>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-ivory/10 flex items-center justify-center">
                          <i className="fa-solid fa-qrcode text-clay"></i>
                        </div>
                        <div>
                          <div className="text-[10px] tracking-[0.22em] uppercase text-clay/80">{d.recruitment.terminal.qrLabel}</div>
                          <div className="font-mono text-xs">{d.recruitment.terminal.qrCode}</div>
                        </div>
                      </div>
                    </div>
                    <div className="glass-dark rounded-2xl p-5">
                      <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80">{d.recruitment.terminal.timeLabel}</div>
                      <div className="font-serif text-3xl mt-1 tabular">{d.recruitment.terminal.timeValue}</div>
                      <div className="mt-3 h-1 bg-ivory/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gold" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    <div className="glass-dark rounded-2xl p-5 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80">{d.recruitment.terminal.integrityLabel}</div>
                        <div className="text-sm mt-1">{d.recruitment.terminal.integrityValue}</div>
                      </div>
                      <i className="fa-solid fa-shield-halved text-gold text-xl"></i>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-ivory/10 pt-5 text-[12px] text-clay/70">
                  <span>{d.recruitment.terminal.footerLeft}</span>
                  <span>{d.recruitment.terminal.footerRight}</span>
                </div>
              </div>
            </div>

            {/* Recruitment flow */}
            <div className="col-span-12 lg:col-span-5">
              <div className="space-y-4">
                {d.recruitment.flow.map((s, i) => (
                  <div key={s.t} className="glass rounded-2xl p-5 flex items-start gap-5 lift">
                    <div className="font-serif text-3xl text-gold leading-none mt-1">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="font-serif text-lg text-forest">{s.t}</div>
                      <div className="text-sm text-forest/65 mt-1">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 9 · ONBOARDING ============ */}
      <section id="onboard" className="relative bg-sand-grad py-32 md:py-44 overflow-hidden">
        <div className="blob bg-gold/30 w-[600px] h-[600px] top-0 -left-40 animate-float-slower"></div>
        <div className="blob bg-dusty/30 w-[500px] h-[500px] bottom-0 -right-40 animate-float-slow"></div>

        <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 items-end mb-14">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker"><span className="dot"></span>{d.onboard.chapter}</div>
              <div className="mt-6 font-serif text-7xl text-forest leading-none">09.</div>
              <div className="text-xs tracking-[0.3em] text-brown mt-2 uppercase">{d.onboard.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega text-forest">
                {d.onboard.title}
                <span className="italic font-light text-brown"> {d.onboard.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-forest/70 text-[17px] leading-relaxed">
                {d.onboard.body}
              </p>
            </div>
          </div>

          {/* Wizard — step labels are read by public/static/app.js */}
          <div
            id="wizard"
            data-step-word={d.onboard.stepWord}
            data-step-labels={JSON.stringify(d.onboard.stepLabels)}
            className="glass rounded-3xl p-4 sm:p-6 md:p-10 shadow-premium max-w-full overflow-x-clip"
          >
            {/* Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
              <div data-step-label className="kicker"></div>
              <div className="flex items-center gap-2">
                {Array(7).fill(0).map((_, i) => <div key={i} className="step-dot"></div>)}
              </div>
            </div>

            {/* Step 1 — Personal */}
            <div data-step className="grid grid-cols-12 gap-4 md:gap-8 items-start">
              <div className="col-span-12 md:col-span-5 min-w-0">
                <div className="img-frame aspect-[4/5]">
                  <img src={IMG.farmerWoman} alt={d.alt.farmer} className="w-full h-full object-cover img-warm" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 min-w-0">
                <h3 className="font-serif text-huge text-forest">{d.onboard.step1.title}</h3>
                <p className="mt-3 text-forest/65 max-w-full break-words leading-relaxed">{d.onboard.step1.body}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
                  {d.onboard.step1.fields.map((f) => (
                    <label key={f.label} className="block">
                      <span className="text-[11px] tracking-[0.22em] uppercase text-brown">{f.label}</span>
                      <input className="mt-2 w-full bg-cream/70 border border-forest/10 rounded-xl px-4 py-3 text-forest placeholder-forest/40 focus:outline-none focus:border-gold" placeholder={f.placeholder} />
                    </label>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button className="btn-ghost flex items-center justify-center gap-2 text-sm w-full sm:w-auto">
                    <i className="fa-solid fa-microphone text-gold"></i>
                    {d.onboard.step1.audioAssist}
                  </button>
                  <button data-next className="btn-primary w-full sm:w-auto justify-center">{d.onboard.step1.next} <span className="arrow">→</span></button>
                </div>
              </div>
            </div>

            {/* Step 2 — Village */}
            <div data-step className="hidden grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-12 md:col-span-7 min-w-0">
                <h3 className="font-serif text-huge text-forest">{d.onboard.step2.title}</h3>
                <p className="mt-3 text-forest/65 max-w-md">{d.onboard.step2.body}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
                  {d.onboard.step2.fields.map((l) => (
                    <label key={l} className="block">
                      <span className="text-[11px] tracking-[0.22em] uppercase text-brown">{l}</span>
                      <input className="mt-2 w-full bg-cream/70 border border-forest/10 rounded-xl px-4 py-3 text-forest focus:outline-none focus:border-gold" placeholder={l} />
                    </label>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button data-prev className="btn-ghost w-full sm:w-auto justify-center">← {d.onboard.back}</button>
                  <button data-next className="btn-primary w-full sm:w-auto justify-center">{d.onboard.step2.next} <span className="arrow">→</span></button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 min-w-0">
                <div className="img-frame aspect-[4/5]">
                  <img src={IMG.villageAerial} alt={d.alt.village} className="w-full h-full object-cover img-warm" />
                </div>
              </div>
            </div>

            {/* Step 3 — Land */}
            <div data-step className="hidden grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-12 md:col-span-5 min-w-0">
                <div className="img-frame aspect-[4/5]">
                  <img src={IMG.fields} alt={d.alt.fields} className="w-full h-full object-cover img-warm" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 min-w-0">
                <h3 className="font-serif text-huge text-forest">{d.onboard.step3.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
                  <label className="block col-span-1 min-w-0">
                    <span className="text-[11px] tracking-[0.22em] uppercase text-brown">{d.onboard.step3.landLabel}</span>
                    <input className="mt-2 w-full bg-cream/70 border border-forest/10 rounded-xl px-4 py-3" placeholder={d.onboard.step3.landPlaceholder} />
                  </label>
                  <label className="block col-span-1 min-w-0">
                    <span className="text-[11px] tracking-[0.22em] uppercase text-brown">{d.onboard.step3.khasraLabel}</span>
                    <input className="mt-2 w-full bg-cream/70 border border-forest/10 rounded-xl px-4 py-3" placeholder={d.onboard.step3.khasraPlaceholder} />
                  </label>
                  <div className="col-span-1 md:col-span-2 min-w-0">
                    <span className="text-[11px] tracking-[0.22em] uppercase text-brown">{d.onboard.step3.cropsLabel}</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {d.onboard.step3.crops.map((c) => (
                        <button key={c} className="px-4 py-2 rounded-full border border-forest/15 text-sm text-forest/80 hover:bg-forest hover:text-ivory transition">{c}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button data-prev className="btn-ghost w-full sm:w-auto justify-center">← {d.onboard.back}</button>
                  <button data-next className="btn-primary w-full sm:w-auto justify-center">{d.onboard.step3.next} <span className="arrow">→</span></button>
                </div>
              </div>
            </div>

            {/* Step 4 — Services */}
            <div data-step className="hidden">
              <h3 className="font-serif text-huge text-forest">{d.onboard.step4.title}</h3>
              <p className="mt-3 text-forest/65 max-w-md">{d.onboard.step4.body}</p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
                {d.onboard.step4.services.map((l, i) => (
                  <label key={l} className="block cursor-pointer">
                    <input type="checkbox" className="peer hidden" />
                    <div className="rounded-2xl border border-forest/10 bg-cream/70 p-5 text-center peer-checked:border-gold peer-checked:bg-gold/10 transition">
                      <i className={`fa-solid ${ONBOARD_SERVICE_ICONS[i]} text-2xl text-forest`}></i>
                      <div className="mt-3 text-sm text-forest">{l}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button data-prev className="btn-ghost w-full sm:w-auto justify-center">← {d.onboard.back}</button>
                <button data-next className="btn-primary w-full sm:w-auto justify-center">{d.onboard.step4.next} <span className="arrow">→</span></button>
              </div>
            </div>

            {/* Step 5 — Membership */}
            <div data-step className="hidden">
              <h3 className="font-serif text-huge text-forest">{d.onboard.step5.title}</h3>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {d.onboard.step5.tiers.map((m, i) => (
                  <button key={m.t} data-tier className={`passport ${TIER_STYLES[i]} text-left lift`}>
                    <div className="relative z-10 p-6">
                      <div className="font-hindi text-xl opacity-80">{m.native}</div>
                      <div className="font-serif text-3xl mt-1">{m.t}</div>
                      <div className="mt-4 text-[11px] tracking-[0.22em] uppercase opacity-70">{d.onboard.step5.payAtHarvest}</div>
                      <div className="font-serif text-2xl mt-1">{m.price}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button data-prev className="btn-ghost w-full sm:w-auto justify-center">← {d.onboard.back}</button>
                <button data-next className="btn-primary w-full sm:w-auto justify-center">{d.onboard.step5.next} <span className="arrow">→</span></button>
              </div>
            </div>

            {/* Step 6 — Verification */}
            <div data-step className="hidden grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-12 md:col-span-7 min-w-0">
                <h3 className="font-serif text-huge text-forest">{d.onboard.step6.title}</h3>
                <p className="mt-3 text-forest/65 max-w-md">{d.onboard.step6.body}</p>
                <div className="mt-7 space-y-4">
                  {d.onboard.step6.items.map((item, i) => (
                    <div key={item.t} className="rounded-2xl border border-forest/10 bg-cream/70 p-5 flex items-center gap-5">
                      <i className={`fa-solid ${VERIFY_ICONS[i]} text-2xl text-gold`}></i>
                      <div className="flex-1">
                        <div className="text-forest">{item.t}</div>
                        <div className="text-xs text-forest/55">{item.s}</div>
                      </div>
                      <span className="stamp border-forest/30 text-forest/70">{d.onboard.step6.verify}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button data-prev className="btn-ghost w-full sm:w-auto justify-center">← {d.onboard.back}</button>
                  <button data-next className="btn-primary w-full sm:w-auto justify-center">{d.onboard.step6.next} <span className="arrow">→</span></button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 min-w-0">
                <div className="img-frame aspect-[4/5]">
                  <img src={IMG.farmerPortrait} alt={d.alt.verification} className="w-full h-full object-cover img-warm" />
                </div>
              </div>
            </div>

            {/* Step 7 — Welcome */}
            <div data-step className="hidden text-center">
              <div className="kicker kicker-gold inline-flex"><span className="dot"></span>{d.onboard.step7.issued}</div>
              <h3 className="font-serif text-mega text-forest mt-4">{d.onboard.step7.title}</h3>
              <p className="mt-3 text-forest/65 max-w-xl mx-auto">{d.onboard.step7.body}</p>

              <div className="mt-10 max-w-md mx-auto">
                <div className="passport passport-gold p-7 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] tracking-[0.28em] uppercase opacity-70">{d.onboard.step7.passportLabel}</div>
                      <div className="font-serif text-3xl mt-1">{d.onboard.step7.tier}</div>
                      <div className="font-hindi text-xl opacity-80">{d.onboard.step7.native}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] tracking-[0.28em] uppercase opacity-70">{d.onboard.step7.idLabel}</div>
                      <div className="font-mono">{d.onboard.step7.idValue}</div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <div className="font-serif italic">{d.onboard.step7.holder}</div>
                    <div className="w-10 h-7 rounded bg-current/15"></div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-4">
                <button data-prev className="btn-ghost">← {d.onboard.step7.edit}</button>
                <a href="#services" className="btn-primary">{d.onboard.step7.cta} <span className="arrow">→</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 10 · SUPER MINI MALL ============ */}
      <section id="mall" className="relative bg-ivory py-32 md:py-44">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 items-end mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker"><span className="dot"></span>{d.mall.chapter}</div>
              <div className="mt-6 font-serif text-7xl text-forest leading-none">10.</div>
              <div className="text-xs tracking-[0.3em] text-brown mt-2 uppercase">{d.mall.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega text-forest">
                {d.mall.title}
                <span className="italic font-light text-brown"> {d.mall.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-forest/70 text-[17px] leading-relaxed">
                {d.mall.body}
              </p>
            </div>
          </div>

          {/* Editorial split */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7 img-frame aspect-[16/10]" data-parallax="0.08">
              <img src={IMG.storeInterior} alt={d.alt.mallInterior} className="w-full h-full object-cover img-warm" />
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div className="stamp text-ivory border-ivory/70">{d.mall.stamp}</div>
                <div className="glass rounded-full px-3 py-1.5 text-[11px] text-forest">{d.mall.open}</div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <div className="kicker kicker-gold text-clay"><span className="dot"></span>{d.mall.heroKicker}</div>
                <h3 className="font-serif text-3xl md:text-4xl mt-2">{d.mall.heroTitle}</h3>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-6">
              {d.mall.categories.map((c, i) => (
                <div key={c.t} className="img-frame aspect-square">
                  <img src={MALL_CATEGORY_MEDIA[i].img} alt={c.t} className="w-full h-full object-cover img-warm" />
                  <div className="absolute inset-0 bg-forest/30"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-ivory">
                    <i className={`fa-solid ${MALL_CATEGORY_MEDIA[i].i} text-clay`}></i>
                    <div className="font-serif text-lg mt-1 leading-tight">{c.t}</div>
                    <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80 mt-1">{c.n}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-10 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4 glass rounded-2xl p-6">
              <div className="kicker"><span className="dot"></span>{d.mall.cards[0].kicker}</div>
              <h3 className="font-serif text-2xl text-forest mt-3 leading-snug">{d.mall.cards[0].titleLine1}<br/>{d.mall.cards[0].titleLine2}</h3>
              <p className="text-forest/60 mt-3 text-sm">{d.mall.cards[0].body}</p>
            </div>
            <div className="col-span-12 md:col-span-4 glass rounded-2xl p-6">
              <div className="kicker"><span className="dot"></span>{d.mall.cards[1].kicker}</div>
              <h3 className="font-serif text-4xl text-forest mt-3">{d.mall.cards[1].titleLine1}</h3>
              <p className="text-forest/60 mt-3 text-sm">{d.mall.cards[1].body}</p>
            </div>
            <div className="col-span-12 md:col-span-4 bg-forest text-ivory rounded-2xl p-6 relative overflow-hidden grain">
              <div className="kicker kicker-gold"><span className="dot"></span>{d.mall.cards[2].kicker}</div>
              <h3 className="font-serif text-2xl text-ivory mt-3 leading-snug">{d.mall.cards[2].titleLine1}<br/>{d.mall.cards[2].titleLine2}</h3>
              <p className="text-ivory/65 mt-3 text-sm">{d.mall.cards[2].body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 11 · IMPACT & DATA ============ */}
      <section id="impact" className="relative bg-sand-grad py-32 md:py-44 overflow-hidden">
        <div className="blob bg-gold/30 w-[700px] h-[700px] -top-60 -left-40 animate-float-slower"></div>
        <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 items-end mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker"><span className="dot"></span>{d.impact.chapter}</div>
              <div className="mt-6 font-serif text-7xl text-forest leading-none">11.</div>
              <div className="text-xs tracking-[0.3em] text-brown mt-2 uppercase">{d.impact.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega text-forest">
                {d.impact.title}
                <span className="italic font-light text-brown"> {d.impact.titleAccent}</span>
              </h2>
              <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-forest/70 text-[17px] leading-relaxed">
                {d.impact.body}
              </p>
            </div>
          </div>

          {/* Big metric grid */}
          <div className="grid grid-cols-12 gap-6">
            {IMPACT_METRICS.map((m, i) => (
              <div key={d.impact.metrics[i]} className={`${m.w} bg-cream/60 backdrop-blur-sm rounded-3xl p-8 border border-forest/5 lift`}>
                <div className="flex items-baseline gap-2">
                  <div className="num-stack text-6xl md:text-7xl text-forest tabular" data-count={m.v} data-decimals={m.dec || 0}>{num(m.v, m.dec || 0)}</div>
                  <div className="font-serif text-3xl text-brown">{m.crore ? d.impact.crore : m.suf}</div>
                </div>
                <div className="metric-line my-4"></div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-brown">{d.impact.metrics[i]}</div>
              </div>
            ))}
          </div>

          {/* Chart panel */}
          <div className="mt-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 bg-cream/60 backdrop-blur-sm rounded-3xl p-8 border border-forest/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="kicker"><span className="dot"></span>{d.impact.chart.kicker}</div>
                  <h3 className="font-serif text-2xl text-forest mt-2">{d.impact.chart.title}</h3>
                </div>
                <div className="text-right text-forest/60 text-sm">+ <span className="font-serif text-forest text-2xl">{d.impact.chart.yoyValue}</span> {d.impact.chart.yoyLabel}</div>
              </div>
              <svg viewBox="0 0 800 280" className="w-full h-64">
                <defs>
                  <linearGradient id="ar" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#B89968" stopOpacity="0.55"/>
                    <stop offset="100%" stopColor="#B89968" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path
                  d="M0,220 L60,200 L120,210 L180,180 L240,165 L300,170 L360,140 L420,125 L480,110 L540,95 L600,82 L660,68 L720,55 L800,40 L800,280 L0,280 Z"
                  fill="url(#ar)"
                />
                <path
                  d="M0,220 L60,200 L120,210 L180,180 L240,165 L300,170 L360,140 L420,125 L480,110 L540,95 L600,82 L660,68 L720,55 L800,40"
                  stroke="#1F3A2E" strokeWidth="2" fill="none"
                />
                {d.impact.chart.months.map((m, i) => (
                  <text key={`${m}-${i}`} x={i*65 + 20} y="270" fill="#6B4F35" fontSize="11" fontFamily="DM Mono">{m}</text>
                ))}
              </svg>
            </div>

            <div className="col-span-12 lg:col-span-4 grid gap-6">
              <div className="bg-forest text-ivory rounded-3xl p-7 relative overflow-hidden grain">
                <div className="kicker kicker-gold"><span className="dot"></span>{d.impact.income.kicker}</div>
                <h3 className="font-serif text-2xl mt-2">{d.impact.income.title}</h3>
                <div className="font-serif text-6xl mt-4">{d.impact.income.value}</div>
                <p className="text-ivory/65 mt-4 text-sm">{d.impact.income.body}</p>
              </div>
              <div className="bg-cream/60 backdrop-blur-sm rounded-3xl p-7 border border-forest/5">
                <div className="kicker"><span className="dot"></span>{d.impact.carbon.kicker}</div>
                <h3 className="font-serif text-2xl text-forest mt-2">{d.impact.carbon.title}</h3>
                <div className="font-serif text-5xl text-forest mt-3">{d.impact.carbon.value}</div>
                <p className="text-forest/60 mt-3 text-sm">{d.impact.carbon.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 12 · MOBILE APP — ARGUS FIELD CONNECT ============ */}
      <section className="relative bg-ivory py-32 md:py-44 overflow-hidden">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 lg:col-span-6">
            <div className="kicker"><span className="dot"></span>{d.app.kicker}</div>
            <h2 className="reveal font-serif text-mega text-forest mt-6">
              {d.app.title}
              <span className="italic font-light text-brown"> {d.app.titleAccent}</span>
            </h2>
            <p className="reveal reveal-delay-1 mt-6 max-w-xl text-forest/70 text-[17px] leading-relaxed">
              {d.app.body}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 max-w-lg">
              {d.app.features.map((f, i) => (
                <div key={f.t} className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-cream border border-forest/10 flex items-center justify-center">
                    <i className={`fa-solid ${APP_FEATURE_ICONS[i]} text-forest`}></i>
                  </span>
                  <div>
                    <div className="font-serif text-base text-forest">{f.t}</div>
                    <div className="text-xs text-forest/60 mt-1">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a className="btn-primary" href="#">{d.app.download} <span className="arrow">↓</span></a>
              <span className="text-forest/55 text-sm">{d.app.downloadMeta}</span>
            </div>
          </div>

          {/* Phone mockups */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative flex items-center justify-center min-h-[640px]">
              {/* Back phone */}
              <div className="absolute right-[6%] top-[2%] w-[260px] phone-frame rotate-[7deg]" data-parallax="0.08">
                <div className="phone-screen relative">
                  <img src={IMG.appField} alt={d.alt.appScreen} className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Front phone */}
              <div className="relative w-[290px] phone-frame -rotate-[3deg]" data-parallax="0.16">
                <div className="phone-screen p-5 text-forest">
                  <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-brown">
                    <span>{d.app.phone.time}</span><span>● ● ●</span>
                  </div>
                  <div className="mt-4">
                    <div className="kicker"><span className="dot"></span>{d.app.phone.kicker}</div>
                    <h4 className="font-serif text-2xl mt-2 leading-tight">{d.app.phone.greeting}</h4>
                  </div>
                  <div className="mt-5 rounded-2xl bg-cream border border-forest/10 p-4">
                    <div className="text-[10px] tracking-[0.22em] uppercase text-brown">{d.app.phone.pickupsLabel}</div>
                    <div className="font-serif text-3xl mt-1">{d.app.phone.pickupsValue}</div>
                    <div className="mt-3 h-1 bg-forest/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gold w-2/3"></div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {d.app.phone.tiles.map((l, i) => (
                      <div key={l} className="rounded-xl bg-cream border border-forest/10 py-3">
                        <i className={`fa-solid ${['fa-flask','fa-droplet','fa-truck'][i]} text-forest`}></i>
                        <div className="text-[10px] mt-1 text-forest/70">{l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl bg-forest text-ivory p-4">
                    <div className="text-[10px] tracking-[0.22em] uppercase text-clay/80">{d.app.phone.routeLabel}</div>
                    <div className="text-sm mt-1 font-serif">{d.app.phone.routeValue}</div>
                  </div>
                </div>
              </div>

              {/* Floating chips */}
              <div className="absolute -left-2 top-[18%] glass rounded-2xl px-4 py-3 animate-float-slow">
                <div className="text-[10px] tracking-[0.22em] uppercase text-brown">{d.app.chipOfflineLabel}</div>
                <div className="text-sm text-forest mt-1">{d.app.chipOfflineValue}</div>
              </div>
              <div className="absolute right-0 bottom-[8%] glass rounded-2xl px-4 py-3 animate-float-slower">
                <div className="text-[10px] tracking-[0.22em] uppercase text-brown">{d.app.chipVoiceLabel}</div>
                <div className="text-sm text-forest mt-1">{d.app.chipVoiceValue}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 13 · TESTIMONIALS — CINEMATIC STORIES ============ */}
      <section className="relative bg-forest-grad text-ivory py-32 md:py-44 overflow-hidden grain">
        <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 items-end mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="kicker kicker-gold"><span className="dot"></span>{d.voices.chapter}</div>
              <div className="mt-6 font-serif text-7xl leading-none">13.</div>
              <div className="text-xs tracking-[0.3em] text-clay/80 mt-2 uppercase">{d.voices.label}</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="reveal font-serif text-mega">
                {d.voices.title}
                <span className="italic font-light text-clay"> {d.voices.titleAccent}</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {d.voices.items.map((t, i) => (
              <article key={t.name} className="col-span-12 md:col-span-4 lift">
                <div className="img-frame aspect-[4/5] mb-6">
                  <img src={VOICE_IMAGES[i]} alt={t.name} className="w-full h-full object-cover img-warm" />
                  <div className="absolute top-4 left-4 stamp text-ivory border-ivory/60">{t.tier}</div>
                </div>
                <p className="font-serif text-xl leading-relaxed italic">“{t.quote}”</p>
                <div className="mt-6 flex items-center justify-between border-t border-ivory/15 pt-4">
                  <div>
                    <div className="font-serif text-lg">{t.name}</div>
                    <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80 mt-1">{t.village}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] tracking-[0.22em] uppercase text-clay/80">{d.voices.impactLabel}</div>
                    <div className="font-serif text-sm mt-1">{t.metric}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 14 · FAQ ============ */}
      <section className="relative bg-ivory py-32 md:py-44">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="kicker"><span className="dot"></span>{d.faq.chapter}</div>
            <h2 className="reveal font-serif text-mega text-forest mt-6">
              {d.faq.title}
              <br/>
              <span className="italic font-light text-brown">{d.faq.titleAccent}</span>
            </h2>
            <p className="reveal reveal-delay-1 mt-6 text-forest/65 max-w-md">
              {d.faq.body}
            </p>
            <a href="#" className="mt-8 inline-flex items-center gap-2 text-forest border-b border-gold/50 pb-1 hover:border-gold transition">
              {d.faq.cta} <span className="text-gold">→</span>
            </a>
          </div>

          <div className="col-span-12 md:col-span-8 space-y-2">
            {d.faq.items.map((f, i) => (
              <details key={f.q} className="faq-item border-b border-forest/10 py-6 group">
                <summary className="flex items-start justify-between gap-6">
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-gold w-8">{(i+1).toString().padStart(2,'0')}</span>
                    <h3 className="font-serif text-xl md:text-2xl text-forest group-hover:text-forest-soft transition">{f.q}</h3>
                  </div>
                  <span className="faq-plus w-9 h-9 rounded-full border border-forest/15 flex items-center justify-center text-forest text-lg shrink-0">+</span>
                </summary>
                <div className="faq-content mt-5 pl-[52px] text-forest/70 max-w-3xl leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 15 · FOOTER ============ */}
      <footer className="relative bg-forest text-ivory pt-28 pb-12 overflow-hidden grain">
        <div className="absolute inset-x-0 top-0 hairline"></div>
        <div className="absolute inset-0 map-grid opacity-30 pointer-events-none"></div>

        <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
          {/* Vision masthead */}
          <div className="grid grid-cols-12 gap-10 items-end pb-16 border-b border-ivory/10">
            <div className="col-span-12 md:col-span-7">
              <div className="kicker kicker-gold"><span className="dot"></span>{d.footer.kicker}</div>
              <h2 className="font-serif text-mega mt-6">
                {d.footer.title}
                <span className="italic font-light text-clay"> {d.footer.titleAccent}</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:text-right">
              <a href="#onboard" className="btn-gold">{d.footer.cta} <span className="arrow">→</span></a>
              <div className="mt-6 text-ivory/60 text-sm">
                {d.footer.ops}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-12 gap-10 py-16">
            <div className="col-span-12 md:col-span-4">
              <a href="#" className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-forest">
                  <span className="font-serif text-lg leading-none">क</span>
                </span>
                <div>
                  <div className="font-serif text-lg">{d.nav.brand}</div>
                  <div className="text-[10px] tracking-[0.28em] uppercase text-clay/80">{d.footer.brandSub}</div>
                </div>
              </a>
              <p className="mt-6 text-ivory/65 max-w-sm leading-relaxed">
                {d.footer.about}
              </p>

              <div className="mt-8 flex items-center gap-3">
                {SOCIAL_ICONS.map((i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center hover:bg-ivory/10 transition">
                    <i className={`fa-brands ${i} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>

            {d.footer.columns.map((col) => (
              <div key={col.h} className="col-span-6 md:col-span-2">
                <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80 mb-5">{col.h}</div>
                <ul className="space-y-3 text-ivory/80 text-sm">
                  {col.l.map((x) => (
                    <li key={x}><a href="#" className="hover:text-ivory transition">{x}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Stylized India map */}
          <div className="border-t border-ivory/10 pt-12 grid grid-cols-12 gap-10 items-center">
            <div className="col-span-12 md:col-span-7">
              <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80 mb-5">{d.footer.districtsLabel}</div>
              <svg viewBox="0 0 600 300" className="w-full h-auto">
                {/* Stylized India outline (abstract) */}
                <path d="M180,30 C 240,20 300,40 330,70 C 360,100 410,110 440,150 C 470,200 430,250 380,260 C 320,280 270,260 250,220 C 220,210 180,230 160,200 C 140,170 130,130 150,90 C 160,60 160,40 180,30 Z"
                      fill="rgba(184,153,104,0.10)" stroke="rgba(184,153,104,0.55)" strokeWidth="1.2"/>
                {[
                  [200, 80, 'PB'],[245, 75, 'UK'],[230, 110, 'HR'],[260, 130, 'UP-W'],[300, 150, 'UP-E'],
                  [200, 150, 'RJ'],[230, 195, 'MP'],[280, 215, 'MH'],[330, 200, 'CH'],[360, 220, 'OD'],
                  [310, 245, 'TS'],[290, 270, 'KA'],[330, 285, 'TN'],
                ].map((p) => (
                  <g key={String(p[2])}>
                    <circle cx={p[0]} cy={p[1]} r="3.5" fill="#B89968"/>
                    <text x={Number(p[0])+8} y={Number(p[1])+4} fill="#F7F3EA" fontSize="10" fontFamily="DM Mono" opacity="0.7">{p[2]}</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="text-[11px] tracking-[0.22em] uppercase text-clay/80 mb-5">{d.footer.contactLabel}</div>
              <div className="space-y-4 text-ivory/80">
                <div className="flex items-start gap-4">
                  <i className="fa-solid fa-headset text-gold mt-1"></i>
                  <div>
                    <div className="font-serif text-lg text-ivory">{d.footer.helplineValue}</div>
                    <div className="text-xs text-ivory/55">{d.footer.helplineNote}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <i className="fa-solid fa-envelope text-gold mt-1"></i>
                  <div>
                    <div className="font-serif text-lg text-ivory">{d.footer.emailValue}</div>
                    <div className="text-xs text-ivory/55">{d.footer.emailNote}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <i className="fa-solid fa-location-dot text-gold mt-1"></i>
                  <div>
                    <div className="font-serif text-lg text-ivory">{d.footer.addressValue}</div>
                    <div className="text-xs text-ivory/55">{d.footer.addressNote}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="mt-12 pt-8 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-ivory/55">
            <div>{d.footer.copyright}</div>
            <div className="flex items-center gap-6">
              {d.footer.legal.map((l) => (
                <a key={l} href="#" className="hover:text-ivory">{l}</a>
              ))}
            </div>
            <div className="font-hindi text-ivory/70 italic">{d.footer.motto}</div>
          </div>
        </div>
      </footer>
    </>
  );
}
