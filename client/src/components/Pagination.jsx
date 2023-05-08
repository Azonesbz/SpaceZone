import { useSelector } from "react-redux"

export default function Pagination ({setPage}){
    const totalProduct = useSelector((state) => state.productReducer)
    
    let handleNextProduct = (e) => {
        const pageValue = e.currentTarget.querySelector('span').getAttribute('value')
        setPage(pageValue)
    }

    return (
        <>
        <div className="flex items-center justify-center min-w-screen h-20">
            <div className="flex items-center h-14 gap-2">
                {Array.from({length: Math.ceil(totalProduct.number / 6)}, (_, i) => (
                    <button 
                        key={i}
                        className="flex items-center justify-center h-10 w-10 bg-neutral-900 text-white rounded"
                        onClick={(e) => handleNextProduct(e, i)}
                        id={i}
                    >
                        <span value={i + 1}>{i + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    </>
    )
}