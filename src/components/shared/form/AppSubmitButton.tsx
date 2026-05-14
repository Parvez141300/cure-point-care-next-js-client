import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type AppSubmitButtonProps = {
  isPending: boolean;
  children: React.ReactNode;
  className?: string;
  pendingLablel?: string;
  disabled?: boolean;
};

const AppSubmitButton = ({
  isPending,
  children,
  className,
  pendingLablel,
  disabled,
}: AppSubmitButtonProps) => {
  const isDisabled = isPending || disabled;
  return (
    <Button
      disabled={isDisabled}
      type="submit"
      className={cn("w-full", className)}
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin mr-2" aria-hidden={true} size={16} />
          {pendingLablel || "Submitting..."}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default AppSubmitButton;
