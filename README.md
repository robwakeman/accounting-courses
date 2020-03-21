# Accounting Courses

Coding test for Nelson Croom.

Design: [XD file](https://xd.adobe.com/view/e32b2883-a592-4385-4f5a-7fcefe945f8a-951a/screen/6481ffeb-3e29-41f2-9a7a-b25cf144a39d/Mobile)

[Demo](http://robwakemandev.com/accounting-courses/)

## Task runner

Gulp 4

- Compile the SCSS files to CS
- Autoprefix and minify the CSS file
- Transpile the JS using Babel
- Concatenate the JS files
- Uglify the JS files
- Move final CSS and JS files to the /dist folder

## Notes

### Sort by

'Sort by' functionality now working. The ‘sort by’ selected option is remembered if switching filter.

### Fetch/Axios

Fetch and Promises have very good browser support according to Can I use:  
[Promises](https://caniuse.com/#search=promise)  
[Fetch](https://caniuse.com/#search=fetch)

But, there is no IE11 support, of course.

So, I wanted to polyfill them.

I added the following polyfills to a polyfills.js file (with Promise coming before Fetch):

Promise polyfill
https://www.npmjs.com/package/promise-polyfill

Fetch polyfill
https://github.com/github/fetch

polyfills.js was processed through Gulp tasks to concatenate and minify into dist/all.js

However, this broke the script:

`Uncaught ReferenceError: exports is not defined`

Adding `var exports = {};` didn't solve it, as in:  
https://github.com/robwakeman/fetch-sandbox

So, ultimately, I decided to use Axios instead as it comes with good cross-browser support.

Axios and a Promises polyfill are provided by CDN links, but ideally I'd like to try and include the code in polyfills.js and concatenate into all.js, however I ran out of time.

### Connection issues

I had some connection issues, so I decided to copy the data from the API into a local JSON file while issues persisted.

The current data is sourced from https://learn.accountingcpd.net/ACPD/API/Test/SampleObject
