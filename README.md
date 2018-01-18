# Azure Search with Node.js

This repo will allow you to create indexes and upload documents to an Azure Search resource. This code that can act as an alternative to using the Azure portal or making continous REST calls to add indexes and documents to your Azure Search resource. An example of its use:
Code seen in *docs.js* was used as a skeleton for migrating data from Elastic Search + Kibana to Azure Search.

- *cosmos.js* will allow you to create an index and upload documents from a collection in your cosmos DB

- *docs.js* will allow you to create an index and upload custom documents to the index. 

**Before** using these files you will need to:
1. Create an Azure Search resource in your Azure portal. You can look here for documentation on how to do so [HERE](https://docs.microsoft.com/en-us/azure/search/search-create-service-portal)

2. If you are using the Cosmos DB resource, create a Cosmos DB resource in your Azure Portal and create a Database and Collection within your Cosmos DB. Please keep note of your Database and Collection names. You can look here for documentation on how to do so [HERE](https://docs.microsoft.com/en-us/azure/cosmos-db/tutorial-develop-sql-api-dotnet)

3. Be sure to run the `npm install` command once you clone the repo so that you have all the necessary node modules.

4. You will also need to fill in the *.env* file with your Azure Search url and key. If you are using a Cosmos DB, you will also need to put the Cosmos DB connection string in the *.env* file.

Special thanks to @richorama for creating the [azure-search node module](https://www.npmjs.com/package/azure-search) and making this demo possible.
