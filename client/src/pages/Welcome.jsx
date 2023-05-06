import Header from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React, { useRef, useState } from 'react'
import Register from '../components/Authentification/RegisterForm'
import Login from '../components/Authentification/LoginForm'
import { useEffect } from 'react'
import axios from 'axios'


export default function Welcome() {

  const [identifierValid, setIdentifierValid] = useState(false)
  const [identify, setIdentify] = useState({})
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [loader, setLoader] = useState(false)
  const [username, setUsername] = useState('')

  const navigate = useNavigate()
  const form = useRef()
  const currentUser = useSelector((state) => state.currentUserReducer.user)

  useEffect(() => {
    if(currentUser) {
      return () => navigate('/home')
    }
  }, [currentUser])

  let data;
  let handleForm = async (e) => {
    setLoader(true)
    e.preventDefault()
    data = {
      email: form.current[0].value
    }
    setIdentify(data.email)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailRegex.test(data.email)) {
      return axios.post('http://localhost:3001/users/search', data)
        .then(
          res => {
            if (res.status === 200) {
              setUsername(res.data.user[0].username)
              setIdentifierValid(true)
              setLogin(true)
              setLoader(false)
            }
          })
        .catch(err => {
          setIdentifierValid(true)
          setRegister(true)
          setLoader(false)
        })
    } else {
      setEmailInvalid(true)
      setLoader(false)
    }
  }

  return (
    <>
      {!identifierValid ? <Header /> : ""}
      {!identifierValid ?
        <div className='min-h-screen min-w-screen overflow-hidden'>
          <div className='h-[100vh]'>
            <div className='flex flex-col justify-center sm:space-y-24 items-center h-full gap-5'>
              <div className='h-full sm:h-auto pt-48 sm:pt-0'>
                  <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-center'>Achetez, vendez, où que <br />vous soyez !</h1>
                  <h2 className='text-3xl sm:text-4xl md:text-5xl text-center mt-5'>Commencer maintenant par vous inscrire.</h2>
              </div>
              <div className='flex flex-col w-full  absolute inset-0 sm:justify-center justify-end sm:static'>
              <form
                className='flex flex-col w-full sm:items-center'
                action=""
                ref={form}
                onSubmit={handleForm}
              >
                <div className='flex flex-col sm:w-2/3 sm:gap-2'>
                  <div className='w-full flex flex-col sm:flex-row sm:gap-2'>
                    <label className='sm:border border-neutral-900 sm:rounded-md sm:w-3/4 lg:w-5/6'>
                      <input type="email" placeholder='Votre adresse email' className='py-4 px-4 text-xl font-roboto outline-none w-full sm:rounded-md' />
                    </label>
                    <button className='whitespace-nowrap px-4 py-4 sm:rounded-md text-slate-200 text-xl sm:text-lg sm:w-1/4 lg:w-1/6 font-medium bg-blue-700' type='submit'>Continuer</button>
                  </div>
                  <Link className='whitespace-nowrap px-4 py-4 sm:rounded-md text-slate-200 text-xl font-medium bg-blue-800 w-full text-center' to="/home">Continuer en tant qu'invité</Link>
                </div>

              </form>
            </div>
            </div>
           
          </div>

          <h3 className={`${emailInvalid ? "" : "hidden"} text-red-600 font-semibold`}>Cette adresse email est invalide, renseigner une adresse email valide ou continuer en tant qu'invité</h3>

        </div> : ""}
      
      {login ? <Login
        login={login}
        username={username}
        identifierValid={identifierValid}
        setLogin={setLogin}
        setIdentifierValid={setIdentifierValid}
        identify={identify}
      /> : ""}
      {register ?
        <Register
          emailValue={identify}
          register={register}
          identifierValid={identifierValid}
          setRegister={setRegister}
          setIdentifierValid={setIdentifierValid}
        /> : ""}
    </>
  )
}