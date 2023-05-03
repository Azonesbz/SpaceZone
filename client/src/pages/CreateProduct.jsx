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
            <section className="flex min-h-screen p-10 w-full mt-20 gap-5">
                <div className="flex flex-col items-stretch w-3/5 space-y-10">
                    <h1 className="text-5xl font-medium">Comment vendre un produit avec SpaceZone ?</h1>
                    <div className="flex-flex-col shadow-md">
                        <p className="text-xl leading-8 bg-neutral-900 text-slate-200 p-5 rounded-t-md">Vendez vos biens en quelque clic seulement ! Avec <span className="text-blue-700 font-medium">SpaceZone</span>, vous avez la possibilité de revendre en toute confiance grâce à notre communauté de confiance ! On garde l'oeil sur notre plateforme, et en cas de problème, notre assistance est disponible <span className="text-green-500 font-medium">24h/24.</span> Et en plus c'est <span className="text-green-500 font-medium">satisfait, ou remboursé.</span> Veuillez suivre les étapes pour commencer par vendre votre premier produit.</p>
                        <div className="flex flex-col space-y-5">
                            <button className="bg-indigo-600 hover:bg-indigo-700 py-2 rounded-b-md duration-200" onClick={handleStart}>
                                <h2 className="text-lg font-ubuntu">Je sais déjà comment faire</h2>
                                Commencer maintenant
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-5 justify-around">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center vertical-center text-center h-16 w-16 p-8 bg-neutral-900 rounded-full text-slate-200 text-3xl">1</div>
                        <h1 className="ml-5 text-xl">Commencer par vous inscrire ! Si vous n'avez pas encore de compte, cliquez ici</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center vertical-center text-center h-16 w-16 p-8 bg-neutral-900 rounded-full text-slate-200 text-3xl">2</div>
                        <h1 className="ml-5 text-xl">Une fois inscrit, remplissez tout les champs ci-dessous pour mettre une offre en ligne.</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center vertical-center text-center h-16 w-16 p-8 bg-neutral-900 rounded-full text-slate-200 text-3xl">3</div>
                        <h1 className="ml-5 text-xl">Une fois votre offre sur le catalogue, attendez que quelqu'un décide d'acheter votre bien.</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center vertical-center text-center h-16 w-16 p-8 bg-neutral-900 rounded-full text-slate-200 text-3xl">4</div>
                        <h1 className="ml-5 text-xl">Poster le colis à l'adresse indiqué, et empocher votre argent !</h1>
                    </div>
                </div>
            </section>
            <section className="flex min-h-screen mt-10 container" id="start-now">
                <div>
                    <div>
                        <h1 className="text-5xl font-raleway font-medium">Vendre un produit</h1>
                        <h2 className="text-xl font-raleway font-medium text-blue-700 rounded mt-1">Commencer par renseigner les informations sur votre produit ci-dessous</h2>
                    </div>
                    <form action="" ref={form} onSubmit={handleForm} enctype="multipart/form-data" className="flex flex-col space-y-5 bg-neutral-900 mt-5 p-8 rounded-xl">
                        <label className="w-full">
                            <h2 className="text-xl font-karla text-slate-200">Titre de la vente</h2>
                            <input type="text" placeholder="Nom de votre produit..." className="px-3 py-2 w-full rounded outline-none" />
                        </label>
                        <label>
                            <h2 className="text-xl font-karla text-slate-200">Prix</h2>
                            <input type="text" placeholder="Prix" className="px-3 py-2 w-full rounded" />
                        </label>
                        <label>
                            <h2 className="text-xl font-karla text-slate-200">Description de votre produit</h2>
                            <textarea type="text" placeholder="Description" className="px-3 py-2 w-2/3 rounded"></textarea>
                        </label>
                        <label>
                            <h2 className="text-xl font-karla text-slate-200">Quantité disponible</h2>
                            <input className="px-3 py-2 w-full rounded" type="number" />
                        </label>
                        <Dropzone onFilesSelected={handleFilesSelected} />
                        <div className="flex space-x-3">
                            {files.map((file) => (
                                <p className="text-slate-200 underline" key={file.name}>{file.name}</p>
                            ))}
                        </div>
                        <div className="flex items-center gap-5">
                            {files.map((file, index) => (
                                <img key={index} src={URL.createObjectURL(file)} width={150} height={150} alt={file.name} className="h-20 w-20 hover:scale-150 duration-200" />
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <input type="submit" className="px-5 py-2 w-1/4 rounded-xl bg-slate-200 active:scale-95" />
                        </div>

                    </form>
                </div>
                <div>
                    <img src="./cards.png" alt="exemple d'un produit" />
                </div>
            </section>
            <Footer />
        </>
    )
}