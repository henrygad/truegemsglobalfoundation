import { Text } from "@react-email/components";
import { EmailLayout, EmailSection } from "./layout";
import { siteConfig } from "@/config/site";

export default function VolunteerReplyEmail({ name }: { name: string }) {
  return (
    <EmailLayout preview="Thanks for volunteering with us">
      <EmailSection>
        <Text>Hi {name},</Text>
        <Text>
          Thank you for offering your time to {siteConfig.shortName}. We&apos;ve received your volunteer
          application and someone from our team will follow up with next steps.
        </Text>
        <Text>We&apos;re a small, hands-on team — a real person reads every application.</Text>
      </EmailSection>
    </EmailLayout>
  );
}
