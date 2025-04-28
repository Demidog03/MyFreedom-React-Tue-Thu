import { useEffect, useState } from 'react'
import { ListGroup, Offcanvas, Spinner } from 'react-bootstrap'
import ProductCartItem from '../product-cart-item/ProductCartItem'
import classes from './ProductCartOffCanvas.module.css'
import { getProductDetailsApi } from '../../api/api'

function ProductCartOffCanvas({ show, handleClose }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const totalPriceOfProducts = products.reduce((acc, p) => {
        return acc + (p?.totalPriceWithDiscount || p.totalPrice)
    }, 0)

    useEffect(() => {
        if (show) {
            const allCartProductIds = JSON.parse(localStorage.getItem('cartProducts')) || [] // undefined
            allCartProductIds.forEach(product => { // undefined.forEach - нет метода
                console.log(product)
                fetchProductById(product.productId, product.amount)
            });
        }
        else {
            setProducts([])
        }
    }, [show])

    console.log(products)

    async function fetchProductById(id, amount) {
        try {
            setLoading(true)
            const response = await getProductDetailsApi(id)
            if (response?.data?.product) {
                const productInfo = response.data.product
                if (productInfo?.discount) {
                    setProducts(prevProduct => [...prevProduct, {
                        title: productInfo.title,
                        image: productInfo.image,
                        amount,
                        discount: productInfo.discount,
                        totalPrice: productInfo.price * amount,
                        totalPriceWithDiscount: Math.round(productInfo.price - productInfo.price * productInfo.discount / 100) * amount
                    }])
                }
                else {
                    setProducts(prevProducts => [...prevProducts, {
                        title: productInfo.title,
                        image: productInfo.image,
                        amount,
                        totalPrice: productInfo.price * amount,
                    }])
                }
            }
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Product Cart</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                {loading ? (
                    <div className={classes.spinnerContainer}>
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <>
                        <ListGroup as="ol" numbered>
                            {products.map(p => (
                                <ProductCartItem
                                    amount={p.amount}
                                    discount={p.discount}
                                    title={p.title}
                                    totalPrice={p.totalPrice}
                                    totalPriceWithDiscount={p.totalPriceWithDiscount}
                                />
                            ))}
                        </ListGroup>
                        <p style={{ marginTop: 20 }}>Total Price: <b>{totalPriceOfProducts}$</b></p>
                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ProductCartOffCanvas
