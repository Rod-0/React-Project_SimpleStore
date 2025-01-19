import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {type ShopItem} from '../types.t.ts' 
import { useEffect, useMemo, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';

function ProductsList({ shopItems }: { shopItems: ShopItem[] }) {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('store')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [store, setStore] = useState<ShopItem[]>(initialCart)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const total = store.reduce((acc, item) => acc + item.price, 0)
    const cartCount = useMemo(() => store.length, [store])

    useEffect(()=>{
        localStorage.setItem('store', JSON.stringify(store))
    },[store])
        
    

    const productList = useMemo( () =>(
        shopItems.map((item) => (
            <div key={item.id} className="bg-white shadow-lg p-4 hover:shadow-xl">
             <div className='flex flex-row gap-4'>
                
                <img className='w-20 h-20' src={item.image} alt={item.title} />
                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold text-2xl uppercase'>{item.title}</h2>
                    <p className='text-sm'>{item.description}</p>
                    <div className='flex flex-row gap-4 justify-between items-center'>
                        <p className='mt-auto font-bold text-2xl text-orange-400'>${item.price}</p>
                        <button onClick={() => handleClick(item)} className='bg-blue-300 px-4 py-2 rounded-lg hover:bg-blue-400 text-white font-bold  ' >Agregar</button>
                    </div>
                        
                </div>
             </div>
            </div>
          ))
    ),[shopItems])

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Producto', width: 200 },
        { field: 'price', headerName: 'Precio', width: 100, renderCell: (params) => <p>${params.value}</p>},
        {field: 'image', headerName: 'Imagen', width: 100, renderCell: (params) => <img src={params.value as string} alt={params.value as string} style={{width: '50px', height: '50px'}}/>},
        {field: 'delete', headerName: 'Eliminar', width: 100, renderCell: (params) => <button onClick={() => setStore(store.filter((i) => i.id !== params.row.id))}><FontAwesomeIcon className=' w-5 h-5' icon={faXmark} /></button>}
      ];

  
    
    const handleClick = (item: ShopItem) => {
        console.log("Producto:" ,item.id)
        const itemExist = store.findIndex((i) => i.id === item.id)
        if (itemExist >= 0){
        alert('Este producto ya esta en el carrito')
        }else{
            setStore(prev =>[...prev, item])
        }
   
    }

    
     
    return (
        <main className='container mx-auto mt-6'>
            <div className='flex flex-row justify-between items-center gap-4'>
                <span></span>
                <h1 className='text-4xl text-orange-500 uppercase text-center font-bold'>Nuestra Coleccion</h1>
                <div className='relative'>
                    <FontAwesomeIcon className='cursor-pointer w-10 h-10' onClick={()=> setIsCartOpen(!isCartOpen)} icon={faCartShopping} />
                    {cartCount > 0 && <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-center'>{store.length}</span>}
                </div>
                {isCartOpen && (
                    <div className='absolute right-0 top-0 w-1/3 h-auto bg-white shadow-lg p-4'>
                        <div className='flex flex-row justify-between items-center'>
                            <h2 className='text-2xl font-bold'>Carrito de compras</h2>
                            <FontAwesomeIcon className='cursor-pointer w-10 h-10' onClick={()=> setIsCartOpen(!isCartOpen)} icon={faXmark} />
                        </div>
                        
                        {cartCount > 0 ?(
                            <div>
                                <DataGrid
                                rows={store}
                                columns={columns}
                                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                                pageSizeOptions={[5, 10]}
                            />
                                <div className='flex flex-row justify-between items-center'>
                                    <h2 className='text-2xl font-bold'>Total:</h2>
                                    <p className='text-2xl font-bold'>${total}</p>
                                </div>
                            </div>
                             
                            
                        ) : (
                            <p>No hay productos en el carrito</p>
                        )}
                        
                    </div>
                )}
                
            </div>
            
            
            <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-gray-100">
                {productList}
            </div>
        
        </main>
    )
}

export function Shop({ shopItems }: { shopItems: ShopItem[] }) {
    const hasProducts = shopItems?.length > 0
    return (
                   
        hasProducts ? <ProductsList shopItems={shopItems} /> : <p>There are no products available</p>
       
        
    )
}