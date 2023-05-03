export default function ChooseUs(){
    return(
        <>
            <section className="flex flex-col  text-white py-10 container">
                    <h1 className="text-center p-8 font-karla text-3xl">Nos engagements envers nos clients</h1>
                    <div className="grid grid-cols-6 border-t w-5/6 mx-auto border-white">
                        <div className="p-5 col-span-6 sm:col-span-2">
                            <svg 
                            className="mx-auto"
                            width="50" 
                            height="50" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                                <path d="M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                                <path d="M13 6h5l3 5v6h-2"></path>
                                <path d="M5 17H3V6a1 1 0 0 1 1-1h9v12"></path>
                                <path d="M9 17h6"></path>
                                <path d="M21 11h-8"></path>
                            </svg>
                            <h2 className="text-center p-3 text-xl uppercase font-kanit">La livraison</h2>
                            <p className="text-center font-raleway">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptas dolorum eligendi iure id at sint 
                                excepturi minima quas, suscipit rerum sunt? Illum, eaque, perspiciatis, molestias modi cupiditate aperiam quos 
                                aliquid obcaecati odio repudiandae tempora at consequatur doloribus dolorum iste? Necessitatibus, error possimus 
                                libero consectetur architecto maxime hic eius autem.
                            </p>
                        </div>
                        <div className="p-5 col-span-6 sm:col-span-2">
                            <svg
                            className="mx-auto"
                            width="50" 
                            height="50" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            <h2 className="text-center p-3 text-xl uppercase font-kanit">La qualité</h2>
                            <p className="text-center font-raleway">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptas dolorum eligendi iure id at sint 
                                excepturi minima quas, suscipit rerum sunt? Illum, eaque, perspiciatis, molestias modi cupiditate aperiam quos 
                                aliquid obcaecati odio repudiandae tempora at consequatur doloribus dolorum iste? Necessitatibus, error possimus 
                                libero consectetur architecto maxime hic eius autem.
                            </p>
                        </div>
                        <div className="p-5 col-span-6 sm:col-span-2">
                            <svg 
                            className="mx-auto" 
                            width="50" 
                            height="50" 
                            fill="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M18.469 22.5a.75.75 0 0 1-.44-.14L12 17.99l-6.029 4.37a.75.75 0 0 1-1.15-.847l2.35-6.965-6.093-4.178A.75.75 0 0 1 1.5 9h7.518l2.268-6.981a.75.75 0 0 1 1.427 0l2.27 6.984H22.5a.75.75 0 0 1 .424 1.369l-6.096 4.176 2.35 6.963a.75.75 0 0 1-.71.99Z"></path>
                            </svg>
                            <h2 className="text-center p-3 text-xl uppercase font-kanit">Le service</h2>
                            <p className="text-center font-raleway">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptas dolorum eligendi iure id at sint 
                                excepturi minima quas, suscipit rerum sunt? Illum, eaque, perspiciatis, molestias modi cupiditate aperiam quos 
                                aliquid obcaecati odio repudiandae tempora at consequatur doloribus dolorum iste? Necessitatibus, error possimus 
                                libero consectetur architecto maxime hic eius autem.
                            </p>
                        </div>
                    </div>
                </section>
        </>
    )
}