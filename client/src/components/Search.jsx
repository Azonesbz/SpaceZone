import { useState } from "react";

export default function Search(){
    const [inputValue, setInputValue] = useState({
        search: '',
    });
    const [formData, setFormData] = useState({
        search: '',
        vêtements: null,
        accessoires: null,
        divers: false,
        priceMin: 0,
        priceMax: null,
    })
    const [filter, setFilter] = useState(false)


    const handleFilter = (e) => {
        e.preventDefault()
       filter ? setFilter(false) : setFilter(true);
    }

    return(
        <>
            <div className="flex flex-col p-4 rounded-xl bg-gradient-to-b from-slate-200 to-neutral-300">
                <form 
                className="w-full"
                action="" 
                method=""
                onSubmit={(e) => e.preventDefault}
                >
                    <label htmlFor="search" className='flex items-center bg-neutral-50 border border-gray-700 rounded-full'>
                        <input 
                        className="w-full p-3 rounded-l-full"
                        type="search"
                        name="search"
                        placeholder="Rechercher un article..."
                        value={formData.search}
                        onChange={(e) => {
                            console.log(formData)
                            const {name, value} = e.currentTarget
                            setFormData({...formData, [name]: value})
                        }}
                        />
                        <button className="mr-2 hover:scale-95 duration-200 active:scale-90" onClick={handleFilter}>
                            <svg width="46" height="46" fill="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 18.003c0 .55-.446.995-.995.995h-8.01a.995.995 0 0 1 0-1.99h8.01c.55 0 .995.445.995.995Z"></path>
                                <path d="M22 12.003c0 .55-.446.995-.995.995H2.995a.995.995 0 1 1 0-1.99h18.01c.55 0 .995.445.995.995Z"></path>
                                <path d="M21.005 6.99a.995.995 0 0 0 0-1.99H8.995a.995.995 0 1 0 0 1.99h12.01Z"></path>
                            </svg>
                        </button>
                        <button className="mr-2 rotate-90" type="submit">
                            <svg width="34" height="34" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"></path>
                                <path d="m21 21-6-6"></path>
                            </svg>
                        </button>
                    </label>
                
                <div className={`grid grid-cols-2 p-5 justify-around w-full ${filter ? "" : "hidden"} duration-200`}>
                    <div className="flex flex-col ml-5 px-5 border-l-[1px] border-neutral-400 space-y-5 w-full col-span-2 md:col-span-1">
                        <h2 className="font-raleway text-xl font-semibold">Catégorie</h2>
                        <label htmlFor="" className="flex justify-between w-full items-center text-md font-raleway font-medium">
                            Vêtements
                            <input 
                            type="checkbox"
                            className="h-5 w-5"
                            checked={formData.vêtements}
                            name="vêtements"
                            onChange={(e) => {
                                const { name, checked } = e.target;
                                setFormData({ ...formData, [name]: checked });
                                console.log(formData)
                            }}
                            />
                        </label>
                        <label htmlFor="" className="flex justify-between w-full items-center text-md font-raleway font-medium">
                            Accessoires
                            <input
                                type="checkbox"
                                className="h-5 w-5"
                                checked={formData.accessoire}
                                name="accessoire"
                                onChange={(e) => {
                                    const { name, checked } = e.target;
                                    setFormData({ ...formData, [name]: checked });
                                    console.log(formData)
                                }}
                            />
                        </label>
                        <label htmlFor="" className="flex justify-between w-full items-center text-md font-raleway font-medium">
                            Autres
                            <input 
                            type="checkbox"
                            className="h-5 w-5"
                            checked={formData.divers}
                            name="divers"
                            onChange={(e) => {
                                const { name, checked } = e.target;
                                setFormData({ ...formData, [name]: checked });
                                console.log(formData)
                            }}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col ml-5 px-5 border-l-[1px] border-neutral-400 space-y-5 col-span-2 md:col-span-1">
                        <h2 className="font-raleway text-xl font-semibold">Filtre</h2>
                        <label htmlFor="" className="flex flex-col w-full text-md font-raleway font-medium">
                            <div className="flex items-center">
                                <h3 className="text-xl">Prix Minimum</h3>
                                <span className="ml-5 font-kanit text-xl">{formData.priceMin}€</span>
                            </div>
                            <input
                            name="priceMin"
                            type="range"
                            max={500}
                            onChange={(e) => {
                                console.log(formData)
                                const {name, value} = e.currentTarget
                                setFormData({...formData, [name]: value})
                            }}
                            value={formData.priceMin}
                            />
                        </label>
                        <label htmlFor="" className="flex flex-col justify-between w-full text-md font-raleway font-medium">
                        <div className="flex items-center">
                                <h3 className="text-xl">Prix Maximum</h3>
                                <span className="ml-5 font-kanit text-xl">{formData.priceMax === null ? "0" : formData.priceMax}€</span>
                            </div>
                            <input 
                            name="priceMax"
                            type="range"
                            max={500}
                            onInput={(e) => {
                                console.log(formData)
                                const {name, value} = e.currentTarget
                                setFormData({...formData, [name]: value})
                            }} 
                            value={formData.priceMax === null ? 0 : formData.value}
                            />
                        </label>
                    </div>
                <button className="block mt-5 active:scale-95 py-2 px-3 rounded-xl text-white font-karla text-lg bg-gradient-to-r from-cyan-600 to-blue-800 duration-200">Valider et rechercher</button>
                </div>
                </form>
            </div>
        </>
    )
}