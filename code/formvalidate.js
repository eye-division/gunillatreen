<!-- hide from old browsers
// A utility function that returns true if a string contains only 
// whitespace characters.
function isblank(s) {
    for(var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if ((c != ' ') && (c != '\n') && (c != '\t')) return false;
    }
    return true;
}

// This is the function that performs form verification. It is invoked
// from the onsubmit event handler. The handler should return whatever
// value this function returns.
function verify(f) {
    var msg;
    var empty_fields = "";
    var errors = "";

    // Loop through the elements of the form, looking for all 
    // text and textarea elements that don't have an "optional" property
    // defined. Then, check for fields that are empty and make a list of them.
    // Also, if any of these elements have a "min" or a "max" property defined,
    // verify that they are numbers and in the right range.
    // If the element has a "numeric" property defined, verify that
    // it is a number, but don't check its range.
    // Put together error messages for fields that are wrong.
	
	// june 9 2004, AW added password as required type
	// how do I add radio buttons ?
	
    for(var i = 0; i < f.length; i++) {
        var e = f.elements[i];
        if (((e.type == "text") || (e.type == "password") || (e.type == "textarea") || (e.type == "radio")) && !e.optional) 
		{
            // first check if the field is empty
            if ((e.value == null) || (e.value == "") || isblank(e.value)) {
                empty_fields += "\n          " + e.name;
                continue;
            }
			
			// check for radio buttons?
			
            // Now check for fields that are supposed to be numeric.
            if (e.numeric || (e.min != null) || (e.max != null)) { 
                var v = parseFloat(e.value);
                if (isNaN(v) || 
                    ((e.min != null) && (v < e.min)) || 
                    ((e.max != null) && (v > e.max))) {
                    errors += "- The field " + e.name + " must be a number";
                    if (e.min != null) 
                        errors += " that is greater than " + e.min;
                    if (e.max != null && e.min != null) 
                        errors += " and less than " + e.max;
                    else if (e.max != null)
                        errors += " that is less than " + e.max;
                    errors += ".\n";
                }
            } // end numeric check
			

			// check for emails field
			if (e.email && !isblank(e.value))
			{
				var seenAt = false;
				var append = "";
				for(var j = 0; j < e.value.length; j++)
				{
					var c = e.value.charAt(j);
					if ((c == ' ') || (c == '\n') || (c == '\t'))
					append += "\n           - not contain white space";
					if ((c =='@') && (seenAt == true))
					append += "\n           - contain only one @";
					if ((c =='@'))
					seenAt = true;
				}
				if (seenAt == false)
				append += "\n              - contain exactly one @";
				if (append)
					errors += "- The field " + e.name + " must: " + append;
			} // end email check
			
			// link checker here - ie must be of form http://
			if (e.link && !isblank(e.value))
			{
				var seenAt = false;
				var append = "";

				for(var j = 0; j < e.value.length; j++)
				{
					var c = e.value.charAt(j);
					if ((c == ' ') || (c == '\n') || (c == '\t')) // must have no spaces
					append += "\n           - not contain white space";
				}
				// must have http:// in it
				if (append)
					errors += "- The field " + e.name + " must: " + append;
			} // end if link
        }
    }

	// check for radio buttons?
var el = document.forms[0].elements;
 for(var i = 0 ; i < el.length ; ++i) {
  if(el[i].type == "radio") {
   var radiogroup = el[el[i].name]; // get the whole set of radio buttons.
   var itemchecked = false;
   for(var j = 0 ; j < radiogroup.length ; ++j) 
   {
    if(radiogroup[j].checked) 
	{
	 itemchecked = true;
	 break;
	}
   }
   if(!itemchecked) { 
   errors = "\n'" + el[i].name + "' must be selected\n";
    //alert("Please choose an answer for "+el[i].name+".");
    if(el[i].focus)
     el[i].focus();
	//return false;
   }
  }
 }
 
    // Now, if there were any errors, display the messages, and
    // return false to prevent the form from being submitted. 
    // Otherwise return true.
    if (!empty_fields && !errors) return true;

    msg  = "______________________________________________________\n\n"
    msg += "The form was not submitted because of the following error(s).\n";
    msg += "Please correct these error(s) and re-submit.\n";
    msg += "______________________________________________________\n\n"

    if (empty_fields) {
        msg += "- The following required field(s) are empty:" 
                + empty_fields + "\n";
        if (errors) msg += "\n";
    }
    msg += errors;
    alert(msg);
    return false;
};


function validatePwd(myForm) {
	var invalid = " "; // Invalid character is a space
	var minLength = 6; // Minimum length
	var pw1 = document.myForm.new_passwd.value;
	var pw2 = document.myForm.new_passwd2.value;
	// check for a value in both fields.
	if (pw1 == '' || pw2 == '') 
	{
		alert('Please enter your password twice.');
		return false;
	}
	// check for minimum length
	if (document.myForm.new_passwd.value.length < minLength) 
	{
		alert('Your password must be at least ' + minLength + ' characters long. Try again.');
		return false;
	}
	// check for spaces
	if (document.myForm.new_passwd.value.indexOf(invalid) > -1) 
	{
		alert("Sorry, spaces are not allowed.");
		return false;
	} else {
		if (pw1 != pw2) 
		{
			alert ("You did not enter the same new password twice. Please re-enter your password.");
			return false;
		} else {
			alert('Nice job.');
			return true;
     	}
   	}
}

//-->


