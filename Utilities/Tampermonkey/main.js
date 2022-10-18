function vercaemert_main() {
    var url = window.location.href;
    if (url === 'https://www.aldaily.com/') {
        aldaily();
    }

}
function aldaily() {
    for (let image of document.getElementsByTagName('img')) {
        if (image.getAttribute('src') === '/static/images/header.gif') {
            image.parentNode.removeChild(image);
        }
    }
}
