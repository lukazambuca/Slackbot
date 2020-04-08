const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
const unirest = require("unirest");

require('dotenv').config();

//set the channel that our bot posts messages to

var channel = "random";

//Set our BOT_TOKEN (keep token hidden)

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'Ronabot'
});


//Start handler

bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }

    bot.postMessageToChannel(
        channel,
        'Hey! I\'m *@Ronabot*. I return the latest COVID-19 summary statistics. Just type *@Ronabot* with "corona" to view world data or "$countrycode" to view country data. \n Example: @Ronabot $it' ,
        params
    );
});


//Error handler

bot.on('error', (err) => {
    console.log(err);
});


// Message Handler (also stop bots from endlessly talking to each other)

bot.on('message', (data) => {
    if(data.type !== 'message' || data.subtype == 'bot_message') {
        return;
    }

    handleMessage(data.text);
})

// Response handler

function handleMessage(message) {
    if(message.includes(' corona')) {
        world()
    }
    else if(message.includes('$')){
         var str = String(message)
         var n = str.lastIndexOf('$')
         var result = str.substring(n + 1)
         country(result)
    }    
    else if(message.includes(' help')) {
        runHelp()
    }
};

//----function to get COVID-19 world statisitcs----------

function world() {

axios({
    "method":"GET",
    "url":"https://covid-19-data.p.rapidapi.com/totals",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"covid-19-data.p.rapidapi.com",
    "x-rapidapi-key":`${process.env.RAPID_KEY}`
    },"params":{
    "format":"undefined"
    }
    })
    .then((response)=>{

        const confirmed = response.data[0]["confirmed"];
        const recovered = response.data[0]["recovered"];
        const critical = response.data[0]["critical"];
        const deaths = response.data[0]["deaths"];
        
            const params = {
                icon_emoji: ':mask:'
            }
        
            bot.postMessageToChannel(
                channel,
                `Confirmed: ${confirmed} \n Recovered: ${recovered} \n Critical: ${critical} \n Deaths: ${deaths}`,
                params
            );
      
    })
    .catch((error)=>{
      console.log(error)
    });
}




//---------function to get COVID-19 stats per country-----------


function country(code) {

axios({
    "method":"GET",
    "url":"https://covid-19-data.p.rapidapi.com/country/code",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"covid-19-data.p.rapidapi.com",
    "x-rapidapi-key":`${process.env.RAPID_KEY}`
    },"params":{
    "format":"undefined",
    "code":`${code}`
    }
    })
    .then((response)=>{


        const area = response.data[0]["country"];
        const confirmed = response.data[0]["confirmed"];
        const recovered = response.data[0]["recovered"];
        const critical = response.data[0]["critical"];
        const deaths = response.data[0]["deaths"];
        
            const params = {
                icon_emoji: ':mask:'
            }
        
            bot.postMessageToChannel(
                channel,
                `Country: ${area} \n Confirmed: ${confirmed} \n Recovered: ${recovered} \n Critical: ${critical} \n Deaths: ${deaths}`,
                params
            );
      
    })
    .catch((error)=>{

      //console.log(error)
        const params = {
        icon_emoji: ':question:'
     } 
     
     bot.postMessageToChannel(
        channel,
        'Sorry, didn\'t catch that code. Please check https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes for a list of country codes. To view instructions type *@Ronabot* with *help*.',
        params
      );



    });

}



//----------help function---------


function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        channel,
        `Type *@Ronabot* with *corona* to get COVID-19 world statistics. \n Type *@Ronabot* with $countrycode to get COVID-19 statistics per country. \n
         Check https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes for your country's code. \n Type *@Ronabot* with *help* to recieve this instruction again.`,
        params
    );
}


