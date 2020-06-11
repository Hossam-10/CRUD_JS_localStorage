/*
var array = [ {color:"red", model:"Toyota", date:"2024"} , 2345445 , "Hossam" , true ];

for(var i = 0 ; i<array.length ; i++)
    {
        console.log(array[i]);
    }

var arr = [
    
    {name:"Mariam" , age:19, gender:"female"} , 
    
    {name:"Hossam" , age:22, gender:"male"} , 
    
    {name:"Mona" , age:55, gender:"female"} , 
    
    {name:"Mahmoud" , age:58, gender:"male"} 
  
];

var temp = "";

for(var i = 0 ; i<arr.length ; i++)
    {
      temp += `<tr>
                
                    <td>`+arr[i].name+`</td>
                    <td>`+arr[i].age+`</td>
                    <td>`+arr[i].gender+`</td>
                
                </tr>  `
    }

document.getElementById("demo").innerHTML = temp;

if(nameRegex.test(xName) == true && priceRegex.test(xPrice) == true && companyRegex.test(xCompany) == true && descRegex.test(xDesc) == true)
*/





var nameRegex = /^[A-Za-z][A-Za-z0-9]{1,20}$/;
var priceRegex = /^([1-9][0-9][0-9][0-9]|10000)$/;
var companyRegex = /^[A-Za-z]{1,13}$/;
var descRegex = /^[A-Za-z0-9]{1,50}$/;

var productNameInp = document.getElementById("productName");

var productPriceInp = document.getElementById("productPrice");

var productCompanyInp = document.getElementById("productCompany");

var productDescInp = document.getElementById("productDesc");

var search = document.getElementById("searchInput");
var searchV = search.value;
var alert = document.getElementById("alert");

var update = document.getElementById("updateBtn");
var productsContainer;
var currentIndex = 0 ;



if(localStorage.getItem("productsContainer") == null)
    {
        productsContainer = [];
    }
else
    {
        productsContainer = JSON.parse(localStorage.getItem("productsContainer"));
        displayProducts();
    }

var myBtn = document.getElementById("addBtn");

myBtn.onclick = function()
{
            addProduct();
            clearForm();
            displayProducts();
    
};

function addProduct()
{
    var product = { name:productNameInp.value , price:productPriceInp.value , company:productCompanyInp.value , desc:productDescInp.value};
    
    productsContainer.push(product);
    
    localStorage.setItem("productsContainer" , JSON.stringify(productsContainer) );
};

function clearForm()
{
    var list = document.getElementsByClassName("form-control");
    for(var i = 0 ; i<list.length ; i++)
        {
            list[i].value = "";
        }
};

function displayProducts()
{
    var cols = "";
    
    for(var i = 0 ; i<productsContainer.length ; i++)
        {
            cols += `<div class="col-md-3 mt-5">
                        <div>
                            <h3 class="text-danger">`+productsContainer[i].name+`</h3>
                            <p class="text-info">`+productsContainer[i].price+`</p>
                            <h4>`+productsContainer[i].company+`</h4>
                            <p>`+productsContainer[i].desc+`</p>
                            <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button>
                            <button onclick="setForm(`+i+`)" class="btn btn-success">Update</button>
                        </div>
                      </div>`
        }
    
    document.getElementById('productsRow').innerHTML = cols;
};

function deleteProduct(idd)
{
    productsContainer.splice(idd , 1);
    displayProducts();
    
    localStorage.setItem("productsContainer" , JSON.stringify(productsContainer) );
};


function setForm(id)
{
    document.getElementById("productName").value = productsContainer[id].name;
    document.getElementById("productPrice").value = productsContainer[id].price;
    document.getElementById("productCompany").value = productsContainer[id].company;
    document.getElementById("productDesc").value = productsContainer[id].desc;
    
    productsContainer[id].desc = productsContainer[id].desc;
    document.getElementById("updateBtn").disabled = false;
    currentIndex = id;
};


update.onclick = function()
{
    productsContainer[currentIndex].name = document.getElementById("productName").value;
    productsContainer[currentIndex].price = document.getElementById("productPrice").value;
    productsContainer[currentIndex].company = document.getElementById("productCompany").value; 
    productsContainer[currentIndex].desc = document.getElementById("productDesc").value;
    
    displayProducts();
    localStorage.setItem("productsContainer" , JSON.stringify(productsContainer) );
    document.getElementById("updateBtn").disabled = true;
    clearForm();
    
    
};



search.onkeyup = function()
{
    var temp = "";
    
    for(var i = 0 ; i<productsContainer.length ; i++)
        {
            if(productsContainer[i].name.includes(search.value) || (productsContainer[i].name.toLowerCase()).includes(search.value))
                {
                    temp += `<div class="col-md-3 mt-5">
                                    <div>
                                        <h3 class="text-danger">`+productsContainer[i].name+`</h3>
                                        <p class="text-info">`+productsContainer[i].price+`</p>
                                        <h4>`+productsContainer[i].company+`</h4>
                                        <p>`+productsContainer[i].desc+`</p>
                                    </div>
                            </div>`
                }
        }
    
    document.getElementById("searchRow").innerHTML = temp;
}

























