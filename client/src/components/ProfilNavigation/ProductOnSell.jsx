import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { isEmpty } from '../Utils'
 
export default function ProductOnSell(){
const [getMyProduct, setGetMyProduct] = useState([])

    const product = useSelector((state) => state.productReducer)
    const currentUser = useSelector((state) => state.currentUserReducer)
    const scrollToTop = () => {
        const scrollStep = -window.scrollY / (500 / 15); // 500 est la durée de l'animation en millisecondes
        const scrollInterval = setInterval(() => {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        }, 15);
      }
      useEffect(() => {
        scrollToTop()
      }, [])
    useEffect(() => {
        const myProduct = product.filter(allproduct => allproduct.user_id === currentUser.user_id)
        setGetMyProduct(...getMyProduct, myProduct)
    }, [])
    return(
        <>
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-5 m-5 h-full col-span-7">
                <header>
                    <h1 className="text-4xl font-thin font-ubuntu text-white border-b-[1px] border-neutral-400 pb-5 mt-3">Mes ventes en cours</h1>
                    {!isEmpty(getMyProduct) && getMyProduct.map((product) => (
                        <div key={product.id}>
                            <h1>{product.name}</h1>
                        </div>
                    ))}
                </header>
            </div>
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-5 m-5 h-full col-span-7">
                <header>
                    <h1 className="text-4xl font-thin font-ubuntu text-white border-b-[1px] border-neutral-400 pb-5 mt-3">Mes ventes</h1>
                </header>
            </div>
        </>
    )
}