import React from 'react'
import Header from './components/Navbar'
import Search from './components/Search'
import Cards from './components/Cards'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
      <>
        <Header />
        <div className='flex flex-col-reverse md:flex-row relative min-h-screen min-w-screen justify-center bg-gradient-to-r from-neutral-100 to-neutral-300 p-5 gap-5'>

          <section className='flex flex-col w-full md:w-5/6'>
            <div className='flex justify-between items-center'>
              <Search />
              <div className='flex items-center whitespace-nowrap bg-gradient-to-br from-cyan-700 to-blue-800 px-2 py-1 rounded active:scale-95'>
                  <svg className="text-white" width="35" height="35" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                  <Link to="/product/new" className='font-karla text-md ml-2 text-white'>Ajouter un produit</Link>
              </div>
            </div>
            <div className='grid grid-cols-6 gap-3 mt-5 order-last'>
                <Cards />
            </div>
          </section>
        </div>
        <Footer />
      </>
    )
}