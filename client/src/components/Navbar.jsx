import { Link } from "react-router-dom";

export default function Header(){
    return (
        <>
            <header className="flex relative inset-0 z-50 h-20 w-full bg-gradient-to-br from-neutral-100 to-neutral-200">
                <nav className="flex items-center h-full w-full">
                    <Link 
                    className="font-kanit text-4xl flex-grow ml-10"
                    to="/"
                    >
                        SpaceZone
                    </Link>
                    <ul className="flex justify-end mr-10 space-x-14">
                        <li className="cursor-pointer">
                            <Link to="/authentification">Se connecter</Link>
                        </li>
                        <li>
                            <Link to="/panier">Mon panier</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}