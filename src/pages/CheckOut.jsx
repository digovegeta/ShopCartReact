import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Fetch from '../utis/Fetch';
import { Link } from 'react-router-dom'
import ReduzirTexto from '../utis/ReduzirTexto';

export default function CheckOut(){
    const navigate = useNavigate();
    const location = useLocation();
    const [carrinho, setCarrinho] = useState(location.state.carrinho)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0)
    let valor = 0;
    useEffect(() => {
        async function fetchData() {
            const result = await Fetch('https://fakestoreapi.com/products');
            setData(result);
            setLoading(false);
            valor = 0;
            result.map(e => ( carrinho.filter(c => {if(e.id == c.id) addTotal(parseFloat(e.price) * parseInt(c.qtd))})))
        }
        fetchData();
    }, []);

    if (loading) return <p>Carregando...</p>;
    function addTotal(valor2){
        console.log(valor2);
        valor += valor2;
        setTotal(valor)
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
        data.map(e => ( carrinho.filter(c => {if(e.id == c.id) addTotal(parseFloat(e.price) * parseInt(c.qtd))})))
    }
    function isID(e, id) {
        return e.id === id;
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
        console.log(valor);
        setCarrinho(temp);
        data.map(e => ( carrinho.filter(c => {if(e.id == c.id) addTotal(parseFloat(e.price) * parseInt(c.qtd))})))
        if(carrinho.length == 0){
            setTotal(0);
        }
    }
    return(
        <>
            <Link to={'/produtos'} state={ {carrinho} }><button class="voltar-detalhes btn"><i class="bi bi-arrow-left-square"></i></button></Link>
            <div class="div">
            <table id='table-checkout'>
                <thead>
                    <th class="td-id-th">item</th>
                    <th class="td-title-th">nome</th>
                    <th class="td-price-th">valor</th>
                    <th class="td-qtd-th">quantidade</th>
                    <th class="td-total-th">total</th>
                </thead>
            {data.map(data => (
                carrinho.map(carrinho => (
                    data.id == carrinho.id?                 
                    <tbody>
                    <td class="td-id">{carrinho.id}</td>
                    <td class="td-title">{ReduzirTexto(data.title,70)}</td>
                    <td class="td-price">R$ {data.price.toFixed(2)}</td>
                    <td class="td-qtd">
                        <button class="btn" onClick={() => removed(data.id)}><i class="bi bi-dash"></i></button>
                        {carrinho.qtd}
                        <button class="btn" onClick={() => add(data.id)}><i class="bi bi-plus-lg"></i></button>
                    </td>                                
                    <td class="td-total">R$ {(parseFloat(data.price) * parseInt(carrinho.qtd)).toFixed(2)}</td>
                </tbody>: ""))
            ))}
            </table>
        </div>
        <div id="total-checkout">
            <h4>Total R$ {total.toFixed(2)}</h4>
        </div>
        </>
    )
}