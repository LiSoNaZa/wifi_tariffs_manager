import express from 'express'
import cors from 'cors'
import wifiTariffRoutes from './modules/wifi-tariffs/wifi-tariffs.routes'

const app = express()

const PORT = process.env.PORT || 3000
const APIPREFIX = '/api/'
const APIVERSION = 'v1'

app.use(cors())
app.use(express.json())

app.use(`${APIPREFIX}${APIVERSION}/wifi-tariffs`, wifiTariffRoutes)

app.get(`${APIPREFIX}${APIVERSION}/health`, (req, res) => {
  res.json({ status: 'up', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`)
})