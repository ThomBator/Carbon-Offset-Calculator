const Summary = ({ results, reset }) => {
  /*
    Results Object keys 
     maxOffset,
    offsetsByYear,
    maxOffsetYear,
    yearsInvested,
    isCarbonNeutral,
    targetOffset,
    countryName,
    totalExpenditure,
    expendituresByYear, 
    totalTrees
    
    */

  const percentOffset = (results.maxOffset / results.targetOffset) * 100;
  const percentTwoDecimals = percentOffset.toFixed(2);
  const maxOffsetTons = (results.maxOffset / 1000).toFixed(2);

  return (
    <div
      className="my-5 bg-light p-5 rounded flex-grow-1 shadow"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="display-6 mb-2">Simulation Results</h2>
      <p className="fs-5 mb-3 text-muted">
        Here is your carbon offset profile based on your simulated purchases.
      </p>

      <hr />
      <div>
        {!results.isCarbonNeutral && (
          <>
            <h3 className="fs-4 mb-4">Carbon Neutrality Not Met</h3>
            <p className="fs-5">
              Your current purchases are not enough to reach offset{" "}
              {results.countryName} average annual carbon emissions.
            </p>
          </>
        )}

        {results.isCarbonNeutral && (
          <>
            <h3 className="fs-4 mb-4">
              Carbon Neutrality Achieved by {results.maxOffsetYear}!!
            </h3>

            <p className="fs-5">
              With your current purchases you will offset {results.countryName}{" "}
              average annual CO2 emissions after{" "}
              <strong>{results.yearsInvested} years</strong>.
            </p>
          </>
        )}

        <p className="fs-5">
          Max annual offset: <strong>{maxOffsetTons} tons per year.</strong>
        </p>
        <p className="fs-5">
          Percentage of annual CO2 Output:{" "}
          <strong>{percentTwoDecimals}% </strong>
        </p>
        <p className="fs-5">
          Estimated expenditure after {results.yearsInvested} years:{" "}
          <strong>
            ${results.totalExpenditure.toLocaleString("en-US")} USD
          </strong>
          .
        </p>
        <p className="fs-5">
          {" "}
          Annual maintenance costs after {results.yearsInvested} years:{" "}
          <strong>
            $
            {results.expendituresByYear[
              results.expendituresByYear.length - 1
            ].yearlyTotal.toLocaleString("en-US")}{" "}
            USD
          </strong>{" "}
        </p>
        <hr />
        <button type="button" onClick={reset} className="btn btn-secondary">
          Reset Calculator
        </button>
      </div>
    </div>
  );
};
export default Summary;
