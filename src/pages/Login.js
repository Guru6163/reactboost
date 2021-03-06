import React, { useEffect, useState, useRef, useContext } from "react";
import { Dialog } from 'primereact/dialog';


import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";

function Login() {
    const [displayPosition, setDisplayPosition] = useState(false);

    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const dialogFuncMap = {
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const [formData, setFormData] = useState({});
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validate: (data) => {
            let errors = {};
            if (!data.userName) {
                errors.userName = "User Name is required.";
            }
            if (!data.password) {
                errors.password = "Password is required.";
            }
            return errors;
        },

        onSubmit: async (data) => {
            window.sessionStorage.setItem("userName", data.userName)
            console.log(data)
            onClick('displayResponsive')
            // navigate("/home")

        },
    });

    const isFormFieldValid = (name) =>
        !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return (
            isFormFieldValid(name) && (
                <small className="p-error">{formik.errors[name]}</small>
            )
        );
    };
    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>

                <Button label="Proceed" icon="pi pi-check" onClick={() => {
                    onHide(name)
                    navigate("/home")
                }} autoFocus />
            </div>
        );
    }

    return (
        <div style={{ height: "100%", display: "flex" }}>

            <div
                style={{
                    background: "white",
                    width: "45%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>

                    <div className="">
                        <form onSubmit={formik.handleSubmit} className="p-fluid">
                            <div
                                style={{
                                    display: "flex",
                                    margin: "20px 0px",
                                    justifyContent: "center",
                                }}
                            >
                                <div>
                                    <i
                                        style={{ fontSize: "30px", margin: "10px" }}
                                        className="pi pi-user"
                                    ></i>
                                </div>

                                <div style={{ textAlign: "center", margin: "10px" }}>
                                    <div style={{ fontSize: "25px", fontWeight: "700" }}>
                                        Sign in to your Account
                                    </div>

                                </div>
                            </div>
                            <div className="text-center m-3">Enter your name and any password</div>
                            <div className="p-field">
                                <InputText
                                    id="userName"
                                    style={{ height: "45px" }}
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                    autoFocus
                                    placeholder="Username "
                                    className={classNames({
                                        "p-invalid": isFormFieldValid("userName"),
                                    })}
                                />
                                {getFormErrorMessage("userName")}
                            </div>

                            <div className="p-field">
                                <Password
                                    style={{ height: "45px" }}
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className={classNames({
                                        "p-invalid": isFormFieldValid("password"),
                                    })}
                                    feedback={false}
                                />
                                {getFormErrorMessage("password")}
                            </div>
                            <div
                                className="col-12"
                                style={{
                                    margin: "20px 0px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <Checkbox inputId="cb1" value="Keep me Logged"></Checkbox>
                                    <label
                                        style={{ marginLeft: "10px" }}
                                        htmlFor="cb1"
                                        className="p-checkbox-label"
                                    >
                                        Keep Me Logged
                                    </label>
                                </div>
                                <strong style={{ color: "#2A2B8F", cursor: "pointer" }}>
                                    Forget Password
                                </strong>
                            </div>

                            <Button
                                type="submit"
                                label="Sign In"
                                style={{
                                    background: "#2A2B8F",
                                    height: "45px",
                                }}
                                // onClick={()=>{
                                //   login(formik.values.userName,formik.values.password).then(res=>console.log(res))
                                // }}
                                className="mt-2"
                            />
                        </form>
                        <div
                            style={{
                                display: "flex",
                                margin: "10px 0px",
                                justifyContent: "center",
                            }}
                        >
                            <div style={{ margin: "5px" }}>Don't have an account?</div>
                            <strong
                                style={{ margin: "5px", color: "#2A2B8F", cursor: "pointer" }}
                            >
                                Sign Up
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog header="Frameworks/ Libraries/ Modules used in this Project" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} footer={renderFooter('displayResponsive')}>
                <div className="m-2">
                    React
                </div>
                <div className="m-2">
                    Redux
                </div>
                <div className="m-2">
                    Fetch API
                </div>
                <div className="m-2">
                    PrimeReact
                </div>
                <div className="m-2">
                    Formik for Login Screen || React Hooks Form for Add/Update Product
                </div>
                <div className="m-2">
                    Backend - JSONplaceholder.com
                </div>
                <div className="m-2">
                    * Used Async/Await, Arrow Functions and Form Validation
                </div>
                <div className="m-2">
                    * Stored the Username in Localstorage
                </div>
                <div className="m-2">
                    * Stored all the Data fetched from the API to the Redux Store
                </div>
            </Dialog>
            <div style={{ width: "50%", height: "100vh" }}>
                <img style={{ height: "100%" }} src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?t=st=1656610261~exp=1656610861~hmac=7fbd6ca823f109627f5b586bd9f8493c6f6fe33e4c30cad0a5b1dea12779cf2f&w=900"></img>
            </div>
        </div>
    )
}

export default Login