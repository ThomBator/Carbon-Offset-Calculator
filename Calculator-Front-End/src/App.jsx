import { useState } from "react";
import Summary from "./components/Summary";
import OffsetCalc from "./components/OffsetCalc";
import Charts from "./components/Charts";

import axios from "axios";
function App() {
  const [results, setResults] = useState(null);

  const reset = () => {
    setResults(null);
  };

  const handlePost = async (data) => {
    console.log("data made it to hanldePost", data);
    axios
      .post(`http://localhost:3000/api/formData`, data)
      .then((res) => {
        console.log("Response from server", res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {!results && (
        <div className="d-flex flex-column flex-md-row justify-content-center gap-5 mx-5 ">
          <OffsetCalc handlePost={handlePost} />
        </div>
      )}

      {results && (
        <div className="d-flex flex-column flex-md-row justify-content-center gap-5 mx-5 ">
          <Summary results={results} reset={reset} />
          <Charts results={results} />
        </div>
      )}
    </>
  );
}

export default App;
