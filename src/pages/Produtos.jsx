import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, useLocation } from 'react-router-dom';
import ReduzirTexto from '../utis/ReduzirTexto';

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);  
    const usuario = localStorage.getItem("usuarioLogado");
    const chaveCarrinho = `carrinho-${usuario}`;
    const [carrinho, setCarrinho] = useState(JSON.parse(localStorage.getItem(chaveCarrinho)));
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('todas');
    const [categorias, setCategorias] = useState([]);
    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            setProdutos(data);
            const categoriasUnicas = Array.from(new Set(data.map(p => p.category)));
            setCategorias(categoriasUnicas);
        });
        const carrinhoSalvo = localStorage.getItem(chaveCarrinho);
        if (carrinhoSalvo) {
        setCarrinho(JSON.parse(carrinhoSalvo));
        }else{
            localStorage.setItem(`carrinho-${usuario}`, []);
        }
        
    }, []);

    useEffect(() => {
        localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
    }, [carrinho]);

    const produtosFiltrados = categoriaSelecionada === 'todas' ? produtos : produtos.filter(p => p.category === categoriaSelecionada);

    const adicionarAoCarrinho = (produto) => {
        const index = carrinho.findIndex(item => item.id === produto.id);
        if (index >= 0) {
        const novoCarrinho = [...carrinho];
        novoCarrinho[index].qtd += 1;
        setCarrinho(novoCarrinho);
        } else {
        setCarrinho([...carrinho, { id: produto.id, produto, qtd: 1 }]);
        }
        console.log(carrinho);
    };

    const removerDoCarrinho = (produtoId) => {
        const index = carrinho.findIndex(item => item.id === produtoId);
        if (index >= 0) {
        const novoCarrinho = [...carrinho];
        if (novoCarrinho[index].qtd > 1) {
            novoCarrinho[index].qtd -= 1;
        } else {
            novoCarrinho.splice(index, 1);
        }
        setCarrinho(novoCarrinho);
        }
    };

    const carrinhoQuantidade = carrinho.length;
    const icone = carrinhoQuantidade > 0;

    return (
        <>
            <nav className="nav-produtos">
                <div className="divCategoria">
                    <label htmlFor="categoria">Filtrar por categoria:</label>
                    <select id="categoria" value={categoriaSelecionada} onChange={e => setCategoriaSelecionada(e.target.value)}>
                        <option value="todas">Todas</option>
                        {categorias.map(categoria => (
                            <option key={categoria} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                </div>
                <button id="cart-check">
                    <Link id="cart-check-link" to={'/checkout'} state={{ carrinho }}>
                        <i className={`bi ${icone ? 'bi-cart-check' : 'bi-cart'}`}></i>
                        <h6>{carrinhoQuantidade === 0 ? '' : carrinhoQuantidade}</h6>
                    </Link>
                </button>
            </nav>
            <div className="produtos-container">
                <h1 className='title'>Produtos</h1>
                <div className="grid-produtos">
                    {produtosFiltrados.map(produto => (
                        <div key={produto.id}>
                            <Link className="produto" to={`/produtos/${produto.id}`}>
                                <div className="produto-card">
                                    <h3 className="titulo">{ReduzirTexto(produto.title,70)}</h3>
                                    <div className="box">
                                        <img src={produto.image} alt={produto.title} className="produto-imagem" />
                                        <h4 className="valor">{produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                                </div>
                                </div>
                            </Link>
                            <button className="btn-adicionar" onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao carrinho</button>
                        </div>
                    ))}
                </div>  
            </div>
        </>
    );
}
