import Container from "react-bootstrap/esm/Container"
import MarketplaceCard from "../marketplace-card/MarketplaceCard"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import classes from './MarketplaceCards.module.css'
import { useSearchParams } from "react-router";
import MarketplaceCategoryFilter from "../markeplace-category-filter/MarketplaceCategoryFilter";

function MarketplaceCards() {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams() // состояние
    const [isLoading, setIsLoading] = useState(false)
    const currentPage = +searchParams.get('page') || 1
    const currentCategory = searchParams.get('category')
    
    const paginationItems = []

    useEffect(() => {
        getProducts(currentPage, currentCategory)
    }, [currentPage, currentCategory])

    async function getProducts(page, category) {
        try {
            setIsLoading(true)
            const link = !category ?
                `https://fakestoreapi.in/api/products?page=${page}&limit=8`
                : `https://fakestoreapi.in/api/products/category?type=${category}&page=${page}&limit=8`
                
            const response = await axios.get(link)
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
        searchParams.set('page', i)
        setSearchParams(searchParams)
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
            <div className={classes.filterContainer}>
                <MarketplaceCategoryFilter/>
            </div>
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
