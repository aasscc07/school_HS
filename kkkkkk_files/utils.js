function isPdfFile(url){
    return isEmptyStr(url) || url.includes("download.dbpia.co.kr");
}

/**
 * 다국어 처리를 위한 메세지 테스트
 */
const MESSAGES = {
    site_move_alert: {
        ko_KR: `해당 논문 열람을 위해 사이트가 이동됩니다.\n dbpia의 기관인증 / 로그인정보는 연동 되지 않으며\n 논문 이용에 제한이 있을 수 있습니다.\n 이동하시겠습니까?'`,
        en_US: `The website is moved to view the article.\n\n DBpia institutional access / Log in information is not connected\n and there may be a limit to the use of article.\n\n Do you still want to move?`
    }
}

/**
 * 프로퍼티에서 메세지를 가져온다.
 * cookie_task.js 가 import 되어있어야 사용 가능
 *
 * @param property
 * @return {string} 메세지
 */
function getMessage(property) {
    if (property in MESSAGES) {
        return MESSAGES[property][getLanguageFromCookie()];
    }
}

const hideElemById = (id) => {
    if(id && $query(id)) {
        const $elem = $query(id);
        $elem.style.display = "none";
    }
}

/**
 * 해당 URL 로 이동한다.
 * @param url
 */
function goToUrl(url) {
    window.location = url;
}

/**
 * 문자열을 받아 HTMLElement 형태로 변환하여 반환한다.
 * 주의사항: root 태그는 1개여야 한다.
 *
 * @param htmlString
 * @return {HTMLElement}
 */
function parseHtml(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    return doc.body.firstElementChild;
}

/**
 * document.getElementById() 의 축약버전
 * @param {string} str 엘리먼트의 ID
 * @return {HTMLElement}
 */
function getById(str) {
    return document.getElementById(str);
}

/**
 * document.querySelectorAll() 의 축약버전
 * @param {string} selector query selector string
 * @return {HTMLElement}
 */
function $query(selector) {
    if (isEmptyStr(selector)
        || typeof(selector) !== 'string') {
        return undefined;
    }

    if (selector.startsWith("#")) {
        return document.getElementById(selector.replace("#", ""));
    }

    return document.querySelectorAll(selector);
}

const validateSelector = (selector) => {
    const $elem = $query(selector);

    if(!$elem) {
        console.warn(`${selector} 엘리먼트가 존재하지 않습니다.`)
        return false;
    }

    return true;
}

const addStyle = (selector, styleKey, styleValue) => {
    if(validateSelector(selector)) {
        const $elem = $query(selector);
        $elem.style[styleKey] = styleValue;
    }
}

const addEventCallback = (selector, eventName, callback) => {
    if(validateSelector(selector)) {
        const $elem = $query(selector);
        $elem[eventName] = callback
    }
}

const addClass = (selector, classValue) => {
    if(validateSelector(selector)) {
        const $elem = $query(selector);
        $elem.classList.add(classValue);
    }
}

const removeClass = (selector, classValue) => {
    if(validateSelector(selector)) {
        const $elem = $query(selector);
        $elem.classList.remove(classValue);
    }
}

const insertHTML =
    ($elem, { position = "beforeend", prefix = "", suffix = "" }) =>
    (strings, ...values) =>
    {
        if(!$elem) {
            console.warn(`(${classValue}) 클래스를 추가할 ${elem} 엘리먼트가 존재하지 않습니다.`)
            return;
        }

        if(!$elem instanceof HTMLElement) {
            console.warn(`첫번째 인자 ${elem} 은 DOM Element 가 아닙니다.`);
            return;
        }


        const htmlString = strings.reduce((result, string, i) => {
            result += string;

            if (values[i]) {
                result += prefix + values[i] + suffix;
            }

            return result;
        }, "");

        $elem.insertAdjacentHTML(position, htmlString);
    };

/**
 * 문자열이 입력되지 않았거나, 공백이거나 null 인지 확인한다.
 *
 * @param str
 * @return {boolean}
 */
function isEmptyStr(str) {
    return typeof (str) === 'undefined' || str === null || (typeof (str) === 'string' && str.trim() === "");
}

/**
 * 마지막 문자열 1글자를 지운다.
 *
 * @param {string} str
 * @return {*}
 */
function removeLastChar(str) {
    if (isEmptyStr(str)) {
        return str;
    }

    return str.slice(0, -1);
}

/**
 * URL 에 존재하는 파라미터를 오브젝트 형태로 반환한다.
 * @return {{[p: string]: string}}
 */
function getParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search).entries());
}

/**
 * select 를 이용해 Element 를 선택하고 setAttribute 를 수행한다.
 * value 에 '' 혹은 undefined 가 들어온다면 removeAttribute 메서드를 수행한다.
 *
 * @example
 * setAttribute('#test', 'checked', 'checked');
 * setAttribute('.NB__label', 'checked', '');
 *
 * @param {string} querySelector 타겟 Element 를 선택할 수 있는 selector
 * @param {string} name 수정하고 싶은 애트리뷰트 이름
 * @param {string} value 설정될 애트리뷰트의 값
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute
 */
function setAttribute(querySelector, name, value) {
    const elements = document.querySelectorAll(querySelector);

    for (const element of elements) {
        if (isEmptyStr(value)) {
            element.removeAttribute(name);
            continue;
        }

        element.setAttribute(name, value);
    }
}

/**
 * API 를 호출하고 그 결과로 나온 문자열을 Promise<string> 형태로 반환한다.
 * 모던 브라우저에서 기본으로 제공하는 fetch 메서드를 이용한다.
 *
 * @example
 * fetchAPI('/search/searchJson'
 *   , 'POST'
 *   , '{query: "방탄"}'
 *   , 'json'
 * )
 * @example
 * fetchAPI('/search/searchJson'
 *   , 'POST'
 *   , 'startCount=0&collection=ALL&range=A&searchField=ALL&sort=RANK&query=방탄&srchOption=*&includeAr=false&searchOption=*'
 * )
 *
 * @param {string} path API 호출 경로
 * @param {"GET"|"POST"|"DELETE"|"PUT"} method HTTP 메서드
 * @param {object | undefined} body HTTP Body
 * @param {{contentType?: "JSON" | "", showLoading?: boolean}} options contentType: HTTP Content-Type 정보를 설정한다. showLoading: 로딩을 표기할 것인지 설정한다.
 * @return {Promise<object | string | "redirected">} 결과 문자열을 가진 Promise 객체
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
function fetchAPI(path, method = "GET", body = undefined, options = {}, params) {
    let headers = {};

    // 기본 값 설정
    if (!options.hasOwnProperty("contentType")) {
        headers = {
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        body = new URLSearchParams(body).toString();
    } else if (options.contentType.toUpperCase() === "JSON") {
        headers = {
            ...headers,
            'Content-Type': 'application/json; charset=utf-8'
        };

        body = JSON.stringify(body);
    }

    if (!options.hasOwnProperty("showLoading")) {
        options.showLoading = true;
    }

    const {showLoading} = options;

    if (showLoading) {
        activateLoading();
    }

    if (body && method === "GET") {
        throw new Error("GET 메서드는 body 정보를 가질 수 없습니다.");
    }

    return fetch(path, {
        method,
        headers,
        body: method === "GET" ? null : body
    }).then((response) => {
        if (response.redirected) {
            // 보통 로그인을 하지 않은 경우 redirected 됨
            return {code: "redirected", url: response.url};
        }

        if (response.ok) {
            const contentType = response.headers.get("Content-Type");
            return contentType && typeof (contentType) !== 'undefined'
            && contentType.toUpperCase().includes("JSON")
                ? response.json() : response.text();
        }
        throw `API 호출에 실패하였습니다.`
    }).catch((e) => {
        console.error(e);
        console.trace(e);

        throw 'API 호출에 실패하였습니다.';
    }).finally(() => {
        // 로딩이 true 라면, 종료
        if (showLoading) {
            deactivateLoading();
        }
    });
}

const getMessages = async (keys) => {
    return JSON.parse(await fetchAPI(
        "/messages"
        , "POST"
        , {
            keys
        }
        , {
            showLoading: false,
            contentType: "JSON"
        }
    ));
}

/**
 * 동기 형태로 XMLHTTPRequest 를 호출한다. -> 사파리 브라우저 호환용
 * @param path
 * @param method
 * @param body
 * @param requestHeader
 * @return {string|any}
 */
function syncFetchAPI(path, method = "GET", body = undefined, requestHeader) {
    let result = "";

    const xhr = new XMLHttpRequest();
    xhr.open(method, path, false);

    // 기본 값 설정
    if (!requestHeader) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        body = new URLSearchParams(body).toString();
    } else if (requestHeader === "JSON") {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        body = JSON.stringify(body);
    }

    xhr.onload = (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                result = xhr.responseText;
            } else {
                console.error(xhr.statusText);
            }
        }
    };

    xhr.onerror = (e) => {
        console.error(xhr.statusText);
    };

    xhr.send(body);

    const contentType = xhr.getResponseHeader("Content-Type");

    if (contentType && contentType.toLowerCase().includes("json")) {
        return JSON.parse(result);
    }

    return result;
}

/**
 * css 의 display 를 toggle 한다.
 * "none" 이라면 display 인자로 받은 값으로 바꾸고,
 * "none" 이 아니라면 "none" 으로 바꾼다.
 * display 인자를 입력하지 않았을 때 기본 값은 "block" 이다.
 * dataOpenElem 인자를 입력하면 해당 Element 의 data-open 애트리뷰트를 "open" 혹은 "close" 로 설정한다.
 *
 * @param {string} id element ID
 * @param {"block" | "none" | "flex"} display 기본 값 "block"
 * @param {string} dataOpenElemId element ID
 */
function displayToggle(id, display = "block", dataOpenElemId) {
    const $elem = getById(id);
    const $more = getById(`${dataOpenElemId}__more`);
    const isNone = $elem.style.display === "none";

    if (isNone) {
        $elem.style.display = display;

        if (typeof (dataOpenElemId) !== 'undefined') {
            setAttribute(`#${dataOpenElemId}`, "data-open", "open");
        }

        if ($more) {
            $more.textContent = "less";
        }

        return;
    }

    $elem.style.display = "none";

    if (typeof (dataOpenElemId) !== 'undefined') {
        setAttribute(`#${dataOpenElemId}`, "data-open", "close");
    }

    if ($more) {
        $more.textContent = "more";
    }
}

/**
 * css 의 display 를 toggle 한다.
 * "none" 이라면 display 인자로 받은 값으로 바꾸고,
 * "none" 이 아니라면 "none" 으로 바꾼다.
 * display 인자를 입력하지 않았을 때 기본 값은 "block" 이다.
 *
 * @param {HTMLElement} $elem
 * @param {"block" | "flex"} displayString 기본 값 "block"
 */
function displayToggleByElem($elem, displayString = "block") {
    if ($elem) {
        if ($elem.style.display === displayString) {
            $elem.style.display = "none";
            return;
        }

        $elem.style.display = displayString;
    }
}

/**
 * split 함수를 실행하고 첫번째 원소를 가져온다.
 *
 * @param str
 * @param separator
 */
function splitAndGetFirst(str, separator) {
    return str.split(separator)[0];
}

/**
 * 한국어가 있다면 true 없다면 false 를 반환한다.
 *
 * @param str
 * @return {boolean}
 */
function hasKorean(str) {
    if (isEmptyStr(str)) {
        return false;
    }

    const koreanArr = str.match(/[ㄱ-힣]/g);

    return koreanArr && koreanArr.length > 0;
}

/**
 * 배열에서 홀수 인덱스를 가진 원소로 새로운 배열을 만들어 반환한다.
 *
 * @param arr
 * @return {*}
 */
function getOdds(arr) {
    return arr.reduce((acc, elem, index) => {
        if (index % 2 === 1) {
            return [...acc, elem];
        }

        return acc;
    }, []);
}

/**
 * 배열에서 짝수 인덱스를 가진 원소로 새로운 배열을 만들어 반환한다.
 *
 * @param arr
 * @return {*}
 */
function getEvens(arr) {
    return arr.reduce((acc, elem, index) => {
        if (index % 2 === 0) {
            return [...acc, elem];
        }

        return acc;
    }, []);
}

/**
 * 문자열 배열에서 한국어가 있는 부분을 반환한다.
 * 없다면 첫번째 원소를 반환한다.
 *
 * @param {string[]} arr
 * @return {string}
 */
function getHavingKorean(arr) {
    for (const elem of arr) {
        if (hasKorean(elem)) {
            return elem;
        }
    }

    return arr[0];
}

/**
 * 하이라이팅 문자열이 들어있는 인덱스를 추출한다. 없으면 -1 을 반환한다.
 * @param arr
 * @param highlightStr
 */
function getHighlightIndex(arr, highlightStr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes(highlightStr)) {
            return i;
        }
    }

    return -1;
}

/**
 * 하이라이트 인덱스를 기준으로 문자열의 일부를 가져온다.
 * @param arr
 * @param highlightStr
 * @return {string}
 */
function getHighlightSentence(arr, highlightStr) {
    const highlightIndex = getHighlightIndex(arr, highlightStr);
    let resultStr = "";

    if (highlightIndex !== -1) {
        const startIndex = Math.max(0, highlightIndex);
        const endIndex = Math.min(highlightIndex + 5, arr.length);

        for (let i = startIndex; i < endIndex; i++) {
            if (arr[i]) {
                resultStr += arr[i] + ". ";
            }
        }
    }

    return resultStr.trim();
}

/**
 * min 에서 max 까지의 숫자를 배열로 반환한다.
 *
 * @param {number} min
 * @param {number} max
 * @return {number[]}
 */
function getArrayFromRange(min, max) {
    return [...Array(max - min + 1).keys()].map((i) => i + min);
}

/**
 * HTML Entity 형태로 된 BR 태그 문자열을 삭제한다.
 *
 * @param str
 * @return {*}
 */
function removeBrTags(str) {
    return str.replaceAll(/&lt;BR&gt;/g, "");
}

/**
 * 문자열 내용 중 특정 태그를 삭제한다.
 * @param str
 * @param tagName
 * @returns {*}
 */
function removeTags(str, tagName) {
    return str.replaceAll(new RegExp(`<\/?${tagName}[^>]*?>`, "g"), "");
}

/**
 * 숫자를 포맷팅한다.
 * @param number
 * @returns {string|number}
 */
function formatNumber(number) {
    if (!number) {
        return 0;
    }

    return Number(number).toLocaleString("ko");
}

/**
 * 와이즈넛 검색엔진에서 추출된 결과 텍스트의 하이라이팅 부분을 특정 태그로 변경한다.
 *
 * @param str
 * @param {('b' | 'em' | '')} tag 검색 결과 화면에서는 제목은 b 태그로 내용은 em 태그로 하이라이팅한다. 그냥 하이라이팅 태그만 지우고 싶다면 공백을 입력한다.
 * @return {string}
 */
function replaceHighlight(str, tag) {
    if (!str) {
        return "";
    }

    if (tag === "") {
        return str.replaceAll("<!HS>", '').replaceAll("<!HE>", '');
    }

    return str.replaceAll("<!HS>", `<${tag}>`).replaceAll("<!HE>", `</${tag}>`)
}

/**
 * 배열로 들어온 이벤트를 등록한다.
 *
 * @param {ReservedEvent[]} eventQueue
 */
function registerSearchResultEvents(eventQueue) {
    for (const event of eventQueue) {
        const {id, eventProperty, functionRef, args} = event;
        const dom = getById(id);

        if (!dom) {
            console.warn(`id: ${id} 를 찾지 못하였습니다.`);
        }

        dom.addEventListener(eventProperty, function (e) {
            functionRef(...args, e)
        });
    }
}

/**
 * 해당 배열에 원소가 1개라도 있는지 확인한다.
 * @param {array} majorSubjectConditions
 * @return {boolean}
 */
function hasElement(majorSubjectConditions) {
    return majorSubjectConditions.length > 0;
}

/**
 * 브라우저를 최상위로 스크롤한다.
 */
function scrollToTop() {
    window.scrollTo(0, 0);
}

/**
 * MultiCP Viewer 를 열 때 Form 을 제출하는 함수이다.
 *
 * @param nodeId
 * @param url
 * @param titleKr
 * @param titleEn
 * @param iprdId
 */
function submitCpViewerForm(nodeId, url, titleKr, titleEn, iprdId) {
    // 검색엔진 결과에서 사용되는 <HE> 태그와 같은 하이라이팅 제거
    titleKr = replaceHighlight(titleKr, "");
    titleEn = replaceHighlight(titleKr, "");

    const formHtml = `
        <form name="multiCpForm" id="goToExternalForm" method="post" action="/pdf/cpViewer" target="multiCpPop${nodeId}">
            <input type="hidden" name="cpUrl" value="${url}"/>
            <input type="hidden" name="cpNodeId" value="${nodeId}"/>
            <input type="hidden" name="articleTitleKr" value="${titleKr}"/>
            <input type="hidden" name="articleTitleEn" value="${titleEn}"/>
            <input type="hidden" name="iprdId" value="${iprdId}"/>
        </form>
    `

    document.getElementsByTagName("body")[0].append(parseHtml(formHtml));

    const goToExternalForm = $query("#goToExternalForm");
    goToExternalForm.submit();
    goToExternalForm.remove();
}

/**
 * DBpia 내부에서 제공하는 논문이 아닌 경우에 한해
 * CPViewer 를 통해 논문을 보여주거나 외부 링크로 이동한다.
 *
 * @param {ExternalNodeObject} externalNodeObj
 * @return {Promise<void>}
 */
async function goToExternalLink(externalNodeObj) {
    if (typeof (externalNodeObj) === 'undefined') {
        return;
    }

    const {url, nodeId, titleKr, titleEn, iprdId} = externalNodeObj;

    if (url !== null && url.indexOf("://kiss.") !== -1) {
        alert("KISS 자료의 경우에는 KISS 측의 요청으로<br>URL 링크 연결을 지원하고 있지 않습니다.<br>인용하기, 수정하기만 이용 가능합니다.");
        return;
    }

    let isCpViewerForbidden = false;

    // 멀티 CP 통계 API 호출
    await fetchAPI("/journal/multCpStatics", "POST", {nodeId});

    // 멀티 CP 뷰어로 표기가 가능한 기관인지 체크함
    await fetchAPI('/journal/getMultCpExcptIprd', "POST", {iprdId})
        .then((numberOfExcluded) => {
            // 프로시저의 결과가 숫자로 반환되기 때문에 0 인지 아닌지로 결정한다. -> 금지된 기관의 숫자가 0 개 ? 금지되지 않음 : 금지됨
            isCpViewerForbidden = +numberOfExcluded !== 0;
        });

    // 멀티 CP 뷰어로 보여주는 것이 금지된 기관은 그냥 팝업을 이용해 보여준다.
    if (isCpViewerForbidden) {
        window.open(url, 'multiCpPop' + nodeId, 'resizable=yes,top=0, left=0, height=' + screen.height + ',width=' + screen.width);
        return;
    }

    submitCpViewerForm(nodeId, url, titleKr, titleEn, iprdId);
}

/**
 * 로그인되지 않은 경우, 쿠키를 이용해 책갈피 기능을 구성한다.
 *
 * @param {string} nodeId
 * @param {function} addCallback
 * @param {function} removeCallback
 */
function toggleBookmarkWithCookie(nodeId, addCallback, removeCallback) {
    if (isBookmarkedWithCookie(nodeId)) {
        removeCallback();
        removeCookieWithDelimiter("bookmark", nodeId, "|");
        return;
    }

    addCallback();
    addCookieWithDelimiter("bookmark", nodeId, "|");
}

/**
 * 비로그인 유저가 쿠키로 모든 논문을 북마크하는 경우
 * @return {"added" | "removed"} 토글 결과
 */
function bookmarkAllWithCookie(nodeIds, uiCallback) {
    const checkedNodeIds = checkBookmarkWithCookie(nodeIds);

    if (arrayEquals(nodeIds, checkedNodeIds)) {
        for (const nodeId of nodeIds) {
            uiCallback(nodeId, "REMOVE");
            removeCookieWithDelimiter("bookmark", nodeId, "|");
        }

        return "removed";
    }

    for (const nodeId of nodeIds) {
        uiCallback(nodeId, "ADD");
        addCookieWithDelimiter("bookmark", nodeId, "|");
    }

    return "added";
}

/**
 * 여러 개의 논문 ID 를 받았을 때 이미 북마크한 논문인지 체크하고 북마크한 논문만 반환한다.
 * @param nodeIds
 * @returns {string[]}
 */
function checkBookmarkWithCookie(nodeIds) {
    const containingNodeIds = [];

    if (!getCookie("bookmark")) {
        return containingNodeIds;
    }

    const cookieSet = new Set(getCookie("bookmark").split("|"));

    for (const nodeId of nodeIds) {
        if (cookieSet.has(nodeId)) {
            containingNodeIds.push(nodeId);
        }
    }

    return containingNodeIds;
}

/**
 * 로그인 되어있는지 확인한다.
 * @param me
 * @return {boolean}
 */
function isLoggedIn(me) {
    return !isEmptyStr(me.b2cId);
}

/**
 * 브라우저의 넓이를 반환한다.
 * @return {number}
 */
function getBrowserWidth() {
    return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
}

function getServiceStopMessage(stopCode, depth = 4) {
    //1 : 발행기관	2 : 저널	3 : 권호	4 : 논문
    var message = "";
    var lang = getCookie("language");
    switch (stopCode) {
        case "018001": //계약종료
            if (depth == 4)
                if (lang != null && lang.indexOf("e") > -1) {
                    message = "The copyright contract has ended. You cannot use article.";
                } else {
                    message = "저작권 계약이 종료된 논문입니다. 논문을 이용하실 수 없습니다.";
                }
            else if (depth == 3)
                if (lang != null && lang.indexOf("e") > -1) {
                    message = "The copyright contract has ended. You cannot use journal.";
                } else {
                    message = "저작권 계약이 종료된 저널입니다. 논문을 이용하실 수 없습니다.";
                }
            else if (depth == 2)
                if (lang != null && lang.indexOf("e") > -1) {
                    message = "The copyright contract has ended. You cannot use journal.";
                } else {
                    message = "저작권 계약이 종료된 저널입니다. 논문을 이용하실 수 없습니다.";
                }
            else if (depth == 1)
                if (lang != null && lang.indexOf("e") > -1) {
                    message = "This is the issuing institution whose copyright contract has expired. You cannot use article.";
                } else {
                    message = "저작권 계약이 종료된 발행기관입니다. 논문을 이용하실 수 없습니다.";
                }
            break;
        case "018002": //KISS이관
            if (depth == 4)
                if (lang != null && lang.indexOf("e") > -1) {
                    message = "This is the issuing institution whose copyright contract has expired. Please use it in Korean academic information (kiss.kstudy.com).";
                } else {
                    message = "저작권 계약 종료된 논문입니다. 한국학술정보(링크연결: http://kiss.kstudy.com)에서 이용해 주세요.";
                }
            else if (depth == 1)
                if (lang != null && lang.indexOf("e") > -1) {
                    message = "This is the issuing institution whose copyright contract has expired. Please use it in Korean academic information (kiss.kstudy.com).";
                } else {
                    message = "저작권 계약 종료된 발행기관입니다. 한국학술정보(링크연결: http://kiss.kstudy.com)에서 이용해 주세요.";
                }
            break;
        case "018003": //신탁저자
            if (lang != null && lang.indexOf("e") > -1) {
                message = "It cannot be used because it is the article of the copy reproduction transfer copyright association of Korea. If you would like to resume service, please contact customer service.";
            } else {
                message = "한국복제전송저작권협회 신탁 저자의 논문인 관계로 이용하실 수 없습니다. 서비스 재개를 원하시는 저자분은 고객센터로 문의 바랍니다.";
            }
            break;
        case "018004": //제작오류
            message = "현재 이용이 불가능한 논문입니다."; //안내문구 미표시
            break;
        case "018005": //서비스중지
            if (lang != null && lang.indexOf("e") > -1) {
                message = "The service is suspended at the request of the copyright holder or issuing institution.";
            } else {
                message = "저작권자·발행기관의 요청으로 서비스 중지된 저널입니다.";
            }
            break;
        case "018006": //내역확인 불가능
            message = "현재 이용이 불가능한 논문입니다."; //안내문구 미표시
            break;
        case "018007": //아카이브 기관이용
            if (lang != null && lang.indexOf("e") > -1) {
                message = "Only available for purchased institutions.";
            } else {
                message = "저널을 구매한 기관에서만 이용하실 수 있습니다.";
            }
            break;
        case "018008": //계약기간 미도래
            if (lang != null && lang.indexOf("e") > -1) {
                message = "Awaiting service at the request of the publisher";
            } else {
                message = "발행기관의 요청으로 서비스 대기 중입니다.";
            }
    }
    return message;
}

/**
 * 해상도를 기준으로 모바일 웹인지 판단한다.
 * @return {boolean}
 */
function isMobileWeb() {
    return getBrowserWidth() < 960;
}

/**
 * 두 배열을 깊게 비교하여 서로 동일한지 확인한다.
 * @param arr1
 * @param arr2
 * @returns {boolean}
 */
function arrayEquals(arr1, arr2) {
    if (arr1 && arr2) {
        return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
    }

    return false;
}

/**
 * 해당 엘리먼트가 존재하는 경우에 onClick 이벤트를 바인딩한다.
 * JSTL 조건에 의해 엘리먼트 생성이 분기될 때 사용한다.
 * @param id
 * @param callback
 */
function bindOnClickIfExist(id, callback) {
    const $elem = $query(`#${id}`);

    if ($elem) {
        $elem.onclick = callback;
    }
}

function isForeignIp() {
    return getCookie("foreignIP").toUpperCase() === 'Y';
}

function formSubmit(method, path, params) {
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}

/*null값 빈값으로 변경*/
function ifnull(data) {
    if (data == null || data == "null" || typeof data == "undefined") {
        return "";
    } else {
        return data;
    }
}

const onlyNumberCallback = (e) => {
    if (!Number.isInteger(+e.target.value)) {
        e.target.value = "";
    }
}

/**
 * 타겟 엘리먼트에 오직 숫자만 입력되도록 만든다.
 * @param $targetElem
 */
function inputOnlyNumber($targetElem) {
    $targetElem.onkeydown = onlyNumberCallback;
    $targetElem.onkeyup = onlyNumberCallback;
    $targetElem.onchange = onlyNumberCallback;
    $targetElem.oninput = onlyNumberCallback;

    $targetElem.setAttribute("pattern", "[0-9]+");
}

/**
 * 백분위 기준 세분화 정책을 따르는 퍼센트를 반환한다.
 * @param {number} num 0~100 까지의 소수점을 포함한 랜덤한 숫자
 */
const getNodeTopPercentage = (num) => {
    if (isGtAndLess(num, 0, 0.1)) {
        return "0.1%";
    }

    if (isGtAndLess(num, 0.1, 0.5)) {
        return "0.5%";
    }

    if (isGtAndLess(num, 0.5, 1)) {
        return "1%";
    }

    if (isGtAndLess(num, 1, 5)) {
        return "5%";
    }

    if (isGtAndLess(num, 5, 10)) {
        return "10%";
    }

    return "";
}

const isGtAndLess = (num, gt, less) => num > gt && num <= less;


// 페이스북 픽셀 실행 함수
function waitForFbq(callback){
    if (typeof fbq !== 'undefined') {
        callback()
    } else {
        setTimeout(function () {
            waitForFbq(callback)
        }, 300)
    }
}