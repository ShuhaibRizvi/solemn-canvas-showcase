import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { z } from "npm:zod@3.25.76";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const InquirySchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required").max(100, "Company name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  orderQuantity: z.string().trim().min(1, "Order quantity is required").max(50, "Order quantity too long"),
});

// HTML escape function to prevent injection
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in ms
const RATE_LIMIT_MAX = 5; // Max requests per IP per hour

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || (now - record.timestamp) > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received inquiry request");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   req.headers.get('x-real-ip') || 
                   'unknown';

  // Check rate limit
  if (!checkRateLimit(clientIP)) {
    console.log("Rate limit exceeded for IP:", clientIP);
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    // Parse and validate input
    const rawBody = await req.json();
    const validationResult = InquirySchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validationResult.error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { companyName, email, orderQuantity } = validationResult.data;
    
    // Escape HTML for safe email content
    const safeCompanyName = escapeHtml(companyName);
    const safeEmail = escapeHtml(email);
    const safeOrderQuantity = escapeHtml(orderQuantity);

    console.log("Processing inquiry from:", safeCompanyName, safeEmail);

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: "SockCo <onboarding@resend.dev>",
      to: [email],
      subject: "We received your inquiry!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000;">Thank you for your inquiry, ${safeCompanyName}!</h1>
          <p style="color: #666; line-height: 1.6;">
            We have received your wholesale inquiry for <strong>${safeOrderQuantity}</strong>.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Our sales team will review your request and get back to you within 24 hours with a custom quote.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            <strong>SockCo Wholesale Team</strong>
          </p>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmail);

    // Send notification email to sales team
    const salesEmail = await resend.emails.send({
      from: "SockCo <onboarding@resend.dev>",
      to: ["shuhaibrizvi@gmail.com"],
      subject: `New Inquiry from ${safeCompanyName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000;">New Wholesale Inquiry</h1>
          <p><strong>Company:</strong> ${safeCompanyName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Order Quantity:</strong> ${safeOrderQuantity}</p>
        </div>
      `,
    });

    console.log("Sales notification sent:", salesEmail);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-inquiry function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
