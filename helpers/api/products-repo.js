import { db } from 'helpers/api';

export const productsRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await db.Product.findByPk(id);
}

async function create(params) {
    // prevent duplicate name
    if (await db.Product.findOne({ where: { name: params.name } })) {
        throw 'Product name "' + params.name + '" is already taken';
    }

    const product = new db.Product(params);
    
    await product.save();
}

async function update(id, params) {
    const product = await db.Product.findByPk(id);

    // validate
    if (!product) throw 'Product not found';
    if (product.name !== params.name && await db.Product.findOne({ where: { name: params.name } })) {
        throw 'Product name "' + params.name + '" is already taken';
    }

    // copy params properties to product
    Object.assign(product, params);

    await product.save();
}

async function _delete(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';

    // delete product
    await product.destroy();
}
