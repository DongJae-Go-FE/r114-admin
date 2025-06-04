import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridItemType extends PropsWithChildren {
  className?: string;
  header: ReactNode;
  footer?: ReactNode;
}

function GridItem({ className, header, children, footer }: GridItemType) {
  return (
    <Card className={cn("grid-item group", className)}>
      <CardHeader className="border-b border-gray-200 p-4">{header}</CardHeader>
      <CardContent className="group-has-[.card-footer]:h-[calc(100%-114px)] h-[calc(100%-57px)] p-4">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="border-t border-gray-200 p-4 card-footer">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

export { GridItem };
