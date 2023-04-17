function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}
var invested_amount = 0;
var totalPValue = 0;
function callvalue(){ 
    var i = 0;
    var stockname= document.getElementById("stocks");
    var quantity= document.getElementById("quantity");
    var buyprice= document.getElementById("buyprice"); 
    var currentprice= document.getElementById("currentprice");
    var tbuyprice = quantity.value*buyprice.value
    var tcurrentprice = quantity.value*currentprice.value
    let profitloss = ((tbuyprice-tcurrentprice)/tbuyprice)*100;
    invested_amount += tbuyprice;
    totalPValue += tcurrentprice;
    var tp = totalPValue-invested_amount
    var tpl = (tp/invested_amount)*100;
    document.getElementById("tp").innerHTML = "₹"+totalPValue;
    document.getElementById("ia").innerHTML = "₹"+invested_amount;
    document.getElementById("tpl").innerHTML = tpl;
    document.getElementById("pl").innerHTML = "₹"+(totalPValue-invested_amount);

    let lable = document.getElementById("pl"); 
    let color = lable.style.backgroundColor;
    if (tp >=0) {
        lable.style.color = 'green';
    } else {
        lable.style.color = 'red';
    }
    if (stockname!='') 
    {   
        i++;  
        var node = document.createElement('div');   


        // '<div class="card '+i+'" style="width: 18rem;">
        //     <img class="card-img-top" src="..." alt="Card image cap"></img>
        //     <div class="card-body">
        //         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //     </div>
        // </div>'
        
        node.innerHTML = '<label for="check' + i + '" style="margin-right: 10%;margin-left: 5%;">'+ stockname.value +'</label>'+
        '<label for="check' + i + '" style="margin-right: 10%;margin-left: 8%;">'+ quantity.value +'</label>'+
        '<label for="check' + i + '" style="margin-right: 10%;margin-left: 9%;">'+ currentprice.value +'</label>'+
        '<label for="check' + i + '" style="margin-right: 10%;margin-left: 9%;">'+ (quantity.value*buyprice.value) +'</label>'+
        '<label for="check' + i + '" style="margin-right: 10%;margin-left: 10%;">'+ profitloss +'</label>';       

        document.getElementById('container').appendChild(node);    
    }
}

function access(){
    var mail = document.getElementById("email");
    var pass = document.getElementById("password");
    if (mail.value == 'admin' && pass.value == 'admin') {
        window.location.href = "index.html"
    } else {
        alert("Email or Password Incorrect")
    }
}

