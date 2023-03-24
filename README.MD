# Carbon offset calculator app

Welcome to my Carbon Offset Calculator app! It is still a work in progress, so I welcome any feedback.Please note that you have to run npm install seperately in the Calculator-Back-End folder and again in the Calculator-Front-End folder. PLEASE DO NOT run npm install in the Carbon-Offset-Calculator parent folder.

## To run the back-end of this app:

1. cd into Calculator-Back-End
2. run npm install
3. run npm run dev

I believe my backend is mostly completed and functioning well now.

## To run the front-end of this app:

1. cd into Calculator-Front-End
2. run npm install
3. run npm run dev
4. Fill out form and submit

A few notes about choices made on the front end:

1. I chose to only allow users to simulate yearly tree purchases. I made this choice given the limit of 55 trees per year and the multi-year timescales requireed for the simulation. I felt giving a monthly level of granularity would add unecessary clutter to the UI and would not offer much more valuable insights to the user for simulation purposes.

2. For my expenditures graph, I chose to graph annual expenditures instead of cumulative expendatures. My reasoning here was that the cumulative expendatures are actually super high to achieve carbon neutrality. My background in marketing taught me it is best to position pricing to seem as minimal as possible while still being accurate. The yearly expenditures are still considerable, but seem much more manageable than the cumulative amount.
