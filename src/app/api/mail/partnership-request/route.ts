import { NextRequest, NextResponse } from 'next/server';

import { PartnershipDetails, sendPartnershipDetails } from '@/utils/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const partnershiDetails: PartnershipDetails = body;

    const response = await sendPartnershipDetails(partnershiDetails);

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
