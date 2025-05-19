import CartItem from '@/types/CartItem';
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
  cartItems: CartItem[];
  customerName: string
  customerAddress: string
}

export const OrderCreatedTemplate = ({
  cartItems,
  customerName,
  customerAddress,
}: Props) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        Get your order summary, estimated delivery date and more
      </Preview>
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
          <Heading style={global.heading}>You order has been placed.</Heading>
          <Text style={global.text}>You order has been placed</Text>
          <Text style={{ ...global.text, marginTop: 24 }}>
            Hi {customerName}, Thank you for your order with Bullishliving!
            We´re working on getting it delivered to you. We appreciate your
            patience. You´ll receive a delivery update soon.
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>Shipping to: {customerName}</Text>
          <Text style={{ ...global.text, fontSize: 14 }}>
            {customerAddress}
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>Order Details</Text>

          <Section className="py-[16px] text-center">
            <Section className="my-[16px] rounded-[8px] border border-solid border-gray-200 p-[16px] pt-0">
              <table className="mb-[16px]" width="100%">
                <tr>
                  <th className="border-0 border-b border-solid border-gray-200 py-[8px]">
                    &nbsp;
                  </th>
                  <th
                    align="left"
                    className="border-0 border-b border-solid border-gray-200 py-[8px] text-gray-500"
                    colSpan={6}
                  >
                    <Text className="font-semibold">Product</Text>
                  </th>
                  <th
                    align="center"
                    className="border-0 border-b border-solid border-gray-200 py-[8px] text-gray-500"
                  >
                    <Text className="font-semibold">Quantity</Text>
                  </th>
                </tr>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-0 border-b border-solid border-gray-200 py-[8px]">
                      <Img
                        alt={item.product_name}
                        className="rounded-[8px] object-cover"
                        height={80}
                        src={item.product_image}
                      />
                    </td>
                    <td
                      align="left"
                      className="border-0 border-b border-solid border-gray-200 py-[8px]"
                      colSpan={6}
                    >
                      <Text>{item.product_name}</Text>
                    </td>
                    <td
                      align="center"
                      className="border-0 border-b border-solid border-gray-200 py-[8px]"
                    >
                      <Text>{item.quantity}</Text>
                    </td>
                  </tr>
                ))}
              </table>
            </Section>
          </Section>
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
