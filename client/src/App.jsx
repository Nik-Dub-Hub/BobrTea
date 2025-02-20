import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./widgets/Layout/Layout";
import RegPage from "./pages/RegPage/RegPage";
import MainPage from "./pages/MainPage/MainPage";
import OneTeaPage from "./pages/OneTeaPage/OneTeaPage"


function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/reg" element={<RegPage setUser={setUser} />} />
          <Route path="/tea/:id" element={<OneTeaPage />} />
        </Route>
        <Route path="*" element={<>Извинитесь!</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
