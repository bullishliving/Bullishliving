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
  name: string;
  email: string;
  phone: string;
  socialLinks: string[];
  role: string;
  reason: string;
}

export const PartnershipRequestTemplate = ({
  name,
  email,
  phone,
  socialLinks,
  role,
  reason,
}: Props) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>New partnership request received from {name}</Preview>
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
          <Heading style={global.heading}>New Partnership Request</Heading>
          <Text style={global.text}>
            You have received a new partnership request.
          </Text>
          <Text style={{ ...global.text, marginTop: 24 }}>
            <strong>Name:</strong> {name}
            <br />
            <strong>Email:</strong> {email}
            <br />
            <strong>Phone:</strong> {phone}
            <br />
            <strong>Role:</strong> {role}
          </Text>
        </Section>

        <Hr style={global.hr} />

        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>Social Media Links:</Text>
          <ul style={{ paddingLeft: 16 }}>
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Link href={link} style={{ color: '#0070f3', fontSize: 14 }}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Hr style={global.hr} />

        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>Reason for Partnering:</Text>
          <Text style={{ ...global.text, fontSize: 14 }}>{reason}</Text>
        </Section>

        <Hr style={global.hr} />

        <Section style={paddingY}>
          <Row>
            <Link
              href="https://www.bullishliving.com/"
              style={{ color: 'black' }}
            >
              <Text style={global.heading}>Bullishliving.com</Text>
            </Link>
          </Row>
        </Section>

        <Hr style={{ ...global.hr, marginTop: '12px' }} />

        <Section style={paddingY}>
          <Row>
            <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
              Please reach out if you need more info about this request.
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

// Same styles as your original OrderCreatedTemplate
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

const adressTitle = {
  ...paragraph,
  fontSize: '15px',
  fontWeight: 'bold',
};

const footer = {
  text: {
    margin: '0',
    color: '#AFAFAF',
    fontSize: '13px',
    textAlign: 'center',
  } as React.CSSProperties,
};
