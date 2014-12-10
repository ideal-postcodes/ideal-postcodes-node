# Ideal-Postcodes.co.uk Node.js Library [![Build Status](https://travis-ci.org/ideal-postcodes/ideal-postcodes-node.png)](https://travis-ci.org/ideal-postcodes/ideal-postcodes-node)

Ideal Postcodes is a simple JSON API to query UK postcodes and addresses. Find out more at [Ideal-Postcodes.co.uk](https://ideal-postcodes.co.uk/)

Our API is based off Royal Mail's Postcode Address File and is updated daily. Each convenience method incurs a small charge (typically 2p) - free methods are labelled as free and based off open data sources.

## Getting Started

**Install**

```bash
$ npm install ideal-postcodes
```

**Create a Key**

Sign up at [Ideal-Postcodes.co.uk](https://ideal-postcodes.co.uk) and create a key.

**Configure**

Include your api key when requiring the ideal-postcodes module. This will return an client, which can be used to perform various tasks on the API such as looking up a postcode.

```javascript
var idealPostcodes = require("ideal-postcodes")("your_key_goes_here")
```

## Methods

Each client instance provides a number of convenience methods to allow you to get specific jobs done quickly and easily. These convenience methods are listed below:

### Get all addresses for a postcode [(docs)](https://ideal-postcodes.co.uk/documentation/postcodes#postcode)

Retrieve a complete list of addresses at a given postcode.

```
idealPostcodes.lookupPostcode(postcode, callback)
```

- `postcode` (string). The postcode to search.
- `callback` (function). Standard callback which accepts 2 arguments: `error` and `addresses`

Use the postcode "ID1 1QD" to test integration for free. The complete list of test postcodes is available in the [documentation](https://ideal-postcodes/documentation/postcodes). Note that this method returns an empty array if no matching postcode is found.

```javascript
idealPostcodes.lookupPostcode("ID1 1QD", function (error, addresses) {
	if (error) {
		// Implement some error handling
	} 
	console.log(addresses); 	
});

//	[ {
//			postcode: 'ID1 1QD',
//			post_town: 'LONDON',
//			line_1: 'Kingsley Hall',
//			line_2: 'Powis Road',
//			line_3: '', 
//			organisation_name: '',
//			building_name: 'Kingsley Hall',
//			udprn: 12345678 
// 			...and so on...
//		}, ...
```

### Search for an address [(docs)](https://ideal-postcodes.co.uk/documentation/addresses#query)

This will perform a search for addresses which match your search term.

```
idealPostcodes.lookupAddress(searchQuery, callback)
```

- `searchQuery` (string | object). The address to search for. If string is passed, the string is used as a search term and default settings are applied (limit 10 results, return first page). If an object is provided, this object requires a `query` attribute pointing to your search string. It also accepts optional `limit` and `page` attributes.
- `callback` (function). Standard callback which accepts 2 arguments: `error` and `searchResults`

Use the address "ID1 1QD" to test integration for free. The complete list of test methods is available in the [documentation](https://ideal-postcodes/documentation/addresses).

```javascript
idealPostcodes.lookupAddress("ID1 1QD", function (error, searchResults) {
	if (error) {
		// Implement some error handling
	} 
	console.log(searchResults); 	
});

// or alternatively

idealPostcodes.lookupAddress({
	query: "ID1 1QD",  	// required
	limit: 10,				 	// optional
	page: 0 						// optional
}, function (error, searchResults) {
	if (error) {
		// Implement some error handling
	} 
	console.log(searchResults); 	
});

// {
//   "result":{
//     "total":2,
//     "limit":10,
//     "page":0,
//     "hits":[{
//       "dependant_locality" : "",
//       "postcode_type" : "L",
//       "po_box" : "",
//       "post_town" : "LONDON",
//       "delivery_point_suffix" : "1A",
//       "double_dependant_locality" : "",
//       "su_organisation_indicator" : " ",
//       "longitude" : -0.127695242183412,
//       "department_name" : "",
//       "district" : "Westminster",

//       continued...
```

### Get nearby postcode for a given geolocation [(docs)](https://ideal-postcodes.co.uk/documentation/postcodes#lonlat)

Retrieve the nearest postcodes for a given geolocation. (Free to use)

```
idealPostcodes.queryLocation(location, callback)
```

- `location` (object). Requires a `longitude` (number) and `latitude` (number) attribute. `Limit` (number) and `radius` (number) are optional.
- `callback` (function). Standard callback which accepts 2 arguments: `error` and `locations`

```javascript
idealPostcodes.queryLocation({
	longitude: -0.20864,	// Required
	latitude: 51.48994,		// Required
	limit: 10 		, 			// Optional, limits number of results
	radius:	100						// Optional, limits search radius
}, function (error, locations) {
	if (error) {
		// Implement some error handling
	} 
	console.log(locations); 	
});

//	[{
// 		postcode: "W14 9DT",
// 		northings: 178299,
// 		eastings: 524466,
// 		longitude: -0.208644362766368,
// 		latitude: 51.4899488390558,
// 		distance: 1.029038833
// 		}, ...
```

### Retrieve an address using UDPRN [(docs)](https://ideal-postcodes.co.uk/documentation/addresses#address)

Retrieve the specific address for a specific UDPRN.

```
idealPostcodes.lookupUdprn(udprn, callback)
```

- `udprn` (string). A number which uniquely identifies the address.
- `callback` (function). Standard callback which accepts 2 arguments: `error` and `locations`

Note that this method returns `null` if no matching address is found. Use the test UDPRN "0" to test integration for free.

```javascript
idealPostcodes.lookupUdprn(0, function (error, address) {
	if (error) {
		// Implement some error handling
	} 
	console.log(address); 
});

// {
//	"postcode":"ID1 1QD",
//	"postcode_inward":"IQD",
//	"postcode_outward":"ID1",
//	"post_town":"LONDON",
//	"dependant_locality":"",
//	"double_dependant_locality":"",
//	"thoroughfare":"Barons Court Road",
//	"dependant_thoroughfare":"",
//	"building_number":"2",
//	"building_name":"",
//	"sub_building_name":"",
//	"po_box":"",
//	"department_name":"",
//	"organisation_name":"",
//	"udprn":25962203,
//	"postcode_type":"S",
//	"su_organisation_indicator":"",
//	"delivery_point_suffix":"1G",
//	"line_1":"2 Barons Court Road",
//	"line_2":"",
//	"line_3":"",
//	"premise":"2",
//	"county": "",
//	"district": "Hammersmith and Fulham",
//	"ward": "North End",
//	"longitude":-0.208644362766368,
//	"latitude":51.4899488390558,
//	"eastings":524466,
//	"northings":178299
// }   
```

## Utility Methods

Listed below are free utility methods, e.g. finding the status of your key.

### Find out if your key is in a usable state [(docs)](https://ideal-postcodes.co.uk/documentation/keys#key)

Find out if your key is in a usable state. E.g. it has a positive balance, it is currently under your defined usage limits, etc.

```
idealPostcodes.keyAvailability(callback)
```

- `callback` (function). Standard callback which accepts 2 arguments: `error` and `key`. Key contains a boolean `available` attribute which indicates whether your key is currently usable.

```javascript
idealPostcodes.getAvailability(function (error, key) {
	if (error) {
		// Implement some error handling
	} 
	console.log(key.avaialble); // => true 	
});
```

### Find out private key information [(docs)](https://ideal-postcodes.co.uk/documentation/keys#details)

This method reveals private information about your key such as the lookup balance, whitelisted URLs, etc. It requires a secret key to be invoked.

```
idealPostcodes.keyDetails(callback)
```

- `callback` (function). Standard callback which accepts 2 arguments: `error` and `key`.

```javascript
idealPostcodes.keyDetails(function (error, key) {
	if (error) {
		// Implement some error handling
	} 
	console.log(key); 	
});

// {
//   "lookups_remaining": 8288,
//   "daily_limit": {
//       "limit": 1000,
//       "consumed": 361
//   },
//   "individual_limit": {
//       "limit": 15
//   },
//   "allowed_urls": [
//       "https://www.foo.com",
//       "https://www.bar.co.uk"
//   ],
//   "notifications": {
//       "emails": ["baz@bar.co.uk"],
//       "enabled": true
//   },
//       "automated_topups": {
//       "enabled": true
//   }
// }
```

If you intend to use this method, you must pass your secret key (which can be found on your [account page](https://ideal-postcodes.co.uk/account)) along with your API key when instantiating the client. E.g.

```javascript
var idealPostcodes = require("ideal-postcodes")("your_key_goes_here", "secret_key_goes_second");
```

## Error Handling

Each convenience method adopts the standard javascript error handling method. I.e. Any error is passed as the first argument of the callback. E.g.

```javascript
idealPostcodes.lookupPostcode("ID1 1QD", function (error, addresses) {
	if (error) {
		// Handle your errors here
	} 
});
```

Possible errors to look out for are listed in the [documentation](https://ideal-postcodes.co.uk/documentatpion/response-codes).

## Changelog

*0.2.2*
- Implemented [addresses resource](https://ideal-postcodes.co.uk/documentation/addresses)

*0.2.1*
- Implemented [keys resource](https://ideal-postcodes.co.uk/documentation/keys)

*0.2.0*

- Major rewrite to make way for more convenience methods
- Implemented [postcodes resource](https://ideal-postcodes.co.uk/documentation/postcodes). Added location-based postcode searches
- Overhauled test suite

## Documentation
More documentation can be found [here](https://ideal-postcodes.co.uk/documentation/node-js)

## License

MIT