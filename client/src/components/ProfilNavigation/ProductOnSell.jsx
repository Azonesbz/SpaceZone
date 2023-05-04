import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { isEmpty } from '../Utils'
import Carousel from '../carousel/Carousel'
import { Tooltip } from "flowbite-react"

export default function ProductOnSell() {

    const allProduct = useSelector((state) => state.productReducer.allProduct)
    const currentUser = useSelector((state) => state.currentUserReducer.user)


    return (
        <>
            <div className="bg-neutral-900 rounded-xl h-full col-span-7">
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
                <section className="bg-neutral-900 p-5 rounded-b-xl">
                    {/* {!isEmpty(allProduct) && allProduct.filter((product) => product.user_id === currentUser.id).map((product, index) => { 
                        if(product){
                            return (
                        
                    )} else {
                        return (
                            <div>
                                <h1>Vous n'avez aucun produit en vente pour le moment.</h1>
                            </div>
                        )
                    }
                    
                    })} */}
                    {!isEmpty(allProduct) ? (
                        allProduct.filter((product) => product.user_id === currentUser.id).length > 0 ? (
                            allProduct.filter((product) => product.user_id === currentUser.id).map((product, index) => {
                                return (
                                    <div className="grid grid-cols-12 gap-5 bg-slate-300 mt-5 rounded relative" key={index}>
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
                            <div>
                                <h1>Vous n'avez aucun produit en vente pour le moment.</h1>
                            </div>
                        )
                    ) : (
                        <div>
                            <h1>Loading...</h1>
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}