import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  companyName: string;
  email: string;
  orderQuantity: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received inquiry request");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyName, email, orderQuantity }: InquiryRequest = await req.json();

    console.log("Processing inquiry from:", companyName, email);

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: "SockCo <onboarding@resend.dev>",
      to: [email],
      subject: "We received your inquiry!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000;">Thank you for your inquiry, ${companyName}!</h1>
          <p style="color: #666; line-height: 1.6;">
            We have received your wholesale inquiry for <strong>${orderQuantity}</strong>.
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
      to: ["sales@sockco.com"], // Replace with actual sales email
      subject: `New Inquiry from ${companyName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000;">New Wholesale Inquiry</h1>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Order Quantity:</strong> ${orderQuantity}</p>
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
