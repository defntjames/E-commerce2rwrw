document.addEventListener('DOMContentLoaded', function () {
            const cart = document.querySelector('.cart');
            const modal = document.getElementById('cartModal');
            const closeModal = document.querySelector('.modal .close');
            const cartItems = document.getElementById('cartItems');
            const totalCostElement = document.getElementById('totalCost');
            const addToCartButtons = document.querySelectorAll('.product-column button');
            const checkoutBtn = document.getElementById('checkoutBtn');
            const orderSummaryContainer = document.querySelector('.order-summary-container');
            const summaryEmail = document.getElementById('summaryEmail');
            const summaryAddress = document.getElementById('summaryAddress');
            const summaryPostalCode = document.getElementById('summaryPostalCode');
            const summaryContactNumber = document.getElementById('summaryContactNumber');
            const summaryItems = document.getElementById('summaryItems');
            const summaryTotalCost = document.getElementById('summaryTotalCost');
            const heroContent = document.querySelector('.hero-content');
            const ctaButtons = document.querySelector('.cta-buttons');
            let itemsInCart = [];
            let totalCost = 0;

            cart.addEventListener('click', function () {
                modal.style.display = 'block';
                heroContent.classList.add('hidden');
                ctaButtons.classList.add('hidden');
                displayCartItems();
            });

            closeModal.addEventListener('click', function () {
                modal.style.display = 'none';
                heroContent.classList.remove('hidden');
                ctaButtons.classList.remove('hidden');
            });

            window.addEventListener('click', function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    heroContent.classList.remove('hidden');
                    ctaButtons.classList.remove('hidden');
                }
            });

            addToCartButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    const productColumn = button.closest('.product-column');
                    const productName = productColumn.querySelector('h3').innerText;
                    const productPrice = parseFloat(button.dataset.price.replace(/,/g, ''));
                    addItemToCart(productName, productPrice);
                });
            });

            checkoutBtn.addEventListener('click', function () {
                const email = document.getElementById('email').value;
                const address = document.getElementById('address').value;
                const postalCode = document.getElementById('postalCode').value;
                const contactNumber = document.getElementById('contactNumber').value;

                summaryEmail.innerText = email;
                summaryAddress.innerText = address;
                summaryPostalCode.innerText = postalCode;
                summaryContactNumber.innerText = contactNumber;

                summaryItems.innerHTML = '';
                itemsInCart.forEach(function (item) {
                    const listItem = document.createElement('li');
                    listItem.innerText = `${item.name} - Php${item.price.toFixed(2)}`;
                    summaryItems.appendChild(listItem);
                });

                summaryTotalCost.innerText = totalCost.toFixed(2);

                orderSummaryContainer.classList.add('active');
            });

            function addItemToCart(itemName, itemPrice) {
                itemsInCart.push({ name: itemName, price: itemPrice });
                totalCost += itemPrice;
                displayCartItems();
            }

            function displayCartItems() {
                cartItems.innerHTML = '';
                itemsInCart.forEach(function (item, index) {
                    const listItem = document.createElement('li');
                    listItem.innerText = `${item.name} - Php${item.price.toFixed(2)}`;
                    const removeBtn = document.createElement('button');
                    removeBtn.innerText = 'Remove';
                    removeBtn.addEventListener('click', function () {
                        removeItemFromCart(index);
                    });
                    listItem.appendChild(removeBtn);
                    cartItems.appendChild(listItem);
                });
                totalCostElement.innerText = totalCost.toFixed(2);
            }

            function removeItemFromCart(index) {
                totalCost -= itemsInCart[index].price;
                itemsInCart.splice(index, 1);
                displayCartItems();
            }
        });
