import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../../actions/user.action"
import { useNavigate } from "react-router-dom"
import { sessionIsValid } from "../../actions/session.action"

export default function Login({
    setLogin, 
    setIdentifierValid,
    identify
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
        <section className="flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-700 min-h-screen p-10 text-slate-200">
            <button 
            className="absolute top-5 left-5 rounded-full active:scale-90 duration-200"
            onClick={() => {
                setLogin(false)
                setIdentifierValid(false)
            }}
            >
                <svg className="text-slate-100" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
                    <path d="m12 8-4 4 4 4"></path>
                    <path d="M16 12H8"></path>
                </svg>
            </button>
            <div className="flex flex-col">
                <h1 className="text-6xl font-fine font-semibold text-center">Bienvenue dans la zone <span className="text-blue-700">Azones</span> !</h1>
            </div>
            <form
            className="flex p-5 rounded-xl items-center space-y-5"
            action=""
            onSubmit={handleSubmit}
            ref={form}
            >
                <label htmlFor="password" className="flex flex-col">
                    <h2>Password</h2>
                    <div className="flex items-center rounded space-x-5">
                        <input
                        className="py-2 h-10 pl-3 pr-1 outline-none text-black rounded-sm"
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)} 
                        />
                        <button className="py-2 h-10 px-5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-sm">Connexion</button>
                    </div>
                </label>
            </form>
        </section>
    </>
    )
}