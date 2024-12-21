import { Navigate, Route, Routes } from "react-router-dom"
import {  Login, Membro, NotFound, SendMessage } from "../pages"
import PrivateRouter from "./PrivateRoute"



export const AppRoutes = () => {
    return (
        <Routes>
{/* rotas privadas */}
           <Route path="/membros" element={<PrivateRouter><Membro /></PrivateRouter>} />     
           <Route path="/mensagens/whatssap" element={<PrivateRouter><SendMessage/></PrivateRouter>} />    
           <Route path="/notfound" element={<NotFound />} />
           <Route path="/login" element={<Login />} />
           <Route path="*" element={<Navigate to="/notfound " />} />
        </Routes>
    )
}