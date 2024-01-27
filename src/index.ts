
document.addEventListener('DOMContentLoaded', function () {
// Product Form
let productForm = document.querySelector('#productForm') as HTMLFormElement;

let homeproduct = document.getElementById("producthommy") as HTMLDivElement;

// Product Details
let productName = document.getElementById('productName') as HTMLInputElement;
let brand = document.getElementById('brand') as HTMLInputElement;
let price = document.getElementById('price') as HTMLInputElement;
let category = document.getElementById('category') as HTMLInputElement;
let description = document.getElementById('description') as HTMLInputElement;
let imageUrl = document.getElementById('imageUrl') as HTMLInputElement;

let displayHome = document.querySelectorAll('.productsHome') as NodeListOf<HTMLDivElement>;

// Current product Index
let productCurrent: number;

// Product Interface
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


class ProductDisplay {

    //display products
    displayProduct() {

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
                </div>
            
                </div>    
            `;

            if (productContainer.length > 0) {
                productContainer[0].appendChild(allProduct); 
            }
        });
    }


    postProducts() {
       
        // Clear existing elements
        for (const homeElement of displayHome) {
            if (homeElement instanceof HTMLDivElement) {
                homeElement.innerHTML = '';
            }
        }
    
        let display:Products []  = JSON.parse(localStorage.getItem('products') || '[]');

        console.log(display);
        
    
        display.forEach((item: Products, index: number) => {

            const homeproducts = document.createElement('div');
    
            homeproducts.innerHTML = `
                <div class="adminpanel">
                    <div>
                        <img class="adminImg" src="${item.imageUrl}" alt="Product Image">
                    </div>
                    <div class="adminText">
                        <h3>${item.productName}</h3>
                        <p>Brand: ${item.brand}</p>
                        <p>Price: ${item.price}</p>
                        <p>Category: ${item.category}</p>
                        <p>Description: ${item.description}</p>
                        <button class="post-button" data-product-index="${index}">Post</button>
                    </div>
                </div>
            `;



            if (homeproduct) {

                homeproduct.appendChild(homeproducts); 
            }
    
 
        });
    }

}



productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let product = productName.value.trim() !== "" && brand.value.trim() !== "" &&
                  price.value.trim() !== "" && category.value.trim() !== "" &&
                  description.value.trim() !== "" && imageUrl.value.trim() !== "";

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

        if (productCurrent !== undefined) {
            productsArray.splice(productCurrent, 1, newProduct);
        } else {
            productsArray.push(newProduct);

            // Save to local storage
            localStorage.setItem("products", JSON.stringify(productsArray));
        }

        productName.value = '';
        brand.value = '';
        price.value = '';
        category.value = '';
        description.value = '';
        imageUrl.value = '';
        instance.displayProduct();
        instance.postProducts();
         
    }


});

let instance = new ProductDisplay();
 instance.displayProduct();
 instance.postProducts();

});