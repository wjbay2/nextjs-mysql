import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/products`;

export const productService = {
    add,
    getAll,
    getById,
    findAndCountAll,
    update,
    delete: _delete
};

async function add(product) {
    await fetchWrapper.post(`${baseUrl}/create`, product);
}

async function findAndCountAll(limit, offset) {
    return await fetchWrapper.get(`${baseUrl}/${limit}/${offset}`);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/alter/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/alter/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/alter/${id}`);
}
