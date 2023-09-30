import { apiHandler, productsRepo } from 'helpers/api';

export default apiHandler({
    post: create
});

async function create(req, res) {
    await productsRepo.create(req.body);
    return res.status(200).json({});
}
