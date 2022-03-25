import React from "react";
import { useForm } from "../hooks/useForm";

export const ContactInfo = () => {
  const initialState = {
    email: "",
    telefono: "",
  };

  const [formValues, handleInputChange, reset] = useForm(initialState);
  const { email, telefono } = formValues;

  const isFormValid = () => {
    if (email.trim().length === 0) {
      return false;
    } else if (telefono.trim().length < 10) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div>
        <h5>Datos de contacto</h5>

        <input
          type="text"
          placeholder="Correo electrónico"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Teléfono celular"
          name="telefono"
          autoComplete="off"
          value={telefono}
          onChange={handleInputChange}
        />
        <br />
        <button>Iniciar</button>
      </div>
      {isFormValid() && (
        <div>
          <p>
            {email} {telefono}
          </p>
        </div>
      )}
    </>
  );
};
