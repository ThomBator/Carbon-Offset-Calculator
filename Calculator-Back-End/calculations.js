const calculations = (data) => {
  const sortedPurchases = data.purchase.sort(
    (a, b) => Number(a.year) - Number(b.year)
  );

  const yearlyCarbon = Number(data.country.carbon) * 1000;
  const countryName = data.country.name;

  const offsetResults = offsetCalculator(sortedPurchases, yearlyCarbon);

  const expenditureResults = expenditureCalculator(
    sortedPurchases,
    offsetResults.yearsInvested
  );

  const combinedResults = {
    ...offsetResults,
    ...expenditureResults,
    countryName,
  };

  return combinedResults;
};

const expenditureCalculator = (purchases, years) => {
  let currentYear = Number(purchases[0].year);
  let endYear = currentYear + years;
  let treesToMaintain = 0;
  let totalExpenditure = 0;

  let index = 0;
  const expendituresByYear = [];
  while (currentYear <= endYear) {
    let yearlyTotal = 0;
    if (index < purchases.length) {
      yearlyTotal += Number(purchases[index].trees) * 120;
      treesToMaintain += Number(purchases[index].trees);
      index += 1;
    }
    if (treesToMaintain > 0) {
      yearlyTotal += treesToMaintain * 12;
    }

    const yearlyExpendature = { currentYear, yearlyTotal };
    expendituresByYear.push(yearlyExpendature);

    totalExpenditure += yearlyTotal;

    currentYear += 1;
  }
  return { totalExpenditure, expendituresByYear, totalTrees: treesToMaintain };
};

const offsetCalculator = (sortedPurchases, yearlyCarbon) => {
  //Avg. CO 2 per person in tons must be converted to kg for comparison

  //Sorting purchases in order of year in case they are submitted out of order
  //This will make the math easier

  //Linear growth is assumed for carbon offsetting for simplicity
  //Tree is mature at 6 years. 28.5/6 - 4.75
  //Plan is to start at 4.75 in year 1 (i.e. 1 year after purchase).
  //Then will increment by 4.75 until trees are mature
  sortedPurchases.forEach((purchase) => (purchase.offset = 4.75));

  //Increments current year being simulated
  let currentYear = Number(sortedPurchases[0].year);

  //Keeps count of total years to neutrality
  let years = 0;
  let yearlyOffset = 0;
  let isCarbonNeutral = false;
  const offsetsByYear = [];

  while (yearlyOffset < yearlyCarbon && years < sortedPurchases.length + 6) {
    yearlyOffset = 0;
    let allTreesMature = true;
    for (let purchase of sortedPurchases) {
      if (Number(purchase.year) > currentYear) {
        break;
      }
      yearlyOffset += +purchase.trees * purchase.offset;
      if (purchase.offset < 28.5) {
        allTreesMature = false;
        purchase.offset += 4.75;
      }
    }
    //forLoopEnded

    const offsetsByYearObj = { currentYear, yearlyOffset };

    offsetsByYear.push(offsetsByYearObj);

    if (yearlyOffset >= yearlyCarbon) {
      isCarbonNeutral = true;
    }

    currentYear += 1;
    years += 1;
  }

  const offsetSimulationResults = {
    maxOffset: yearlyOffset,
    offsetsByYear,
    maxOffsetYear: currentYear,
    yearsInvested: years,
    isCarbonNeutral,
    targetOffset: yearlyCarbon,
  };

  return offsetSimulationResults;
};

export default calculations;
