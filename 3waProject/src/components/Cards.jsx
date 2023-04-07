export default function Cards(){
    return (
        <div className='flex bg-white col-span-3 shadow shadow-black rounded-xl w-full h-60 p-3'>
            <img src="https://via.placeholder.com/150x150" alt="Placeholder" className='rounded-xl' />
            <div className='p-5'>
                <h2 className='font-rajdhani font-semibold text-3xl'>Maquette</h2>
                <span className='font-semibold font-rajdhani text-3xl'>55€</span>
                <div className='flex mt-1'>
                    <button className='bg-black text-white text-lg font-karla py-2 px-5 rounded-xl'>Acheter</button>
                    <button className='ml-5 border border-black font-karla text-lg py-2 px-5 rounded-xl'>Panier</button>
                </div>
                <div className='font-roboto flex flex-col mt-2'>
                    <p className='text-md'>Vendu par Azones</p>
                    <button className='underline text-indigo-800 underline-offset-2 text-left'><p>Contacter le vendeur</p></button>
                </div>
            </div>
        </div>
    )
}