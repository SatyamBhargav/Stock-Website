function togglePopup() {
  document.getElementById("popup-1").classList.toggle("active");
}
var invested_amount = 0;
var totalPValue = 0;
function callvalue() {
  var i = 0;
  var stockname = document.getElementById("stocks");
  var quantity = document.getElementById("quantity");
  var buyprice = document.getElementById("buyprice");
  var currentprice = document.getElementById("currentprice");
  var tbuyprice = quantity.value * buyprice.value
  var tcurrentprice = quantity.value * currentprice.value
  let profitloss = ((tbuyprice - tcurrentprice) / tbuyprice) * 100;
  invested_amount += tbuyprice;
  totalPValue += tcurrentprice;
  var tp = totalPValue - invested_amount
  var tpl = (tp / invested_amount) * 100;
  document.getElementById("tp").innerHTML = "₹" + totalPValue;
  document.getElementById("ia").innerHTML = "₹" + invested_amount;
  document.getElementById("tpl").innerHTML = tpl;
  document.getElementById("pl").innerHTML = "₹" + (totalPValue - invested_amount);

  let lable = document.getElementById("pl");
  let color = lable.style.backgroundColor;
  if (tp >= 0) {
    lable.style.color = 'green';
  } else {
    lable.style.color = 'red';
  }
  if (stockname != '') {
    i++;
    var node = document.createElement('div');
    
    node.innerHTML = '<label for="check' + i + '" style="margin-right: 10%;margin-left: 5%;">' + stockname.value + '</label>' +
      '<label for="check' + i + '" style="margin-right: 10%;margin-left: 8%;">' + quantity.value + '</label>' +
      '<label for="check' + i + '" style="margin-right: 10%;margin-left: 9%;">' + currentprice.value + '</label>' +
      '<label for="check' + i + '" style="margin-right: 10%;margin-left: 9%;">' + (quantity.value * buyprice.value) + '</label>' +
      '<label for="check' + i + '" style="margin-right: 10%;margin-left: 10%;">' + profitloss + '</label>';

    document.getElementById('container').appendChild(node);
  }

  if (stockname.value == 'Paytm') {
    var value = 'https://gist.githubusercontent.com/SatyamBhargav/a9a16603d436e4729fad9ba4f0b3da1c/raw/680b88da67c0681ae64eab53f2988503b1bc4e68/paytm.csv'
    var Sname = 'Paytm'
    var Ctitle = 'Paytm Stock Chart'
    PlotChart(value,Sname,Ctitle);

  }else if (stockname.value == 'Zomato') {
    var value = 'https://gist.githubusercontent.com/SatyamBhargav/3eb73f968698a05123bf5d4650f30c9d/raw/62b881839888b866bd0a6a223f39c24532bd3785/Zomato.csv'
    var Sname = 'Zomato'
    var Ctitle = 'Zomato Stock Chart'
    PlotChart(value,Sname,Ctitle);

}else if (stockname.value == 'Sail') {
  var value = 'https://gist.githubusercontent.com/SatyamBhargav/545214ce40de591e3a67a8acfdcb7b6d/raw/0398d09cbb665cf10ebf2c13ea9754f558bb97fb/Sail.csv'
  var Sname = 'Sail'
  var Ctitle = 'Sail Stock Chart'
  PlotChart(value,Sname,Ctitle);

}else if (stockname.value == 'Mrf') {
  var value = 'https://gist.githubusercontent.com/SatyamBhargav/083676b39db23e276cab3e5d3963b009/raw/de6e822fd9abaf5e60d5bea33847455c8247a76d/MRF.csv'
  var Sname = 'MRF'
  var Ctitle = 'MRF Stock Chart'
  PlotChart(value,Sname,Ctitle);

}

function access() {
  var mail = document.getElementById("email");
  var pass = document.getElementById("password");
  if (mail.value == 'admin' && pass.value == 'admin') {
    window.location.href = "index.html"
  } else {
    alert("Email or Password Incorrect")
  }
}


function PlotChart(value, Sname, Ctitle){

    anychart.onDocumentReady(function () {
      anychart.data.loadCsvFile(
        value,
        function (data) {
          // create data table on loaded data
          var dataTable = anychart.data.table();
          dataTable.addData(data);
  
          // map loaded data for the candlestick series
          var mapping = dataTable.mapAs({
            open: 1,
            high: 2,
            low: 3,
            close: 4
          });
  
          // create stock chart
          var chart = anychart.stock();
  
          // create first plot on the chart
          var plot = chart.plot(0);
  
          // set grid settings
          plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);
  
          var series = plot.candlestick(mapping)
            .name(Sname);
          series.legendItem().iconType('rising-falling');
  
          // create scroller series with mapped data
          chart.scroller().candlestick(mapping);
  
          // set chart selected date/time range
          chart.selectRange('2022-04-19', '2023-04-19');
  
          // create range picker
          var rangePicker = anychart.ui.rangePicker();
  
          // init range picker
          rangePicker.render(chart);
  
          // create range selector
          var rangeSelector = anychart.ui.rangeSelector();
  
          // init range selector
          rangeSelector.render(chart);
  
          // sets the title of the chart
          chart.title(Ctitle);
  
          // set container id for the chart
          chart.container('contain');
  
          // initiate chart drawing
          chart.draw();
        }
      );
    });
}}
