import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './views/Home'
import CadastroProduto from './views/Produtos/cadastro'
import ConsultaProduto from './views/Produtos/consulta'

export default () => {
    return (
        <Switch>
            <Route exact path="/cadastro-produtos/:sku?" component={CadastroProduto} />
            <Route exact path="/consulta-produtos" component={ConsultaProduto} />
            <Route exact path="/" component={Home} />
        </Switch>
    );
}