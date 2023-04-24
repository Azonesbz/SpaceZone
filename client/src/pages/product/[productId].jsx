import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../components/Utils';
import mondialRelay from '/LogoMondialRelay.png'
import ups from '/ups.svg'
import fedex from '/fedex-express-6.svg'
import { addProductCart } from '../../actions/cart.action';
import Counter from '../../components/Counter';
import { getProductById } from '../../actions/product.action';

export default function ProductId() {
  const [value, setValue] = useState(1)
  const {id} = useParams()
  const allProduct = useSelector((state) => state.productReducer.productId)
  const currentUser = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductById(id))
  }, []);
  let data;
  let handleCart = async () => {
    const product = allProduct.filter(productId => productId.id)
    data = {
        user_id: currentUser.id,
        id: id,
        quantity: JSON.stringify(value),
        price: product[0].price * value
    }
      dispatch(addProductCart(data))
  }

    return (
      <>
        <Header />
        <section className='flex relative min-h-screen min-w-full'>
          {!isEmpty(allProduct) && allProduct.map(productId => (
            <div key={productId.id} className='grid grid-cols-6 p-10 min-h-screen'>
              {/* Image of product */}
              <div className='flex flex-col col-span-3'>
                <h1 className='text-3xl font-raleway font-semibold'>{productId.name}</h1>
                <i className='text-xl'>Vendu par <span className='text-indigo-900'>{productId.username}</span></i>
                <img className='h-5/6 w-5/6' src='https://via.placeholder.com/550x550' alt='image du produit' />
              </div>

              {/* Description of product */}
              <div className={`flex flex-col col-span-3 duration-500 mt-10`}>
                <div className={`flex flex-col p-5 space-y-5 rounded-xl bg-slate-50 duration-500`}>
                  <h2 className='text-4xl font-kanit'>A propos de cet article</h2>
                  <p className="flex text-clip scrollbar rounded  overflow-scroll font-roboto font-medium text-lg">
                    {productId.description}
                  </p>
                </div>

                <div className='flex flex-col h-full mt-5'>
                  <div className='flex items-center justify-between font-rajdhani font-bold box-content'>
                    <div className='flex items-center w-full'>
                        <h2 className='text-4xl border-r-[1px] border-black mr-2 pr-2 h-10'>{productId.price * value}$</h2>
                        <p className='text-lg'>Livraison à partir de 5$</p>
                    </div>
                    <div className='flex items-center'>
                        <h3 className='mr-3'>Quantité:</h3>
                        <Counter value={value} setValue={setValue} />
                    </div>
                  </div>

                  <div className='flex font-rajdhani font-bold mt-2'>
                    <button className='py-2 px-5 rounded-xl bg-neutral-900 text-white font-karla shadow-md'>Acheter immédiatement</button>
                    <button className='py-2 px-5 rounded-xl border border-neutral-900 text-black font-karla shadow-md ml-5' onClick={handleCart}>Ajouter au panier</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="bg-gradient-to-b from-transparent to-gray-950 h-1"></div>
        <section className='bg-gray-950 px-24 py-10 text-white'>
            <div className='flex flex-col col-span-1'>
                <h1 className='text-white text-3xl'>
                  Critères
                </h1>
                <div className='grid grid-cols-12 h-full justify-center mt-5 gap-10'>
                  {/* Catégorie */}
                    <div className='col-span-4 flex items-center'>
                        <svg width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                          <path d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 0 0 2.864 0l4.834-4.834a2.023 2.023 0 0 0 0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3v0Z"></path>
                        </svg>
                        <h2 className='flex flex-col text-lg ml-5 text-slate-500'>Catégorie: <span className='text-slate-50 text-xl'>Vêtements</span></h2>
                    </div>
                  {/* Taille */}
                    <div className='col-span-4 flex items-center'>
                        <svg width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                          <path d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 0 0 2.864 0l4.834-4.834a2.023 2.023 0 0 0 0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3v0Z"></path>
                        </svg>
                        <h2 className='flex flex-col text-lg ml-5 text-slate-500'>Catégorie: <span className='text-slate-50 text-xl'>Vêtements</span></h2>
                    </div>
                </div>
            </div>
        </section>

        <div className="bg-gradient-to-b from-gray-950 to-transparent h-1"></div>

        <section className='px-24 py-10 text-gray-950'>
            <div className='flex flex-col w-3/4'>
                <h1 className='text-3xl font-rajdhani font-semibold'>La livraison</h1>
                <div>
                    <p className='text-xl font-raleway font-medium border-b-[1px] border-black w-full pb-5 mb-5'>
                      Recevez votre produit à domicile, nous nous engageons à vous garantir la meilleur livraison possible,<br /> et si vous n'êtes
                      pas satisfait, un remboursement vous sera du dans les meilleurs délais.
                      <br />
                      <br />
                      De plus, si le produit ne vous plaît pas, il est de notre devoir de vous rembourser l'intégralité de la somme sauf si et seulement si le produit est rendu en mauvaise état.
                    </p>
                </div>
                <div className='flex items-center'>
                    <div className='flex flex-col space-y-10 ml-5 w-full'>
                        <div className='flex items-center space-x-5'>
                            <h2 className='font-karla text-xl'>Mondial Relay</h2>
                            <img src={mondialRelay} alt='logo mondial relay' width={100} className='hover:scale-110 duration-200'/>
                            <div className='w-full h-[1px] bg-neutral-300'></div>
                            <span className='font-rajdhani text-xl font-semibold'>5.30$</span>
                        </div>
                        <div className='flex items-center space-x-5'>
                            <h2 className='text-center font-karla text-xl'>UPS</h2>
                            <img src={ups} alt='logo mondial relay' width={40} className='hover:scale-110 duration-200'/>
                            <div className='w-full h-[1px] bg-neutral-300'></div>
                            <span className='font-rajdhani text-xl font-semibold'>5.30$</span>
                        </div>
                        <div className='flex items-center space-x-5'>
                            <h2 className='text-center font-karla text-xl'>Fedex</h2>
                            <img src={fedex} alt='logo mondial relay' width={100} className='hover:scale-110 duration-200'/>
                            <div className='w-full h-[1px] bg-neutral-300'></div>
                            <span className='font-rajdhani text-xl font-semibold'>5.30$</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="bg-gradient-to-b from-slate-50 to-gray-950 h-1"></div>
        <Footer />
      </>
    )
  }