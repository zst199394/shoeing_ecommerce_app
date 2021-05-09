const { Product } = require('../models');

const productData = [{
        product_name: 'Simple Tennis Shoes',
        price: 44.99,
        stock: 14,
        category_id: 1,
        gender: 'M',
        material: "C",
        image_url: 'https://images.asics.com/is/image/asics/1041A113_102_SR_RT_GLB-1?$sfcc-product$',
        description: 'Simply tennis'
    },
    {
        product_name: "Super Spikey Stilletos",
        price: 89.99,
        stock: 22,
        category_id: 5,
        gender: 'F',
        material: "PU",
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/61hdZwiWQeL._AC_UL1200_.jpg',
        description: 'Also a weapon'
    },
    {
        product_name: 'Work Boots',
        price: 87.99,
        stock: 14,
        category_id: 6,
        gender: 'M',
        material: "L",
        image_url: 'https://images.timberland.com/is/image/timberland/10361024-HERO?wid=500&hei=500',
        description: 'For relaxing'
    },
    {
        product_name: 'Everyday Sneakers',
        price: 15.99,
        stock: 25,
        category_id: 2,
        gender: 'K',
        material: "PU",
        image_url: 'https://www.heuritech.com/wp-content/uploads/2019/07/Sneakers-Chanel-Spring-Summer-2018-pre-collection-1030x687.jpg',
        description: 'Take one daily'
    },
    {
        product_name: 'Fancy Running Shoes',
        price: 62.99,
        stock: 12,
        category_id: 3,
        gender: 'F',
        material: "PU",
        image_url: 'https://assets.reebok.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/6c15dd2720594c16a8ecac300080260f_9366/energen-run-mens-running-shoes.jpg',
        description: 'Glamorous Cardio'
    },
    {
        product_name: "Graffiti Basketball Shoes",
        price: 55.99,
        stock: 27,
        category_id: 4,
        gender: 'K',
        material: "C",
        image_url: 'https://publish.one37pm.net/wp-content/uploads/2020/10/nike-basketball-mobile.jpg',
        description: "Banksy's newest masterpiece"
    },
    {
        product_name: "Pink Tennis Shoes",
        price: 44.99,
        stock: 12,
        category_id: 1,
        gender: 'F',
        material: "PU",
        image_url: 'https://rogansshoes.com/data/default/images/catalog/385/AD_CG6363_PNK1.JPG',
        description: 'Pretty in Pink'
    },
    {
        product_name: "Jordan Michael's Shoes for the Ground",
        price: 72.99,
        stock: 50,
        category_id: 4,
        gender: 'M',
        material: "C",
        image_url: 'https://stockx-360.imgix.net/Air-Jordan-1-Retro-High-Dior/Images/Air-Jordan-1-Retro-High-Dior/Lv2/img02.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1607043976',
        description: 'No jumping'
    },
    {
        product_name: "Ughs",
        price: 59.99,
        stock: 30,
        category_id: 6,
        gender: 'F',
        material: "L",
        image_url: 'https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=100311611-847&recipeName=680',
        description: 'Boots for Mondays'
    },
    {
        product_name: "Runmaster 9000",
        price: 99.99,
        stock: 15,
        category_id: 3,
        gender: 'M',
        material: "L",
        image_url: 'https://images.asics.com/is/image/asics/1012A592_002_SR_RT_GLB-1?$sfcc-product$',
        description: 'Statisically insignificant Aerodynamics!'
    },
    {
        product_name: "Rainbow Runners",
        price: 79.99,
        stock: 18,
        category_id: 3,
        gender: 'K',
        material: "PU",
        image_url: 'https://media1.popsugar-assets.com/files/thumbor/JcY_nCCBlYzGiIuK7CRU8CP5SK0/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/01/08/989/n/1922729/17fa95525ff8e03a488a75.93945631_asics/i/ASICS-GT-2000-8-Running-Shoes.jpg',
        description: 'Groovy'
    },
    {
        product_name: "Turqouise Tennis Shoes",
        price: 34.99,
        stock: 13,
        category_id: 1,
        gender: 'F',
        material: "L",
        image_url: 'https://spy.com/wp-content/uploads/2020/05/best-mens-tennis-shoes-of-2020.jpg?w=958&h=599&crop=1',
        description: "The 90's called..."
    },
    {
        product_name: "Former Cows",
        price: 56.99,
        stock: 56,
        category_id: 2,
        gender: 'K',
        material: "L",
        image_url: "https://media.gq.com/photos/5faab9533ea09614b438e5b8/master/w_400%2Cc_limit/Nike-SB-x-Ben-%26-Jerry's-Dunk-Low-'Chunky-Dunky'-sneaker.jpg",
        description: 'Wear their skin'
    },
    {
        product_name: "Super Sneakers",
        price: 99.99,
        stock: 5,
        category_id: 2,
        gender: 'K',
        material: "",
        image_url: 'https://media.gq.com/photos/5faab951409bdf9465816b6e/master/w_2000,h_1333,c_limit/Air-Jordan-35-sneaker.jpg',
        description: 'Hi-tech'
    },
    {
        product_name: "Really Red BB Shoes",
        price: 39.99,
        stock: 30,
        category_id: 4,
        gender: 'K',
        material: "",
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/61BWFggBSZL._AC_UX395_.jpg',
        description: 'I see Red'
    },
    {
        product_name: "Butterfly Heels",
        price: 69.99,
        stock: 15,
        category_id: 5,
        gender: 'F',
        material: "L",
        image_url: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2142,w_2400,x_0,y_258/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/Chiara_Embroidery_Sandal_Black___Multi_SPF19080_1_oymomq.jpg',
        description: 'Freshly tanned'
    },
    {
        product_name: "Twisty Heels",
        price: 79.99,
        stock: 16,
        category_id: 5,
        gender: 'F',
        material: "C",
        image_url: 'https://static.shiekh.com/media/catalog/product/cache/image/2000x2000/e9c3970ab036de70892d86c6d221abfe/2/a/2ae3756f3a0f9d3358d5f1b0a179bb70.jpg',
        description: 'Some pun about ankle injuries'
    },
    {
        product_name: "Big Black Boots",
        price: 75.99,
        stock: 23,
        category_id: 6,
        gender: 'F',
        material: "L",
        image_url: 'https://milworld.com/eng_pl_Mil-Tec-Jungle-Panama-Boots-Black-8396_1.jpg',
        description: "They're all outta gum..."
    },
    {
        product_name: "America! The Boots",
        price: 89.99,
        stock: 16,
        category_id: 6,
        gender: 'M',
        material: "L",
        image_url: 'https://www.sheplers.com/dw/image/v2/BBCT_PRD/on/demandware.static/-/Sites-master-product-catalog-shp/default/dwcc02bbfa/images/782/038782_41_LT.JPG?sw=980&sh=980&sm=fit',
        description: "Don't tread on these"
    },
    {
        product_name: 'Toxic Tennis Shoes',
        price: 32.99,
        stock: 14,
        category_id: 1,
        gender: 'M',
        material: "C",
        image_url: 'https://cdn.hydrogen.filoblu.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/T/0/T03014-724-3-35_1.JPG',
        description: 'Probably disqualifying'
    },
    {
        product_name: 'Sneaker of sneakers',
        price: 12.99,
        stock: 32,
        category_id: 2,
        gender: 'M',
        material: "PU",
        image_url: 'https://static.businessworld.in/article/article_extra_large_image/1560859917_Yqz5H0_sneaker2_470.jpg',
        description: 'Sneakerception'
    },
    {
        product_name: 'Running Slippers',
        price: 11.99,
        stock: 14,
        category_id: 3,
        gender: 'M',
        material: "L",
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81jod22O1IL._UL1500_.jpg',
        description: 'For night runs'
    },
    {
        product_name: 'Cosmic Ball Shoes',
        price: 33.99,
        stock: 26,
        category_id: 4,
        gender: 'K',
        material: "C",
        image_url: 'https://cdn.trendhunterstatic.com/thumbs/air-jordan-xxx.jpeg',
        description: 'Out of this world'
    },
    {
        product_name: 'Actually Spiked Heels',
        price: 75.99,
        stock: 19,
        category_id: 5,
        gender: 'F',
        material: "PU",
        image_url: 'https://images.rivithead.com/products/zoom-images/voltage-08.jpg',
        description: 'Fashion AND Function'
    },
    {
        product_name: 'Alligator Boots',
        price: 55.99,
        stock: 34,
        category_id: 6,
        gender: 'K',
        material: "L",
        image_url: 'https://i.pinimg.com/originals/c3/0a/60/c30a60e3248331ad07c7d4768cb0951e.jpg',
        description: 'With toes that bite and claws that catch!'
    },
    {
        product_name: 'Clogdles',
        price: 23.99,
        stock: 22,
        category_id: 5,
        gender: 'M',
        material: "C",
        image_url: 'https://www.lottafromstockholm.co.uk/media/catalog/product/cache/db398706752b3f2345d463df10b04398/h/i/highwood_tan_6.jpg',
        description: 'Clogs for the Beach'
    },
    {
        product_name: 'Elf Boots',
        price: 7.99,
        stock: 33,
        category_id: 2,
        gender: 'M',
        material: "L",
        image_url: 'https://img.wondercostumes.com/imgzoom/red-and-green-34399.jpg',
        description: 'Get into the Christmas Spirit!'
    },
    {
        product_name: 'Bouncy Bouncy',
        price: 57.99,
        stock: 14,
        category_id: 1,
        gender: 'M',
        material: "L",
        image_url: 'http://sneakernews.com/wp-content/uploads/2013/01/reebok-atv-19-3.jpg',
        description: 'Bounce to another dimension'
    },
    {
        product_name: 'My Running Shoes',
        price: 16.99,
        stock: 34,
        category_id: 3,
        gender: 'K',
        material: "PU",
        image_url: 'https://i.pinimg.com/originals/34/81/47/3481477d3a40fc83108901e80384f4b4.jpg',
        description: 'Your running shoes'
    },
    {
        product_name: 'Flamewalkers',
        price: 44.99,
        stock: 41,
        category_id: 4,
        gender: 'M',
        material: "L",
        image_url: 'https://netdna.coolthings.com/wp-content/uploads/2011/02/adidasflames1-360x240.jpg',
        description: "You're on fire!"
    },
    {
        product_name: 'A Pair of Gloves',
        price: 9.99,
        stock: 64,
        category_id: 2,
        gender: 'M',
        material: "C",
        image_url: 'http://cdn.shopify.com/s/files/1/0004/4652/9572/products/zpacks-ultralight-possumdown-gloves_1200x1200.jpg?v=1575921409',
        description: 'Shoes for your hands'
    },
    {
        product_name: 'X-Treme BBall Duds',
        price: 87.99,
        stock: 14,
        category_id: 4,
        gender: 'F',
        material: "L",
        image_url: 'https://www.dmarge.com/wp-content/uploads/2020/10/SCAROSSO-Dress-Shoes.jpg',
        description: 'Take it to the next level'
    },
    {
        product_name: 'Hand Heels',
        price: 84.99,
        stock: 44,
        category_id: 5,
        gender: 'M',
        material: "PU",
        image_url: 'https://i.pinimg.com/736x/74/09/de/7409deab53b84a15587e163e0ca04551.jpg',
        description: "These Shoes are Heels over Hands for you!"
    },
    {
        product_name: 'DJ Tennis Pro',
        price: 97.99,
        stock: 24,
        category_id: 1,
        gender: 'K',
        material: "C",
        image_url: 'https://ikeeneye.files.wordpress.com/2006/11/gansta3.jpg',
        description: 'Rock out on the court!'
    },
    {
        product_name: 'Spongebob Foot',
        price: 4.99,
        stock: 64,
        category_id: 3,
        gender: 'M',
        material: "L",
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/61IHRf-jPgL._AC_UL1250_.jpg',
        description: 'For underwater races'
    },
    {
        product_name: 'Banana Peel',
        price: 87.99,
        stock: 14,
        category_id: 6,
        gender: 'M',
        material: "L",
        image_url: 'https://awesomestuff365.com/wp-content/uploads/2018/06/Banana-Shoes-.jpg',
        description: 'Slip into comfort'
    }

];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;