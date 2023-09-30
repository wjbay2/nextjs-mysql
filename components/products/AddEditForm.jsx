import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { client } from 'filestack-react';
import Image from 'next/image';
import { productService, alertService } from 'services'

function AddEditForm(props) {
    const product = props?.product;
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        image: Yup.string()
            .required('Image is required'),
        description: Yup.string()
            .required('Description is required'),
        price: Yup.number()
            .typeError('Price must be a number')
            .required('Price is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (product) {
        formOptions.defaultValues = props.product;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update product based on product prop
            let message;
            if (product) {
                await productService.update(product.id, data);
                message = 'Product updated';
            } else {
                await productService.add(data);
                message = 'Product added';
            }

            // redirect to product list with success message
            router.push('/products');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    // handle file upload
    const [file, setFile] = useState('');
    const filePickerOptions = {
        accept: 'image/*',
        maxSize: 1024 * 1024,
        maxFiles: 1,
        //  onFileUploadFinished: this.setcanvasBG,
        onUploadDone: (file) => { console.log('file', file); setFile(file.filesUploaded[0].url) },
    };
    const handleFilePicker = () => {
        const filestackApikey = 'AG0OQdIMbQGWQVBGoo5Cwz'; //insert here with your own api key
        const filestack = client.init(filestackApikey, filePickerOptions);
        const picker = filestack.picker(filePickerOptions);
        picker.open();
    };
    let displayImage = file !== '' ? file : product?.image;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">Name</label>
                    <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="mb-3 col d-flex flex-column align-items-start">
                    <label className="form-label">Image</label>
                    <input name="image" type="text" {...register('image')} className={`visually-hidden  form-control ${errors.image ? 'is-invalid' : ''}`} value={displayImage} />
                    {displayImage &&
                        <div className='border mb-2'>
                            <Image src={displayImage} alt="image" width={100} height={100}
                                style={{ objectFit: 'contain' }} />
                        </div>
                    }
                    <button type='button' className='btn btn-dark btn-sm' onClick={() => handleFilePicker()}>Click to upload file</button>
                    <div className="invalid-feedback">{errors.image?.message}</div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">Description</label>
                    <textarea name="description" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Price</label>
                    <input name="price" type="number" step=".01" {...register('price')} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.price?.message}</div>
                </div>
            </div>
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => { reset(formOptions.defaultValues); setFile(product?.image || ""); }} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/products" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEditForm };