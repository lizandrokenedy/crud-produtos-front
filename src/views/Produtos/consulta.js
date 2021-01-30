import React, { Component } from 'react'
import ProdutoService from '../../services/ProdutoService'
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import TabelaProdutos from './TabelaProdutos';

class ConsultaProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
            erros: []
        }

        this.service = new ProdutoService();

        this.consultar = this.consultar.bind(this);
        this.editar = this.editar.bind(this);
        this.excluir = this.excluir.bind(this);
    }

    componentDidMount() {
        this.consultar();
    }

    consultar() {
        const produtos = this.service.consultar();
        this.setState({ produtos: produtos });
    }

    editar(sku) {
        this.props.history.push(`/cadastro-produtos/${sku}`)
    }

    excluir(sku) {
        try {
            const produtosAtualizados = this.service.excluir(sku);
            this.setState({ produtos: produtosAtualizados });

        } catch (erro) {
            console.log(erro);
            const erros = erro.errors;
            this.setState({ erros: erros });
        }
    }

    render() {
        return (
            <Card titulo="Consultar Produtos">

                <TabelaProdutos
                    produtos={this.state.produtos}
                    acaoEditar={this.editar}
                    acaoExcluir={this.excluir}
                />

                <div className="row">
                    <div className="col-sm-1">
                        <button onClick={this.consultar} className="btn btn-primary">Consultar</button>
                    </div>
                </div>
            </Card>
        )
    }
}


export default withRouter(ConsultaProduto)