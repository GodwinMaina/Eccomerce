
//product Form
let productForm = document.querySelector('.productForm') as HTMLFormElement

//product Details
let productName = document.getElementById('ProductName') as HTMLInputElement
let brand = document.getElementById('brand') as HTMLInputElement
let price = document.getElementById('price') as HTMLInputElement
let category = document.getElementById('category') as HTMLInputElement
let description = document.getElementById('description') as HTMLInputElement
let imageUrl = document.getElementById('imageUrl') as HTMLInputElement

//current product Index
let productCurrent:number;

//Product Interface
interface Products{
    id:number,
    productName:string;
    brand:string;
    price:string;
    category:string;
    description:string;
    imageUrl:string;
}

//creating an array for putting our elements too.
let products: Products [] = [];

productForm.addEventListener("submit", (e)=>{
    
    e.preventDefault();

    let product = productName.value.trim() != "" && brand.value.trim() != "" && price.value.trim() != "" && category.value.trim() != "" && description.value.trim() != "" && imageUrl.value.trim() != "" 

    if(product){

        let newProduct = {
            id: products.length + 1,
            productName: productName.value.trim(),
            brand: brand.value.trim(),
            price: price.value.trim(),
            category:category.value.trim(),
            description: description.value.trim(),
            imageUrl: imageUrl.value.trim(),     
        }

     if(productCurrent){
         products.splice(productCurrent, 1 , newProduct)
     }

     else{

        products.push(newProduct);
        console.log(products);

         //save to local storage
        localStorage.setItem ("products" , JSON.stringify(products)) 
       }

       productName.value=''
       brand.value=''
       price.value=''
       category.value=''
       description.value=''
       imageUrl.value=''
}

});



// class productDisplay{

//     displayProduct(){
//     let allproduct = document.querySelectorAll('.all-products') as NodeListOf<HTMLDivElement>
//     allproduct.forEach(el=>{
//         el.remove();
//     });

//    product of type Products
// //    dynamically render by inner HTML
//     products.forEach((product:Products, index:number)=>{

//         let prodacts = 


      
//         })

       








//     }
// }


    





