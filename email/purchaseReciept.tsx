import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface YelpRecentLoginEmailProps {
  order: {
    products: {
      name: string;
      quantity: number;
      price: number;
    }[];
    id: string;
    totalPrice: number;
    userId: string;
  };
}

export const YelpRecentLoginEmail = ({ order }: YelpRecentLoginEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Order Confirmation</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row>
              <Img
                src={`https://images3.alphacoders.com/228/228429.jpg`}
                width={620}
                style={image}
              />
            </Row>

            <Row style={boxInfos}>
              <Column>
                <Heading style={{ textAlign: "center" }}>
                  Thank You for Your Purchase!
                </Heading>

                <Text style={paragraph}>
                  Order ID: <b>{order.id}</b>
                </Text>
                <Text style={paragraph}>
                  Total Price: <b>${order.totalPrice}</b>
                </Text>

                {order.products.map((product, index) => (
                  <Text key={index} style={paragraph}>
                    {product.name} - {product.quantity} x ${product.price}
                  </Text>
                ))}

                <Text style={paragraph}>
                  Order Date: {new Date().toLocaleString()}
                </Text>
              </Column>
            </Row>

            <Row style={boxInfos}>
              <Column style={buttonContainer}>
                <Button
                  style={button}
                  href={
                    process.env.NEXT_PUBLIC_SERVER_URL ||
                    "http://localhost:3000"
                  }
                >
                  View Order
                </Button>
              </Column>
            </Row>
          </Section>

          <Text style={footer}>
            © 2025 Your Company Name, All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default YelpRecentLoginEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
};

const content = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const image = {
  width: "100%",
  borderRadius: "5px",
};

const boxInfos = {
  padding: "20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  margin: "10px 0",
};

const buttonContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#007BFF",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "5px",
  textDecoration: "none",
};

const footer = {
  textAlign: "center",
  fontSize: "12px",
  color: "#888888",
};
