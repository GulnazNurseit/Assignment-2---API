
Overview

The main goal of this project was to learn how to integrate multiple APIs on the server side, process the received data, and display it clearly on the frontend in a simple and user-friendly way.

The project is divided into server and client parts for better organization:

1.All API logic is handled in core.js.

2.The server.js file runs the Express server and sends processed data to the frontend.

3.The public folder contains static files (HTML, CSS, JS) that display this data to the user
.
4. All API keys are securely stored in the .env file, keeping the project safe and easy to reuse.

I created a Node.js web application that retrieves information from several APIs, processes all data in the backend (core.js), and sends it to the frontend to be displayed in structured sections.


 API Usage

Random User API:
[https://randomuser.me/api/](https://randomuser.me/api/)
Data Retrieved: Name (first and last), gender, age, location (city, street, country), profile picture

Countrylayer API:
[https://manage.countrylayer.com/signup/free](https://manage.countrylayer.com/signup/free)
Data Retrieved:Country name, capital city, official languages, currency (name and code), national flag

Exchange Rate API:
[https://www.exchangerate-api.com/](https://www.exchangerate-api.com/)
Data Retrieved: Conversion rates for USD and KZT based on the user's local currency

News API:
[https://newsapi.org/](https://newsapi.org/)
Data Retrieved: News headlines containing the user's country name, article title, image, and short description



Design and Interface

The user interface has a clean pastel design with soft color tones and organized card layouts for each section:

1. Random User Information
2. Country Information
3. Exchange Rates
4. News Headlines

All parts are visually separated, well-structured, and responsive, making the application easy to read, navigate, and use on any device.



Conclusion

In conclusion, this project successfully integrates **four different APIs** into one functional application.
It displays complete random user information, detailed country data with capital, language, currency, and flag, as well as accurate currency conversions between USD and KZT.
Additionally, it retrieves and presents the latest news headlines related to the user’s country, making the application **informative, well-organized, and fully aligned with the assignment requirements**.
