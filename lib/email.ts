import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function sendNewProductEmail(product: any) {
  console.log("========== sendNewProductEmail() ==========");
  console.log("Product:", product);

  const { data: subscribers, error } = await supabase
    .from("newsletter_subscribers")
    .select("email");

  console.log("Subscribers:", subscribers);
  console.log("Supabase Error:", error);

  if (error) {
    console.error("Failed to fetch subscribers:", error);
    return;
  }

  if (!subscribers || subscribers.length === 0) {
    console.log("No newsletter subscribers found.");
    return;
  }

  const topNotes = (() => {
    try {
      return JSON.parse(product.topNotes || "[]").join(", ");
    } catch {
      return "";
    }
  })();

  const middleNotes = (() => {
    try {
      return JSON.parse(product.middleNotes || "[]").join(", ");
    } catch {
      return "";
    }
  })();

  const baseNotes = (() => {
    try {
      return JSON.parse(product.baseNotes || "[]").join(", ");
    } catch {
      return "";
    }
  })();

  for (const { email } of subscribers) {
    console.log(`Sending email to ${email}...`);

    try {
      const result = await resend.emails.send({
        from: "Agape Essence <onboarding@resend.dev>",
        to: email,
        subject: `✨ New Fragrance: ${product.name}`,
        html: `
        <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#111827;padding:40px;border-radius:16px;color:#ffffff">

          ${
            product.gallery?.length
              ? `
                <img
                  src="${product.gallery[0].url}"
                  style="width:100%;border-radius:12px;margin-bottom:24px;"
                />
              `
              : ""
          }

          <h1 style="margin:0;font-size:32px">
            ${product.name}
          </h1>

          <p style="margin-top:16px;color:#d1d5db">
            ${product.description}
          </p>

          <h2 style="color:#fbbf24">
            $${product.price}
          </h2>

          <hr style="margin:24px 0;border-color:#374151">

          <h3>Top Notes</h3>
          <p>${topNotes || "—"}</p>

          <h3>Middle Notes</h3>
          <p>${middleNotes || "—"}</p>

          <h3>Base Notes</h3>
          <p>${baseNotes || "—"}</p>

          <a
            href="https://agape-fragrance.vercel.app/shop/${product.slug}"
            style="
              display:inline-block;
              margin-top:28px;
              background:#f59e0b;
              color:#000;
              padding:14px 28px;
              border-radius:999px;
              text-decoration:none;
              font-weight:bold;
            "
          >
            View Fragrance
          </a>

        </div>
        `,
      });

      console.log(`Email sent to ${email}`);
      console.log("Resend Response:", result);
    } catch (err) {
      console.error(`Failed to send email to ${email}`);
      console.error(err);
    }
  }

  console.log("========== Finished sendNewProductEmail() ==========");
}