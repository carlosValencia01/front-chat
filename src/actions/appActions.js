import { types } from "../types/types";

export const name = (
  nombre,
  segundo_nombre,
  apellido_paterno,
  apellido_materno
) => {
  return {
    type: types.name,
    payload: {
      nombre,
      segundo_nombre,
      apellido_paterno,
      apellido_materno,
    },
  };
};

export const birth = (day, month, year) => {
  return {
    type: types.birth,
    payload: {
      day,
      month,
      year,
    },
  };
};

export const contact = (email, telefono) => {
  return {
    type: types.contact,
    payload: { email, telefono },
  };
};
