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
    username,
    setConfetti
}) {
    const dispatch = useDispatch()
    const form = useRef()
    const [password, setPassword] = useState('')
    const [passwordIncorrect, setPasswordIncorrect] = useState('')
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    let data;

    let handleSubmit = (e) => {
        setLoader(true)
        e.preventDefault()
        data = {
            email: identify,
            password: form.current[0].value,
        }
        dispatch(loginUser(data)).then(res => {
            setConfetti(true)
            if (res.status === 200) {
                setTimeout(() => {
                    setConfetti(false)
                    setLoader(false)
                    dispatch(sessionIsValid())
                    navigate('/home')
                }, 3000)
            }
        })
        .catch(err => {
            if(err.response.status === 401){
                setLoader(false)
                setPasswordIncorrect(true)
            }
        })

    }
    return (
        <>
            <button
                className="absolute top-5 left-5 rounded-full active:scale-90 duration-200 text-neutral-900"
                onClick={() => {
                    setLogin(false)
                    setIdentifierValid(false)
                }}
                id="back"
            >
                <svg width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
                    <path d="m12 8-4 4 4 4"></path>
                    <path d="M16 12H8"></path>
                </svg>
            </button>
            <section className="flex flex-col sm:space-y-5 items-center justify-center min-h-screen p-10 text-Lato">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-fine font-semibold text-center">Content de vous revoir <span className="text-blue-700">{username}!</span></h1>
                </div>
                <form
                    className="flex w-full absolute bottom-0 sm:static"
                    action=""
                    onSubmit={handleSubmit}
                    ref={form}
                >
                    <label htmlFor="password" className="flex flex-col justify-center items-center w-full ">
                        <div className="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 sm:gap-2">
                            {passwordIncorrect ? <h2 className="text-red-500 font-Lato font-semibold w-full">Echec de connexion, le mot de passe est incorrect.</h2>: null}
                            <input
                                className="py-2 px-1 outline-none text-black sm:rounded-sm w-full text-xl"
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                            <button className="flex items-center justify-center py-2 w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-sm text-center" id="login">Connexion
                                {loader ? 
                                <svg className="animate-spin relative left-5 duration-200" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"></path>
                                    <path d="M18 12a6 6 0 1 0-6 6"></path>
                                </svg> 
                                : null}
                            </button>
                        </div>
                    </label>
                </form>
            </section>
        </>
    )
}