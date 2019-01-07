
document.addEventListener('DOMContentLoaded', () => {
    /*
    variables for the student elements, header, and page
    */
    const studentsList = document.getElementsByClassName("student-item cf");
    const header = document.getElementsByClassName("page-header cf");
    const pageElements = document.getElementsByClassName("page");
    var page = pageElements[0];
    var linkList = '';
    //hide all results on load
    hideAll();
    //append some page links so we can click
    appendPageLinks(studentsList);
    //then show the first 10 students by default
    showPage(1);

    /* little helper function to just hide everything
    used on load and then also on showPage function to clean up the old result
    I'm open to other ways of setting this up, but this seemed pretty easy and reusable */
    function hideAll() {
      for (i = 0; i < studentsList.length; i++)
      {
        studentsList[i].style.display = "none" ;
      }
    }

    //add the links for individual pages ontop of the existing HTML
    function appendPageLinks(studentsList) {

            const paginationDiv = document.createElement('div');
            const ul = document.createElement('ul');
            const ulChildren = ul.children

            paginationDiv.className = "pagination";
            paginationDiv.appendChild(ul);
            page.appendChild(paginationDiv);

            for (i = 1; i <= (Math.ceil(studentsList.length / 10)); i++){
              var li = document.createElement('li');
              var a = document.createElement('a');
              a.text = i;
              li.appendChild(a);
              ul.appendChild(li);
            }

            ul.children[0].querySelector('a').classList.add('active');

            //loop through the links added and set a listener on each
            for (j = 0; j < ulChildren.length; j++){
              ulChildren[j].addEventListener('click', (event) => {
                //show the results for the page
              showPage(event.target.text);

                //once more, loop through all the links and remove the active class
                //from anything that is not the current page
                for (k = 0; k < ul.children.length; k++)
                {
                    if (k+1 != event.target.text)
                    {
                      ulChildren[k].querySelector('a').classList.remove('active');
                      //ul.children[k].querySelector('a').classList.add('active');
                  } else {
                      ulChildren[k].querySelector('a').classList.add('active');
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
        for(i = starting; i < ending && i < studentsList.length; i++){
          studentsList[i].style.display = "block" ;
        }
      }
});
