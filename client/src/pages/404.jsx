import { Link } from "react-router-dom"

export default function Error(){
    return (
        <>
            <div className="flex flex-col items-center justify-center space-y-5 min-h-screen">
                <h1 className="text-4xl">Oops.. Erreur 404</h1>
                <h2 className="text-2xl"><Link to="/home" className="text-indigo-800">Cliquez ici</Link> pour revenir sur la page d'acceuil</h2>
            </div>
        </>
    )
}