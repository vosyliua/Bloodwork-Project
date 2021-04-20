
function AddingData(data){

    var mainContainer = document.getElementById("container1");
        var span = document.createElement("span");              // creating a <span>
        span.className = "nameSize"                             // giving it a class
        span.innerHTML = data.name;                          // writing into html a value

        var span1 = document.createElement("span");             // creating a <span>
        span1.className = "priceSize";                          // giving it a class   
        var NumbtoStr = data.buyNowPrice.toString();         // Making a number to string 
        NumbtoStr=NumbtoStr.substring(0,NumbtoStr.length-2)+"."+NumbtoStr.substring(NumbtoStr.length-2);    // Making the last 2 digits into decimals
        span1.innerHTML = "Price: " + NumbtoStr + data.currency.prefixText;        // writing into html a value
    
        var div = document.createElement("div");                // creating a <div>
        div.innerHTML = '<img class = "ImgSize" src="'+data.iconUrl+'">'; // writing into html a value
            
        mainContainer.appendChild(span);            // appending our <span> and <div> into the position we want
        mainContainer.appendChild(div);             // appending our <span> and <div> into the position we want
        mainContainer.appendChild(span1);           // appending our <span> and <div> into the position we want
};

function showName(data) {
  var mainContainer = document.getElementById("container1");
  var div = document.createElement("div");
  div.innerHTML = data.name + " " + '<br>' + '<img class = "ImgSize" src="'+data.iconUrl+'">';
  mainContainer.appendChild(div);
}
function showPrice(data) {
  var mainContainer = document.getElementById("container1");
  var div = document.createElement("div");
  div.innerHTML = "Price: " + data.buyNowPrice + data.currency.prefixText;
  mainContainer.appendChild(div);
}

const searchBar = document.getElementById('searchBar')

searchBar.addEventListener('keyup', event => {
    if(event.key ==='Enter'){
      event.preventDefault()
      var node = document.getElementById('container1');
      if(node.innerHTML!==""){
        node.innerHTML = ""
    }
      const skin = event.target.value
      console.log(skin)
      fetch('https://scmm.app/api/market/item/' + skin)
      .then(res=>{
          if (!res.ok) {
              alert('Item was not found')
              throw Error(res.statusText);
          }
          return res.json()
      })
      .then(data=>{
        console.log(data)
          AddingData(data)
          //showName(data)
          //showPrice(data)
      })
      .catch((err)=>{
          console.log(err)
      })
      
  }  
})
