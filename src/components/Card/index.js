import React from 'react'

export default (props) => (
    <div className="card">
        <div className="card-header">
            {props.titulo}
        </div>

        {props.children}

    </div>
);