console.log(`This is in app.js outside of runApp`);

function runApp() {
  console.log('This is in runApp (in app.js)');

  // testing ES6/Babel
  const func = msg => console.log(msg);

  func('hello there called inside runApp');

  /* ************************** */

  // get elements
  const coursesContainer = document.querySelector('[data-courses]');
  // console.log('coursesContainer is: ', coursesContainer);

  // API URL (array of 29 objects)
  const APIURL = 'https://learn.accountingcpd.net/ACPD/API/Test/SampleObject';

  // get courses
  function getCourses() {
    fetch(APIURL)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        let output = '<h2>Courses</h2>';
        data.forEach(function(course) {
          output += `
      <div">
        <h3>${course.title}</h3>
        <p>${course.type}</p>
      </div>
    `;
        });
        coursesContainer.innerHTML = output;
      })
      .catch(err => console.log('Catch Error', err));
  }

  // handle errors
  function handleErrors(res) {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res;
  }

  getCourses();
} // END runApp()
