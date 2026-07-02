interface BaseTemplateOptions {
  preheader?: string; // 40-90 chars shown in inbox preview next to subject line
  content: string;    // inner HTML, inserted into the wrapper
  emailAddress?: string; // email for unsubscribe
}

export function baseTemplate({ preheader = "", content, emailAddress = "{{EMAIL}}" }: BaseTemplateOptions): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const unsubscribeUrl = `${appUrl}/unsubscribe?token=${Buffer.from(emailAddress).toString("base64")}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>TaskFlow</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

  <!-- Preheader text (hidden but shown in inbox previews) -->
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>` : ""}

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Email card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #f1f5f9;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <a href="${appUrl}" style="text-decoration:none;">
                      <span style="font-size:20px;font-weight:700;color:#6366f1;letter-spacing:-0.5px;">TaskFlow</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #f1f5f9;background-color:#f8fafc;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">
                You're receiving this because you have an account on
                <a href="${appUrl}" style="color:#6366f1;text-decoration:none;">TaskFlow</a>.
                <br />
                <a href="${unsubscribeUrl}"
                   style="color:#94a3b8;text-decoration:underline;">
                  Manage email preferences or unsubscribe
                </a>
                &nbsp;·&nbsp;
                <a href="${appUrl}"
                   style="color:#94a3b8;text-decoration:underline;">
                  Terms of Service
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}
