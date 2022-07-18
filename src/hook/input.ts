import { ChangeEvent, useState } from "react";

export const useInput = (initValue = "") => {
  const [value, setValue] = useState(initValue);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return { value, handleChangeValue };
};
