export default function reduzirTexto(txt, limite){
    if(txt.length > limite){
        return txt.substring(0,limite)+"...";
    }else{
        return txt;
    }
}