require('dotenv').config();
var AzureSearch = require('azure-search');
var client = AzureSearch({
    url: process.env.SEARCH_URL,
    key: process.env.SEARCH_KEY
});

var indexName = ''; //lowercase only

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
            uploadData();
        }

    });
}



function uploadData() {
    var docs = [{
        "id": "document1",
        "juice": "orange",
        "name": "lisa"
      },
      {
        "id": "document2",
        "juice": "cran",
        "name": "leslie"
      }]

       
      // add documents to an index
      client.addDocuments(indexName, docs, function(err, results){
          if(err)
          console.log(err)
          else
          console.log(results)
      });
}