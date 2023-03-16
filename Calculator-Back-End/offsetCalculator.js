const offsetCalculator = (data) => {
  //Avg. CO 2 per person in tons must be converted to kg for comparison
  const yearlyCarbon = data.country.carbon * 1000;
  //Sorting purchases in order of year in case they are submitted out of order
  //This will make the math easier
  const sortedPurchases = data.purchase.sort((a, b) => a.year - b.year);
  //Linear growth is assumed for carbon offsetting for simplicity
  //Tree is mature at 6 years. 28.5/6 - 4.75
  //Plan is to start at 4.75 in year 1 (i.e. 1 year after purchase).
  //Then will increment by 4.75 until trees are mature
  sortedPurchases.forEach((purchase) => (purchase.offset = 4.75));
  sortedPurchases.forEach((purchase) => console.log(purchase));
  let currentYear = +sortedPurchases[0].year;
  let years = 1;
  let yearlyOffset = 0;
  let carbonNeutral = false;
  while (yearlyOffset < yearlyCarbon) {
    yearlyOffset = 0;
    let allTreesMature = true;
    for (let purchase of sortedPurchases) {
      if (purchase.year > currentYear) {
        break;
      }
      yearlyOffset += +purchase.trees * purchase.offset;
      if (purchase.offset < 28.5) {
        allTreesMature = false;
        purchase.offset += 4.75;
      }
    }
    if (yearlyOffset >= yearlyCarbon) {
      carbonNeutral = true;
    }
    //If all trees are mature you have reached the max offset for your purchases
    if (allTreesMature) {
      break;
    }
    years += 1;
  }
  console.log(`Yearly offset: ${yearlyOffset}`);
  console.log(`Carbon neutral: ${carbonNeutral}`);
  console.log(`Years ${years}`);
};

export default offsetCalculator;
