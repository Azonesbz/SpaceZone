import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { isEmpty } from "./Utils"
import { useEffect } from "react"
import { getProductPage } from "../actions/product.action"
import Flickity from 'react-flickity-component';
import Carousel from "./carousel/Carousel"


export default function Cards({ 
    page, 
    
}) {

    const dispatch = useDispatch()
    const getProducts = useSelector((state) => state.productReducer.productPage)

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
                        key={product.id}
                        className='flex items-center bg-gradient-to-br from-white to-zinc-200 col-span-3 lg:col-span-2 shadow-xl rounded-xl 
                w-full p-3 duration-200'>
                        <Link
                            className='flex flex-col bg-gradient-to-br h-full p-3'
                            to={`/product/${product.id}`}
                        >
                            <div className="max-w-lg" onClick={(e) => e.preventDefault(e)}>


                                <Carousel autoSlide={false}>
                                    {JSON.parse(product.url_image).map(image => {
                                        console.log(image)
                                        return(
                                            <img src={`../../uploads/product/${image}`} alt="product image" className="min-w-full object-cover h-96 w-60" />
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