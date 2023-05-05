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
            <div className="flex space-x-10 bg-neutral-900 p-8 rounded text-slate-200">
                <h3 className="whitespace-nowrap">Trier par: </h3>
                <form action="" className="flex items-center justify-between w-full" onSubmit={handleFilterSubmit} ref={form}>
                    <div className="flex space-x-5 items-center">
                        <label htmlFor="decreasing">
                            <h1>Prix décroissant</h1>
                            <input type="radio" id="decreasing" name="option" />

                        </label>
                        <label htmlFor="crescent">
                            <h1>Prix croissant</h1>
                            <input type="radio" id="crescent" name="option" />
                        </label>
                        <label htmlFor="">
                            <select className="text-black">
                                <option value="0" className="font-FlowCircular"></option>
                                <option value="1">Vêtements</option>
                                <option value="3">Accessoires</option>
                                <option value="2">Divers</option>
                            </select>
                        </label>
                    </div>
                    <button className="py-2 px-5 bg-slate-300 text-black rounded-xl text-lg font-Lato" type="submit">Rechercher</button>
                </form>
            </div>
        </>
    )
}