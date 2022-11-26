const cheerio = require("cheerio"); // Jquery in Nodejs
const puppeteer = require("puppeteer");
const geocode_to_coordinate = require("./geocodeToCordinate"); // Browser emulation

async function addSulpak(url) {
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

    const $ = cheerio.load(content);

    const links = $(".category-page-list__item .category-page-list__item-link")
      .map(function () {
        return $(this).attr("href");
      })
      .get();

    if (links.length === 0) {
      visited_all_pages = true;
    }

    for (let i = 0; i < links.length; i++) {
      const link = "https://www.technodom.kz" + links[i];

      await page.goto(link);
      page.evaluate((_) => {
        window.scrollBy(0, window.innerHeight);
      });

      const item_page = await page.content();

      console.log(item_page);

      const $ = cheerio.load(item_page);

      const product = new Product();

      console.log($(".Tabs__List.--gradient").get());

      product.item_name = $(".Typography__Title").text();
      product.product_id = product_id_counter++;
      product.img_url = $(".LazyImage__Source").attr("src");
      product.item_category = product.item_name.split(" ")[0];
      product.shop = "Sulpak";

      const addresses = $(".product-stocks__block-description")
        .map(function () {
          return $(this).text();
        })
        .get();
      console.log(addresses);
      const shop_addresses = [];

      for (let i = 0; i < addresses.length; i++) {
        shop_addresses.push({
          address: addresses[i],
          coordinate: geocode_to_coordinate(addresses[i]),
        });
      }

      product.shop_addresses = $;
    }
    console.log(page_number);
    page_number++;
  } while (!visited_all_pages);
}

module.exports = addSulpak;
