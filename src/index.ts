
// Product Form to display for Admin
let productForm = document.querySelector('#productForm') as HTMLFormElement | null;

// Product Details
let productName = document.getElementById('productName') as HTMLInputElement;
let brand = document.getElementById('brand') as HTMLInputElement;
let price = document.getElementById('price') as HTMLInputElement;
let category = document.getElementById('category') as HTMLInputElement;
let description = document.getElementById('description') as HTMLInputElement;
let imageUrl = document.getElementById('imageUrl') as HTMLInputElement;


// setting Current product Index
let productCurrent: number | null = null;

// Product Interface must have the structure
interface Products {
    id: number;
    productName: string;
    brand: string;
    price: string;
    category: string;
    description: string;
    imageUrl: string;
}


// Creating an array for putting our elements too.
let productsArray: Products[] = [];

function deleteProduct(index: number) {
    console.log("Button clicked!");
    let products = JSON.parse(localStorage.getItem('products') || '[]') as Products[];

    if (index >= 0 && index < products.length) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        // after delete refresh again and call this 
        displayProduct();
    }
}


function editProduct(index: number) {
    // console.log("Button edit clicked!"); 
    let products = JSON.parse(localStorage.getItem('products') || '[]') as Products[];

    if (index >= 0 && index < products.length) {
        // Get the current product and remove it from local storage
        const editedProduct = products.splice(index, 1)[0];
        localStorage.setItem('products', JSON.stringify(products));
        displayProduct();

        // edit at the form and the values populate  back to form.
        productName.value = editedProduct.productName || '';
        brand.value = editedProduct.brand || '';
        price.value = editedProduct.price || '';
        category.value = editedProduct.category || '';
        description.value = editedProduct.description || '';
        imageUrl.value = editedProduct.imageUrl || '';

        productCurrent = index;
    
    }
};

    //displaying products at Admin page
    function displayProduct() {
     
        let productCan = document.querySelectorAll('.all-products') as NodeListOf<HTMLDivElement>;

          //first clear to loop any innerHTML
        for (const productElement of productCan) {
            if (productElement instanceof HTMLDivElement) {
                productElement.innerHTML = '';
            }
        }

        let getProducts:Products [] = JSON.parse(localStorage.getItem('products') || '[]') ;
        // console.log(getProducts);
        
        getProducts.forEach((product: Products, index: number) => {
               // Dynamically render products by inner HTML
            const allProduct = document.createElement('div');
             //innerHTML render to the ADMIN
            allProduct.innerHTML = `
            <div class="adminpanel">
           <div>
           <img class="adminImg" src="${product.imageUrl}" alt="Product Image">
           </div>

           <div class="adminText">
                <h3>${product.productName}</h3>
                <p>Brand: ${product.brand}</p>
                <p>Price: ${product.price}</p>
                <p>Category: ${product.category}</p>
                <p>Description: ${product.description}</p>
                <button class="post-button" data-product-index="${index}" onclick="editProduct(${index})">edit</button>
                <button class="post-button" data-product-index="${index}" onclick="deleteProduct(${index})">delete</button>
                </div>
                </div>    
            `;

               //condition to check before I append is the productCan with length more than 1 if true append 
            if (productCan.length > 0) {
                productCan[0].appendChild(allProduct); 
            }
        });
    };


 // Event listener to Admin Form for adding products
 if (productForm) {
   
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let product = productName.value.trim() !== "" && brand.value.trim() !== "" && price.value.trim() !== "" && category.value.trim() !== "" && description.value.trim() !== "" && imageUrl.value.trim() !== "";
        
        if (product) {
            let newProduct = {
                id: productsArray.length + 1,
                productName: productName.value.trim(),
                brand: brand.value.trim(),
                price: price.value.trim(),
                category: category.value.trim(),
                description: description.value.trim(),
                imageUrl: imageUrl.value.trim(),
            };

            //check not null or undefined if not edit existing product
            if (productCurrent !== null && productCurrent !== undefined) {
                productsArray.splice(productCurrent, 1, newProduct);
                productCurrent = null; // Reset productCurrent after the update
            }
             
            else {
                //if null or undefined then push the new product to the Array
                productsArray.push(newProduct);
            }

            // Save to local storage what was in form
            localStorage.setItem("products", JSON.stringify(productsArray));
            
            // Clear form fields after save
            productName.value = "";
            brand.value = "";
            price.value = "";
            category.value = "";
            description.value = "";
            imageUrl.value = "";
 
        };

        displayProduct();
    });
};


displayProduct();

//function to display to user products from local storage/ same products in Admin
function displayHome() {

    let productHomepage = document.getElementById("productHomepage") as HTMLDivElement | null;

    // Check if productHomepage is not null and has at least one element
    if (productHomepage instanceof HTMLDivElement) {
        productHomepage.innerHTML = ''; 

        let products: Products[] = JSON.parse(localStorage.getItem('products') || '[]') as Products[];
        // Clear existing elements if exist but none
            
        products.forEach((product: Products, index: number) => {
            const productElement = document.createElement('div');

            productElement.innerHTML = `
                <div class="userProduct">
                    <img class="userImg" src="${product.imageUrl}" alt="Product Image">
                    <h2 class="orderName">${product.productName}</h2>
                    <p class="userPrice">$ ${product.price}</p>
                    <!-- 
                    <p class="userPrice">id ${product.id}</p>
                    <p class="userBrand" >Brand: ${product.brand}</p>
                    <p>Category: ${product.category}</p>
                   
                <h3>${product.description}</h3>
                -->
                    <button class="userBtn"  data-id="${product.id}" onclick="addToCart()">Buy Now</button>
                </div>
                
            `;

            if (productHomepage) {
                productHomepage.appendChild(productElement); 
            };
        })
    } 

        else {
            console.error("Error: Could not find #productHomepage element in the DOM.");
        }     
}

  // Call displayHome to render products on the homepage
displayHome();


//scroll to product div by click shop now
const scrollBtn = document.querySelector('.shopbtn') as HTMLElement | null;
const target = document.getElementById('productHomepage') as HTMLElement | null;
if (scrollBtn && target) {
    scrollBtn.addEventListener('click', function() {
                // Scroll to the target div
        target.scrollIntoView({ behavior: 'smooth' });
            });
    
        } else {
            console.error("Errrrrrr");
        }
    
      

//CART 
function addToCart(productId:number) {
    let cart = JSON.parse(localStorage.getItem('orders') || '[]');
    let products = JSON.parse(localStorage.getItem('products') || '[]');

    // Check if the product is already in the cart
    const existingItem = cart.find((item:Products) => item.id === productId);

    if (existingItem) {
        // If the product is already in the cart, you may want to update quantity or take appropriate action
        console.log('Product already in cart:', existingItem);
    } else {
        // Find the clicked product based on productId
        const selectedProd = products.find((product:Products) => product.id === productId);


        if (selectedProd) {

            const order = {
                id: selectedProd.id,
                imageUrl:selectedProd.imageUrl,
                productName: selectedProd.productName,
                price: selectedProd.price
            };

            // Add the new item to the existing cart
            cart.push(order);

            // Store the updated cart back in local storage
            localStorage.setItem('orders', JSON.stringify(cart));
        }
    }
    
}


// Add event listeners dynamically to each product button
const userShop = document.querySelectorAll('.userBtn');
userShop.forEach((button)=> {
    button.addEventListener('click', function (this: HTMLButtonElement) {
        let prodId = this.getAttribute('data-id');

        if (prodId) {
            let productId = parseInt(prodId, 10);
            addToCart(productId);
        }
        //I called this so that whenever button is clicked to add item also cart count updates.
        updateCartUI();
    });
});


//update the UI cart count with added products
function updateCartUI() {

    let cart = JSON.parse(localStorage.getItem('orders') || '[]');

    // Update cart count
    const cartCount = document.getElementById('cart-count') as HTMLElement;
if (cartCount) {
    cartCount.textContent = cart.length.toString();
}


    // Display added products
    const addedProd = document.createElement('div') as HTMLElement;
    addedProd.innerHTML = '';

    cart.forEach((order:Products) => {
        const productB = document.createElement('div');
        productB.textContent = `${order.productName}  ${order.price}`;
        addedProd.appendChild(productB);
    });

    const cartIcon = document.querySelector('.cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
};

// Initial UI update on page load
updateCartUI();


 
const cartPaged = document.getElementById('displayCart') as HTMLElement;
// Function to display cart contents on the cart page
function displayCart() {

    if (cartPaged) {
        
        cartPaged.innerHTML = '';
        let cart = JSON.parse(localStorage.getItem('orders') || '[]');
        
        cart.forEach((order: Products) => {
            const cartInfo = document.createElement('div');

            cartInfo.innerHTML = `

            <img src="${order.imageUrl}" alt="Product Image">  <br> <br>
            
            ${order.productName}  <br><br>

            
           $ ${order.price} <br><br>

            <button onclick=>plus</button>
            <button>minus</button>
            
            
            `;
            cartPaged.appendChild(cartInfo);
        });

    updateCartUI();
    }
}

// Call the function to display cart contents when the cart page loads
displayCart();














