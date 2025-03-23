export const sidebarVariants = {
  open: {
    width: "15rem",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  closed: {
    width: "4rem",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export const chatItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20 }
};
