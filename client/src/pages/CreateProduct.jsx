import { useRef } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropzone from "../components/dropzone/Dropzone";
import { addProduct } from "../actions/product.action";
import Modal from "../components/modal/Modal";


function Error({onClose, isOpen}){
    return (
        <Modal onClose={onClose} isOpen={isOpen} width={'w-full'} height={'h-72'}>
            <div className='h-full w-full flex flex-col items-center justify-center p-10'>
                <div className='flex flex-col items-center'>
                    <svg className='text-red-700' width="100" height="100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 15h2v2h-2v-2Zm0-8h2v6h-2V7Zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 
                        22 12S17.52 2 11.99 2ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z"></path>
                    </svg>
                    <h1 className='text-center font-Lato text-xl font-bold'>Vous n'avez pas rempli tout les champs, veuillez remplir le formulaire 
                    dans sa totalité avant de le soumettre.
                    </h1>
                </div>
                <button
                    className='bg-blue-700 text-xl rounded-full py-1 px-3 mt-2'
                    onClick={onClose}
                >
                    Ok !
                </button>
            </div>
        </Modal>
    )
}

export default function CreateProduct(){
    const form = useRef()
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUserReducer.user)
    const [files, setFiles] = useState([]);
    const [postError, setPostError] = useState(false)
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
            price: parseInt(form.current[1].value),
            description: form.current[2].value,
            category: parseInt(form.current[3].value),
            inventory: parseInt(form.current[4].value)
        }

        formData.append('productData', JSON.stringify(productData));
        files.forEach((file) => {
            formData.append('files', file);
        });
        if(productData.id && productData.name && productData.price && productData.description && productData.category && productData.inventory){
            dispatch(addProduct(formData))
            navigate('/home')
        } else {
            setPostError(true)
        }
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
            <section className="grid grid-cols-12 min-h-screen sm:p-10 w-full mt-24 gap-5 font-Lato">
                <div className="flex flex-col col-span-12 md:col-span-8 justify-center sm:w-2/3 space-y-10">
                    <h1 className="text-5xl font-medium text-center">Comment vendre un produit avec SpaceZone ?</h1>
                    <div className="flex-flex-col shadow-md">
                        <div className="text-xl leading-8 bg-neutral-900">
                            <p className="text-slate-200 p-5 sm:rounded-t-md">
                                Vendez vos biens en quelque clic seulement ! Avec 
                                <span className="text-blue-700 font-medium">
                                    SpaceZone
                                </span>
                                , vous avez la possibilité de revendre en toute confiance, garder vos transactions confidentiels !
                            </p>
                            <p className="text-slate-200 p-5 sm:rounded-t-md">
                                On garde l'oeil sur notre plateforme, et en cas de problème, notre assistance est disponible
                                <span className="text-green-500 font-medium">
                                    24h/24.
                                </span> 
                                Et en plus c'est 
                                <span className="text-green-500 font-medium">
                                    satisfait, ou remboursé.
                                </span> 
                                Veuillez suivre les étapes pour commencer par vendre votre premier produit.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <button className="bg-indigo-600 hover:bg-indigo-700 py-2 sm:rounded-b-md duration-200" onClick={handleStart}>
                                <h2 className="text-lg font-ubuntu">Je sais déjà comment faire</h2>
                                Commencer maintenant
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col col-span-12 md:col-span-12 w-full p-5 space-y-10 sm:mt-16 justify-self-end">
                    <div className="flex flex-row-reverse items-center">
                        <div className="flex items-center justify-center vertical-center text-center h-16 w-16 p-8 bg-neutral-900 rounded-full
                        text-slate-200 text-3xl">
                            1
                        </div>
                        <h1 className="mr-5 text-xl">Commencer par vous inscrire ! Si vous n'avez pas encore de compte, cliquez <Link to="/">ici</Link></h1>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="flex items-center justify-center vertical-center text-center h-16 w-16 p-8 bg-neutral-900 rounded-full
                        text-slate-200 text-3xl">
                            2
                        </div>
                        <h1 className="ml-5 text-xl">Une fois inscrit, remplissez tout les champs ci-dessous pour mettre une offre en ligne.</h1>
                    </div>
                    <div className="flex flex-row-reverse items-center">
                        <div className="flex items-center justify-center vertical-center text-center h-16 w-16 p-8 bg-neutral-900 rounded-full
                        text-slate-200 text-3xl">
                            3
                        </div>
                        <h1 className="mr-5 text-xl">Une fois votre offre sur le catalogue, attendez que quelqu'un décide d'acheter votre bien.</h1>
                    </div>
                    <div className="flex items-center justify-end">
                        <div 
                        className="flex items-center justify-center vertical-center text-center h-16 w-16 p-8 bg-neutral-900 rounded-full
                        text-slate-200 text-3xl">
                            4
                        </div>
                        <h1 className="ml-5 text-xl">Poster le colis à l'adresse indiqué, et empocher votre argent !</h1>
                    </div>
                </div>
            </section>
            <section className="flex justify-center min-h-screen mt-10 container col-span-12 font-Lato sm:p-10" id="start-now">
                <div>
                    <div className="flex flex-col space-y-5 text-center">
                        <h1 className="text-4xl font-medium whitespace-nowrap">Vendre un produit</h1>
                        <h2 className="text-2xl font-medium text-blue-700 rounded mt-1">Commencer par renseigner les informations sur votre produit ci-dessous</h2>
                    </div>
                    <form 
                    action="" 
                    ref={form} 
                    onSubmit={handleForm} 
                    enctype="multipart/form-data" 
                    className="flex flex-col space-y-5 bg-neutral-900 mt-5 p-8 sm:rounded-xl"
                    >
                        <label className="w-full">
                            <h2 className="text-xl text-slate-200">Que vendez-vous ?</h2>
                            <input type="text" placeholder="Nom de votre produit..." className="px-3 py-2 w-full rounded outline-none" />
                        </label>
                        <label>
                            <h2 className="text-xl text-slate-200">Prix</h2>
                            <input type="text" placeholder="Prix" className="px-3 py-2 w-full rounded" />
                        </label>
                        <label>
                            <h2 className="text-xl text-slate-200">Description de votre produit</h2>
                            <textarea type="text" placeholder="Description" className="px-3 py-2 rounded w-full"></textarea>
                        </label>
                        <label>
                            <h2 className="text-xl text-slate-200">Veuillez choisir une catégorie</h2>
                            <select className="py-2 px-3 rounded w-full">
                                <option value="1">Vêtements</option>
                                <option value="2">Divers</option>
                                <option value="3">Accessoires</option>
                            </select>
                        </label>
                        <label>
                            <h2 className="text-xl text-slate-200">Quantité disponible</h2>
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
                                <img 
                                key={index} 
                                src={URL.createObjectURL(file)} 
                                width={150} height={150} 
                                alt={file.name} 
                                className="h-20 w-20 hover:scale-150 duration-200" 
                                />
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <input type="submit" className="px-5 py-3 w-2/4 rounded-xl bg-slate-200 active:scale-95 hover:opacity-90" />
                        </div>

                    </form>
                </div>
            </section>
            {postError ? <Error isOpen={postError} onClose={() => setPostError(false)} /> : null}
            <Footer />
        </>
    )
}