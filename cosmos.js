require('dotenv').config();
var AzureSearch = require('azure-search');
var client = AzureSearch({
    url: process.env.SEARCH_URL,
    key: process.env.SEARCH_KEY
});

var indexName = '', //REQUIRED(lowercase only): name of the new index
    dataName = '', // REQUIRED(lowercase only): name of new data source
    databaseName = '' // REQUIRED: name of DB created in CosmosDB account
    collectionName = ''; // REQUIRED: name of collection\table

createIndex();


function createIndex() {
    var schema = {
        name: indexName,
        fields: 
        //fields should match that of the DB columns; Add as many as you need
        //note you need ONE of these fields to be your key. key values can only have numbers and letters. 
        //To choose whether it is searchable, filterable,
        //retrievable, sortable and facetable, look at this doc https://docs.microsoft.com/en-us/rest/api/searchservice/create-index,
        //under Index Attributes section
        [{
            name: 'id',
            type: 'Edm.String',
            searchable: false,
            filterable: false,
            retrievable: true,
            sortable: false,
            facetable: false,
            key: true
        },
        {
            name: '', //change field name
            type: 'Edm.String',
            searchable: true,
            filterable: false,
            retrievable: true,
            sortable: false,
            facetable: false,
            key: false
        },
        {
            name: '', //change field name
            type: 'Edm.String',
            searchable: true,
            filterable: false,
            retrievable: true,
            sortable: false,
            facetable: false,
            key: false
        }],
        scoringProfiles: [],
        defaultScoringProfile: null,
        corsOptions: null
    };


    // create/update an index
    client.createIndex(schema, function (err, schema) {
        if (err)
            console.log(err);
        else{ 
            console.log(schema);
            createDataSource();
        }

    });
}

function createDataSource() {
    var options = {
        name: dataName,
        type: "documentdb", //DO NOT CHANGE
        credentials: { connectionString: process.env.COSMOS_CONNSTR + 'Database='+ databaseName},
        container: { name: collectionName, query: null }
    }

    client.createDataSource(options, function (err, data) {
        if (err)
            console.log(err);
        else{
            console.log(data);
            uploadData();
        }
    });
}


function uploadData() {
    var schema = {
        name: 'cosmosind', //Name of indexer, can be anything you want, but data will be uploaded to index created above
        dataSourceName: dataName, //Required. The name of an existing data source
        targetIndexName: indexName, //Required. The name of an existing index
    };

    client.createIndexer(schema, function (err, schema) {
        if (err)
            console.log(err);
        else
            console.log(schema);
    });
}