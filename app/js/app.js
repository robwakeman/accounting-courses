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

  const filterAll = document.querySelector("[data-filter='all']");
  // console.log('filterTax is: ', filterTax);
  const filterTax = document.querySelector("[data-filter='tax']");
  // console.log('filterTax is: ', filterTax);
  const filterCommunication = document.querySelector("[data-filter='communication']");
  // console.log('filterTax is: ', filterTax);
  const filterTechnology = document.querySelector("[data-filter='technology']");
  // console.log('filterTax is: ', filterTax);

  // API URL (array of 29 objects)
  const APIURL = 'https://learn.accountingcpd.net/ACPD/API/Test/SampleObject';
  let coursesAll;
  let coursesTax;
  let coursesCommunication;
  let coursesTechnology;

  // get courses
  function getCourses() {
    fetch(APIURL)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        // console.log(data);

        // save the data in variable coursesAll
        coursesAll = data;

        coursesTax = coursesAll.filter(course => course.type === 'tax');
        console.log('coursesTax: ', coursesTax);
        coursesCommunication = coursesAll.filter(course => course.type === 'communication');
        console.log('coursesCommunication: ', coursesCommunication);
        coursesTechnology = coursesAll.filter(course => course.type === 'technology');
        console.log('coursesTechnology: ', coursesTechnology);

        // console.log(coursesAll);

        // show all courses on first load
        showOutput(coursesAll);
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

  function showOutput(outputData) {
    let output = `<h2>Courses (${outputData.length})</h2>`;
    outputData.forEach(function(course) {
      output += `
      <div">
        <h3>${course.title}</h3>
        <p>${course.type}</p>
      </div>
    `;
    });
    coursesContainer.innerHTML = output;
  }

  getCourses();

  filterAll.addEventListener(
    'click',
    function() {
      showOutput(coursesAll);
    },
    false
  );

  filterTax.addEventListener(
    'click',
    function() {
      showOutput(coursesTax);
    },
    false
  );

  filterCommunication.addEventListener(
    'click',
    function() {
      showOutput(coursesCommunication);
    },
    false
  );

  filterTechnology.addEventListener(
    'click',
    function() {
      showOutput(coursesTechnology);
    },
    false
  );

  /*
   *
   *
   * */
} // END runApp()
