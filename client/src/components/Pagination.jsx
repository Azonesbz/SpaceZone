import { useSelector } from "react-redux"

export default function Pagination ({setPage}){
    const totalProduct = useSelector((state) => state.productReducer)
    console.log(totalProduct.number)
    
    let handleNextProduct = (e) => {
        const pageValue = e.currentTarget.querySelector('span').getAttribute('value')
        console.log(pageValue)
        setPage(pageValue)
    }

    return (
        <>
        <div className="flex items-center justify-center min-w-screen h-20">
            <div className="flex items-center h-14">
                {Array.from({length: Math.ceil(totalProduct.number / 6)}, (_, i) => (
                    <button 
                        key={i}
                        className="flex items-center justify-center h-10 w-10 bg-neutral-500"
                        onClick={(e) => handleNextProduct(e, i)}
                    >
                        <span value={i + 1}>{i + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    </>
    )
}