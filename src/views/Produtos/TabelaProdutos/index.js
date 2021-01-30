import React from 'react'
import { FaPenSquare, FaTrash } from 'react-icons/fa'

export default (props) => (
    <table className="table table-hover">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Sku</th>
                <th>Preço</th>
                <th>Fornecedor</th>
                <th>Ações</th>
            </tr>
        </thead>

        <tbody>
            {props.produtos.length > 0 ?
                props.produtos.map((produto, i) => {
                    return (
                        <tr key={i}>
                            <td>{produto.nome}</td>
                            <td>{produto.sku}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.fornecedor}</td>
                            <td>
                                <button onClick={() => props.acaoEditar(produto.sku)} className="btn btn-primary btn-sm mr-2">
                                    <FaPenSquare size={20} />
                                </button>
                                <button onClick={() => props.acaoExcluir(produto.sku)} className="btn btn-danger btn-sm">
                                    <FaTrash size={20} />
                                </button>
                            </td>

                        </tr>

                    )
                })
                :
                <tr>
                    <td colSpan="5" className="text-center">Nenhum produto encontrado!</td>
                </tr>
            }

        </tbody>
    </table>


)