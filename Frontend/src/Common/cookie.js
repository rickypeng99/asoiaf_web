/**
 * Get cookies with attribute 
 * ex. username=....
 */
export function getCookie(attribute){
    let name = attribute + "=";
    let decodedCookie = decodeURIComponent(document.cookie);

    var allAttribute = decodedCookie.split(';');

    for(var i = 0; i < allAttribute.length; i++){
        var eachAttribute = allAttribute[i];
        while(eachAttribute.charAt(0) == ' '){
            eachAttribute = eachAttribute.substring(1);
        }

        if(eachAttribute.indexOf(name) == 0){
            var value = eachAttribute.substring(name.length, eachAttribute.length);
            if(value != "") {
                return value;
            } else{
                return null;
            }
        }
    }
    return null;
}

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

