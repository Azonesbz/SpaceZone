import { useState } from "react";
import Header from "../components/Navbar";
import Information from "../components/ProfilNavigation/Information";
import ProductOnSell from "../components/ProfilNavigation/ProductOnSell";
import Purshases from "../components/ProfilNavigation/Purshases";
import About from "../components/ProfilNavigation/About";
import { useSelector } from "react-redux";

export default function Profil(){


    const currentUser = useSelector((state) => state.currentUserReducer)
    const [aboutNav, setAboutNav] = useState(false)
    const [purshaseNav, setPurshaseNav] = useState(false)
    const [informationNav, setInformationNav] = useState(true)
    const [productOnSellNav, setProductOnSellNav] = useState(false)

    const handleNav = (e) => {
        let parent = e.target;
        for (let i = 0; i < 5; i++) {
          if (parent.id === "informations") {
            setAboutNav(false);
            setPurshaseNav(false);
            setInformationNav(true);
            setProductOnSellNav(false);
            break;
          } else if (parent.id === "productOnSell") {
            setAboutNav(false);
            setPurshaseNav(false);
            setInformationNav(false);
            setProductOnSellNav(true);
            break;
          } else if (parent.id === "purshases") {
            setAboutNav(false);
            setPurshaseNav(true);
            setInformationNav(false);
            setProductOnSellNav(false);
            break;
          } else if (parent.id === "about") {
            setAboutNav(true);
            setPurshaseNav(false);
            setInformationNav(false);
            setProductOnSellNav(false);
            break;
          } else {
            parent = parent.parentNode;
          }
        }
      };

    return (
        <>
            <Header />
            <section className="flex items-center justify-center p-10 px-40">
                <aside className="bg-gradient-to-br from-slate-400 to-neutral-400 w-2/6 h-full m-5 text-black shadow rounded-xl">
                    <header className="flex flex-col items-center bg-gradient-to-tl from-slate-200 to-slate-300 p-5 rounded-t-xl">
                        <img src="profil.jpg" alt="image de profil" className="rounded-full" height={150} width={150}/>
                        <h1 className="mt-3 text-2xl text-center font-semibold font-raleway first-letter:uppercase">{currentUser.user_id}</h1>
                    </header>
                    <div className="flex flex-col p-3 space-y-2" onClick={handleNav}>
                        <button className="flex w-full h-12 p-3 hover:p-5 rounded items-center bg-slate-200 cursor-pointer duration-100"
                        id="informations"
                        >
                            <h1 className="text-xl font-thin font-ubuntu">- Mes informations</h1>
                        </button>

                        <button className="flex w-full h-12 p-3 hover:p-5 rounded items-center bg-slate-200 cursor-pointer duration-100" id="productOnSell">
                            <h1 className="text-xl font-thin font-ubuntu">- Produits en ventes</h1>
                        </button>
                        <button className="flex w-full h-12 p-3 hover:p-5 rounded items-center bg-slate-200 cursor-pointer duration-100" id="purshases">
                            <h1 className="text-xl font-thin font-ubuntu">- Mes achats</h1>
                        </button>
                        <button className="flex w-full h-12 p-3 hover:p-5 rounded items-center bg-slate-200 cursor-pointer duration-100" id="about">
                            <h1 className="text-xl font-thin font-ubuntu">- A propos</h1>
                        </button>
                    </div>
                </aside>
                {informationNav ? <Information /> : ""} 
                {productOnSellNav ? <ProductOnSell /> : ""} 
                {purshaseNav ? <Purshases /> : ""} 
                {aboutNav ? <About /> : ""} 
            </section>
        </>
    )
}