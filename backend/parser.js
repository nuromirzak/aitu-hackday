const cheerio = require('cheerio') // Jquery in Nodejs
const axios = require('axios')
const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const Product = require('./models/product')


const db_Url = `mongodb+srv://username:${process.env.MONGODB_PASSWORD}@cluster-0.ypif198.mongodb.net/test`;

const url_shopkz_smartphones = 'https://shop.kz/smartfony/filter/astana-is-v_nalichii-or-ojidaem-or-dostavim/apply/'
const url_shopkz_tv = 'https://shop.kz/televizory/filter/astana-is-v_nalichii-or-ojidaem-or-dostavim/apply/'
const url_shopkz_pc = 'https://shop.kz/monobloki/filter/astana-is-v_nalichii-or-ojidaem-or-dostavim/apply/'
const url_shopkz_audio = 'https://shop.kz/domashnie-kinoteatry-resivery/filter/astana-is-v_nalichii-or-ojidaem-or-dostavim/apply/'
const url_shopkz_camera = 'https://shop.kz/ekshn-kamery/filter/astana-is-v_nalichii-or-ojidaem-or-dostavim/apply/'

mongoose.connect(db_Url, { useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => console.log(err));

let product_id_counter = 1;


const shopkz_addresses = [
    {
        address: 'г. Астана, ул. Бейбитшилик, 33',
        coordinate: { lng: '71.418203', lat: '51.175314' }
    }
    ,
    {
        address: 'г. Астана, ул. Ж.Жирентаева, 7',
        coordinate: { lng: '71.47371', lat: '51.150439' }
    }
    ,
    {
        address: 'г. Астана, ул. Шоқан Уәлиханов, 20',
        coordinate: { lng: '71.439933', lat: '51.172197' }
    }
    ,
    {
        address: 'г. Астана, пр. Б. Момышулы, 10',
        coordinate: { lng: '71.476064', lat: '51.138963' }
    }
    ,
    {
        address: 'г. Астана, ул. Достык, 10',
        coordinate: { lng: '71.423081', lat: '51.126308' }
    }
    ,
    {
        address: 'г. Астана, ул. Кабанбай батыра, 21',
        coordinate: { lng: '71.411529', lat: '51.128066' }
    }
    ,
    {
        address: ' г. Астана, пр. Б.Момышулы, 19а',
        coordinate: { lng: '71.475471', lat: '51.139686' }
    }
    ,
    {
        address: 'г. Астана, пр. Республики, 16',
        coordinate: { lng: '71.428974', lat: '51.161432' }
    }
    ,
    {
        address: 'г. Астана, пр. Абылайхана, 29',
        coordinate: { lng: '71.43042', lat: '51.128207' }
    }
    ,
    {
        address: 'г. Астана, пр. Мәңгілік Ел, 19',
        coordinate: { lng: '71.43281', lat: '51.114373' }
    }
    ,
    {
        address: 'г. Астана, ул. Қаныш Сәтбаев, 15',
        coordinate: { lng: '71.47124', lat: '51.146721' }
    }
]



async function addShopKz(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    let products = []
    let page_number = 1
    let visited_all_pages = false

    url = url + '?PAGEN_1='

    let set = new Set();

    while (!visited_all_pages) {
        await page.goto(url + page_number.toString())
        const content = await page.content()
        const $= cheerio.load(content)

        const data = $('.bx_catalog_item_container').map(function() {
            return $(this).attr('data-product');
        }).get()

        for (let i = 0; i < data.length; i++) {
            let product = JSON.parse(data[i])
            if (set.has(product.product_id)) {
                visited_all_pages = true;
                break;
            }
            set.add(product.product_id)
            products.push(product)
        }

        console.log(page_number)
        page_number++;
    }
    for (let i = 0; i < products.length; i++) {
        const product = new Product()
        product.product_id = product_id_counter++
        product.item_name = products[i].item_name
        product.item_category = subcategory_to_category(products[i].item_category)
        product.img_url = products[i].image
        product.price = products[i].price
        product.shop = 'Белый Ветер'
        product.shop_addresses = shopkz_addresses
        product.save()
    }

    browser.close()
}


/*
Product.collection.drop()

addDataShopKz(url_shopkz_pc)
addDataShopKz(url_shopkz_smartphones)


*/
/*
Смарт-часы
Фитнес-браслеты, ремешки
Планшеты
Электронные книги
 */



function subcategory_to_category(category) {
    switch (category) {
        case 'Моноблоки':
            return 'computer'
        case 'Смартфоны':
            return 'smartphone'
        case 'Аудиотехника, Hi-Fi оборудование':
            return 'audio'
        case 'Экшн-камеры':
            return 'camera'
        default:
            return 'tv'
    }
    return 'none'
}

/*
async function addTechnodom(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    url = url + '?page='

    let products = []
    let page_number = 1

    let visited_all_pages = false

    do {
        await page.goto(url + page_number.toString())
        const content = await page.content()


        const $= cheerio.load(content)

        const links = $('.category-page-list__item .category-page-list__item-link').map(function () {
            return $(this).attr('href')
        }).get()


        if (links.length == 0) {
            visited_all_pages = true
        }

        for (let i = 0; i < links.length; i++) {
            const link = 'https://www.technodom.kz' + links[i]

            await page.goto(link)
            page.evaluate(_ => {
                window.scrollBy(0, window.innerHeight);
            });

            const item_page = await page.content()

            console.log(item_page)

            const $=cheerio.load(item_page)


            const product = new Product()

            console.log($('.Tabs__List.--gradient').get())


            product.item_name = $('.Typography__Title').text()
            product.product_id = product_id_counter++
            product.img_url = $('.LazyImage__Source').attr('src')
            product.item_category = product.item_name.split(' ')[0]
            product.shop = 'Технодом'


            const addresses = $('.product-stocks__block-description').map(function () {
                return $(this).text()
            }).get()
            console.log(addresses)
            const shop_addresses = []

            for (let i = 0; i < addresses.length; i++) {
                shop_addresses.push({address: addresses[i], coordinate: geocode_to_coordinate(addresses[i])})
            }

            product.shop_addresses = $
        }
        console.log(page_number)
        page_number++;
    } while (!visited_all_pages)
}

 */
/*
async function addSulpak(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    url = url + '?page='

    let products = []
    let page_number = 1

    let visited_all_pages = false

    do {
        await page.goto(url + page_number.toString())
        const content = await page.content()

        const $= cheerio.load(content)

        const links = $('.category-page-list__item .category-page-list__item-link').map(function () {
            return $(this).attr('href')
        }).get()


        if (links.length == 0) {
            visited_all_pages = true
        }

        for (let i = 0; i < links.length; i++) {
            const link = 'https://www.technodom.kz' + links[i]

            await page.goto(link)
            page.evaluate(_ => {
                window.scrollBy(0, window.innerHeight);
            });

            const item_page = await page.content()

            console.log(item_page)

            const $=cheerio.load(item_page)


            const product = new Product()

            console.log($('.Tabs__List.--gradient').get())


            product.item_name = $('.Typography__Title').text()
            product.product_id = product_id_counter++
            product.img_url = $('.LazyImage__Source').attr('src')
            product.item_category = product.item_name.split(' ')[0]
            product.shop = 'Sulpak'


            const addresses = $('.product-stocks__block-description').map(function () {
                return $(this).text()
            }).get()
            console.log(addresses)
            const shop_addresses = []

            for (let i = 0; i < addresses.length; i++) {
                shop_addresses.push({address: addresses[i], coordinate: geocode_to_coordinate(addresses[i])})
            }

            product.shop_addresses = $
        }
        console.log(page_number)
        page_number++;
    } while (!visited_all_pages)
}
*/

/*
async function addMechta(url) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    url = url + '?page='

    let products = []
    let page_number = 1

    let visited_all_pages = false

    do {

        await page.goto(url + page_number.toString())
        const content = await page.content()

        // const page = await axios(url + page_number.toString(), {headers: {
        //         'accept-encoding': null
        //     }})

        console.log(url + page_number.toString())

        const $ = cheerio.load(content)
        console.log(content)

        const links = $('.relative-position.q-card').map(function (obj) {
            return $(this).text()
        }).get()

        console.log(links)

        if (links.length == 0) {
            visited_all_pages = true
        }

        for (let i = 0; i < links.length; i++) {
            const link = links[i]
            const item_page = await axios(link, {
                headers: {
                    'accept-encoding': null
                }
            })

            const $ = cheerio.load(item_page.data)

            /*
            const product = new Product()

            product.item_name = $('.Typography__Title').text()
            product.product_id = product_id_counter++
            // product.img_url = image_url
            product.shop = 'Белый Ветер'
            const addresses = $('.product-stocks__block-description').map(function () {
                return $(this).text()
            }).get()
            const shop_addresses = []
            for (let i = 0; i < addresses.length; i++) {
                shop_addresses.push({address: addresses[i], coordinate: geocode_to_coordinate(addresses[i])})
            }
            product.shop_addresses = $


        }
        console.log(page_number)
        page_number++
    } while (!visited_all_pages)
    console.log()
}
*/


// addMechta('https://www.mechta.kz/section/telefony-eed/');

// addTechnodom('https://www.technodom.kz/catalog/smartfony-i-gadzhety/smartfony-i-telefony/smartfony')
// let adds = []
// let num = 12
// for (let i = num; i <= num; i++) {
//     let address = shopkz_addresses[i]
//     geocode_to_coordinate(address).then(data => {
//         console.log({address: shopkz_addresses[i], coordinate: data})
//     })
// }

Product.collection.drop()

addShopKz(url_shopkz_smartphones)
addShopKz(url_shopkz_tv)
addShopKz(url_shopkz_audio)
addShopKz(url_shopkz_pc)
addShopKz(url_shopkz_camera)

async function geocode_to_coordinate(address) {
    address += ', Астана'
    const data = await axios(`https://geocode-maps.yandex.ru/1.x/?apikey=5dd86d44-769f-48a2-a37a-860ed68c9dfe&format=json&geocode=${address}&lang=ru-RU`, {headers: {
            'accept-encoding': null
        }})
    const pos = data.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos

    const longitude = pos.split(' ')[0]
    const latitude = pos.split(' ')[1]
    return {lng: longitude, lat: latitude}
}

