# Ideal Postcodes Node.js API Wrapper

Get a full list of addresses for any given UK postcode using the Ideal-Postcodes.co.uk API. We use the most accurate addressing database in the UK, Royal Mail's Postcode Address File.

## Getting Started

Getting started is easy. You can get UK postcodes in your app in minutes.

**Installation**

```bash
npm install ideal-postcodes
```

**Get an API Key**

Get a key at [Ideal-Postcodes.co.uk](https://ideal-postcodes.co.uk). Try out the service with the test postcode 'ID1 1QD'

**Configuration**

Include your api key when requiring the ideal-postcodes module, will return an instance that you can use to make lookups.

```javascript
var api_key = "your key goes here"
var idealPostcodes = require('ideal-postcodes')(api_key)
```

## Usage

Perform lookups by calling #lookupPostode. Test using the postcode "ID1 1QD".

If no addresses are found, the method will return an empty array.

```javascript
idealPostcodes.lookupPostcode("ID1 1QD", function (error, result) {
	if (error) throw error; // Implement some error handling
	console.log(result); 	
});

#=> Will output an array of addresses
# {
#   "result": [
#     {
#       "postcode": "ID1 1QD",
#       "post_town": "LONDON",
#       "line_1": "Kingsley Hall",
#       "line_2": "Powis Road",
#       "line_3": ""
#     }
#   ],
#   "code": 2000,
#   "message": "Success"
# }

```

## Registering

PAF is licensed from the Royal Mail and is, unfortunately, not free to use. Ideal Postcodes aims to be simple to use and fairly priced to use for web and mobile developers.

We charge _2p_ per [external](https://ideal-postcodes.co.uk/termsandconditions#external) lookup.

## Documentation
More documentation can be found [here](https://ideal-postcodes.co.uk/documentation)