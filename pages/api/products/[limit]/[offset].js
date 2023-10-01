import { apiHandler, productsRepo } from 'helpers/api';

export default apiHandler({
    get: findAndCountAll,
});

async function findAndCountAll(req, res) {
    const products = await productsRepo.findAndCountAll(req.query.limit, req.query.offset);

    if (!products) throw 'Product Not Found';

    return res.status(200).json(products);
}
