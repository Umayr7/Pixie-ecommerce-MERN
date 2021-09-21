import React, { Fragment, useState, useEffect, useContext } from 'react'
import UserContext from '../../context/user/userContext'

export const OrderItem = (props) => {
    const userContext = useContext(UserContext);

    const { updateOrder, removeProduct } = userContext;
    
    const { cartItem, index } = props;

    const [quantity, setQuantity] = useState(cartItem.quantity);

    function updateTotalAmount() {
        let totalAmountElement = document.getElementById('total-amount');
        let cartItemPriceElements = document.getElementsByClassName('cart-item-total-price');
        let totalAmount=0;
        [...cartItemPriceElements].forEach(cartItemPriceElement => {
            totalAmount += parseFloat(cartItemPriceElement.textContent);
        });
        
        totalAmountElement.innerText = totalAmount.toFixed(2);
    }

    useEffect(() => {
        updateTotalAmount();
        
        console.log('this');
        console.log(cartItem);

        // eslint-disable-next-line
    }, []);

    const onChange = (e) => {
        setQuantity(e.target.value);
        const orderData = {
            id: cartItem.id,
            quantity: e.target.value
        }
        updateOrder(orderData);
    };
    
    const onDelete = (e) => {
        console.log(cartItem.id);
        removeProduct(cartItem.id);
    };

    return (
        <Fragment>
            <div className="container my-4">
                <div className="card shadow my-3 draft listing-card">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-sm-2 text-center">
                                {/* <img style="height: 80px;" src="<%= cart.photo %>"> */}
                                <img style={{height: '80px'}} src={cartItem.photo} alt=""></img>
                            </div>
                            <div className="col-sm-2 text-center">
                                <p className="mt-md-4 text-dark listing-title mb-0"><strong>{cartItem.name}</strong></p>
                                <p className="text-muted" style={{fontSize: 'small !important' }}><strong>Price: Rs.<span id={`price-${cartItem.id}`}>{cartItem.price}/item</span></strong></p>
                            </div>
                            <div className="col-sm-3 text-center"></div>
                            <div className="col-sm-2 text-center">
                                <div className="input-group mb-3">
                                    <div>
                                        <label className="input-group-text" htmlFor="inputGroupSelect01">Quantity</label>
                                        <input type="number" onChange={onChange} value={quantity} className="quantity-input-field" min="1" id={cartItem.id} name={`quantity_${index}`}/>
                                        <input type="text" value={cartItem.item_id} name={`item_id_${index}`} readOnly hidden/>
                                        <input type="text" value={cartItem.size} name={`size_${index}`} readOnly hidden/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 text-center">
                                <p><strong>Rs. <span className="cart-item-total-price" id={`cart-item-total-price-${cartItem.id}`}>{(cartItem.quantity * cartItem.price).toFixed(2)}</span></strong></p>
                            </div>
                            <div className="col-md-1 text-center">
                                <button className="btn btn-sm" style={{backgroundColor: 'Transparent'}} onClick={onDelete}><i className="fas fa-trash-alt text-danger"></i></button>
                            </div>
                        </div><br/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
