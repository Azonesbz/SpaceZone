import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sessionIsValid, userLogout } from "../actions/user.action";
import { useEffect } from "react";
import { useState } from "react";

export default function Header({session}){

    const [isLogged, setIsLogged] = useState(session)
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
      }, []);
    let handleLogout = () => {
        window.localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <>
            <header className="flex relative inset-0 z-50 h-20 w-full bg-gradient-to-br from-neutral-100 to-neutral-200">
                <nav className="flex justify-between items-center h-full w-full">
                    <div>
                        <Link 
                        className="font-kanit text-4xl flex-grow ml-10"
                        to="/"
                        >
                            SpaceZone
                        </Link>
                    </div>
                    <ul className="flex mr-10 space-x-14">
                        {!session ? <li className="cursor-pointer">
                            <Link to="/" className="text-md font-karla font-medium rounded-md text-blue-700">S'identifier</Link>
                        </li> : "" }
                        {session ? <li className="cursor-pointer">
                            <Link to="/profil" className="text-md font-karla font-medium rounded-md text-blue-700">Mon profil</Link>
                        </li> : "" }
                        {session ? <li className="cursor-pointer">
                            <Link to="/profil" className="text-md font-karla rounded-md text-black">Mon Panier</Link>
                        </li> : "" }
                        {session ? <li className="cursor-pointer">
                            <button 
                            className="text-md font-karla rounded-md text-black"
                            onClick={handleLogout}
                            >Se déconnecter</button>
                        </li> : "" }
                        <li className="hidden">
                            <Link to="/panier" className="text-md font-karla uppercase font-medium">Mon panier</Link>
                        </li>
                        <li className="hidden">
                            <Link to="/dashboard" className="text-md font-karla uppercase font-medium">Dashboard</Link>
                        </li>
                        <select name="language">
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                        </select>
                    </ul>
                </nav>
            </header>
        </>
    )
}