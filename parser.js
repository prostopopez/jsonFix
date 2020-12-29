const fs = require('fs');
const jsdom = require('jsdom');

let objCategories = [];

let objProducts = [];

fs.readFile('json/categories.json', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }

    objCategories = JSON.parse(data);
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

    let json = JSON.stringify(objProducts);
    fs.writeFile('json/testProducts.json', json, 'utf8', function () {
    });
});
