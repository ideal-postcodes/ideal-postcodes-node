# Ideal Postcodes Node.js API Wrapper

Ideal Postcodes is a simple JSON API to query UK postcodes and addresses. Find out more at [Ideal-Postcodes.co.uk](https://ideal-postcodes.co.uk/)

Our API is based off Royal Mail's Postcode Address File and is updated daily. Each convenience method incurs a small charge (typically 2p) - free methods are labelled as free and based off open data sources.

## Getting Started

**Install**

```bash
npm install ideal-postcodes
```

**Create a Key**

Sign up at [Ideal-Postcodes.co.uk](https://ideal-postcodes.co.uk) and create a key.

**Configure**

Include your api key when requiring the ideal-postcodes module. This will return an object instance you can use to perform lookups using the Ideal Postcodes API.

```javascript
var idealPostcodes = require("ideal-postcodes")("<your_key_goes_here>")
```

## Methods

Each client instance provides a number of convenience methods to allow you to get specific jobs done quickly and easily. These convenience methods are listed below:

### Get all addresses for a postcode [(docs)](https://ideal-postcodes.co.uk/documentation/postcodes#postcode)

This method will retrieve a complete list of addresses at a given postcode.

```
idealPostcodes.lookupPostcode(postcode, callback)
```

- `postcode` (string). The postcode to search for.
- `callback` (function). Standard callback which accepts 2 methods: `error` and `addresses`

Use the postcode "ID1 1QD" to test integration for free. The complete list of test postcodes is available in the [documentation](https://ideal-postcodes/documentation/postcodes).

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


### Get nearby postcode for a given geolocation [(docs)](https://ideal-postcodes.co.uk/documentation/postcodes#lonlat)

This method will retrieve the nearest postcodes for a given geolocation. (Free to use)

```
idealPostcodes.queryLocation(location, callback)
```

- `location` (object). Requires a `longitude` (number) and `latitude` (number) attribute. `Limit` (number) and `radius` (number) are optional.
- `callback` (function). Standard callback which accepts 2 methods: `error` and `locations`

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

## Documentation
More documentation can be found [here](https://ideal-postcodes.co.uk/documentation/node-js)

## License

MIT