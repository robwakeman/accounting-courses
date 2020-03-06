// DOMContentLoaded may fire before your script has a chance to run, so it is wise to check before adding a listener.

// If the DOMContentLoaded had fired already and we only had the code wrapped in document.addEventListener('DOMContentLoaded'..., then the code would not run, because there would be no DOMContentLoaded event to fire it.

// Instead, check if (document.readyState === 'loading') i.e. check the document is still loading before trying to respond to the DOMContentLoaded event.

if (document.readyState === 'loading') {
  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', runApp);
} else {
  // `DOMContentLoaded` has already fired
  runApp();
}

function runApp() {
  console.log('This is in runApp');
  console.log('DOM loaded');
  console.log('Load script.js lmn');

  // testing ES6/Babel
  const func = msg => console.log(msg);

  func('hello there ddee');
}
