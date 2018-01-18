require('dotenv').config();
var AzureSearch = require('azure-search');
var client = AzureSearch({
    url: process.env.SEARCH_URL,
    key: process.env.SEARCH_KEY
});

var indexName = ''; //REQUIRED(lowercase only)

createIndex();


function createIndex() {
    var schema = {
        name: indexName,
        fields:
        // create fields to equal those in your JSON docs; here is an example. compare to docs created in uploadData()
        //change, delete, add and etc to your liking
        //note you need ONE of these fields to be your key. key values can only have numbers and letters. 
        //To choose whether it is searchable, filterable, retrievable, sortable and facetable, 
        //look at this doc https://docs.microsoft.com/en-us/rest/api/searchservice/create-index,
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