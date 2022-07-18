import { useState } from "react";

export const useOpenSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onFocus = () => {
    setIsOpen(true);
  };

  const onBlur = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    handler: {
      onFocus,
      onBlur,
    },
  };
};
