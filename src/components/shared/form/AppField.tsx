import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import React from "react";

type AppFieldProps = {
  field: AnyFieldApi;
  label: string;
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "date"
    | "checkbox"
    | "radio";
  placeholder?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const AppField = ({
  field,
  label,
  type,
  placeholder,
  append,
  prepend,
  className,
  disabled,
}: AppFieldProps) => {
  // const firstError =
  //   field.state.meta.isTouched && field.state.meta.errors.length > 0
  //     ? field.state.meta.errors[0]?.message;
  //     : null;
  // const hasError = !!firstError;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const hasError = isInvalid;
  return (
    <div className={cn("spece-y-1.5", className)}>
      <Label
        htmlFor={field.name}
        className={cn("font-medium mb-2", hasError && "text-destructive")}
      >
        {label}
      </Label>

      <div className="relative">
        {prepend && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 z-20">
            {prepend}
          </div>
        )}

        <Input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${field.name}-error` : undefined}
          className={cn(
            prepend && "pl-10",
            append && "pr-10",
            hasError && "border-destructive focus-visible:ring-destructive/20",
          )}
        />

        {append && (
          <div className="absolute inset-y-0 right-0 flex items-center z-20">
            {append}
          </div>
        )}

        {/* {hasError && (
          <p
            id={`${field.name}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {firstError}
          </p>
        )} */}
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </div>
  );
};

export default AppField;
