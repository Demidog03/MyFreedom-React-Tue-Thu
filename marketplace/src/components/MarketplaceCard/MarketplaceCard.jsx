import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import classes from './MarketplaceCard.module.css';
import Button from 'react-bootstrap/Button';
import placholderImage from '../../assets/images/placeholder-image.png'

function MarketplaceCard({ title, price, description, image }) {
    const [cardImg, setCardImg] = useState(image)

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

    console.log(cardImg)

    return (
        <Card className={classes.card}>
            <Card.Img className={classes.img} variant="top" src={cardImg} />
            <Card.Body>
                <Card.Title className={classes.title}>{title}</Card.Title>
                <Card.Text className={classes.price}>
                    {price}$
                </Card.Text>
                <Card.Text className={classes.description}>
                    {description}
                </Card.Text>
                <Button style={{ width: '100%' }} variant="success">Order now</Button>
            </Card.Body>
        </Card>
    )
}

export default MarketplaceCard
