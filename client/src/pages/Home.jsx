import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Search from '../components/Search'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import Pagination from '../components/Pagination'
import { useState } from 'react'
import { useRef } from 'react'

export default function Home({session}) {

  const [page, setPage] = useState(1)
  const hiddenElementsRef = useRef();

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

          <div className='top-20 flex flex-col container md:flex-row lg:px-20 relative justify-center gap-5 elementHidden'>

            <section className='flex flex-col w-full'>

              <div className='grid grid-cols-6 gap-3 mt-5'>
                  <Cards page={page} />
              </div>
              <Pagination setPage={setPage} />
            </section>
          </div>
          <Footer />
        </div>
      </>
    )
}