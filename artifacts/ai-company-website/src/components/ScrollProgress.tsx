import { motion, useScroll, useSpring } from 'framer-motion';
import { IS_MOBILE } from '@/lib/device';

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-[#00FFA3] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

export default function ScrollProgress() {
  // Scroll-linked springs run JS on every scroll frame — skip on mobile.
  if (IS_MOBILE) return null;
  return <ProgressBar />;
}
