import React from 'react'
import Header from './components/Navbar'
import Search from './components/Search'
import Cards from './components/Cards'
import Footer from './components/Footer'


export default function Home() {
    return (
      <>
        <Header />
        <div className='flex flex-col-reverse md:flex-row relative min-h-screen min-w-screen justify-center bg-gradient-to-r from-neutral-100 to-neutral-300 p-5 gap-5'>

          <section className='flex flex-col w-full md:w-5/6'>
            <Search />
            <div className='grid grid-cols-6 gap-3 mt-5 order-last'>
                <Cards />
            </div>
          </section>
        </div>
        <Footer />
      </>
    )
}