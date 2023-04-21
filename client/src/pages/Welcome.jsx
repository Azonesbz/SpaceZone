import Header from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React, { useRef, useState } from 'react'
import Register from '../components/Authentification/RegisterForm'
import Login from '../components/Authentification/LoginForm'
import { useEffect } from 'react'


export default function Welcome() {

  const [identifierValid, setIdentifierValid] = useState(false)
  const [identify, setIdentify] = useState({})
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)

  const navigate = useNavigate()
  const form = useRef()
  const users = useSelector((state) => state.allUserReducer)
  const currentUser = useSelector((state) => state.currentUserReducer)

  useEffect(() => {
    if(currentUser){
      navigate('/home')
    }
  }, [currentUser])

  let handleForm = async (e) => {
    e.preventDefault()
    try {
      const user = users.filter(user => user.email === form.current[0].value)
      if(user.length){
        setIdentify(user)
        setIdentifierValid(true)
        setLogin(true)
      } else {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if(emailRegex.test(form.current[0].value)){
          setIdentifierValid(true)
          setRegister(true)
        }
      }
    } catch {
        return
    }
  }

    return (
      <>
        {!identifierValid ? <Header /> : "" }
        {!identifierValid ? <div className='flex flex-col absolute inset-0 items-center justify-center min-h-screen min-w-screen'>
          <div className='flex flex-col '>
              <h1 className='text-7xl font-raleway font-bold'>Achetez, vendez, où que <br/>vous soyez !</h1>
              <h2 className='text-3xl font-raleway mt-10'>Commencer maintenant par vous inscrire.</h2>
              <form 
              className='flex justify-between'
              action=""
              ref={form}
              onSubmit={handleForm}
              >
                  <label htmlFor="" className='w-full border-[1px] border-gray-500 rounded-md'>
                      <input type="email" placeholder='Votre adresse email' className='py-4 px-4 w-full text-xl font-roboto outline-none rounded-md'/>
                  </label>
                  <button className='whitespace-nowrap px-4 py-4 ml-5 rounded-md text-slate-200 text-xl font-medium bg-gradient-to-tr from-blue-700 to-blue-900' type='submit'>Commencer</button>
              </form>
              <div className='mt-5'>
                <Link className='whitespace-nowrap px-4 py-2 rounded-md text-slate-200 text-xl font-medium bg-gradient-to-tr from-blue-700 to-blue-900' to="/home">Continuer en tant qu'invité</Link>
              </div>
          </div> 
        </div> : ""}
        {login ? <Login
        login={login}
        identifierValid={identifierValid}
        setLogin={setLogin}
        setIdentifierValid={setIdentifierValid} 
        identify={identify}
        /> : ""}
        {register ? 
        <Register 
        emailValue={form.current[0].value || null}
        register={register}
        identifierValid={identifierValid}
        setRegister={setRegister}
        setIdentifierValid={setIdentifierValid}
        /> : ""}
      </>
    )
}