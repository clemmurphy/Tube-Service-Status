import React, { useState, useEffect } from 'react'
import axios from 'axios'
import logo from './assets/tfl-logo.png'

const App = () => {

  const [ lines, updateLines ] = useState([])
  const [ timer, updateTimer ] = useState(15)

  const getService = async () => {
    const { data } = await axios.get('https://api.tfl.gov.uk/line/mode/tube/status')
    updateLines(data)
  }

  const interval = setInterval(() => {
    updateTimer(timer - 1)
    if (timer < 1) {
      getService()
      updateTimer(15)
    }
  }, 60000)

  useEffect(() => {
    getService()
  }, [])

  return (
    <>
      <img src={logo} alt="tfl logo" />
      <h1>Tube Service Status</h1>
      <div className="lines">
        {
          lines.map((l, i) => {
            return (
              <div key={i} className="line-container" id={l.id}>
                <div className={`status-dot ${l.lineStatuses[0].statusSeverityDescription} pulse`}></div>
                <div className="text-container">
                  <h2>{l.name}</h2>
                  <div className={`status-text ${l.lineStatuses[0].statusSeverityDescription}`}>{l.lineStatuses[0].statusSeverityDescription}</div>
                </div>
              </div>
            )
          })
        }
      </div>
      <p id="refresh-timer">Next auto refresh in {timer} minutes</p>
    </>
  )
}

export default App
