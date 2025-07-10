"use client";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForwardedRef } from "@/lib/use-forwarded-ref";
import { cn } from "@/lib/utils";
import { forwardRef, useDeferredValue, useState } from "react";
import Color, { useColorPicker } from "react-best-gradient-color-picker";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  side?:"top"|"left"|"right"|"bottom"
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> &
    ColorPickerProps &
    ButtonProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, side="left", size, ...props },forwardRef  ) => {

    const ref = useForwardedRef(forwardRef);
    const [open, setOpen] = useState(false);

    // Use the hook to get gradient/solid controls
    const { isGradient } = useColorPicker(value || "#FFFFFF", onChange);

    const parsedValue = useDeferredValue(value || "#FFFFFF");
    const bgci = !isGradient
      ? {
          backgroundColor: parsedValue,
        }
      : {
          backgroundImage: parsedValue,
        };

    const bg = {
      background: isGradient ? parsedValue : undefined,
      ...bgci,
    };
    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn("block", className)}
            name={name}
            onClick={() => setOpen(true)}
            size={size}
            style={{
              ...bg,
            }}
            variant="outline"
          >
            <div className="w-6 h-6 rounded" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "w-full min-w-[220px] max-w-xs p-2",
            "max-h-[90vh] overflow-y-auto",
            "flex flex-col"
          )}
          ref={ref}
          side={side}
          sideOffset={20}
          style={{
            // fallback for popover max height on small screens
            maxHeight: "80vh",
            minWidth: 220,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="w-full">
              <Color
                value={parsedValue}
                onChange={onChange}
                className={"!bg-transparent"}
                height={180}
                hidePresets
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };

