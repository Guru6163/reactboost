import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Sidebar } from "primereact/sidebar";

import { Badge } from "primereact/badge";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { clearCartRedux } from "../store/cart";
import { useSelector, useDispatch } from "react-redux";

function Header({ setSelectedCategory, selectedCategory }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [visibleRight, setVisibleRight] = useState(false);
  const cart = useSelector((state) => Object.keys(state.cart).length);
  const cartData = useSelector((state) => state.cart);

  const items = [
    {
      label: (
        <div
          style={{
            fontSize: "30px",
            letterSpacing: "0.3rem",
            fontWeight: "600",
          }}
        >
          Valarona
        </div>
      ),
    },
    {
      label: "Photos",
      icon: "pi pi-fw pi-user",
      command: () => {
        setSelectedCategory("photos");
      },
    },
    {
      label: "Posts",
      icon: "pi pi-fw pi-user",
      command: () => {
        setSelectedCategory("posts");
      },
    },
    {
      label: "Albums",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        setSelectedCategory("albums");
      },
    },
    {
      label: "Todo",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        setSelectedCategory("todos");
      },
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        navigate("/");
      },
    },
  ];

  const handleCart = (e) => {
    setVisibleRight(true);
  };

  const end = (
    <div>
      <Button onClick={handleCart} style={{ marginRight: "20px" }} label="Cart">
        {" "}
        <Badge value={cart}></Badge>
      </Button>
      <Button
        label={"Hello " + window.sessionStorage.getItem("userName")}
      ></Button>
    </div>
  );

  return (
    <div>
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <h2>Cart</h2>
        <div className="mt-4">
          {Object.keys(cartData).map((key, i) => <div >
            <div className="m-2 flex text-center">
              <div className="m-2">
                {i + 1}
              </div>
              <strong className="m-2">
                {cartData[key].title} - {cartData[key].quantity}
              </strong>
            </div>
          </div>)}
        </div>
        <div className="flex justify-content-center">
          <Button label="Clear Cart" onClick={() => {
            
            dispatch(clearCartRedux())
          }}></Button>
        </div>
      </Sidebar>
      <Menubar model={items} end={end} />
    </div>
  );
}

export default Header;
