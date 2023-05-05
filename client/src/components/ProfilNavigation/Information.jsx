import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Modal from "../modal/Modal"
import { editEmail, editFirstName, editNumberPhone, editPicture, editUsername } from "../../actions/user.action"
import { isEmpty } from "../../utils/utils"
import { Tooltip } from "flowbite-react"

function UsernameModal({currentUser, isOpen, onClose}){

    const formData = useRef()
    const dispatch = useDispatch()

    let data;
    let handleSubmitPseudo = (e) => {
        e.preventDefault()
        console.log(currentUser.id)
        data = {
            id: currentUser.id,
            username: formData.current[0].value
        }
        dispatch(editUsername(data))
        onClose()
    }
    
    return(
        <Modal isOpen={isOpen} onClose={onClose} height={'h-40'} width={'w-full'}>
            <form action="" className="flex flex-col h-full duration-200 py-7 px-8" onSubmit={handleSubmitPseudo} ref={formData}>
                <h2 className="text-3xl font-Lato text-black">Pseudonyme</h2>
                <label htmlFor="" className="flex items-center mt-3">
                    <input type="text" defaultValue={currentUser.username} className="py-2 px-3 rounded-md font-Quicksand font-medium text-xl" />
                    <button className="bg-gray-800 px-5 py-2 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                </label>
            </form>
        </Modal>
    )
}
function EmailModal({currentUser, isOpen, onClose}){
    const formData = useRef()
    const dispatch = useDispatch()

    let data;
    let handleEditEmail = (e) => {
        e.preventDefault()
        data = {
            id: currentUser.id,
            email: formData.current[0].value
        }
        dispatch(editEmail(data))
        onClose()
    }
    return(
        <Modal isOpen={isOpen} onClose={onClose} height={'h-40'} width={'w-full'}>
            <form action="" className="flex flex-col h-full duration-200 py-7 px-8" onSubmit={handleEditEmail} ref={formData}>
                <h2 className="text-3xl font-Lato text-black">Email</h2>
                <label htmlFor="" className="flex items-center mt-3">
                    <input type="text" defaultValue={currentUser.email} className="py-2 px-3 rounded-md font-Quicksand font-medium text-xl" />
                    <button className="bg-gray-800 px-5 py-2 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                </label>
            </form>
        </Modal>
    )
}
function PhoneNumberModal({currentUser, isOpen, onClose}){
    const formData = useRef()
    const dispatch = useDispatch()

    let data;
    let handleEditPhoneNumber = (e) => {
        e.preventDefault()
        data = {
            id: currentUser.id,
            numberphone: formData.current[0].value
        }
        dispatch(editNumberPhone(data))
        onClose()
    }
    
    return(
        <Modal isOpen={isOpen} onClose={onClose} height={'h-40'} width={'w-full'}>
            <form action="" className="flex flex-col h-full duration-200 py-7 px-8" onSubmit={handleEditPhoneNumber} ref={formData}>
                <h2 className="text-3xl font-Lato text-black">Numéro de téléphone</h2>
                <label htmlFor="" className="flex items-center mt-3">
                    <input type="text" defaultValue={currentUser.number_phone} className="py-2 px-3 rounded-md font-Quicksand font-medium text-xl"/>
                    <button className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                </label>
            </form>
        </Modal>
    )
}
function FirstNameModal({currentUser, isOpen, onClose}){
    const formData = useRef()
    const dispatch = useDispatch()

    let data;
    let handleEditFirstName = (e) => {
        e.preventDefault()
        data = {
            id: currentUser.id,
            firstName: formData.current[0].value
        }
        dispatch(editFirstName(data))
        onClose()
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose} height={'h-40'} width={'w-full'}>
            <form action="" className="flex flex-col h-full duration-200 py-7 px-8" onSubmit={handleEditFirstName} ref={formData}>
                <h2 className="text-3xl font-Lato text-black">Prénom</h2>
                <label htmlFor="" className="flex items-center mt-3">
                    <input type="text" defaultValue={currentUser.first_name} className="py-2 px-3 rounded-md font-Quicksand font-medium text-xl" />
                    <button className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md ml-5" type="submit">Valider</button>
                </label>
            </form>
        </Modal>
    )
}

export default function Information() {

    const [showFormUsername, setShowFormUsername] = useState(false)
    const [showFormEmail, setShowFormEmail] = useState(false)
    const [showFormNumber, setShowFormNumber] = useState(false)
    const [showFormName, setShowFormName] = useState(false)
    const [file, setFile] = useState(null);
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUserReducer.user)

    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        setFile(file);
    };

    let handleSubmitFile = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", currentUser.id)
        dispatch(editPicture(formData))
            
    }
    let handleCloseUsername = () => {
        setShowFormUsername(false)
    }
    let handleCloseEmail = () => {
        setShowFormEmail(false)
    }
    let handleCloseNumber = () => {
        setShowFormNumber(false)
    }
    let handleCloseName = () => {
        setShowFormName(false)
    }

    return (
        <>
            <div className="bg-neutral-900 rounded-xl col-span-7 font-Lato">
                <header className="flex justify-between items-center bg-slate-300 p-5 rounded-t-lg">
                    <h1 className="text-3xl">Vos informations</h1>
                    <Tooltip
                        content="Les produits affichés ici sont vos articles en cours de ventes"
                    >
                        <svg width="25" height="25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
                            <path d="M12 8h.01"></path>
                            <path d="M11 12h1v4h1"></path>
                        </svg>
                    </Tooltip>
                </header>
                <section className="p-5">
                    <div className="flex flex-col gap-5 bg-slate-300 rounded-xl relative shadow w-full p-5 font-Lato text-lg">

                        <div className="flex flex-col duration-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl">Pseudonyme</h2>
                                <button onClick={() => setShowFormUsername(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                            </div>
                            <h3 className="text-indigo-900">{!isEmpty(currentUser) ? currentUser.username : ""}</h3>
                        </div>
                        <div className="flex flex-col mt-5 duration-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl">Email</h2>
                                <button onClick={() => setShowFormEmail(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                            </div>
                            <h3 className="text-indigo-900">{!isEmpty(currentUser) ? currentUser.email : ""}</h3>
                        </div>
                        <div className="flex flex-col mt-5 duration-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl">Numéro de téléphone</h2>
                                <button onClick={() => setShowFormNumber(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                            </div>
                            <h3 className="text-indigo-900">{!isEmpty(currentUser) ? (currentUser.number_phone ? currentUser.number_phone : "Aucun numéro de téléphone") : ""}</h3>
                        </div>
                        <div className="flex flex-col mt-5 duration-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl">Prénom</h2>
                                <button onClick={() => setShowFormName(true)} className="bg-gray-800 px-3 py-1 text-slate-200 rounded-md">Modifier</button>
                            </div>
                            <h3 className="text-indigo-900">{ !isEmpty(currentUser) ? (currentUser.first_name ? currentUser.first_name : "Aucun prénom définie") : ""}</h3>
                        </div>
                    </div>

                </section>
                <section className="flex p-5 justify-center space-x-20">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-slate-200 font-LAto text-xl">Image de profil</h2>
                        <img
                            src={`./uploads/profil/${!isEmpty(currentUser) ? currentUser.profil_picture : ""}`}
                            onError={(e) => {
                                e.target.onerror = null; // empêche les boucles d'erreur infinies
                                e.target.src = './uploads/profil/default.jpg'; // charge une image alternative
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
                </section>
                <UsernameModal currentUser={!isEmpty(currentUser) ? currentUser : ""} isOpen={showFormUsername} onClose={handleCloseUsername} />
                <EmailModal currentUser={!isEmpty(currentUser) ? currentUser : ""} isOpen={showFormEmail} onClose={handleCloseEmail} />
                <PhoneNumberModal currentUser={!isEmpty(currentUser) ? currentUser : ""} isOpen={showFormNumber} onClose={handleCloseNumber} />
                <FirstNameModal currentUser={!isEmpty(currentUser) ? currentUser : ""} isOpen={showFormName} onClose={handleCloseName} />
            </div>
        </>
    )
}