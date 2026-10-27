import type { ReactNode } from "react";
import { Link } from "react-router";
import { Card } from "./Card";

interface LinkCardProps {
  to: string;
  children: ReactNode;
}

// A card that opens another page when clicked.
export function LinkCard({ to, children }: LinkCardProps) {
  return (
    <Link
      to={to}
      className="block rounded-card outline-offset-2 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent"
    >
      <Card>{children}</Card>
    </Link>
  );
}
