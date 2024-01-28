
// Product Form display for Admin
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
        // Refresh the displayed products
        displayProduct();
        // instance.postProducts();
    }
}


function editProduct(index: number) {

    console.log("Button edit clicked!");
    let products = JSON.parse(localStorage.getItem('products') || '[]') as Products[];

    if (index >= 0 && index < products.length) {

        // Get the current product and remove it from local storage
        const editedProduct = products.splice(index, 1)[0];
        localStorage.setItem('products', JSON.stringify(products));
        displayProduct();

        // edit at the form.
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
}


    //display products at Admin page
    function displayProduct() {
        let productContainer = document.querySelectorAll('.all-products') as NodeListOf<HTMLDivElement>;

        for (const productElement of productContainer) {
            if (productElement instanceof HTMLDivElement) {
                productElement.innerHTML = '';
            }
        }

        // Dynamically render products by inner HTML
        let getProducts:Products [] = JSON.parse(localStorage.getItem('products') || '[]') ;
        // console.log(getProducts);
        
        getProducts.forEach((product: Products, index: number) => {
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
                <button class="post-button" data-product-index="${index}">Post</button>
                <button class="post-button" data-product-index="${index}" onclick="editProduct(${index})">edit</button>
                <button class="delete-button" data-product-index="${index}" onclick="deleteProduct(${index})">delete</button>
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

            // Save to local storage
            localStorage.setItem("products", JSON.stringify(productsArray));

            // Clear form fields
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

function displayHome() {
    let productHomepage = document.getElementById("productHomepage") as HTMLDivElement | null;

    // Check if productHomepage is not null and has at least one element
    if (productHomepage instanceof HTMLDivElement) {
        productHomepage.innerHTML = ''; 

        let products: Products[] = JSON.parse(localStorage.getItem('products') || '[]') as Products[];

        // Clear existing elements
        for (const product of products) {
            const productElement = document.createElement('div');
            productElement.innerHTML = `

                <div class="user-product">
                    <img class="userImg" src="${product.imageUrl}" alt="Product Image">
                    <h3>${product.productName}</h3>
                    <p>Brand: ${product.brand}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <p>Description: ${product.description}</p>
                </div>
                
            `;

            // Append the productElement to productHomepage
            productHomepage.appendChild(productElement);
        }
    } 
        else {
            console.error("Error: Could not find #productHomepage element in the DOM.");
        }
}

// Call displayHome to render products on the homepage

    // Your entire script here

    // Call displayHome to render products on the homepage
    displayHome();

