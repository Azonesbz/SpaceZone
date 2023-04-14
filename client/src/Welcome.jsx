import Header from './components/Navbar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Register from './components/RegisterForm'


export default function Welcome() {

  const [identifierValid, setIdentifierValid] = useState(false)
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)

  const form = useRef()
  const users = useSelector((state) => state.userReducer)

  const resetForm = () => {
    setIdentifierValid(false)
    setRegister(false)
  }

  let handleForm = async (e) => {
    e.preventDefault()
    const identifyData = {
      identifier: form.current[0].value
    }
    const user = users.filter(user => user.email === identifyData.identifier || user.id_user === identifyData.identifier)
    console.log(user)

    if(user.length){
      console.log('login')
      setIdentifierValid(true)
      setLogin(true)
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      if(emailRegex.test(identifyData.identifier))
      console.log('register')
        setIdentifierValid(true)
        setRegister(true)
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
              <h3 className='text-raleway font-medium text-lg mt-5'>Déjà un compte ? Connectez-vous en cliquant <Link className='px-5 py-2 rounded bg-gradient-to-r text-slate-200 font-bold uppercase text-sm from-blue-700 to-blue-900 active:scale-95 cursor-pointer' to="/identify">ici</Link>
              </h3>
          </div> 
        </div> : ""}
        {login ? <Login /> : ""}
        {register ? 
        <Register 
        emailValue={form.current[0].value}
        register={register}
        identifierValid={identifierValid}
        setRegister={setRegister}
        setIdentifierValid={setIdentifierValid}
        /> : ""}
      </>
    )
}