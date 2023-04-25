import { useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Information() {

    const formPseudo = useRef()
    const formEmail = useRef()
    const formNumber = useRef()
    const formName = useRef()

    const [showFormPseudo, setShowFormPseudo] = useState(false)
    const [showFormEmail, setShowFormEmail] = useState(false)
    const [showFormNumber, setShowFormNumber] = useState(false)
    const [showFormName, setShowFormName] = useState(false)
    const [file, setFile] = useState(null);

    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUserReducer)

    let data;
    let handleSubmitPseudo = (e) => {
        e.preventDefault()
        data = {
            pseudo: formPseudo.current[0].value
        }
        setShowFormPseudo(false)
    }
    let handleSubmitEmail = (e) => {
        e.preventDefault()
        data = {
            email: formEmail.current[0].value
        }
        dispatch(updateUserEmail(currentUser.id, data))
        setShowFormEmail(false)
    }
    let handleSubmitNumber = (e) => {
        e.preventDefault()
        data = {
            number: formNumber.current[0].value
        }
        dispatch(updateUserNumber(currentUser.id, data))
        setShowFormNumber(false)
    }
    let handleSubmitName = (e) => {
        e.preventDefault()
        data = {
            name: formName.current[0].value
        }
        dispatch(updateUserName(currentUser.id, data))
        setShowFormName(false)
    }

    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        setFile(file);

        const path = URL.createObjectURL(file);
    };

    let handleSubmitFile = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user", currentUser.username)
        fetch('http://localhost:3001/upload', {
            method: "POST",
            body: formData
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
            }
        ).catch(err => console.error(err))
    }

    return (
        <>
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl col-span-7 row-span-3 p-5">
                <header>
                    <h1 className="text-4xl font-thin font-ubuntu text-white border-b-[1px] border-neutral-400 pb-5 mt-3">Information</h1>
                </header>
                <div className="bg-gray-600 mt-5 p-5 rounded-xl">

                    {showFormPseudo ? <form action="" className="flex flex-col duration-200" onSubmit={handleSubmitPseudo} ref={formPseudo}>
                        <h2 className="text-2xl font-thin font-ubuntu text-white">Pseudonyme</h2>
                        <label htmlFor="" className="flex items-center">
                            <input type="text" defaultValue={currentUser.username} className="py-2 px-2 rounded-md" />
                            <button className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                        </label>
                    </form> : <div className="flex flex-col duration-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-thin font-ubuntu text-white">Pseudonyme</h2>
                            <button onClick={() => setShowFormPseudo(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                        </div>
                        <h3>{currentUser.username}</h3>
                    </div>}
                    {showFormEmail ? <form action="" className="flex flex-col duration-200 mt-5" onSubmit={handleSubmitEmail} ref={formEmail}>
                        <h2 className="text-2xl font-thin font-ubuntu text-white">Email</h2>
                        <label htmlFor="" className="flex items-center">
                            <input type="text" defaultValue={currentUser.email} className="py-2 px-2 rounded-md" />
                            <button className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                        </label>
                    </form> : <div className="flex flex-col mt-5 duration-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-thin font-ubuntu text-white">Email</h2>
                            <button onClick={() => setShowFormEmail(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                        </div>
                        <h3>{currentUser.email}</h3>
                    </div>}
                    {showFormNumber ? <form action="" className="flex flex-col duration-200 mt-5" onSubmit={handleSubmitNumber} ref={formNumber}>
                        <h2 className="text-2xl font-thin font-ubuntu text-white">Numéro de téléphone</h2>
                        <label htmlFor="" className="flex items-center">
                            <input type="text" defaultValue={currentUser.numberphone} className="py-2 px-2 rounded-md" />
                            <button className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                        </label>
                    </form> : <div className="flex flex-col mt-5 duration-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-thin font-ubuntu text-white">Numéro de téléphone</h2>
                            <button onClick={() => setShowFormNumber(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                        </div>
                        <h3>{currentUser.numberphone ? currentUser.numberphone : "Aucun numéro de téléphone"}</h3>
                    </div>}
                    {showFormName ?
                        <form action="" className="flex flex-col duration-200 mt-5" onSubmit={handleSubmitName} ref={formName}>
                            <h2 className="text-2xl font-thin font-ubuntu text-white">Pseudonyme</h2>
                            <label htmlFor="" className="flex items-center">
                                <input type="text" defaultValue={currentUser.name} className="py-2 px-2 rounded-md" />
                                <button className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                            </label>
                        </form>
                        :
                        <div className="flex flex-col mt-5 duration-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-thin font-ubuntu text-white">Prénom</h2>
                                <button onClick={() => setShowFormName(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                            </div>
                            <h3 className="text-lg font-ubuntu font-thin">{currentUser.name ? currentUser.name : "Aucun prénom définie"}</h3>
                        </div>
                    }

                </div>
                <div className="flex mt-5 justify-between">
                    <div className="flex flex-col justify-center items-center m-auto">
                        <h2 className="text-slate-200 font-ubuntu text-xl font-thin">Image de profil</h2>
                        <img
                            src={`./uploads/profil/${currentUser.username}.jpg`}
                            onError={(e) => {
                                e.target.onerror = null; // empêche les boucles d'erreur infinies
                                e.target.src = './uploads/default.jpg'; // charge une image alternative
                            }}
                            alt="image de profil"
                            className="rounded-full mt-5 h-24 w-24"
                        />
                    </div>
                    <form onSubmit={handleSubmitFile} encType="multipart/form-data" className="flex items-center bg-slate-200 p-5 h-48 rounded-xl border-[2px] border-gray-700">
                        <input
                            className="file:py-2 file:flex "
                            type="file"
                            name="file"
                            placeholder="Glisser pour déposer un fichier"
                            accept="image/png, image/jpeg"
                            onChange={handleChangeFile} />
                        <button type="submit" className="bg-gray-700 text-white px-2 py-1 rounded">Envoyer</button>
                    </form>
                </div>
            </div>
        </>
    )
}