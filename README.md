cookie-notifier
===============

## About
According to the new Italian legislation on the use of cookies, we must request to users an express consent, without which cookies can not be activated unless the cookies are not necessary for the provision of the requested service.

This simple Vanilla script that provides an easy way to show
a simple notification bar to alert the user about the use of cookies
during the navigation.

The appearance of the bar and its components are fully customizable 
through a params object passed to the init function.

## Default setup

   ```bash
   CookieNotifier.init();
   ```

  Default params:
  
   ```bash
   {
      context     : "wrapper", // The element ID that will contains the alert bar
      html        :"I cookie ci aiutano a fornire i nostri servizi. Utilizzando tali servizi, accetti l'utilizzo dei cookie da parte nostra.", // Text to alert the user
      linkURL     : "#", // Link to privacy page
      linkLabel	  : "Condizioni", // Label of the link to privacy page
      acceptLabel : "OK", // Label of the link acceptance
      defaultCss  : {
      		"width"  : "98%",
      		"padding" : "0 1%",
      		"height" : "auto",
      		"lineHeight" : "40px",
      		"backgroundColor" : "#000000",
      		"fontFamily" : "sans-serif",
      		"fontSize" : "12px",
      		"textAlign" : "center"
      },
      defaultButtonsCss : {
      		"display"  : "inline-block",
      		"margin" : "0 5px",
      		"padding": "0 5px", 
      		"height" : "20px",
      		"lineHeight" : "20px",
      		"backgroundColor" : "#666666",
      		"fontFamily" : "sans-serif",
      		"fontSize" : "12px",
      		"color" : "#FFFFFF",
      		"textDecoration" : "none"
      }
  	}
   ```

## Setup with params

   ```bash
   CookieNotifier.init({
	context		: "header",
	html		: "This site uses cookies. By using these services, you agree to our use of cookies..",
	linkURL		: "/privacy-policy/",
	linkLabel	: "Read our privacy policy",
	acceptLabel	: "Confirm",
	css			  : {
		"backgroundColor" : "#e8e7e7",
		"position"        : "absolute",
		"zIndex"          : 2000,
		"color"           : "#666666",
		"fontFamily"      : "LatoRegular",
		"lineHeight"      : "30px"
	},
	buttonsCss	: {
	 	"backgroundColor" : "#999999",
	    	"fontFamily"      : "LatoRegular",
	    }
	});
   ```
