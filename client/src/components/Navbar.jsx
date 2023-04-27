import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../actions/user.action";
import { useEffect } from "react";
import { useState } from "react";

export default function Navbar(){

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.currentUserReducer)
    const isLogged = useSelector((state) => state.sessionReducer.Authorization)
    const [isAdmin, setIsAdmin] = useState(currentUser.permission === 'ADMINISTRATOR' ? true : false)
    const navigate = useNavigate()

    let handleLogout = () => {
        dispatch(userLogout(currentUser.id))

    }
    return (
        <>
            <div className="flex fixed inset-0 z-50 h-20 w-full backdrop-blur-lg shadow-lg">
                <div className="h-full w-full bg-slate-300 opacity-50"></div>
            </div>
            <header className="flex fixed inset-0 z-50 h-20 w-full bg-transparent">
                <nav className="flex justify-between items-center h-full w-full">
                    <div className="flex items-center space-x-10">
                        <Link 
                        className="font-kanit text-4xl flex-grow ml-10"
                        to="/home"
                        >
                            SpaceZone
                        </Link>
                        <select className="bg-neutral-900 text-slate-200 rounded-xl py-1 px-2 active:scale-95 duration-200" name="language">
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                        </select>
                    </div>
                    <ul className="flex items-center mr-10 space-x-10">
                        {!isLogged ? <li className="cursor-pointer">
                            <Link to="/" className="text-md font-karla font-medium rounded-md text-blue-700">S'identifier</Link>
                        </li> : "" }

                        {isLogged && isAdmin ? <li className="cursor-pointer">
                            <Link 
                            className="text-md font-karla rounded-md text-black"
                            to="/dashboard"
                            >Dashboard</Link>
                        </li> : "" }
                        
                        {isLogged ? <li className="cursor-pointer">
                            <Link to="/carts" className="text-md font-karla rounded-md text-black">
                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m7 10 5-6 5 6"></path>
                                    <path d="m21 10-2 8c-.093.573-.345 1.087-.71 1.453-.366.365-.822.559-1.29.547H7c-.468.012-.924-.182-1.29-.547-.365-.366-.617-.88-.71-1.453l-2-8h18Z"></path>
                                    <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                                </svg>
                            </Link>
                        </li> : "" }
                        {isLogged ? <li className="cursor-pointer">
                            <button 
                            className="flex items-center text-md font-karla rounded-md text-black"
                            onClick={handleLogout}
                            >
                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path>
                                    <path d="M21 12H7"></path>
                                    <path d="m18 15 3-3-3-3"></path>
                                </svg>
                            </button>
                        </li> : "" }
                        {isLogged ? 
                        <li className="flex items-center cursor-pointer">
                            <Link to="/profil" className="flex items-center text-md font-karla font-medium rounded-md text-blue-700">
                            <img
                                src={`./uploads/profil/${currentUser.profil_picture}`}
                                onError={(e) => {
                                    e.target.onerror = null; // empêche les boucles d'erreur infinies
                                    e.target.src = './uploads/profil/default.jpg'; // charge une image alternative
                                }}
                                alt="image de profil"
                                className="rounded-full h-8 w-8"
                            />
                            </Link>
                        </li> : "" }
                    </ul>
                </nav>
            </header>
        </>
    )
}