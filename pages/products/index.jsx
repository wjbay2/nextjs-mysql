import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Spinner } from 'components';
import { Layout } from 'components/products';
import { productService } from 'services';
import Image from 'next/image';

export default function Index() {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        productService.getAll().then(x => setProducts(x));
    }, []);

    function deleteProduct(id) {
        setProducts(products.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        productService.delete(id).then(() => {
            setProducts(products => products.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Products</h1>
            <Link href="/products/add" className="btn btn-sm btn-success mb-2">Add Product</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Name</th>
                        <th style={{ width: '15%' }}>Image</th>
                        <th style={{ width: '35%' }}>Description</th>
                        <th style={{ width: '20%' }}>Price</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product => <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.image &&
                            <Image src={product.image} alt="image" width={40} height={40}
                                style={{ objectFit: 'contain' }} />
                        }</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link href={`/products/edit/${product.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                            <button onClick={() => deleteProduct(product.id)} className="btn btn-sm btn-danger btn-delete-product" style={{ width: '60px' }} disabled={product.isDeleting}>
                                {product.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>}
                            </button>
                        </td>
                    </tr>
                    )}
                    {!products &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>}
                    {products && !products.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Products To Display</div>
                            </td>
                        </tr>}
                </tbody>
            </table>
        </Layout>
    );
}