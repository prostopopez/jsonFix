const fs = require('fs');

let objCategories = [];
let objBrands = [];
let objProducts = [];

fs.readFile('json/categories.json', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }

    objCategories = JSON.parse(data);
});

fs.readFile('json/brands.json', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }

    objBrands = JSON.parse(data);
});

fs.readFile('json/productsFormat.json', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }

    objProducts = JSON.parse(data);

    objCategories.map(category => {
        objProducts.map(product => {
            if (product.categories === category.name) {
                product.categories = category._id;
            }
        });
    });

    objBrands.map(brand => {
        objProducts.map(product => {
            if (product.brands === brand.name) {
                product.brands = brand._id;
            }
        });
    });

    let json = JSON.stringify(objProducts);
    fs.writeFile('json/testProducts.json', json, 'utf8', function () {
    });
});
