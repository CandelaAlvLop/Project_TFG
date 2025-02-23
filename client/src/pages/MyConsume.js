import React, {useEffect, useState} from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";
import "../layouts/MyConsume.css";
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function MyConsume() {
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nie, setNIE] = useState("");
    const [password, setPassword] = useState("");
    const [numPeople, setNumPeople] = useState("");
    const [extraQuestion1, setExtraQuestion1] = useState("");
    const [extraQuestion2, setExtraQuestion2] = useState("");

    return (
        <div>
            <Navbar />
            <Navbar2 />
        <div className="personal-data-container">
            <h2>Datos personales</h2>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Nombre y apellido"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FaPen className="edit-icon" />
                <input
                    type="text"
                    placeholder="NIE"
                    value={nie}
                    onChange={(e) => setNIE(e.target.value)}
                />
                <FaPen className="edit-icon" />
            </div>

            <div className="input-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FaPen className="edit-icon" />
                <select value={password} onChange={(e) => setPassword(e.target.value)}>
                    <option>Cambiar contraseña</option>
                </select>
            </div>

            <h3>Queremos conocerte más</h3>
            <select value={numPeople} onChange={(e) => setNumPeople(e.target.value)}>
                <option>¿Con cuántas personas convives en el domicilio?</option>
            </select>

            <select value={extraQuestion1} onChange={(e) => setExtraQuestion1(e.target.value)}>
                <option>Otra pregunta relevante para brindar un informe más personal</option>
            </select>

            <select value={extraQuestion2} onChange={(e) => setExtraQuestion2(e.target.value)}>
                <option>Otra pregunta relevante para brindar un informe más personal</option>
            </select>

            <div className="buttons">
                <button className="cancel">Cancelar</button>
                <button className="save">Guardar</button>
            </div>

            <div className="vivienda">
                <h3>Vivienda</h3>
                <p>Carrer de València 396, Barcelona</p>
                <div className="add-vivienda">
                    <FaPlus className="plus-icon" />
                    <input type="text" placeholder="Agregar otra vivienda" disabled />
                </div>
                <button className="save">Guardar</button>
            </div>

            <div className="consumos">
                <h3>Mis consumos cedidos</h3>
                <div className="icons">
                    <span>🔥 Gas</span>
                    <span>💧 Agua</span>
                    <span>💡 Electricidad</span>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default MyConsume;

