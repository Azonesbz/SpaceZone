import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../../actions/user.action"
import { useNavigate } from 'react-router-dom'
import Confetti from 'react-confetti'

export default function Register({
    emailValue, 
    setRegister, 
    setIdentifierValid,
}){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confetti, setConfetti] = useState(false)
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
        e.preventDefault()
        data = {
            email: form.current[0].value,
            username: form.current[1].value,
            password: form.current[2].value,
        }
        dispatch(addUser(data)).then(() => {
            setConfetti(true)
            setTimeout(() => {
                setLoader(false)
                navigate('/home')
            }, 2000)
            
        })
        
    }

    return(
        <>
            <section className="flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-700 min-h-screen p-10 text-slate-200">
                {confetti ? <Confetti /> : "" }
                <button 
                className="absolute top-5 left-5 rounded-full active:scale-90 duration-200"
                onClick={() => {
                    setRegister(false)
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
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col">
                        <h1 className="text-6xl font-fine font-semibold text-center"><span className="text-6xl text-blue-800">SpaceZone</span>, aller toujours plus loin,<br /> aller toujours plus vite.</h1>
                    </div>
                    <form
                    className="flex flex-col p-5 rounded-xl space-y-5"
                    action=""
                    onSubmit={handleSubmit}
                    ref={form}
                    >
                        <div className="flex space-x-14">
                            <label htmlFor="username">
                                <h2>Email</h2>
                                <input
                                className="py-2 pl-3 pr-1 rounded-sm outline-none text-black"
                                type="email" 
                                name="email" 
                                placeholder="Email"
                                value={emailValue}
                                onInput={(e) => setEmail(e.currentTarget.value)}
                                />
                            </label>
                            <label htmlFor="username">
                                <h2>Username</h2>
                                <input
                                className="py-2 pl-3 pr-1 rounded-sm outline-none text-black"
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                value={username}
                                onInput={(e) => setUsername(e.currentTarget.value)}
                                />
                            </label>
                            <label htmlFor="password">
                                <h2>Password</h2>
                                <input
                                className="py-2 pl-3 pr-1 rounded-sm outline-none text-black"
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)} 
                                />
                            </label>
                        </div>
                        <button className="py-2 px-5 bg-gradient-to-br from-blue-600 to-blue-700 text-white" id="register">S'inscrire</button>
                    </form>
                </div>
            </section>
        </>
    )
}