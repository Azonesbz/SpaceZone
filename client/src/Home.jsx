import React from 'react'
import Header from './components/Navbar'
import Search from './components/Search'
import Aside from './components/Aside'
import Cards from './components/Cards'
import ProductNav from './components/ProductNav'

export default function Home() {
    return (
      <>
        <Header />
        <div className='flex relative min-h-screen min-w-screen top-20 bg-gradient-to-r from-neutral-100 to-neutral-300 p-5 gap-5'>

          <section className='flex flex-col w-3/4'>
            <Search />

            <div className='grid grid-cols-6 gap-3 mt-5'>
                <Cards />
            </div>
            {/* <ProductNav /> */}

          </section>
          <Aside />
        </div>
      </>
    )
}