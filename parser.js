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
            } else if (product.brands === 'NULL') {
                product.brands = null;
            }
        });
    });

    objProducts.map(product => {
        product.price = parseFloat(product.price.toString());

        if (product['images/0/small'] !== '') {
            product['img'] = [{
                small: product['images/0/small'],
                medium: product['images/0/medium'],
                large: product['images/0/large']
            }];
        }

        if (product['images/1/small'] !== '') {
            product['img'].push(
                {
                    small: product['images/1/small'],
                    medium: product['images/1/medium'],
                    large: product['images/1/large']
                }
            );
        }

        if (product['images/2/small'] !== '') {
            product['img'].push(
                {
                    small: product['images/2/small'],
                    medium: product['images/2/medium'],
                    large: product['images/2/large']
                }
            );
        }

        if (product['images/3/small'] !== '') {
            product['img'].push(
                {
                    small: product['images/3/small'],
                    medium: product['images/3/medium'],
                    large: product['images/3/large']
                }
            );
        }

        if (product['images/4/small'] !== '') {
            product['img'].push(
                {
                    small: product['images/4/small'],
                    medium: product['images/4/medium'],
                    large: product['images/4/large']
                }
            );
        }

        product.isHit = false;
        product.isView = true;
        product.date = new Date('2020-08-21T02:42:44.809+00:00');

        delete product['images/0/small'];
        delete product['images/0/medium'];
        delete product['images/0/large'];
        delete product['images/1/small'];
        delete product['images/1/medium'];
        delete product['images/1/large'];
        delete product['images/2/small'];
        delete product['images/2/medium'];
        delete product['images/2/large'];
        delete product['images/3/small'];
        delete product['images/3/medium'];
        delete product['images/3/large'];
        delete product['images/4/small'];
        delete product['images/4/medium'];
        delete product['images/4/large'];
    });

    let json = JSON.stringify(objProducts);
    fs.writeFile('json/testProducts.json', json, 'utf8', function () {
    });
});
