import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { contact } from "../actions/appActions";
import { useForm } from "../hooks/useForm";

import profile from "../images/profile.png";

export const ContactInfo = () => {
  const regexMail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const dispatch = useDispatch();
  const initialState = {
    email: "",
    telefono: "",
  };

  const [valid, setValid] = useState(false);
  const [formValues, handleInputChange] = useForm(initialState);
  const { email, telefono } = formValues;

  useEffect(() => {
    setValid(isFormValid());
  }, [handleInputChange]);

  const isFormValid = () => {
    dispatch(contact(email, telefono));
    if (!regexMail.test(email.trim())) {
      return false;
    } else if (telefono.trim().length < 10) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="question-main-container">
        <div className="image-container">
          <img src={profile} alt="profile" className="profile-image" />
        </div>
        <div className="question-container">
          <h5 className="ms-3">
            <strong>Datos de contacto</strong>
          </h5>

          <input
            className="form-control question-input"
            type="text"
            placeholder="Correo electrónico"
            name="email"
            autoComplete="off"
            value={email}
            onChange={handleInputChange}
          />

          <input
            className="form-control question-input"
            type="text"
            placeholder="Teléfono celular"
            name="telefono"
            autoComplete="off"
            value={telefono}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {valid && (
        <div className="info">
          <p>Correo electrónico: {email}</p>
          <p>Teléfono celular: {telefono}</p>
        </div>
      )}
    </>
  );
};
