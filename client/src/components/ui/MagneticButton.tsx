/**
 * MagneticButton — premium hover-follow button with liquid feel
 */

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  onClick?: () => void;
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  onClick,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide rounded-full transition-colors duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-[#EB0028] text-white hover:bg-[#c50022]",
    outline:
      "border border-white/20 text-white hover:border-[#EB0028] hover:text-[#EB0028] bg-transparent",
    ghost:
      "text-white/60 hover:text-white bg-transparent",
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
      {/* Liquid glow on hover */}
      {isHovered && variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(235, 0, 40, 0.3) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Tag>
  );
}
