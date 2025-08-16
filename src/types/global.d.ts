declare module "*.md" {
  import * as React from "react";

  // ----------- GENERIC COMPONENT EXPORT -----------
  const MDXComponent: React.FC;
  export default MDXComponent;
}

// ----------- PAGES (src/content/pages) -----------
declare module "@/content/pages/*.md" {
  export interface PageFrontmatter {
    title: string;
    body: string; // markdown
  }
  export const attributes: PageFrontmatter;
}

// ----------- POSTS (src/content/posts) -----------
declare module "@/content/posts/*.md" {
  export interface PostFrontmatter {
    title: string;
    draft: boolean;
    date: string; // "YYYY-MM-DD HH:mm"
    image?: string;
    body: string;
  }
  export const attributes: PostFrontmatter;
}

// ----------- FAQ (src/content/faq) -----------
declare module "@/content/faq/*.md" {
  export interface FaqFrontmatter {
    question: string;
    answer: string; // markdown
    date: string;
  }
  export const attributes: FaqFrontmatter;
}

// ----------- FEATURES (src/content/features) -----------
declare module "@/content/features/*.md" {
  export interface FeatureFrontmatter {
    title: string;
    icon?: string;
    description: string; // markdown
  }
  export const attributes: FeatureFrontmatter;
}

// ----------- FEES (src/content/fees) -----------
declare module "@/content/fees/*.md" {
  export interface FeeFrontmatter {
    name: string;
    type: "percentage" | "fixed";
    amount: number;
    currency: string;
    description?: string;
    active: boolean;
  }
  export const attributes: FeeFrontmatter;
}

// ----------- INTEGRATIONS (src/content/integrations) -----------
declare module "@/content/integrations/*.md" {
  export interface IntegrationFrontmatter {
    name: string;
    logo?: string;
    description: string;
    link?: string;
  }
  export const attributes: IntegrationFrontmatter;
}

// ----------- TESTIMONIALS (src/content/testimonials) -----------
declare module "@/content/testimonials/*.md" {
  export interface TestimonialFrontmatter {
    name: string;
    role?: string;
    company?: string;
    photo?: string;
    testimonial: string;
  }
  export const attributes: TestimonialFrontmatter;
}

// ----------- TEAM (src/content/team) -----------
declare module "@/content/team/*.md" {
  export interface TeamMemberFrontmatter {
    name: string;
    role: string;
    photo?: string;
    bio: string;
  }
  export const attributes: TeamMemberFrontmatter;
}

// ----------- CHANGELOG (src/content/changelog) -----------
declare module "@/content/changelog/*.md" {
  export interface ChangelogFrontmatter {
    title: string;
    date: string;
    changes: string;
  }
  export const attributes: ChangelogFrontmatter;
}

// ----------- PRIVACY POLICY (src/content/privacy.md) -----------
declare module "@/content/privacy.md" {
  export interface PrivacyFrontmatter {
    title: string;
    date: string;
    body: string;
  }
  export const attributes: PrivacyFrontmatter;
}

// ----------- TERMS & CONDITIONS (src/content/terms.md) -----------
declare module "@/content/terms.md" {
  export interface TermsFrontmatter {
    title: string;
    date: string;
    body: string;
  }
  export const attributes: TermsFrontmatter;
}
