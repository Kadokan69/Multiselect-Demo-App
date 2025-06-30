import { useEffect, useState } from "react";
import Multiselect from "./component/Multiselect";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  function onSelectionChange(item) {
    if (Array.isArray(item)) {
      setData((prev) => [...prev, ...selectedOptions].sort((a, b) => a.region.localeCompare(b.region)));
      setSelectedOptions([]);
    } else {
      if (selectedOptions.some((i) => i.region === item.region)) {
        setSelectedOptions((prev) => prev.filter((i) => i.region !== item.region));
        setData((prev) => [...prev, item].sort((a, b) => a.region.localeCompare(b.region)));
      } else {
        setSelectedOptions((prev) => [...prev, item]);
        setData((prev) => prev.filter((i) => i.region !== item.region));
      }
    }
  }
  useEffect(() => {
    const getTimezone = async () => {
      try {
        const response = await fetch("http://109.67.155.6:8091/api/Timezones");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const newData = result.reduce((acc, item) => {
          acc.push({ ["region"]: item });
          return acc;
        }, []);

        setData(newData);
      } catch (err) {
        console.log(err);
      }
    };

    getTimezone();
  }, []);

  return (
    <>
      <div className="card gap-25 flex flex-col">
        <Multiselect
          options={data}
          selectedOptions={selectedOptions}
          onSelectionChange={onSelectionChange}
          placeholder="Test"
        />
        <Multiselect
          options={data}
          selectedOptions={selectedOptions}
          onSelectionChange={onSelectionChange}
          placeholder="Test"
        />
      </div>
    </>
  );
}

export default App;
