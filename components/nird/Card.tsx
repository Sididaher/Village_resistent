import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "bordered";
}

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  const baseStyles = "rounded-2xl p-6 transition-all duration-300";

  const variants = {
    default: "bg-white shadow-lg hover:shadow-xl",
    glass:
      "bg-white/80 backdrop-blur-md shadow-lg border border-white/20 hover:bg-white/90",
    bordered: "bg-white border-2 border-emerald-200 hover:border-emerald-400",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
