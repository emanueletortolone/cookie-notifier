/**
 * COOKIE NOTIFIER
 *
 * @author Emanuele Tortolone - www.fillstudio.com
 * @version 1.0 - 23/07/2013
 */ 
 (function(){
	 var a = window.CookieNotifier || (window.CookieNotifier = {});
	 a.init = function (a) 
	 {
        return (
        		a = (null != a) ? a : {
	            args: null
	        }, 
	        this.context = a.context || "wrapper",
	        this.html = a.html || "I cookie ci aiutano a fornire i nostri servizi. Utilizzando tali servizi, accetti l'utilizzo dei cookie da parte nostra.", 
	        this.linkURL =  a.linkURL || "#",
	        this.linkLabel	= a.linkLabel || "Condizioni",
	        this.acceptLabel =  a.acceptLabel || "OK",
	        this.defaultCss = {
	        		"width"  : "98%",
	        		"padding" : "0 1%",
	        		"height" : "auto",
	        		"lineHeight" : "40px",
	        		"backgroundColor" : "#000000",
	        		"fontFamily" : "sans-serif",
	        		"fontSize" : "12px",
	        		"textAlign" : "center"
	        },
	        this.defaultButtonsCss = {
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
	        },
	        this.css = this.mergeOptions(this.defaultCss, a.css || {}),
	        this.buttonsCss = this.mergeOptions(this.defaultButtonsCss, a.buttonsCss || {}),
	        //	
	        this.checkCookie()
	    );
    },
    a.checkCookie = function()
    {
    	 if(!this.hasCookie()) this.buildView();
    },
    a.buildView = function(a)
    {
    	var context = document.getElementById(this.context);
    	var first = context.children[0];
    	
    	//	MAIN
    	var view = document.createElement("div");
    	view.innerHTML = this.html;
    	view.id = 'cookie-notifier';
    	view.className = 'block';
		for(var each in this.css) { view.style[each] = this.css[each]; }
		
		//	LINK TO PRIVACY
		if(this.linkURL == "#") alert("CookieNotifier - Error\nSet a valid URL to privacy-policy page.");
		
		var linkBtn = document.createElement("a");
		linkBtn.innerHTML = this.linkLabel;
		linkBtn.href = this.linkURL;
		

		//	ACCEPT BTN
		var acceptBtn = document.createElement("a");
		acceptBtn.innerHTML = this.acceptLabel;
		acceptBtn.href = "javascript:void(0);";
		acceptBtn.onclick = function (e) {
		    var ev = e || window.event;
		    window.CookieNotifier.close(ev);
		};
		for(var prop in this.buttonsCss) {
			linkBtn.style[prop] = acceptBtn.style[prop] = this.buttonsCss[prop];
		}
		
		view.appendChild(linkBtn);
		view.appendChild(acceptBtn);
		
		return context.insertBefore(view, first);
    },
    a.mergeOptions = function(obj1,obj2)
    {
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    },
    a.close = function (e)
    {
		a.setCookie(document.location.hostname.replace("www.", ""), "cookies-accepted", 30);
		
		var view = document.getElementById('cookie-notifier');
		view.parentNode.removeChild(view);
		return false;
    },
    a.setCookie = function(name, value, days) 
    {
	    var expires;
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        expires = "; expires="+date.toGMTString();
	    }
	    else {
	        expires = "";
	    }
	    document.cookie = name+"="+value+expires+"; path=/; domain="+ name + ";";
    },
    a.getCookie = function(name)
    {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    },
    a.hasCookie = function()
    {
    	return this.getCookie(document.location.hostname.replace("www.", "")) != null;
    },
    a.deleteCookie = function () {
       this.setCookie(document.location.hostname.replace("www.", ""),"",-1);
       document.location.reload();
       return false;
    };

 }).call(this);