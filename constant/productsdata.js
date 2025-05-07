const BASE_URL = "https://projectbackend-d5qv.onrender.com";

const products = [
    { 
        id: 'product1',
        url: "http://localhost:8005/images/ProductImg1.png", 
        detailUrl: `${BASE_URL}/images/ProductImg1.png`,
        title: {
            shortTitle: `Premium Raw Tobacco for Authentic Experience\u2002(1 kg)`,
            longTitle: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience (1 kg)'
        }, 
        price: {
            mrp: 599,
            cost: 499,
            discount: '17%'
        },
        description: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience',
        discount: '₹499', 
        tagline: 'Pack of 1' 
    },
    { 
        id: 'product2',
        url: "http://localhost:8005/images/ProductImg2.png", 
        detailUrl: `${BASE_URL}/images/ProductImg2.png`,
        title: {
            shortTitle: 'Premium Raw Tobacco for Authentic Experience\u2002(500 gm)',
            longTitle: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience (500 gm)'
        },
        price: {
            mrp: 599,
            cost: 499,
            discount: '40%'
        },
        description: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience',
        discount: '₹499', 
        tagline: 'Pack of 2' 
    },
    { 
        id: 'product3',
        url: "http://localhost:8005/images/ProductImg3.png", 
        detailUrl: `${BASE_URL}/images/ProductImg3.png`, 
        title: {
            shortTitle: 'Premium Raw Tobacco for Authentic Experience\u2002(250 gm)',
            longTitle: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience (250 gm)'
        }, 
        price: {
            mrp: 599,
            cost: 499,
            discount: '66%'
        },
        description: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience',
        discount: '₹499', 
        tagline: 'Pack of 4' 
    },
    { 
        id: 'product4',
        url: "http://localhost:8005/images/ProductImg4.png", 
        detailUrl: `${BASE_URL}/images/ProductImg4.png`,
        title: {
            shortTitle: 'Premium Raw Tobacco for Authentic Experience\u2002(200 gm)',
            longTitle: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience (200 gm)'
        }, 
        price: {
            mrp: 599,
            cost: 499,
            discount: '83%'
        },
        description: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience',
        discount: '₹499', 
        tagline: 'Pack of 5' 
    },
    { 
        id: 'product5',
        url: "http://localhost:8005/images/ProductImg5.png", 
        detailUrl: `${BASE_URL}/images/ProductImg5.png`,
        title: {
            shortTitle: 'Premium Raw Tobacco for Authentic Experience\u2002(100 gm)',
            longTitle: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience (100 gm)'
        }, 
        price: {
            mrp: 599,
            cost: 499,
            discount: '17%'
        },
        description: 'Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience',
        discount: '₹499', 
        tagline: 'Pack of 10' 
    },
    { 
        id: 'product6',
        url:"http://localhost:8005/images/ProductImg6.jpg", 
        detailUrl: `${BASE_URL}/images/ProductImg6.jpg`,
        title: {
            shortTitle: 'Durable Plastic Tobacco Box - Convenient \nand Secure Storage',
            longTitle: 'Durable Plastic Tobacco Box - Compact, Lightweight, and Perfect for Storing Your Raw Tobacco Securely | Ideal for On-the-Go Use'
        }, 
        price: {
            mrp: 299,
            cost: 199,
            discount: '17%'
        },
        description: 'Durable Plastic Tobacco Box - Compact, Lightweight, and Perfect for Storing Your Raw Tobacco Securely | Ideal for On-the-Go Use',
        discount: '₹199', 
        tagline: 'Pack of 1' 
    },
    { 
        id: 'product7',
        url: "http://localhost:8005/images/ProductImg7.jpg", 
        detailUrl: `${BASE_URL}/images/ProductImg7.jpg`,
        title: {
            shortTitle: 'Elegant Silver Tobacco Box - Stylish and Premium Storage Solution',
            longTitle: 'Elegant Silver Tobacco Box - Sleek, Durable, and Classy Storage for Your Raw Tobacco | A Premium Choice for Discerning Smokers',
        }, 
        price: {
            mrp: 1099,
            cost: 999,
            discount: '42%'
        },
        description: 'Elegant Silver Tobacco Box - Sleek, Durable, and Classy Storage for Your Raw Tobacco | A Premium Choice for Discerning Smokers',
        discount: '₹999', 
        tagline: 'Pack of 2' 
    },
    { 
        id: 'product8',
        url: "http://localhost:8005/images/ProductImg8.jpg",
        detailUrl: `${BASE_URL}/images/ProductImg8.jpg`, 
        title: {
            shortTitle: 'Vintage Brass Tobacco Box - Timeless, Strong, and Practical Storage',
            longTitle: 'Vintage Brass Tobacco Box - Durable, Classic, and Secure Storage for Raw Tobacco | A Premium, Timeless Choice for Smokers'
        }, 
        price: {
            mrp: 399,
            cost: 299,
            discount: '40%'
        },
        description: 'Vintage Brass Tobacco Box - Durable, Classic, and Secure Storage for Raw Tobacco | A Premium, Timeless Choice for Smokers',
        discount: '₹299', 
        tagline: 'Pack of 1' 
    }
]

module.exports = products;
