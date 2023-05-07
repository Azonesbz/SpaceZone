import { useState } from "react"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../../actions/user.action"
import { useNavigate } from "react-router-dom"
import { sessionIsValid } from "../../actions/session.action"

export default function Login({
    setLogin, 
    setIdentifierValid,
    identify,
    username
}){
    const dispatch = useDispatch()
    const form = useRef()
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    let data;

    let handleSubmit = (e) => {
        e.preventDefault()
        data = {
            email: identify,
            password: form.current[0].value,
        }
        dispatch(loginUser(data))
        dispatch(sessionIsValid())
        navigate('/home')
    }
    return(
        <>
        <button
            className="absolute top-5 left-5 rounded-full active:scale-90 duration-200"
            onClick={() => {
                setLogin(false)
                setIdentifierValid(false)
            }}
            id="back"
        >
            <svg className="text-slate-100" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
                <path d="m12 8-4 4 4 4"></path>
                <path d="M16 12H8"></path>
            </svg>
        </button>
        <section className="flex flex-col sm:space-y-5 items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-700 min-h-screen p-10 text-slate-200 text-Lato">
            <div className="flex flex-col">
                <h1 className="text-5xl font-fine font-semibold text-center">Content de vous revoir <span className="text-blue-700">{username}!</span></h1>
            </div>
            <form
            className="sm:rounded-xl items-center w-full absolute bottom-0 sm:static"
            action=""
            onSubmit={handleSubmit}
            ref={form}
            >
                <label htmlFor="password" className="flex flex-col w-full ">
                    <h2 className="text-2xl p-1">Mot de passe</h2>
                    <div className="flex flex-col items-center rounded w-full sm:gap-2">
                        <input
                        className="py-2 pl-1 pr-1 outline-none text-black sm:rounded-sm w-full text-xl h-10"
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)} 
                        />
                        <button className="py-2 w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-sm text-center" id="login">Connexion</button>
                    </div>
                </label>
            </form>
        </section>
    </>
    )
}