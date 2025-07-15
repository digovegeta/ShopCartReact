import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Fetch from '../utis/Fetch';
import { useParams } from "react-router-dom"
import { validate } from 'email-validator';
import { Link } from 'react-router-dom'

export default function DetalhesProdutos(){
    const paraments = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    let [produtos, setProdutos] = useState(parseInt(paraments.id));
    const [carrinho, setCarrinho] = useState(location.state.carrinho != undefined ? location.state.carrinho :[])


    useEffect(() => {
        async function fetchData() {
            const result = await Fetch('https://fakestoreapi.com/products/'+paraments.id);
            setData(result);
            setLoading(false);
        }
        fetchData();
    }, []);
        function a(id){
            async function fetchData() {
            const result = await Fetch('https://fakestoreapi.com/products/'+id);
            setData(result);
            setLoading(false);
        }
        setProdutos(id);
        fetchData();
        }
    if (loading) return <p>Carregando...</p>;

    function validateProdutos(valor){
        if(produtos + valor > location.state.test){
            return 1;
        }
        if(produtos + valor < 1){
            return location.state.test;
        }
        return produtos + valor;
    }

    return(
        <>
        <div class='nav-detalhes'>
            <Link to={'/produtos'} state={ {carrinho} }><button class="voltar-detalhes btn" ><i class="bi bi-arrow-left-square"></i></button></Link>
            <div class="nav-produtos-detalhes">
                <Link class='link' to={'/produtos/'+validateProdutos(-1)} onClick={() => a(validateProdutos(-1))} state={ {test: location.state.test, carrinho } }><i class="bi bi-arrow-left-short"></i> </Link>
                <p>{produtos}</p>
                <Link class='link' to={'/produtos/'+validateProdutos(1)} onClick={() => a(validateProdutos(1))} state={ {test: location.state.test, carrinho } }><i class="bi bi-arrow-right-short"></i> </Link>
            </div>
            <div></div>
        </div>
        <div class="titulo-detalhes">
            {data.title}
        </div>
        <div class="container-detalhes">
            <img class="img-detalhes" src={data.image} alt="" />
            <div class="detalhes-inf">
                <div class="top-detalhes">
                    <h1>R$ {data.price.toFixed(2)}</h1>
                </div>
                <div class="meio-detalhes">
                    <h3>{data.description}</h3>
                </div>
                <div class="rodape-detalhes">
                    <p>Categoria: {data.category}</p>
                    <p>Avaliação {data.rating.rate}</p>
                </div>
            </div>
        </div>             
        </>
    )
}