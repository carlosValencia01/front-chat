import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { birth } from "../actions/appActions";
import { useForm } from "../hooks/useForm";

import profile from "../images/profile.png";

export const DateOfBirt = () => {
  const regexMonth = /^(0?[1-9]|1[012])$/;
  const regexDay = /^(0?[1-9]|[12][0-9]|3[01])$/;
  const regexYear = /^(\d{4})$/;

  const dispatch = useDispatch();

  const initialState = {
    day: "",
    month: "",
    year: "",
  };

  const [valid, setValid] = useState(false);
  const [formValues, handleInputChange] = useForm(initialState);
  const { day, month, year } = formValues;

  useEffect(() => {
    setValid(isFormValid());
  }, [handleInputChange]);

  const isFormValid = () => {
    dispatch(birth(day, month, year));
    if (!regexDay.test(day.trim())) {
      return false;
    } else if (!regexMonth.test(month.trim())) {
      return false;
    } else if (!regexYear.test(year.trim())) {
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
            <strong>¿Cuál es tu fecha de nacimiento?</strong>
          </h5>

          <input
            className="form-control question-input"
            type="text"
            placeholder="Dia"
            name="day"
            autoComplete="off"
            value={day}
            onChange={handleInputChange}
          />

          <input
            className="form-control question-input"
            type="text"
            placeholder="Mes"
            name="month"
            autoComplete="off"
            value={month}
            onChange={handleInputChange}
          />

          <input
            className="form-control question-input"
            type="text"
            placeholder="Año"
            name="year"
            autoComplete="off"
            value={year}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {valid && (
        <div className="info">
          <p>
            {day} {month} {year}
          </p>
        </div>
      )}
    </>
  );
};
