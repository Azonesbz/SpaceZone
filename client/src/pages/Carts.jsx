import { useEffect, useState } from "react"
import Header from "../components/Navbar"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from '../utils/utils'
import { getCarts } from "../actions/cart.action"
import Carousel from "../components/carousel/Carousel"
import {Link} from 'react-router-dom'

export default function Carts(){
    const [totalPrice, setTotalPrice] = useState(null)
    const cartItem = useSelector((state) => state.cartReducer)
    const dispatch = useDispatch()
    let data;
    useEffect(() => {
        if(!isEmpty(cartItem)){
            const listItemPrice = cartItem.map(item => parseInt(item.price))
            setTotalPrice(listItemPrice.reduce((acc, val) => acc + val, 0))
        }
        dispatch(getCarts())
    }, [cartItem])
    return (
        <>
            <Header />
            <section className="p-10 relative mt-20 container">
                <div className="flex items-center justify-between pb-2">
                    <h1 className="uppercase font-karla font-medium text-3xl">Mon Panier</h1>
                    <div className="h-14 w-[2px] bg-black rounded-full"/>
                    <h2 className="uppercase font-karla font-medium text-3xl">Prix total des articles: <span>{totalPrice ? totalPrice + "€" : "Aucun article dans le panier"}</span></h2>
                </div>
                <div className="grid grid-cols-12 gap-5 mt-5" >
                {!isEmpty(cartItem) ? cartItem.map((items, index) => (
                    <div className="col-span-6 bg-neutral-300 rounded-xl text-blue-700 hover:underline font-rajhdani" key={index}>
                        <div className="max-w-lg">
                            <Carousel>
                                {JSON.parse(items.url_image).map((image, index) => (
                                    <img src={`../uploads/product/${image}`} alt="" className="min-w-full object-cover h-96 w-60" />
                                ))}
                            </Carousel>
                        </div>
                        <div>
                            <h1 className="">{items.title}</h1>
                            <h1 className="">Quantité: <span>{items.quantity}</span></h1>
                            <h1 className="flex justify-between items-center">Prix total: <span className="text-3xl">{items? items.price : ""}</span></h1>
                        </div>
                    </div>
                )) : 
                <div className="col-span-12 justify-center min-h-full p-10">
                            <h1 className="flex flex-col items-center justify-center h-full
                            text-center text-3xl space-y-20 bg-neutral-900 text-white p-10 rounded-xl shadow-md">
                                <svg width="100" height="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
        </>
    )
}