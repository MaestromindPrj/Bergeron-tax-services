import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Full name is required and must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json(
        { error: "A valid phone number is required (at least 7 digits)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

    if (!apiKey || !recipientEmail) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Consultation Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f5f7; margin: 0; padding: 24px; color: #17243A;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
    
    <!-- Header Banner -->
    <div style="background-color: #071D49; padding: 32px 28px; text-align: center; border-bottom: 4px solid #D9A323;">
      <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; color: #D9A323; text-transform: uppercase; display: block; margin-bottom: 6px;">
        BERGERON TAX SERVICES
      </span>
      <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: -0.02em;">
        New Consultation Request
      </h1>
    </div>

    <!-- Body Content -->
    <div style="padding: 32px 28px;">
      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 24px;">
        You have received a new consultation inquiry from the <strong>Bergeron Tax Services</strong> website. Here are the client's details:
      </p>

      <!-- Details Card -->
      <div style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px 24px; margin-bottom: 28px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #071D49; text-transform: uppercase; width: 35%;">
              Full Name
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 15px; font-weight: 600; color: #17243A;">
              ${cleanName}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #071D49; text-transform: uppercase;">
              Email Address
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 15px; color: #17243A;">
              <a href="mailto:${cleanEmail}" style="color: #071D49; font-weight: 600; text-decoration: underline;">
                ${cleanEmail}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #071D49; text-transform: uppercase;">
              Phone Number
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 15px; color: #17243A;">
              <a href="tel:${cleanPhone.replace(/\s+/g, '')}" style="color: #071D49; font-weight: 600; text-decoration: underline;">
                ${cleanPhone}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; font-weight: 700; color: #071D49; text-transform: uppercase;">
              Submitted At
            </td>
            <td style="padding: 10px 0; font-size: 13px; color: #64748b;">
              ${timestamp}
            </td>
          </tr>
        </table>
      </div>

      <!-- Quick Action Buttons -->
      <div style="text-align: center; margin-bottom: 12px;">
        <a href="mailto:${cleanEmail}?subject=Re:%20Initial%20Consultation%20-%20Bergeron%20Tax%20Services" 
           style="display: inline-block; background-color: #D9A323; color: #071D49; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 9999px; text-decoration: none; margin-right: 12px;">
          Reply to ${cleanName.split(" ")[0]}
        </a>
        <a href="tel:${cleanPhone.replace(/\s+/g, '')}" 
           style="display: inline-block; background-color: #071D49; color: #ffffff; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 9999px; text-decoration: none;">
          Call ${cleanPhone}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 16px 28px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
      Sent automatically via Bergeron Tax Services Website Contact Form
    </div>
  </div>
</body>
</html>
    `.trim();

    // Send email via Resend REST API
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bergeron Tax Services <onboarding@resend.dev>",
        to: [recipientEmail],
        reply_to: cleanEmail,
        subject: `New Consultation Request: ${cleanName}`,
        html: emailHtml,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend API Error:", resendData);
      return NextResponse.json(
        { error: resendData.message || "Failed to send consultation email" },
        { status: resendRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Consultation request sent successfully",
      id: resendData.id,
    });
  } catch (error: any) {
    console.error("Contact API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
