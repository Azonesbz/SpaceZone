import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { isEmpty } from "./Utils"
import { useEffect, useState } from "react"
import { getProduct } from "../actions/product.action"
import { addProductCart } from "../actions/cart.action"
import Counter from "./Counter"

export default function Carts({page}){
    
    const dispatch = useDispatch()
    const getProducts = useSelector((state) => state.productReducer.product)
    const currentUser = useSelector((state) => state.currentUserReducer)

    const scrollToTop = () => {
        if (window.scrollY !== 0) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
            });
        }
      }

    useEffect(() => {
        scrollToTop()
        let data = {
            page: page
        }
        dispatch(getProduct(data))
    }, [page])

    let handleCart = (e, idProduct, quantity) => {
        e.preventDefault()
        dispatch(addProductCart(id))
    }

    return (
        <>
            {!isEmpty(getProducts) && getProducts.map(product => {
                return(
                <div 
                key={product.id}
                className='flex items-center bg-gradient-to-br from-white to-zinc-200 col-span-6 lg:col-span-3 shadow-xl rounded-xl 
                w-full p-3 duration-200'>
                    <Link 
                        className='flex flex-col sm:flex-row bg-gradient-to-br w-full p-3'
                        to={`/product/${product.id}`}
                    >
                        <div className="aspect-h-5 aspect-w-2">
                            <img src="https://via.placeholder.com/720x720" alt="Placeholder" className='rounded-xl object-cover object-center h-full w-full' />
                        </div>
                        <div className='flex flex-col p-5 w-full'>
                            <h2 className='font-raleway font-medium text-2xl'>{product.title}</h2>
                            <span className='font-semibold font-rajdhani text-2xl'>{product.price}€</span>
                            
                            
                            <div className='font-roboto flex flex-col'>
                                <div className="flex items-center">
                                    <img
                                        src={`./uploads/profil/${product.username}.jpg`}
                                        onError={(e) => {
                                            e.target.src = './uploads/profil/default.jpg';
                                        }}
                                        alt="image de profil"
                                        className="rounded-full h-8 w-8 mr-2"
                                    />
                                    <p className='text-md'>A vendre par <span className="font-semibold">{product.username}</span></p>
                                </div>
                                <button className='underline text-indigo-800 underline-offset-2 text-left'><p>Contacter le vendeur</p></button>
                            </div>
                        </div>
                    </Link>
                </div>
                )
            })}
        </>
    )
}