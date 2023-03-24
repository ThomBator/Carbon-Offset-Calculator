import { useState } from "react";
import { Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { set, useFieldArray, useForm, useWatch } from "react-hook-form";

const OffsetCalc = ({ handlePost }) => {
  //Data for from dropdowns
  const [years, setYears] = useState([
    2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033,
  ]);

  const countries = [
    { name: "Global", carbon: 4.69 },
    { name: "United States", carbon: 15.52 },
    { name: "United Kingdom", carbon: 5.55 },
    { name: "Gemany", carbon: 9.44 },
    { name: "South Africa", carbon: 6.95 },
    { name: "India", carbon: 1.91 },
    { name: "China", carbon: 7.38 },
    { name: "Singapore", carbon: 8.56 },
    { name: "Australia", carbon: 17.1 },
  ];

  const [currentCountry, setCurrentCountry] = useState(countries[0]);

  const changeCountry = (event) => {
    const newCountry = countries.filter(
      (country) => country.name === event.target.value
    );
    setCurrentCountry(newCountry[0]);
  };

  //This function validates that each year is only used once
  const checkYears = (data) => {
    const formYears = data.map((item) => item.year.toString());

    const uniqueYears = new Set(formYears);

    return formYears.length === uniqueYears.size;
  };

  //React-hook-form functions

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      purchase: [{ year: 2023 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "purchase",
    control,
    rules: {
      required: "Please add at least 1 item",
      validate: (data) =>
        checkYears(data) ||
        "Remove duplicate years. You can only make one purchase per year.",
    },
  });

  //Was finding the docs for displaying errors with useFieldArray unclear for error handling
  //So I just implemented my own solution

  const [error, setError] = useState(null);

  const handleForm = (data, event) => {
    event.preventDefault();
    const formObj = {
      country: currentCountry,
      purchase: data.purchase,
    };
    handlePost(formObj);
    setError(null);
  };

  const formError = (error, event) => {
    console.log("Error", error);
    setError(error);
  };

  return (
    <div
      className="my-5 bg-light p-5 rounded shadow"
      style={{ maxWidth: "600px" }}
    >
      <div className="mb-3">
        <h2 className="display-6 mb-2">Carbon Offset Simulator</h2>
        <p className="fs-5 mb-5 text-muted">
          Simulate tree planting purchases. See how long it will take to reach
          personal carbon neutrality!
        </p>
      </div>

      <form onSubmit={handleSubmit(handleForm, formError)}>
        <div className="mb-4">
          <div className="mb-2">
            <label htmlFor="country">
              <strong> Select Your country:</strong>
            </label>
          </div>
          <select
            className=" mb-4 px-1"
            onChange={changeCountry}
            value={currentCountry.name}
          >
            {countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>

          <p className="fs-4 mt-0">
            Avg. {currentCountry.carbon} metric tons of CO2 per person per year.
          </p>
          <hr />
        </div>

        <h4 className="mb-3">Your Purchases</h4>
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
                <tr key={field.id}>
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
                        required: "Please enter a value",
                        max: {
                          value: 55,
                          message: "You can purchase 55 trees per year max",
                        },
                        min: {
                          value: 1,
                          message: "You must purchase at least 1 tree per year",
                        },
                      })}
                      style={{ width: "120px" }}
                      type="number"
                    />
                    {error?.purchase[index]?.trees?.message && (
                      <p className="alert alert-danger" role="alert">
                        {error?.purchase[index]?.trees?.message}
                      </p>
                    )}
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
        {error?.purchase?.root?.message && (
          <p className="alert alert-danger" role="alert">
            {error?.purchase?.root?.message}
          </p>
        )}
        <button
          type="button"
          onClick={() => append()}
          className="text-start btn btn-secondary mb-3"
        >
          Add Row
        </button>
        <hr />
        <div className="d-flex justify-content-between align-items-center gap-5 mt-5">
          <button className="btn btn-secondary">Simulate Purchase</button>
          <p className="fs-5">
            <strong>
              Total Trees Planted: <TotalTrees control={control} />
            </strong>
          </p>
        </div>
      </form>
    </div>
  );
};

//Helper functions to dynamically update trees total on form
const getTotal = (rows) => {
  let total = 0;
  for (const row of rows) {
    total = total + (Number.isNaN(row.trees) ? 0 : Number(row.trees));
  }
  return total.toString();
};

const TotalTrees = ({ control }) => {
  const treeValues = useWatch({
    control,
    name: "purchase",
  });
  return <span>{getTotal(treeValues)}</span>;
};

export default OffsetCalc;
