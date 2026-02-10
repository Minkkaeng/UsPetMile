import type { PropsWithChildren, CSSProperties } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
}>;

export default function Container({ className, children, style }: ContainerProps) {
  return (
    <div
      className={`container${className ? ` ${className}` : ""}`}
      style={{
        maxWidth: "80rem",
        margin: "0 auto",
        padding: "0 1.5rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
