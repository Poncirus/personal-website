/**************************
    js about language
**************************/

import Cookies from 'js-cookie'


/*******************************************************************
    func:   getLanguageCookie
    brief:  get cookie of language value
    return: cookie of language (default cn)
*******************************************************************/
export function getLanguageCookie() {
    var name = "language=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "zh";
}

/*******************************************************************
    func:   setLanguageCookie
    brief:  set cookie of language value
*******************************************************************/
export function setLanguageCookie(lang) {
    Cookies.set('language', lang, { expires: 365 })
}

