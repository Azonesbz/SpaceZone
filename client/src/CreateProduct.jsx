import { useRef } from "react";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "./actions/product.action";
import { useNavigate } from "react-router-dom";

export default function CreateProduct(){
    const form = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleForm = async (e) => {
        e.preventDefault()
        console.log(form.current[0].value)
        const productData = {
            id_user: 'Azones',
            name: form.current[0].value,
            price: form.current[1].value,
            description: form.current[2].value,
        }

        dispatch(addProduct(productData))
        navigate('/home')
    }
    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center mt-10">
                <h1 className="text-2xl font-raleway font-medium">Vendre un produit</h1>
                <h2 className="text-xl font-raleway font-medium">Commencer par renseigner les informations sur votre produit ci-dessous</h2>
                <form action="" ref={form} onSubmit={handleForm} className="flex flex-col space-y-5">
                    <label htmlFor="">
                        <input type="text" placeholder="Nom de votre produit..." className="px-3 py-1"/>

                    </label>
                    <label htmlFor="">
                        <input type="text" placeholder="Prix" className="px-3 py-1"/>

                    </label>
                    <label htmlFor="">
                        <textarea type="text" placeholder="Description" className="px-3 py-1"></textarea>

                    </label>
                    <input type="submit" className="px-3 py-2 rounded-xl bg-gradient-to-r from-green-700 to bg-cyan-700 active:scale-95"/>
                </form>
            </div>
            <Footer />
        </>
    )
}