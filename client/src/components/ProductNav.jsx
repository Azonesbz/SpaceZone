import { useState } from "react"

export default function ProductNav(){
    const [counter, setCounter] = useState(0)
    const [nextProduct, setNextProduct] = useState([])
    const handlePage = () => {
        setCounter(counter => counter + 3)
        fetch('http://localhost:3001/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.parse(counter)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <>
            <div className="flex justify-center mt-5">
                <button className="py-2 px-5 w-28 mr-[5px] bg-slate-400 hover:scale-95 rounded-l-full uppercase font-kanit font-light text-center">Previous</button>
                <span className="border border-black rounded-full"></span>
                <button 
                className="py-2 px-5 bg-slate-400 w-28 ml-[5px] hover:scale-95 rounded-r-full uppercase font-kanit font-light text-center"
                onClick={handlePage}
                >
                    Next
                </button>
            </div>
        </>
    )
}