import { Metadata } from 'next';
import clientPromise from './mongodb';
import { CourseType } from '../app/types';

const fallbackPromo = "✨ May Special: Get 27% OFF + Free 1-on-1 Mock Interviews!";
const fallbackCDECBatch = "MAY 28, 2026 | 8:00 PM IST";
const fallbackXDSAAIBatch = "MAY 28, 2026 | 8:00 PM IST";

export async function generateCourseMetadata(course: CourseType): Promise<Metadata> {
  let promoText = fallbackPromo;
  let batchDate = course === 'cdec' ? fallbackCDECBatch : fallbackXDSAAIBatch;

  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db();
      const content = await db.collection('site_content').findOne({ key: 'landing_page' });
      if (content) {
        if (content.promoText) promoText = content.promoText;
        if (course === 'cdec' && content.heroCDECBatchDate) {
          batchDate = content.heroCDECBatchDate;
        } else if (course === 'X-DSAAI' && content.heroXDSAAIBatchDate) {
          batchDate = content.heroXDSAAIBatchDate;
        }
      }
    }
  } catch (err) {
    console.error('Failed to load SEO metadata from MongoDB, falling back:', err);
  }

  if (course === 'cdec') {
    const title = "Cloud DevOps Engineering Course (CDEC) | CLOUDBLITZ";
    const description = `${promoText} Master Linux scripting, Git workflows, Docker, Kubernetes, Terraform orchestration, & AWS cloud architecture. Next batch: ${batchDate}. Join Cloudblitz for elite live tech cohorts & assured placements.`;
    return {
      title,
      description,
      keywords: [
        "Cloud DevOps Course",
        "DevOps Engineering Training",
        "AWS Certification Training",
        "Kubernetes Certification",
        "Terraform CI/CD Pipeline Course",
        "Azure DevOps Training",
        "Cloud Computing Courses online",
        "IT Placements India",
        "Cloudblitz Admissions",
        "CDEC Course Details",
        "Best DevOps Course in Pune",
        "Best DevOps Course in Nagpur"
      ],
      openGraph: {
        title,
        description,
        url: "https://cloudblitz.in/cdec",
        type: "website",
        locale: "en_US",
        siteName: "CLOUDBLITZ",
        images: [{ url: "https://cloudblitz.in/cloudblitz-logo.png", width: 800, height: 600, alt: "CLOUDBLITZ" }]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://cloudblitz.in/cloudblitz-logo.png"]
      }
    };
  } else {
    const title = "Data Science & AI Certification Course (X-DSAAI) | CLOUDBLITZ";
    const description = `${promoText} Master advanced SQL CTEs, Pandas analytical wrangling, PyTorch neural models, LLM API scaling, Tableau storytelling, & Generative AI. Next batch: ${batchDate}. Join Cloudblitz's premier cohorts with assured placement support.`;
    return {
      title,
      description,
      keywords: [
        "Data Science and AI Course",
        "Machine Learning Bootcamp",
        "Generative AI Training",
        "Learn Python for Data Science",
        "Learn PyTorch and TensorFlow",
        "Best Data Science Course in Pune",
        "Best Data Science Course in Nagpur",
        "X-DSAAI Program Syllabus",
        "Cloudblitz Admissions",
        "IT Placements India"
      ],
      openGraph: {
        title,
        description,
        url: "https://cloudblitz.in/x-dsaai",
        type: "website",
        locale: "en_US",
        siteName: "CLOUDBLITZ",
        images: [{ url: "https://cloudblitz.in/cloudblitz-logo.png", width: 800, height: 600, alt: "CLOUDBLITZ" }]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://cloudblitz.in/cloudblitz-logo.png"]
      }
    };
  }
}
