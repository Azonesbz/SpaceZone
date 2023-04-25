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

  const navigate = useNavigate()
  const form = useRef()
  const currentUser = useSelector((state) => state.currentUserReducer)

  useEffect(() => {
    if(currentUser){
      navigate('/home')
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

    if(emailRegex.test(data.email)){
      return axios.post('http://localhost:3001/users/search', data).then(
      res => {
        if(res.status === 404){
          setIdentifierValid(true)
          setRegister(true)
          setLoader(false)
        } else if(res.status === 200){
          setIdentifierValid(true)
          setLogin(true)
          setLoader(false)
        }
      })
    } else {
      setEmailInvalid(true)
      setLoader(false)
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
              <h3 className={`${emailInvalid ? "" : "hidden" } text-red-600 font-semibold`}>Cette adresse email est invalide, renseigner une adresse email valide ou continuer en tant qu'invité</h3>
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
        emailValue={identify}
        register={register}
        identifierValid={identifierValid}
        setRegister={setRegister}
        setIdentifierValid={setIdentifierValid}
        /> : ""}
      </>
    )
}