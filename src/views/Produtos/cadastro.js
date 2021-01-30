import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Erro from '../../components/Alerts/Erro'
import Sucesso from '../../components/Alerts/Sucesso'
import Card from '../../components/Card'
import ProdutoService from '../../services/ProdutoService'

class CadastroProduto extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            sku: '',
            descricao: '',
            preco: '',
            fornecedor: '',
            sucesso: false,
            erros: [],
            atualizando: false
        }
        this.service = new ProdutoService();

        this.limpar = this.limpar.bind(this)
        this.salvar = this.salvar.bind(this)
        this.obterProduto = this.obterProduto.bind(this)
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

    componentDidMount() {
        this.limpar();
        this.obterProduto();
    }

    obterProduto() {
        this.setState({ erros: [] });

        const sku = this.props.match.params.sku

        if (sku) {
            const resultado = this.service.consultar().filter(produto => produto.sku === sku)

            if (resultado.length > 0) {
                const produto = resultado[0]
                this.setState({
                    ...produto, atualizando: true
                })
            }
        } else {
            this.setState({ sku: Date.now().toString(36) });
        }
    }

    limpar() {
        this.setState({
            nome: '',
            sku: '',
            descricao: '',
            preco: '',
            fornecedor: '',
            erros: []
        });
    }

    render() {
        return (

            <Card titulo={this.state.atualizando ? 'Atualizando Produto' : 'Cadastrando Produto'}>

                {this.state.sucesso &&
                    <Sucesso />
                }

                {this.state.erros.length > 1 &&
                    this.state.erros.map((erro, i) => (
                        <Erro key={i} erro={erro} />
                    ))
                }

                <form id='formulario' onSubmit={this.salvar}>

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
                                    <input type="text" readOnly className="form-control" value={this.state.sku} />
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
                                <button type="submit" className="btn btn-primary">
                                    {this.state.atualizando ? 'Atualizar' : 'Salvar'}
                                </button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.limpar} className="btn btn-danger">Limpar</button>
                            </div>
                        </div>

                    </div>

                </form>
            </Card>
        )
    }
}


export default withRouter(CadastroProduto)