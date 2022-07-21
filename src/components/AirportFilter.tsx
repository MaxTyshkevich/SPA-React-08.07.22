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

  return (
    <div>
      <select name={name} value={configFilter[name]} onChange={handleChange}>
        {elems.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
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
  }, [configFilter]);

  return (
    <div>
      <h3>AirportFilter:</h3>
      <div className="flex gap-2">
        types :{" "}
        <SelectFilter
          elems={types}
          name={"type"}
          configFilter={configFilter}
          setConfigFilter={setConfigFilter}
        />
        regions :{" "}
        <SelectFilter
          elems={regions}
          name={"region"}
          configFilter={configFilter}
          setConfigFilter={setConfigFilter}
        />
        contries :
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
