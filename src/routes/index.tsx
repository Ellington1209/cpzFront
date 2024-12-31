import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Membro, NotFound, SendMessage } from "../pages";
import PrivateRouter from "./PrivateRoute";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Rotas privadas */}
            <Route
                path="/membros"
                element={
                    <PrivateRouter>
                        <Membro />
                    </PrivateRouter>
                }
            />
            <Route
                path="/mensagens/whatsapp"
                element={
                    <PrivateRouter>
                        <SendMessage />
                    </PrivateRouter>
                }
            />

            {/* Rotas públicas */}
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/login" element={<Login />} />

            {/* Redireciona "/" para login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Rotas inexistentes levam para notfound */}
            <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
    );
};
