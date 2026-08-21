import { Text } from "@react-email/components";
import { EmailLayout, EmailSection } from "./layout";
import { siteConfig } from "@/config/site";

export default function ContactReplyEmail({ name }: { name: string }) {
  return (
    <EmailLayout preview="We received your message">
      <EmailSection>
        <Text>Hi {name},</Text>
        <Text>
          Thanks for reaching out to {siteConfig.shortName}. We&apos;ve received your message and someone from
          our team will reply within 24 hours.
        </Text>
        <Text>
          If it&apos;s urgent, you can also reach us directly at {siteConfig.contact.phone}.
        </Text>
      </EmailSection>
    </EmailLayout>
  );
}
