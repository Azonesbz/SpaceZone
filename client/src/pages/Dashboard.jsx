import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUser, getAllUser, getUserNumber, updateUser } from '../actions/user.action'
import Modal from '../components/modal/Modal'
import { useRef } from 'react'

function EditUserModal({ user, isOpen, onClose }) {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const editFormUser = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(user)
    }, [])
    let data;
    const handleSubmit = (event) => {
        event.preventDefault();
        data = {
            id: user.id,
            username: editFormUser.current[0].value,
            email: editFormUser.current[1].value,
            permission: editFormUser.current[2].value,
        }
        console.log(data)
        dispatch(updateUser(data))
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} height={'h-[18rem]'} width={'w-full'}>
            <form onSubmit={handleSubmit} className='h-full flex flex-col p-5 space-y-3 text-black' ref={editFormUser}>
                <label className='flex flex-col w-3/4'>
                    Username:
                    <input
                        className='w-full py-[5px] px-2 rounded'
                        type='text'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label className='flex flex-col w-3/4'>
                    Email:
                    <input
                        className='w-full py-[5px] px-2 rounded'
                        type='text'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label className='flex flex-col w-3/4'>
                    Name:
                    <select
                        className='w-full py-[5px] px-2 rounded'
                        id=""
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    >
                        <option value="1">Administrateur</option>
                        <option value="2">Modérateur</option>
                        <option value="3">Utilisateur</option>
                    </select>
                </label>
                <div className='flex justify-center items-end h-full'>
                    <button className='bg-indigo-700 font-raleway font-medium px-10 py-1 rounded-lg' type='submit'>Enregistrer</button>
                </div>
            </form>
        </Modal>
    );
}
function EditProductModal({ product, isOpen, onClose }) {
    const [title, setTitle] = useState(product.title);
    const [username, setUsername] = useState(product.username);
    const [name, setName] = useState(product.name);
    const editFormProduct = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(product)
    }, [])
    let data;
    const handleSubmit = (event) => {
        event.preventDefault();
        data = {
            id: user.id,
            username: editFormProduct.current[0].value,
            email: editFormProduct.current[1].value,
            permission: editFormProduct.current[2].value,
        }
        console.log(data)
        dispatch(updateUser(data))
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} height={'h-[18rem]'} width={'w-full'}>
            <form onSubmit={handleSubmit} className='h-full flex flex-col p-5 space-y-3 text-black' ref={editFormProduct}>
                <label className='flex flex-col w-3/4'>
                    Username:
                    <input
                        className='w-full py-[5px] px-2 rounded'
                        type='text'
                        value={title}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label className='flex flex-col w-3/4'>
                    Email:
                    <input
                        className='w-full py-[5px] px-2 rounded'
                        type='text'
                        value={username}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label className='flex flex-col w-3/4'>
                    Name:
                    <select
                        className='w-full py-[5px] px-2 rounded'
                        id=""
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    >
                        <option value="1">Administrateur</option>
                        <option value="2">Modérateur</option>
                        <option value="3">Utilisateur</option>
                    </select>
                </label>
                <div className='flex justify-center items-end h-full'>
                    <button className='bg-indigo-700 font-raleway font-medium px-10 py-1 rounded-lg' type='submit'>Enregistrer</button>
                </div>
            </form>
        </Modal>
    );
}

export default function Dashboard() {

    const allUser = useSelector((state) => state.allUserReducer.users)
    const countUser = useSelector((state) => state.allUserReducer.number)
    const currentUser = useSelector((state) => state.currentUserReducer)
    const numberProduct = useSelector((state) => state.productReducer.number)
    const product = useSelector((state) => state.productReducer.allProduct)
    const [editUser, setEditUser] = useState(false)
    const [editProduct, setEditProduct] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser.permission !== 'ADMINISTRATOR') {
            navigate('/home')
        }
        dispatch(getUserNumber())
    }, [])

    let handleUserManage = (e) => {
        let parent = e.target
        for (let i = 0; i < 5; i++) {
            if (parent.id === 'delete-user') {
                data = {
                    id: parent.value
                }
                dispatch(deleteUser(parent.value))
                dispatch(getAllUser())
                break;
            } else {
                parent = parent.parentNode
                console.log(parent)
            }
        }

    }

    return (
      <>
            <aside className='fixed flex items-center justify-center min-h-[100vh] bg-transparent w-16 right-2'>
                <div className='flex flex-col justify-around h-96 w-20 bg-black rounded-full'>
                    <div className='w-full h-16 rounded-full bg-white'>

                    </div>
                    <div className='w-full h-16 rounded-full bg-white'>

                    </div>
                    <div className='w-full h-16 rounded-full bg-white'>

                    </div>
                    <div className='w-full h-16 rounded-full bg-white'>

                    </div>
                    <div className='w-full h-16 rounded-full bg-white'>

                    </div>
                </div>
            </aside>
            <div className='flex gap-5 min-h-screen p-10 container'>

                <div className='w-2/3 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl text-black font-ubuntu shadow shadow-neutral-400'>

                    <div className='flex items-center justify-between space-x-5 w-full h-[5rem] px-10 bg-slate-300'>
                        <div className='flex items-center space-x-5'>
                            <h1 className='font-karla text-4xl text-blue-600 whitespace-nowrap'>Tableau de bord</h1>
                            <div className='w-[1px] bg-neutral-900 h-10'></div>
                            <h2 className='text-2xl'>Azones</h2>
                        </div>
                        <Link to="/home">Revenir à l'acceuil</Link>
                    </div>

                    <div className='flex flex-col px-10 py-5 overflow-scroll gap-5'>
                        <div className='flex flex-col'>
                            <h2 className='flex items-center text-3xl font-light'>
                                <svg className='mr-5' width="40" height="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12h4l3 8 4-16 3 8h4"></path>
                                </svg>
                                Statistique générals
                            </h2>
                            <div className='bg-slate-200 mt-5 rounded-lg p-5 overflow-scroll relative shadow'>
                                <div className='flex items-center space-x-5 mt-5'>
                                    <div className='flex items-center justify-center h-14 p-5 bg-gradient-to-br from-blue-700 to-blue-800 rounded-md'>
                                        <h2 className='text-4xl text-rajdhani text-slate-200'>{countUser}</h2>
                                    </div>
                                    <div className='h-[1px] w-full bg-neutral-800 mx-5'></div>
                                    <h1 className='text-xl font-thin whitespace-nowrap'>Utilisateurs sont inscrit sur SpaceZone</h1>
                                </div>
                                <div className='flex items-center space-x-5 mt-5'>
                                    <div className='flex items-center justify-center h-14 p-5 bg-gradient-to-br from-blue-700 to-blue-800 rounded-md'>
                                        <h2 className='text-4xl text-rajdhani text-slate-200'>{numberProduct}</h2>
                                    </div>
                                    <div className='h-[1px] w-full bg-neutral-800 mx-5'></div>
                                    <h1 className='text-xl font-thin whitespace-nowrap'>Articles sont en ventes</h1>
                                </div>
                                <div className='flex items-center justify-between mt-5'>
                                    <div className='flex items-center justify-center h-14 p-5 bg-gradient-to-br from-blue-700 to-blue-800 rounded-md'>
                                        <h2 className='text-4xl text-rajdhani text-slate-200'>96</h2>
                                    </div>
                                    <div className='h-[1px] w-full bg-neutral-800 mx-5'></div>
                                    <h1 className='text-xl font-thin whitespace-nowrap'>Achats</h1>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col space-y-5'>
                            
                                <div className=''>
                                    <h2 className='flex items-center text-3xl font-light'>
                                        <svg className='mr-5' width="40" height="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                                            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                                            <path d="M16 3.133a4 4 0 0 1 0 7.75"></path>
                                            <path d="M21 20.998v-2a4 4 0 0 0-3-3.85"></path>
                                        </svg>
                                        Gestion des utilisateurs
                                    </h2>

                                    <div className='bg-slate-200 h-96 mt-5 rounded-lg p-10 overflow-scroll relative shadow'>
                                        <table className='table-auto w-full p-10'>
                                            <thead>
                                                <tr className='text-left border-b'>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Permission</th>
                                                    <th>Gérer l'utilisateur</th>
                                                    <th>Date de création</th>
                                                </tr>
                                            </thead>
                                            <tbody className='font-light font-karla' onClick={handleUserManage}>
                                                {!isEmpty(allUser) && allUser.map(user => (
                                                    <tr className='text-black' key={user.id}>
                                                        <td className='py-2 pr-14 flex items-center'>
                                                            <img
                                                            className='h-8 w-8 rounded-full'
                                                            src={`./uploads/profil/${user.profil_picture}`} 
                                                            onError={(e) => {
                                                                e.target.onerror = null; // empêche les boucles d'erreur infinies
                                                                e.target.src = './uploads/profil/default.jpg'; // charge une image alternative
                                                            }}  
                                                            alt=""
                                                            />
                                                            <h1>{user.username}</h1>
                                                        </td>
                                                        <td className='py-2 pr-14'>
                                                            <h1>{user.email}</h1>
                                                        </td>
                                                        <td className='py-2 pr-14'>
                                                            <h1>{user.name}</h1>
                                                        </td>
                                                        <td className='flex items-center space-x-2 py-2 pr-20'>
                                                            <button className=' bg-red-600 p-1 text-slate-200 rounded-lg active:scale-95 duration-200' id='delete-user' value={user.id}>
                                                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4 7h16"></path>
                                                                    <path d="M10 11v6"></path>
                                                                    <path d="M14 11v6"></path>
                                                                    <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                                                                    <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                                                                </svg>
                                                            </button>
                                                            <button className='bg-neutral-900 text-slate-200 p-1 rounded-lg active:scale-95 duration-200' id='update-user' value={user} onClick={() => setEditUser(user)}>
                                                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4Z"></path>
                                                                    <path d="m13.5 6.5 4 4"></path>
                                                                </svg>
                                                            </button>
                                                            <button className='bg-neutral-900 text-slate-200 p-1 rounded-lg active:scale-95 duration-200' id='update-user' value={user} onClick={() => setEditUser(user)}>
                                                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                                                                    <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7Z"></path>
                                                                </svg>
                                                            </button>
                                                        </td>
                                                        <td className='py-2 pr-14'>
                                                            {user.created_at}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <button className='absolute top-0 hidden'>
                                            <svg width="46" height="46" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M7 10H5V5h5v2H7v3Zm-2 4h2v3h3v2H5v-5Zm12 3h-3v2h5v-5h-2v3ZM14 7V5h5v5h-2V7h-3Z" clip-rule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                                <div>
                                    <h2 className='flex items-center text-3xl font-light outline-none'>
                                        <svg width="40" height="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 7 12 2 2 7v10l10 5 10-5V7Z"></path>
                                            <path d="m2 7 10 5"></path>
                                            <path d="M12 22V12"></path>
                                            <path d="m22 7-10 5"></path>
                                            <path d="m17 4.5-10 5"></path>
                                        </svg>
                                        Gestion des ventes
                                    </h2>
                                    <div className='bg-slate-200 h-96 mt-5 rounded-lg p-5 overflow-scroll relative shadow'>
                                        <table className='table-auto w-full'>
                                            <thead>
                                                <tr className='text-left border-b'>
                                                    <th>Nom du produit</th>
                                                    <th>Vendeur</th>
                                                    <th>Date de publication</th>
                                                    <th>Gérer le produit</th>
                                                    <th>Inventaire</th>
                                                </tr>
                                            </thead>
                                            <tbody className='font-light font-karla' onClick={handleUserManage}>
                                                {!isEmpty(product) && product.map(item => (
                                                    <tr className='text-black' key={item.id}>
                                                        <td className='py-2 pr-14'>
                                                            <h1>{item.title}</h1>
                                                        </td>
                                                        <td className='flex py-2 pr-14 h-full'>
                                                            <img src={`./uploads/profil/${item.profil_picture}`} alt="image de profil" className='h-full w-8 rounded-full' />
                                                            <h1 className='ml-2'>{item.username}</h1>
                                                        </td>
                                                        <td className='py-2 pr-14'>
                                                            <h1>{item.created_at}</h1>
                                                        </td>
                                                        <td className='flex items-center space-x-2 py-2 pr-20'>
                                                            <button className=' bg-red-600 p-1 text-slate-200 rounded-lg active:scale-95 duration-200' id='delete-product' value={item.id}>
                                                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4 7h16"></path>
                                                                    <path d="M10 11v6"></path>
                                                                    <path d="M14 11v6"></path>
                                                                    <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                                                                    <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                                                                </svg>
                                                            </button>
                                                            <button className='bg-neutral-900 text-slate-200 p-1 rounded-lg active:scale-95 duration-200' id='update-product' value={item} onClick={() => setEditProduct(item)}>
                                                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4Z"></path>
                                                                    <path d="m13.5 6.5 4 4"></path>
                                                                </svg>
                                                            </button>
                                                            <button className='bg-neutral-900 text-slate-200 p-1 rounded-lg active:scale-95 duration-200' id='update-user' value={item} onClick={() => setEditUser(item)}>
                                                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                                                                    <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7Z"></path>
                                                                </svg>
                                                            </button>
                                                        </td>
                                                        <td className='py-2 pr-14'><h1 className={`font-medium ${item.inventory <= 0 ? "text-red-600" : "text-black"}`}>{item.inventory <= 0 ? "Rupture de stock" : item.inventory}</h1></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {editUser && (
                                    <EditUserModal
                                        user={editUser}
                                        isOpen={true}
                                        onClose={() => setEditUser(false)}
                                    />
                                    )}
                                    {editProduct && (
                                        <EditProductModal
                                        product={editProduct}
                                        isOpen={true}
                                        onClose={() => setEditProduct(false)}
                                    />
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <div className='sticky top-5 flex flex-col h-[100vh] gap-5'>
                            <article className='h-2/4 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl'></article>
                            <article className='h-2/4 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl'></article>
                        </div>
                    </div>
                </div>
                <div className='flex gap-5 min-h-screen p-10 bg-neutral-900'>
                    <div className='h-full bg-neutral-900 w-full'>
                        <h1 className='text-5xl text-slate-200'>Finance de SpaceZone</h1>
                    </div>
                </div>
                <div className='flex gap-5 min-h-screen p-10 bg-neutral-900'>
                    <div className='h-full bg-neutral-900 w-full'>
                        <h1 className='text-5xl text-slate-200'>Gestion des stocks</h1>
                    </div>
                </div>
            </>
            )
}