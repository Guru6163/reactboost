import React, { useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import "../styles.css"
import { Toast } from 'primereact/toast';


function UpdateProduct() {
    const toast = useRef(null);
    const [formData, setFormData] = useState({})
    const defaultValues = {
        title: '',
        body: '',
        userId: '',

    }
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'The Product is Updated', life: 3000 });
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = async (data) => {

        await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: data.title,
                body: data.body,
                userId: data.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                showSuccess()
            });
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    return (
        <div>
            <Toast ref={toast} />
            <div className="flex justify-content-center">
                <div className="card">

                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid m-5">
                        <div className="field">
                            <span className="p-float-label mb-4">
                                <Controller name="title" control={control} rules={{ required: 'Title is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.title} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="title" className={classNames({ 'p-error': errors.title })}>Title*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label mb-4">
                                <Controller name="body" control={control} rules={{ required: 'Body is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="body" className={classNames({ 'p-error': errors.body })}>Body*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label mb-4">
                                <Controller name="userId" control={control} rules={{ required: 'User ID is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.userId} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="userId" className={classNames({ 'p-error': errors.UserId })}>User ID*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <Button type="submit" label="Submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct