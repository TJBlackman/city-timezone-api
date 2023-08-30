# City Timezone API

This is a Deno module for getting the timezone of a city from a predefined list of cities. It is meant to be deployed with Deno deploy.

## Usage

Send an API request to this API with the city name as a URL parameter. The JSON response will contain an array of matching cities and their information.

```
curl --location 'https://city-timezone-api.deno.dev/api/cities/paris'

// response
[
  {
    "name": "Paris",
    "lat": 48.86669293,
    "lng": 2.333335326,
    "population": 4957588.5,
    "country": "France",
    "province": "Île-de-France",
    "timezone": "Europe/Paris",
    "utcTime": "08/30/2023, 04:57:53 PM"
  }
]
```

## Example

Click a URL below to view an example.

- https://city-timezone-api.deno.dev/api/cities/paris
- https://city-timezone-api.deno.dev/api/cities/los%20angeles
- https://city-timezone-api.deno.dev/api/cities/trinidad

### Github Repo

https://github.com/TJBlackman/city-timezone-api

### Data

The origin data came from this github repo: https://github.com/kevinroberts/city-timezones

I modified the original data to remove what I don't need, and sorted the cities by highest population to lowest population.
