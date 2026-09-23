import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const SOCIAL_ICONS = [
  'fa-x-twitter',
  'fa-instagram',
  'fa-youtube',
  'fa-linkedin-in',
  'fa-facebook-f',
];

const INDIA_DOTS: [number, number, string][] = [
  [200, 80, 'PB'], [245, 75, 'UK'], [230, 110, 'HR'], [260, 130, 'UP-W'], [300, 150, 'UP-E'],
  [200, 150, 'RJ'], [230, 195, 'MP'], [280, 215, 'MH'], [330, 200, 'CH'], [360, 220, 'OD'],
  [310, 245, 'TS'], [290, 270, 'KA'], [330, 285, 'TN'],
];

/** Site-wide footer — shared by the homepage and every other page. */
export function Footer({ lang, d }: { lang: Locale; d: Dictionary }) {
  const home = localePath(lang);
  const appsHref = `${home === "/" ? "" : home}/apps`;

  return (
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
            <a href={`${home}#onboard`} className="btn-gold">{d.footer.cta} <span className="arrow">→</span></a>
            <div className="mt-6 text-ivory/60 text-sm">
              {d.footer.ops}
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-12 gap-10 py-16">
          <div className="col-span-12 md:col-span-4">
            <a href={home} className="flex items-center gap-3">
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
                  <li key={x}>
                    <a href={x === d.footer.columns[0].l[5] ? appsHref : `${home}#`} className="hover:text-ivory transition">{x}</a>
                  </li>
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
              {INDIA_DOTS.map((p) => (
                <g key={p[2]}>
                  <circle cx={p[0]} cy={p[1]} r="3.5" fill="#B89968"/>
                  <text x={p[0]+8} y={p[1]+4} fill="#F7F3EA" fontSize="10" fontFamily="DM Mono" opacity="0.7">{p[2]}</text>
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
  );
}
