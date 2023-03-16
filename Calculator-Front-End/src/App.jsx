import { useState } from "react";
import { Table } from "react-bootstrap";
import OffsetCalc from "./components/OffsetCalc";
import axios from "axios";
function App() {
  const handlePost = async (data) => {
    console.log("data made it to hanldePost", data);
    axios
      .post(`http://localhost:3000/api/formData`, data)
      .then((res) => {
        console.log("Response from server", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <OffsetCalc handlePost={handlePost} />
    </div>
  );
}

export default App;
