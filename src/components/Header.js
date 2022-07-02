import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Badge } from 'primereact/badge';
import { Menubar } from 'primereact/menubar';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'

function Header({ setSelectedCategory, selectedCategory }) {
  const navigate = useNavigate()


  const productState = useSelector((state) => (state.productList.data).length)

  const items = [
    {
      label: <div style={{ fontSize: "30px", letterSpacing: "0.3rem", fontWeight: "600" }}>Valarona</div>,
    },
    {
      label: 'Photos',
      icon: 'pi pi-fw pi-user',
      command: () => { setSelectedCategory("photos") }

    },
    {
      label: 'Posts',
      icon: 'pi pi-fw pi-user',
      command: () => { setSelectedCategory("posts") }

    },
    {
      label: "Albums",
      icon: 'pi pi-fw pi-calendar',
      command: () => { setSelectedCategory("albums") }

    },
    {
      label: "Todo",
      icon: 'pi pi-fw pi-power-off',
      command: () => { setSelectedCategory("todos") }
    },
    {
      label: "Logout",
      icon: 'pi pi-fw pi-power-off',
      command: () => { navigate("/") }
    }
  ];

  const handleCart = (e) => {

  }

  const end = <div>

    <Button onClick={handleCart} style={{ marginRight: "20px" }} label="Redux Store"> <Badge value={productState}></Badge></Button>
    <Button label={"Hello " + window.sessionStorage.getItem("userName")}></Button>
  </div>;


  return (
    <div >
      <Menubar model={items} end={end} />
    </div>
  );
}


export default Header;
