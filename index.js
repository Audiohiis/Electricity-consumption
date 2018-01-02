import express from 'express'
import path from 'path'
import axios from 'axios'
import convert from 'xml-to-json-promise'
import math from 'mathjs'

const app = express()
const cachedResults = {}

app.get('/api/kwh', (req, res) => {
  if (!!cachedResults[req.query.start + req.query.end]) {
    res.send(cachedResults[req.query.start + req.query.end])
  } else {
    axios.get('http://finestmedia.ee/kwh/?start=' + req.query.start + '&end=' + req.query.end)
      .then(response => {
        convert.xmlDataToJSON(response.data).then(json => {
          let electricityConsumption = math.round(json.EnergyReport.AccountTimeSeries[0].ConsumptionHistory[0]
            .HourConsumption.reduce((sum, e) => sum + parseFloat(e._), 0), 3)
          cachedResults[req.query.start + req.query.end] = {electricityConsumption}
          res.send({electricityConsumption})
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
})

app.set('trust proxy', 1)

app.use(express.static('dist'))
app.use((req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

app.listen(8081)
