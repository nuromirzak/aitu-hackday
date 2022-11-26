const axios = require("axios");

async function geocode_to_coordinate(address) {
  address += ", Астана";
  const data = await axios(
    `https://geocode-maps.yandex.ru/1.x/?apikey=5dd86d44-769f-48a2-a37a-860ed68c9dfe&format=json&geocode=${address}&lang=ru-RU`,
    {
      headers: {
        "accept-encoding": null,
      },
    }
  );
  const pos =
    data.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;

  const longitude = pos.split(" ")[0];
  const latitude = pos.split(" ")[1];
  return { lng: longitude, lat: latitude };
}

module.exports = geocode_to_coordinate;
