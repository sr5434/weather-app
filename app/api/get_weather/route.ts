import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest){
    const APIKey = process.env.WEATHER;
    let reqJSON = await req?.json();
    let APIRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${reqJSON.city}&appid=${APIKey}&units=imperial`)
    let APIJSON = await APIRes.json()
    return NextResponse.json({ 
        description: APIJSON.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${APIJSON.weather[0].icon}.png`,
        temp: APIJSON.main.temp,
        wind: APIJSON.wind.speed,
        humidity: APIJSON.main.humidity
    });
}