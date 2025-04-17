import { NextResponse, NextRequest } from 'next/server';

import CartItem from '@/types/CartItem';

import { createClient } from "@/utils/supabase/supabaseClient";
import {  NEXT_PUBLIC_PAYSTACK_KEY, PAYSTACK_SECRET_KEY } from '@/utils/privateKeys';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cartItems, userDetails, deliveryFee } = body;

    if (!cartItems?.length || !userDetails?.email) {
      return NextResponse.json({ error: "Missing cart items or user details" }, { status: 400 });
    }

    const formattedCartItems : {id: number, quantity: number}[]  = cartItems.map((item: CartItem)=> ({
      id: item.product_id,
      quantity: item.quantity
    }))

    const { data: amount, error } = await createClient().rpc("verify_total_amount", {
      items: formattedCartItems,
    });

    if (error || !amount) {
      return NextResponse.json({ error: `Failed to calculate amount: ${error?.message}` }, { status: 400 });
    }

    const totalKoboAmount = (amount + deliveryFee) * 100;

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userDetails.email,
        amount: totalKoboAmount,
        metadata: {
          id: 'this is some random value'
        },
      }),
    });

    const result = await res.json();
    
    if (!res.ok || !result?.data) {
      console.error("Paystack Error:", result);
      return NextResponse.json({ error:   `Paystack failed to initialize transaction ${result.message}` }, { status: 500 });
    }
    
    return NextResponse.json({
      reference: result.data.reference,
      authorization_url: result.data.authorization_url,
      amount: totalKoboAmount,
      publicKey: NEXT_PUBLIC_PAYSTACK_KEY, 
      email: userDetails.email,
      metadata: result.data.metadata,
    });
  } catch (err: any) {
    console.error("Unexpected Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
