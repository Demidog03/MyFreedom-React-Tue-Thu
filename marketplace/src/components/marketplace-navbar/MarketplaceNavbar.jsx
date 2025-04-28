import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import { Cart2Icon, MoonStarsFillIcon, PeopleCircleIcon } from '../../shared/Icons';
import classes from './MarketplaceNavbar.module.css'
import ProductCartOffCanvas from '../product-cart-off-canvas/ProductCartOffCanvas';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';

function MarketplaceNavbar() {
    const [showCart, setShowCart] = useState(false)
    const navigate = useNavigate()
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { setToken } = useContext(AuthContext)

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

    function logout() {
        setCurrentUser(undefined)
        setToken('')
        localStorage.removeItem('accessToken')
    }

    function goToProfileEditPage() {
        navigate('/profile/edit')
    }

    function toggleTheme() {
        const currentTheme = document.querySelector('html').getAttribute('data-bs-theme')
        document.querySelector('html').setAttribute('data-bs-theme', currentTheme === 'dark' ? 'light' : 'dark')
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
                        <div onClick={toggleTheme} className={classes.themeIcon}><MoonStarsFillIcon/></div>
                        <div onClick={openCart} className={classes.cartIcon}><Cart2Icon/></div>
                        {!currentUser && <Button onClick={goSigninPage} variant="outline-success">Sign-in</Button>}
                        {currentUser && <div onClick={goToProfileEditPage} className={classes.profileIcon}><PeopleCircleIcon/></div>}
                        {currentUser && <Button size="sm" onClick={logout} variant="outline-secondary">Logout</Button>}
                    </Form>
                </Navbar.Collapse>
            </Container>
            <ProductCartOffCanvas show={showCart} handleClose={closeCart}/>
        </Navbar>
    )
}

export default MarketplaceNavbar
