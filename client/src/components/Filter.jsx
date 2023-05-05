import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterProduct } from "../actions/product.action"

export default function Filter(){

    const form = useRef()
    const dispatch = useDispatch()

    let handleFilterSubmit = (e) => {
        e.preventDefault()
        let data = {
            decreasing: form.current[0].checked,
            crescent: form.current[1].checked,
            category: form.current[2].value,
        }
        dispatch(filterProduct(data))
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:space-x-10 bg-neutral-900 sm:rounded-xl text-slate-200 font-Lato items-start p-5">
                <h3 className="whitespace-nowrap text-2xl">Trier par: </h3>
                <form action="" className="flex flex-col items-center justify-between w-full mt-5 sm:mt-0" onSubmit={handleFilterSubmit} ref={form}>
                    <div className="flex flex-col sm:flex-row sm:space-x-2 sm:items-center w-full space-y-5 sm:space-y-0">
                        <label htmlFor="decreasing" className="flex items-center w-full sm:space-x-3 justify-between">
                            <h1 className="whitespace-nowrap">Prix décroissant</h1>
                            <div className="h-[1px] bg-neutral-700 w-full mx-5"/>
                            <input type="radio" id="decreasing" name="option" className="h-8 w-12" />

                        </label>
                        <label htmlFor="crescent" className="flex items-center w-full sm:space-x-3 justify-between">
                            <h1 className="whitespace-nowrap">Prix croissant</h1>
                            <div className="h-[1px] bg-neutral-700 w-full mx-5"/>
                            <input type="radio" id="crescent" name="option" className="h-8 w-12" />
                        </label>
                        <label htmlFor="" className="w-full">
                            <select className="text-black py-3 pl-2 w-full rounded">
                                <option value="0" className="font-FlowCircular"></option>
                                <option value="1">Vêtements</option>
                                <option value="3">Accessoires</option>
                                <option value="2">Divers</option>
                            </select>
                        </label>
                    </div>
                    <button className="flex items-center justify-center space-x-2 py-1 px-3 bg-slate-300 text-black rounded text-lg font-Lato mt-5 w-full" type="submit">
                        <h2>Rechercher</h2>
                        <svg width="35" height="35" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.755 14.255h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23 6.5 6.5 0 1 0-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5Zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5Z"></path>
                        </svg>
                    </button>
                </form>
            </div>
        </>
    )
}