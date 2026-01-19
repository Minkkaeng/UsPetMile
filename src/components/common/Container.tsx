import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export default function Container({ className, children }: ContainerProps) {
  return <div className={`container${className ? ` ${className}` : ""}`}>{children}</div>;
}
