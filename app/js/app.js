console.log(`This is in app.js and now comes last, because I've specified the order in gulpfile.js for concat`);

function runApp() {
  console.log('This is in runApp');
  console.log('DOM loaded');
  console.log('Load script.js nop');

  // testing ES6/Babel
  const func = msg => console.log(msg);

  func('hello there');
}
