declare module "*.md" {
  import * as React from "react";
  const MDXComponent: React.FC;

  export const attributes: Record<string, unknown>;
  export default MDXComponent;
}