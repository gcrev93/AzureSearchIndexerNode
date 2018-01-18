require('dotenv').config();
var AzureSearch = require('azure-search');
var client = AzureSearch({
    url: process.env.SEARCH_URL,
    key: process.env.SEARCH_KEY
});

var indexName = 'gabbytestindex',
    dataName = 'cosmosdt4',
    collectionname = '';

createIndex();


function createIndex() {
    var schema = {
        name: indexName,
        fields:
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
            name: 'juice',
            type: 'Edm.String',
            searchable: true,
            filterable: false,
            retrievable: true,
            sortable: false,
            facetable: false,
            key: false
        },
        {
            name: 'name',
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
        type: "documentdb",
        credentials: { connectionString: process.env.COSMOS_CONNSTR},
        container: { name: "testinggabrielle", query: null }
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
        name: 'cosmosind',
        dataSourceName: dataName, //Required. The name of an existing data source
        targetIndexName: indexName, //Required. The name of an existing index
    };

    // create/update an indexer
    /*client.createIndexer(schema, function (err, schema) {
        if (err)
        console.log(err);
    else
        console.log(schema);
    });*/

    client.createIndexer(schema, function (err, schema) {
        if (err)
            console.log(err);
        else
            console.log(schema);
    });
}