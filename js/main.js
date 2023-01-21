// clean data
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let abs = document.getElementById("abs");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submitt = document.getElementById("submitt");

let mood = "create";
let tmp;  //global varible

// get total
function getTotal(){
    if(price.value != ""){
        let result = ( +price.value + +taxes.value + +abs.value)
        - +discount.value ; 
       total.innerHTML = result;

       total.style.background = "#040";
    }
    else{
        total.innerHTML = "";
        total.style.background = "#a00d02"

    }
}
// create product
let products;
if(localStorage.product != null){
    products = JSON.parse(localStorage.product);
}
else{
    products = [];
}

submitt.onclick = function(e){
    e.preventDefault()
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        abs: abs.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category : category.value.toLowerCase()
    }
    // count
    if(title.value != ""){
        if(mood === 'create'){
                if(newPro.count > 1){
                for(let i = 0 ; i <= newPro.count ; i++ ){
                    products.push(newPro);
                }
            }else{
                products.push(newPro);
            }

            }else{
                products[tmp] = newPro;
                mood = 'create';
                submitt.innerHTML = "Create"
                count.style.display = "block";
    }
  } 
    
    // save localstorage

    localStorage.setItem('product', JSON.stringify(products));
    clearData();
    display();
    console.log(newPro);
}

// clear input

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    abs.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
}
// read
function display(){
    getTotal();

    let table = '';
    for(i =0 ; i<products.length ; i++){
        table +=
        `<tr>
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].abs}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="updateData(${i})" id="btnUpdate">update</button></td>
        <td><button onclick="deleteData(${i})" id="btnDelete">delete</button></td>
    </tr>`  
    }

    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");
    if(products.length>0){
        deleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All(${products.length}) </button> `
    }
    else{
        deleteAll.innerHTML = "";
    }
}
display();
// delete data

function deleteData(i){
    products.splice(i,1);
    localStorage.product = JSON.stringify(products);
    display();
}

function deleteAll(){
    localStorage.clear();
    products.splice(0);
    display();
}
// update

function updateData(i){
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    abs.value = products[i].abs;
    discount.value = products[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = products[i].category;
    submitt.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll(
        {
            top:0,
            behavior:"smooth"
        }
    )
}
//search
let searchMood = "title";

function getSearch(id){

   let search =document.getElementById("search");
   if(id =="searchTitle" ){
    searchMood = 'title';
    search.placeholder = "search by title";
   }else{
    searchMood = "category";
    search.placeholder = "search by category";
   }
   search.focus();  
   search.value = "";
   display();
}

function searchData(value){
    
    let table = "";
    if(searchMood == "title"){

        for(let i = 0 ; i < products.length ; i++){
            if(products[i].title.includes(value.toLowerCase())){
                table +=
                `<tr>
                <td>${i}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].abs}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick="updateData(${i})" id="btnUpdate">update</button></td>
                <td><button onclick="deleteData(${i})" id="btnDelete">delete</button></td>
            </tr>`
            }
        }

    }else{
        for(let i = 0 ; i < products.length ; i++){
            if(products[i].category.includes(value.toLowerCase())){
                table +=
                `<tr>
                <td>${i}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].abs}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick="updateData(${i})" id="btnUpdate">update</button></td>
                <td><button onclick="deleteData(${i})" id="btnDelete">delete</button></td>
            </tr>`
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}





