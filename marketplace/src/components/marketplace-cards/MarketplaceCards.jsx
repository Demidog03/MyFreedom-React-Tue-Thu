import Container from "react-bootstrap/esm/Container"
import MarketplaceCard from "../marketplace-card/MarketplaceCard"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import classes from './MarketplaceCards.module.css'
import { useSearchParams } from "react-router";
import MarketplaceCategoryFilter from "../markeplace-category-filter/MarketplaceCategoryFilter";
import { getProductsApi, getProductsByCategoryApi } from "../../api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MarketplaceErrorToaster from "../../shared/marketplace-toaster/MarketplaceErrorToaster";

function MarketplaceCards() {
    const queryClient = useQueryClient()
    const [searchParams, setSearchParams] = useSearchParams() // состояние
    const currentPage = +searchParams.get('page') || 1
    const currentCategory = searchParams.get('category')
    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', currentPage, currentCategory],
        queryFn: () => !currentCategory
            ? getProductsApi(currentPage)
            : getProductsByCategoryApi(currentCategory, currentPage),
        initialData: [],
    })
    const products = data?.data?.products
    
    const paginationItems = []

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

    function closeErrorToaster() {
        queryClient.resetQueries({ queryKey: ['products', currentPage, currentCategory] });
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
                        {products && products.map((product, idx) => (
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
            <MarketplaceErrorToaster show={isError} close={closeErrorToaster} error={'Error when fetching products!'} />
        </Container >
    )
}

export default MarketplaceCards
