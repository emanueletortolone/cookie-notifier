/**
 * COOKIE NOTIFIER
 * Alert user to accept the navigation with cookies.
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
                this.context = a.context || "body",
                this.duration = a.duration || 30,
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
                    "textAlign" : "center",
                    "color" : "#000000"
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
                this.okButtonCss = this.mergeOptions(this.defaultButtonsCss, a.buttonsCss || {}, a.okButtonCss || {}),
                this.privacyButtonCss = this.mergeOptions(this.defaultButtonsCss, a.buttonsCss || {}, a.privacyButtonCss || {}),
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
            if(context == null) {
                context = document.getElementsByTagName(this.context)[0];
            }
            if(context == null) alert("CookieNotifier - Error\nSet a valid context.");
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
            for(var prop in this.okButtonCss) {
                acceptBtn.style[prop] = this.okButtonCss[prop];
            }
            for(var prop in this.privacyButtonCss) {
                linkBtn.style[prop] = this.privacyButtonCss[prop];
            }

            view.appendChild(linkBtn);
            view.appendChild(acceptBtn);

            return context.insertBefore(view, first);
        },
        a.mergeOptions = function()
        {
            var res = {};
            for (var i = 0; i < arguments.length; i++) {
                var obj = arguments[i];
                for (var attrname in obj) { res[attrname] = obj[attrname];}
            }
            return res;
        },
        a.close = function (e)
        {
            a.setCookie(document.location.hostname.replace("www.", ""), "cookies-accepted", this.duration);

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
