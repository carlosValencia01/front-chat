import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import Swal from "sweetalert2";

import TimerIcon from "@mui/icons-material/Timer";

import { ContactInfo } from "./components/ContactInfo";
import { DateOfBirt } from "./components/DateOfBirt";
import { Name } from "./components/Name";

import clipboard from "./images/notepad.png";

function App() {
  const regexMonth = /^(0?[1-9]|1[012])$/;
  const regexDay = /^(0?[1-9]|[12][0-9]|3[01])$/;
  const regexYear = /^(\d{4})$/;
  const regexMail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const regexName = /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/;

  const [valid, setValid] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const {
    nombre,
    segundo_nombre,
    apellido_paterno,
    apellido_materno,
    day,
    month,
    year,
    email,
    telefono,
  } = useSelector((state) => state, shallowEqual);

  const checkData = () => {
    // Check if all fields are ok
    if (nombre.trim().length === 0) {
      setError("Nombre obligatorio");
      return false;
    } else if (apellido_paterno.trim().length === 0) {
      setError("Apellido obligatorio");
      return false;
    } else if (!regexName.test(nombre.trim())) {
      setError("Nombre inicia con mayuscula y solo letras");
      return false;
    } else if (
      segundo_nombre.trim().length !== 0 &&
      !regexName.test(segundo_nombre.trim())
    ) {
      setError("Nombre inicia con mayuscula y solo letras");
      return false;
    } else if (!regexName.test(apellido_paterno.trim())) {
      setError("Apellido inicia con mayuscula y solo letras");
      return false;
    } else if (
      apellido_materno.trim().length !== 0 &&
      !regexName.test(apellido_materno.trim())
    ) {
      setError("Apellido inicia con mayuscula y solo letras");
      return false;
    }
    if (!regexDay.test(day.trim())) {
      setError("Ingrese un dia entre 1 y 31");
      return false;
    } else if (!regexMonth.test(month.trim())) {
      setError("Ingrese un mes entre 1 y 12");
      return false;
    } else if (!regexYear.test(year.trim())) {
      setError("Ingrese un año valido");
      return false;
    }

    if (!regexMail.test(email.trim())) {
      setError("Ingrese un correo valido");
      return false;
    } else if (telefono.trim().length < 10) {
      setError("Ingrese un telefono valido");
      return false;
    }

    setValid(true);
    setError("");
    return true;
  };

  useEffect(() => {
    checkData();
  }, [
    nombre,
    segundo_nombre,
    apellido_paterno,
    apellido_materno,
    day,
    month,
    year,
    email,
    telefono,
  ]);

  const handleSave = () => {
    checkData();
    if (valid) {
      sessionStorage.setItem("nombre", nombre);
      sessionStorage.setItem("segundo_nombre", segundo_nombre);
      sessionStorage.setItem("apellido_paterno", apellido_paterno);
      sessionStorage.setItem("apellido_materno", apellido_materno);
      sessionStorage.setItem("fecha_nacimiento", `${day} - ${month} - ${year}`);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("telefono", telefono);

      const data = {
        nombre: nombre,
        segundo_nombre: segundo_nombre,
        apellido_paterno: apellido_paterno,
        apellido_materno: apellido_materno,
        fechaNacimiento: `${year}-${month}-${day}`,
        email: email,
        telefono: telefono,
      };

      //Fetch data
      fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: "Guardado",
            text: "Usuario guardado",
            icon: "success",
            confirmButtonText: "Ok",
          });
        });
      setSaved(true);
    } else {
      setShowMessage(true);
    }
  };

  return (
    <>
      <div className="form-title-container">
        <div className="title-container-text">
          <p>
            <strong>Titulo del formulario</strong>
          </p>
          <p className="mt-5">
            <TimerIcon />
            En menos de 5 minutos.
          </p>
        </div>
        <div className="title-container-image">
          <img src={clipboard} alt="profile" className="profile-image" />
        </div>
      </div>
      <Name />
      <DateOfBirt />
      <ContactInfo />

      {valid && (
        <div className="continue">
          <p>Si tus datos son correctos por favor continuemos</p>
        </div>
      )}

      {error.length > 0 && (
        <div className="continue">
          <p>{error}</p>
        </div>
      )}

      <button className="btn btn-pink btn-lg btn-block" onClick={handleSave}>
        Iniciar
      </button>

      {saved && (
        <div className="full-info">
          <p>
            Fecha de nacimiento: {day} {month} {year}
          </p>
          <p>Correo electrónico: {email}</p>
          <p>Teléfono celular: {telefono}</p>
          <p>
            Nombre: {nombre} {segundo_nombre} {apellido_paterno}{" "}
            {apellido_materno}
          </p>
        </div>
      )}
    </>
  );
}

export default App;
