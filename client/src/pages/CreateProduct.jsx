import { useRef } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../actions/product.action";
import { useNavigate } from "react-router-dom";

export default function CreateProduct(){
    const form = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentUser = useSelector((state) => state.currentUserReducer)

    const handleForm = async (e) => {
        e.preventDefault()
        const productData = {
            id: currentUser.id,
            name: form.current[0].value,
            price: form.current[1].value,
            description: form.current[2].value,
        }

        dispatch(addProduct(productData))
        navigate('/home')
    }
    let handleStart = () => {
        const balise = document.querySelector("#start-now");
        const position = balise.offsetTop;
        window.scrollTo({
            top: position,
            behavior: "smooth"
        });
    }
    return (
        <>
            <Header />
            <section className="min-h-screen p-10 w-3/4 m-auto">
                <h1 className="text-5xl">Comment vendre un produit avec SpaceZone ?</h1>
                <h2 className="text-xl">Je sais déjà comment faire<button className="bg-indigo-600 hover:bg-indigo-800 ml-5 py-2 px-4 rounded-md" onClick={handleStart}>Commencer maintenant</button></h2>
            </section>
            <div className="min-h-screen flex flex-col items-center mt-10" id="start-now">
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