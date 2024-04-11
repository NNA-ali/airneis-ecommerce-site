import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import apiInstance from '../../utils/axios'
import GetCurrentAddress from '../plugin/UserCountry'
import UserData from '../plugin/UserData'
import CartID from '../plugin/cartID'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast:true,
  position:"top",
  showConfirmButton:false,
  timer:1500,
  timerProgressBar:true
}) 

function Products() {


    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    
    const [colorValue, setColorValue]=useState("No Color")
    const [sizeValue, setSizeValue]=useState("No Size")
    const [qtyValue, setQtyValue] = useState(1)

    const[selectedProduct, setSelectedProduct] = useState(null)
    const [selectedColors, setSelectedColors] = useState({})
    const [selectedSize, setSelectedSize] = useState({})

    const currentAddress = GetCurrentAddress ()
    const userData = UserData()
    const cart_id = CartID()

    const handleColorButtonClick = (event, product_id, colorName) => {
      console.log("Color button clicked:", colorName);

         setColorValue(colorName) 
         setSelectedProduct(product_id)

         setSelectedColors((prevSelectedColors) => ({
          ...prevSelectedColors,
          [product_id]: colorName
         }))



    }

    const handleSizeButtonClick = (event, product_id, size) => {

      setSizeValue(size)
      setSelectedProduct(product_id)

      setSelectedSize((prevSelectedSizeName) => ({
        ...prevSelectedSizeName,
        [product_id]: size
      }))  
      console.log(sizeName);
            
    }

    const handleQtyChange = (event, product_id) => {
      
      setQtyValue(event.target.value)
      setSelectedProduct(product_id)
      

    }
    

  
    
    
    
    useEffect(() => {
      apiInstance.get(`products/`).then((response) => {
         setProducts(response.data)
      })

       
    }, [])

     
    useEffect(() => {
      apiInstance.get(`category/`).then((response) => {
        setCategory(response.data)
      })
    } , [])

    const handleAddToCart = async (product_id, price, shipping_amount) => {
      const formdata = new FormData ()  
      formdata.append("product_id",product_id)
      formdata.append("user_id",userData?.user_id)
      formdata.append("qty",qtyValue)
      formdata.append("price",price)
      formdata.append("shipping_amount",shipping_amount)
      formdata.append("country",currentAddress.country)
      formdata.append("size",sizeValue)
      formdata.append("color",colorValue)
      formdata.append("cart_id",cart_id)
      console.log(formdata)
      
  try {
    const response = await apiInstance.post(`cart-view/`, formdata);
    console.log(response.data);

     Swal.fire({
      icon:"success",
      title: response.data.message
    })
    // Afficher un message de succès ou rediriger l'utilisateur vers une autre page
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit au panier:', error);
    // Afficher un message d'erreur à l'utilisateur
  }


    }


    return (
      <>
      
      <main className="mt-5">
    <div className="container">
      <section className="text-center">
        <div className="row">
            {products?.map((product, index) => (
                
            
                 <div className="col-lg-4 col-md-12 mb-4">
            <div className="card">
              <div
                className="bg-image hover-zoom ripple"
                data-mdb-ripple-color="light"
              >
                <Link  to={`/detail/${product.slug}/`}> 
                   <img
                     src={product.image}
                     className="w-100"
                     style={{width:"100%",}}
                   />
                </Link>
              
              </div>
              <div className="card-body">
                <Link to={`/detail/${product.slug}/`}
                     
                    href="" className="text-reset">
                  <h5 className="card-title mb-3">{product.title}</h5>


                </Link>
                <a href="" className="text-reset">
                  <product>{product.category.title}</product>
                </a>
                <div className="d-flex justify-content-center">
                <h6 className="mb-3">{product.price}€ </h6>
                <h6 className="mb-3 text-muted ms-2"><strike> {product.old_price} € </strike> </h6>
                </div>
                <br></br>
                <br></br>
                <div className="btn-group">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuClickable"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                    aria-expanded="false"
                  >
                    Variation
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuClickable"
                  >

                  <div className="d-flex flex-column">
                    <li className="product-1">
                        <b>Quantity</b>
                    </li>
                    <div className="product-1 mt-0 pt-0 d-flex flex-wrap">
                      <li>
                        <input className='form-control' value={qtyValue} onChange={(e) => handleQtyChange(e, product.id)} type="number"/>
                      </li>
                    </div>
                  </div>
                  





                    {product.size?.length> 0 &&
                    <div className="d-flex flex-column">
                      <li className='product-1'>
                      {/* <b>Size:</b> :{selectedSize[product?.id] || 'select a size'} */}
                      <b>Size:</b> :{selectedSize[product?.id] ? `${selectedSize[product?.id].length} x ${selectedSize[product?.id].width}` : 'select a size'}

                      </li>
                     
                       
                      <div className="product-1 mt-0 pt-0 d-flex flex-wrap">
                        {product.size?.map((size, index)=> (
                          <div key={index} className='me-2'>
                          <input type="hidden" className='size_name' value={`${size.length} x ${size.width}`} />
                          
                          <button onClick ={(e) => handleSizeButtonClick(e, product.id, size)} className="btn btn-secondary btn-sm me-2 mb-1">
                          {`${size.length} x ${size.width}`}
                          </button>
                          </div>
                       
                       
                        ))}
                       
                      </div>
                      
                    </div>
                      }
                    {product.color?.length > 0 &&    
                    <div className="d-flex flex-column mt-3">
                    
                      <li className="product-1">
                        <b>Color</b> :{selectedColors[product.id] || 'select a color'  }
                      </li>
                      {product.color?.map((color, index)=>(
                      <div className="product-1 mt-0 pt-0 d-flex flex-wrap">
                        <li>
                          <button
                            className="btn btn-sm me-2 mb-1 product-3"
                             style={{ backgroundColor: `${color.color_code}`, border: `2px solid`  }}
                             onClick={(e) => handleColorButtonClick(e,product.id, color.name)}
                          > </button>
                        </li>
                       
                      </div>
                          ))}
                    </div> 
                        }
                    <div className="d-flex mt-3 product-1">
                      <button
                        type="button"
                        className="btn btn-primary me-1 mb-1"
                        onClick={() => handleAddToCart(product.id, product.price, product.shipping_amount)}
                      >
                        <i className="fas fa-shopping-cart" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger px-3 me-1 mb-1 ms-2"
                      >
                        <i className="fas fa-heart" />
                      </button>
                    </div>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-danger px-3 me-1 ms-2"
                  >
                    <i className="fas fa-heart" />
                  </button>
                </div>
              </div>
            </div>
                 </div>
        
          ) )}


        

          
        <div className='row'>
          {category?.map((c, index) =>(
              
              <div className="col-lg-2">
                  <img src={c.image} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                  <h6>{c.title}</h6>
              </div>
         
         ))}
            
            

            
          </div>

        </div>
      </section>
      
      {/*Section: Wishlist*/}
    </div>
  </main>
  
  </>
  )

      
     
    
}

export default Products