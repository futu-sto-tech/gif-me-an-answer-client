import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/ban-types

export const RoundSVG: React.FC = () => {
  const svgVariants = {
    hidden: { rotate: -180 },
    visible: { rotate: 0, transition: { duration: 2 } },
  };

  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)',
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 1)',
    },
  };

  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M38.8619 41.2824C34.5977 44.9774 29.1424 47.0079 23.5 47C10.521 47 0 36.479 0 23.5C0 10.5209 10.521 0 23.5 0C36.479 0 47 10.5209 47 23.5C47 28.5196 45.4255 33.1726 42.7465 36.989L35.25 23.5H42.3C42.2996 19.1671 40.8026 14.9673 38.0622 11.6111C35.3217 8.25488 31.5061 5.9483 27.2608 5.08154C23.0154 4.21478 18.601 4.84104 14.7643 6.8544C10.9276 8.86775 7.90404 12.1446 6.20523 16.1306C4.50642 20.1166 4.23659 24.567 5.4414 28.7291C6.64622 32.8911 9.2517 36.5092 12.8171 38.9714C16.3825 41.4335 20.6889 42.5885 25.0079 42.241C29.3268 41.8934 33.3932 40.0647 36.519 37.0642L38.8619 41.2824Z"
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          default: { duration: 2, ease: 'easeInOut' },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] },
        }}
        // fill="#DD01A1"
      />
    </motion.svg>
  );
};
