import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, AddEdit } from 'components/products';
import { Spinner } from 'components';
import { productService, alertService } from 'services';

export default Edit;

function Edit() {
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
            <h1>Edit Product</h1>
            {product ? <AddEdit product={product} /> : <Spinner />}
        </Layout>
    );
}