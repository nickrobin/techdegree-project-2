
document.addEventListener('DOMContentLoaded', () => {
    /*
    variables for the student elements, header, and page
    */
    const students = document.getElementsByClassName("student-item cf");
    const header = document.getElementsByClassName("page-header cf");
    var page = document.getElementsByClassName("page");
    var linkList = '';
    //hide all results on load
    hideAll();
    //append some page links so we can click
    appendPageLinks();
    //then show the first 10 students by default
    showPage(1);

    /* little helper function to just hide everything
    used on load and then also on showPage function to clean up the old result
    I'm open to other ways of setting this up, but this seemed pretty easy and reusable */
    function hideAll() {
      for (i = 0; i < students.length; i++)
      {
        students[i].style.display = "none" ;
      }
    }

    //add the links for individual pages ontop of the existing HTML
    function appendPageLinks() {
          var pageLinks = '';
            for (i = 1; i <= (Math.ceil(students.length / 10)); i++){
              pageLinks += `<li><a id="page-${i}" href="#">${i}</a></li>`;
            }
            page[0].innerHTML += `<div class='pagination'><ul>` + pageLinks + `</ul></div>`;
            pageLinks = document.querySelectorAll(".pagination a");
            pageLinks[0].classList.add("active");

            //loop through the links added and set a listener on each
            for (j = 0; j < pageLinks.length; j++){
              let pageNum = j + 1;
              pageLinks[j].addEventListener('click', (event) => {
                //show the results for the page
                showPage(pageNum);
                //once more, loop through all the links and remove the active class
                //from anything that is not the current page
                for (k = 0; k < pageLinks.length; k++)
                {
                    if (k+1 != event.target.text)
                    {
                    pageLinks[k].classList.remove("active");
                  } else {
                    pageLinks[k].classList.add("active");
                  }
                }
              });
            }
        }

    //accepts argument of page # and returns the users related to that page
    function showPage(page) {
        //hide everything so we can only show the new ones
        hideAll();
        //find the number to start and end i at
        var starting = (page - 1) * 10;
        var ending = starting + 10;
        //iterate through students to show which ones we want to show
        for(i = starting; i < ending && i < students.length; i++){
          students[i].style.display = "block" ;
        }
      }
});
