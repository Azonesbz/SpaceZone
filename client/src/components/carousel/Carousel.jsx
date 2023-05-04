import { useEffect } from 'react';
import { useState } from 'react';
import {ChevronLeft, ChevronRight} from 'react-feather'

export default function Carousel({
    children: slides, 
    autoSlide = false, 
    autoSlideInterval = 3000,
    arrowSize
}){
    const [curr, setCurr] = useState(0)

    let prev = () => 
        setCurr(curr => (curr === 0 ? slides.length - 1 : curr - 1));
    let next = () => 
        setCurr(curr => (curr === slides.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        console.log(slides)
    }, [])

    return(
        <>
            <div className="overflow-hidden relative">
                <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)`}}>{slides}</div>
                {slides.length > 1 ?
                <div className='absolute inset-0 flex items-center justify-between p-4'>
                    <button className='p-1 rounded-full shadow bg-slate-200' onClick={prev}>
                        <svg width={arrowSize || '30'} height={arrowSize || '30'} fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12h14"></path>
                            <path d="m5 12 6 6"></path>
                            <path d="m5 12 6-6"></path>
                        </svg>
                    </button>
                    <button className='p-1 rounded-full shadow bg-slate-200' onClick={next}>
                        <svg width={arrowSize || '30'}  height={arrowSize || '30'} fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12h14"></path>
                            <path d="m13 18 6-6"></path>
                            <path d="m13 6 6 6"></path>
                        </svg>
                    </button>
                </div>
                : null }
                {slides.length > 1 ?
                <div className='absolute bottom-4 right-0 left-0'>
                    <div className='flex items-center justify-center gap-2'>
                        {slides.map((_, i) => (
                            <div className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"}`} />
                        ))}
                    </div>
                </div>
                : null }
            </div>
        </>
    )
}