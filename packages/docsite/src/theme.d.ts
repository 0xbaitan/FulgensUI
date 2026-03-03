declare module "@theme/Heading" {
  import type { ComponentProps, ElementType, ReactElement } from "react";

  export interface Props extends ComponentProps<"h1"> {
    as?: ElementType;
  }

  export default function Heading(props: Props): ReactElement;
}

declare module "@theme/Layout" {
  import type { ReactNode, ReactElement } from "react";

  export interface Props {
    children?: ReactNode;
    title?: string;
    description?: string;
    noFooter?: boolean;
    wrapperClassName?: string;
  }

  export default function Layout(props: Props): ReactElement;
}
