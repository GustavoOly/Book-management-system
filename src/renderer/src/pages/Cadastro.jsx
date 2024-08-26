import Header from "../components/Header";
import Cadastrar from "../components/Cadastrar";
import NavBar from "../components/NavBar";
export default function Cadastro() {
    return (
        <>
            <Header titulo={"BIBLIOTECA MUNICIPAL"} nome={"JOÃO VEIGA"} />
            <NavBar />
            <Cadastrar />
        </>
    )
}