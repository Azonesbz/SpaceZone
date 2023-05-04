import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <footer className="flex flex-col bg-gray-950 mt-5">
                <section className="flex flex-col items-center bg-black text-white min-h-full">
                    <div className="grid grid-cols-6 justify-between items-center py-10 font-karla">
                        <div className="flex flex-col col-span-6 lg:col-span-2">
                            <h1 className='text-center text-2xl'>
                                SpaceZone
                            </h1>
                            <ul className="flex flex-col gap-2 items-center justify-center uppercase text-sm mt-5">
                                <li><Link to="/privacy-policy">Politique de protection de la vie privée</Link></li>
                                <li><Link to="/product/new">Commencer à vendre avec spacezone</Link></li>
                            </ul>
                        </div>


                        <div className="flex flex-col col-span-6 lg:col-span-2">
                            <h1 className="text-center text-2xl">
                                Support
                            </h1>
                            <ul className="flex flex-col gap-2 items-center justify-center uppercase text-sm mt-5">
                                <li><Link to="">Centre d'assistance</Link></li>
                                <li><Link to="">Blog</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col col-span-6 lg:col-span-2">
                            <h1 className="text-center text-2xl">
                                Nous retrouver
                            </h1>
                            <ul className="flex items-center justify-center space-x-5 mt-5">
                                {/* INSTRAGRAM */}
                                <li>
                                    <Link>
                                        <svg className="hover:scale-110" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Z"></path>
                                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                                            <path d="M16.5 7.5v.001"></path>
                                        </svg>
                                    </Link>
                                </li>
                                {/* TWITTER */}
                                <li>
                                    <Link>
                                        <svg className="hover:scale-110" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 4.009c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.322 12 7.999v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c-.002-.249 1.51-2.772 1.818-4.013v.001Z"></path>
                                        </svg>
                                    </Link>
                                </li>
                                {/* GITHUB */}
                                <li>
                                    <Link>
                                        <svg className="hover:scale-110" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21h6Z"></path>
                                            <path d="M9 19c-4.3 1.4-4.3-2.5-6-3"></path>
                                        </svg>
                                    </Link>
                                </li>
                                {/* YOUTUBE */}
                                <li>
                                    <Link>
                                        <svg className="hover:scale-110" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 5H7a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4Z"></path>
                                            <path d="m10 9 5 3-5 3V9Z"></path>
                                        </svg>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <footer className="py-5">
                        <h3 className="text-gray-400">Copyright © 2023 Azones Inc.</h3>
                    </footer>
                </section>
            </footer>
        </>
    )
}