console.log(`This is in app.js outside of runApp`);

function runApp() {
  console.log('This is in runApp (in app.js)');

  // testing ES6/Babel
  const func = msg => console.log(msg);

  func('hello there called inside runApp');
}
