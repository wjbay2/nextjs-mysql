import { apiHandler, productsRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const products = await productsRepo.getAll();
    return res.status(200).json(products);
}
