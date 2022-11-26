const cheerio = require("cheerio"); // Jquery in Nodejs
const puppeteer = require("puppeteer");
const geocode_to_coordinate = require("./geocodeToCordinate"); // Browser emulation

async function addMechta(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let product_id_counter = 0;

  url = url + "?page=";

  let products = [];
  let page_number = 1;

  let visited_all_pages = false;

  do {
    await page.goto(url + page_number.toString());
    const content = await page.content();

    console.log(url + page_number.toString());

    const $ = cheerio.load(content);
    console.log(content);

    const links = $(".relative-position.q-card")
      .map(function (obj) {
        return $(this).text();
      })
      .get();

    console.log(links);

    if (links.length == 0) {
      visited_all_pages = true;
    }

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const item_page = await axios(link, {
        headers: {
          "accept-encoding": null,
        },
      });

      const $ = cheerio.load(item_page.data);

      const product = new Product();

      product.item_name = $(".Typography__Title").text();
      product.product_id = product_id_counter++;
      // product.img_url = image_url
      product.shop = "Белый Ветер";
      const addresses = $(".product-stocks__block-description")
        .map(function () {
          return $(this).text();
        })
        .get();
      const shop_addresses = [];
      for (let i = 0; i < addresses.length; i++) {
        shop_addresses.push({
          address: addresses[i],
          coordinate: geocode_to_coordinate(addresses[i]),
        });
      }
      product.shop_addresses = shop_addresses;
    }
    console.log(page_number);
    page_number++;
  } while (!visited_all_pages);
}

module.exports = addMechta;
