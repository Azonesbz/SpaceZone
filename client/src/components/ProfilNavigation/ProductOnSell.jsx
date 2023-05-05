import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { isEmpty } from '../Utils'
import Carousel from '../carousel/Carousel'
import { Tooltip } from "flowbite-react"
import { Link } from "react-router-dom"

export default function ProductOnSell() {

    const allProduct = useSelector((state) => state.productReducer.allProduct)
    const currentUser = useSelector((state) => state.currentUserReducer.user)


    return (
        <>
            <div className="flex flex-col bg-neutral-900 rounded-xl min-h-screen col-span-7">
                <header className="flex justify-between items-center bg-slate-300 p-5 rounded-t-lg">
                    <h1 className="text-4xl font-thin font-ubuntu">Mes ventes en cours</h1>
                    <Tooltip
                        content="Les produits affichés ici sont vos articles en cours de ventes"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
                            <path d="M12 8h.01"></path>
                            <path d="M11 12h1v4h1"></path>
                        </svg>
                    </Tooltip>
                </header>
                <section className="flex flex-col items-center bg-neutral-900 p-5 rounded-b-xl h-full gap-5">
                    {!isEmpty(allProduct) && !isEmpty(currentUser) ? (
                        allProduct.filter((product) => product.user_id === currentUser.id).length > 0 ? (
                            allProduct.filter((product) => product.user_id === currentUser.id).map((product, index) => {
                                return (
                                    <div className="grid grid-cols-12 gap-5 bg-slate-300 mt-5 rounded-xl relative shadow w-full" key={index}>
                                        <div className="col-span-8 p-5">
                                            <h1 className="text-xl">{product.title}</h1>
                                            <p>{product.description}</p>
                                            <div className="absolute bottom-5">
                                                <h1 className="text-lg">Vous vendez ce produit à
                                                    <span className="text-xl"> {product.price}€</span>
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="col-span-4 w-full">
                                            <Carousel arrowSize={'20'}>
                                                {JSON.parse(product.url_image).map(image => {
                                                    return (
                                                        <img src={`../../uploads/product/${image}`} alt="product image" className="min-w-full object-cover h-48 w-16 rounded-r-xl" />
                                                    )
                                                }
                                                )}
                                            </Carousel>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center text-white min-h-full">
                                <svg width="100" height="100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="image de panier">
                                    <path fill-rule="evenodd" d="m0 2.54 1.41-1.41 21.46 21.46L21.46 24l-2.84-2.84c-.36.51-.95.84-1.62.84a1.997 1.997 0 0 1-1.16-3.62L14.46 17H7c-1.1 0-2-.9-2-2 0-.35.09-.68.25-.96l1.35-2.45-2.21-4.66L0 2.54ZM8.1 13 7 15h5.46l-2-2H8.1Zm7.95-.06c.54-.14.99-.49 1.25-.97l3.58-6.49C21.25 4.82 20.76 4 20 4H7.12l8.93 8.94ZM5.01 20c0-1.1.89-2 1.99-2s2 .9 2 2-.9 2-2 2-1.99-.9-1.99-2Z" clip-rule="evenodd"></path>
                                </svg>
                                <h1 className="text-xl mt-5">Vous n'avez aucun produit en vente pour le moment.</h1>
                            </div>
                        )
                    ) : (
                        <div>
                            <h1>Loading...</h1>
                        </div>
                    )}
                    <Link className="bg-slate-300 py-2 px-5 text-xl rounded opacity-80 hover:opacity-100 active:scale-95" to="/product/new">Créer une nouvelle annonce</Link>
                </section>
            </div>
        </>
    )
}