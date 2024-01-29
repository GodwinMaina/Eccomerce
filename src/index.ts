
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

        // edit at the form populate to form.
        productName.value = editedProduct.productName || '';
        brand.value = editedProduct.brand || '';
        price.value = editedProduct.price || '';
        category.value = editedProduct.category || '';
        description.value = editedProduct.description || '';
        imageUrl.value = editedProduct.imageUrl || '';

        productCurrent = index;
    
        // Scroll to the top of the form
        // productForm.scrollIntoView({ behavior: 'smooth' });
    }
};

    //display products at Admin page
    function displayProduct() {
        let productContainer = document.querySelectorAll('.all-products') as NodeListOf<HTMLDivElement>;

        for (const productElement of productContainer) {
            if (productElement instanceof HTMLDivElement) {
                productElement.innerHTML = '';
            }
        }

        let getProducts:Products [] = JSON.parse(localStorage.getItem('products') || '[]') ;
        // console.log(getProducts);
        
        getProducts.forEach((product: Products, index: number) => {
               // Dynamically render products by inner HTML
            const allProduct = document.createElement('div');
        
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

            if (productContainer.length > 0) {
                productContainer[0].appendChild(allProduct); 
            }
        });
    }


 // Event listener to Admin Form
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

            if (productCurrent !== null && productCurrent !== undefined) {
                // If productCurrent is not null or undefined, it means an existing product is being updated
                productsArray.splice(productCurrent, 1, newProduct);
                productCurrent = null; // Reset productCurrent after the update
            } else {
                // If productCurrent is null or undefined, it means a new product is being created
                productsArray.push(newProduct);
            }
            // Save to local storage what is in form
            localStorage.setItem("products", JSON.stringify(productsArray));

            // Clear form fields after save
            productName.value = "";
            brand.value = "";
            price.value = "";
            category.value = "";
            description.value = "";
            imageUrl.value = "";

            displayProduct();
        }
    });
}

displayProduct();

//display to user products from local storage
function displayHome() {
    let productHomepage = document.getElementById("productHomepage") as HTMLDivElement | null;

    // Check if productHomepage is not null and has at least one element
    if (productHomepage instanceof HTMLDivElement) {
        productHomepage.innerHTML = ''; 

        let products: Products[] = JSON.parse(localStorage.getItem('products') || '[]') as Products[];
        // Clear existing elements if exist but none
        for (const product of products) {
            const productElement = document.createElement('div');

            productElement.innerHTML = `
                <div class="userProduct">
                    <img class="userImg" src="${product.imageUrl}" alt="Product Image">
                    <h2 class="orderName">${product.productName}</h2>
                    <p class="userPrice">$ ${product.price}</p>
                    <p class="userPrice">id ${product.id}</p>
                    <!-- 
                    <p class="userBrand" >Brand: ${product.brand}</p>
                    <p>Category: ${product.category}</p>
                    -->
                    <h3>${product.description}</h3>
                    <button class="userBtn" onclick="addToCart(${product.id})">Buy Now</button>
                </div>
                
            `;
            productHomepage.appendChild(productElement);
        }
    } 
        else {
            console.error("Error: Could not find #productHomepage element in the DOM.");
        }
}

  // Call displayHome to render products on the homepage
displayHome();



//cart functionality

let cart:any[] = [];

let cartBtn = document.querySelector('.userBtn') as HTMLButtonElement

let a = document.querySelector('.orderName') as HTMLElement;
let b = document.querySelector('.userPrice') as HTMLElement;

function addToCart(){

    let order = {

        name:a.textContent,
        price:b.textContent
    }

    cart.push(order);

    localStorage.setItem('orders',JSON.stringify(cart));

   

}

cartBtn.addEventListener('click',function(){

    addToCart();

})



    // let selected = products.find(product => product.id === productId);

    // if (selected) {
    //     // Add the selected product to the cart
    //     cart.push(selected);

    //     // Update the cart display
    //     updateCartDisplay();

    // } else {
    //     console.error('Product not found');
    // }








//scroll to product div by click shop now
const scrollBtn = document.querySelector('.shopbtn') as HTMLElement | null;
const target = document.getElementById('productHomepage') as HTMLElement | null;
    
if (scrollBtn && target) {
    scrollBtn.addEventListener('click', function() {
                // Scroll to the target div
        target.scrollIntoView({ behavior: 'smooth' });
            });

           
        } else {
            console.error("Error: Could not find one or more elements in the DOM.");
        }
    


        let cartContainer = document.getElementById('cartContainer');

        let cartImage = document.querySelector('.cart');      
        if (cartImage) {
            // You can manipulate the cart image element here if needed
            console.log('Cart image found:', cartImage);
        } else {
            console.error('Cart image not found');
        }