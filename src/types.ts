export interface SocialLink {
  id: string;
  label: string;
  url: string;
  bgColor: string;
  hoverColor: string;
  iconName: 'instagram' | 'facebook' | 'whatsapp' | 'linkedin' | 'portfolio';
  isExternal?: boolean;
}

export interface ProfileData {
  name: string;
  handle: string;
  title: string;
  bio: string;
  phoneDisplay: string;
  phoneRaw: string;
  email: string;
  portfolioUrl: string;
  avatarUrl: string;
  company?: string;
  links: SocialLink[];
}
