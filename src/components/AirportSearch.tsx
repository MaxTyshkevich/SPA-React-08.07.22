import { useInput } from "../hook/input";

export const AirportSearch = () => {
  const { value, handleChangeValue } = useInput();

  return (
    <div className="border py-2 px-4 mb-4">
      <input
        type="search"
        className="outline-none w-full"
        placeholder="Search airport"
        value={value}
        onChange={handleChangeValue}
      />
    </div>
  );
};
