import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../../actions/user.action"
import { Link, useNavigate } from 'react-router-dom'

export default function Register({
    emailValue, 
    setRegister, 
    setIdentifierValid,
    setConfetti
}){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [fieldError, setFieldError] = useState(false)
    
    const form = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const clearPassword = setTimeout(() => {
            setPassword('')
            clearTimeout(clearPassword)
        }, 100)
    },[])

    let data;

    let handleSubmit = (e) => {
        setLoader(true)
        e.preventDefault()
        data = {
            email: form.current[0].value,
            username: form.current[1].value,
            password: form.current[2].value,
        }
        dispatch(addUser(data)).then(res => {
            if(res.status === 201){
                setConfetti(true)
                setTimeout(() => {
                    setConfetti(false)
                    setLoader(false)
                    navigate('/home')
                }, 3000)
            }
        })
        .catch(err => {
            if(err.response.status === 404){
                setTimeout(() => {
                    setLoader(false)
                    setFieldError(true)
                }, 2000)
            }
        })
    }

    return(
        <>
            <section className="flex flex-col items-center min-h-screen sm:p-10">
                {fieldError ? 
                <div className="flex flex-col items-center absolute z-50 inset-0 h-28 w-full bg-slate-200 p-2 shadow">
                    <h3 className="text-red-600 font-semibold text-center mt-2">
                        Tout les champs doivent être rempli avant de pouvoir vous inscrire.
                    </h3>
                    <button
                    className="bg-neutral-900 text-slate-200 mt-2 py-1 px-3 font-Lato rounded-md uppercase"
                    onClick={() => setFieldError(false)}
                    >
                            Ok
                    </button>
                </div>
                : null }
                <div className="flex items-center justify-between w-full absolute top-5 px-5">
                    <button 
                    className=" rounded-full active:scale-90 duration-200 text-neutral-900"
                    onClick={() => {
                        setRegister(false)
                        setIdentifierValid(false)
                    }}
                    id="back"
                    >
                        <svg 
                        width="46" 
                        height="46" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
                            <path d="m12 8-4 4 4 4"></path>
                            <path d="M16 12H8"></path>
                        </svg>
                    </button>
                    <Link className="p-1 text-right underline text-xs md:text-sm font-semibold cursor-pointer" to="/home">
                        Continuer en tant qu'invité
                    </Link>
                </div>
                <h1 className="text-6xl lg:text-6xl font-fine font-semibold text-center mt-48">
                        <span className="text-6xl text-blue-800">SpaceZone</span>
                        , aller toujours plus loin, aller toujours plus vite.
                    </h1>
                <div className="flex flex-col sm:w-2/4 md:w-2/5 lg:w-2/6 mt-5">
                    
                    <form
                    className="flex flex-col lg:p-5 rounded-xl gap-2 w-full lg:w-full absolute bottom-0 left-0 justify-end sm:static"
                    action=""
                    onSubmit={handleSubmit}
                    ref={form}
                    >
                        <div className="flex flex-col lg:justify-between lg:gap-2 font-Lato w-full">
                            <label htmlFor="username" className="w-full">
                                <h2 className="text-xl p-1">Email</h2>
                                <input
                                className="py-2 pl-3 pr-1 rounded-sm outline-none text-black w-full"
                                type="email" 
                                name="email" 
                                placeholder="Email"
                                value={emailValue}
                                onInput={(e) => setEmail(e.currentTarget.value)}
                                />
                            </label>
                            <label htmlFor="username" className="w-full">
                                <h2 className="text-xl p-1">Username</h2>
                                <input
                                className="py-2 pl-3 pr-1 rounded-sm outline-none text-black w-full"
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                value={username}
                                onInput={(e) => setUsername(e.currentTarget.value)}
                                />
                            </label>
                            <label htmlFor="password" className="w-full">
                                <h2 className="text-xl p-1">Password</h2>
                                <input
                                className="py-2 pl-3 pr-1 rounded-sm outline-none text-black w-full"
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)} 
                                />
                            </label>
                        </div>
                        <button 
                        className="flex justify-center items-center py-2 px-5 bg-gradient-to-br from-blue-600 to-blue-700 text-white" 
                        id="register"
                        >
                            S'inscrire
                            {loader ?
                                <svg 
                                className="animate-spin relative left-5 duration-200" 
                                width="30" 
                                height="30" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="1.5" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"></path>
                                    <path d="M18 12a6 6 0 1 0-6 6"></path>
                                </svg>
                            : null}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}