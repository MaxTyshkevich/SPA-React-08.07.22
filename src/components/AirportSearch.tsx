import { useEffect, useState } from "react";
import axios from "../axios";
import { useDebounce } from "../hook/debaunce";
import { useInput } from "../hook/input";
import { useOpenSearch } from "../hook/openSearch";
import { IAirport, ServerResponse } from "../models/models";

export const AirportSearch = () => {
  const input = useInput();
  const debaunceInput = useDebounce(input.value);

  const [showSearch, setShowSearch] = useState<IAirport[]>([]);
  const { isOpen, handler } = useOpenSearch();

  useEffect(() => {
    axios
      .get<ServerResponse<IAirport>>("airports", {
        params: { search: debaunceInput, count: 10 },
      })
      .then(({ data }) => setShowSearch(data.results));
  }, [debaunceInput]);

  return (
    <div className="border py-2 px-4 mb-4 relative">
      <input
        type="text"
        className="outline-none w-full"
        placeholder="Search airport"
        {...input}
        {...handler}
      />

      {isOpen && (
        <ul className="list-none  absolute  h-[200px] right-0 left-0 shadow-md top-[42px] bg-white overflow-y-auto">
          {showSearch.map((item) => (
            <li
              key={item.id}
              className="py-2  px-4 hover:bg-gray-500 hover:transition-colors cursor-pointer"
            >
              {item.name} {item.country}: {item.region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
