export default function Search(){
    return(
        <>
            <form action="" method="post" className="w-full relative">
                <label htmlFor="search" className='flex items-center bg-neutral-50 border border-gray-700 rounded-full'>
                    <input 
                    className="w-full py-2 px-3 rounded-l-full"
                    type="search"
                    placeholder="Rechercher un article..."
                    />
                    <button className="mr-5">
                        <svg width="34" height="34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"></path>
                            <path d="m21 21-6-6"></path>
                        </svg>
                    </button>
                    
                </label>
            </form>
        </>
    )
}