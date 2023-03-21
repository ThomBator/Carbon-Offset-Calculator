const Summary = ({ results }) => {
  /*
    Results Object keys 
     maxOffset,
    offsetsByYear,
    maxOffsetYear,
    yearsToNeutral,
    isCarbonNeutral,
    targetOffset,
    countryName,
    
    */

  const percentOffset = (results.maxOffset / results.targetOffset) * 100;
  const percentTwoDecimals = percentOffset.toFixed(2);
  const maxOffsetTons = (results.maxOffset / 1000).toFixed(2);

  return (
    <div
      className="m-auto my-5 bg-light p-5 rounded flex-grow-1"
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
              <strong>{percentTwoDecimals}% </strong>of your annutal carbon
              consumption after{" "}
              <strong>
                {" "}
                {results.yearsToNeutral} years investment in{" "}
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
              after <strong>{results.yearsToNeutral} years</strong> investment
              in {results.maxOffsetYear}!!
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
        <hr />
      </div>
    </div>
  );
};
export default Summary;
