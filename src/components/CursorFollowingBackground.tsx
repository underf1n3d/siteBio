'use client';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface Props {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export const CursorFollowingBackground = ({ mouseX, mouseY }: Props) => {
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px at ${x}px ${y}px, #FF82341A, transparent 80%)`
  );

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background }}
    />
  );
};
