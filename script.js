// ================= INSTAGRAM OPEN =================
function openInstagramWeb() {
    const username = "_.aura_glow";

    const appUrl = `instagram://user?username=${username}`;
    const webUrl = `https://www.instagram.com/${username}/`;

    // Try opening Instagram App
    window.location.href = appUrl;

    // Fallback to web after 1 second
    setTimeout(() => {
        window.location.href = webUrl;
    }, 1000);
}


// ================= DROPDOWN =================
document.querySelectorAll('.drop-btn').forEach(button => {
    button.addEventListener('click', function () {

        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        const isOpen = content.style.display === "block";

        this.closest('.product-card')
            .querySelectorAll('.drop-content')
            .forEach(d => d.style.display = "none");

        this.closest('.product-card')
            .querySelectorAll('.drop-btn i')
            .forEach(i => i.className = "fas fa-chevron-down");

        if (!isOpen) {
            content.style.display = "block";
            icon.className = "fas fa-chevron-up";
        }
    });
});


// ================= CART =================
let cart = [];

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateUI();

    if (!document.getElementById("cart-sidebar").classList.contains("active")) {
        toggleCart();
    }
}

function updateUI() {
    const list = document.getElementById("cart-items-list");
    let total = 0;
    list.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        list.innerHTML += `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>
                Rs. ${item.price}
                <i class="fas fa-trash-alt"
                   style="color:red; cursor:pointer"
                   onclick="removeItem(${index})"></i>
            </span>
        </div>
        `;
    });

    document.getElementById("cart-total-price").innerText = total;
    document.getElementById("cart-count").innerText = cart.length;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateUI();
}


// ================= CHECKOUT =================
function checkout() {

    if (cart.length === 0) {
        alert("Bag is empty!");
        return;
    }

    let msg = "Hi Aura Glow! I want to order:\n\n";

    cart.forEach((item, i) => {
        msg += `${i + 1}. ${item.name} (Rs. ${item.price})\n`;
    });

    const total = document.getElementById("cart-total-price").innerText;
    msg += `\nTotal: Rs. ${total}`;

    // Copy to clipboard (modern method)
    navigator.clipboard.writeText(msg)
        .then(() => {
            alert("Order summary copied! Opening Instagram...");
            openInstagramWeb();
        })
        .catch(() => {
            alert("Could not copy message. Please copy manually.");
        });
}


// ================= SCROLL ANIMATION =================
window.addEventListener("scroll", () => {
    document.querySelectorAll(".fade-in").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
            el.classList.add("appear");
        }
    });
});
