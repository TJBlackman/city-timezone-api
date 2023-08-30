import cities from "./cities.json" assert { type: "json" };

/**
 * Serves city details from a predefined list for a given city name.
 * The function expects a request of format `/api/cities/{cityName}`.
 *
 */
Deno.serve((req: Request) => {
  if (req.method !== "GET") {
    return new Response("Not Found", { status: 404 });
  }

  const urlParams = new URL(req.url).pathname.split("/");
  if (
    urlParams.length !== 4 ||
    urlParams[1] !== "api" ||
    urlParams[2] !== "cities"
  ) {
    return new Response(
      "Bad Request. Expected request to /api/cities/{cityName}",
      { status: 400 }
    );
  }

  const targetCity = urlParams[3].toLowerCase();
  let foundCity = null;
  let i = 0;
  const iMax = cities.length;
  while (i < iMax) {
    const currentCity = cities[i];
    const currentCityLowercase = currentCity.name.toLowerCase();
    if (currentCityLowercase === targetCity) {
      foundCity = cities[i];
      break;
    }
    i++;
  }

  if (!foundCity) {
    return new Response("Not Found", { status: 404 });
  }

  const utcTime = getCurrentTimeInTimeZone(foundCity.timezone!);
  // @ts-ignore: don't care about this
  foundCity.utcTime = utcTime;

  return new Response(JSON.stringify(foundCity), {
    headers: { "content-type": "application/json" },
  });
});

/**
 * Retrieves the current time in the specified timezone and formats it in 'en-US' locale.
 *
 * @param {string} timeZone - The IANA time zone string (e.g., "America/New_York").
 * @returns {string} The formatted date and time in the given timezone.
 */
function getCurrentTimeInTimeZone(timeZone: string) {
  const date = new Date();
  const options = {
    timeZone,
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  } as const;
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
