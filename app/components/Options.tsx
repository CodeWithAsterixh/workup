import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { ColorPicker } from "./ui/color-picker";
import { splitCamelCase } from "~/lib/splitCamelCase";

// 1) Describe which rules you support and their “raw” types:
export interface Validator {
  maxLength: number;
  isUrl: boolean;
}

// 2) For each rule we need to store both a value and whether it’s required, plus the input type:
export interface ValidatorRule {
  value: any;
  required: boolean;
  type: "string" | "number" | "boolean";
}

// 3) Map types:
export type ValidatorsMap = Record<string, Record<keyof Validator, ValidatorRule>>;
export type ColorsMap = Record<string, string>;

type SettingsPage = "main" | "validators" | "colors";

const MainPage = ({ onSetPage }: { onSetPage: (page: SettingsPage) => void }) => (
  <div className="space-y-2">
    <button
      className="w-full text-left py-2 px-3 rounded bg-muted/20 hover:bg-muted"
      onClick={() => onSetPage("validators")}
    >
      Validators
    </button>
    <button
      className="w-full text-left py-2 px-3 rounded bg-muted/20 hover:bg-muted"
      onClick={() => onSetPage("colors")}
    >
      Colors
    </button>
  </div>
);

const ValidatorsList = ({
  validators,
  onUpdate,
}: {
  validators: ValidatorsMap;
  onUpdate: (field: string, rule: string, value: any) => void;
}) => {
  if (Object.keys(validators).length === 0) {
    return (
      <div className="w-full py-10 flex items-center justify-center">
        No validator available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(validators).map(([field, rules]) => (
        <div key={field}>
          <h5 className="font-medium mb-1">{field}</h5>
          {Object.entries(rules).map(([rule, cfg]) => (
            <div key={rule} className="flex items-center justify-between mb-2">
              <label htmlFor={`${field}-${rule}`} className="capitalize">
                {rule}
              </label>
              {cfg.type === "boolean" ? (
                <Switch
                  id={`${field}-${rule}`}
                  checked={cfg.value}
                  onCheckedChange={(val) => onUpdate(field, rule, val)}
                />
              ) : (
                <Input
                  id={`${field}-${rule}`}
                  type={cfg.type === "number" ? "number" : "text"}
                  value={cfg.value}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const val = cfg.type === "number" ? Number(raw) : raw;
                    onUpdate(field, rule, val);
                  }}
                  className="border rounded px-2 py-1 w-24"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ColorsList = ({
  colors,
  onUpdate,
  hasValidators,
}: {
  colors: ColorsMap;
  onUpdate: (name: string, value: string) => void;
  hasValidators: boolean;
}) => {
  if (!hasValidators) {
    return (
      <div className="w-full py-10 flex items-center justify-center">
        No Color available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(5rem,_1fr))] gap-2">
      {Object.entries(colors).map(([name, props]) => (
        <div key={name} className="text-sm bg-white rounded-md border-gray-200 border-2 flex p-2 flex-col gap-2 items-center">
          <ColorPicker
            value={props}
            onChange={(e) => onUpdate(name, typeof e === "string" ? e : "#fff")}
            className="w-full aspect-square"
          />
          <em className="font-medium text-xs text-center not-italic">{splitCamelCase(name)}</em>
        </div>
      ))}
    </div>
  );
};

export interface Options { validators?: ValidatorsMap; colors?: ColorsMap }
interface Props {
  onSave: (data: { validators: ValidatorsMap; colors: ColorsMap }) => void;
  options?: Options
}

export default function Options({ onSave, options }: Readonly<Props>) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<SettingsPage>("main");
  // Local editable state:
  const [localValidators, setLocalValidators] = useState(options?.validators||{});
  const [localColors, setLocalColors] = useState(options?.colors||{});

  const handleBack = () => setPage("main");

  const handleSave = () => {
    onSave({ validators: localValidators, colors: localColors });
    setOpen(false);
    setPage("main");
  };

  const updateValidator = (field: string, rule: string, value: any) => {
    setLocalValidators(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [rule]: { ...prev[field][rule as keyof Validator], value }
      }
    }));
  };

  const updateColor = (name: string, value: string) => {
    setLocalColors(col => ({
      ...col,
      [name]: value
    }));
  };

  return (
    <Popover
      onOpenChange={state => {
        setOpen(state);
        if (!state) setPage("main");
      }}
      open={open}
    >
      <PopoverTrigger asChild>
        <Button
          className="size-10 group grid gap-[1px] grid-cols-2 !shadow-none !bg-primary/20 backdrop-blur-lg !p-2"
          onClick={() => setOpen(true)}
          variant="default"
        >
          <span className="size-full bg-blue-700" />
          <span className="size-full bg-purple-700 rotate-45 group-hover:animate-bounce group-hover:[animation-duration:_3s] scale-75" />
          <span className="size-full bg-emerald-700" />
          <span className="size-full bg-gray-700" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] !p-0 max-h-[50vh] scrollable overflow-y-auto max-w-md bg-white/30 backdrop-blur-3xl">
      <div className="w-full bg-white p-2 px-4 sticky top-0 flex items-center gap-2">
        {
          page!=="main"&&<button onClick={handleBack} className="p-1">
          <ChevronLeft className="w-5 h-5" />
        </button>
        }
        <h4 className="text-md font-semibold">{page.charAt(0).toUpperCase() + page.slice(1)}</h4>

      </div>
        <div className="w-full p-4">
          {page === "main" && <MainPage onSetPage={setPage} />}
          {page === "validators" && (
            <ValidatorsList validators={localValidators} onUpdate={updateValidator} />
          )}
          {page === "colors" && (
            <ColorsList
              colors={localColors}
              onUpdate={updateColor}
              hasValidators={Object.keys(localValidators).length > 0}
            />
          )}
        </div>

        {/* Save button */}
        <div className="flex justify-end mt-4 p-2 sticky bottom-0">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

