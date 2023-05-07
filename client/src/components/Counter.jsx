export default function Counter({setValue, value}){
    

    let incrementValue = (e) => {
        if(value >= 20){
            e.preventDefault()
            alert('La limite maximum est de 20')
            setValue(20)
        } else {
            setValue(value => value + 1)
        }
    }
    let decrementValue = (e) => {
        if(value <= 0){
            e.preventDefault()
            alert('Le minimum est de 0')
            setValue(0)
        } else {
            setValue(value => value - 1)
        }
    }

    return (
        <>
            <div onClick={(e) => e.preventDefault()} className="flex items-center bg-slate-300 border border-neutral-900 rounded-md">
 
                
                <button onClick={decrementValue} className="bg-neutral-900 text-white rounded-l" id="add">
                    <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12h14"></path>
                    </svg>
                </button>
                <span className="px-3">{value}</span>                
                <button onClick={incrementValue} className="bg-neutral-900 text-white rounded-r" id="less">
                    <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                    </svg>
                </button>
            </div>
        </>
    )
}