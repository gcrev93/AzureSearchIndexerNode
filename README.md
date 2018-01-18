# Azure Search with Node.js

This repo is created to create indexes and upload data for those using Azure search. 

*cosmos.js* will allow you to create an index and upload documents from a collection in your cosmos DB

*docs.js* will allow you to create an index and upload custom documents to the index. 

This contains code that can act as an alternative to using the Azure portal or making continous REST calls to add indexes and documents to your Azure Search resource.

**Before** using these files you will need to create an Azure Search resource in your Azure portal. You can look here for documentation on how to do so [HERE](https://docs.microsoft.com/en-us/azure/search/search-create-service-portal)

You will also need to fill in the *.env* file with your Azure Search url and key. If you are using a Cosmos DB, you will also need to put the Cosmos DB connection string in the *.env* file.

And be sure to run the `npm install` command once you clone the repo so that you have all the necessary node modules.

Special thanks to @richorama for creating the [azure-search node module](https://www.npmjs.com/package/azure-search) and making this demo possible.
