import { Text } from "@react-email/components";
import { EmailLayout, EmailSection } from "./layout";
import { siteConfig } from "@/config/site";

export default function NewsletterConfirmationEmail() {
  return (
    <EmailLayout preview="You're subscribed">
      <EmailSection>
        <Text>You&apos;re on the list.</Text>
        <Text>
          You&apos;ll hear from {siteConfig.shortName} when there&apos;s something real to share — a completed
          program, a new story, or an update on our first fiscal year&apos;s filings. We don&apos;t send filler.
        </Text>
        <Text>
          Didn&apos;t sign up? Reply to this email and we&apos;ll remove you.
        </Text>
      </EmailSection>
    </EmailLayout>
  );
}
