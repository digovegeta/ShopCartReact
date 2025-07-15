import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/css/Produtos.css'

import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Produtos from './pages/Produtos'
import DetalhesProdutos from './pages/DetalhesProduto'
import CheckOut from './pages/CheckOut'
import NotFound from './pages/NotFound'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/*' element={<NotFound/>}></Route>
        <Route path='/produtos' element={<Produtos/>}></Route>
        <Route path='/produtos/:id' element={<DetalhesProdutos/>}></Route>
        <Route path='/checkout' element={<CheckOut/>}></Route>
      </Routes>
    </>
  )
}

export default App
