import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#0f172a", // Match your slate-900 background or brand color
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true, // Accessibility best practice, while still allowing scale
};

export const metadata: Metadata = {
  title: "CLOUDBLITZ | Master Cloud DevOps (CDEC) & Data Science & AI (X-DSAAI)",
  description: "Propel your career with Cloudblitz's elite, live-interactive tech cohorts. Master Kubernetes, AWS and CI/CD pipelines (CDEC) or Deep Learning, Generative AI and analytics dashboarding (X-DSAAI). Assured corporate placements.",
  keywords: [
    "Cloud DevOps Course",
    "DevOps Engineering Training",
    "Data Science and AI Course",
    "AWS Certification Training",
    "Kubernetes Certification",
    "Generative AI Training",
    "Machine Learning Bootcamp",
    "Cloudblitz Admissions",
    "CDEC Course Details",
    "X-DSAAI Program Syllabus",
    "Best Data Science Course in Pune",
    "Best Data Science Course in Nagpur",
    "IT Placements India",
    "Learn Python for Data Science",
    "Cloud Computing Courses online",
    "Azure DevOps Training",
    "Terraform CI/CD Pipeline Course",
    "Learn PyTorch and TensorFlow"
  ],
  authors: [{ name: "CLOUDBLITZ Academic Team", url: "https://cloudblitz.in" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudblitz.in",
    title: "CLOUDBLITZ | Premium Tech Training (CDEC & X-DSAAI)",
    description: "Immersive cohorts in Cloud DevOps (CDEC) & Data Science with AI (X-DSAAI). Learn from active engineers, construct robust enterprise pipelines, and secure placements.",
    siteName: "CLOUDBLITZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "CLOUDBLITZ | Professional Cohorts CDEC & X-DSAAI",
    description: "Transition into elite tech engineering roles. Live mentorship, sandbox sandboxes, and dedicated mock interview reviews.",
  },
  icons: {
    icon: "/cloudblitz-logo.png",
    shortcut: "/cloudblitz-logo.png",
    apple: "/cloudblitz-logo.png",
  },
  appleWebApp: {
    capable: true,
    title: "Cloudblitz",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true, // Allows Apple devices to format phone numbers as clickable links
  },
};

// Course structured metadata schema (JSON-LD) for enhanced search results indexing
const jsonLDSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "Cloud DevOps Engineering Course (CDEC)",
      "description": "Enterprise-grade live training on Linux scripting, Git workflows, Docker isolation, Kubernetes orchestration, Terraform automation, and AWS/Azure cloud architecture.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "CLOUDBLITZ Academics",
        "sameAs": "https://cloudblitz.in"
      }
    },
    {
      "@type": "Course",
      "name": "Expert in Data Science using AI (X-DSAAI)",
      "description": "Elite machine learning cohort spanning advanced SQL CTE structures, Pandas analytical wrangling, PyTorch neural models, LLM API scaling, and Tableau dashboard storytelling.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "CLOUDBLITZ Academics",
        "sameAs": "https://cloudblitz.in"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Inject JSON-LD Schema to facilitate Google Search Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLDSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
