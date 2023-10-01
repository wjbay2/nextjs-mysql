import { apiHandler, productsRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const product = await productsRepo.getById(req.query.id);

    if (!product) throw 'Product Not Found';

    return res.status(200).json(product);
}

async function update(req, res) {
    await productsRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await productsRepo.delete(req.query.id);
    return res.status(200).json({});
}
