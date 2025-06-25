const exchangeRate = 1 / 800; // 1 USD ≈ ₦800

const products = [
    {
        id: 1,
        name: "iPhone 16pro",
        price: 0,
        description: "iPhone 16pro with 12GB RAM, 512GB ROM",
        images: [
            "iphone16pro1.jpg",
            "iphone16pro2.jpg",
            "iphone16pro3.jpg"
        ]
    },
    {
        id: 2,
        name: "Samsung Fold 3",
        price: 0,
        description: "8GB RAM, 128GB ROM",
        images: [
            "fold2.jpg",
            "fold1.jpg",
            "fold3.jpg"
        ]
    },
        {
        id: 1,
        name: "Benz",
        price: 0,
        description: "Benz",
        images: [
            "car1.jpg"
        ]
    },
    {
        id: 2,
        name: "Benz",
        price: 0,
        description: "Benz",
        images: [
            "car2.jpg"
        ]
    },
        {
        id: 1,
        name: "Benz",
        price: 0,
        description: "Benz",
        images: [
            "car3.jpg"
        ]
    },
    {
        id: 2,
        name: "Benz",
        price: 0,
        description: "Benz",
        images: [
            "car4.jpg",
        ]
    },
        {
        id: 2,
        name: "Benz",
        price: 0,
        description: "Benz",
        images: [
            "car5.jpg",
        ]
    },
    // Add more products...
];

const cart = [];

function renderProducts() {
    const container = document.getElementById('product-list');
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = "bg-white p-4 rounded shadow";

        const usdPrice = (product.price * exchangeRate).toFixed(2);

        const thumbnails = product.images.map(img =>
            `<img src="${img}" class="w-12 h-12 object-cover cursor-pointer rounded border border-gray-300 hover:border-blue-500"
                  onclick="document.getElementById('main-img-${product.id}').src='${img}'">`
        ).join("");

        div.innerHTML = `
            <img id="main-img-${product.id}" src="${product.images[0]}" alt="${product.name}" 
                 class="w-full h-40 object-cover rounded mb-4">

            <div class="flex space-x-2 mb-4">${thumbnails}</div>

            <h2 class="text-xl font-bold">${product.name}</h2>
            <p class="text-sm text-gray-600">${product.description}</p>
            <p class="text-green-600 font-bold">$${usdPrice} USD</p>
            <button onclick="addToCart(${product.id})" class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) cart.push(product);
    alert(product.name + " added to cart!");
}

function openForm() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById('formModal').classList.remove('hidden');
    document.getElementById('formModal').classList.add('flex');
}

function closeForm() {
    document.getElementById('formModal').classList.add('hidden');
    document.getElementById('formModal').classList.remove('flex');
}

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!fullName || !phoneNumber || !email || !address) {
        alert("Please fill in all fields.");
        return;
    }

    const productList = cart.map((p, i) => {
        const usdPrice = (p.price * exchangeRate).toFixed(2);
        return `${i + 1}. ${p.name} - $${usdPrice} USD`;
    }).join("\\n");

    const customerDetails = `
Customer Name: ${fullName}
Phone Number: ${phoneNumber}
Email: ${email}
Delivery Address: ${address}
--------------------------
Order:
${productList}
    `;

    const encodedMessage = encodeURIComponent(customerDetails);
    const phone = "18707168975";
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(url, "_blank");
    closeForm();
});

window.onload = renderProducts;