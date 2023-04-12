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
                            <Link to="/authentification" className="text-md font-karla uppercase font-medium rounded-md">Connection</Link>
                        </li>
                        <li>
                            <Link to="/panier" className="text-md font-karla uppercase font-medium">Mon panier</Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="text-md font-karla uppercase font-medium">Dashboard</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}