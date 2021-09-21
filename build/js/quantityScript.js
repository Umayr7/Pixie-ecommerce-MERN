function updateTotalAmount() {
    let totalAmountElement = document.getElementById('total-amount');
    let cartItemPriceElements = document.getElementsByClassName('cart-item-total-price');
    let totalAmount=0;
    [...cartItemPriceElements].forEach(cartItemPriceElement => {
        totalAmount += parseFloat(cartItemPriceElement.textContent);
    });
    totalAmountElement.innerText = totalAmount.toFixed(2);
}

updateTotalAmount();

let quantityInputFields = document.getElementsByClassName('quantity-input-field');
[...quantityInputFields].forEach(quantityInputField => {
    quantityInputField.addEventListener('change', () => {
        // avoiding inputting negative value
        if (quantityInputField.value < 1) {
            quantityInputField.value = 1;
        }
        let cartItemId = quantityInputField.getAttribute('id');
        let cartItemPrice = parseFloat(document.getElementById(`price-${cartItemId}`).textContent);
        let cartItemTotalPriceElement = document.getElementById(`cart-item-total-price-${cartItemId}`);
        cartItemTotalPriceElement.textContent = (cartItemPrice * quantityInputField.value).toFixed(2);
        updateTotalAmount();
    });
});

// let checkoutForm = document.getElementById('checkout-form');
// let checkoutBtn = document.getElementById('checkout-btn');

// checkoutBtn.addEventListener('click', () => {
//     checkoutForm.submit();
// });