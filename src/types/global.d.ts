// global.d.ts
declare module "*.md" {
  import * as React from "react";
  const MDXComponent: React.FC;
  export default MDXComponent;
}

/* ========================
   Pages (src/content/pages)
   ======================== */
declare module "@/content/pages/*.md" {
  import * as React from "react";

  interface PageFrontmatter {
    title: string;
    body: string;
  }

  const MDXComponent: React.FC;
  export const attributes: PageFrontmatter;
  export default MDXComponent;
}

/* ========================
   Posts (src/content/posts)
   ======================== */
declare module "@/content/posts/*.md" {
  import * as React from "react";

  interface PostFrontmatter {
    title: string;
    draft: boolean;
    date: string; // YYYY-MM-DD HH:mm
    image?: string;
    body: string;
  }

  const MDXComponent: React.FC;
  export const attributes: PostFrontmatter;
  export default MDXComponent;
}

/* ========================
   FAQ (src/content/faq)
   ======================== */
declare module "@/content/faq/*.md" {
  import * as React from "react";

  interface FaqFrontmatter {
    question: string;
    answer: string;
    date: string;
  }

  const MDXComponent: React.FC;
  export const attributes: FaqFrontmatter;
  export default MDXComponent;
}

/* ========================
   Features (src/content/features)
   ======================== */
declare module "@/content/features/*.md" {
  import * as React from "react";

  interface FeatureFrontmatter {
    title: string;
    icon?: string;
    description: string;
  }

  const MDXComponent: React.FC;
  export const attributes: FeatureFrontmatter;
  export default MDXComponent;
}

/* ========================
   Fees (src/content/fees)
   ======================== */
declare module "@/content/fees/*.md" {
  import * as React from "react";

  interface FeeFrontmatter {
    name: string;
    type: "percentage" | "fixed";
    amount: number;
    currency: string;
    description?: string;
    active: boolean;
  }

  const MDXComponent: React.FC;
  export const attributes: FeeFrontmatter;
  export default MDXComponent;
}

/* ========================
   Integrations (src/content/integrations)
   ======================== */
declare module "@/content/integrations/*.md" {
  import * as React from "react";

  interface IntegrationFrontmatter {
    name: string;
    logo?: string;
    description: string;
    link?: string;
  }

  const MDXComponent: React.FC;
  export const attributes: IntegrationFrontmatter;
  export default MDXComponent;
}

/* ========================
   Testimonials (src/content/testimonials)
   ======================== */
declare module "@/content/testimonials/*.md" {
  import * as React from "react";

  interface TestimonialFrontmatter {
    name: string;
    role?: string;
    company?: string;
    photo?: string;
    testimonial: string;
  }

  const MDXComponent: React.FC;
  export const attributes: TestimonialFrontmatter;
  export default MDXComponent;
}

/* ========================
   Team (src/content/team)
   ======================== */
declare module "@/content/team/*.md" {
  import * as React from "react";

  interface TeamFrontmatter {
    name: string;
    role: string;
    photo?: string;
    bio: string;
  }

  const MDXComponent: React.FC;
  export const attributes: TeamFrontmatter;
  export default MDXComponent;
}

/* ========================
   Changelog (src/content/changelog)
   ======================== */
declare module "@/content/changelog/*.md" {
  import * as React from "react";

  interface ChangelogFrontmatter {
    title: string;
    date: string;
    changes: string;
  }

  const MDXComponent: React.FC;
  export const attributes: ChangelogFrontmatter;
  export default MDXComponent;
}

/* ========================
   Privacy Policy (src/content/privacy.md)
   ======================== */
declare module "@/content/privacy.md" {
  import * as React from "react";

  interface PrivacyFrontmatter {
    title: string;
    date: string;
    body: string;
  }

  const MDXComponent: React.FC;
  export const attributes: PrivacyFrontmatter;
  export default MDXComponent;
}

/* ========================
   Terms (src/content/terms.md)
   ======================== */
declare module "@/content/terms.md" {
  import * as React from "react";

  interface TermsFrontmatter {
    title: string;
    date: string;
    body: string;
  }

  const MDXComponent: React.FC;
  export const attributes: TermsFrontmatter;
  export default MDXComponent;
}