import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { isEmpty } from "./Utils"

export default function Cards(){
    const products = useSelector((state) => state.productReducer)
    return (
        <>
            {!isEmpty(products) && products.map(product => {
                return(
                <div 
                key={product.id}
                className='flex items-center bg-gradient-to-br from-white to-zinc-200 col-span-6 shadow shadow-black rounded-xl 
                w-full h-60 p-3 duration-200'>
                    <Link 
                        className='flex bg-gradient-to-br w-full h-60 p-3'
                        to={`/product/${product.id}`}
                    >
                        <img src="https://via.placeholder.com/300x300" alt="Placeholder" className='rounded-xl' />
                        <div className='p-5 w-full'>
                            <h2 className='font-raleway font-medium text-2xl'>{product.name}</h2>
                            <span className='font-semibold font-rajdhani text-2xl'>{product.price}€</span>
                            <div className='flex mt-1 w-full'>
                                <button 
                                className='bg-black text-white w-18 md:w-2/4 lg:w-1/4 text-lg font-karla py-2 px-5 rounded-xl active:scale-95'
                                onClick={(e) => e.preventDefault()}
                                >
                                    Acheter
                                </button>
                                <button className='ml-5 border border-black w-18 md:w-2/4 lg:w-1/4 font-karla text-lg py-2 px-5 rounded-xl'>Panier</button>
                            </div>
                            <div className='font-roboto flex flex-col mt-2'>
                                <p className='text-md'>Par {product.id_user}</p>
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