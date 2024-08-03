export default function Header({ titulo, nome }) {
    return (
        <header className="h-20 px-2 bg-primary text-secundary">
            <section className="w-full h-full max-w-7xl m-auto flex justify-center items-center">
                <div>
                    <h1 className="font-bold text-2xl bg-red-900">{titulo}</h1>
                    <p className="text-center">{nome}</p>
                </div>
            </section>
        </header>
    )
}