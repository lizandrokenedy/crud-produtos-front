
const PRODUTOS = '_PRODUTOS'

export function ErroValidacao(errors) {
    this.errors = errors;
}

export default class ProdutoService {

    obterIndex = (sku) => {
        let index = null;
        this.consultar().map((produto, i) => {
            if (produto.sku === sku) {
                index = i
                console.log(i);
            }
        })

        return index;
    }

    salvar = (produto) => {
        this.validar(produto)
        let produtos = localStorage.getItem(PRODUTOS);

        if (!produtos) {
            produtos = [];
        } else {
            produtos = JSON.parse(produtos)
        }

        const index = this.obterIndex(produto.sku)

        if (index === null) {
            produtos.push(produto);
        } else {
            produtos[index] = produto;
        }

        localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
    }

    excluir = (sku) => {
        // console.log(sku)
        let produtos = localStorage.getItem(PRODUTOS);

        if (!produtos) {
            produtos = [];
        } else {
            produtos = JSON.parse(produtos)
        }

        produtos = produtos.filter(produto => produto.sku !== sku);


        localStorage.setItem(PRODUTOS, JSON.stringify(produtos));

        return produtos;
    }

    validar = (produto) => {
        const errors = [];

        if (!produto.nome) {
            errors.push('O campo nome é obrigatório!')
        }

        if (!produto.sku) {
            errors.push('O campo sku é obrigatório!')
        }

        if (!produto.descricao) {
            errors.push('O campo descricao é obrigatório!')
        }

        if (!produto.preco) {
            errors.push('O campo preco é obrigatório!')
        }

        if (!produto.fornecedor) {
            errors.push('O campo fornecedor é obrigatório!')
        }


        if (errors.length > 0) {
            // throw new Error(errors);
            throw new ErroValidacao(errors);
        }

    }

    consultar = (pesquisa) => {
        const produtos = JSON.parse(localStorage.getItem(PRODUTOS))
        return produtos ? produtos : []
    }
}
