import { motion } from 'framer-motion';

const CookingPotLogo = () => {
  const steamVariants = {
    animate1: {
      y: [-4, -20],
      x: [0, 2, -2, 0],
      opacity: [0.8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    animate2: {
      y: [-4, -20],
      x: [0, -2, 2, 0],
      opacity: [0.8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }
    },
    animate3: {
      y: [-4, -20],
      x: [0, 2, -2, 0],
      opacity: [0.8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }
    }
  };

  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pot-logo"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Pot handles */}
      <path
        d="M8 24C6 24 4 26 4 28"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 24C42 24 44 26 44 28"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pot body */}
      <motion.path
        d="M8 24H40V38C40 40 38 42 36 42H12C10 42 8 40 8 38V24Z"
        fill="#666666"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Pot rim */}
      <motion.path
        d="M6 24C6 22 8 20 10 20H38C40 20 42 22 42 24H6Z"
        fill="#333333"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* S-curved steam */}
      <motion.path
        d="M20 20C20 20 22 18 21 16C20 14 22 12 24 12C26 12 28 14 27 16C26 18 28 20 28 20"
        stroke="#999999"
        strokeWidth="2"
        strokeLinecap="round"
        variants={steamVariants}
        animate="animate1"
      />
      <motion.path
        d="M24 18C24 18 26 16 25 14C24 12 26 10 28 10C30 10 32 12 31 14C30 16 32 18 32 18"
        stroke="#999999"
        strokeWidth="2"
        strokeLinecap="round"
        variants={steamVariants}
        animate="animate2"
      />
      <motion.path
        d="M16 18C16 18 18 16 17 14C16 12 18 10 20 10C22 10 24 12 23 14C22 16 24 18 24 18"
        stroke="#999999"
        strokeWidth="2"
        strokeLinecap="round"
        variants={steamVariants}
        animate="animate3"
      />

      {/* Highlight */}
      <motion.path
        d="M12 28L36 28"
        stroke="#888888"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
    </motion.svg>
  );
};

export default CookingPotLogo;