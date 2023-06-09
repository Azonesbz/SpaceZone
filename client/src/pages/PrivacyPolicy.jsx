import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function PrivacyPolicy(){
    return (
        <>
            <Navbar />
            <div className="flex font-Lato">

                <aside className="hidden md:flex flex-col w-2/12 bg-neutral-900 mt-20 p-5">
                    <ul className="sticky top-28 flex flex-col space-y-2 text-slate-200">
                        <li 
                        className="hover:text-indigo-600 cursor-pointer" 
                        id=""
                        >
                            <h2>Informations générales</h2>
                        </li>
                        <li 
                        className="hover:text-indigo-600 cursor-pointer"
                        id=""
                        >
                            <h2>Collecte d'informations personnelles</h2>
                        </li>
                        <li 
                        className="hover:text-indigo-600 cursor-pointer"
                        id=""
                        >
                            <h2>Utilisation des informations personnelles</h2>
                        </li>
                        <li 
                        className="hover:text-indigo-600 cursor-pointer"
                        id=""
                        >
                            <h2>Partage d'informations personnelles</h2>
                        </li>
                        <li 
                        className="hover:text-indigo-600 cursor-pointer"
                        id=""
                        >
                            <h2>Protection des informations personnelles</h2>
                        </li>
                        <li 
                        className="hover:text-indigo-600 cursor-pointer"
                        id=""
                        >
                            <h2>Cookies et technologies similaires</h2>
                        </li>
                        <li 
                        className="hover:text-indigo-600 cursor-pointer"
                        id=""
                        >
                            <h2>Modification de la politique de confidentialité</h2>
                        </li>
                        <li 
                        className="hover:text-indigo-600 cursor-pointer"
                        id=""
                        >
                            <h2>Contactez-nous</h2>
                        </li>
                    </ul>
                </aside>
                <section className=" flex flex-col space-y-10 container sm:mt-20 md:mt-28 mt-20 text-xl p-5 sm:p-10">
                    
                    <h1 className="text-5xl text-center">Politique de confidentialité</h1>


                    <div className="flex flex-col space-y-2">
                        <h1 className="text-3xl font-semibold">Informations générales</h1>
                        <p className="">Notre entreprise s'engage à protéger la vie privée de nos clients. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations personnelles.</p>
                    </div>


                    <div className="flex flex-col" id="personnal-information">
                        <div className="flex space-x-5 items-center">
                            <i className="text-3xl">1.0</i>
                            <h1 className="text-3xl font-semibold">Collecte d'informations personnelles</h1>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <p>Nous collectons des informations personnelles lorsque vous effectuez un achat sur notre site web, créez un compte client, remplissez des formulaires de contact ou nous contactez par e-mail ou par téléphone. Les informations personnelles que nous collectons peuvent inclure votre nom, adresse e-mail, adresse postale, numéro de téléphone, informations de paiement, historique d'achat et préférences de produits.</p>
                            <p></p>
                        </div>
                    </div>


                    <div className="" id="personnal-information">
                        <div className="flex space-x-5 items-center">
                            <i className="text-3xl">1.1</i>
                            <h1 className="text-3xl font-semibold">Utilisation des informations personnelles</h1>
                        </div>
                        <h1>Collecte d'informations personnelles</h1>
                        <div className="flex flex-col space-y-5">
                            <p>
                                Nous utilisons vos informations personnelles pour traiter vos commandes, livrer vos produits,
                                 communiquer avec vous au sujet de vos commandes et vous fournir un service clientèle efficace.
                            </p>
                            <p>Nous pouvons également utiliser vos informations personnelles pour personnaliser votre expérience d'achat
                                 sur notre site web, vous envoyer des offres promotionnelles ou des newsletters, et pour améliorer la qualité de notre site web.
                            </p>
                        </div>
                    </div>


                    <div className="" id="1.2">
                        <div className="flex space-x-5 items-center">
                            <i className="text-3xl">1.2</i>
                            <h1 className="text-3xl font-semibold">Partage d'informations personnelles</h1>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <p>
                                Nous utilisons vos informations personnelles pour traiter vos commandes, livrer vos produits,
                                 communiquer avec vous au sujet de vos commandes et 
                                 vous fournir un service clientèle efficace.
                            </p>
                            <p>
                                Nous pouvons également utiliser vos informations personnelles pour personnaliser votre expérience d'achat sur notre site web,
                                 vous envoyer des offres promotionnelles ou des newsletters, et pour améliorer la qualité de notre site web.
                            </p>
                        </div>
                    </div>


                    <div className="" id="1.3">
                        <div className="flex space-x-5 items-center">
                            <i className="text-3xl">1.3</i>
                            <h1 className="text-3xl font-semibold">Protection des informations personnelles</h1>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <p>
                                Nous ne vendons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager 
                                vos informations personnelles avec des tiers tels que des prestataires de services tiers pour le traitement 
                                des paiements et la livraison de produits.
                            </p>

                            <p>
                                Nous pouvons également divulguer vos informations personnelles si la loi l'exige ou si cela 
                                est nécessaire pour protéger nos droits ou notre propriété.
                            </p>
                        </div>
                    </div>
                    
                    <div className="" id="1.4">
                        <div className="flex space-x-5 items-center">
                            <i className="text-3xl">1.4</i>
                            <h1 className="text-3xl font-semibold">Partage d'informations personnelles</h1>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <p>
                                Nous prenons des mesures de sécurité raisonnables pour protéger vos informations personnelles contre la perte, 
                                le vol, l'utilisation abusive, l'accès non autorisé, la divulgation, l'altération et la destruction.
                            </p>
                            <p>
                                Nous utilisons des mesures de sécurité techniques et organisationnelles pour protéger vos informations personnelles, 
                                telles que des pare-feu, des protocoles SSL et des accès restreints aux informations personnelles.
                            </p>
                        </div>
                    </div>


                    <div className="" id="2.0">
                        <div className="flex space-x-5 items-center">
                            <i className="text-3xl">2.0</i>
                            <h1 className="text-3xl font-semibold">Cookies et technologies similaires</h1>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <p>
                                Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience 
                                d'achat sur notre site web, suivre l'utilisation de notre site web et analyser les tendances d'utilisation. 
                            </p>
                            <p>
                                Vous pouvez modifier les paramètres de votre navigateur pour désactiver les cookies, 
                                mais cela peut affecter certaines fonctionnalités de notre site web.
                            </p>
                        </div>
                    </div>
                    <div className="" id="2.1">
                        <div className="flex space-x-5 items-center">
                            <i className="text-3xl">2.1</i>
                            <h1 className="text-3xl font-semibold">Modification de la politique de confidentialité</h1>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <p>
                                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                                Les modifications apportées seront affichées sur cette page. 
                            </p>
                            <p>
                                Nous vous encourageons à consulter cette page régulièrement pour prendre connaissance des modifications
                                apportées à notre politique de confidentialité.
                            </p>
                        </div>
                    </div>
                    
                </section>
            </div>
            <Footer />
        </>
    )
}