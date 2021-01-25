import React, { Component } from 'react'
import Erro from '../../components/Alerts/Erro'
import Sucesso from '../../components/Alerts/Sucesso'
import ProdutoService from '../../services/ProdutoService'

export default class CadastroProduto extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            sku: '',
            descricao: '',
            preco: '',
            fornecedor: '',
            sucesso: false,
            erros: []
        }
        this.service = new ProdutoService();

        this.limpar = this.limpar.bind(this)
        this.salvar = this.salvar.bind(this)
    }

    salvar(e) {
        e.preventDefault();

        try {
            const produto = this.state;
            this.service.salvar(produto);
            this.setState({ sucesso: true, erros: [] });
            this.limpar();
        } catch (erro) {
            const erros = erro.errors;

            this.setState({ erros: erros });
        }
    }

    limpar() {
        this.setState({
            nome: '',
            sku: '',
            descricao: '',
            preco: '',
            fornecedor: '',
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Cadastro de Produtos
                </div>

                {this.state.sucesso &&
                    <Sucesso />
                }

                {this.state.erros.length > 0 &&
                    this.state.erros.map((erro, i) => (
                        <Erro key={i} erro={erro} />
                    ))
                }

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text" className="form-control" value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text" className="form-control" value={this.state.sku}
                                    onChange={e => this.setState({ sku: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição: </label>
                                <textarea className="form-control" value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="text" className="form-control" value={this.state.preco}
                                    onChange={e => this.setState({ preco: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text" className="form-control" value={this.state.fornecedor}
                                    onChange={e => this.setState({ fornecedor: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            <button onClick={this.salvar} className="btn btn-primary">Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.limpar} className="btn btn-danger">Limpar</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
