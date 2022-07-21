import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLink = () => {
  const navigate = useNavigate();

  const onClick = () => {};

  return {
    onClick,
  };
};
