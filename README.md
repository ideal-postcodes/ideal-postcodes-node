# Ideal Postcodes Node.js API Wrapper

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

This method will retrieve a complete list of addresses at a given postcode.

```
idealPostcodes.lookupPostcode(postcode, callback)
```

- `postcode` (string). The postcode to search for.
- `callback` (function). Standard callback which accepts 2 arguments: `error` and `addresses`

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

## Documentation
More documentation can be found [here](https://ideal-postcodes.co.uk/documentation/node-js)

## License

MIT