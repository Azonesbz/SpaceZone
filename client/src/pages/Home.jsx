import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import React, { useEffect } from 'react'
import Pagination from '../components/Pagination'
import { useState } from 'react'
import Filter from '../components/Filter'
import Modal from '../components/modal/Modal'

function Error({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} width={'w-full'} height={'h-72'}>
        <div className='h-full w-full flex flex-col items-center justify-center p-10'>
          <div className='flex flex-col items-center'>
            <svg className='text-red-700' width="100" height="100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 15h2v2h-2v-2Zm0-8h2v6h-2V7Zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z"></path>
            </svg>
            <h1 className='text-center font-Lato text-xl font-bold'>Vous devez renseignez un ou plusieurs paramètre avant de lancer une recherche avec un filtre.</h1>
          </div>
          <button 
          className='bg-blue-700 text-xl rounded-full py-1 px-3 mt-2'
          onClick={onClose}
          >
            Ok !
          </button>
        </div>
      </Modal>
    </>
  )
}

export default function Home({ session }) {

  const [page, setPage] = useState(1)
  const [errorFilter, setErrorFilter] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('elementShow');
        } else {
          entry.target.classList.remove('elementShow');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.elementHidden');

    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div className='absolute inset-0'>

        <Header session={session} />

        <section className='mt-32 flex flex-col container relative justify-center gap-5' id='product'>
          <div className='flex flex-col text-center items-center justify-center p-5'>
            <h1 className='text-5xl font-Lato text-center whitespace-nowrap elementHidden'>Notre catalogue</h1>
            <p className='text-xl font-SourceSansPro mt-5 elementHidden'>Naviguez à travers notre sélection de produit vendu par la communauté ! Vous pouvez rechercher un produit sous différente catégorie de produit.</p>
          </div>
          <div className='elementHidden'>
            <Filter setErrorFilter={setErrorFilter} />
          </div>
          <div className='grid grid-cols-6 gap-3 mt-5 elementHidden' >
            <Cards page={page} />
          </div>
          <Pagination setPage={setPage} />
        </section>
        <Footer />
      </div>
      {errorFilter ? <Error isOpen={errorFilter} onClose={() => setErrorFilter(false)} /> : null}
    </>
  )
}