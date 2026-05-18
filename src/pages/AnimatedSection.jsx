import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

/**
 * AnimatedSection
 * Wraps any content with a scroll-triggered fade-in + slide-up animation.
 *
 * Props:
 *   children   — content to animate
 *   delay      — stagger delay in seconds (default 0)
 *   className  — optional extra classes
 *   direction  — "up" | "down" | "left" | "right" (default "up")
 */
function AnimatedSection({ children, delay = 0, className = "", direction = "up" }) {
    const directionMap = {
        up:    { y: 32,  x: 0   },
        down:  { y: -32, x: 0   },
        left:  { y: 0,   x: 32  },
        right: { y: 0,   x: -32 },
    };

    const initial = { opacity: 0, ...directionMap[direction] };
    const animate = { opacity: 1, y: 0, x: 0 };

    return (
        <motion.div
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, amount: 0.15 }}  // triggers once when 15% visible
            transition={{
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1],  // custom ease-out curve
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default AnimatedSection;