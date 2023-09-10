'use client'
import Image from 'next/image'
import { useState } from 'react';

function randomCity(){
  const cities = [
    "New York City",
    "Los Angeles",
    "San Diego, California",
    "Seattle, Washington",
    "Portland, Oregon",
    "Las Vegas, Nevada",
    "Atlanta, Georgia",
    "San Francisco",
    "London, England",
    "Paris, France",
    "Lyon, France",
    "Tokyo, Japan",
    "Beijing, China",
    "New Delhi, India",
    "Mumbai, India",
    "Bengaluru, India",
    "Oakland, California",
    "Mexico City, Mexico",
    "Jersey City",
    "Newark, New Jersey",
    "Milan, Italy",
    "Rome, Italy",
    "Denver, Colorado",
    "St. Louis, Missouri",
    "Honolulu, Hawaii",
    "Kansas City, Kansas",
    "Omaha, Nebraska",
    "San Jose, California",
    "Cheyenne, Wyoming",
    "Boise, Idaho",
    "Buffalo, New York",
    "Rochester, New York",
    "Seoul, South Korea",
    "Berlin, Germany",
    "Munich, Germany",
    "Vienna, Austria",
    "Anchorage, Alaska",
    "Miami, Florida",
    "San Juan, Puerto Rico",
    "Palo Alto, California",
    "Dallas, Texas",
    "Houston, Texas",
    "Hollywood",
    "Lagos, Nigeria",
    "Dublin, Ireland",
    "New Orleans, Louisiana",
    "Louisville, Kentucky",
    "Memphis, Tennessee",
    "Tulsa, Oklahoma",
    "Oklahoma City, Oklahoma"
  ]
  var index = Math.floor(Math.random() * cities.length);
  return cities[index];
}

export default function Home() {
  const [ city, setCity ] = useState("");
  const [ desc, setDesc ] = useState("");
  const [ iconURL, setIconURL ] = useState("");
  const [ temp, setTemp ] = useState("");
  const [ wind, setWind ] = useState("");
  const [ humidity, setHumidity ] = useState("");

  const defaultCity = randomCity()

  const handleInput = async (e:any) => {
    const fieldValue = e.target.value;

    await setCity(fieldValue);
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()
    let res = await fetch('https://localhost:3000/api/get_weather', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `{"city": "${city}"}`
    });
    let resJson = await res?.json();
    await setDesc(resJson.description);
    await setIconURL(resJson.icon);
    await setTemp(resJson.temp);
    await setWind(resJson.wind);
    await setHumidity(resJson.humidity);
  }
  const refreshPage = function (){ 
    window.location.reload(); 
  }
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <h1 className="text-5xl font-extrabold">Whats the weather{ desc !== "" ? ` in ${city}`: ""}?</h1>
      { desc === "" ? <form onSubmit={submitHandler}>
        <label className="block mb-2 pt-6 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">Paste your link here:</label>
        <textarea
        name="linkInp"
        placeholder={defaultCity}
        value={city}
        onChange={handleInput}
        className="block p-2.5 w-full h-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button 
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg">
          Tell me the weather
        </button>
      </form> :
      <div>
        <span className="inline-flex items-baseline m-3">
          <Image
            src={iconURL}
            alt={desc}
            width={50}
            height={50}
          ></Image> 
          <span>{temp}° F</span>
        </span>
        <p>{desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        <p>Wind: {wind} MPH</p>
        <p>Humidity: {humidity}%</p>
        <button
          type="button"
          onClick={async () => {await setDesc("");
            await setCity("");
            await setHumidity("");
            await setIconURL("");
            await setTemp("")
          }}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg" 
        >Try another city</button>
      </div>}
    </div>
  )
}
