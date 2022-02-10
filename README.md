# currency-conversion

Currency converter

##Title:## 
CO-OP Currency Converter

##Description:## 
This is a small application which aims to convert the users chosen currencies. Both The rates and the currencies should be called from seperate API's, however the rates API proved to be a problem due to a CORS (Cross Origin) error. To work around this the data from the rates api has been hardcoded into the application 'as is', and I have mapped over it as I would have, had I consumed the data through an API (apologies, this is somthing I will work on in my own time to rectify). I would have called this API in a similar way to the Country API, via redux. I also had some difficulty in implementing the bonus features of the flags, and the search option in the drop down box. Again, thi is something I hope to achieve in the near future, if only for my own satisfaction and learnings.

This is a React project which also uses Redux to pass data.

##How to run:##
Open the project into your command line and type 'npm Install'. Once complete, type npm start to load up the project locally.

Once open in the browser (localhost:3000), the user can enter their chosen amount, and select which currencies they would like to convert 'from' and 'to', by using the drop down selection boxes.

If a user enters an invalid amount (not a number), an error should appear on the right asking them to input in the correct format. Similarly, if a user attempts to convert without selecting 2 currencies, an error will appear.

Once the user has entered a valid amount and chosen 2 currencies, they can press the 'Convert' button and the conversion amount should appear at the top. A more detailed description will appear at the bottom, along with a countdown timer of 10 seconds. Once the timer runs out, the converted amount will disappear and return to zero. This simulates that conversion rates can change, and are only valid for a select amount of time before the api will need to be recalled and the figures possibly updated.
