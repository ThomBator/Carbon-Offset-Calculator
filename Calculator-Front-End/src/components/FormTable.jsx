import { useState } from "react";
import { Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const FormTable = () => {
  const { register, control } = useForm({
    defaultValues: {
      purchase: [{ year: 2023, trees: 1 }],
    },
  });

  //Want to ensure users can only select a year once, new year rows should increment
  const [latestYear, setLatestYear] = useState(2023);
  const [years, setYears] = useState([
    2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033,
  ]);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "purchase",
      control,
    }
  );

  //It should be impossible to select the same year twice
  //Maybe this is hanlded here or perhaps something easier in the use-form api
  const handleAppend = () => {
    const year = latestYear + 1;
    const yearExists = fields.some((field) => field.year === year);
    if (yearExists) {
      alert(`The year ${year} already exists in the form.`);
    } else {
      append({
        year,
        trees: 1,
      });
      setLatestYear(year);
      if (!years.includes(year)) {
        setYears([...years, year]);
      }
    }
  };

  //Handle delete should reset latestYear to smallest un-used year - 1

  const handleSubmit = (data) => {
    console.log(data);
  };

  const countries = [
    "United States",
    "United Kingdom",
    "Germany",
    "South Africa",
    "India",
    "China",
    "Singapore",
    "Australia",
  ];

  return (
    <div
      className="m-auto my-5 bg-light p-5 rounded"
      style={{ maxWidth: "600px" }}
    >
      <div className="mb-3">
        <h2 className="display-6 mb-2">Carbon Offset Simulator</h2>
        <p className="fs-5 mb-5 text-muted">
          Simulate tree planting purchases. See how long it will take to reach
          personal carbon neutrality!
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="country">
            <strong>Country:</strong>
          </label>

          <select className="ms-2 mb-4 px-1">
            {countries.map((country) => (
              <option value={country}>{country}</option>
            ))}
          </select>
        </div>
        <h3 className="mb-3">Your Purchases</h3>
        <Table responsive>
          <thead>
            <tr>
              <th>Year</th>
              <th>Number of Trees</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              return (
                <tr key={index}>
                  <td>
                    <select
                      {...register(`purchase.${index}.year`, {
                        required: true,
                      })}
                      className="px-1"
                    >
                      {years.map((year) => (
                        <option>{year}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      {...register(`purchase.${index}.trees`, {
                        required: true,
                        max: 55,
                        min: 1,
                      })}
                      style={{ width: "120px" }}
                      type="number"
                      min={1}
                      max={55}
                    />
                  </td>
                  <td>
                    {" "}
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="btn btn-secondary "
                    >
                      <FaTrashAlt color="white" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <button
          type="button"
          onClick={handleAppend}
          className="text-start btn btn-secondary mb-3"
        >
          Add Row
        </button>
      </form>
      <div className="d-flex justify-content-between align-items-center gap-5 mt-5">
        <button className="btn btn-secondary">Simulate Purchase</button>
        <p className="fs-5">
          <strong>Total Trees Planted: 500</strong>
        </p>
      </div>
    </div>
  );
};

export default FormTable;
