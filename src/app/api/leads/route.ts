import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
export const runtime = "nodejs";
// Helper to format experience levels for nicer display
function formatExperience(exp: string): string {
  switch (exp) {
    case 'fresher':
      return 'Fresher / College Student';
    case 'junior':
      return 'Junior Developer / Engineer (1 - 3 Years)';
    case 'mid':
      return 'Mid-Level Professional (3 - 5 Years)';
    case 'senior':
      return 'Senior Lead / Expert (5+ Years)';
    case '1-3':
      return '1 - 3 Years Experience';
    case '3-5':
      return '3 - 5 Years Experience';
    case '5-8':
      return '5 - 8 Years Experience';
    case '8+':
      return '8+ Years Experience';
    default:
      return exp.charAt(0).toUpperCase() + exp.slice(1);
  }
}

// Helper to format purposes for nicer display
function formatPurpose(purpose: string): { label: string; color: string; bg: string } {
  switch (purpose) {
    case 'syllabus':
      return { label: 'Syllabus Download', color: '#2563eb', bg: '#eff6ff' }; // Blue
    case 'consultation':
      return { label: 'Free Consultation', color: '#16a34a', bg: '#f0fdf4' }; // Green
    case 'quick':
      return { label: 'Quick Callback Request', color: '#0d9488', bg: '#f0fdfa' }; // Teal
    case 'offer':
      return { label: 'Promotional Offer Lock', color: '#ea580c', bg: '#fff7ed' }; // Orange/Gold
    default:
      return { label: 'General Inquiry', color: '#4b5563', bg: '#f9fafb' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, countryCode, phone, experience, course, purpose, promoText, landingForm } = body;

    // Basic Validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Full Name and Phone Number are required.' },
        { status: 400 }
      );
    }

    // 1. Submit lead to CloudBlitz CRM backend (non-blocking for email notification)
    const crmApiUrl = process.env.CRM_API_URL;
    if (!crmApiUrl) {
      console.warn('[Lead Form API Warning] CRM_API_URL environment variable is missing. Skipping CRM submission.');
    } else {
      // Determine backend formType mapping
      let formType = 'contact';
      if (landingForm === 'HeroLeadForm') {
        formType = 'career-counseling';
      } else {
        switch (purpose) {
          case 'consultation':
            formType = 'career-counseling';
            break;
          case 'syllabus':
            formType = 'syllabus-download';
            break;
          case 'quick':
          case 'offer':
            formType = 'contact';
            break;
          default:
            formType = 'contact';
        }
      }

      // Format phone number to clean international digits-only format
      const cleanedPhone = phone.replace(/\D/g, '');
      const formattedCountryCode = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;
      const fullPhone = `${formattedCountryCode}${cleanedPhone}`;

      // Map landing parameters to CRM expected schemas
      let crmPayload: any = {};
      const crmCourse = course === 'cdec' ? 'CDEC' : 'X-DSAAI';
      const formText = landingForm || (purpose === 'consultation' ? 'HeroLeadForm' : 'LeadFormModal');

      if (formType === 'career-counseling') {
        crmPayload = {
          name,
          phone: fullPhone,
          course: crmCourse,
          experienceLevel: experience,
          message: `Source: CDEC Landing | purpose: ${purpose || 'consultation'} | form: ${formText}${promoText ? ` | promoText: ${promoText}` : ''}`
        };
        if (email && email.trim()) {
          crmPayload.email = email.trim();
        }
      } else if (formType === 'syllabus-download') {
        crmPayload = {
          fullName: name,
          phoneNumber: fullPhone,
          course: crmCourse,
          courseTitle: crmCourse,
          message: `Source: CDEC Landing | purpose: ${purpose || 'syllabus'} | experience: ${experience}${email ? ` | email: ${email.trim()}` : ''}${promoText ? ` | promoText: ${promoText}` : ''}`
        };
      } else if (formType === 'contact') {
        crmPayload = {
          name,
          phone: fullPhone,
          course: crmCourse,
          subject: purpose === 'offer' ? 'Promo Offer' : 'Callback Request',
          courseInterest: crmCourse,
          message: `Source: CDEC Landing | purpose: ${purpose || 'quick'} | experience: ${experience}${promoText ? ` | promoText: ${promoText}` : ''}`
        };
        if (email && email.trim()) {
          crmPayload.email = email.trim();
        }
      }

      const crmUrl = `${crmApiUrl.replace(/\/$/, '')}/api/website-forms/${formType}`;

      try {
        const crmResponse = await fetch(crmUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(crmPayload),
        });

        if (!crmResponse.ok) {
          let errorMsg = 'Failed to submit lead to CRM backend.';
          try {
            const errorData = await crmResponse.json();
            errorMsg = errorData.message || errorData.error || errorMsg;
          } catch (e) {
            try {
              const text = await crmResponse.text();
              if (text) errorMsg = text;
            } catch (_) {}
          }
          console.error(`[CRM Submission Error] Mapped Status: ${crmResponse.status}, Error: ${errorMsg}`);
        } else {
          console.log(`[CRM Submission Success] Mapped Status: ${crmResponse.status}`);
        }
      } catch (fetchErr: any) {
        console.error('[CRM Connection Error] Fetch failed:', fetchErr);
      }
    }

    const submissionTime = new Date();
    const formattedDate = submissionTime.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    }) + ' (IST)';

    // 2. Email Notification using Nodemailer
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const adminEmail = process.env.EMAIL_RECEIVER || 'adnanshah64507@gmail.com';

    const emailNotConfigured =
      !emailUser ||
      !emailPass ||
      emailUser === 'your-email@gmail.com' ||
      emailPass === 'your-gmail-app-password';

    // Premium HTML Email Design System
    const courseLabel = course === 'cdec' ? 'Cloud DevOps Engineering (CDEC)' : 'Expert in Data Science & AI (X-DSAAI)';
    const headerBg = course === 'cdec' 
      ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' 
      : 'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)';
    const accentColor = course === 'cdec' ? '#FF6B6B' : '#7F00FF';

    const purposeDetails = formatPurpose(purpose);
    const formattedExp = formatExperience(experience);
    const fullPhoneNumber = `${countryCode} ${phone}`;

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Lead Received</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background-color: #f8fafc;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
              border: 1px solid #e2e8f0;
            }
            .header {
              background: ${headerBg};
              padding: 40px 30px;
              text-align: center;
              color: #ffffff;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 800;
              letter-spacing: -0.5px;
              text-transform: uppercase;
            }
            .header p {
              margin: 8px 0 0 0;
              font-size: 14px;
              opacity: 0.9;
              font-weight: 600;
            }
            .badge-container {
              text-align: center;
              margin-top: -15px;
              margin-bottom: 25px;
            }
            .badge {
              display: inline-block;
              padding: 8px 18px;
              font-size: 12px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-radius: 50px;
              color: ${purposeDetails.color};
              background-color: ${purposeDetails.bg};
              border: 1.5px solid ${purposeDetails.color}22;
            }
            .content {
              padding: 0 40px 30px 40px;
            }
            .section-title {
              font-size: 11px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: #94a3b8;
              margin-bottom: 15px;
              border-bottom: 1px solid #f1f5f9;
              padding-bottom: 8px;
            }
            .grid {
              display: table;
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            .grid-row {
              display: table-row;
            }
            .grid-label {
              display: table-cell;
              padding: 12px 0;
              font-size: 13px;
              font-weight: 700;
              color: #64748b;
              width: 35%;
              vertical-align: top;
              border-bottom: 1px solid #f8fafc;
            }
            .grid-value {
              display: table-cell;
              padding: 12px 0;
              font-size: 14px;
              font-weight: 600;
              color: #0f172a;
              width: 65%;
              vertical-align: top;
              border-bottom: 1px solid #f8fafc;
            }
            .phone-link {
              color: ${accentColor};
              text-decoration: none;
              font-weight: 800;
            }
            .promo-box {
              position: relative;
              background: linear-gradient(135deg, rgba(255, 111, 97, 0.05) 0%, rgba(138, 43, 226, 0.05) 100%);
              border: 1px solid rgba(255, 111, 97, 0.15);
              border-radius: 16px;
              padding: 20px;
              margin-top: 10px;
              margin-bottom: 25px;
            }
            .promo-title {
              font-size: 9px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: #ea580c;
              margin-bottom: 6px;
            }
            .promo-text {
              font-size: 13px;
              font-weight: 700;
              color: #334155;
              line-height: 1.5;
            }
            .footer {
              background-color: #f8fafc;
              padding: 24px 30px;
              text-align: center;
              border-top: 1px solid #f1f5f9;
            }
            .footer p {
              margin: 0;
              font-size: 11px;
              color: #94a3b8;
              font-weight: 600;
              line-height: 1.6;
            }
            .footer a {
              color: #64748b;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CloudBlitz Landing</h1>
              <p>Instant Academy Lead Alert</p>
            </div>
            
            <div class="badge-container" style="margin-top: -15px;">
              <span class="badge">${purposeDetails.label}</span>
            </div>

            <div class="content">
              <div class="section-title">Lead Parameters</div>
              <div class="grid">
                <div class="grid-row">
                  <div class="grid-label">Full Name</div>
                  <div class="grid-value" style="font-size: 16px; font-weight: 800; color: #0f172a;">${name}</div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Email Address</div>
                  <div class="grid-value">${email ? `<a href="mailto:${email}" style="color:#0f172a; text-decoration:none;">${email}</a>` : '<em style="color:#94a3b8; font-weight:normal;">Not Provided</em>'}</div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Phone Number</div>
                  <div class="grid-value">
                    <a href="tel:${countryCode}${phone}" class="phone-link">${fullPhoneNumber}</a>
                  </div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Experience</div>
                  <div class="grid-value">${formattedExp}</div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Curriculum Track</div>
                  <div class="grid-value" style="color: ${accentColor}; font-weight: 800;">${courseLabel}</div>
                </div>
              </div>

              ${promoText ? `
                <div class="promo-box">
                  <div class="promo-title">Locked Offer Campaign</div>
                  <div class="promo-text">${promoText}</div>
                </div>
              ` : ''}

              <div class="section-title">System Information</div>
              <div style="font-size: 12px; color: #64748b; font-weight: 600; line-height: 1.6;">
                <strong>Captured On:</strong> ${formattedDate}
              </div>
            </div>

            <div class="footer">
              <p>
                This notification is automated by the CloudBlitz Student Acquisition System.<br>
                Please follow up with the lead immediately to ensure maximum batch conversion rates.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    if (emailNotConfigured) {
      console.log('--- DEVELOPMENT LEAD NOTIFICATION EMAIL CONTENT ---');
      console.log(`To: ${adminEmail}`);
      console.log(`Subject: 🚀 New Lead - ${name} | ${courseLabel}`);
      console.log(`Lead Details:
        Name: ${name}
        Email: ${email || 'Not Provided'}
        Phone: ${fullPhoneNumber}
        Experience: ${formattedExp}
        Purpose: ${purposeDetails.label}
        Course: ${courseLabel}
        Promo: ${promoText || 'None'}
        Date: ${formattedDate}
      `);
      console.log('----------------------------------------------------');

      return NextResponse.json({
        success: true,
        emailSent: false,
        warning: 'Email variables not configured in .env. Lead details printed to server console.',
      });
    }

    // Configure standard SMTP transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Send Mail
    const info = await transporter.sendMail({
      from: `"CloudBlitz Notifications" <${emailUser}>`,
      to: adminEmail,
      subject: `🚀 New Lead: ${name} (${purposeDetails.label}) - ${course.toUpperCase()}`,
      html: htmlTemplate,
    });

    console.log(`[Lead Email Send] Email dispatched successfully. Message ID: ${info.messageId}`);

    return NextResponse.json({
      success: true,
      emailSent: true,
    });
  } catch (error) {
    console.error('[Lead Form API Error] Request processing failed:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error. Please try again later.' },
      { status: 500 }
    );
  }
}
