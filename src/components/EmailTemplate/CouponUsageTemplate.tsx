import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import type * as React from 'react';

interface Props {
  commission: string;
  discountCode: string;
}

export const CouponUsageTemplate = ({ commission, discountCode }: Props) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your discount code was used!</Preview>
      <Container style={container}>
        <Hr style={global.hr} />
        <Section style={message}>
          <Img
            src={`https://res.cloudinary.com/dho3hgvne/image/upload/v1744714401/bullish-logo_ukf6ab.png`}
            width="55"
            height="40"
            alt="logo"
            style={{ margin: 'auto' }}
          />
          <Heading style={global.heading}>Your discount code was used</Heading>

          <Text style={{ ...global.text, marginTop: 24 }}>
            Great news! Your discount <b>{discountCode}</b> code was just used
            on our store 🎉 You have earned a commission of ₦
            {Number(commission).toLocaleString()} from this order. This amount has been
            successfully recorded in your dashboard, and you’ll receive a
            detailed payout summary at the end of the payout cycle. Thank you
            for being an awesome part of our creator community!
          </Text>
        </Section>

        <Hr style={global.hr} />
        <Section style={paddingY}>
          <Row>
            <Link
              style={{
                color: 'black',
              }}
              href="https://www.bullishliving.com/"
            >
              <Text style={{ ...global.heading, color: '#CD9900' }}>
                Bullishliving.com
              </Text>
            </Link>
          </Row>
        </Section>
        <Hr style={{ ...global.hr, marginTop: '12px' }} />
        <Section style={paddingY}>
          <Row>
            <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
              Please contact us if you have any questions.
            </Text>
          </Row>
          <Row>
            <Text style={footer.text}>
              © 2025 Bullishliving. All Rights Reserved.
            </Text>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
);


const paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px',
};

const paddingY = {
  paddingTop: '22px',
  paddingBottom: '22px',
};

const paragraph = {
  margin: '0',
  lineHeight: '2',
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    color: '#CD9900',
    letterSpacing: '-1px',
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: '#747474',
    fontWeight: '500',
  },
  button: {
    border: '1px solid #929292',
    fontSize: '16px',
    textDecoration: 'none',
    padding: '10px 0px',
    width: '220px',
    display: 'block',
    textAlign: 'center',
    fontWeight: 500,
    color: '#000',
  } as React.CSSProperties,
  hr: {
    borderColor: '#E5E5E5',
    margin: '0',
  },
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '10px auto',
  width: '600px',
  maxWidth: '100%',
  border: '1px solid #E5E5E5',
};

const message = {
  padding: '40px 74px',
  textAlign: 'center',
} as React.CSSProperties;

const footer = {
  policy: {
    width: '166px',
    margin: 'auto',
  },
  text: {
    margin: '0',
    color: '#AFAFAF',
    fontSize: '13px',
    textAlign: 'center',
  } as React.CSSProperties,
};
 