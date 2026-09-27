const products = [
  {
    id: 1,
    name: "Echo Dot Smart Speaker",
    category: "electronics",
    price: 49,
    oldPrice: 79,
    rating: 4.8,
    reviews: 1283,
    tag: "Best seller",
    image:
      "https://images.unsplash.com/photo-1543512214-1265f1ef0f11?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Modern Wireless Headphones",
    category: "electronics",
    price: 129,
    oldPrice: 199,
    rating: 4.7,
    reviews: 908,
    tag: "Top pick",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Classic Leather Jacket",
    category: "fashion",
    price: 149,
    oldPrice: 219,
    rating: 4.6,
    reviews: 564,
    tag: "New",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    category: "home",
    price: 67,
    oldPrice: 99,
    rating: 4.9,
    reviews: 785,
    tag: "Trending",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Hydrating Face Serum",
    category: "beauty",
    price: 34,
    oldPrice: 52,
    rating: 4.5,
    reviews: 642,
    tag: "Popular",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Sport Running Shoes",
    category: "sports",
    price: 118,
    oldPrice: 169,
    rating: 4.8,
    reviews: 1120,
    tag: "Hot deal",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "4K Smart TV",
    category: "electronics",
    price: 499,
    oldPrice: 649,
    rating: 4.9,
    reviews: 512,
    tag: "Limited",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Cotton Lounge Set",
    category: "fashion",
    price: 76,
    oldPrice: 109,
    rating: 4.4,
    reviews: 430,
    tag: "Fresh",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "Air Fryer Deluxe",
    category: "home",
    price: 89,
    oldPrice: 129,
    rating: 4.7,
    reviews: 1009,
    tag: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Glow Facial Kit",
    category: "beauty",
    price: 42,
    oldPrice: 61,
    rating: 4.6,
    reviews: 720,
    tag: "Editor’s pick",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "Fitness Dumbbell Set",
    category: "sports",
    price: 95,
    oldPrice: 130,
    rating: 4.8,
    reviews: 831,
    tag: "Gym",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 69,
    oldPrice: 99,
    rating: 4.7,
    reviews: 687,
    tag: "Value",
    image:
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=80"
  }
];

let cart = JSON.parse(localStorage.getItem("primeCart")) || [];
let activeCategory = "all";
let searchTerm = "";
let sortBy = "featured";

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const subtotalValue = document.getElementById("subtotalValue");
const shippingValue = document.getElementById("shippingValue");
const totalValue = document.getElementById("totalValue");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm = document.getElementById("checkoutForm");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove("show"), 1800);
}

function saveCart() {
  localStorage.setItem("primeCart", JSON.stringify(cart));
}

function getFilteredProducts() {
  let filtered = products.filter((product) => {
    const categoryMatches = activeCategory === "all" || product.category === activeCategory;
    const termMatches =
      searchTerm.trim() === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatches && termMatches;
  });

  if (sortBy === "lowToHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

function renderProducts() {
  if (!productGrid) return;

  const filteredProducts = getFilteredProducts();

  if (!filteredProducts.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No products found</h3>
        <p>Try another keyword or category.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card" data-id="${product.id}">
          <div class="product-image-wrap">
            <img src="${product.image}" alt="${product.name}" />
            <button type="button" class="favorite-btn" aria-label="Add to favorites">♥</button>
            <span class="product-badge">${product.tag}</span>
          </div>

          <div class="product-info">
            <div class="product-meta">
              <span>${product.category}</span>
              <span class="rating"><span>★</span> ${product.rating}</span>
            </div>

            <h3 class="product-name">${product.name}</h3>

            <div class="product-price-row">
              <div>
                <span class="price">${formatCurrency(product.price)}</span>
                <span class="old-price">${formatCurrency(product.oldPrice)}</span>
              </div>
              <button class="add-cart-btn" type="button" data-add-id="${product.id}">Add</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function updateCartSummary() {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length ? (subtotal > 150 ? 0 : 15) : 0;
  const total = subtotal + shipping;

  subtotalValue.textContent = formatCurrency(subtotal);
  shippingValue.textContent = formatCurrency(shipping);
  totalValue.textContent = formatCurrency(total);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCart() {
  if (!cartItems) return;

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <h4>Your cart is empty</h4>
        <p>Add some products to continue shopping.</p>
      </div>
    `;
    updateCartSummary();
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h4>${item.name}</h4>
            <div class="item-price">${formatCurrency(item.price)}</div>
            <div class="quantity-controls">
              <button type="button" data-decrease-id="${item.id}">-</button>
              <span class="item-quantity">${item.quantity}</span>
              <button type="button" data-increase-id="${item.id}">+</button>
            </div>
          </div>
          <div>
            <button type="button" class="item-remove" data-remove-id="${item.id}">Remove</button>
          </div>
        </div>
      `
    )
    .join("");

  updateCartSummary();
}

function addToCart(productId) {
  const product = products.find((item) => item.id === Number(productId));
  if (!product) return;

  const existingItem = cart.find((item) => item.id === Number(productId));
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  openCart();
  showToast(`${product.name} added to cart`);
}

function updateCartItem(productId, change) {
  const item = cart.find((entry) => entry.id === Number(productId));
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((entry) => entry.id !== Number(productId));
  }

  saveCart();
  renderCart();
}

function removeCartItem(productId) {
  cart = cart.filter((entry) => entry.id !== Number(productId));
  saveCart();
  renderCart();
  showToast("Item removed from cart");
}

function openCart() {
  if (!cartPanel || !cartOverlay) return;
  cartPanel.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  if (!cartPanel || !cartOverlay) return;
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("open");
}

function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".category-pill").forEach((button) => {
    const matches = button.dataset.category === category;
    button.classList.toggle("active", matches);
  });
  renderProducts();
}

function bindStaticEvents() {
  document.querySelector(".cart-btn")?.addEventListener("click", openCart);
  document.querySelector(".close-cart")?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);

  document.querySelectorAll(".category-pill").forEach((button) => {
    button.addEventListener("click", () => setCategory(button.dataset.category));
  });

  sortSelect?.addEventListener("change", (event) => {
    sortBy = event.target.value;
    renderProducts();
  });

  searchInput?.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderProducts();
  });

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add-id]");
    if (addButton) {
      addToCart(addButton.dataset.addId);
      return;
    }

    const increaseButton = event.target.closest("[data-increase-id]");
    if (increaseButton) {
      updateCartItem(increaseButton.dataset.increaseId, 1);
      return;
    }

    const decreaseButton = event.target.closest("[data-decrease-id]");
    if (decreaseButton) {
      updateCartItem(decreaseButton.dataset.decreaseId, -1);
      return;
    }

    const removeButton = event.target.closest("[data-remove-id]");
    if (removeButton) {
      removeCartItem(removeButton.dataset.removeId);
    }
  });

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (!cart.length) {
      showToast("Your cart is empty");
      return;
    }

    closeCart();
    checkoutModal?.classList.remove("hidden");
  });

  document.querySelector(".close-modal")?.addEventListener("click", () => {
    checkoutModal?.classList.add("hidden");
  });

  checkoutForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    checkoutModal?.classList.add("hidden");
    cart = [];
    saveCart();
    renderCart();
    showToast("Payment successful! Order placed.");
  });

  document.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest(".favorite-btn");
    if (favoriteButton) {
      favoriteButton.classList.toggle("active");
      showToast(favoriteButton.classList.contains("active") ? "Saved to wishlist" : "Removed from wishlist");
    }
  });
}

function bindAuthForms() {
  document.getElementById("loginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Login successful");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 850);
  });

  document.getElementById("signupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Account created successfully");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 900);
  });
}

function init() {
  renderProducts();
  renderCart();
  bindStaticEvents();
  bindAuthForms();
}

init();
