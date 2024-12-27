$(document).ready(function () {
    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        $('#cartItems').empty();

        if (cart.length > 0) {
            let totalItems = 0;
            let totalPrice = 0;

            cart.forEach((item, index) => {
                $('#cartItems').append(`
                    <div class="cart-item" data-index="${index}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h2>${item.name}</h2>
                            <p>Price: ${item.price}</p>
                        </div>
                        <button class="remove-item">Remove</button>
                    </div>
                `);

                totalItems++;
                totalPrice += parseFloat(item.price.replace(/[^\d.-]/g, ''));
            });

            $('#totalItems').text(totalItems);
            $('#totalPrice').text(`$${totalPrice.toFixed(2)}`);
        } else {
            $('#cartItems').html('<p>Your cart is empty.</p>');
            $('#totalItems').text(0);
            $('#totalPrice').text('$0.00');
        }
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
            cartCountElement.style.display = cart.length === 0 ? 'none' : 'flex';
        }
    }

    function showCustomAlert(message, type = 'info') {
        if ($('.custom-alert').length > 0) {
            $('.custom-alert').remove();
        }

        const alertClass = type === 'error' ? 'error-alert' : 'info-alert';

        const alertBox = $(`
            <div class="custom-alert ${alertClass}">
                ${message}
                <button class="close-alert">OK</button>
            </div>
        `);

        $('body').append(alertBox);
        setTimeout(() => alertBox.addClass('show'), 100);

        alertBox.find('.close-alert').on('click', function () {
            alertBox.removeClass('show').addClass('hide');
            setTimeout(() => alertBox.remove(), 400);
        });
    }

    displayCartItems();

    $(document).on('click', '.remove-item', function () {
        const itemIndex = $(this).closest('.cart-item').data('index');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
        showCustomAlert('Item removed successfully.', 'info');
    });

    $('#clearCart').click(function () {
        localStorage.removeItem('cart');
        displayCartItems();
        updateCartCount();
        showCustomAlert('Cart cleared successfully.', 'info');
    });

    $('#checkout').click(function () {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            showCustomAlert('Your cart is empty. Please add items before checking out.', 'error');
        } else {
            showCustomAlert('Checkout successful! Thank you for your purchase.', 'info');
            localStorage.removeItem('cart');
            displayCartItems();
            updateCartCount();
        }
    });

    $('#backButton').click(function () {
        window.history.back();
    });
});
