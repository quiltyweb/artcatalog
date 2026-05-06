import * as React from "react";
import { motion } from "motion/react";

type CallToActionButtonProps = {
  title: string;
  link: string;
};

const CallToActionButton: React.FunctionComponent<CallToActionButtonProps> = ({
  title,
  link,
}): React.ReactElement => {
  const ctaButtonStyles = {
    display: "block",
    maxWidth: "max-content",
    color: "white",
    backgroundColor: "#1A202C",
    fontWeight: "bold",
    boxShadow: "0 1px 2px 0 rgba(94, 94, 94, 0.05)",
    borderRadius: "5px",
    fontSize: "1.13rem",
    padding: "0.4rem 1rem",
    margin: "2rem auto 0.5rem",
    textAlign: "center" as const,
  };
  return (
    <motion.a
      href={link}
      className="cta-button"
      whileHover={{ scale: 1.2 }}
      whileFocus={{ scale: 1.2 }}
      style={ctaButtonStyles}
    >
      {title}
    </motion.a>
  );
};

export default CallToActionButton;
