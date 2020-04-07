import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
    const [busqueda, setBusqueda] = useState({
        ciudad: "",
        pais: "",
    });
    const [consultar, setConsultar] = useState(false);

    const [resultado, setResultado] = useState({});

    const [error, setError] = useState(false)

    const { ciudad, pais } = busqueda;


    useEffect(() => {

        const consultarAPI = async () => {
            if (consultar) {
                const apikey = '11abc20eaf446adcfd04901f2f307f9c';
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apikey}`;

                const respuesta = await fetch(url);
                const res = await respuesta.json();

                setResultado(res);
                setConsultar(false)

                if (resultado.cod === '404') {
                    setError(true);
                } else {
                    setError(false);
                }
            }
        };
        consultarAPI();
    }, [consultar, ciudad, pais, resultado.cod]);


    return (
        <Fragment>
            <Header titulo="Clima React App" />

            <div className="contenedor-form">
                <div className="container">
                    <div className="row">
                        <div className="col m6 s12">
                            <Formulario
                                busqueda={busqueda}
                                setBusqueda={setBusqueda}
                                setConsultar={setConsultar}
                            />
                        </div>
                        <div className="col m6 s12">
                            {error ? <Error
                                mensaje="No hay resultados"
                            />
                                : <Clima
                                    resultado={resultado}
                                />}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
