import Header from "../components/Header";
import HistoricTable from "../components/table/HistoricTable";
import NavBar from "../components/NavBar";
import Cadastrar from "../components/Cadastrar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Historico() {
    return (
        <Router>
            <Header titulo={"BIBLIOTECA MUNICIPAL"} nome={"JOÃO VEIGA"} />
            <NavBar />
            <Routes>
                <Route path="/" element={<HistoricTable />} />
                <Route path="/cadastro" element={<Cadastrar />} />
            </Routes>
        </Router>
    );
}
