import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { isEmpty } from "./Utils"
import { useEffect } from "react"
import { getProductPage } from "../actions/product.action"
import Carousel from "./carousel/Carousel"
import { useState } from "react"


export default function Cards({ 
    page, 
    
}) {

    const dispatch = useDispatch()
    const getProducts = useSelector((state) => state.productReducer.productPage)
    const [liked, setLiked] = useState(false)
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
        dispatch(getProductPage(data))
    }, [page])

    let handleLikeProduct = () => {
        
    }

    return (
        <>
            {!isEmpty(getProducts) && getProducts.map(product => {
                return (
                    <div
                    className='flex items-center bg-gradient-to-br from-white to-zinc-200 col-span-6 lg:col-span-2 shadow-xl rounded-xl w-full p-3 duration-200'
                    key={product.id}
                    >
                        <Link
                        className='flex relative flex-col bg-gradient-to-br h-full p-3'
                        to={`/product/${product.id}`}
                        >
                            <div className="max-w-xl" onClick={(e) => e.preventDefault(e)}>


                                <Carousel autoSlide={false}>
                                    {JSON.parse(product.url_image).map(image => {
                                        console.log(image)
                                        return(
                                            <img src={`./uploads/product/${image}`} alt="product image" className="min-w-full object-cover h-96 w-60" />
                                        )
                                    }
                                    )}
                                </Carousel>

                            </div>
                            <div className='flex flex-col p-5 w-full'>
                                <h2 className='font-raleway font-medium text-2xl'>{product.title}</h2>
                                <span className='font-semibold font-rajdhani text-2xl'>{product.price}€</span>


                                <div className='font-roboto flex flex-col'>
                                    <div className="flex items-center">
                                        <img
                                            src={`./uploads/profil/${product.profil_picture}`}
                                            onError={(e) => {
                                                e.target.src = './uploads/profil/default.jpg';
                                            }}
                                            alt="image de profil"
                                            className="rounded-full h-8 w-8 mr-2"
                                        />
                                        <p className='text-md'>A vendre par <Link className="font-semibold hover:text-indigo-800">{product.username}</Link></p>
                                        <button 
                                        className="absolute right-5 border-2 border-black rounded-full p-1"
                                        onClick={handleLikeProduct}
                                        >
                                            <svg className="" width="30" height="30" fill={liked ? "red" : "none"} stroke={liked ? "red" : "currentColor"} stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.5 13.576a4.976 4.976 0 0 0 1.495-3.704A5 5 0 0 0 12 7.01a5 5 0 1 0-7.5 6.566l7.5 7.428 7.5-7.428Z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>
                )
            })}

        </>
    )
}