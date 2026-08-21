import { Text } from "@react-email/components";
import { EmailLayout, EmailSection } from "./layout";
import { siteConfig } from "@/config/site";

export default function DonationThankYouEmail({
  name,
  amount,
  donationType,
  receiptUrl,
}: {
  name: string;
  amount: number;
  donationType: "one-time" | "monthly";
  receiptUrl?: string;
}) {
  return (
    <EmailLayout preview="Thank you for your donation">
      <EmailSection>
        <Text>Hi {name},</Text>
        <Text>
          Thank you for your {donationType === "monthly" ? "monthly" : ""} gift of ${amount.toFixed(2)} to{" "}
          {siteConfig.shortName}. It goes directly to the work described on our site — food relief, health
          outreach, and direct community support in Maryland, Nigeria, and Africa.
        </Text>
        <Text>
          As a {siteConfig.legalStatus}, your donation is generally tax-deductible to the extent allowed by
          law. This email serves as your receipt — no goods or services were provided in exchange for this
          donation.
        </Text>
        {receiptUrl && (
          <Text>
            <a href={receiptUrl} style={{ color: "#488010" }}>
              View your official Stripe receipt
            </a>
          </Text>
        )}
        <Text>
          Field-cost figures and allocation reporting publish as they&apos;re verified — see our{" "}
          <a href={new URL("/transparency", siteConfig.baseUrl).toString()} style={{ color: "#488010" }}>
            transparency page
          </a>
          .
        </Text>
      </EmailSection>
    </EmailLayout>
  );
}
