import { ProfileData } from './types';

export const PROFILE_DATA: ProfileData = {
  name: 'Fahed Hermoza',
  handle: '@fahedhermoza',
  title: 'SOFTWARE ENGINEER & SPEAKER & BUILDER',
  bio: 'Android Lead • Speaker • Creador de experiencias digitales y móviles',
  phoneDisplay: '+51 955 116 562',
  phoneRaw: '+51955116562',
  email: 'fahedhermoza@gmail.com',
  portfolioUrl: 'https://fahedhermoza.github.io/',
  avatarUrl: '/avatar.jpg',
  company: 'NTT DATA Europe & Latam',
  links: [
    {
      id: 'instagram',
      label: 'INSTAGRAM',
      url: 'https://www.instagram.com/fahedhermoza/',
      bgColor: '#6876F0',
      hoverColor: '#5866E0',
      iconName: 'instagram',
      isExternal: true,
    },
    {
      id: 'facebook',
      label: 'FACEBOOK',
      url: 'https://www.facebook.com/fahed19',
      bgColor: '#736DEB',
      hoverColor: '#635DDB',
      iconName: 'facebook',
      isExternal: true,
    },
    {
      id: 'whatsapp',
      label: 'WHATSAPP',
      url: 'https://wa.me/51955116562?text=Hola%20Fahed,%20vi%20tu%20tarjeta%20digital...',
      bgColor: '#8168E8',
      hoverColor: '#7158D8',
      iconName: 'whatsapp',
      isExternal: true,
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      url: 'https://linkedin.com/in/fahedhermoza',
      bgColor: '#9362E6',
      hoverColor: '#8352D6',
      iconName: 'linkedin',
      isExternal: true,
    },
    {
      id: 'portfolio',
      label: 'PORTAFOLIO',
      url: 'https://fahedhermoza.github.io/',
      bgColor: '#A85EE2',
      hoverColor: '#984ED2',
      iconName: 'portfolio',
      isExternal: true,
    },
  ],
};

/**
 * Generates and triggers download of a standardized vCard (.vcf)
 * formatted for instant import into iOS Contacts and Android/Google Contacts.
 */
export function downloadVCard(profile = PROFILE_DATA): void {
  const vCardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:Hermoza;Fahed;;;`,
    `FN:${profile.name}`,
    `ORG:${profile.company || ''}`,
    `TITLE:${profile.title}`,
    `TEL;TYPE=CELL,VOICE,PREF:${profile.phoneRaw}`,
    `EMAIL;TYPE=INTERNET,WORK,PREF:${profile.email}`,
    `URL;TYPE=WORK:${profile.portfolioUrl}`,
    `URL;TYPE=Instagram:https://www.instagram.com/fahedhermoza/`,
    `URL;TYPE=LinkedIn:https://linkedin.com/in/fahedhermoza`,
    `NOTE:Tarjeta NFC & QR de contacto profesional de Fahed Hermoza`,
    'END:VCARD',
  ];

  const vCardString = vCardLines.join('\r\n');
  const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${profile.name.replace(/\s+/g, '_')}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
