import {
  placementPartnersRow1,
  placementPartnersRow2,
  type PlacementPartner,
} from '../data/placement-partners';
import PartnerBrandCard, { type InsightPlacement } from './PartnerBrandCard';
import StudentTrustStrip from './StudentTrustStrip';

function MarqueeTrack({
  partners,
  direction,
  insightPlacement,
}: {
  partners: PlacementPartner[];
  direction: 'left' | 'right';
  insightPlacement: InsightPlacement;
}) {
  const animationClass =
    direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';

  return (
    <div
      className={`placement-marquee-row relative ${animationClass} pause-scroll-on-hover flex w-max items-stretch gap-3 py-2 sm:gap-4 md:gap-5`}
    >
      {[0, 1].map((loop) => (
        <div
          key={loop}
          className="flex items-stretch gap-3 sm:gap-4 md:gap-5"
          aria-hidden={loop === 1 ? true : undefined}
        >
          {partners.map((partner) => (
            <PartnerBrandCard
              key={`${loop}-${partner.name}`}
              partner={partner}
              insightPlacement={insightPlacement}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const TRUST_STATS = [
  { value: '400+', label: 'Hiring partners', accent: 'text-coral' },
  { value: '15 LPA', label: 'Highest package', accent: 'text-purple' },
  { value: '7.5 LPA', label: 'Avg package', accent: 'text-blue-600' },
  { value: 'Global', label: 'Placement network', accent: 'text-emerald-600' },
] as const;

export default function PlacementMarquee() {
  return (
    <section
      id="placement-partners"
      className="relative w-full overflow-x-clip border-y border-slate-200/70 bg-[#f4f6f9] py-14 sm:py-20"
      aria-labelledby="placement-partners-heading"
    >
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-coral/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-purple/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center md:gap-5 lg:gap-12">
          <div className="flex flex-col items-start text-left md:col-span-7 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-gradient-to-r from-coral/10 via-white to-purple/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-coral shadow-sm sm:px-4 sm:py-1.5 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Corporate placement network
            </span>

            <h2
              id="placement-partners-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-text-dark sm:mt-4 sm:text-3xl md:text-[1.65rem] md:leading-snug lg:mt-4 lg:text-[2.125rem] lg:leading-tight"
            >
              Our graduates work at{' '}
              <span className="text-gradient">high-growth organizations</span> globally
            </h2>

            <StudentTrustStrip />
          </div>

          <div className="flex w-full justify-center md:col-span-5 md:justify-end md:pr-12 lg:col-span-5 lg:items-center lg:pr-0 lg:pl-2">
            <ul
              className="grid w-full max-w-[17.5rem] grid-cols-2 gap-2.5 sm:max-w-[19.5rem] sm:gap-3 md:mx-0 md:max-w-[11.5rem] md:gap-2 lg:max-w-[13rem] lg:gap-2.5"
              aria-label="Placement highlights"
            >
              {TRUST_STATS.map((stat) => (
                <li
                  key={stat.label}
                  className="flex min-w-0 flex-col justify-center rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:px-3.5 sm:py-3 md:rounded-lg md:px-2.5 md:py-2.5 lg:rounded-2xl lg:px-3.5 lg:py-3.5"
                >
                  <span
                    className={`block text-xl font-bold leading-none sm:text-2xl md:text-lg lg:text-2xl ${stat.accent}`}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-wide text-text-muted sm:text-[10px] md:text-[9px] lg:text-[10px]">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="marquee-fade-edges relative mt-6 w-full overflow-x-clip pb-2 sm:mt-8">
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <MarqueeTrack
              partners={placementPartnersRow1}
              direction="left"
              insightPlacement="top"
            />
            <MarqueeTrack
              partners={placementPartnersRow2}
              direction="right"
              insightPlacement="bottom"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-xs font-medium text-text-muted sm:mt-8 sm:text-sm lg:text-left">
          Hover or tap a logo for alumni count, avg package & location •{' '}
          <span className="font-bold text-text-dark">400+ hiring partners</span> worldwide
        </p>
      </div>
    </section>
  );
}
