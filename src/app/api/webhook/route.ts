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
    if (eventType === "order_created") {
      console.log("order_created");

      const purchaseData = {
        email: body.data.attributes.user_email,
        paymentId: body.data.id.toString(),
        totalAmount: body.data.attributes.total,
        currency: body.data.attributes.currency,
        status: body.data.attributes.status,
        orderNumber: body.data.attributes.order_number,
        customerName: body.data.attributes.user_name || null,
        productName: body.data.attributes.first_order_item.product_name,
        productId: body.data.attributes.first_order_item.product_id.toString(),
      };

      console.log(purchaseData);

      const isSuccessful = body.data.attributes.status === "paid";

      if (isSuccessful) {
        await db.insert(purchases).values(purchaseData);
      }
    }

    return Response.json({ message: "Webhook received" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
