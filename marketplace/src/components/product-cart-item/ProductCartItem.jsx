import { Badge, ListGroup } from "react-bootstrap"
import classes from './ProductCartItem.module.css'
import { TagFillIcon } from "../../shared/Icons"

function ProductCartItem({ amount, title, discount, totalPrice, totalPriceWithDiscount }) {
    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className={classes.title}>{title}</div>
                <p className={classes.priceContainer}>
                    <TagFillIcon />
                        <b>Price:</b>
                        {' '}<span className={discount ? classes.discount : ''}>{totalPrice}$</span>
                        {' '}{discount &&
                            <span className={classes.priceWithDiscount}>
                                {totalPriceWithDiscount}$
                                <Badge className={classes.badge} pill bg="success">
                                      -{discount}%
                                </Badge>
                            </span>
                        }
                 </p>
            </div>
            <Badge bg="primary" pill>{amount}</Badge>
        </ListGroup.Item>
    )
}

export default ProductCartItem
