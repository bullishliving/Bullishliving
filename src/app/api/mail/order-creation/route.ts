import { NextRequest, NextResponse } from 'next/server';
import { sendOrderDetails } from '@/utils/mail';
import CartItem from '@/types/CartItem';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { cartItems, customerDetails } : { cartItems: CartItem[], customerDetails: {
      name: string;
      email: string;
      address: string;
    }} = body;

    const response = await sendOrderDetails({
      cartItems: cartItems,
      customerDetails
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data: response },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);

    return NextResponse.json(
      { success: false, message: 'Failed to send email', error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
