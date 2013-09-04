# Ideal Postcodes Node.js API Wrapper

Get a full list of addresses for any given UK postcode using the Ideal-Postcodes.co.uk API. We use the most accurate addressing database in the UK, Royal Mail's Postcode Address File.

## Getting Started

Implementation can be finished in minutes. Simply install, apply your key and you can start performing UK address lookups.

**Installation**

Install using node package manager.

```bash
npm install ideal-postcodes
```

Remember to include it in package.json for portability.

**Get an API Key**

Get a key at [Ideal-Postcodes.co.uk](https://ideal-postcodes.co.uk). You can try out the service with the test postcode 'ID1 1QD'

**Configuration**

Include your api key when requiring the ideal-postcodes module. This will return an object instance you can use to perform lookups using the Ideal Postcodes API.

```javascript
var api_key = "your key goes here"
var idealPostcodes = require('ideal-postcodes')(api_key)
```

## Usage

Perform lookups by calling **#lookupPostode(postcode, callback)**. This function is asynchronous and so takes 2 arguments, the postcode and a callback to handle the response.

Use the postcode "ID1 1QD" to test the service.

```javascript
idealPostcodes.lookupPostcode("ID1 1QD", function (error, addresses) {
	if (error) throw error; // Implement some error handling
	console.log(addresses); 	
});

// => Will output an array of addresses
//	[ {
//		postcode: 'ID1 1QD',
//		post_town: 'LONDON',
//		line_1: 'Kingsley Hall',
//		line_2: 'Powis Road',
//		line_3: '' },
//	{ 
//		postcode: 'ID1 1QD',
//		post_town: 'LONDON',
//		line_1: '36 Craven Street
// 		
// 		and so on...
```

## Registering

PAF is licensed from the Royal Mail and is, unfortunately, not free to use. Ideal Postcodes aims to be simple to use and fairly priced to use for web and mobile developers.

We charge _2p_ per [external](https://ideal-postcodes.co.uk/termsandconditions#external) lookup.

## Documentation
More documentation can be found [here](https://ideal-postcodes.co.uk/documentation)

## License
MIT