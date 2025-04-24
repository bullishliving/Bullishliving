"use client";

import useToggle from "./useToggle";

import CartItem from "@/types/CartItem";

type PaystackUser = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export default function usePayment(cartItems: CartItem[], user: PaystackUser, deliveryFee: number, discountPercentage?: number) {  
  const loading = useToggle();
    
  const handlePayment = async () => {
    loading.on()

    const res = await fetch("/api/paystack/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        userDetails: user,
        deliveryFee,
        discountPercentage
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Init error:", text);
      loading.off();
      return;
    }

    const data = await res.json();
    
    loading.off()

    if (!data?.reference || !data.publicKey) {
      console.log("Payment failed to initialize", data);
      return;
    } 

    return  {
      reference: data.reference,
      email: data.email,
      amount: data.totalAmount,
      orderAmount: data.amount,
      publicKey: data.publicKey,
      metadata: {
        reference: data.reference,
      }
    };
    
  };



  return {
    pay: handlePayment,
    loading: loading.value,
  };
}
