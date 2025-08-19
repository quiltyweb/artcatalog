import * as React from "react";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";

type CallToActionButtonProps = {
  title: string;
  link: string;
};

const CallToActionButton: React.FunctionComponent<CallToActionButtonProps> = ({
  title,
  link,
}): React.ReactElement => {
  return (
    <LinkBox
      as="div"
      maxW="max-content"
      color="white"
      backgroundColor="gray.800"
      fontWeight="bold"
      boxShadow="sm"
      borderRadius="5px"
      fontSize="1.13rem"
      p="0.4rem 1rem"
      margin="2rem auto 0.5rem"
      textAlign="center"
      aria-label={title}
    >
      <LinkOverlay href={link}>{title}</LinkOverlay>
    </LinkBox>
  );
};

export default CallToActionButton;
