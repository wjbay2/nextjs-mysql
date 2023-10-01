import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Spinner } from 'components';
import { Layout } from 'components/products';
import { productService } from 'services';
import Image from 'next/image';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useRouter } from 'next/router';

const ITEMS_PER_PAGE = 1;

export default function Index() {
    const router = useRouter();

    const [products, setProducts] = useState(null);
    const [page, setPage] = useState(null);

    const [totalProducts, setTotalProducts] = useState(0);
    const offset = ITEMS_PER_PAGE * (page - 1);

    useEffect(() => {
        productService.findAndCountAll(ITEMS_PER_PAGE, offset < 0 ? 0 : offset).then(x => { setProducts(x.rows); setTotalProducts(x.count) });
    }, [page]);

    useEffect(() => {
        if (!router.isReady) return;

        if (!router.query.page) {
            router.push('?page=1');
        }
        setPage(router.query.page);
    }, [router.isReady]);

    useEffect(() => {
        if (!products) return;
        setTotalProducts(products.length);
    }, [page])

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
            <h2 className='mb-4'>Products</h2>
            <Link href="/products/add" className="btn btn-success mb-2">Add Product</Link>
            <table className="table table-hover">
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
                        <td>
                            {product.image &&
                                <a href={product.image} target='_blank'>
                                    <Image src={product.image} alt="image" width={40} height={40}
                                        style={{ objectFit: 'contain' }} />
                                </a>
                            }
                        </td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link
                                href={`/products/edit/${product.id}`}
                                className="btn btn-sm btn-primary me-3">Edit</Link>
                            <button onClick={() => {
                                if (confirm(`Confirm to delete ${product.name} ?`)) { deleteProduct(product.id) }
                            }} className="btn btn-sm btn-danger btn-delete-product"
                                style={{ width: '60px' }} disabled={product.isDeleting}>
                                {product.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                    )}
                    {!products &&
                        <tr>
                            <td colSpan="5">
                                <Spinner />
                            </td>
                        </tr>}
                    {products && !products.length &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                <div className="p-2">No Products found!</div>
                            </td>
                        </tr>}
                </tbody>
            </table>
            {totalProducts > 0 &&
                <div className='mt-5 d-flex justify-content-end'>
                    <PaginationControl
                        page={page}
                        total={totalProducts || 0}
                        limit={ITEMS_PER_PAGE}
                        changePage={(page) => {
                            router.push('?page=' + page);
                            setPage(page);
                        }} />
                </div>
            }
        </Layout>
    );
}
