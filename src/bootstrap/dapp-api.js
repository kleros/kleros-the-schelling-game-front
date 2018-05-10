import Web3 from 'web3'

const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'

let web3Instance
if (process.env.NODE_ENV === 'test')
  web3Instance = new Web3(require('ethereumjs-testrpc').provider())
else if (window.web3 && window.web3.currentProvider)
  web3Instance = new Web3(window.web3.currentProvider)
else
  web3Instance = new Web3.providers.HttpProvider(
    process.env[`REACT_APP_${env}_ETHEREUM_PROVIDER`]
  )

export const web3 = web3Instance
