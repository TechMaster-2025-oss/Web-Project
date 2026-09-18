// =====================================================
// PRODUCTS
// =====================================================

const products = [

    {
        id: 1,
        name: "Laptop",
        category: "electronics",
        price: 65000,
        image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    },

    {
        id: 2,
        name: "Smartphone",
        category: "electronics",
        price: 30000,
        image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },

    {
        id: 3,
        name: "Headphones",
        category: "accessories",
        price: 4500,
        image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        id: 4,
        name: "T-Shirt",
        category: "clothes",
        price: 1500,
        image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },

    {
        id: 5,
        name: "Sneakers",
        category: "shoes",
        price: 5500,
        image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
        id: 6,
        name: "Smart Watch",
        category: "accessories",
        price: 8000,
        image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 7,
        name: "Jacket",
        category: "clothes",
        price: 4500,
        image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5"
    },

    {
        id: 8,
        name: "Gaming Mouse",
        category: "electronics",
        price: 2500,
        image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db"
    }

];


// =====================================================
// CART
// =====================================================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(productList = products) {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    productList.forEach(product => {

        const div =
            document.createElement("div");

        div.className = "product";

        div.innerHTML = `

            <button
                class="wishlist"
                onclick="addToWishlist(${product.id})">
                ❤️
            </button>

            <img
                src="${product.image}"
                alt="${product.name}">

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Category:
                    ${product.category}
                </p>

                <p class="price">
                    KSh ${product.price.toLocaleString()}
                </p>

                <button
                    onclick="addToCart(${product.id})">
                    🛒 Add To Cart
                </button>

            </div>
        `;

        container.appendChild(div);

    });
}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    saveCart();

    updateCartCount();

    alert(product.name + " added to cart!");

}


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// =====================================================
// CART COUNT
// =====================================================

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    document.getElementById(
        "cartCount"
    ).textContent = count;

}


// =====================================================
// SHOW CART
// =====================================================

function showCart() {

    const modal =
        document.getElementById("cartModal");

    modal.style.display = "block";

    displayCart();

}


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    const container =
        document.getElementById("cartItems");

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your cart is empty.</p>";

        document.getElementById(
            "cartTotal"
        ).textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.quantity;

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}">

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    KSh ${item.price.toLocaleString()}
                </p>

            </div>

            <div class="quantity">

                <button
                    onclick="changeQuantity(
                        ${item.id}, -1
                    )">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(
                        ${item.id}, 1
                    )">
                    +
                </button>

            </div>

            <button
                onclick="removeFromCart(${item.id})">
                🗑️
            </button>

        `;

        container.appendChild(div);

    });

    document.getElementById(
        "cartTotal"
    ).textContent =
        total.toLocaleString();

}


// =====================================================
// CHANGE QUANTITY
// =====================================================

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }

    saveCart();

    updateCartCount();

    displayCart();

}


// =====================================================
// REMOVE FROM CART
// =====================================================

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveCart();

    updateCartCount();

    displayCart();

}


// =====================================================
// SEARCH
// =====================================================

function searchProducts() {

    const search =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();

    const results =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(search)
        );

    displayProducts(results);

}


// =====================================================
// CATEGORY FILTER
// =====================================================

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;
    }

    const results =
        products.filter(
            product =>
                product.category === category
        );

    displayProducts(results);

}


// =====================================================
// REGISTRATION
// =====================================================

function register(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "registerName"
        ).value;

    const email =
        document.getElementById(
            "registerEmail"
        ).value;

    const phone =
        document.getElementById(
            "registerPhone"
        ).value;

    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    const exists =
        users.find(
            user => user.email === email
        );


    if (exists) {

        alert(
            "An account with this email already exists."
        );

        return;
    }


    const newUser = {

        name,
        email,
        phone,
        password

    };


    users.push(newUser);


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    alert(
        "Registration successful!"
    );


    closeModal("registerModal");

    openLogin();

}


// =====================================================
// LOGIN
// =====================================================

function login(event) {

    event.preventDefault();

    const email =
        document.getElementById(
            "loginEmail"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    const user =
        users.find(
            user =>
                user.email === email &&
                user.password === password
        );


    if (!user) {

        alert(
            "Incorrect email or password."
        );

        return;
    }


    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );


    alert(
        "Welcome " + user.name
    );


    closeModal("loginModal");

    updateAuthUI();

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    alert(
        "You have been logged out."
    );

    updateAuthUI();

}


// =====================================================
// AUTH UI
// =====================================================

function updateAuthUI() {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    const loginButton =
        document.getElementById(
            "loginButton"
        );

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (currentUser) {

        loginButton.style.display =
            "none";

        logoutButton.style.display =
            "block";

    } else {

        loginButton.style.display =
            "block";

        logoutButton.style.display =
            "none";

    }

}


// =====================================================
// PROFILE
// =====================================================

function showProfile() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    if (!user) {

        alert(
            "Please login first."
        );

        openLogin();

        return;
    }


    document.getElementById(
        "profileName"
    ).textContent = user.name;


    document.getElementById(
        "profileEmail"
    ).textContent = user.email;


    document.getElementById(
        "profilePhone"
    ).textContent = user.phone;


    document.getElementById(
        "profileModal"
    ).style.display = "block";

}


// =====================================================
// EDIT PROFILE
// =====================================================

function openEditProfile() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    if (!user) {

        openLogin();

        return;
    }


    document.getElementById(
        "editName"
    ).value = user.name;


    document.getElementById(
        "editPhone"
    ).value = user.phone;


    closeModal("profileModal");


    document.getElementById(
        "editProfileModal"
    ).style.display = "block";

}


// =====================================================
// UPDATE PROFILE
// =====================================================

function updateProfile(event) {

    event.preventDefault();


    const user =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    const newName =
        document.getElementById(
            "editName"
        ).value;


    const newPhone =
        document.getElementById(
            "editPhone"
        ).value;


    user.name = newName;

    user.phone = newPhone;


    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );


    const users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];


    const index =
        users.findIndex(
            u => u.email === user.email
        );


    if (index !== -1) {

        users[index] = user;

    }


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    alert(
        "Profile updated successfully!"
    );


    closeModal(
        "editProfileModal"
    );

}


// =====================================================
// CHECKOUT
// =====================================================

function checkout() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    if (!user) {

        alert(
            "Please login before checkout."
        );

        openLogin();

        return;
    }


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        total.toLocaleString();


    closeModal("cartModal");


    document.getElementById(
        "checkoutModal"
    ).style.display = "block";

}


// =====================================================
// PLACE ORDER
// =====================================================

function placeOrder(event) {

    event.preventDefault();


    const user =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    const address =
        document.getElementById(
            "deliveryAddress"
        ).value;


    const payment =
        document.getElementById(
            "paymentMethod"
        ).value;


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    const order = {

        id:
            "ORD" +
            Date.now(),

        date:
            new Date().toLocaleString(),

        items:
            [...cart],

        total,

        address,

        payment

    };


    const orders =
        JSON.parse(
            localStorage.getItem(
                "orders"
            )
        ) || [];


    orders.push({

        email: user.email,

        ...order

    });


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    cart = [];


    saveCart();

    updateCartCount();


    alert(
        "Order placed successfully!"
    );


    closeModal(
        "checkoutModal"
    );


    document.getElementById(
        "deliveryAddress"
    ).value = "";

}


// =====================================================
// SHOW ORDERS
// =====================================================

function showOrders() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    if (!user) {

        openLogin();

        return;
    }


    const orders =
        JSON.parse(
            localStorage.getItem(
                "orders"
            )
        ) || [];


    const userOrders =
        orders.filter(
            order =>
                order.email === user.email
        );


    const container =
        document.getElementById(
            "orderList"
        );


    container.innerHTML = "";


    if (userOrders.length === 0) {

        container.innerHTML =
            "<p>You have no orders yet.</p>";

    }


    userOrders.forEach(order => {

        const div =
            document.createElement("div");


        div.className = "order";


        div.innerHTML = `

            <h3>
                Order:
                ${order.id}
            </h3>

            <p>
                Date:
                ${order.date}
            </p>

            <p>
                Payment:
                ${order.payment}
            </p>

            <p>
                Delivery:
                ${order.address}
            </p>

            <p>
                <strong>
                    Total:
                    KSh ${order.total.toLocaleString()}
                </strong>
            </p>

        `;


        container.appendChild(div);

    });


    document.getElementById(
        "ordersModal"
    ).style.display = "block";

}


// =====================================================
// WISHLIST
// =====================================================

function addToWishlist(id) {

    const product =
        products.find(
            product => product.id === id
        );


    let wishlist =
        JSON.parse(
            localStorage.getItem(
                "wishlist"
            )
        ) || [];


    const exists =
        wishlist.find(
            item => item.id === id
        );


    if (exists) {

        alert(
            "Already in wishlist."
        );

        return;
    }


    wishlist.push(product);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    alert(
        product.name +
        " added to wishlist ❤️"
    );

}


// =====================================================
// LOGIN MODAL
// =====================================================

function openLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "block";

}


// =====================================================
// REGISTER MODAL
// =====================================================

function openRegister() {

    document.getElementById(
        "registerModal"
    ).style.display = "block";

}


// =====================================================
// SWITCH LOGIN
// =====================================================

function switchToLogin() {

    closeModal(
        "registerModal"
    );

    openLogin();

}


// =====================================================
// SWITCH REGISTER
// =====================================================

function switchToRegister() {

    closeModal(
        "loginModal"
    );

    openRegister();

}


// =====================================================
// CLOSE MODAL
// =====================================================

function closeModal(id) {

    document.getElementById(
        id
    ).style.display = "none";

}


// =====================================================
// CLICK OUTSIDE MODAL
// =====================================================

window.onclick = function(event) {

    const modals =
        document.querySelectorAll(
            ".modal"
        );


    modals.forEach(modal => {

        if (event.target === modal) {

            modal.style.display =
                "none";

        }

    });

};


// =====================================================
// PROFILE LINK
// =====================================================

document.getElementById(
    "profileLink"
).addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        showProfile();

    }
);


// =====================================================
// ORDERS LINK
// =====================================================

document.querySelector(
    'a[href="#orders"]'
).addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        showOrders();

    }
);


// =====================================================
// DARK MODE
// =====================================================

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark"
    );


    const enabled =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "darkMode",
        enabled
    );

}


// =====================================================
// SCROLL TO PRODUCTS
// =====================================================

function scrollToProducts() {

    document.getElementById(
        "products"
    ).scrollIntoView();

}


// =====================================================
// LOAD DATA WHEN PAGE OPENS
// =====================================================

displayProducts();

updateCartCount();

updateAuthUI();


if (
    localStorage.getItem(
        "darkMode"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

}