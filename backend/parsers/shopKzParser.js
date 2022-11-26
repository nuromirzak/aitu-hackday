const cheerio = require("cheerio"); // Jquery in Nodejs
const puppeteer = require("puppeteer");
const Product = require("../models/product"); // Browser emulation

const shopkz_addresses = [
  {
    address: "г. Астана, ул. Бейбитшилик, 33",
    coordinate: { lng: "71.418203", lat: "51.175314" },
  },
  {
    address: "г. Астана, ул. Ж.Жирентаева, 7",
    coordinate: { lng: "71.47371", lat: "51.150439" },
  },
  {
    address: "г. Астана, ул. Шоқан Уәлиханов, 20",
    coordinate: { lng: "71.439933", lat: "51.172197" },
  },
  {
    address: "г. Астана, пр. Б. Момышулы, 10",
    coordinate: { lng: "71.476064", lat: "51.138963" },
  },
  {
    address: "г. Астана, ул. Достык, 10",
    coordinate: { lng: "71.423081", lat: "51.126308" },
  },
  {
    address: "г. Астана, ул. Кабанбай батыра, 21",
    coordinate: { lng: "71.411529", lat: "51.128066" },
  },
  {
    address: " г. Астана, пр. Б.Момышулы, 19а",
    coordinate: { lng: "71.475471", lat: "51.139686" },
  },
  {
    address: "г. Астана, пр. Республики, 16",
    coordinate: { lng: "71.428974", lat: "51.161432" },
  },
  {
    address: "г. Астана, пр. Абылайхана, 29",
    coordinate: { lng: "71.43042", lat: "51.128207" },
  },
  {
    address: "г. Астана, пр. Мәңгілік Ел, 19",
    coordinate: { lng: "71.43281", lat: "51.114373" },
  },
  {
    address: "г. Астана, ул. Қаныш Сәтбаев, 15",
    coordinate: { lng: "71.47124", lat: "51.146721" },
  },
];

async function addShopKz(url) {
  let product_id_counter = 0;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let products = [];
  let page_number = 1;
  let visited_all_pages = false;

  url = url + "?PAGEN_1=";

  let set = new Set();

  while (!visited_all_pages) {
    await page.goto(url + page_number.toString());
    const content = await page.content();
    const $ = cheerio.load(content);

    const data = $(".bx_catalog_item_container")
      .map(function () {
        return $(this).attr("data-product");
      })
      .get();

    for (let i = 0; i < data.length; i++) {
      let product = JSON.parse(data[i]);
      if (set.has(product.product_id)) {
        visited_all_pages = true;
        break;
      }
      set.add(product.product_id);
      products.push(product);
    }

    console.log(page_number);
    page_number++;
  }
  for (let i = 0; i < products.length; i++) {
    const product = new Product();
    product.product_id = product_id_counter++;
    product.item_name = products[i].item_name;
    product.item_category = subcategory_to_category(products[i].item_category);
    product.img_url = products[i].image;
    product.price = products[i].price;
    product.shop = "Белый Ветер";
    product.shop_addresses = shopkz_addresses;
    product.save();
  }

  browser.close();
}

function subcategory_to_category(category) {
  switch (category) {
    case "Моноблоки":
      return "computer";
    case "Смартфоны":
      return "smartphone";
    case "Аудиотехника, Hi-Fi оборудование":
      return "audio";
    case "Экшн-камеры":
      return "camera";
    default:
      return "tv";
  }
}

module.exports = addShopKz;
