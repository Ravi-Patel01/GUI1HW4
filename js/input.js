//Ravi Patel ravi_patel1@student.uml.edu

$(document).ready(function() {
    checkvals()
});

function draw_table() {
    
    if($("#x_y_input").valid() == false) return false;

    var table = document.createElement('table'); //create table

    table.setAttribute('id', 'info'); //set table id for traversal and extraction

    var arrHead = new Array();
    var x_y_input = document.getElementById("x_y_input"); //retrieve vals and place in vars
    var x_start = x_y_input.elements[0];
    var x_end = x_y_input.elements[1];
    var y_start = x_y_input.elements[2];
    var y_end = x_y_input.elements[3];
    
    //check if number
    if(isNaN(x_start.value) || isNaN(x_end.value) || isNaN(y_start.value) || isNaN(y_end.value)) {
        document.getElementById("demo").innerHTML = "<br>" + "must input a number!" + "</br>"
        return
    } else {
        document.getElementById("demo").innerHTML = "<br>" + "</br>"
    }
    //check if start is greater than end
    if(x_start.value > x_end.value || y_start.value > y_end.value){
        document.getElementById("demo").innerHTML = "<br>" + "starting values must be less than ending values!" + "</br>"
        return
    } else {
        document.getElementById("demo").innerHTML = "<br>" + "</br>"
    }
    //check if out of acceptable tange of vals (-50 to 50)
    if(x_start.value < -50 || x_end.value > 50 || y_start.value < -50 || y_end.value > 50)  {
        document.getElementById("demo").innerHTML = "<br>" + "must input a value between -50 and 50" + "</br>"
        return
    } else {
        document.getElementById("demo").innerHTML = "<br>" + "</br>"
    }

    //creates table header with x start and end vals
    arrHead = [''];
    var j = 0;
    for(var i = x_start.value; i <= x_end.value; i++) {
        var temp = parseInt(x_start.value) + j;
        arrHead.push(temp);
        j++;
    }

    var arrValue = new Array();
    var tempArray = new Array();
    
    //fill each row and push onto larger list of rows
    for(var i = y_start.value; i <= y_end.value; i++){
        tempArray.push(i);
        for(var j = x_start.value; j <= x_end.value; j++) {
            tempArray.push(i * j);
        }
        arrValue.push(tempArray)
        tempArray = [];
    }

    var tr = table.insertRow(-1);
    //input header
    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th');
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }
    //input rows
    for (var c = 0; c <= arrValue.length - 1; c++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < arrHead.length; j++) {
            var td = document.createElement('td');
            td = tr.insertCell(-1);
            td.innerHTML = arrValue[c][j];
        }
    }

    //replace placeholder table with created table
    document.getElementById("info").replaceWith(table);

}

function checkvals() {
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
      });
       $("#x_y_input").validate({
        rules: {
          field1: {
            required: true,
            number: true,
            min: -50,
            max: 50,
          },
          field2: {
            required: true,
            number: true,
            min: -50,
            max: 50,
          },
          field3: {
            required: true,
            number: true,
            min: -50,
            max: 50,
            
          },
          field4: {
            required: true,
            number: true,
            min: -50,
            max: 50,
          },
        },
          messages: {
            field1: {
                min: "The x start number is too low. x start must be greater than -50 but less than 50.",
                max: "The x start number is too high. x start must be greater than -50 but less than 50.",
                number: "x start value is not a number between -50 and 50.",
                required: "Error, no x start value inputted. Please enter a value.",
            },
            field2: {
                min: "The x end number is too low. x end must be greater than -50 but less than 50.",
                max: "The x end number is too high. x end must be greater than -50 but less than 50.",
                number: "x end value is not a number between -50 and 50.",
                required: "Error, no x end value inputted. Please enter a value.",
            },
            field3: {
                min: "The y start number is too low. y start must be greater than -50 but less than 50.",
                max: "The y start number is too high. y start must be greater than -50 but less than 50.",
                number: "y start value is not a number between -50 and 50.",
                required: "Error, no y start value inputted. Please enter a value.",
                
            },
            field4: {
                min: "The y end number is too low. y end must be greater than -50 but less than 50.",
                max: "The y end number is too high. y end must be greater than -50 but less than 50.",
                number: "y end value is not a number between -50 and 50.",
                required: "Error, no y end value inputted. Please enter a value.",
            },
        }
    });
    $.validator.addMethod("lessThan", function (value, element, param) {
            var $otherElement = $(param);
            return parseInt(value, 10) <= parseInt($otherElement.val(), 10);
      });
}