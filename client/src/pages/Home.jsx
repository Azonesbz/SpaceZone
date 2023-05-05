import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Search from '../components/Search'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import Pagination from '../components/Pagination'
import { useState } from 'react'
import Filter from '../components/Filter'

export default function Home({session}) {

  const [page, setPage] = useState(1)

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

            <section className='mt-32 flex flex-col container relative justify-center gap-5 elementHidden' id='product'>
              <div className='flex flex-col text-center items-center justify-center p-5'>
                <h1 className='text-5xl font-Lato text-center whitespace-nowrap'>Notre catalogue</h1>
                <p className='text-xl font-SourceSansPro mt-5'>Naviguez à travers notre sélection de produit vendu par la communauté ! Vous pouvez rechercher un produit sous différente catégorie de produit.</p>
              </div>
              <div>
                  <Filter />
              </div>
              <div className='grid grid-cols-6 gap-3 mt-5' >
                  <Cards page={page}  />
              </div>
              <Pagination setPage={setPage} />
            </section>
          <Footer />
        </div>
      </>
    )
}