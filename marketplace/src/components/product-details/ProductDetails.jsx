import { Badge, Button, Container, Image, Spinner } from 'react-bootstrap'
import classes from './ProductDetails.module.css'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BoxFillIcon, PalleteFillIcon, PatchCheckFill, TagFillIcon } from '../../shared/Icons'

function ProductDetails() {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = useParams()

    useEffect(() => {
        if (params?.id) {
            fetchProductById(params.id)
        }
    }, [params])

    async function fetchProductById(id) {
        try {
            setLoading(true)
            const response = await axios.get(`https://fakestoreapi.in/api/products/${id}`)
            if (response?.data?.product) {
                const productInfo = response.data.product
                if (productInfo?.discount) {
                    setProduct({
                        ...productInfo,
                        priceWithDiscount: Math.round(productInfo.price - productInfo.price * productInfo.discount / 100)
                    })
                }
                else {
                    setProduct(productInfo)
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

    function goBack() {
        const backPage = searchParams.get('backPage') // backPage=10 -> 10
        navigate(`/?page=${backPage}`) // /?page=10
    }

    return (
        <Container fluid="lg" className='pt-4 pb-4'>
            <Button className='mb-4' onClick={goBack} variant='secondary' size="sm">Back</Button>
            {loading ? (
                // TODO: Выгрузить в отдельный компонент
                <div className={classes.spinnerContainer}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )
                : !product
                    ? <h1>Product not found</h1>
                    : (
                        <div className={classes.container}>
                            {/* TODO: Проверку на изображение */}
                            <Image className={classes.image} src={product.image} rounded />
                            <div className={classes.productInformation}>
                                <Badge bg="info">{product.category}</Badge>
                                <h1 className={classes.title}>{product.title}</h1>
                                <p>{product.description}</p>
                                {product?.brand && <p><PatchCheckFill /> <b>Brand:</b> <span className={classes.brand}>{product.brand}</span></p>}
                                {product?.model && <p><BoxFillIcon /> <b>Model:</b> {product.model}</p>}
                                {product?.color && <p><PalleteFillIcon /> <b>Color:</b> {product.color}</p>}
                                <p>
                                    <TagFillIcon />
                                    <b>Price:</b>
                                    {' '}<span className={product?.discount ? classes.discount : ''}>{product.price}$</span>
                                    {' '}{product?.discount &&
                                        <span className={classes.priceWithDiscount}>
                                            {product.priceWithDiscount}$
                                            <Badge className={classes.badge} pill bg="success">
                                                -{product?.discount}%
                                            </Badge>
                                        </span>
                                    }
                                </p>
                            </div>
                        </div>
                    )
            }

        </Container>
    )
}

export default ProductDetails
