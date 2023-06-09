import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import StripeCheckout from 'react-stripe-checkout'
import { payNowWithCard } from '../../actions/payement.action';
import Confetti from 'react-confetti'
import Carousel from '../../components/carousel/Carousel'

export default function ProductId() {
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  const publishKey = "pk_test_51N0C7gCSNhox8wvTlRTdCCNg7A0IK9bOd3MNPIRXPNOWNe98vQpfa4AJtmlIiYTiZ0UNi3GWBMsDlXHzztaay5cZ00vlIgtEA9"
  const [value, setValue] = useState(1)
  const { id } = useParams()
  const productId = useSelector((state) => state.productReducer.productId)
  const currentUser = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [payementValid, setPaymentValid] = useState(false)
  useEffect(() => {
    dispatch(getProductById(id))
  }, []);
  let data;
  let handleCart = async () => {
    data = {
      user_id: currentUser.user.id,
      id: id,
      quantity: JSON.stringify(value),
      price: productId.price * value
    }
    dispatch(addProductCart(data))
  }

  return (
    <>
      <Header />
      <div className='flex flex-col gap-10 container mt-20'>

        <section className='flex relative min-w-full container items-center mt-28 flex-col sm:flex-row'>
            <div className='grid grid-cols-12 items-center w-full'>
              <div className='col-span-12 lg:col-span-4 h-full'>
                <Carousel autoSlide={false}>
                  {!isEmpty(productId) && JSON.parse(productId.url_image).map((image, index) => {
                    return (
                      <img key={index} src={`../uploads/product/${image}`} alt="product image" className="min-w-full object-contain object-center" />
                    )
                  }
                  )}
                </Carousel>
              </div>
              <div className={`col-span-12 lg:col-span-8 flex flex-col justify-between mt-5 sm:mt-0 p-5 sm:p-10 md:p-14 bg-slate-50 duration-500 font-Lato h-full shadow`}>
                <div className='flex flex-col space-y-2'>
                  <h1 className='text-5xl p-3 sm:text-5xl'>{!isEmpty(productId) && productId.title}</h1>
                  <div className='flex flex-col'>
                    <h2 className='text-4xl px-2 sm:rounded'>A propos de cet article</h2>
                    <p className="font-medium text-xl h-full overflow-auto font-SourceSansPro mt-5 px-2 sm:p-5">
                      {!isEmpty(productId) && productId.description}
                    </p>
                  </div>
                </div>
              

                <div className='flex flex-col h-full mt-5 justify-end space-y-5'>
                  <div className='flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-start sm:items-center justify-between font-Lato font-bold box-content'>
                    <div className='flex items-center w-full'>
                      <h2 className='text-4xl border-r-[1px] border-black mr-2 pr-2 h-10'>{!isEmpty(productId) && productId.price * value}$</h2>
                      <p className='text-lg'>Livraison à partir de 5$</p>
                    </div>
                    <div className='flex items-center'>
                      <h3 className='mr-3 text-2xl'>Quantité:</h3>
                      <Counter value={value} setValue={setValue} />
                    </div>
                  </div>

                  <div className='flex items-center font-rajdhani font-bold mt-2 w-full'>
                    <StripeCheckout
                      stripeKey={publishKey}
                      name='SpaceZone'
                      description={!isEmpty(productId) && productId.title + ' | A vendre par ' + productId.username}
                      amount={(!isEmpty(productId) && productId.price * value) * 100}
                      locale='auto'
                      currency='eur'
                      billingAddress={true}
                      zipCode={true}
                      token={(token) => {
                        let data = {
                          amount: productId.price * 100,
                          token
                        }
                        dispatch(payNowWithCard(data)).then(res => {
                          if (res.status === 200) {
                            setPaymentValid(true)
                            const timerConfetti = setInterval(() => {
                              setPaymentValid(false)
                              clearInterval(timerConfetti)
                              navigate('/home')
                            }, 5000) 
                            timerConfetti()
                          }
                        })
                      }}
                      stripeOptions={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#fff',
                            backgroundColor: '#4285f4',
                            '::placeholder': {
                              color: '#87bbfd',
                            },
                          },
                          invalid: {
                            color: '#dc3545',
                          },
                        },
                        className: 'flex items-center',
                      }}
                    >
                      <button 
                      className='font-Lato text-slate-200 bg-neutral-900 py-2 rounded-xl px-5'
                      >
                        Acheter maintenant
                      </button>
                    </StripeCheckout>
                    <button 
                    className='py-2 px-5 rounded-xl border border-neutral-900 text-black font-Lato shadow-md ml-5' 
                    onClick={handleCart}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                  <h2>Vendu par {!isEmpty(productId) && productId.username}</h2>
                </div>
              </div>
            </div>
        </section>

        <section className='bg-white px-10 py-10 w-full shadow'>
          <div className='flex flex-col col-span-1 items-center sm:items-start'>
            <h1 className='text-3xl'>
              Critères
            </h1>
            <div className='flex flex-col sm:flex-row h-full justify-center mt-5 gap-10 items-start'>
              {/* Catégorie */}
              <div className='flex items-center'>
                <svg 
                width="46" 
                height="46" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="currentColor" d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                  <path d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 0 0 2.864 0l4.834-4.834a2.023 2.023 0 0 0
                   0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3v0Z"></path>
                </svg>
                <h2 className='flex flex-col text-lg ml-5'>
                  Catégorie: 
                    <p 
                    className={!isEmpty(productId) && 
                      `lowercase first-letter:uppercase px-3 py-1 text-black font-SourceSansPro text-center opacity-95 
                      rounded-full text-sm ${!isEmpty(productId) && productId.category == "DIVERS" ? "bg-red-300" : productId.category == 
                      "ACCESSOIRES" ? "bg-green-300" : productId.category == "VÊTEMENTS" ? "bg-sky-300" : ""}`}>{!isEmpty(productId) && productId.category}
                    </p>
                </h2>
              </div>
              {/* Taille */}
              <div className='col-span-4 flex items-center'>
                <svg width="46" height="46" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20Z"></path>
                  <path d="M16 11h-3V8a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1h4a1 1 0 0 0 0-2Z"></path>
                </svg>
                <h2 className='flex flex-col text-lg ml-5'>Disponibilité: 
                    <span
                    className={!isEmpty(productId) && `lowercase first-letter:uppercase px-3 py-1 text-black font-SourceSansPro text-center
                    opacity-95 rounded-full text-sm ${!isEmpty(productId) && productId.inventory <= 0 ? "bg-red-600" : productId.inventory <= 10 ? 
                    "bg-orange-500" : productId.inventory >= 10 ? "bg-green-600" : ""}`}
                    >
                      {!isEmpty(productId) && productId.inventory <= 0 ? 
                      "Rupture de stock" : !isEmpty(productId) && productId.inventory <= 10 ? 
                      `Dépêcher vous ! Il n'en reste plus que ${!isEmpty(productId) && productId.inventory}` : !isEmpty(productId) && productId.inventory >= 10 ? 
                      "En stock" : ""}
                    </span>
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className='mb-20 min-w-screen'>
          <div className='flex flex-col w-full sm:w-3/4'>
            <h1 className='text-3xl font-rajdhani font-semibold text-center sm:text-left'>La livraison</h1>
            <div className='flex flex-col space-y-5 border-b-[1px] border-black p-5 sm:pl-0 mb-10'>
              <p className='text-xl font-SourceSansPro font-medium'>
                Recevez votre produit à domicile, nous nous engageons à vous garantir la meilleur livraison possible, et si vous n'êtes
                pas satisfait, un remboursement vous sera du dans les meilleurs délais.
              </p>
              <p className='text-xl font-SourceSansPro font-medium'>
                De plus, si le produit ne vous plaît pas, il est de notre devoir de vous rembourser l'intégralité de la somme sauf si et seulement si le 
                produit est rendu en mauvaise état.
              </p>
            </div>
            <div className='flex items-center p-5 sm:p-0'>
              <div className='flex flex-col space-y-10 w-full'>
                <div className='flex items-center space-x-5'>
                  <img src={mondialRelay} alt='logo mondial relay' width={100} className='hover:scale-110 duration-200' />
                  <div className='w-full h-[1px] bg-neutral-300'></div>
                  <span className='font-rajdhani text-xl font-semibold'>5.30€</span>
                </div>
                <div className='flex items-center space-x-5'>
                  <img src={fedex} alt='logo mondial relay' width={100} className='hover:scale-110 duration-200' />
                  <div className='w-full h-[1px] bg-neutral-300'></div>
                  <span className='font-rajdhani text-xl font-semibold'>3.89€</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      {payementValid ? <Confetti
        width={maxWidth}
        height={maxHeight}
        colors={['#000000', '#ffffff', '#0000ff']}
        numberOfPieces={800}
        recycle={true}
      /> : null}
    </>
  )
}