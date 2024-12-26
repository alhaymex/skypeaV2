import { db } from "@/db";
import { users } from "@/db/schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    // Catch the event type
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    // Check signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
    const hmac = crypto.createHmac("sha256", secret as string);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    console.log(body);

    // Logic according to event
    if (eventType === "order_created") {
      console.log(body.data.attributes);
      const userId = body.meta.custom_data.user_id;
      const isSuccessful = body.data.attributes.status === "paid";

      //   if (isSuccessful) {
      //     await db
      //       .update(users)
      //       .set({
      //         plan: "pro",
      //         subscriptionEndsAt: new Date(body.data.attributes.ends_at),
      //       })
      //       .where(eq(users.id, userId));
      //   }
    }

    return Response.json({ message: "Webhook received" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
