import { NextRequest, NextResponse } from 'next/server';
import { sendCouponUsageMail } from '@/utils/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assignee_mail, commission,  discountCode} = body;

    const response = await sendCouponUsageMail({
      commission,
      email: assignee_mail,
      discountCode
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
