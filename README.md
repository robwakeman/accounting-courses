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

### Fetch

Fetch and Promises have very good browser support according to Can I use:  
[Promises](https://caniuse.com/#search=promise)  
[Fetch](https://caniuse.com/#search=fetch)

But, there is no IE11 support, of course.

So, I wanted to polyfill them.

I added the following polyfills to a polyfills.js file:

Fetch polyfill
https://github.com/github/fetch  
Promise polyfill
https://www.npmjs.com/package/promise-polyfill

polyfills.js was processed through Gulp tasks to concatenate and minify into dist/all.js

However, this broke the script.

I didn't have time to solve this.
