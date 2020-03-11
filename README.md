# Accounting Courses

Coding test for Nelson Croom.

Design: [XD file](https://xd.adobe.com/view/e32b2883-a592-4385-4f5a-7fcefe945f8a-951a/screen/6481ffeb-3e29-41f2-9a7a-b25cf144a39d/Mobile)

[Demo](http://dev.robwakeman.com/accounting-courses/) (work in progress)

## Task runner

Gulp 4

- Compile the SCSS files to CS
- Autoprefix and minify the CSS file
- Transpile the JS using Babel
- Concatenate the JS files
- Uglify the JS files
- Move final CSS and JS files to the /dist folder

## Notes

### Layout

I realise the layout doesn't exactly match the XD file - with a little more time, I would've liked to have fixed this:

- text and CTA button in hero doesn't left-align to match alignment of courses
- filter button group doesn't have full-width white background

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

I decided to use Axios instead as it comes with good cross-browser support by default.

It's working fine, but ideally I'd like to try and include the code in polyfills.js and concatenate into all.js, however I ran out of time.

### Connection issues

I had some local connection issues, so decided to copy the data from the API into a local JSON file while issues persisted.
