import React from "react";
import { useForm } from "../hooks/useForm";

export const DateOfBirt = () => {
  const initialState = {
    day: "",
    month: "",
    year: "",
  };

  const [formValues, handleInputChange, reset] = useForm(initialState);
  const { day, month, year } = formValues;

  const isFormValid = () => {
    if (day.trim().length === 0) {
      return false;
    } else if (month.trim().length < 2) {
      return false;
    } else if (year.trim().length < 4) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div>
        <h5>¿Cuál es tu fecha de nacimiento?</h5>

        <input
          type="text"
          placeholder="Dia"
          name="day"
          autoComplete="off"
          value={day}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Mes"
          name="month"
          autoComplete="off"
          value={month}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Año"
          name="year"
          autoComplete="off"
          value={year}
          onChange={handleInputChange}
        />
      </div>
      {isFormValid() && (
        <div>
          <p>
            {day} {month} {year}
          </p>
        </div>
      )}
    </>
  );
};
