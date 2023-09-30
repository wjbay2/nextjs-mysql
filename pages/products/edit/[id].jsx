import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, AddEditForm } from 'components/products';
import { Spinner } from 'components';
import { productService, alertService } from 'services';

export default function Edit() {
    const router = useRouter();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch product and set default form values if in edit mode
        productService.getById(id)
            .then(x => setProduct(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h2 className='mb-4'>Edit Product</h2>
            {product ? <AddEditForm product={product} /> : <Spinner />}
        </Layout>
    );
}