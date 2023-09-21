/**
 * 브라우저 navigator 정보를 이용해 이용자의 기기가 모바일인지 판단한다.
 *
 * @return {boolean} isMobile
 */
function isMobileAgent() {
    const ua = navigator.userAgent;

    return /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua);
}

function isMacOS() {
    const ua = navigator.userAgent;
    return /Mac|PPC/.test(ua);
}

/**
 * Mobile 기기이며, 앱 인터페이스가 존재하는 경우 모바일앱으로 판단한다.
 *
 * @return {boolean} isMobileApp
 */
function isMobileApp() {
    return (typeof nuri_media !== 'undefined' && isMobileAgent());
}

/**
 * 앱 인터페이스를 이용해 url 을 연다.
 *
 * @param url
 */
function openBrowser(url) {
    nuri_media.openBrowser(url);
}

/**
 * 모바일에서 접근한 경우, 모바일 브라우저를 띄우고
 * 그 외의 경우에는 window.open() 의 기본 브라우저를 띄운다.
 *
 * @param {string} url 이동할 URL
 */
function openPhoneBrowser(url) {

    if (isMobileApp()) {
        openBrowser(url);
        return;
    }

    window.open(url);
}

/**
 * 인앱 결제를 막는다.
 *
 * @return {boolean} 인앱 결제인지 여부를 반환한다.
 */
function isInAppPayment() {
    if (isMobileApp()) {
        const messageKr = "앱에서는 결제를 이용할 수 없습니다.";
        const messageEn = "Payment is not available in the app.";

        $.jQueryAlert(isLocaleKorean() ? messageKr : messageEn);
        return true;
    }

    return false;
}

function mobileAppNodeDown(downloadUrl, fileName) {
    if (isMobileApp()) {
        if (nuri_media.downloadDbpiaFile) {
            fileName = fileName.replace(/\\/g, "")
                .replace(/\//g, "")
                .replace(/\:/g, "")
                .replace(/\*/g, "")
                .replace(/\?/g, "")
                .replace(/\"/g, "")
                .replace(/\</g, "")
                .replace(/\>/g, "")
                .replace(/\|/g, "")
                .replace(/\“/g, "")
                .replace(/\”/g, "");
            nuri_media.downloadDbpiaFile(downloadUrl, fileName + ".pdf", "application/json");
        } else {
            location.href = downloadUrl;
        }
    } else {
        location.href = downloadUrl;
    }
}

function inspectMobilePageUrl() {
    const forbiddenUrls = ["/pay/contentBuy"];

    for (const forbiddenUrl of forbiddenUrls) {
        if (window.location.pathname.includes(forbiddenUrl) && isInAppPayment()) {
            setTimeout(() => {
                window.history.back();
            }, 1000);
        }
    }
}

window.addEventListener('DOMContentLoaded', function () {
    inspectMobilePageUrl();
});