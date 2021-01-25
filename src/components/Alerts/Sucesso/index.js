import React from 'react'

export default function Sucesso(props) {
    return (
        <div className="alert alert-dismissible alert-success">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            Operação realizada com sucesso.
        </div>
    )
}


