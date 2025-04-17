import { NextRequest } from "next/server";
import { Api } from "@/api/supabaseService";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY!;
  const rawBody = await req.arrayBuffer();
  const body = Buffer.from(rawBody);
  const signature = req.headers.get("x-paystack-signature");

  const crypto = await import("crypto");
  const hash = crypto
    .createHmac("sha512", secret)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return new Response(JSON.stringify({ message: "Invalid signature" }), {
      status: 401,
    });
  }

  const event = JSON.parse(body.toString());

  if (event.event === "charge.success") {
    await Api.verifyPayment(event.data.metadata.reference)
  }


  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
