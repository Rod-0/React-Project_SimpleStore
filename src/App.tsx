import './App.css'
import { Header } from './components/Header'
import { Shop } from './components/Shop'
import { useEffect,useState } from 'react'

function App() {

  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect (() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
        
      }catch (error){
        console.log('Error:',error)
      }finally{
        setLoading(false)
      }
      
    }
    fetchProducts()
    
  },[])

  return (
    <>
      <Header />
      {loading ? <h1>Cargando...</h1> : <Shop shopItems={products} />}
    </>
  )
}

export default App
