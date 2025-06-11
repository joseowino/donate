export class MpesaAPI {
  baseURL: string

  constructor() {
    this.baseURL = "http://localhost:3000"
  }

  async getAccessToken(): Promise<string> {
    try {
      const response = await fetch(`${this.baseURL}/api/token`, {
        method: "GET",
      })

      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error("Error getting access token:", error)
      throw error
    }
  }

  async initiateSTKPush(
    phoneNumber: string,
    amount: number,
    accountReference: string,
    transactionDesc: string
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/api/stkpush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          amount,
          accountReference,
          transactionDesc,
        }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error initiating STK push:", error)
      throw error
    }
  }
}

export const mpesa = new MpesaAPI()
