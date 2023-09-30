import { Layout, AddEditForm } from 'components/products';

export default function Add() {
    return (
        <Layout>
            <h2 className='mb-4'>Add Product</h2>
            <AddEditForm />
        </Layout>
    );
}