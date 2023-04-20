import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { setFile, uploadStarted, uploadSuccess, uploadError } from "../../actions/upload.action";

export default function Information(){

    const formPseudo = useRef()
    const formEmail = useRef()
    const formNumber = useRef()
    const formName = useRef()
    const formUpload = useRef()

    const [showFormPseudo, setShowFormPseudo] = useState(false)
    const [showFormEmail, setShowFormEmail] = useState(false)
    const [showFormNumber, setShowFormNumber] = useState(false)
    const [showFormName, setShowFormName] = useState(false)
    const [file, setFile] = useState(null);
    

    const currentUser = useSelector((state) => state.currentUserReducer)

    let data;
    let handleSubmitPseudo = (e) => {
        e.preventDefault()
        data = {
            username: formPseudo.current[0].value
        }
        setShowFormPseudo(false)
    }
    let handleSubmitEmail = (e) => {
        e.preventDefault()
        data = {
            username: formEmail.current[0].value
        }
        setShowFormEmail(false)
    }
    let handleSubmitNumber = (e) => {
        e.preventDefault()
        data = {
            username: formNumber.current[0].value
        }
        setShowFormNumber(false)
    }
    let handleSubmitName = (e) => {
        e.preventDefault()
        data = {
            username: formName.current[0].value
        }
        setShowFormName(false)
    }

    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
      };

    let handleSubmitFile = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user", currentUser.user_id)
        console.log(formData)
        fetch('http://localhost:3001/upload', {
            method: "POST",
            body: formData
        }).then(
            response => response.json()
        ).then(
            data => console.log(data)
        ).catch(err => console.error(err))
    }

    return(
        <>
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl w-4/6 p-5 m-5 h-full">
                <header>
                    <h1 className="text-4xl font-thin font-ubuntu text-white border-b-[1px] border-neutral-400 pb-5 mt-3">Information</h1>
                </header>
                <div className="bg-gray-600 mt-5 p-5 rounded-xl">
                    
                    {showFormPseudo ? <form action="" className="flex flex-col duration-200" onSubmit={handleSubmitPseudo} ref={formPseudo}>
                        <h2 className="text-2xl font-thin font-ubuntu text-white">Pseudonyme</h2>
                        <label htmlFor="" className="flex items-center">
                            <input type="text" defaultValue={currentUser.user_id} className="py-2 px-2 rounded-md" onChange={(e) => setInputPseudo(e.currentTarget.value)}/>
                            <button className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                        </label>
                    </form> : <div className="flex flex-col hover:scale-95 duration-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-thin font-ubuntu text-white">Pseudonyme</h2>
                            <button onClick={() => setShowFormPseudo(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                        </div>
                        <h3>{currentUser.user_id}</h3>
                    </div> }
                    {showFormEmail ? <form action="" className="flex flex-col duration-200 mt-5" onSubmit={handleSubmitEmail} ref={formEmail}>
                        <h2 className="text-2xl font-thin font-ubuntu text-white">Email</h2>
                        <label htmlFor="" className="flex items-center">
                            <input type="text" defaultValue={currentUser.email} className="py-2 px-2 rounded-md" />
                            <button className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                        </label>
                    </form> : <div className="flex flex-col hover:scale-95 mt-5 duration-200">
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
                    </form> : <div className="flex flex-col hover:scale-95 mt-5 duration-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-thin font-ubuntu text-white">Numéro de téléphone</h2>
                            <button onClick={() => setShowFormNumber(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                        </div>
                        <h3>{currentUser.numberphone ? currentUser.numberphone : "Aucun numéro de téléphone"}</h3>
                    </div> }
                    {showFormName ? 
                    <form action="" className="flex flex-col duration-200 mt-5" onSubmit={handleSubmitName} ref={formName}>
                        <h2 className="text-2xl font-thin font-ubuntu text-white">Pseudonyme</h2>
                        <label htmlFor="" className="flex items-center">
                            <input type="text" defaultValue={currentUser.name} className="py-2 px-2 rounded-md" />
                            <button className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                        </label>
                    </form> 
                    : 
                    <div className="flex flex-col hover:scale-95 mt-5 duration-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-thin font-ubuntu text-white">Prénom</h2>
                            <button onClick={() => setShowFormName(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                        </div>
                        <h3 className="text-lg font-ubuntu font-thin">{currentUser.name ? currentUser.name : "Aucun prénom définie"}</h3>
                    </div>
                    }
                    
                </div>
                <div className="flex mt-5">
                    <div className="flex flex-col">
                        <h2 className="text-slate-200 font-ubuntu text-xl font-thin">Image de profil</h2>
                        <img src="profil.jpg" alt="image de profil" className="rounded-full mt-5" height={150} width={150} />
                    </div>
                    <form onSubmit={handleSubmitFile} encType="multipart/form-data">
                        <input type="file" name="file" onChange={handleChangeFile} />
                        <input type="hidden" name="user" value={currentUser.user_id} />
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            </div>
        </>
    )
}