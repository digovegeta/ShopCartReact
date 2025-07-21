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
    let [produto, setProduto] = useState(parseInt());
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const result = await Fetch('https://fakestoreapi.com/products/'+paraments.id);
            await setProduto(result);
            setLoading(false);
        }
        fetchData();
    }, []);
    if (loading) return <p>Carregando...</p>;

    return(
        <>
        <Link to={'/produtos'} ><button className="voltar-detalhes btn" ><i className="bi bi-arrow-left-square"></i></button></Link>
        <div className="titulo-detalhes">
            {produto.title}
        </div>
        <div className="container-detalhes">
            <img className="img-detalhes" src={produto.image} alt="" />
            <div className="detalhes-inf">
                <div className="top-detalhes">
                    <h1>R$ {produto.price.toFixed(2)}</h1>
                </div>
                <div className="meio-detalhes">
                    <h3>{produto.description}</h3>
                </div>
                <div className="rodape-detalhes">
                    <p>Categoria: {produto.category}</p>
                    <p>Avaliação {produto.rating.rate}</p>
                </div>
            </div>
        </div>             
        </>
    )
}