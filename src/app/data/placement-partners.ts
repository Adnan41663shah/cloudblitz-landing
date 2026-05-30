import type { IconType } from 'react-icons';
import {
  FaAmazon,
  FaApple,
  FaAws,
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaMicrosoft,
} from 'react-icons/fa';
import {
  SiAccenture,
  SiCisco,
  SiDell,
  SiHp,
  SiInfosys,
  SiIntel,
  SiNetflix,
  SiNvidia,
  SiPaypal,
  SiSalesforce,
  SiSamsung,
  SiSony,
  SiSpotify,
  SiTata,
  SiUber,
  SiWipro,
} from 'react-icons/si';

export type PlacementPartner = {
  name: string;
  displayName: string;
  Icon?: IconType;
  brandColor: string;
  brandBg: string;
  industry: string;
  alumni: number;
  avgPackage: string;
  location: string;
};

export const placementPartnersRow1: PlacementPartner[] = [
  { name: 'Tata Consultancy Services', displayName: 'TCS', Icon: SiTata, brandColor: '#E31837', brandBg: 'rgba(227, 24, 55, 0.08)', industry: 'IT Services', alumni: 42, avgPackage: '₹8.2L', location: 'Mumbai, India' },
  { name: 'Infosys', displayName: 'Infosys', Icon: SiInfosys, brandColor: '#007CC3', brandBg: 'rgba(0, 124, 195, 0.1)', industry: 'IT Consulting', alumni: 38, avgPackage: '₹7.8L', location: 'Bengaluru, India' },
  { name: 'Wipro', displayName: 'Wipro', Icon: SiWipro, brandColor: '#341C53', brandBg: 'rgba(52, 28, 83, 0.08)', industry: 'IT Services', alumni: 31, avgPackage: '₹7.4L', location: 'Hyderabad, India' },
  { name: 'HCLTech', displayName: 'HCLTech', brandColor: '#0B5FFF', brandBg: 'rgba(11, 95, 255, 0.1)', industry: 'Technology', alumni: 28, avgPackage: '₹7.6L', location: 'Noida, India' },
  { name: 'Tech Mahindra', displayName: 'Tech Mahindra', brandColor: '#ED1C24', brandBg: 'rgba(237, 28, 36, 0.08)', industry: 'IT Services', alumni: 26, avgPackage: '₹7.3L', location: 'Pune, India' },
  { name: 'Cognizant', displayName: 'Cognizant', brandColor: '#1A4CA1', brandBg: 'rgba(26, 76, 161, 0.1)', industry: 'Consulting', alumni: 35, avgPackage: '₹7.9L', location: 'Chennai, India' },
  { name: 'Google', displayName: 'Google', Icon: FaGoogle, brandColor: '#4285F4', brandBg: 'rgba(66, 133, 244, 0.1)', industry: 'Technology', alumni: 18, avgPackage: '₹12.5L', location: 'Bengaluru, India' },
  { name: 'Microsoft', displayName: 'Microsoft', Icon: FaMicrosoft, brandColor: '#00A4EF', brandBg: 'rgba(0, 164, 239, 0.1)', industry: 'Cloud & Software', alumni: 22, avgPackage: '₹11.8L', location: 'Hyderabad, India' },
  { name: 'Amazon', displayName: 'Amazon', Icon: FaAmazon, brandColor: '#FF9900', brandBg: 'rgba(255, 153, 0, 0.1)', industry: 'E-commerce & Cloud', alumni: 24, avgPackage: '₹10.5L', location: 'Bengaluru, India' },
  { name: 'Accenture', displayName: 'Accenture', Icon: SiAccenture, brandColor: '#A100FF', brandBg: 'rgba(161, 0, 255, 0.08)', industry: 'Consulting', alumni: 29, avgPackage: '₹8.5L', location: 'Mumbai, India' },
];

export const placementPartnersRow2: PlacementPartner[] = [
  { name: 'KPIT', displayName: 'KPIT', brandColor: '#003DA5', brandBg: 'rgba(0, 61, 165, 0.1)', industry: 'IT Services', alumni: 25, avgPackage: '₹7.5L', location: 'Pune, India' },
  { name: 'GlobalLogic', displayName: 'GlobalLogic', brandColor: '#E2231A', brandBg: 'rgba(226, 35, 26, 0.08)', industry: 'Product Engineering', alumni: 19, avgPackage: '₹9.2L', location: 'Noida, India' },
  { name: 'Oracle', displayName: 'Oracle', brandColor: '#F80000', brandBg: 'rgba(248, 0, 0, 0.08)', industry: 'Enterprise Software', alumni: 21, avgPackage: '₹9.8L', location: 'Bengaluru, India' },
  { name: 'IBM', displayName: 'IBM', brandColor: '#0F62FE', brandBg: 'rgba(15, 98, 254, 0.1)', industry: 'Technology', alumni: 23, avgPackage: '₹9.5L', location: 'Pune, India' },
  { name: 'Meta', displayName: 'Meta', Icon: FaFacebook, brandColor: '#0866FF', brandBg: 'rgba(8, 102, 255, 0.1)', industry: 'Social Technology', alumni: 14, avgPackage: '₹13.2L', location: 'Gurugram, India' },
  { name: 'Apple', displayName: 'Apple', Icon: FaApple, brandColor: '#555555', brandBg: 'rgba(85, 85, 85, 0.08)', industry: 'Consumer Tech', alumni: 12, avgPackage: '₹14.0L', location: 'Hyderabad, India' },
  { name: 'AWS', displayName: 'AWS', Icon: FaAws, brandColor: '#FF9900', brandBg: 'rgba(255, 153, 0, 0.08)', industry: 'Cloud Computing', alumni: 20, avgPackage: '₹11.2L', location: 'Mumbai, India' },
  { name: 'Salesforce', displayName: 'Salesforce', Icon: SiSalesforce, brandColor: '#00A1E0', brandBg: 'rgba(0, 161, 224, 0.1)', industry: 'SaaS', alumni: 17, avgPackage: '₹10.8L', location: 'Hyderabad, India' },
  { name: 'NVIDIA', displayName: 'NVIDIA', Icon: SiNvidia, brandColor: '#76B900', brandBg: 'rgba(118, 185, 0, 0.1)', industry: 'AI Hardware', alumni: 11, avgPackage: '₹15.5L', location: 'Pune, India' },
  { name: 'Netflix', displayName: 'Netflix', Icon: SiNetflix, brandColor: '#E50914', brandBg: 'rgba(229, 9, 20, 0.08)', industry: 'Media & Tech', alumni: 9, avgPackage: '₹12.0L', location: 'Mumbai, India' },
  { name: 'Intel', displayName: 'Intel', Icon: SiIntel, brandColor: '#0071C5', brandBg: 'rgba(0, 113, 197, 0.1)', industry: 'Semiconductors', alumni: 16, avgPackage: '₹10.2L', location: 'Bengaluru, India' },
  { name: 'Cisco', displayName: 'Cisco', Icon: SiCisco, brandColor: '#1BA0D7', brandBg: 'rgba(27, 160, 215, 0.1)', industry: 'Networking', alumni: 18, avgPackage: '₹9.6L', location: 'Bengaluru, India' },
  { name: 'LinkedIn', displayName: 'LinkedIn', Icon: FaLinkedin, brandColor: '#0A66C2', brandBg: 'rgba(10, 102, 194, 0.1)', industry: 'Professional Network', alumni: 13, avgPackage: '₹11.5L', location: 'Bengaluru, India' },
  { name: 'Uber', displayName: 'Uber', Icon: SiUber, brandColor: '#000000', brandBg: 'rgba(0, 0, 0, 0.06)', industry: 'Mobility Tech', alumni: 15, avgPackage: '₹10.0L', location: 'Hyderabad, India' },
  { name: 'PayPal', displayName: 'PayPal', Icon: SiPaypal, brandColor: '#003087', brandBg: 'rgba(0, 48, 135, 0.08)', industry: 'FinTech', alumni: 14, avgPackage: '₹10.4L', location: 'Chennai, India' },
  { name: 'Dell', displayName: 'Dell', Icon: SiDell, brandColor: '#007DB8', brandBg: 'rgba(0, 125, 184, 0.1)', industry: 'Hardware & IT', alumni: 17, avgPackage: '₹8.8L', location: 'Bengaluru, India' },
  { name: 'HP', displayName: 'HP', Icon: SiHp, brandColor: '#0096D6', brandBg: 'rgba(0, 150, 214, 0.1)', industry: 'Technology', alumni: 16, avgPackage: '₹8.6L', location: 'Gurugram, India' },
  { name: 'Samsung', displayName: 'Samsung', Icon: SiSamsung, brandColor: '#1428A0', brandBg: 'rgba(20, 40, 160, 0.08)', industry: 'Electronics', alumni: 12, avgPackage: '₹9.0L', location: 'Noida, India' },
  { name: 'Sony', displayName: 'Sony', Icon: SiSony, brandColor: '#000000', brandBg: 'rgba(0, 0, 0, 0.06)', industry: 'Entertainment Tech', alumni: 10, avgPackage: '₹8.4L', location: 'Mumbai, India' },
  { name: 'Spotify', displayName: 'Spotify', Icon: SiSpotify, brandColor: '#1DB954', brandBg: 'rgba(29, 185, 84, 0.1)', industry: 'Music Streaming', alumni: 8, avgPackage: '₹9.8L', location: 'Mumbai, India' },
];
