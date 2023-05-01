import { useRef } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropzone from "../components/dropzone/Dropzone";
import { addProduct } from "../actions/product.action";


export default function CreateProduct(){
    const form = useRef()
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUserReducer)
    const [files, setFiles] = useState([]);
    const navigate = useNavigate()

    const handleFilesSelected = (selectedFiles) => {
        setFiles([...files, ...selectedFiles]);
    };
    const handleForm = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        const productData = {
            id: currentUser.id,
            name: form.current[0].value,
            price: form.current[1].value,
            description: form.current[2].value,
            inventory: form.current[3].value
        }
        formData.append('productData', JSON.stringify(productData));
        files.forEach((file) => {
            formData.append('files', file);
        });
        console.log(formData)
        dispatch(addProduct(formData))
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
            <section className="min-h-screen p-10 w-3/4 mt-20">
                <h1 className="text-5xl">Comment vendre un produit avec SpaceZone ?</h1>
                <h2 className="text-xl">Je sais déjà comment faire<button className="bg-indigo-600 hover:bg-indigo-800 ml-5 py-2 px-4 rounded-md" onClick={handleStart}>Commencer maintenant</button></h2>
            </section>
            <div className="min-h-screen flex flex-col items-center mt-10" id="start-now">
                <h1 className="text-2xl font-raleway font-medium">Vendre un produit</h1>
                <h2 className="text-xl font-raleway font-medium">Commencer par renseigner les informations sur votre produit ci-dessous</h2>
                <form action="" ref={form} onSubmit={handleForm} enctype="multipart/form-data" className="flex flex-col space-y-5">
                    <label>
                        <h2 className="text-xl font-karla text-blue-600">Titre de la vente</h2>
                        <input type="text" placeholder="Nom de votre produit..." className="px-3 py-1"/>
                    </label>
                    <label>
                    <h2 className="text-xl font-karla text-blue-600">Prix</h2>
                        <input type="text" placeholder="Prix" className="px-3 py-1"/>
                    </label>
                    <label>
                    <h2 className="text-xl font-karla text-blue-600">Description de votre produit</h2>
                        <textarea type="text" placeholder="Description" className="px-3 py-1"></textarea>
                    </label>
                    <label>
                    <h2 className="text-xl font-karla text-blue-600">Quantité disponible</h2>
                        <input className="px-3 py-1" type="number" />
                    </label>
                    <Dropzone onFilesSelected={handleFilesSelected} />
                    <div>
                        {files.map((file) => (
                            <p key={file.name}>{file.name}</p>
                        ))}
                    </div>
                    <div className="flex items-center gap-5">
                        {files.map((file, index) => (
                            <img key={index} src={URL.createObjectURL(file)} width={150} height={150} alt={file.name} className="h-20 w-20 hover:scale-150 duration-200" />
                        ))}
                    </div>
                    <input type="submit" className="px-3 py-2 rounded-xl bg-gradient-to-r from-green-700 to bg-cyan-700 active:scale-95"/>

                </form>
            </div>
            <Footer />
        </>
    )
}