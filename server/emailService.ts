// import { MailService } from '@sendgrid/mail';
import nodemailer from "nodemailer";

// if (!process.env.SENDGRID_API_KEY) {
//   throw new Error("SENDGRID_API_KEY environment variable must be set");
// }

// const mailService = new MailService();
// mailService.setApiKey(process.env.SENDGRID_API_KEY);

// --- Custom SMTP (dxvalley) ---
/*
const transporter = nodemailer.createTransport({
  host: "mail.dxvalley.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME, // set in .env
    pass: process.env.SMTP_PASSWORD, // set in .env
  },
});
*/
// --- End Custom SMTP ---

// --- Gmail SMTP ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "elshadayzewude@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD, // Store your app password in .env
  },
});
// --- End Gmail SMTP ---


interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(contactData: ContactEmailData): Promise<boolean> {
  try {
    const emailContent =  await transporter.sendMail({
      to: 'elshadayz19@gmail.com', // Receiver
      from: 'elshadayzewude@gmail.com', // Sender
      replyTo: contactData.email, // Allow direct reply to the customer  
      subject: `New Contact Form Submission: ${contactData?.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="border-left: 4px solid #D4AF37; padding-left: 20px; margin-bottom: 30px;">
              <h2 style="color: #333; margin: 0;">New Contact Form Submission</h2>
              <p style="color: #666; margin: 5px 0 0 0;">Makmar Trading PLC Website</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #D4AF37; margin-bottom: 10px;">Contact Information</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${contactData?.firstName} ${contactData.lastName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${contactData?.email}</p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${contactData.subject}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #D4AF37; margin-bottom: 10px;">Message</h3>
              <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 3px solid #D4AF37;">
                <p style="margin: 0; line-height: 1.6; color: #333;">${(contactData.message || '').replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <div style="text-align: center; color: #666; font-size: 14px;">
              <p style="margin: 0;">This message was sent from the Makmar Trading PLC website contact form.</p>
              <p style="margin: 5px 0 0 0;">Please reply directly to ${contactData.email}</p>
            </div>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Subject: ${contactData.subject}

Message:
${contactData.message || ''}

---
This message was sent from the Makmar Trading PLC website contact form.
Please reply directly to ${contactData.email}
      `.trim(),
    });
    console.log(emailContent);
    return emailContent;
    // await mailService.send(emailContent);
    console.log('Contact email sent successfully');
    // return true;
  } catch (error) {
    console.error('SMTP email error:', error);
    return false;
  }
}