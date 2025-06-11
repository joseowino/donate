// server.js
import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000
const consumerKey = process.env.CONSUMER_KEY
const consumerSecret = process.env.CONSUMER_SECRET
const baseURL = "https://sandbox.safaricom.co.ke"
const siteUrl = process.env.SITE_URL
const shortCode = process.env.SHORT_CODE || "174379"
const passkey = process.env.PASSKEY

// Helper: Generate timestamp in yyyyMMddHHmmss format
function getTimestamp() {
  return new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14)
}

// Helper: Get Base64-encoded password
function getStkPassword() {
  const timestamp = getTimestamp()
  const password = Buffer.from(shortCode + passkey + timestamp).toString("base64")
  return { password, timestamp }
}

// Helper: Get Bearer token
async function getAccessToken() {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")

  const response = await fetch(
    `${baseURL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to obtain access token")
  }

  const data = await response.json()
  return data.access_token
}

// STK Push endpoint
app.post("/api/stkpush", async (req, res) => {
  const { phoneNumber, amount, accountReference = "test", transactionDesc = "test" } = req.body

  if (!phoneNumber || !amount) {
    return res.status(400).json({ error: "Phone number and amount are required" })
  }

  try {
    const accessToken = await getAccessToken()
    const { password, timestamp } = getStkPassword()

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: `${siteUrl}/callback`,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    }

    const stkResponse = await fetch(`${baseURL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const stkData = await stkResponse.json()
    res.json(stkData)
  } catch (err) {
    console.error("STK Push Error:", err)
    res.status(500).json({ error: "STK Push Failed", details: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
