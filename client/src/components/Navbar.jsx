import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../actions/user.action";
import { useEffect } from "react";
import { useState } from "react";

export default function Header(){

    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.currentUserReducer)
    const isLogged = useSelector((state) => state.sessionReducer.Authorization)
    const navigate = useNavigate()

    let handleLogout = () => {
        dispatch(userLogout(currentUser.id))
        navigate('/')
    }
    return (
        <>
            <header className="flex relative inset-0 z-50 h-20 w-full bg-gradient-to-br from-neutral-100 to-neutral-200">
                <nav className="flex justify-between items-center h-full w-full">
                    <div>
                        <Link 
                        className="font-kanit text-4xl flex-grow ml-10"
                        to="/home"
                        >
                            SpaceZone
                        </Link>
                    </div>
                    <ul className="flex items-center mr-10 space-x-14">
                        {!isLogged ? <li className="cursor-pointer">
                            <Link to="/" className="text-md font-karla font-medium rounded-md text-blue-700">S'identifier</Link>
                        </li> : "" }
                        {isLogged ? 
                        <li className="flex items-center cursor-pointer">
                            <img
                            src={`./uploads/${currentUser.username}.jpg`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '../uploads/default.jpg';
                            }}
                            alt="image de profil"
                            className="rounded-full h-8 w-8"
                            />
                            <Link to="/profil" className="text-md font-karla font-medium rounded-md text-blue-700 ml-2">Mon profil</Link>
                        </li> : "" }
                        {isLogged ? <li className="cursor-pointer">
                            <Link to="/carts" className="text-md font-karla rounded-md text-black">Mon Panier</Link>
                        </li> : "" }
                        {isLogged ? <li className="cursor-pointer">
                            <button 
                            className="text-md font-karla rounded-md text-black"
                            onClick={handleLogout}
                            >Se déconnecter</button>
                        </li> : "" }
                        {isLogged ? <li className="cursor-pointer">
                            <Link 
                            className="text-md font-karla rounded-md text-black"
                            to="/dashboard"
                            >Dashboard</Link>
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