import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../actions/user.action";
import { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { isEmpty } from "./Utils";

export default function Navbar(){

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.currentUserReducer.user)
    const isLogged = useSelector((state) => state.sessionReducer.Authorization)
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let handleScroll = () => {
        const position = window.pageYOffset
        setScrollPosition(position)
    }
    

    let handleLogout = () => {
        dispatch(userLogout(currentUser.id))

    }
    

    return (
        <>
            <div className={`flex fixed inset-0 z-50 h-20 w-full backdrop-blur-lg duration-200 ${scrollPosition >= 20 ? "shadow" : ""}`}>
                <div className={`h-full w-full opacity-75 duration-200 ${scrollPosition >= 20 ? "bg-slate-200" : ""}`}></div>
            </div>
            <header className="flex fixed inset-0 z-50 h-20 w-full bg-transparent container">
                <nav className="flex justify-between items-center h-full w-full">
                    <div className="flex items-center">
                        <Link 
                        className="text-4xl font-PlayfairDisplay font-medium flex-grow ml-5 sm:ml-10"
                        to="/home"
                        >
                            SpaceZone
                        </Link>
                    </div>
                    <div className="md:hidden mr-5 sm:mr-10 text-white">
                        {isLogged ?
                        <Dropdown
                            label={
                                <img
                                    className="h-8 w-8 object-cover object-center rounded-full"
                                    src={`./uploads/profil/${currentUser.profil_picture || "default.jpg"}` || `../uploads/profil/${currentUser.profil_picture || "default.jpg"}`}
                                    onError={(e) => {
                                        e.target.onerror = '/profil.jpg'; // empêche les boucles d'erreur infinies
                                        e.target.src = '/profil.jpg' ;
                                    }}
                                    alt="User profile image"
                                />
                            }
                            inline={true}
                            dismissOnClick={true}
                        >
                            <Dropdown.Item>
                                <Link to="/dashboard" className="text-white font-Lato">Dashboard</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/profil" className="text-white font-Lato">Mon profil</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/carts" className="text-white font-Lato">Panier</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <button 
                                className="flex items-center font-karla rounded-md"
                                onClick={handleLogout}
                                >
                                    <h3 className="text-white font-Lato">Se déconnecter</h3>
                                </button>
                            </Dropdown.Item>
                        </Dropdown>
                        :
                        <Link to="/" className="text-md font-karla font-medium rounded-md text-blue-700">S'identifier</Link>
                    }
                    </div>
                    <ul className="md:flex items-center mr-10 space-x-10 hidden">
                        {!isLogged ? <li className="cursor-pointer">
                            <Link to="/" className="text-md font-karla font-medium rounded-md text-blue-700">S'identifier</Link>
                        </li> : "" }
                        {isLogged && (!isEmpty(currentUser) && currentUser.permission == 'ADMINISTRATOR' ) || (!isEmpty(currentUser) && currentUser.permission == 'MODERATOR') ? <li className="cursor-pointer">
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
                                src={`./uploads/profil/${!isEmpty(currentUser) ? currentUser.profil_picture : ""}`}
                                onError={(e) => {
                                    e.target.onerror = null; // empêche les boucles d'erreur infinies
                                    e.target.src = '../uploads/profil/default.jpg'; // charge une image alternative
                                }}
                                alt="image de profil"
                                className="rounded-full object-fill object-center h-8 w-8"
                            />
                            </Link>
                        </li> : "" }
                    </ul>
                </nav>
            </header>
        </>
    )
}