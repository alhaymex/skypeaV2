import { db } from "@/db";
import { purchases, users } from "@/db/schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    // Catch the event type
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    // console.log("body", body);

    // Check signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE as string;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    // Logic according to event
    if (eventType === "subscription_created") {
      // console.log("subscription_created");

      const purchaseData = {
        email: body.data.attributes.user_email!,
        status: body.data.attributes.status!,
        renewsAt: new Date(body.data.attributes.renews_at),
        endsAt: new Date(body.data.attributes.ends_at),
        cancelled: body.data.attributes.cancelled!,
      };

      console.log(purchaseData);

      await db.insert(purchases).values(purchaseData);
    }

    return Response.json({ message: "Webhook received" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
