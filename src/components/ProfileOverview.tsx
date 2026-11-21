import { BriefcaseBusiness } from 'lucide-react';
import type { ProfileData } from '../types';
import { Avatar } from './Avatar';
import { QuickActions } from './QuickActions';

interface ProfileOverviewProps {
  profile: ProfileData;
  onOpenQr: () => void;
  onShare: () => void;
}

export function ProfileOverview({ profile, onOpenQr, onShare }: ProfileOverviewProps) {
  return (
    <section className="relative text-center pt-1 pb-4" id="profile-section" aria-labelledby="profile-name">
      <Avatar
        src={profile.avatarUrl}
        fallbackSrc="https://github.com/fahedhermoza.png"
        alt={profile.name}
        name={profile.name}
      />

      <h1
        id="profile-name"
        className="mt-4 text-[24px] sm:text-[26px] font-bold text-[#181C21] tracking-tight leading-tight"
      >
        {profile.name}
      </h1>

      <p id="profile-handle" className="text-[13.5px] font-medium text-[#717886] mt-0.5">
        {profile.handle}
      </p>

      <p
        id="profile-title"
        className="text-[10.5px] sm:text-[11px] font-bold text-[#8B92A2] tracking-[0.1em] uppercase mt-2"
      >
        {profile.title}
      </p>

      {profile.company && (
        <p className="inline-flex items-center justify-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-[#f1f0ff] text-[#4d50ac] text-xs font-semibold">
          <BriefcaseBusiness aria-hidden="true" className="w-3.5 h-3.5" />
          {profile.company}
        </p>
      )}

      <p className="max-w-[310px] mx-auto mt-4 text-[13px] text-[#555d6b] leading-relaxed">
        {profile.bio}
      </p>

      <QuickActions
        phone={profile.phoneRaw}
        email={profile.email}
        onOpenQr={onOpenQr}
        onShare={onShare}
      />
    </section>
  );
}
