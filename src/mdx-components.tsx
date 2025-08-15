import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

/**
 * This file allows you to provide custom
 * React components to be used in MDX files.
 * You can import and use any React component.
 * Whatever you want, including inline styles,
 * components from other libraries, and more.
 */

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  img: props => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  )
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
