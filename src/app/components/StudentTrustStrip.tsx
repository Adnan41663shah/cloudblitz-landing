import Image from 'next/image';
import { TRUST_AVATAR_OVERFLOW_LABEL, TRUST_AVATARS } from '@/app/data/trust-avatars';

function StarRow() {
  return (
    <div className="flex items-center gap-px text-amber-400" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const avatarSize =
  'h-9 w-9 sm:h-10 sm:w-10 md:h-8 md:w-8';

const avatarOverlap = 'first:ml-0 -ml-2 sm:-ml-2.5 md:-ml-3';

function TrustAvatarStack() {
  return (
    <div
      className="flex shrink-0 items-center"
      role="img"
      aria-label="Over two thousand CloudBlitz learners and alumni"
    >
      <ul className="flex items-center">
        {TRUST_AVATARS.map((avatar, index) => (
          <li
            key={avatar.id}
            className={`relative shrink-0 rounded-full border-2 border-white bg-slate-100 shadow-sm ring-1 ring-slate-200/90 ${avatarOverlap}`}
            style={{ zIndex: TRUST_AVATARS.length - index }}
          >
            <Image
              src={avatar.src}
              alt={avatar.alt}
              width={96}
              height={96}
              sizes="(max-width: 640px) 36px, (max-width: 1024px) 40px, 48px"
              className={`${avatarSize} rounded-full object-cover`}
            />
          </li>
        ))}
        <li
          className={`relative flex shrink-0 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white text-[9px] font-extrabold tracking-tight text-slate-600 shadow-sm ring-1 ring-slate-200/80 sm:text-[10px] ${avatarOverlap} ${avatarSize}`}
          style={{ zIndex: 0 }}
          aria-hidden
        >
          {TRUST_AVATAR_OVERFLOW_LABEL}
        </li>
      </ul>
    </div>
  );
}

export default function StudentTrustStrip() {
  return (
    <div className="mt-4 flex w-full max-w-xl flex-col gap-2.5 sm:mt-5 sm:flex-row sm:items-center sm:gap-3 md:gap-4">
      <TrustAvatarStack />

      {/* Trust copy */}
      <div className="min-w-0 flex-1 text-left">
        <div className="flex flex-wrap items-center gap-1.5">
          <StarRow />
          <span className="text-[11px] font-bold text-text-dark sm:text-xs">4.9/5 learner rating</span>
        </div>
        <p className="mt-0.5 text-xs font-semibold leading-snug text-text-dark sm:text-sm">
          <span className="text-gradient-coral font-bold">2,500+ students</span> placed at FAANG-scale
          tech, consulting & enterprise teams
        </p>
        <p className="mt-0.5 text-[10px] font-medium leading-tight text-text-muted sm:text-[11px]">
          Live mentorship • Mock interviews • Placement support
        </p>
      </div>
    </div>
  );
}
