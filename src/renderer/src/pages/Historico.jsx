import Header from "../components/Header";
import HistoricTable from "../components/table/HistoricTable";
import NavBar from "../components/NavBar";

export default function Historico() {
    return (
        <>
            <Header titulo={"BIBLIOTECA MUNICIPAL"} nome={"JOÃO VEIGA"} />
            <NavBar />
            <HistoricTable />
        </>
    );
}
