import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { isEmpty } from "./Utils"
import { useEffect } from "react"
import { getProductPage, likeProduct } from "../actions/product.action"
import Carousel from "./carousel/Carousel"


export default function Cards({
    page,
}) {

    const dispatch = useDispatch()
    const getProducts = useSelector((state) => state.productReducer.productPage)
    const currentUser = useSelector((state) => state.currentUserReducer.user)
    const likedProduct = useSelector((state) => state.currentUserReducer.liked)
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

    return (
        <>
            {!isEmpty(getProducts) && getProducts.map(product => {
                return (
                    <div
                        className='flex items-center bg-gradient-to-br from-white to-zinc-200 col-span-6 lg:col-span-3 shadow-xl rounded-xl w-full p-3 duration-200 font-Lato'
                        key={product.id}
                    >
                        <Link
                            className='flex relative flex-col bg-gradient-to-br h-full w-full p-3'
                            to={`/product/${product.id}`}
                        >
                            <div className="max-w-xxl" onClick={(e) => e.preventDefault(e)}>


                                <Carousel autoSlide={false}>
                                    {JSON.parse(product.url_image).map((image, index) => {
                                        return (
                                            <img key={index} src={`./uploads/product/${image}`} alt="product image" className="min-w-full object-cover h-96 w-60 rounded" />
                                        )
                                    }
                                    )}
                                </Carousel>

                            </div>
                            <div className='flex flex-col p-5 w-full h-full justify-between'>
                                <div className="flex justify-between items-start">
                                    <h2 className='font-Lato text-3xl'>{product.title}</h2>
                                    <div className="flex flex-col space-y-1">
                                        <span className='font-semibold font-SourceSansPro text-2xl text-right'>{product.price}€</span>
                                        <p className={`lowercase first-letter:uppercase px-3 py-1 font-SourceSansPro text-center ml-5 opacity-95 rounded-full text-sm ${product.category == "DIVERS" ? "bg-red-300" : product.category == "ACCESSOIRES" ? "bg-green-300" : product.category == "VÊTEMENTS" ? "bg-sky-300" : ""}`}>{product.category}</p>
                                    </div>
                                </div>
                                


                                <div className="flex items-center">
                                    <img
                                        src={`./uploads/profil/${product.profil_picture}`}
                                        onError={(e) => {
                                            e.target.src = './uploads/profil/default.jpg';
                                        }}
                                        alt="image de profil"
                                        className="rounded-full h-8 w-8 mr-2"
                                    />
                                    <p className='text-md font-Lato'>A vendre par <span className="font-semibold hover:text-indigo-800">{product.username}</span></p>
                                    <button
                                        className="absolute right-5 rounded-full p-1 active:scale-90 duration-100"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            let data = {
                                                productId: product.id,
                                                userId: currentUser.id
                                            }
                                            dispatch(likeProduct(data))
                                        }}
                                        aria-label="Like"
                                    >
                                        <svg width="30" height="30" fill={!isEmpty(likedProduct) ? (likedProduct.find(liked => liked.product_id === product.id) ? "red" : "none") : "none"} stroke={!isEmpty(likedProduct) ? (likedProduct.find(liked => liked.product_id === product.id) ? "red" : "currentColor") : "currentColor"} strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.5 13.576a4.976 4.976 0 0 0 1.495-3.704A5 5 0 0 0 12 7.01a5 5 0 1 0-7.5 6.566l7.5 7.428 7.5-7.428Z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Link>

                    </div>
                )
            })}

        </>
    )
}