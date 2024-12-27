$(document).ready(function () {
    $(document).ajaxStart(function () {
        $('#loadingSpinner').show();
    }).ajaxStop(function () {
        $('#loadingSpinner').hide();
    });

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        $('#cartCount').text(cart.length).css('display', cart.length > 0 ? 'flex' : 'none');
    }

    function displayProducts(productList) {
        $('.cardWrapper').empty();
        productList.forEach((product, index) => {
            $('.cardWrapper').append(`
                <div class="wrapper">
                    <div class="cardContainer">
                        <div class="top" style="background-image: url('${product.image || 'images/default.jpg'}')"></div>
                        <div class="bottom">
                            <div class="details">
                                <h1>${product.name}</h1>
                                <p>${product.description}</p>
                                <p><strong>Price:</strong> $${product.price}</p>
                            </div>
                            <button class="add-to-cart" data-index="${index}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    const products = [
        { name: "BVLOARI", price: "50.00", image: "images/perfum1.jpg", description: "A timeless blend of elegance" },
        { name: "ETERNITY", price: "75.00", image: "images/perfum2.jpg", description: "A fragrance for endless moments" },
        { name: "SAVAGERY", price: "30.00", image: "images/perfum3.jpg", description: "Unleash your inner strength" },
        { name: "BLEU DE", price: "45.00", image: "images/perfum4.jpg", description: "Refreshing aquatic aroma" },
        { name: "CLASSIC", price: "60.00", image: "images/perfum5.jpg", description: "Timeless and versatile" },
        { name: "LCW BLACKOUT", price: "90.00", image: "images/perfum6.jpg", description: "Bold and mysterious" },
        { name: "DIOR", price: "25.00", image: "images/perfum7.jpg", description: "Sophisticated and modern" },
        { name: "VERSACE", price: "80.00", image: "images/perfum8.jpg", description: "Luxury in every spray" },
    ];

    displayProducts(products);

    function filterProducts(query) {
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        displayProducts(filteredProducts);
    }

    function showCustomAlert(message) {
        if ($('.custom-alert').length > 0) {
            $('.custom-alert').remove();
        }

        const alertBox = $(`
            <div class="custom-alert">
                ${message}
                <button class="close-btn">&times;</button>
            </div>
        `);

        $('body').append(alertBox);
        setTimeout(() => alertBox.addClass('show'), 100);

        setTimeout(() => {
            alertBox.removeClass('show').addClass('hide');
            setTimeout(() => alertBox.remove(), 400);
        }, 5000);

        alertBox.find('.close-btn').on('click', function () {
            alertBox.removeClass('show').addClass('hide');
            setTimeout(() => alertBox.remove(), 400);
        });
    }

    $(document).on('click', '.add-to-cart', function () {
        const index = $(this).data('index');
        const selectedProduct = products[index];

        if (selectedProduct) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(selectedProduct);
            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartCount();
            showCustomAlert(`${selectedProduct.name} added to your cart!`);
        } else {
            showCustomAlert('Unable to add this product to the cart.');
        }
    });

    $(document).on('mouseenter mouseleave', '.add-to-cart', function (event) {
        const backgroundColor = event.type === 'mouseenter' ? '#A6CDDE' : '#f1f1f1';
        $(this).css('background-color', backgroundColor);
    });

    $('#cartButton').on('click', function () {
        window.location.href = 'cart.html';
    });

    $('#contactForm').submit(function (event) {
        event.preventDefault();
        const formData = $(this).serialize();

        $.post('https://your-real-api-url.com/contact', formData)
            .done(function () {
                showCustomAlert('Message sent successfully!');
            })
            .fail(function () {
                showCustomAlert('Error sending message.');
            });
    });

    $('#searchInput').on('input', function () {
        const query = $(this).val();
        filterProducts(query);
    });

    updateCartCount();
});
