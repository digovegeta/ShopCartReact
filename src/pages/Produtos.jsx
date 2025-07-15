import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Fetch from '../utis/Fetch';
import ReduzirTexto from '../utis/ReduzirTexto';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom'

export default function Produtos() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [carrinho, setCarrinho] = useState(location.state && location.state.carrinho ? location.state.carrinho :[])
    const [icone, setIcone] = useState(carrinho.length != 0);
    const [carrinhoCheck, setCarrinhoCheck] = useState(carrinho.length);
    const [controle, setControle] = useState(false);

    //atualização do item coloco o que no state
//atualização do valor state
//atualização do quantidade na tela

    useEffect(() => {
        async function fetchData() {
            const result = await Fetch('https://fakestoreapi.com/products');
            setData(result);
            setLoading(false);
        }
        fetchData();
    }, []);
    function isID(e, id) {
        return e.id === id;
    }
    function add(id){
        const temp = carrinho;
        const index = temp.findIndex((e) =>  isID(e, id));
        if(index != -1){
            temp[index].qtd += 1;
        }else{
            let obj = {id, qtd: 1};
            temp.push(obj);
        }
        console.log(temp);
        setCarrinho(temp);
        setIcone(carrinho.length != 0);
        setCarrinhoCheck(carrinho.length);
        setControle(!controle);
    }
    function removed(id){
        const temp = carrinho;
        const index = temp.findIndex((e) =>  isID(e, id));
        if(index != -1){
            if(temp[index].qtd > 1){
                temp[index].qtd -= 1;
            }else{
                const i = temp.indexOf(temp[index]);
                if (index > -1) {
                    temp.splice(i, 1);
                }
            }
        }
        console.log(temp);
        setCarrinho(temp);
        setIcone(carrinho.length != 0);
        setCarrinhoCheck(carrinho.length);
        setControle(!controle);
    }
    

    if (loading) return <p>Carregando...</p>;
//<label >Categoria: {produto.category}</label>
    return (
        <div>
            <nav class='nav-produtos'>
                <button id="cart-check">
                    <Link id="cart-check-link" to={'/checkout'} state={ {carrinho} }><i className={`bi ${icone ? 'bi-cart-check':'bi-cart'}`}></i><h6>{carrinhoCheck == 0? '': carrinhoCheck}</h6></Link>
                </button>
            </nav>
            <h1>Produtos</h1>
            <div id="container">
                {data.map(produto => (
                    <div class='produto'>
                        <h2 class="titulo">{ReduzirTexto(produto.title,70)}</h2> 
                        <div class="box">
                            <img src={produto.image} alt="" class="produto-imagem"/>
                            <div class="detalhe">
                                <div class="top">
                                    <h1 class="valor">R$ {produto.price.toFixed(2)}</h1>
                                </div>
                                <div class="rodape">
                                    <button class="btn" onClick={() => removed(produto.id)}><i class="bi bi-dash"></i></button>
                                       <h3>{carrinho.map(carrinho => carrinho.id == produto.id ? <p>{carrinho.qtd}</p>: "")}</h3>
                                    <button class="btn" onClick={() => add(produto.id)}><i class="bi bi-plus-lg"></i></button>
                                    <Link class='link-p' to={'/produtos/'+produto.id} state={ {test: data.length, carrinho } }><button> Detalhes</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
