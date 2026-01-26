/// <reference types="vite/client" />

import type {
  Meta,
  StoryFn,
  StoryObj,
  ArgsTable as ArgsTableBlock,
} from "@storybook/blocks";

declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  const MDXContent: (props: MDXProps) => React.ReactElement;
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
