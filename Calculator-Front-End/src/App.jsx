import { useState } from "react";
import Summary from "./components/Summary";
import OffsetCalc from "./components/OffsetCalc";
import axios from "axios";
function App() {
  const [results, setResults] = useState(null);
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
    <div className="d-flex justify-content-center">
      <OffsetCalc handlePost={handlePost} />
      {results && <Summary results={results} />}
    </div>
  );
}

export default App;
