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
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProdutos(data));

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

  const carrinhoQuantidade = carrinho.reduce((acc, item) => acc + item.qtd, 0);
  const icone = carrinhoQuantidade > 0;

  return (
    <>
        <nav className="nav-produtos">
            <button id="cart-check">
                <Link id="cart-check-link" to={'/checkout'} state={{ carrinho }}>
                    <i className={`bi ${icone ? 'bi-cart-check' : 'bi-cart'}`}></i>
                    <h6>{carrinhoQuantidade === 0 ? '' : carrinhoQuantidade}</h6>
                </Link>
            </button>
        </nav>
        <div className="produtos-container">
            <h2>Produtos</h2>
            <div className="grid-produtos">
                {produtos.map(produto => (
                    <div key={produto.id}>
                        <Link className="produto" to={`/produtos/${produto.id}`} state={{ test: produtos.length, carrinho }}>
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
