'use server';

import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

import { OrderCreatedTemplate } from '@/components/EmailTemplate/OrderCreatedTemplate';
import { PartnershipRequestTemplate } from '@/components/EmailTemplate/PartnershipTemplate';

import CartItem from '@/types/CartItem';

import { EMAIL_PASS, EMAIL_USER } from './privateKeys';

interface EmailProps {
  customerDetails: {
    name: string;
    email: string;
    address: string;
  }
  cartItems:CartItem[]
}

export interface PartnershipDetails {
  name: string;
  email: string;
  phone: string;
  socialLinks: string[];
  role: string;
  reason: string;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, 
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

export async function sendOrderDetails({ cartItems, customerDetails}: EmailProps) {
  const template = await render(OrderCreatedTemplate({
    cartItems,
    customerAddress: customerDetails.address,
    customerName: customerDetails.name
  }))

  return await transporter.sendMail({
    from: '"Bullishliving" <Info@bullishliving.com>',
    to: customerDetails.email,
    subject: 'Your Bullishliving Order',
    html: template
  })
}

export async function sendPartnershipDetails({ email, name, phone, reason, role, socialLinks}: PartnershipDetails) {
  const template = await render(PartnershipRequestTemplate({email, name, phone, reason, role, socialLinks}))

  return await  transporter.sendMail({
    from: '"Bullishliving" <Info@bullishliving.com>',
    to:'Info@bullishliving.com',
    subject: 'New Partnership request',
    replyTo: email,
    html: template
  })
}
