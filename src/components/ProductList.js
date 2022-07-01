import React, { useState } from 'react'
import useApi from '../hooks/useApi';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import "../styles.css"
import { useSelector, useDispatch } from 'react-redux'
import { Rating } from 'primereact/rating';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { addtoCartRedux } from '../store/cart';

function ProductList({ selectedCategory }) {
  const dispatch = useDispatch()
  const [products, setProducts] = useState(null);
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ];
  const { data, isLoading, loadError } = useApi(
    `https://fakestoreapi.com/products/category/${selectedCategory}`,
    []
  );
  console.log(data, selectedCategory)
  const state = useSelector((state) => state)
  console.log("State", state)


  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <h2>{(selectedCategory)}</h2>
      </div>
    );
  }

  const header = renderHeader();
  const renderListItem = (data) => {
    return (
      <div style={{ border: "1px solid grey", margin: "10px" }} className="col-12">
        <div className="product-list-item">
          <img src={data.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
          <div style={{ margin: "0px 40px" }} className="product-list-detail">
            <div className="product-name">{data.title}</div>
            <div className="product-description">{data.description}</div>

            <i className="pi pi-tag product-category-icon"></i><span className="product-category">{(data.category).toUpperCase()}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price">${data.price}</span>
            <Button icon="pi pi-shopping-cart" label="Add to Cart" onClick={() => dispatch(addtoCartRedux(data))
            } ></Button>

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
        <Divider style={{ margin: "30px" }} align="center">
          <h1 >Welcome to Valarona Shopping</h1>
        </Divider>
        <div className="dataview-demo">
          <div style={{ margin: "30px" }} className="card">
            <DataView layout={layout} header={header} value={data}
              itemTemplate={itemTemplate} paginator rows={9}

            ></DataView>
          </div>

        </div>
      </div>
    )
  }
}

export default ProductList