import { siteConfig } from "@/config/site";

/**
 * The four questions that actually block a donation (AGENTS brief), for the
 * homepage FAQ section (src/components/home/faq-chapter.tsx). This file
 * wasn't consumed anywhere before this — no duplicate, more general FAQ set
 * exists elsewhere to drift out of sync with it.
 */

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Is my gift tax-deductible?",
    answer: `Yes. ${siteConfig.name} is a ${siteConfig.legalStatus}, and you'll receive an emailed receipt for your records with every donation.`,
  },
  {
    question: "Where does the money go?",
    answer:
      "Directly to the programs described on this site — food relief, health outreach, and direct community support. TrueGems incorporated in 2025, so a full audited allocation breakdown isn't available yet — our first fiscal year hasn't closed. We'd rather say that plainly than estimate a number now; real figures will publish on our transparency page as soon as they exist.",
  },
  {
    question: "Can I give from Nigeria?",
    answer:
      "Yes — the donation form accepts international cards through Stripe. Some Nigerian bank cards restrict international or USD transactions; if yours is declined for that reason, contact us and we'll arrange another way for you to give.",
  },
  {
    question: "How do I know it arrived?",
    answer:
      "You'll see an on-screen confirmation the moment your payment completes, and Stripe emails you a receipt right away. If anything looks off, reach out through our contact page and a real person will look into it.",
  },
];
