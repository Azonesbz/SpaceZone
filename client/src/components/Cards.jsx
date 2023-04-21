import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { isEmpty } from "./Utils"
import { useEffect } from "react"
import { getProduct } from "../actions/product.action"
import { useState } from "react"

export default function Cards({page}){
    
    const dispatch = useDispatch()
    const getProducts = useSelector((state) => state.productReducer)
    const { product } = getProducts

    const scrollToTop = () => {
        const scrollStep = -window.scrollY / (300 / 15); // 500 est la durée de l'animation en millisecondes
        const scrollInterval = setInterval(() => {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        }, 15);
      }

    useEffect(() => {
        scrollToTop()
        let data = {
            page: page
        }
        dispatch(getProduct(data))
    }, [page])
    return (
        <>
            {!isEmpty(product) && product.map(product => {
                return(
                <div 
                key={product.id}
                className='flex items-center bg-gradient-to-br from-white to-zinc-200 col-span-6 lg:col-span-3 shadow-xl rounded-xl 
                w-full p-3 duration-200'>
                    <Link 
                        className='flex flex-col sm:flex-row bg-gradient-to-br w-full p-3'
                        to={`/product/${product.id}`}
                    >
                        <img src="https://via.placeholder.com/720x720" alt="Placeholder" className='rounded-xl object-contain h-48 w-48' />
                        <div className='p-5 w-full'>
                            <h2 className='font-raleway font-medium text-2xl'>{product.name}</h2>
                            <span className='font-semibold font-rajdhani text-2xl'>{product.price}€</span>
                            <div className='flex mt-1 w-full'>
                                <button 
                                className='bg-black text-white text-lg font-karla py-2 px-5 rounded-xl active:scale-95'
                                onClick={(e) => e.preventDefault()}
                                >
                                    Acheter
                                </button>
                                <button className='ml-5 border border-black font-karla text-lg py-2 px-5 rounded-xl'>Panier</button>
                            </div>
                            <div className='font-roboto flex flex-col mt-2'>
                                <p className='text-md'>Par {product.user_id}</p>
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