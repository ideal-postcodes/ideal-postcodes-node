# Ideal Postcodes Node.js API Wrapper

Get a full list of addresses for any given UK postcode using the Ideal-Postcodes.co.uk API. We use the most accurate addressing database in the UK, Royal Mail's Postcode Address File.

## Getting Started

Install it

```bash
npm install ideal-postcodes
```
	


```javascript
<div id="postcode_lookup_field"></div>
```

5) Call idealPostcodes() on your empty div tag wrapped in a jQuery object, passing your API key and CSS selectors to indicate where the results should be piped to.

```html
<script>
$('#postcode_lookup_field').idealPostcodes({
	api_key: 'ak_Iddqd8Idkfa7Idchoppers8',  // Set your API key
	address_line_one: '#first_line',	// Enter CSS selectors to your input...
	address_line_two: '#second_line',	// fields to pipe your results
	address_line_three: '#third_line',
	post_town_line: '#town',
	postcode_line: '#postcode'
});
</script>
```

6) Test using the postcode "ID1 1QD"

## Registering

PAF is licensed from the Royal Mail and is, unfortunately, not free to use. Ideal Postcodes aims to be simple to use and fairly priced to use for web and mobile developers.

We charge _2p_ per [external](https://ideal-postcodes.co.uk/termsandconditions#external) lookup.

## Documentation
More documentation can be found [here](https://ideal-postcodes.co.uk/documentation)