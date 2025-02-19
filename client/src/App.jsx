import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './widgets/Layout/Layout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>

        </Route>
        <Route path='*' element={<>404</>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
