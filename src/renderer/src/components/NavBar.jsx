import { FaRegSave } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";

export default function NavBar() {
    return (
        <section className="w-full h-16  bg-tertiary">
            <div className="max-w-6xl m-auto h-full flex justify-end items-center select-none">
                <div className="flex gap-5">
                    <div className="p-3 rounded-md flex gap-2 items-center cursor-pointer">
                        <FaRegSave />
                        <button>Historico</button>
                    </div>
                    <div className="px-6 rounded-md flex gap-2 items-center cursor-pointer  bg-quartenary text-secundary">
                        <RiAddLargeFill />
                        <button>Novo</button>
                    </div>
                </div>
            </div>

        </section>
    )
}