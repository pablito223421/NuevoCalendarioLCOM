import React from 'react'

function EditarCampo({ enEdicion, value, tipo, nombre, className, opciones }) {

    return (
        <>
            {tipo === 'select' ?
                <select
                    className={className}
                    name={nombre}
                    value={value}
                    onChange={enEdicion}
                >
                    {opciones ? opciones.map((el, index) => (
                        <option key={index} value={el}>{el}</option>
                    )) : null}
                </select> :
                <input
                    type={tipo}
                    name={nombre}
                    className={className}
                    value={value}
                    maxLength="30"
                    onChange={enEdicion}

                />}
        </>
    )
}


export default EditarCampo;