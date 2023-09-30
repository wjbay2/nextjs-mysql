import { Layout, AddEdit } from 'components/products';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Add Product</h1>
            <AddEdit />
        </Layout>
    );
}