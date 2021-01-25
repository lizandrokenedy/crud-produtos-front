import React, { Component } from 'react'
import ProdutoService from '../../services/ProdutoService'
import { FaPenSquare, FaTrash } from 'react-icons/fa';

export default class ConsultaProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
        }

        this.service = new ProdutoService();

        this.consultar = this.consultar.bind(this);
        this.editar = this.editar.bind(this);
    }

    componentDidMount() {
        this.consultar();
    }

    consultar() {
        const produtos = this.service.consultar();
        this.setState({ produtos: produtos });
    }

    editar(e) {
        
    }

    render() {
        return (

            <div className="card">
                <div className="card-header">
                    Consultar Produtos
                </div>
                <div className="card-body">
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
                            {this.state.produtos.length > 0 ?
                                this.state.produtos.map((produto, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{produto.nome}</td>
                                            <td>{produto.sku}</td>
                                            <td>{produto.preco}</td>
                                            <td>{produto.fornecedor}</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm mr-2">
                                                    <FaPenSquare size={20} />
                                                </button>
                                                <button className="btn btn-danger btn-sm">
                                                    <FaTrash size={20} />
                                                </button>
                                            </td>

                                        </tr>

                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="4" className="text-center">Nenhum produto encontrado!</td>
                                </tr>
                            }

                        </tbody>
                    </table>

                    <div className="row">
                        <div className="col-sm-1">
                            <button onClick={this.consultar} className="btn btn-primary">Consultar</button>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
