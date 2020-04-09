# COVID-19 Slackbot

@Ronabot is a simple Slackbot :robot: that retuns COVID-19 summary statistics for the World and countries individually. 

Add to slack link: https://slack.com/oauth/authorize?client_id=1044274649057.1045472667079&scope=bot

## Set up and Deploy

### 1) Clone the repository
```
git clone https://github.com/lukazambuca/Slackbot.git && cd Slackbot
```
### 2) Install dependencies
```
npm install

npm start
```
### 3) Create a bot in [Slack](https://api.slack.com/apps/AM92STGGG/general?) and include your unique OAuth bot token.
Also make sure to get your X-RapidAPI-Key from [Rakuten Rapid API](https://english.api.rakuten.net/Gramzivi/api/covid-19-data?endpoint=apiendpoint_5c132769-7bb2-4000-b320-f42731a7dee3) in order to use the API which retrieves COVID-19 data.
 ```
 //Add the following to your .env file
BOT_TOKEN=YOUR_BOT_TOKEN_HERE
RAPID_KEY=YOUR_X-RAPID_KEY
```
```
//Notice the template strings, that is where your token from the .env file will go.


//Bot authentication
const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'Your app name'
});
------------------------------------------------
//COVID-19 API
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
```
## How does it work?

### Opening message
The bot starts with an opening messasge to a selected channel. The channel is defined as a variable in the index.js file. You may change this.
### Commands
When the user types '@Ronabot corona' the bot returns global COVID-19 summary statistics.

```
@Ronabot corona
```
![alt text](https://github.com/lukazambuca/Slackbot/blob/master/screenshots/Screenshot%202020-04-09%20at%2011.34.15.png)

The user can also choose a specific country by entering the string $ followed by the country's ISO 3166 code.
```
@Ronabot $it
```
![alt text](https://github.com/lukazambuca/Slackbot/blob/master/screenshots/Screenshot%202020-04-09%20at%2011.45.32.png)

What happens if the user enters a country code which is not recognizable? The bot replies with a message letting the user know about the error and attaches a link to a list of country codes.
```
@Ronabot $hi
```
![alt text](https://github.com/lukazambuca/Slackbot/blob/master/screenshots/Screenshot%202020-04-09%20at%2011.50.31.png)

There is also a "help" command.
```
@Ronabot help
```
![alt text](https://github.com/lukazambuca/Slackbot/blob/master/screenshots/Screenshot%202020-04-09%20at%2011.55.12.png)










