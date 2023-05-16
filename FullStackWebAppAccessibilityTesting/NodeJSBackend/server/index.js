const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors")
const AxeBuilder = require('@axe-core/webdriverjs');
const WebDriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

//chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
let service = new chrome.ServiceBuilder()
          .loggingTo('/my/log/file.txt')
          .enableVerboseLogging()
          .build();
 let options = new chrome.Options();
      // configure browser options ...
 
let driver = chrome.Driver.createSession(options, service);
const data = {
  "name": "John",
  "age": 34,
  "hobby": {
"reading" : true,
"gaming" : false,
"sport" : "baseball"
  },
  "class" : ["JavaScript", "HTML", "CSS"]
}


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get("/",cors(),async(req,res) => {
    res.send("This is working");
})

app.post("/post_url", async (req,res) => {
    let {name} = req.body
    console.log(name)
    if(name) {
      const driver = new WebDriver.Builder().forBrowser('chrome').build();

      await driver.get(name).then(() => {
          new AxeBuilder(driver).analyze((err, results) => {
          if (err) {
            // Handle error somehow
            console.log(err)
          }
          if(results) {
            console.log(results);
            
            res.json(results);
            driver.quit();
          }
        });
      });
    }
})


app.get("/home",cors(), async(req,res) => {
  res.send("This is the data from the server");
})


app.listen(PORT, () => {
    console.log(`Server Listening at http://localhost:${PORT}`);
});