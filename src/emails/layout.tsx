import { Body, Container, Head, Hr, Html, Img, Preview, Section, Text } from "@react-email/components";
import { siteConfig } from "@/config/site";

export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) {
  const logoUrl = new URL("/logo.png", siteConfig.baseUrl).toString();

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#f4f4f0", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "32px", maxWidth: "480px" }}>
          <Img src={logoUrl} width="32" height="27" alt={siteConfig.wordmark} />
          <Text style={{ fontSize: "14px", fontWeight: 600, color: "#488010", margin: "8px 0 24px" }}>
            {siteConfig.wordmark}
          </Text>

          {children}

          <Hr style={{ borderColor: "#e5e5e5", margin: "32px 0 16px" }} />
          <Text style={{ fontSize: "12px", color: "#71717a", lineHeight: "1.6" }}>
            {siteConfig.name} · {siteConfig.contact.address.streetAddress},{" "}
            {siteConfig.contact.address.addressLocality}, {siteConfig.contact.address.addressRegion}{" "}
            {siteConfig.contact.address.postalCode}
            <br />
            {siteConfig.contact.email}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailSection({ children }: { children: React.ReactNode }) {
  return <Section style={{ fontSize: "15px", lineHeight: "1.6", color: "#18181b" }}>{children}</Section>;
}
