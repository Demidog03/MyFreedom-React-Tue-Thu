import React, { useEffect, useState } from 'react'
import { Card, Button, Placeholder } from 'react-bootstrap';
import classes from './MarketplaceCard.module.css';
import placholderImage from '../../assets/images/placeholder-image.png'
import { useNavigate, useSearchParams } from 'react-router';
import { CartPlusIcon } from '../../shared/Icons';

function MarketplaceCard({ title, price, description, image, id }) {
    // Falsy values
    // false, null, undefined, '', 0
    const [cardImg, setCardImg] = useState('')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        testImage(image)
    }, [image])

    function testImage(url) {
        const tester = new Image() // <img src=""/>
        tester.src = url // <img src="ссылка"/>
        tester.onerror = () => {
            setCardImg(placholderImage)
        }
        tester.onload = () => {
            setCardImg(image)
        }
    }

    function goToProductPage() {
        const currentPage = searchParams.get('page') // page=10 -> 10
        navigate(`/product/${id}?backPage=${currentPage}`) // product?backPage=10
    }

    [
        {
            productId: '1',
            amount: 2
        },
        {
            productId: '80',
            amount: 4
        }
    ]

    function addToCart() {
        const oldCardProducts = JSON.parse(localStorage.getItem('cartProducts')) || []
        const foundProduct = oldCardProducts.find(p => p.productId === id)

        if(foundProduct) {
            foundProduct.amount++
            localStorage.setItem('cartProducts', JSON.stringify(oldCardProducts))
        }
        else {
            const newProduct = { productId: id, amount: 1 }
            localStorage.setItem('cartProducts', JSON.stringify([...oldCardProducts, newProduct]))
        }
    }

    return (
        <Card className={classes.card}>
            {!cardImg
                ? (
                    <Placeholder animation="glow">
                        <Placeholder className={classes.img} xs={12} /> {/* 12 - 100% */}
                    </Placeholder>
                )
                : 
                    <Card.Img className={classes.img} variant="top" src={cardImg} />
            }
            <Card.Body>
                <Card.Title className={classes.title}>{title}</Card.Title>
                <Card.Text className={classes.price}>
                    {price}$
                </Card.Text>
                <Card.Text className={classes.description}>
                    {description}
                </Card.Text>
                <div className={classes.buttons}>
                    <Button variant="outline-primary" onClick={goToProductPage} style={{ width: '100%' }}>Order now</Button>
                    <Button onClick={addToCart} variant="outline-success">
                        <div className={classes.cartIcon}><CartPlusIcon/></div>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default MarketplaceCard
