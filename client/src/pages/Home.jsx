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
        <div className='flex flex-col-reverse container md:flex-row relative min-h-screen min-w-screen justify-center gap-5'>

          <section className='flex flex-col w-full'>
            <Search />
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