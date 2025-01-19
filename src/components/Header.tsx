

export function Header (){
   
    return (
    
    <header>
        <div className="flex flex-row shadow-lg max-w-auto p-5   h-20  justify-between items-center px-4">
            <h1 className="uppercase font-bold text-2xl mx-5">Products App</h1>
            <div className="flex justify-center items-center space-x-4 m-5">
                <a href="" className="uppercase  text-black transition-colors hover:text-indigo-400">Services</a>
                <a href="" className="uppercase  text-black transition-colors hover:text-indigo-400">About</a>
                <a href="" className="uppercase  text-black transition-colors hover:text-indigo-400">Contact</a>
            </div>
        </div>
        
    </header>
    )
}