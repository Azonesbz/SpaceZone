import { useState } from "react";

export default function Search(){
    const [inputValue, setInputValue] = useState({
        search: '',
    });
    const [result, setResult] = useState([])
    
    const handleSubmit = (e) => {
        console.log(inputValue)
        e.preventDefault()
        fetch('http://localhost:3001/search/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(inputValue)
        })
        .then(res => res.json())
        .then(data => setResult(data))
    }

    return(
        <>
            <form 
            className="w-full relative order-1"
            action="" 
            method="post"
            onSubmit={handleSubmit}
            >
                <label htmlFor="search" className='flex items-center bg-neutral-50 border border-gray-700 rounded-full'>
                    <input 
                    className="w-full py-2 px-3 rounded-l-full"
                    type="search"
                    name="search"
                    placeholder="Rechercher un article..."
                    value={inputValue.search}
                    onChange={(e) => {
                        const {name, value} = e.currentTarget
                        setInputValue({...inputValue, [name]: value})
                    }}
                    />
                    <button className="mr-2">
                        <svg width="34" height="34" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"></path>
                            <path d="m21 21-6-6"></path>
                        </svg>
                    </button>
                    <button className="mr-5 md:hidden">
                        <svg width="34" height="34" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                            <path d="M4 6h8"></path>
                            <path d="M16 6h4"></path>
                            <path d="M8 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                            <path d="M4 12h2"></path>
                            <path d="M10 12h10"></path>
                            <path d="M17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                            <path d="M4 18h11"></path>
                            <path d="M19 18h1"></path>
                        </svg>
                    </button>
                    
                </label>
            </form>
        </>
    )
}