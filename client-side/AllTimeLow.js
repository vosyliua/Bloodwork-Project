let AllData = {};

function AddingData(data){
    var numOfDivs= data.length;                                 // variable of how many <div> we want
    var arrayDiv = new Array();                                 // array for all the <div>
    var mainContainer = document.getElementById("container");   // where to put the divs
    for (var i = 0; i < numOfDivs; i++)
    {
        arrayDiv[i] = document.createElement('div');            // creating a div
        arrayDiv[i].id = 'ItemName' + i;                        // giving its id
        arrayDiv[i].className = 'grid-item';                    // giving its class
        mainContainer.appendChild(arrayDiv[i]);                 // adding it into the grid container

        var other = document.getElementById("ItemName" + i)     // assigning a variable to the position we want to put the information from json
        var span = document.createElement("span");              // creating a <span>
        span.className = "nameSize"                             // giving it a class
        span.innerHTML = data[i].name;                          // writing into html a value

        var span1 = document.createElement("span");             // creating a <span>
        span1.className = "priceSize"                           // giving it a class
        var NumbtoStr = data[i].last1hrValue.toString();        // Making a number to string 
        NumbtoStr=NumbtoStr.substring(0,NumbtoStr.length-2)+"."+NumbtoStr.substring(NumbtoStr.length-2);    // Making the last 2 digits into decimals
        span1.innerHTML = "Price: " + NumbtoStr + data[i].currency.prefixText;                   // writing into html a value    

        var div = document.createElement("div");                // creating a <div>
        div.innerHTML = '<img class = "ImgSize" src="'+data[i].iconUrl+'">'; // writing into html a value
            
        other.appendChild(span);            // appending our <span> and <div> into the position we want
        other.appendChild(div);             // appending our <span> and <div> into the position we want
        other.appendChild(span1);           // appending our <span> and <div> into the position we want

        mainContainer.appendChild(other);   // appending our complete information we want to show into the grid container
    }
};


fetch("/data/alltimelow.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        AllData = data;
        //console.log(AllData.length);       
        AddingData(AllData)
        
    })
    .catch(function (err) {
       console.log('error: ' + err);
    });
