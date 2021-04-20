//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Entire file made by Arnoldas, functions made to retrieve data from a public Steam API endpoint and stored to a JSON file, aswell as stored in databases.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const fs = require('fs');
const data = fs.readFileSync('items.json')
const datahigh = fs.readFileSync('alltimehigh.json')
const datalow = fs.readFileSync('alltimelow.json')
const useritems1= fs.readFileSync('useritems.json')



const fetch = require("node-fetch");
const datastore = require('nedb')
const prompt = require('prompt');
const { create } = require('domain');

const maininfodb = new datastore('maininfo.db')
const alltimelowdb = new datastore('alltimelow.db')
const alltimehighdb = new datastore('alltimehigh.db')
const userdb = new datastore('user.db')
maininfodb.loadDatabase();
alltimelowdb.loadDatabase();
alltimehighdb.loadDatabase();
userdb.loadDatabase();


async function maininfo (){
    const somedata1 = await fetch('https://scmm.app/api/market/stat/profitableFlips?count=53')  //fetching data from an API endpoint
    console.log(somedata1.status)                                                               //checking to see if the status is 200
    const data1 = await somedata1.json()                                                        //changing the data to JSON format
    const items = data1.items                                                                   //storing the object property items into another variable for later use
    items.forEach(async(items)=>{                                                               //appending a timestamp property to each object in the items list, for later use when comparing their prices 
        calculated = items.buyNowPrice - items.buyAskingPrice                                   //calculating the estimated profit for each item and storing that profit into each object as their own property
        items.calculated = calculated
        var timestamp = Date.now()
        items.timestamp = timestamp
    })
    maininfodb.insert(items)                                                                    //inserting the cleaned up data into the database
    var data2 = JSON.stringify(items, null, 2)                                                  //stringifying the data so that we can store it into a JSON file
    if(data.length!==0){                                                                        //checking to see if the file has any data in it, if not insert the data
        fs.writeFile('items.json', '', (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log(' Main data has been deleted')
                fs.writeFile('items.json', data2, (err)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log('Main data has been added')
                    }
                })
            }
        })
    }
}  



async function alltimehigh(){
    const alltimehigh = await fetch('https://scmm.app/api/market/stat/allTimeHigh?count=10')
    const alltimehigh1 = await alltimehigh.json()
    const alltimehigh2 = alltimehigh1.items
    alltimehigh2.forEach(async(alltimehigh2)=>{
    var timestamp = Date.now()
    alltimehigh2.timestamp = timestamp    
    })
    alltimehighdb.insert(alltimehigh2)
    var stringed = JSON.stringify(alltimehigh2, null, 2)
    if(datahigh.length!==0){
        fs.writeFile('alltimehigh.json', '', (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('All time high data has been deleted')
                fs.writeFile('alltimehigh.json', stringed, (err)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log('All time high data has been added')
                        var parsed = JSON.parse(stringed)
                        
                    }
                })
            }
        })
    }
}



async function alltimelow(){
    const alltimelow = await fetch('https://scmm.app/api/market/stat/allTimeLow?count=10')
    const alltimelow1 = await alltimelow.json()
    const alltimelow2 = alltimelow1.items
    alltimelow2.forEach(async(alltimelow2)=>{
    var timestamp = Date.now()
    alltimelow2.timestamp = timestamp    
    })
    alltimelowdb.insert(alltimelow2)
    var stringed = JSON.stringify(alltimelow2, null, 2)
    if(datalow.length!==0){
        fs.writeFile('alltimelow.json', '', (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('All time low data has been deleted')
                fs.writeFile('alltimelow.json', stringed, (err)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log('All time low data has been added')
                    }
                })
            }
        })
    }
}  



function userItems (){
    var person = prompt.get(['steamid'],(err,result)=>{
        if(err)console.log(err.message)
        else{
            fetch(`https://scmm.app/api/profile/${result.steamid}/inventory/items`)
            .then(response=>{
                if (!response.ok) {
                    console.log(response.ok)
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then(data=>{
                data.forEach(async(data)=>{
                    var timestamp = Date.now()
                    data.timestamp = timestamp
                })
                userdb.insert(data)
                if(useritems1.length !==0){
                    const stringed = JSON.stringify(data, null, 2)
                    fs.writeFile('useritems.json', '', (err)=>console.log(err))
                    fs.writeFile('useritems.json', stringed, (err)=>console.log(err))
                    console.log('Data of the specific user has been added')
            }})
            .catch(err=>{
                if(err)console.log('Incorrect steam user id')
                
            })
        }
        }
    )
    }

userItems()

module.exports = maininfo;




    