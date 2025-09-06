import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Section = ({ title, subtitle, right, children }) => (
  <Card className="rounded-2xl shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </div>
        {right ? <div>{right}</div> : null}
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export const Pill = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 ${className}`}>{children}</span>
);
