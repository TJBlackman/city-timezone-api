# City Timezone API

This is an API for getting the timezone of a city from a predefined list of cities. It is meant to be deployed with Deno deploy.

## Usage

Send a GET request to this API with the correct query parameters to query data. The JSON response will contain an array of matching cities and their information.

```
curl --location 'https://city-timezone-api.deno.dev/api?city=denver'

// response
[
    {
        "name": "Denver",
        "lat": "39.73918805",
        "population": "1930799.5",
        "country": "United States of America",
        "province": "Colorado",
        "timezone": "America/Denver",
        "long": "-104.984016",
        "utcTime": "08/30/2023, 11:05:30 AM"
    }
]
```

### Supported Query Parameters

- `city` - The name of the city to search for.
- `province` - The name of the province to search for (interchangeable with state).
- `state` - The name of the state to search for (interchangeable with province).
- `lat` - The latitude of the city to search for.
- `long` - The longitude of the city to search for.
- `match` - The type of match to use. Can be `exact` or `fuzzy`. Defaults to `fuzzy`.

### Fuzzy Search (Default)

A fuzzy search will return all results where a query param is a partial-match of a it's corresponding value. For example, if you search for `city=den`, you will get back all cities that contain `den` in their name.

- `city=den`
  - This returns 41 results, including `Denver`, `Aden`, `Dresden`, etc.
- `city=den&state=co`
  - This returns 3 results; where `den` is in the city name and `co` is in the state/province name.
- `lat=521`
  - Returns 19 results, where `521` is anywhere in the latitude of the city.

### Exact Search

An exact search will return all results where a query param is an exact-match of a it's corresponding value. For example, if you search for `city=den&match=exact`, you will get back all cities whose name is exactly `den` - which is 0. The proper search would be `city=denver&match=exact` which would return 1 result.

- `city=trinidad&match=exact`
  - This returns 3 results, where all 3 cities are named `Trinidad`.
- `lat=-14.83&match=exact`
  - Returns 0 results. No cities have a latitude of `-14.83`.
- `city=trinidad&lat=-14.83337238&match=exact`
  - This returns 1 results, where the city is named `Trinidad` and the latitude is `-14.83337238`.

## Example

Click a URL below to view an example.

- https://city-timezone-api.deno.dev/api?city=den
- https://city-timezone-api.deno.dev/api?city=den&state=co
- https://city-timezone-api.deno.dev/api?city=denver&match=exact

### Github Repo

https://github.com/TJBlackman/city-timezone-api

### Data

The origin data came from this github repo: https://github.com/kevinroberts/city-timezones

I modified the original data to remove what I don't need, and sorted the cities by highest population to lowest population.
