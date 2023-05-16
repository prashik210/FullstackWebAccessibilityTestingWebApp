import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import WelcomeBanner from './WelcomeBanner.png';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import exportFromJSON from 'export-from-json' 


const fileName = 'Violations_Report'  
const exportType = 'xls' 
const fullfilename = 'Report'

function App() {

  const ExportToExcel = () => {  
    exportFromJSON({ data, fileName, exportType })  
  }  

  const ExportFullDataToExcel = () => {
    exportFromJSON({ fulldata, fullfilename, exportType })
  }

  const [name, setName] = useState("");
  
  const [data, setData] = useState([]);
  const [fulldata, setFulldata] = useState([]);

 
 

  async function postName(e) {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/post_url", {
        name
      })
        .then(function (response) {
          const datav = response.data;
          console.log(datav);
          //setData(datav);
          // var axediv = document.getElementById("axeresults");
          // axediv.innerHTML = JSON.stringify(datav.testEngine);
          setData(datav.violations);
          setFulldata(datav);
          // for(var key in JSON.datav) {
          //   for(var key1 in JSON.datav[key]) {
          //     var newnode = document.createElement('newdiv');
          //     console.log(JSON.datav[key][key1]);
          //     newnode.innerHTML = JSON.stringify(JSON.datav[key][key1]);
          //     axediv.appendChild(newnode);
          //     axediv.appendChild("<br/><br/>");
          //   }
          // }
        })
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <>
      <div className="App">

        <div>
          <img id="image" src={WelcomeBanner} alt="WelcomeBanner"></img>
        </div>
        <form onSubmit={postName}>
          <input type="url" value={name} onChange={(e) => setName(e.target.value)} /><br />
          <br /><button type="submit">Send URL</button>
        </form>

      <br/>
     
      {/* {
        data.map((data, index) => {
          return (
            <ul key={index}>
              <li>
                ID : {data.id} <br />
                Impact : {data.impact} <br />
                <p>Description : {data.description}</p>
                HelpUrl :
                <a href={data.helpUrl}> {data.helpUrl}</a>
                Tags :
                <ol>
                  {
                    data.tags.map((data2, i) => {
                      return (
                        <li key={i}>
                          {data2}
                        </li>
                      )
                    })
                  }
                </ol>
              </li>
            </ul>
          )
        })
      }
      <br /> */}
      {
        data.map((data, index) => {
          return (
            <Accordion key={index}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{data.id}: {data.impact}</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Description
                      </Accordion.Header>
                      <Accordion.Body>
                        {data.description}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        HelpUrl
                      </Accordion.Header>
                      <Accordion.Body>
                        <a href={data.helpUrl}>
                        {data.helpUrl}
                        </a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Tags
                      </Accordion.Header>
                      {
                        data.tags.map((tags, index2) => {
                          return (
                            <Accordion.Body key={index2}>
                              {tags}
                            </Accordion.Body>
                          )
                        })
                      }
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })
      }

      
        <br/>              
        <button type="button" onClick={ExportToExcel}>Export Violations To Excel </button> 
        <span>  </span>
        <button type="button" onClick={ExportFullDataToExcel}>Export Complete Report To Excel </button> 
      </div>
    </>
  );
}

export default App;
