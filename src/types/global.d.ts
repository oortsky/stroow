declare module "*.md" {
  import * as React from "react";
  const MDXComponent: React.FC;

  export const attributes: Record<string, any>;
  export default MDXComponent;
}