import { useEffect, useRef, useState } from "react";

export const useOpenSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>();

  const onClick = (event: MouseEvent) => {
    if (!isOpen && event.target === input.current) {
      return setIsOpen(true);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return {
    isOpen,
    ref: input as React.MutableRefObject<HTMLInputElement>,
  };
};
