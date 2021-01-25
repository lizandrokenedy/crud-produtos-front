import React from 'react'

export default function Erro(props) {
    return (
        <div className="alert alert-dismissible alert-danger">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>Ops!</strong> {props.erro}
        </div>
    )
}
