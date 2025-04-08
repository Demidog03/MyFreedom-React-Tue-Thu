import Container from "react-bootstrap/esm/Container"
import MarketplaceCard from "../MarketplaceCard/MarketplaceCard"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import classes from './MarketplaceCards.module.css'
import { useSearchParams } from "react-router";

function MarketplaceCards() {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(+searchParams.get('page') || 1)
    const [isLoading, setIsLoading] = useState(false)
    
    const paginationItems = []

    useEffect(() => {
        getProducts(currentPage)
    }, [currentPage])

    async function getProducts(page) {
        try {
            setIsLoading(true)
            const response = await axios.get(`https://fakestoreapi.in/api/products?page=${page}&limit=8`)
            const productsData = response.data?.products
            if (response.status === 200 && productsData?.length) {
                setProducts(productsData)
            }
        }
        catch (err) {
            console.error(err)
            alert('Error when fetching products!')
        }
        finally {
            setIsLoading(false)
        }
    }

    function changePage(i) {
        setCurrentPage(i)
        setSearchParams({ page: i })
    }

    for (let i = 1; i <= 10; i++) {
        paginationItems.push(
            <Pagination.Item onClick={() => changePage(i)} key={i} active={i === currentPage}>
                {i}
            </Pagination.Item>
        )
    }

    return (
        <Container fluid="lg">
            {isLoading
                ? (
                    <div className={classes.spinnerContainer}>
                        <Spinner animation="border" variant="primary" />
                    </div>
                )
                : (
                    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                        {products.map((product, idx) => (
                            <Col key={idx}>
                                <MarketplaceCard
                                    title={product.title}
                                    description={product.description}
                                    image={product.image}
                                    price={product.price}
                                    id={product.id}
                                />
                            </Col>
                        ))}
                    </Row>
                )
            }
            <Pagination className={classes.cardPagination}>
                {paginationItems}
            </Pagination>
        </Container >
    )
}

export default MarketplaceCards
