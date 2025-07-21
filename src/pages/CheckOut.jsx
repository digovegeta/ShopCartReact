import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReduzirTexto from '../utis/ReduzirTexto';

export default function CheckOut() {
    const navigate = useNavigate();
    const location = useLocation();
    const [usuario, setUser] = useState(localStorage.getItem("usuarioLogado"));
    const [chaveCarrinho, setChave] = useState(`carrinho-${usuario}`);
    const [carrinho, setCarrinho] = useState(JSON.parse(localStorage.getItem(chaveCarrinho)));
    const [total, setTotal] = useState(0);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem(chaveCarrinho);
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));

    const novoTotal = carrinho.reduce((acc, item) => {
      return acc + (item.price * item.qtd);
    }, 0);
    setTotal(novoTotal);
  }, [carrinho]);


    useEffect(() => {
        // Atualiza total sempre que carrinho muda
        const novoTotal = carrinho.reduce((acc, item) => {
            return acc + (item.produto.price * item.qtd);
        }, 0);
        setTotal(novoTotal);
    }, [carrinho]);

    const add = (id) => {
        setCarrinho(prev =>
            prev.map(item =>
                item.id === id ? { ...item, qtd: item.qtd + 1 } : item
            )
        );
    };
    
    const removed = (id) => {
        setCarrinho(prev =>
        prev
            .map(item => {
                if (item.id === id) {
                    if (item.qtd <= 1) return null; 
                    return { ...item, qtd: item.qtd - 1 }; 
                }
                return item;
            })
            .filter(item => item !== null)
        );
    };

    return (
        <>
            <Link to={'/produtos'} state={{ carrinho }}>
                <button className="voltar-detalhes btn">
                    <i className="bi bi-arrow-left-square"></i>
                </button>
            </Link>
            <div className="div">
                <table id='table-checkout'>
                    <thead>
                        <tr>
                            <th className="td-id-th">Item</th>
                            <th className="td-title-th">Nome</th>
                            <th className="td-price-th">Valor</th>
                            <th className="td-qtd-th">Quantidade</th>
                            <th className="td-total-th">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrinho.map(item => (
                            <tr key={item.id}>
                                <td className="td-id" style={{ width: '150px', height: '150px', overflow: 'hidden' }}>
                                    <Link className="produto" to={`/produtos/${item.produto.id}`} >
                                        <img src={item.produto.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain'}}/>
                                    </Link>
                                </td>
                                <td className="td-title">{ReduzirTexto(item.produto.title, 70)}</td>
                                <td className="td-price">R$ {item.produto.price.toFixed(2)}</td>
                                <td className="td-qtd">
                                    <button className="btn" onClick={() => removed(item.id)}><i className="bi bi-dash"></i></button>
                                    {item.qtd}
                                    <button className="btn" onClick={() => add(item.id)}><i className="bi bi-plus-lg"></i></button>
                                </td>
                                <td className="td-total">R$ {(item.produto.price * item.qtd).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div id="total-checkout">
                <h4>Total R$ {total.toFixed(2)}</h4>
            </div>
        </>
    );
}