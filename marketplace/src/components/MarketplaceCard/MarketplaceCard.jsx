import React, { useEffect, useState } from 'react'
import { Card, Button, Placeholder } from 'react-bootstrap';
import classes from './MarketplaceCard.module.css';
import placholderImage from '../../assets/images/placeholder-image.png'
import { useNavigate, useSearchParams } from 'react-router';

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
                <Button onClick={goToProductPage} style={{ width: '100%' }} variant="success">Order now</Button>
            </Card.Body>
        </Card>
    )
}

export default MarketplaceCard
