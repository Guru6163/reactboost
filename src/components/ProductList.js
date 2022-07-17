import React, { useState, useEffect, useRef } from 'react'
import useApi from '../hooks/useApi';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import "../styles.css"
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux'
import { loadProductList } from '../store/productList';
import { DataView, } from 'primereact/dataview';
import { addtoCartRedux } from '../store/cart';
import { Dialog } from 'primereact/dialog';
import UpdateProduct from './UpdateProduct';
import CreateProduct from "./CreateProduct"
import { Toast } from 'primereact/toast';


function ProductList({ selectedCategory }) {
  const dispatch = useDispatch()
  const [layout, setLayout] = useState('grid');
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [displayResponsive1, setDisplayResponsive1] = useState(false);
  const [position, setPosition] = useState('center');
  const [position1, setPosition1] = useState('center');
  const [formData, setFormData] = useState({});
  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayPosition1, setDisplayPosition1] = useState(false);
  const toast = useRef(null);

  const defaultValues = {
    title: '',
    body: '',
    userId: '',

  }

  const dialogFuncMap = {

    'displayPosition': setDisplayPosition,
    'displayResponsive': setDisplayResponsive
  }
  const dialogFuncMap1 = {

    'displayPosition1': setDisplayPosition1,
    'displayResponsive1': setDisplayResponsive1
  }
  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
  const onSubmit = (data) => {
    setFormData(data);
    console.log("Submitted")
    reset();
  };
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  }
  const onClick1 = (name, position) => {
    dialogFuncMap1[`${name}`](true);

    if (position) {
      setPosition1(position);
    }
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }

  const { data, isLoading, loadError } = useSelector(
    (state) => state.productList
  );
  const onHide1 = (name) => {
    dialogFuncMap1[`${name}`](false);
  }
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'The Product has been Added to the Cart', life: 3000 });
  }


  useEffect(() => {
    dispatch(loadProductList(selectedCategory));
  }, [dispatch, selectedCategory]);

  const state = useSelector((state) => state.productList)
  const state2 = useSelector((state) => state)
  console.log(state2)



  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <h2>{(selectedCategory)}</h2>
      </div>
    );
  }
  const renderTableHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h2 className="m-0">All Products</h2>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <Button label="Add Product" onClick={() => {
            onClick1('displayResponsive1')
            console.log("Clicked")
          }} ></Button>
        </span>
      </div>
    )
  }

  const header = renderHeader();
  const renderListItem = (data) => {
    return (
      <div style={{ border: "1px solid grey", margin: "10px" }} className="col-12">
        <div className="product-list-item">
          <img src={data.url} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
          <div style={{ margin: "0px 40px" }} className="product-list-detail">
            <div className="product-name">{data.title}</div>
            <div className="product-description">{data.description}</div>

            <span className="product-category">{(data.body)}</span>
          </div>

          <div className="product-list-action">
            <span className="product-price">{data.price}</span>
            <Button label='Add to Cart' onClick={() => {
              dispatch(addtoCartRedux(data))
              showSuccess()
            }} >
            </Button>
            <Button icon="pi pi-globe" label="Edit Product" onClick={() => {
              onClick('displayResponsive')
              console.log("Clicked")
            }}
            ></Button>
          </div>
        </div>
      </div>
    );
  }


  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }
    return renderListItem(product);

  }



  if (isLoading) {
    return <div className='loading'>Product Loading....Please Wait</div>;
  } else if (loadError) {
    return <div>Load Error -- {loadError.message}</div>;
  } else {
    return (
      <div className='container'>
        <Toast ref={toast} />
        <Divider style={{ margin: "30px" }} align="center">
          <h1 >Welcome to Valarona Shopping</h1>
        </Divider>

        <div className="dataview-demo">
          <div style={{ margin: "30px 100px" }} className="card">
            <DataView layout={layout} header={renderTableHeader()} value={state.data}
              itemTemplate={itemTemplate} paginator rows={9}

            ></DataView>
            <Dialog header="Update Product" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '30vw' }} >
              <div>
                <UpdateProduct />
              </div>
            </Dialog>
            <Dialog header="Create Product" visible={displayResponsive1} onHide={() => onHide1('displayResponsive1')} breakpoints={{ '960px': '75vw' }} style={{ width: '30vw' }} >
              <div>
                <CreateProduct />
              </div>
            </Dialog>
          </div>

        </div>
      </div>
    )
  }
}

export default ProductList