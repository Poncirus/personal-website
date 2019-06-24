/**************************
    js about user
**************************/


/*******************************************************************
    func:   getUsernameCookie
    brief:  get cookie of username value
    return: cookie of username
*******************************************************************/
function getUsernameCookie()
{
  var name = "username=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}


/*******************************************************************
    func:   getPasswordCookie
    brief:  get cookie of password value
    return: cookie of password
*******************************************************************/
function getPasswordCookie()
{
  var name = "password=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}