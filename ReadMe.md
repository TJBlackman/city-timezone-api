# City Timezone API

This is a Deno module for getting the timezone of a city from a predefined list of cities. It is meant to be deployed with Deno deploy.

## Usage

Send an API request to the URL it is deployed at with the city name as a URL parameter. The response will be a JSON object with the city name and timezone.

```
curl --location 'https://city-timezone-api.deno.dev/api/cities/paris'

// response
{
  "name": "Paris",
  "lat": 48.86669293,
  "lng": 2.333335326,
  "population": 4957588.5,
  "country": "France",
  "province": "Île-de-France",
  "timezone": "Europe/Paris",
  "utcTime": "08/30/2023, 02:14:16 PM"
}
```

## Github Repo

https://github.com/TJBlackman/city-timezone-api

## Data

The origin data came from this github repo: https://github.com/kevinroberts/city-timezones

I modified the original data to remove what I don't need, and sorted the cities by highest population to lowest population.
