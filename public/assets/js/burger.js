$(document).ready (function(){

    $.ajax("/api/burger").then(function(data){
  
      var burgers = data.burgers;
  
      var readyEl = $("#ready");
      var devouredEl = $("#devoured");

        for(var i = 0; i < burgers.length; i++){
            if (burgers[i].devoured) {
                devouredEl.append(`<p>${burgers[i].burger_name}<button data-burgerid='${burgers[i].id}' class='btn btn-danger deleteBtn'>I can't eat anymore</button></p>`)
            }
            else {
                readyEl.append(`<p>${burgers[i].burger_name}<button data-burgerid='${burgers[i].id}' class='btn btn-primary devourBtn'>Devour!</button></p>`)
            }
        }
  
    })
  
    $(document).on("click",".deleteBtn", function(event) {
      // Get the ID from the button.
      // This is shorthand for $(this).attr("data-planid")
      var id = $(this).data("burgerid");
  
      // Send the DELETE request.
      $.ajax("/delete/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted id ", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    // $('#newBurger').on('change', function(event){
    //     console.log($("#newBurger").val().trim());
    // })
  
    $("#addBurger").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
    // console.log('TEST');
  
      // [name=plan] will find an element with a "name" attribute equal to the string "plan"
      var newBurger = {
        burger_name: $("#newBurger").val().trim(),
        // devoured: false
      };

      console.log(newBurger);
  
      // Send the POST request.
      $.ajax("/api/create", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(document).on("click", ".devourBtn", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var id = $(this).data('burgerid')
      console.log(id);
  
      // Send the PUT request.
      $.ajax("/api/devour/" + id, {
        type: "PUT"
      }).then(
        function() {
          console.log("updated id ", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
  })
  
  