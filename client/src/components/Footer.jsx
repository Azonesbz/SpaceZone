export default function Footer(){
    return (
        <>
            <footer className="flex flex-col">
                <section className="flex flex-col bg-gray-950 text-white py-10">
                    <h1 className="text-center p-8 font-karla text-3xl">Pourquoi nous faire confiance ?</h1>
                    <div className="flex border-t w-5/6 mx-auto border-white">
                        <div className="p-5">
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
                        <div className="p-5">
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
                        <div className="p-5">
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
                <div className="bg-gradient-to-b from-gray-950 via-gray-950 to-black h-8"></div>
                <section className="flex flex-col bg-black h-60 text-white">
                    <div className="flex justify-center space-x-24 p-10 font-karla text-2xl">
                        <h1>A propos</h1>
                        <h1>SpaceZone</h1>
                        <div className="flex flex-col space-y-5">
                            <h1>
                                Réseau Sociaux
                            </h1>
                            <div className="flex space-x-5">
                                <svg className="hover:scale-110" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Z"></path>
                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                                    <path d="M16.5 7.5v.001"></path>
                                </svg>
                                <svg className="hover:scale-110" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 4.009c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.322 12 7.999v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c-.002-.249 1.51-2.772 1.818-4.013v.001Z"></path>
                                </svg>
                                <svg className="hover:scale-110" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21h6Z"></path>
                                    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3"></path>
                                </svg>
                                <svg className="hover:scale-110" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 5H7a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4Z"></path>
                                    <path d="m10 9 5 3-5 3V9Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </section>
            </footer>
        </>
    )
}