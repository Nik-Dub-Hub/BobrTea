import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./widgets/Layout/Layout";
import RegPage from "./pages/RegPage/RegPage";
import MainPage from "./pages/MainPage/MainPage";
import UserApi from "./entities/user/UserApi";
import { setAccessToken } from "./shared/lib/axiosInstance";
import LoginPage from "./pages/LoginPage/LoginPage";
import OneTeaPage from "./pages/OneTeaPage/OneTeaPage"
import AdminOffice from "./pages/AdminOffice/AdminOffice";


function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    UserApi.refreshToken().then(({statusCode,data,error,message})=>{
      if(error){
        setUser(null)
        return
      }
      if(statusCode===200){
        setUser(data.user)        
        setAccessToken(data.accessToken)
      }
    }).catch(({message})=>{
      console.log(message);
    })
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/reg" element={<RegPage setUser={setUser} />} />
          <Route path="/login" element={<LoginPage setUser={setUser}/>}/>
          <Route path="/tea/:id" element={<OneTeaPage />} />
          <Route path="/adminOffice" element={<AdminOffice/>}/>
        </Route>
        <Route path="*" element={<>Извинитесь!</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
