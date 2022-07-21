import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useDebounce } from "../hook/debaunce";
import { useInput } from "../hook/input";
import { useOpenSearch } from "../hook/openSearch";
import { IAirport, ServerResponse } from "../models/models";

export const AirportSearch = () => {
  const input = useInput();
  const debaunceInput = useDebounce(input.value);

  const [showSearch, setShowSearch] = useState<IAirport[]>([]);
  const { isOpen, ref } = useOpenSearch();

  const navigate = useNavigate();

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
        ref={ref}
      />

      {isOpen && (
        <ul className="list-none  absolute  h-[200px] right-0 left-0 shadow-md top-[42px] bg-white overflow-y-auto">
          {showSearch.map((item) => (
            <li
              onClick={() => {
                console.log(`onClick: `, item.id);
                navigate(`/airport/${item.id}`);
              }}
              key={item.id}
              className="py-2  px-4 hover:bg-gray-500 hover:transition-colors cursor-pointer hover:text-lime-50"
            >
              {item.name} {item.country}: {item.region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
