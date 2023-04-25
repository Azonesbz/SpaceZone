import React,{ useEffect } from 'react'
import Header from '../components/Navbar'
import { useSelector } from 'react-redux'
import { isEmpty } from '../utils/utils'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {

    const allUser = useSelector((state) => state.allUserReducer)
    const currentUser = useSelector((state) => state.currentUserReducer)
    const navigate = useNavigate()
    useEffect(() => {
        if(currentUser.permission !== 'ADMINISTRATOR'){
            navigate('/home')
        }
    }, [])

    let handleUserManage = (e) => {
        let parent = e.target
        for(let i = 0; i < 5; i++){
            if(parent.id === 'delete-user'){
                console.log(parent.value)
                break;
            } else if(parent.id === 'update-user'){

                break;
            } else {
                parent.parentNode
            }
        }

    }
    
    return (
      <>
            <div className='flex gap-5 min-h-screen p-10'>
                <div className='w-2/3 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl p-10 text-slate-200 font-ubuntu'>
                    <div className='flex items-center justify-between space-x-5 pb-2'>
                        <div className='flex items-center space-x-5 pb-2'>
                            <h1 className='font-karla text-4xl text-blue-600 whitespace-nowrap'>Tableau de bord</h1>
                            <div className='w-[1px] bg-slate-200 h-10'></div>
                            <h2 className='text-2xl'>Azones</h2>
                        </div>
                        <Link to="/home">Revenir à l'acceuil</Link>
                    </div>
                    <div className='flex flex-col p-10 overflow-scroll gap-5'>
                        <div className='flex flex-col'>
                            <h2 className='flex items-center text-3xl font-light'>
                                Statistique générals 
                                <svg className='ml-5' width="45" height="45" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12h4l3 8 4-16 3 8h4"></path>
                                </svg>
                            </h2>
                            <div className='flex items-center space-x-5 mt-5'>
                                <div className='flex items-center justify-center h-20 p-5 bg-gradient-to-br from-indigo-700 to-indigo-950 rounded-full'>
                                    <h2 className='text-4xl text-rajdhani'>32</h2>
                                </div>
                                <div className='h-[1px] w-full bg-neutral-800 mx-5'></div>
                                <h1 className='text-xl font-thin whitespace-nowrap'>Utilisateurs sont inscrit sur SpaceZone</h1>
                            </div>
                            <div className='flex items-center space-x-5 mt-5'>
                                <div className='flex items-center justify-center h-20 p-5 bg-gradient-to-br from-indigo-700 to-indigo-950 rounded-full'>
                                    <h2 className='text-4xl text-rajdhani'>19633</h2>
                                </div>
                                <div className='h-[1px] w-full bg-neutral-800 mx-5'></div>
                                <h1 className='text-xl font-thin whitespace-nowrap'>Articles sont en ventes</h1>
                            </div>
                            <div className='flex items-center justify-between mt-5'>
                                <div className='flex items-center justify-center h-20 p-5 bg-gradient-to-br from-indigo-700 to-indigo-950 rounded-full'>
                                    <h2 className='text-4xl text-rajdhani'>96</h2>
                                </div>
                                <div className='h-[1px] w-full bg-neutral-800 mx-5'></div>
                                <h1 className='text-xl font-thin whitespace-nowrap'>Achats</h1>
                            </div>
                        </div>
                        <div className=''>
                            <h2 className='flex items-center text-2xl font-light underline'>
                                Gérer les utilisateurs 
                                
                            </h2>
                            <div className='bg-slate-400 h-96 mt-5 rounded-xl p-5 overflow-scroll'>
                                <ul>
                                    <table className='table-auto'>
                                        <thead>
                                            <tr className='text-left'>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Permission</th>
                                                <th>Gérer l'utilisateur</th>
                                            </tr>
                                        </thead>
                                        <tbody className='font-light font-karla' onClick={handleUserManage}>
                                            {!isEmpty(allUser) && allUser.map(user => (
                                                <tr className='text-black' key={user.id}>
                                                    <td className='py-2 pr-14'>
                                                        <h1>{user.username}</h1>
                                                    </td>
                                                    <td className='py-2 pr-14'>
                                                        <h1>{user.email}</h1>
                                                    </td>
                                                    <td className='py-2 pr-14'>
                                                        <h1>{user.name}</h1>
                                                    </td>
                                                    <td className='flex items-center space-x-2 py-2 pr-20'>
                                                        <button className=' bg-red-600 p-1 rounded-lg' id='delete-user'>
                                                            <svg width="30" height="30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4 7h16"></path>
                                                                <path d="M10 11v6"></path>
                                                                <path d="M14 11v6"></path>
                                                                <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                                                                <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                                                            </svg>
                                                        </button>
                                                        <button className='bg-neutral-900 text-slate-200 p-1 rounded-lg'>
                                                            <svg width="30" height="30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4Z"></path>
                                                                <path d="m13.5 6.5 4 4"></path>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/3'>
                    <div className='sticky my-auto top-2 flex flex-col justify-center h-[80vh] gap-5'>
                        <article className='h-1/2 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl hover:scale-150 hover:relative hover:translate-x-(-3rem) hover:translate-y-20 duration-300'></article>
                        <article className='h-1/2 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl hover:scale-150 hover:relative hover:right-40 hover:bottom-40 duration-300'></article>
                    </div>
                </div>
            </div>
      </>
    )
}