import clsx from "clsx";
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  slot?: {
    i?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  };
};

export default function Loading({
  children = "loading",
  className,
  slot,
}: Props) {
  return (
    <div
      className={clsx(
        "w-full h-screen flex gap-2 items-center justify-center",
        className
      )}
    >
      <i
        {...slot?.i}
        className={clsx("pi animate-spin pi-spinner", slot?.i?.className)}
      ></i>
      {children}
    </div>
  );
}
