import { useRef } from "react";
import Header from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "./actions/product.action";
import { useNavigate } from "react-router-dom";

export default function CreateProduct(){
    const form = useRef()
    const product = useSelector((state) => state.productReducer)
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
        navigate('/')
    }
    return (
        <>
            <Header />
            <div className="min-h-screen">
                <form action="" ref={form} onSubmit={handleForm}>
                    <input type="text" placeholder="Nom de votre produit..."/>
                    <input type="text" placeholder="Prix"/>
                    <textarea type="text" placeholder="Description"></textarea>
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}