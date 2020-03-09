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

  /********* BEGIN LOAD MORE ************** */
  // load-more code

  // const loadCoursesBtn = document.getElementById("loadCourses");
  const loadMoreBtn = document.querySelector('[data-load-more]');

  // const coursesList = document.querySelector(".courses");
  // let coursesListElements;
  let numLoads = 0;
  let coursesBatch;
  let numBatches;

  const addToNumLoads = () => {
    numLoads++;
    console.log('numLoads: ', numLoads);
  };

  const resetNumLoads = () => {
    numLoads = 0;
    console.log('numLoads after reset: ', numLoads);
  };

  const loadCourses = (coursesArr, batchSize, type) => {
    console.log('load courses');

    if (coursesArr.length) {
      console.log('batchSize', batchSize);
      console.log('1st arg', (numLoads - 1) * batchSize);
      console.log('2nd arg', numLoads * batchSize);

      numBatches = coursesArr.length / batchSize; //2.3
      console.log('numBatches', numBatches);

      coursesBatch = coursesArr.slice((numLoads - 1) * batchSize, batchSize * numLoads);
      console.log('coursesBatch: ', coursesBatch);

      // coursesListElements = coursesBatch.map(course => {
      //   return `<li class="course__item">${course}</li>`;
      // });

      // if the number of loads is equal to the number of batches, then disable the button
      if (numLoads === Math.ceil(numBatches)) {
        console.log('numLoads === Math.ceil(numBatches), so disable the button to prevent loading more courses');
        loadMoreBtn.setAttribute('disabled', '');
      }

      // coursesList.innerHTML += coursesListElements.join('');
      // copy showOutput over to load more to test
      showOutput(coursesBatch, type);
    }
  };

  loadMoreBtn.addEventListener('click', function() {
    addToNumLoads();
    loadCourses(coursesAll, 10);
  });

  /*********** END LOAD MORE ************ */

  // get courses
  function getCourses() {
    fetch(APIURL)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        // console.log(data);

        // save the data in variable coursesAll
        coursesAll = data;
        // console.log('coursesAll: ', coursesAll);

        // filter the array by course category
        coursesTax = coursesAll.filter(course => course.type === 'tax');
        // console.log('coursesTax: ', coursesTax);
        coursesCommunication = coursesAll.filter(course => course.type === 'communication');
        // console.log('coursesCommunication: ', coursesCommunication);
        coursesTechnology = coursesAll.filter(course => course.type === 'technology');
        // console.log('coursesTechnology: ', coursesTechnology);

        // show all courses on first load
        // showOutput(coursesAll);
        addToNumLoads();
        // on first fetch, load 10 courses from all categories
        loadCourses(coursesAll, 10, 'all');
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

  function showOutput(outputData, type) {
    output = `<div style="font-size: small; color: orange; margin-bottom: 1rem;">Debug num courses: ${outputData.length} ${type}</div>`;
    outputData.forEach(function(course, i) {
      // regex expression that allows for 3 or 4 character file extensions
      imageSrcNoExt = course.imageSrc.replace(/\.[^/.]+$/, '');

      output += `
      <div class="course">
      <!-- responsive image code to include here -->
      <!-- width: 30px just for testing the load more code - easier to see -->
            <img style="width: 30px" src="dist/images/${imageSrcNoExt}-1x.jpg" alt="${course.altText}" />
            <h2 class="course__title">${i + 1} - ${course.title}</h2>
            <p class="course_description">${course.type}</p>
            <div class="course__price">Price: &pound;${course.price}</div>
      </div>
    `;
    });
    // coursesDiv.innerHTML = output;
    coursesDiv.innerHTML += output;
  }

  function clearCoursesDiv() {
    coursesDiv.innerHTML = '';
  }

  getCourses();

  filterAllBtn.addEventListener(
    'click',
    function() {
      // showOutput(coursesAll);
      clearCoursesDiv();
      resetNumLoads();
      addToNumLoads();
      loadCourses(coursesAll, 10, 'all');
    },
    false
  );

  filterTaxBtn.addEventListener(
    'click',
    function() {
      // showOutput(coursesTax);
      clearCoursesDiv();
      resetNumLoads();
      addToNumLoads();
      loadCourses(coursesTax, 10, 'tax');
    },
    false
  );

  filterCommunicationBtn.addEventListener(
    'click',
    function() {
      // showOutput(coursesCommunication);
      clearCoursesDiv();
      resetNumLoads();
      addToNumLoads();
      loadCourses(coursesCommunication, 10, 'communication');
    },
    false
  );

  filterTechnologyBtn.addEventListener(
    'click',
    function() {
      // showOutput(coursesTechnology);
      clearCoursesDiv();
      resetNumLoads();
      addToNumLoads();
      loadCourses(coursesTechnology, 10, 'technology');
    },
    false
  );

  /*
   *
   *
   * */
} // END runApp()
