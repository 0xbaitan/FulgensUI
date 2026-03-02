/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  // eslint-disable-next-line no-unused-vars
  const MDXContent: (_props: MDXProps) => HTMLElement;
  export default MDXContent;
}

// Extend for FulgensUI
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.css";
