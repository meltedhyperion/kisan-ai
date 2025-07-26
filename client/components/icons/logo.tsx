import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("text-primary", props.className)}
      {...props}
    >
      <path d="M216,96a8,8,0,0,1-8,8H177.34a48,48,0,0,1-33.15,39.09A40,40,0,1,1,144,72a8,8,0,0,1,0-16,56.06,56.06,0,0,0-56,56,8,8,0,0,1-16,0,72.08,72.08,0,0,1,72-72,8,8,0,0,1,0,16,55.49,55.49,0,0,0,1.38,12.3A64,64,0,0,1,208,32a8,8,0,0,1,8,8,80.11,80.11,0,0,0-63.1,39.59A32,32,0,0,0,177.34,88H208A8,8,0,0,1,216,96Z" />
    </svg>
  );
}
