import { motion } from 'framer-motion';

export const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.25, ease: 'easeIn' } },
};

export const staggerContainer = (delay = 0) => ({
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: delay } },
});

export const slideArrow = (open) => ({
  initial: { x: 0 },
  animate: { x: open ? 4 : -4, transition: { duration: 0.25 } },
});

export const Motion = motion; 