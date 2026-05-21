import { FAQItem } from '../types';

export interface SiteContent {
  promoText: string;
  promoTimeHours: number;
  promoTimeMinutes: number;
  promoTimeSeconds: number;
  promoTargetTimestamp?: number;
  heroCDECBatchDate: string;
  heroCDECSeats?: string;
  heroXDSAIBatchDate: string;
  heroXDSAISeats?: string;
  faqs: FAQItem[];
}
