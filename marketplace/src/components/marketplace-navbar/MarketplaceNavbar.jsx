import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import { Cart2Icon } from '../../shared/Icons';
import classes from './MarketplaceNavbar.module.css'
import ProductCartOffCanvas from '../product-cart-off-canvas/ProductCartOffCanvas';
import { useState } from 'react';

function MarketplaceNavbar() {
    const [showCart, setShowCart] = useState(false)
    const navigate = useNavigate()

    function goSigninPage() {
        navigate('/signin')
    }

    function goToMainPage() {
        navigate('/')
    }

    function openCart() {
        setShowCart(true)
    }

    function closeCart() {
        setShowCart(false)
    }

    return (
        <Navbar expand="md" className="bg-body-tertiary">
            <Container fluid="lg">
                <Navbar.Brand className={classes.logo} onClick={goToMainPage}>Marketplace</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    <Form className={classes.navbarButtons}>
                        <div onClick={openCart} className={classes.cartIcon}><Cart2Icon/></div>
                        <Button onClick={goSigninPage} variant="outline-success">Sign-in</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
            <ProductCartOffCanvas show={showCart} handleClose={closeCart}/>
        </Navbar>
    )
}

export default MarketplaceNavbar
