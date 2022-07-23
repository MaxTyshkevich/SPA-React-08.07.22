import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hook/redux";
import { filter } from "../store/slices/airportSlice";

export interface IConfigFliter {
  type: string;
  region: string;
  country: string;
}

interface SelectFilterProps {
  elems: string[];
  name: "type" | "country" | "region";
  configFilter: IConfigFliter;

  setConfigFilter: React.Dispatch<React.SetStateAction<IConfigFliter>>;
}

const SelectFilter = ({
  elems,
  name,
  configFilter,
  setConfigFilter,
}: SelectFilterProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newFilter = { ...configFilter };
    newFilter[name] = event.target.value;
    setConfigFilter(newFilter);
  };

  return !!elems.length ? (
    <div>
      {name}:
      <select name={name} value={configFilter[name]} onChange={handleChange}>
        <option value="">All</option>
        {elems.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  ) : null;
};

export const AirportFilter = () => {
  const dispatch = useDispatch();
  const { contries, loading, regions, types } = useAppSelector(
    (state) => state.handbooks
  );

  const [configFilter, setConfigFilter] = useState({
    type: "",
    region: "",
    country: "",
  });

  useEffect(() => {
    dispatch(filter(configFilter));
  }, [configFilter, dispatch]);

  return (
    <div>
      <h3>AirportFilter:</h3>
      <div className="flex gap-x-9 ">
        <SelectFilter
          elems={types}
          name={"type"}
          configFilter={configFilter}
          setConfigFilter={setConfigFilter}
        />

        <SelectFilter
          elems={regions}
          name={"region"}
          configFilter={configFilter}
          setConfigFilter={setConfigFilter}
        />

        <SelectFilter
          elems={contries}
          name={"country"}
          configFilter={configFilter}
          setConfigFilter={setConfigFilter}
        />
      </div>
    </div>
  );
};
