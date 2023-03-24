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
            <p className="fs-5">
              Your current purchases are not enough to reach carbon neutrality
              in {results.countryName}.
            </p>
            <p className="fs-5">
              With your current purchases you will be offsetting{" "}
              <strong>{percentTwoDecimals}% </strong>of your annual carbon
              consumption after{" "}
              <strong>
                {" "}
                {results.yearsInvested} years investment in{" "}
                {results.maxOffsetYear}.
              </strong>
            </p>
          </>
        )}

        {results.isCarbonNeutral && (
          <>
            <p className="fs-5"> Congratulations!</p>
            <p className="fs-5">
              With your current purchases you will achieve carbon neutrality
              after <strong>{results.yearsInvested} years</strong> investment in{" "}
              {results.maxOffsetYear}!!
            </p>

            <p className="fs-5">
              At that point you will be offsetting{" "}
              <strong>{percentTwoDecimals}%</strong> of your annual carbon
              consumption in {results.countryName}.
            </p>
          </>
        )}
        <p className="fs-5">
          Your maximum carbon offset is{" "}
          <strong>{maxOffsetTons} tons per year.</strong>
        </p>

        <p className="fs-5">
          Your estimated total expenditure is{" "}
          <strong>
            ${results.totalExpenditure.toLocaleString("en-US")} USD after{" "}
            {results.yearsInvested} years.{" "}
          </strong>
        </p>
        <p className="fs-5">
          {" "}
          The above figure incldues{" "}
          <strong>
            $
            {results.expendituresByYear[
              results.expendituresByYear.length - 1
            ].yearlyTotal.toLocaleString("en-US")}{" "}
            USD
          </strong>{" "}
          annual maintenance costs for each year over your initial investment
          period. That annual fee will have to be paid for as long as you wish
          to continue caring for your trees.
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
