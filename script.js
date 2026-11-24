const products = [
    {
        id: 1,
        name: "Velvet Matte Lip Cream",
        category: "Lips",
        price: 89000,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 2,
        name: "Dewy Glow Serum",
        category: "Skincare",
        price: 125000,
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 3,
        name: "Everyday Blush",
        category: "Makeup",
        price: 99000,
        image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 4,
        name: "Hydrating Face Cream",
        category: "Skincare",
        price: 145000,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 5,
        name: "Soft Nude Lipstick",
        category: "Lips",
        price: 79000,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 6,
        name: "Radiance Compact Powder",
        category: "Makeup",
        price: 110000,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 7,
        name: "Gentle Facial Cleanser",
        category: "Skincare",
        price: 95000,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 8,
        name: "Rosy Cheek Tint",
        category: "Makeup",
        price: 85000,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=85"
    }
];

let cart = [];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");

function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);
}

// MENAMPILKAN PRODUK

function displayProducts() {
    let filtered = products.filter(product => {
        const search = product.name.toLowerCase().includes(
            searchInput.value.toLowerCase()
        );

        const category =
            categoryFilter.value === "Semua" ||
            product.category === categoryFilter.value;

        return search && category;
    });

    if (sortSelect.value === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sortSelect.value === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    productGrid.innerHTML = "";

    document.getElementById("emptyState").hidden =
        filtered.length !== 0;

    filtered.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">
                    <small>${product.category}</small>
                    <h3>${product.name}</h3>
                    <p>${formatRupiah(product.price)}</p>

                    <button class="add-btn"
                        onclick="addToCart(${product.id})">
                        + Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

// PENCARIAN, FILTER DAN SORTING

searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);
sortSelect.addEventListener("change", displayProducts);

// TAMBAH KE KERANJANG

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    displayCart();
}

// TAMPILKAN KERANJANG

function displayCart() {
    const cartItems = document.getElementById("cartItems");

    document.getElementById("cartCount").textContent =
        cart.reduce((total, item) => total + item.quantity, 0);

    let subtotal = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Keranjang masih kosong ♡</p>";
    }

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${formatRupiah(item.price)}</p>

                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>

                    <button onclick="removeFromCart(${item.id})">
                        Hapus
                    </button>
                </div>
            </div>
        `;
    });

    document.getElementById("subtotal").textContent =
        formatRupiah(subtotal);
}

// UBAH JUMLAH PRODUK

function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        displayCart();
    }
}

// HAPUS PRODUK

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

// BUKA DAN TUTUP KERANJANG

const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

document.getElementById("cartOpen").onclick = () => {
    cartDrawer.classList.add("open");
    overlay.classList.add("show");
};

function closeCart() {
    cartDrawer.classList.remove("open");
    overlay.classList.remove("show");
}

document.getElementById("cartClose").onclick = closeCart;
overlay.onclick = closeCart;

// CHECKOUT

document.getElementById("checkoutBtn").onclick = () => {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
    } else {
        alert("Terima kasih! Ini masih website demo.");
    }
};

// DARK MODE

document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");

    document.getElementById("themeToggle").textContent =
        document.body.classList.contains("dark") ? "☀️" : "☾";
};

// MENU RESPONSIVE

document.getElementById("menuToggle").onclick = () => {
    document.getElementById("navbar").classList.toggle("open");
};

// FORM KONTAK

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 2 || !email || message.length < 5) {
        alert("Mohon periksa kembali formulir!");
        return;
    }

    document.getElementById("formMessage").textContent =
        "Terima kasih, " + name + "! Pesan berhasil divalidasi.";

    this.reset();
});

// TAMPILKAN PRODUK SAAT WEBSITE DIBUKA

displayProducts();
displayCart();