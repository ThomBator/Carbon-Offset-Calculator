# Carbon offset calculator app

Welcome to my Carbon Offset Calculator app! It is still a work in progress, so I welcome any feedback.Please note that you have to run npm install seperately in the Calculator-Back-End folder and again in the Calculator-Front-End folder. PLEASE DO NOT run npm install in the Carbon-Offset-Calculator parent folder.

## To run the back-end of this app:

1. cd into Calculator-Back-End
2. run npm install
3. run npm run dev

At current time the backend is still a work in progress. I am passing data successfully from the client-side to my rest API, then sending it off to my offsetCalculator function.

I think I have most of the logic for the offsetCalculator ironed out. I still need to implement the expenditure calculator.

## To run the front-end of this app:

1. cd into Calculator-Front-End
2. run npm install
3. run npm run dev
4. Fill out form and submit

Note that the front-end will not work without the backend dev server already running. I was unfamilliar with the react-hook-forms library, and getting form validation and dynamic rendering done right took me longer than I would have liked. Seems like a great library though so was happy to dive into the documentation and figure out how it all worked.
