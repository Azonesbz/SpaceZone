import Header from "../components/Navbar";
import Information from "../components/ProfilNavigation/Information";
import ProductOnSell from "../components/ProfilNavigation/ProductOnSell";
import Purshases from "../components/ProfilNavigation/Purshases";
import About from "../components/ProfilNavigation/About";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../utils/utils";
import LikedProduct from "../components/ProfilNavigation/LikeProduct";
import { useNavigate } from "react-router-dom";

export default function Profil(){

    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.currentUserReducer.user)
    const isLogged = useSelector((state) => state.sessionReducer.Authorization)
    const [aboutNav, setAboutNav] = useState(false)
    const [purshaseNav, setPurshaseNav] = useState(false)
    const [informationNav, setInformationNav] = useState(true)
    const [productLike, setProductLike] = useState(false)
    const [productOnSellNav, setProductOnSellNav] = useState(false)
    const [userIsLogged, setUserIsLogged] = useState(false)

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
    }, [aboutNav, purshaseNav, informationNav, productOnSellNav])

    useEffect(() => {
      isLogged ? "" : navigate('/*')
      setUserIsLogged(true)
    }, [isLogged])

    const handleNav = (e) => {
        let parent = e.target;
        for (let i = 0; i < 5; i++) {
          if (parent.id === "informations") {
            setAboutNav(false);
            setPurshaseNav(false);
            setInformationNav(true);
            setProductOnSellNav(false);
            setProductLike(false);
            break;
          } else if (parent.id === "productOnSell") {
            setAboutNav(false);
            setPurshaseNav(false);
            setInformationNav(false);
            setProductOnSellNav(true);
            setProductLike(false);
            break;
          } else if (parent.id === "purshases") {
            setAboutNav(false);
            setPurshaseNav(true);
            setInformationNav(false);
            setProductOnSellNav(false);
            setProductLike(false);
            break;
          } else if (parent.id === "about") {
            setAboutNav(true);
            setPurshaseNav(false);
            setInformationNav(false);
            setProductOnSellNav(false);
            setProductLike(false);
            break;
          } else if (parent.id === "like") {
            setAboutNav(false);
            setPurshaseNav(false);
            setInformationNav(false);
            setProductOnSellNav(false);
            setProductLike(true);
            break;
          } else {
            parent = parent.parentNode;
          }
        }
      };

    return (
        <>
            {userIsLogged ? <Header /> : null }
            {userIsLogged ? <section className="grid grid-cols-12 gap-2 relative mt-20 lg:p-10 duration-200">
                <aside className="bg-neutral-900 col-span-12 sm:col-span-4 text-black shadow-xl lg:rounded-xl">
                    <header className="flex flex-col items-center bg-slate-300 p-5 lg:rounded-t-lg">
                        <img
                          src={`./uploads/profil/${!isEmpty(currentUser) ? currentUser.profil_picture : ""}`}
                          onError={(e) => {
                            e.target.onerror = null; // empêche les boucles d'erreur infinies
                            e.target.src = './uploads/profil/default.jpg'; // charge une image alternative
                          }}
                          alt="image de profil"
                          className="rounded-full mt-5 h-36 w-36 shadow skew-y-0 object-center object-cover"
                        />
                        <h1 className="mt-3 text-2xl text-center font-semibold font-raleway first-letter:uppercase">{!isEmpty(currentUser) ? currentUser.username : ""}</h1>
                    </header>
                    <div className="flex flex-col p-3 space-y-2 font-Lato" onClick={handleNav}>
                        <button className={`flex w-full h-12 p-1 hover:p-5 rounded-lg items-center bg-slate-200 cursor-pointer duration-100`}
                        id="informations"
                        >
                            <h1 className="text-xl sm:text-lg whitespace-nowrap">- Mes informations</h1>
                        </button>

                        <button className={`flex w-full h-12 p-1 hover:p-5 rounded-lg items-center bg-slate-200 cursor-pointer duration-100`} id="productOnSell">
                            <h1 className="text-xl sm:text-lg whitespace-nowrap">- Produits en ventes</h1>
                        </button>
                        <button className={`flex justify-between w-full h-12 p-1 hover:p-5 rounded-lg space-x-1 items-center bg-slate-200 cursor-pointer duration-100`} id="purshases">
                            <h1 className="text-xl sm:text-lg whitespace-nowrap">- Mes achats</h1>
                            <i className="text-yellow-800 sm:text-[0.6rem] text-sm md:text-sm opacity-85 bg-yellow-200 px-1 py-[1px] rounded-full whitespace-nowrap duration-200">
                              En développement
                            </i>
                        </button>
                        <button className={`flex w-full h-12 p-1 hover:p-5 rounded-lg items-center bg-slate-200 cursor-pointer duration-100`} id="like">
                            <h1 className="text-xl sm:text-lg whitespace-nowrap">- Mes coups de coeur</h1>
                        </button>
                        <button className={`flex w-full h-12 p-1 hover:p-5 rounded-lg items-center bg-slate-200 cursor-pointer duration-100`} id="about">
                            <h1 className="text-xl sm:text-lg whitespace-nowrap">- A propos</h1>
                        </button>
                    </div>
                </aside>
                {informationNav ? <Information /> : ""} 
                {productOnSellNav ? <ProductOnSell /> : ""} 
                {purshaseNav ? <Purshases /> : ""} 
                {aboutNav ? <About /> : ""}
                {productLike ? <LikedProduct /> : ""}
            </section> : null }
            {userIsLogged ? <Footer /> : null}
        </>
    )
}