import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { name } from "../actions/appActions";

import { useForm } from "../hooks/useForm";
import profile from "../images/profile.png";

export const Name = () => {
  const regexName = /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/;

  const dispatch = useDispatch();

  const initialState = {
    nombre: "",
    segundo_nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
  };
  const [valid, setValid] = useState(false);
  const [formValues, handleInputChange] = useForm(initialState);
  const { nombre, segundo_nombre, apellido_paterno, apellido_materno } =
    formValues;

  useEffect(() => {
    setValid(isFormValid());
  }, [handleInputChange]);

  const isFormValid = () => {
    dispatch(name(nombre, segundo_nombre, apellido_paterno, apellido_materno));
    if (nombre.trim().length === 0) {
      return false;
    } else if (apellido_paterno.trim().length === 0) {
      return false;
    } else if (!regexName.test(nombre.trim())) {
      return false;
    } else if (
      segundo_nombre.trim().length !== 0 &&
      !regexName.test(segundo_nombre.trim())
    ) {
      return false;
    } else if (!regexName.test(apellido_paterno.trim())) {
      return false;
    } else if (
      apellido_materno.trim().length !== 0 &&
      !regexName.test(apellido_materno.trim())
    ) {
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
            <strong>¿Cuál es tu nombre?</strong>
          </h5>
          <input
            className="form-control question-input"
            type="text"
            placeholder="Nombre"
            name="nombre"
            autoComplete="off"
            value={nombre}
            onChange={handleInputChange}
          />

          <input
            className="form-control question-input"
            type="text"
            placeholder="Segundo nombre"
            name="segundo_nombre"
            autoComplete="off"
            value={segundo_nombre}
            onChange={handleInputChange}
          />

          <input
            className="form-control question-input"
            type="text"
            placeholder="Apellido paterno"
            name="apellido_paterno"
            autoComplete="off"
            value={apellido_paterno}
            onChange={handleInputChange}
          />

          <input
            className="form-control question-input"
            type="text"
            placeholder="Apellido materno"
            name="apellido_materno"
            autoComplete="off"
            value={apellido_materno}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {valid && (
        <div className="info">
          <p>
            {nombre} {segundo_nombre} {apellido_paterno} {apellido_materno}
          </p>
        </div>
      )}
    </>
  );
};
