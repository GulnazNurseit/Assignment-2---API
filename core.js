import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const COUNTRY_KEY = process.env.COUNTRYLAYER_API_KEY;
const EXCHANGE_KEY = process.env.EXCHANGERATE_API_KEY;
const NEWS_KEY = process.env.NEWS_API_KEY;

// 1️⃣ Random User
export async function getRandomUser() {
  const res = await axios.get('https://randomuser.me/api/');
  const user = res.data.results[0];

  return {
    firstName: user.name.first,
    lastName: user.name.last,
    gender: user.gender,
    age: user.dob.age,
    dob: user.dob.date,
    city: user.location.city,
    country: user.location.country,
    address: `${user.location.street.number} ${user.location.street.name}`,
    picture: user.picture.large
  };
}

// 2️⃣ Countrylayer ONLY
export async function getCountryInfo(countryName) {
  try {
    const res = await axios.get(
      `http://api.countrylayer.com/v2/all?access_key=${COUNTRY_KEY}`
    );

    const country = res.data.find(
      c => c.name.toLowerCase() === countryName.toLowerCase()
    );

    if (!country) {
      return {
        name: countryName,
        capital: 'N/A',
        languages: 'N/A',
        currency: 'N/A',
        flag: ''
      };
    }

    return {
      name: country.name,
      capital: country.capital || 'N/A',
      languages: country.languages
        ? country.languages.map(l => l.name).join(', ')
        : 'N/A',
      currency: country.currencies
        ? country.currencies[0].code
        : 'N/A',
      flag: country.flag || ''
    };

  } catch (error) {
    console.error('Countrylayer error:', error.message);
    return {
      name: countryName,
      capital: 'N/A',
      languages: 'N/A',
      currency: 'N/A',
      flag: ''
    };
  }
}
export async function getExchangeRate(currency) {
  if (!currency || currency === 'N/A') {
    return { USD: 'N/A', KZT: 'N/A' };
  }

  try {
    const res = await axios.get(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_KEY}/latest/${currency}`
    );

    return {
      USD: res.data.conversion_rates.USD.toFixed(2),
      KZT: res.data.conversion_rates.KZT.toFixed(2)
    };
  } catch (error) {
    console.error('ExchangeRate error:', error.message);
    return { USD: 'N/A', KZT: 'N/A' };
  }
}

// 4️⃣ News API
export async function getNews(country) {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(country)}&pageSize=5&language=en&apiKey=${NEWS_KEY}`
    );

    return res.data.articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage || ''
    }));

  } catch (error) {
    console.error('News API error:', error.message);
    return [];
  }
}

// 5️⃣ All data together
export async function getAllData() {
  const user = await getRandomUser();
  const country = await getCountryInfo(user.country);
  const rates = await getExchangeRate(country.currency);
  const news = await getNews(user.country);

  return { user, country, rates, news };
}
