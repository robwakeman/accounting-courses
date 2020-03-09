function runApp() {
  // get elements
  const coursesDiv = document.querySelector('[data-courses]');

  const filterAllBtn = document.querySelector("[data-filter='all']");
  const filterTaxBtn = document.querySelector("[data-filter='tax']");
  const filterCommunicationBtn = document.querySelector("[data-filter='communication']");
  const filterTechnologyBtn = document.querySelector("[data-filter='technology']");

  // API URL (array of 29 objects)
  const APIURL = 'https://learn.accountingcpd.net/ACPD/API/Test/SampleObject';
  let coursesAll;
  let coursesTax;
  let coursesCommunication;
  let coursesTechnology;
  let output;
  let imageSrcNoExt;

  // get courses
  function getCourses() {
    fetch(APIURL)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        // console.log(data);

        // save the data in variable coursesAll
        coursesAll = data;

        // filter the array by course category
        coursesTax = coursesAll.filter(course => course.type === 'tax');
        console.log('coursesTax: ', coursesTax);
        coursesCommunication = coursesAll.filter(course => course.type === 'communication');
        console.log('coursesCommunication: ', coursesCommunication);
        coursesTechnology = coursesAll.filter(course => course.type === 'technology');
        console.log('coursesTechnology: ', coursesTechnology);

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
    output = `<div style="font-size: small; color: orange; margin-bottom: 1rem;">Debug num courses: ${outputData.length}</div>`;
    outputData.forEach(function(course) {
      // regex expression that allows for 3 or 4 character file extensions
      imageSrcNoExt = course.imageSrc.replace(/\.[^/.]+$/, '');

      output += `
      <div class="course">
      <!-- responsive image code to include here -->
            <img src="dist/images/${imageSrcNoExt}-1x.jpg" alt="${course.altText}" />
            <h2 class="course__title">${course.title}</h2>
            <p class="course_description">${course.type}</p>
            <div class="course__price">Price: &pound;${course.price}</div>
      </div>
    `;
    });
    coursesDiv.innerHTML = output;
  }

  getCourses();

  filterAllBtn.addEventListener(
    'click',
    function() {
      showOutput(coursesAll);
    },
    false
  );

  filterTaxBtn.addEventListener(
    'click',
    function() {
      showOutput(coursesTax);
    },
    false
  );

  filterCommunicationBtn.addEventListener(
    'click',
    function() {
      showOutput(coursesCommunication);
    },
    false
  );

  filterTechnologyBtn.addEventListener(
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
