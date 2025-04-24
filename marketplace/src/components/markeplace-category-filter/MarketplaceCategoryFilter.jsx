import { Form } from "react-bootstrap"
import classes from './MarketplaceCategoryFilter.module.css'
import { useEffect, useState } from "react"
import axios from "axios"
import MarketplaceErrorToaster from "../../shared/marketplace-toaster/MarketplaceErrorToaster"
import { useSearchParams } from "react-router"

function MarketplaceCategoryFilter() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    const [params, setParams] = useSearchParams()

    useEffect(() => {
        getProductCaterogies()
    }, [])

    async function getProductCaterogies() {
        try {
            const response = await axios.get('https://fakestoreapi.in/api/products/category')
            if (response.status === 200 && response?.data?.categories) {
                setCategories(response.data.categories)
            }
            else {
                setError('Failed to get product categories!')
            }
        }
        catch(err) {
            setError('Failed to get product categories!')
        }
    }

    function closeToaster() {
        setError('')
    }

    function changeCategory(event) {
        if(event.target.value === 'noCategory') {
            params.delete('category')
        }
        else {
            params.set('category', event.target.value)
        }
        setParams(params)
    }

    return (
        <>
            <Form.Select onChange={changeCategory} className={classes.select}>
                <option value="noCategory">No category</option>
                {categories.map((category, index) => (
                    <option key={index} className={classes.option} value={category}>
                        {category}
                    </option>
                ))}
            </Form.Select>
            <MarketplaceErrorToaster show={Boolean(error)} close={closeToaster} error={error} />
            {/*
                Boolean('') = false
                Boolean('Failed to get product categories!') = true
            */}
        </>
    )
}

export default MarketplaceCategoryFilter
