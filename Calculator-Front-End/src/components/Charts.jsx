import ExpenditureChart from "./ExpenditureChart";
import OffsetChart from "./OffsetChart";

const Charts = ({ results }) => {
  console.log("offsets", results.offsetsByYear);
  console.log("expenditures", results.expendituresByYear);

  return (
    <div
      className="my-5 bg-light p-5 rounded flex-grow-1 shadow"
      style={{ maxWidth: "600px" }}
    >
      <OffsetChart data={results.offsetsByYear} />
      <ExpenditureChart data={results.expendituresByYear} />
    </div>
  );
};

export default Charts;
