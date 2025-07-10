import React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { LabelProps } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  slotProps?: {
    label?: LabelProps & React.RefAttributes<HTMLLabelElement>;
    container?: React.HTMLAttributes<HTMLDivElement>;
  };
  rightbutton?: React.ReactNode;
  disabled?: boolean;
}

export default function LabelInput({
  slotProps,
  rightbutton,
  disabled,
  ...inputProps
}: Props) {
  return (
    <div
      {...slotProps?.container}
      className={cn(
        "flex w-full items-center gap-2 bg-zinc-50 dark:bg-zinc-600 rounded-lg p-2",
        slotProps?.container?.className
      )}
    >
      <Label htmlFor={inputProps.id} {...slotProps?.label}>
        {slotProps?.label?.children}
      </Label>
      {disabled ? (
        <span
          className={cn(
            "w-full !bg-transparent line-clamp-1 !shadow-none !rounded-none !h-fit !p-0 !border-none !ring-0 !outline-none",
            inputProps.className
          )}
        >{inputProps.value}</span>
      ) : (
        <Input
          {...inputProps}
          className={cn(
            "w-full !bg-transparent !shadow-none !rounded-none !h-fit !p-0 !border-none !ring-0 !outline-none",
            inputProps.className
          )}
        />
      )}
      {rightbutton}
    </div>
  );
}
