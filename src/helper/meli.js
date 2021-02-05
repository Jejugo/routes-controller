const meli = require('mercadolibre-nodejs-sdk')
const apiInstance = new meli.OAuth20Api()
const fetch = require('node-fetch')
const request = require('request')
const fs = require('fs')

const authUrl = apiInstance.apiClient.getBasePathFromSettings(2);
apiInstance.apiClient.basePath = authUrl;

module.exports = async () => {

  let responseType = "code"; // String | 
  let clientId = process.env.CLIENT_ID; // String | 
  let redirectUri = process.env.REDIRECT_URI; // String | 

  // const data = await fetch(`http://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`, { method:'GET' })
  // console.log(data)

  // apiInstance.auth(responseType, clientId, redirectUri, (error, data, response) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log('API called successfully.');
  //     //console.log(data)
  //     console.log(response)
  //   }
  // });
}