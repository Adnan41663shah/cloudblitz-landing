import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { getAdminPassword } from '../../../lib/env';

export const runtime = 'nodejs';

const defaultContent = {
  promoText: "✨ May Special: Get 27% OFF + Free 1-on-1 Mock Interviews!",
  promoTimeHours: 5,
  promoTimeMinutes: 42,
  promoTimeSeconds: 19,
  heroCDECBatchDate: "MAY 28, 2026 | 8:00 PM IST",
  heroCDECSeats: "04 / 20",
  heroXDSAAIBatchDate: "MAY 28, 2026 | 8:00 PM IST",
  heroXDSAAISeats: "06 / 20",
      faqs: [
        {
          id: 1,
          question: 'Who is eligible to join these courses? Do I need a technical coding background?',
          answer: 'Our programs are engineered to support both beginners and intermediate developers. While prior programming exposure is helpful, it is NOT mandatory. The curriculums commence with standard fundamentals (Linux basics for DevOps, Python scripting for Data Science) before transitioning to production-level scaling.',
          category: 'general'
        },
        {
          id: 2,
          question: 'How does the placement support system work? Is there a placement assurance?',
          answer: 'We deliver comprehensive career acceleration services: resume optimization, portfolio design, LinkedIn profile audits, and dedicated weekly technical mock interviews. You also gain direct access to our exclusive network of over 400+ corporate hiring partners who prioritize interviewing our students.',
          category: 'placement'
        },
        {
          id: 3,
          question: 'What is the schedule of the live classes? Can I balance it with a full-time job?',
          answer: 'Absolutely. Over 70% of our active batches consist of working professionals. Classes are organized on weekends (Saturdays and Sundays) or late evenings on weekdays. All classes are live and interactive, and recorded high-definition sessions are published to your learning dashboard within 3 hours.',
          category: 'curriculum'
        },
        {
          id: 4,
          question: 'Are there options for zero-interest EMI financing or discount scholarships?',
          answer: 'Yes! We support the learner community by offering up to 27% scholarship discount options for registrations locked during active promotional campaigns. Zero-interest monthly installment plans (EMIs) spanning 6, 9, or 12 months are available through our leading financial partners.',
          category: 'pricing'
        },
        {
          id: 5,
          question: 'Do I work on realistic industrial projects? What will be on my resume?',
          answer: 'Yes. Our curriculums contain extensive capstone implementations mimicking enterprise architectures. You will deploy multi-region configurations, automate pipelines (CI/CD) on live instances for CDEC, or train transformers, configure RAG vector models, and launch dashboards for X-DSAAI.',
          category: 'curriculum'
        },
        {
          id: 6,
          question: 'Is the course certificate globally accredited and verified?',
          answer: 'Yes, upon successful completion of the capstone validation benchmarks and mock interview checks, you will receive a verifiable digital credential with unique identifiers that can be easily embedded in your LinkedIn profile, showing complete project alignment.',
          category: 'general'
        }
      ]
};

export async function GET() {
  try {
    if (!clientPromise) {
      // Safe fallback when database is not configured
      const fallbackTarget = Date.now() + (defaultContent.promoTimeHours * 3600 + defaultContent.promoTimeMinutes * 60 + defaultContent.promoTimeSeconds) * 1000;
      return NextResponse.json({
        ...defaultContent,
        promoTargetTimestamp: fallbackTarget
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const content = await db.collection('site_content').findOne({ key: 'landing_page' });

    if (content) {
      // Remove mongo internal _id to avoid react/next serialization warnings
      const { _id, ...safeContent } = content;

      let promoTimeHours = safeContent.promoTimeHours ?? defaultContent.promoTimeHours;
      let promoTimeMinutes = safeContent.promoTimeMinutes ?? defaultContent.promoTimeMinutes;
      let promoTimeSeconds = safeContent.promoTimeSeconds ?? defaultContent.promoTimeSeconds;
      let promoTargetTimestamp = safeContent.promoTargetTimestamp;

      if (promoTargetTimestamp !== undefined) {
        const remainingTotalSeconds = Math.max(0, Math.floor((promoTargetTimestamp - Date.now()) / 1000));
        promoTimeHours = Math.floor(remainingTotalSeconds / 3600);
        promoTimeMinutes = Math.floor((remainingTotalSeconds % 3600) / 60);
        promoTimeSeconds = remainingTotalSeconds % 60;
      } else {
        // Backwards compatibility: initialize and compute relative to now
        promoTargetTimestamp = Date.now() + (promoTimeHours * 3600 + promoTimeMinutes * 60 + promoTimeSeconds) * 1000;
      }

      return NextResponse.json({
        ...defaultContent,
        ...safeContent,
        promoTimeHours,
        promoTimeMinutes,
        promoTimeSeconds,
        promoTargetTimestamp,
        faqs: Array.isArray(safeContent.faqs) ? safeContent.faqs : defaultContent.faqs
      });
    }

    const fallbackTarget = Date.now() + (defaultContent.promoTimeHours * 3600 + defaultContent.promoTimeMinutes * 60 + defaultContent.promoTimeSeconds) * 1000;
    return NextResponse.json({
      ...defaultContent,
      promoTargetTimestamp: fallbackTarget
    });
  } catch (error) {
    console.error('Error fetching content from MongoDB, falling back to static:', error);
    const fallbackTarget = Date.now() + (defaultContent.promoTimeHours * 3600 + defaultContent.promoTimeMinutes * 60 + defaultContent.promoTimeSeconds) * 1000;
    return NextResponse.json({
      ...defaultContent,
      promoTargetTimestamp: fallbackTarget
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminPassword = getAdminPassword();

    // Auth security check (cookie or auth header token check)
    const tokenCookie = request.cookies.get('admin_token')?.value;
    const authHeader = request.headers.get('authorization');
    const tokenHeader = authHeader ? authHeader.replace('Bearer ', '') : null;
    const token = tokenCookie || tokenHeader;

    if (token !== adminPassword) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    if (!clientPromise) {
      return NextResponse.json({ success: false, error: 'Database connection not configured' }, { status: 503 });
    }

    const body = await request.json();
    const client = await clientPromise;
    const db = client.db();

    // Clean and validate keys to prevent saving mongo structural issues
    const { _id, key, ...cleanBody } = body;

    await db.collection('site_content').updateOne(
      { key: 'landing_page' },
      {
        $set: {
          ...cleanBody,
          key: 'landing_page',
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update content:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
