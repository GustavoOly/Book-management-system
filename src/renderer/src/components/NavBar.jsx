import { FaRegSave } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <section className="w-full h-16 px-2  bg-quinary">
            <div className="max-w-7xl m-auto h-full flex justify-end items-center select-none">
                <div className="flex gap-3">
                    <Link to={"/"}>
                        <div className="p-3 rounded-md flex gap-2 items-center cursor-pointer hover:bg-tertiary ease-in-out duration-200">
                            <FaRegSave />
                            <button>Historico</button>
                        </div>
                    </Link>
                    <Link to="/Novo" className="">
                        <div className="px-6 py-3 rounded-md flex gap-2 items-center cursor-pointer bg-primary text-secundary hover:opacity-85 ease-in-out duration-100">
                            <RiAddLargeFill />
                            <button>Novo</button>
                        </div>
                    </Link>
                </div>
            </div>
        </section >
    )
}