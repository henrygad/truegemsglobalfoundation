import { Text } from "@react-email/components";
import { EmailLayout, EmailSection } from "./layout";
import { siteConfig } from "@/config/site";

export default function TestimonialReplyEmail({ name }: { name: string }) {
  return (
    <EmailLayout preview="Thanks for sharing your experience">
      <EmailSection>
        <Text>Hi {name},</Text>
        <Text>
          Thank you for taking the time to share your experience with {siteConfig.shortName}. Our team
          reviews every submission before it&apos;s published — you&apos;ll see it on our testimonials page once
          it&apos;s up.
        </Text>
      </EmailSection>
    </EmailLayout>
  );
}
