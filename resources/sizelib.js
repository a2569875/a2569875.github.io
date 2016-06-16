
function setIframeHeight(ifrm){
    var doc = ifrm.contentDocument? ifrm.contentDocument:
    ifrm.contentWindow.document;
    var RestHeight=ifrm.style.height; //Capture original height see why below.
    ifrm.style.visibility = "hidden";
    ifrm.style.height = "10px"; //Necessary to work properly in some browser eg IE
    var NewHeight = getDocHeight( doc ) + 10;
    if (NewHeight>20){
        ifrm.style.height=NewHeight + "px";
    } else { //if dom returns silly height value put back old height see above.
        ifrm.style.height=RestHeight + "px";
    }
    ifrm.style.visibility = "visible";
}

function getDocHeight(doc) {
    doc = doc || document;
    var body = doc.body, html = doc.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight,
    html.scrollHeight, html.offsetHeight );
    return height;
}