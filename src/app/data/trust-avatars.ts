/** Replace `src` URLs with your own learner headshots when ready */
export type TrustAvatar = {
  id: string;
  src: string;
  alt: string;
};

export const TRUST_AVATARS: TrustAvatar[] = [
  {
    id: 'learner-1',
    src: 'https://cloudblitz.in/Alumni/Kiran-Bhoyar-GlobalLogic.webp',
    alt: 'CloudBlitz learner — software engineer',
  },
  {
    id: 'learner-2',
    src: 'https://cloudblitz.in/Alumni/Monika%20Vyas-DevOps-Engineer-TCS.webp',
    alt: 'CloudBlitz learner — data professional',
  },
  {
    id: 'learner-3',
    src: 'https://cloudblitz.in/Alumni/Ejaz-Sheikh-Capgemini.webp',
    alt: 'CloudBlitz learner — cloud practitioner',
  },
  {
    id: 'learner-4',
    src: 'https://cloudblitz.in/Alumni/Mrunmayee-Gaikwad-TechM.webp',
    alt: 'CloudBlitz learner — DevOps graduate',
  },
];

export const TRUST_AVATAR_OVERFLOW_LABEL = '+2K';
