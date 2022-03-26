import { types } from "../types/types";

const initialState = {
  nombre: "",
  segundo_nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  day: "",
  month: "",
  year: "",
  email: "",
  telefono: "",
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.name:
      return {
        ...state,
        nombre: action.payload.nombre,
        segundo_nombre: action.payload.segundo_nombre,
        apellido_paterno: action.payload.apellido_paterno,
        apellido_materno: action.payload.apellido_materno,
      };
    case types.birth:
      return {
        ...state,
        day: action.payload.day,
        month: action.payload.month,
        year: action.payload.year,
      };
    case types.contact:
      return {
        ...state,
        email: action.payload.email,
        telefono: action.payload.telefono,
      };

    default:
      return state;
  }
};
