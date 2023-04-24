import { useState } from "react";
import Header from "../components/Navbar";
import Information from "../components/ProfilNavigation/Information";
import ProductOnSell from "../components/ProfilNavigation/ProductOnSell";
import Purshases from "../components/ProfilNavigation/Purshases";
import About from "../components/ProfilNavigation/About";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Profil(){


    const currentUser = useSelector((state) => state.currentUserReducer)
    const [aboutNav, setAboutNav] = useState(false)
    const [purshaseNav, setPurshaseNav] = useState(false)
    const [informationNav, setInformationNav] = useState(true)
    const [productOnSellNav, setProductOnSellNav] = useState(false)

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
            <Header />
            <section className="grid grid-rows-3 grid-cols-12 gap-5 p-10 px-40">
                <aside className="sticky bg-gradient-to-br col-span-4 from-slate-400 to-neutral-400 text-black shadow rounded-xl row-span-3">
                    <header className="flex flex-col items-center bg-gradient-to-tl from-slate-200 to-slate-300 p-5 rounded-t-xl">
                        <img
                          src={`./uploads/profil/${currentUser.username}.jpg`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = './uploads/default.jpg';
                          }}
                          alt="image de profil"
                          className="rounded-full mt-5 h-48 w-48"
                        />
                        <h1 className="mt-3 text-2xl text-center font-semibold font-raleway first-letter:uppercase">{currentUser.username}</h1>
                    </header>
                    <div className="flex flex-col p-3 space-y-2" onClick={handleNav}>
                        <button className={`flex w-full h-12 p-3 hover:p-5 rounded items-center bg-slate-200 cursor-pointer duration-100 ${informationNav ? "border-[2px] border-neutral-900" : ""}`}
                        id="informations"
                        >
                            <h1 className="text-xl font-thin font-ubuntu">- Mes informations</h1>
                        </button>

                        <button className={`flex w-full h-12 p-3 hover:p-5 rounded items-center bg-slate-200 cursor-pointer duration-100 ${productOnSellNav ? "border-[2px] border-neutral-900" : ""}`} id="productOnSell">
                            <h1 className="text-xl font-thin font-ubuntu">- Produits en ventes</h1>
                        </button>
                        <button className={`flex w-full h-12 p-3 hover:p-5 rounded items-center bg-slate-200 cursor-pointer duration-100 ${purshaseNav ? "border-[2px] border-neutral-900" : ""}`} id="purshases">
                            <h1 className="text-xl font-thin font-ubuntu">- Mes achats</h1>
                        </button>
                        <button className={`flex w-full h-12 p-3 hover:p-5 rounded items-center bg-slate-200 cursor-pointer duration-100 ${aboutNav ? "border-[2px] border-neutral-900" : ""}`} id="about">
                            <h1 className="text-xl font-thin font-ubuntu">- A propos</h1>
                        </button>
                        <button className={`flex w-full h-12 p-3 hover:p-5 rounded items-center bg-slate-200 cursor-pointer duration-100 ${aboutNav ? "border-[2px] border-neutral-900" : ""}`} id="about">
                            <h1 className="text-xl font-thin font-ubuntu">- Mes coups de coeur</h1>
                        </button>
                    </div>
                </aside>
                {informationNav ? <Information /> : ""} 
                {productOnSellNav ? <ProductOnSell /> : ""} 
                {purshaseNav ? <Purshases /> : ""} 
                {aboutNav ? <About /> : ""} 
            </section>
            <Footer />
        </>
    )
}