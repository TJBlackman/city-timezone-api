import cities from "./cities.json" assert { type: "json" };

/**
 * Serves city details from a predefined list for a given city name.
 * The function expects a request of format `/api/cities/{cityName}`.
 *
 */
Deno.serve((req: Request) => {
  try {
    if (req.method !== "GET") {
      return new Response("Not Found", { status: 404 });
    }

    const url = new URL(req.url);

    // home page html
    if (url.pathname === "/") {
      const html = Deno.readFileSync("./index.html");
      return new Response(html, {
        headers: { "content-type": "text/html" },
      });
    }

    // require /api route
    if (url.pathname !== "/api") {
      return new Response("Bad Request", { status: 400 });
    }

    const lat = url.searchParams.get("lat");
    const long = url.searchParams.get("long");
    const city = url.searchParams.get("city")?.toLowerCase();
    let province = url.searchParams.get("province")?.toLowerCase();
    if (!province) {
      province = url.searchParams.get("state")?.toLowerCase();
    }

    // if no query params, return empty array
    if (!lat && !long && !city && !province) {
      return new Response(JSON.stringify([]), {
        headers: { "content-type": "application/json" },
      });
    }

    // fuzzy match all params provided by user
    let found = [];
    for (const currentCity of cities) {
      if (lat !== null) {
        if (!currentCity.lat.includes(lat)) {
          continue;
        }
      }
      if (long !== null) {
        if (!currentCity.long.includes(long)) {
          continue;
        }
      }
      if (city !== undefined) {
        if (!currentCity.name.toLowerCase().includes(city)) {
          continue;
        }
      }
      if (province !== undefined) {
        if (!currentCity.province?.toLowerCase().includes(province)) {
          continue;
        }
      }
      found.push(currentCity);
    }

    // exact match all params provided by user
    const match = url.searchParams.get("match")?.toLowerCase();
    if (match === "exact") {
      const exactMatch = [];
      for (const currentCity of found) {
        if (lat !== null) {
          if (currentCity.lat !== lat) {
            continue;
          }
        }
        if (long !== null) {
          if (currentCity.long !== long) {
            continue;
          }
        }
        if (city !== undefined) {
          if (currentCity.name.toLowerCase() !== city) {
            continue;
          }
        }
        if (province !== undefined) {
          if (currentCity.province?.toLowerCase() !== province) {
            continue;
          }
        }
        exactMatch.push(currentCity);
      }
      found = exactMatch;
    }

    // calculate UTC time for each found city
    const date = new Date();
    found.forEach((city) => {
      if (!city.timezone) {
        return;
      }
      const utcTime = getCurrentTimeInTimeZone(city.timezone, date);
      // @ts-ignore: append this new property to the object
      city.utcTime = utcTime;
    });

    return new Response(JSON.stringify(found), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    let msg = undefined;
    if (error instanceof Error) {
      msg = `:\n${error.message}`;
    }
    return new Response(`Internal Server Error${msg}`, { status: 500 });
  }
});

/**
 * Retrieves the current time in the specified timezone and formats it in 'en-US' locale.
 *
 * @param {string} timeZone - The IANA time zone string (e.g., "America/New_York").
 * @returns {string} The formatted date and time in the given timezone.
 */
const options = {
  timeZone: "",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};
function getCurrentTimeInTimeZone(timeZone: string, date: Date) {
  options.timeZone = timeZone;
  // @ts-ignore: options are correct
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
