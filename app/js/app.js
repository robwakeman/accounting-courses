function runApp() {
  // get elements
  const coursesDiv = document.querySelector('[data-courses]');

  const filterAllBtn = document.querySelector("[data-filter='all']");
  const filterTaxBtn = document.querySelector("[data-filter='tax']");
  const filterCommunicationBtn = document.querySelector("[data-filter='communication']");
  const filterTechnologyBtn = document.querySelector("[data-filter='technology']");
  // const filterButtons = document.querySelectorAll('.btn');
  const filterButtonGroup = document.querySelector('[data-filter-button-group]');

  // API URL (array of 29 objects)
  const APIURL = 'https://learn.accountingcpd.net/ACPD/API/Test/SampleObject';
  let coursesAll;
  let coursesTax;
  let coursesCommunication;
  let coursesTechnology;
  let currentType;
  let output;
  let imageSrcNoExt;

  const loadMoreBtn = document.querySelector('[data-load-more]');

  let numLoads = 0;
  let coursesBatch;
  let numBatches;
  // totalCourses used in logic for testing, but debug output currently disabled
  let totalCourses;
  let courseFilter;

  const addToNumLoads = () => {
    numLoads++;
    console.log('numLoads in addToNumLoads: ', numLoads);
  };

  const reset = () => {
    numLoads = 0;
    console.log('numLoads after reset: ', numLoads);
    loadMoreBtn.removeAttribute('disabled');
  };

  const loadCourses = (coursesArr, batchSize, type) => {
    console.log('load courses');

    currentType = type;
    console.log('%c currentType', 'background: #222; color: #bada55', currentType);

    if (coursesArr.length) {
      console.log('batchSize', batchSize);
      console.log('1st arg', (numLoads - 1) * batchSize);
      console.log('2nd arg', numLoads * batchSize);

      numBatches = coursesArr.length / batchSize; //2.3
      console.log('numBatches', numBatches);

      coursesBatch = coursesArr.slice((numLoads - 1) * batchSize, batchSize * numLoads);
      console.log('coursesBatch: ', coursesBatch);

      // if the number of loads is equal to the number of batches, then disable the button
      if (numLoads === Math.ceil(numBatches)) {
        console.log('numLoads === Math.ceil(numBatches), so disable the button to prevent loading more courses');
        loadMoreBtn.setAttribute('disabled', '');
        loadMoreBtn.textContent = 'No more courses';
      }

      showOutput(coursesBatch, type);
    }
  };

  loadMoreBtn.addEventListener('click', function() {
    addToNumLoads();
    if (currentType === 'all') {
      loadCourses(coursesAll, 10, currentType);
    } else if (currentType === 'tax') {
      loadCourses(coursesTax, 10, currentType);
    } else if (currentType === 'communication') {
      loadCourses(coursesCommunication, 10, currentType);
    } else if (currentType === 'technology') {
      loadCourses(coursesTechnology, 10, currentType);
    }
  });

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
    if (currentType === 'all') {
      totalCourses = coursesAll.length;
    } else if (currentType === 'tax') {
      totalCourses = coursesTax.length;
    } else if (currentType === 'communication') {
      totalCourses = coursesCommunication.length;
    } else if (currentType === 'technology') {
      totalCourses = coursesTechnology.length;
    }

    // debug output - currently disabled
    // output = `<div style="font-size: small; color: orange; margin-bottom: 1rem;">DEBUG No. courses loaded: ${outputData.length} ${type} (Total ${totalCourses})</div>`;

    output = ``;

    outputData.forEach(function(course, i) {
      // regex expression that allows for 3 or 4 character file extensions
      imageSrcNoExt = course.imageSrc.replace(/\.[^/.]+$/, '');

      output += `
      <div class="course">
      <!-- responsive image code to include here -->
            <img src="dist/images/${imageSrcNoExt}-1x.jpg" alt="${course.altText}" />
            <h2 class="course__title">${i + 1} - ${course.title}</h2>
            <p class="course_description">${course.type}</p>
            <div class="course__price">Price: &pound;${course.price}</div>
      </div>
    `;
    });
    coursesDiv.innerHTML += output;
  }

  function clearCoursesDiv() {
    coursesDiv.innerHTML = '';
  }

  getCourses();

  /*   filterAllBtn.addEventListener(
    'click',
    function() {
      // showOutput(coursesAll);
      clearCoursesDiv();
      reset();
      addToNumLoads();
      loadCourses(coursesAll, 10, 'all');
    },
    false
  ); */

  /*   filterTaxBtn.addEventListener(
    'click',
    function() {
      // showOutput(coursesTax);
      clearCoursesDiv();
      reset();
      addToNumLoads();
      loadCourses(coursesTax, 10, 'tax');
    },
    false
  ); */

  /*   filterCommunicationBtn.addEventListener(
    'click',
    function() {
      // showOutput(coursesCommunication);
      clearCoursesDiv();
      reset();
      addToNumLoads();
      loadCourses(coursesCommunication, 10, 'communication');
    },
    false
  ); */

  /*   filterTechnologyBtn.addEventListener(
    'click',
    function() {
      // showOutput(coursesTechnology);
      clearCoursesDiv();
      reset();
      addToNumLoads();
      loadCourses(coursesTechnology, 10, 'technology');
    },
    false
  ); */

  // let filterButtons = document.querySelectorAll('.popupbutton');
  // buttons.forEach(btn => {
  //   btn.addEventListener('click', event => {
  //     alert(event.target);
  //   });
  // });

  filterButtonGroup.addEventListener('click', event => {
    // console.log('data attr filter: ', event.target.dataset.filter);
    courseFilter = event.target.dataset.filter;
    clearCoursesDiv();
    reset();
    addToNumLoads();

    if (courseFilter === 'all') {
      loadCourses(coursesAll, 10, 'all');
    } else if (courseFilter === 'tax') {
      loadCourses(coursesTax, 10, 'tax');
    } else if (courseFilter === 'communication') {
      loadCourses(coursesCommunication, 10, 'communication');
    } else if (courseFilter === 'technology') {
      loadCourses(coursesTechnology, 10, 'technology');
    }
  });

  /*
   *
   *
   * */
} // END runApp()
