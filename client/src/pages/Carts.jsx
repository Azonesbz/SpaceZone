import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from '../utils/utils'
import { deleteCart, getCarts } from "../actions/cart.action"
import Carousel from "../components/carousel/Carousel"
import {Link} from 'react-router-dom'
import { Tooltip } from "flowbite-react"

export default function Carts(){
    const [totalPrice, setTotalPrice] = useState(null)
    const cartItem = useSelector((state) => state.cartReducer.cart)
    const currentUser = useSelector((state) => state.currentUserReducer.user)
    const dispatch = useDispatch()
    let data;
    useEffect(() => {
        if(!isEmpty(cartItem)){
            const listItemPrice = cartItem.map(item => parseInt(item.price * item.quantity))
            setTotalPrice(listItemPrice.reduce((acc, val) => acc + val, 0))
        }
        dispatch(getCarts())
    }, [cartItem])
    let handleDeleteCart = () => {
        dispatch(deleteCart(currentUser.id))
        dispatch(getCarts())
    }
    return (
        <>
        <div className="flex flex-col min-h-screen font-Lato">

            <Navbar />
            <section className="sm:p-10 container flex flex-col justify-center min-h-screen">
                <div className="flex items-center justify-between pb-2 mt-20">
                    <div className="flex justify-between items-end w-full">
                        <div className="flex flex-col">
                            <h1 className="uppercase font-karla font-medium text-3xl whitespace-nowrap">Mon Panier</h1>
                            {!isEmpty(cartItem) ? 
                            <button
                            className="text-red-600 whitespace-nowrap"
                            onClick={handleDeleteCart}
                            >
                                <h1 className="text-left font-bold">Supprimer mon panier</h1>
                            
                            </button> 
                            : ""}
                        </div>
                        <h2 className="flex font-karla font-medium text-xl sm:text-2xl md:text-3xl whitespace-nowrap duration-200">Prix total:<span>{totalPrice ? totalPrice + "€" : "Aucun article dans le panier"}</span></h2>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-5" >
                {!isEmpty(cartItem) ? cartItem.map((items, index) => (
                    <div className="col-span-12 sm:col-span-6 bg-neutral-300 sm:rounded-xl text-black hover:underline font-rajhdani" key={index}>
                        <div className="min-w-full">
                            <Carousel>
                                {JSON.parse(items.url_image).map((image, index) => (
                                    <img key={index} src={`../uploads/product/${image}`} alt="" className="min-w-full object-cover h-96 w-full sm:rounded-t-xl" />
                                ))}
                            </Carousel>
                        </div>
                        <div className="p-5 relative">
                            <button className="text-white absolute right-5 bg-red-600 p-1 rounded-xl">
                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7h16"></path>
                                    <path d="M10 11v6"></path>
                                    <path d="M14 11v6"></path>
                                    <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                                    <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                                </svg>
                            </button>
                            <button className="absolute right-16 bg-neutral-900 p-1 rounded-xl text-white">
                                <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4Z"></path>
                                    <path d="m13.5 6.5 4 4"></path>
                                </svg>
                            </button>
                            <h1 className="text-3xl">{items.title}</h1>
                            <h1 className="text-xl">Quantité: <span>{items.quantity}</span></h1>
                            <h1 className="flex justify-between items-center text-2xl">Prix total: <span className="text-3xl">{items? items.price + "€" : ""}</span></h1>
                        </div>
                    </div>
                )) : 
                <div className="flex col-span-12 justify-center p-10 w-full bg-neutral-900">
                            <h1 className="flex flex-col items-center justify-center h-full
                            text-center text-3xl space-y-20 text-white p-10 rounded-xl shadow-md">
                                <svg width="100" height="100" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                                    <path d="M17 17a2 2 0 1 0 2 2"></path>
                                    <path d="M17 17H6V6"></path>
                                    <path d="M13 13.003H6"></path>
                                    <path d="M9.239 5.234 20 6.004l-1 7h-2"></path>
                                    <path d="m3 3 18 18"></path>
                                </svg>
                                Vous n'avez aucun article dans votre panier 
                                <Link className="underline" to="/home">Revenir à la page d'acceuil</Link>
                            </h1>
                </div>
                }
                </div>
            </section>
            <Footer />
        </div>
        </>
    )
}