import { useEffect, useState } from "react"
import Header from "../components/Navbar"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import { isEmpty } from '../utils/utils'

export default function Carts(){

    const [totalPrice, setTotalPrice] = useState(null)

    const cartItem = useSelector((state) => state.cartReducer)
    useEffect(() => {
        const listItemPrice = cartItem.map(item => parseInt(item.price))
        setTotalPrice(listItemPrice.reduce((acc, val) => acc + val, 0))
    }, [])
    return (
        <>
            <Header />
            <section className="p-10">
                <div className="flex items-center justify-between border-b border-black pb-2">
                    <h1 className="uppercase font-karla font-medium text-3xl">Mon Panier</h1>
                    <h2 className="uppercase font-karla font-medium text-3xl">Prix total des articles: <span>{totalPrice}$</span></h2>
                </div>
                <div className="grid grid-cols-12 gap-5 mt-5" >
                {!isEmpty(cartItem) && cartItem.map(items => (
                    <div className="col-span-6 bg-slate-300 rounded-xl text-cyan-600 hover:underline" key={items.id}>
                        <h1 className="">{items.title}</h1>
                        <h1 className="">Prix total: <span>{items.price}</span></h1>
                        <h1 className=""><span>{items.quantity}</span></h1>
                    </div>
                ))}
                </div>
            </section>
            <Footer />
        </>
    )
}