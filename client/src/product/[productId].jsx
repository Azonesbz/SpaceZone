import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductId() {
  const [product, setProduct] = useState([])
  const {id} = useParams()
  const [isOverflowVisible, setIsOverflowVisible] = useState(false);

  
  useEffect(() => {
    fetch(`http://localhost:3001/product/${id}`)
    .then(async res => await res.json())
    .then(data => {
        console.log(data.product[0].description.length)
        setProduct(data.product)
    })
}, [])

  const handleText = () => {
    setIsOverflowVisible(true);
  };
  const handleTextHide = () => {
    setIsOverflowVisible(false)
  }

    return (
      <>
        <Header />
        <section className='flex relative min-h-screen min-w-full'>
          
            {product.map(detail => {
              return(
                <div key={detail.id} className='grid grid-cols-6 p-10 min-h-screen'>
                    {/* Image of product */}
                    <div className='flex flex-col col-span-3'>
                      <h1 className='text-3xl font-raleway font-semibold'>{detail.name}</h1>
                      <i className='text-xl'>Vendu par <span className='text-indigo-900'>{detail.id_user}</span></i>
                      <img className='h-5/6 w-5/6' src='https://via.placeholder.com/550x550' alt='image du produit'/>
                    </div>

                    {/* Description of product */}
                    <div className={`flex flex-col col-span-3 duration-500 mt-10`}>
                            <div className={`flex flex-col mt-5 p-5 space-y-5 rounded-xl bg-slate-50 ${isOverflowVisible ? 'w-full' : 'w-1/3'} duration-500`}>
                                <h2 className='text-4xl font-kanit'>Description</h2>
                                <p className="flex text-clip rounded px-5 h-48 overflow-scroll
                                font-roboto font-medium text-lg">
                                    {detail.description}

                                </p>
                            </div>

                            <div className='flex flex-col justify-end h-full mt-2'>
                                <div className='flex items-center font-rajdhani font-bold'>
                                  <h2 className='text-4xl border-r-[1px] border-black mr-2 pr-2 h-10'>{detail.price}$</h2>
                                  <p className='text-lg'>Livraison à partir de 5$</p>
                                </div>

                                <div className='flex flex-end font-rajdhani font-bold mt-5'>
                                  <button className='py-2 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-800 text-white font-karla shadow shadow-blue-800'>Acheter immédiatement</button>
                                  <button className='py-2 px-5 rounded-xl border border-blue-600 text-black font-karla shadow-sm shadow-blue-800 ml-5'>Ajouter au panier</button>
                                </div>
                            </div>
                    </div>
                </div>
              )
            })}
        </section>
        <div className="bg-gradient-to-b from-transparent to-gray-950 h-4"></div>
        <section className='bg-gray-950 px-24 py-10 text-white'>
            <div className='flex flex-col col-span-1'>
                <h1 className='text-white text-3xl'>
                  Critères
                </h1>
                <div className='grid grid-cols-12 h-full justify-center mt-5 gap-10'>
                  {/* Catégorie */}
                    <div className='col-span-4 flex items-center'>
                        <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                          <path d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 0 0 2.864 0l4.834-4.834a2.023 2.023 0 0 0 0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3v0Z"></path>
                        </svg>
                        <h2 className='flex flex-col text-lg ml-5 text-slate-500'>Catégorie: <span className='text-slate-50 text-xl'>Vêtements</span></h2>
                    </div>
                  {/* Taille */}
                    <div className='col-span-4 flex items-center'>
                        <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                          <path d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 0 0 2.864 0l4.834-4.834a2.023 2.023 0 0 0 0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3v0Z"></path>
                        </svg>
                        <h2 className='flex flex-col text-lg ml-5 text-slate-500'>Catégorie: <span className='text-slate-50 text-xl'>Vêtements</span></h2>
                    </div>
                    <div className='col-span-4 flex items-center'>
                        <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                          <path d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 0 0 2.864 0l4.834-4.834a2.023 2.023 0 0 0 0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3v0Z"></path>
                        </svg>
                        <h2 className='flex flex-col text-lg ml-5 text-slate-500'>Catégorie: <span className='text-slate-50 text-xl'>Vêtements</span></h2>
                    </div>
                    <div className='col-span-4 flex items-center'>
                        <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                          <path d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 0 0 2.864 0l4.834-4.834a2.023 2.023 0 0 0 0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3v0Z"></path>
                        </svg>
                        <h2 className='flex flex-col text-lg ml-5 text-slate-500'>Catégorie: <span className='text-slate-50 text-xl'>Vêtements</span></h2>
                    </div>
                    <div className='col-span-4 flex items-center'>
                        <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                          <path d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 0 0 2.864 0l4.834-4.834a2.023 2.023 0 0 0 0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3v0Z"></path>
                        </svg>
                        <h2 className='flex flex-col text-lg ml-5 text-slate-500'>Catégorie: <span className='text-slate-50 text-xl'>Vêtements</span></h2>
                    </div>
                    <div className='col-span-4 flex items-center'>
                        <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                          <path d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 0 0 2.864 0l4.834-4.834a2.023 2.023 0 0 0 0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3v0Z"></path>
                        </svg>
                        <h2 className='flex flex-col text-lg ml-5 text-slate-500'>Catégorie: <span className='text-slate-50 text-xl'>Vêtements</span></h2>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
      </>
    )
  }