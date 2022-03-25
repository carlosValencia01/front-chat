import React from "react";
import { useForm } from "../hooks/useForm";

export const Name = () => {
  const initialState = {
    nombre: "",
    segundo_nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
  };

  const [formValues, handleInputChange, reset] = useForm(initialState);
  const { nombre, segundo_nombre, apellido_paterno, apellido_materno } =
    formValues;

  const isFormValid = () => {
    if (nombre.trim().length === 0) {
      return false;
    } else if (apellido_paterno.trim().length === 0) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div>
        <h5>¿Cuál es tu nombre?</h5>
        <input
          type="text"
          placeholder="Nombre"
          name="nombre"
          autoComplete="off"
          value={nombre}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Segundo nombre"
          name="segundo_nombre"
          autoComplete="off"
          value={segundo_nombre}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Apellido paterno"
          name="apellido_paterno"
          autoComplete="off"
          value={apellido_paterno}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Apellido materno"
          name="apellido_materno"
          autoComplete="off"
          value={apellido_materno}
          onChange={handleInputChange}
        />
      </div>
      {isFormValid() && (
        <div>
          <p>
            {nombre} {segundo_nombre} {apellido_paterno} {apellido_materno}
          </p>
        </div>
      )}
    </>
  );
};
