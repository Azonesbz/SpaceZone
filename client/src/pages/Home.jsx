import Header from '../components/Navbar'
import Search from '../components/Search'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import Pagination from '../components/Pagination'
import { useState } from 'react'

export default function Home({session}) {

  const [page, setPage] = useState(1)

    return (
      <>
        <Header session={session} />
        <div className='flex flex-col-reverse md:flex-row relative min-h-screen min-w-screen justify-center bg-gradient-to-r from-neutral-100 to-neutral-300 p-5 gap-5'>

          <section className='flex flex-col w-full xl:w-5/6'>
            <div className='flex justify-between items-center'>
              <Search />

              <Link to="/product/new" className='flex items-center font-karla text-md ml-2 text-white active:scale-95 duration-200'>
                  <svg className="text-black" width="35" height="35" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                  </svg>
                  <h2 className='whitespace-nowrap ml-2 text-black text-lg'>Ajouter un produit</h2>
              </Link>

            </div>
            <div className='grid grid-cols-6 gap-3 mt-5'>
                <Cards page={page} />
            </div>
            <Pagination setPage={setPage} />
          </section>
        </div>
        <Footer />
      </>
    )
}