/**
 * -------------------------- 전역 변수 ---------------------------------------
 */

let layerStack = [];

/**
 * -------------------------- Layer 공통 기능 ---------------------------------
 */

/**
 * 딤 레이어 활성화하기
 * id 에 element ID 를 주어 스택으로 관리할 수 있다.
 * 스택으로 관리하면 모든 스택이 다 지워져야만 dimmed 가 해제된다.
 */
function activateDimmed(id) {
    const isAlreadyRegisteredId = id && layerStack.length > 0 && layerStack.includes(id);

    // 이미 등록된 아이디의 경우는 앞으로 끌어오기만 한다.
    if (isAlreadyRegisteredId) {
        layerStack = [id, ...layerStack.filter((e) => e !== id)];
        dimmedByStack();
        return;
    }

    const $dimLayer = getById("dimLayer");
    $dimLayer.style.display = "flex";

    if (id) {
        layerStack = [...layerStack, id];

        const $elem = getById(id);

        if ($elem) {
            $elem.setAttribute("open", "");

            if ($elem.style.display === "none") {
                $elem.style.display = "flex";
            }
        }

        dimmedByStack();
    }
}

/**
 * 레거시 레이어가 오픈되었을 때 생기는 modalOpen 클래스를 제거해준다.
 */
function removeLegacyModalOpenClass() {
    const $bodies = document.getElementsByTagName('body');

    if ($bodies && $bodies.length > 0) {
        const $body = $bodies[0];
        if ($body.classList.contains('modalOpen')) {
            $body.classList.remove('modalOpen');
        }
    }
}

/**
 * 딤 레이어 비활성화하기
 */
function deactivateDimmed(id) {
    layerStack = layerStack.filter((e) => e !== id);
    const $dimLayer = getById("dimLayer");

    if (layerStack.length === 0) {
        // $dimLayer.setAttribute("data-visible", "");
        $dimLayer.style.display = "none";

        removeLegacyModalOpenClass();

        if (
            !isMobileWeb() ||
            ($query('#searchTermRecommendationBox') &&
                $query('#searchTermRecommendationBox').style.display !== 'flex')
        ) {
            activateBackgroundScroll();
        }

        return;
    }

    if (id) {
        const $elem = $query(`#${id}`);

        if ($elem) {
            $elem.style.zIndex = "";
            $elem.removeAttribute("open");
        }

        dimmedByStack();
    }
}

/**
 * 레이어 스택에 맞춘 Dimmed 를 깐다.
 */
function dimmedByStack() {
    const topLayerId = layerStack[layerStack.length - 1];
    $query(`#${topLayerId}`).style.zIndex = "1101";

    for (const layerId of layerStack.slice(0, -1)) {
        $query(`#${layerId}`).style.zIndex = "1099";
    }

    if (layerStack.length > 0) {
        deactivateBackgroundScroll();
    }
}

/**
 * 백그라운드 스크롤 활성화 -> 모바일 전용
 */
function activateBackgroundScroll() {
    document.documentElement.classList.remove("focus");
}

/**
 * 배경 스크롤을 금지한다. -> 모바일용
 */
function deactivateBackgroundScroll() {
    document.documentElement.classList.add("focus");
}

function hideDpMenu() {
    const $dpFilter = $query("#mobileMenuPannel");

    if ($dpFilter) {
        deactivateDimmed("mobileMenuPannel");
        $dpFilter.setAttribute("data-slide", "out");
    }
}

function hideDpUsageStatusLayer() {
    const id = "my-research-statistics-modal";

    const $elem = $query(`#${id}`);

    if (!$elem) {
        return;
    }

    $elem.style.display = "none";
    deactivateDimmed(id);
}

/**
 * 모든 레이어를 숨긴다.
 */
function hideAllLayers() {
    const isLoading = $query("#loadingLayer").style.display !== "none";

    if (!isLoading) {
        hideAlertDialog();
        hideCartLayer();
        hideConfirmDialog();
        hideLoginLayer();
        hideOrganizationLayer();
        hidePreviewLayer();
        hidePurchaseLayer();
        hideRecommendedNodes();
        hideShareLayer();
        hidePartnershipLayer();

        //상세페이지 layer
        hideDetailShareLayer();
        hidePrecedentLayer();
        hideAuthorLayer();
        hideReplyClaimLayer();
        hideQuoteLayer();
        hideQuoteChangeLayer();
        hideUsageChartLayer();
        hideNodeErrorReportLayer();
        hideReferenceNodeReportLayer();

        // 메인페이지 Layer
        hideDpUsageStatusLayer();

        // 검색 페이지에서만 사용하는 Layer
        hideDpFilter();

        // 모바일 메뉴 패널
        hideDpMenu();

        //B2C 구독권 결제하기 페이지
        hideB2cSubPaymentPolicyLayer();

        //전화번호 등록 레이어
        hideB2cTelAlertRegisterLayer();

        deactivateDimmed();

        const $dimLayer = getById("dimLayer");

        for (const $child of $dimLayer.children) {
            $child.removeAttribute("open");
        }
    }
}

/**
 * 로딩 활성화
 */
function activateLoading() {
    const $loadingLayer = getById("loadingLayer");
    const isLoading = $loadingLayer.style.display === "block";

    if (isLoading) {
        return;
    }

    activateDimmed("loadingLayer");

    const $dimLayer = getById("dimLayer");
    $dimLayer.style.zIndex = "2000"

    $loadingLayer.style.display = "block";
}

/**
 * 로딩 비활성화
 */
function deactivateLoading() {
    const $loadingLayer = getById("loadingLayer");
    const isLoading = $loadingLayer.style.display === "block";

    if (!isLoading) {
        return;
    }

    deactivateDimmed("loadingLayer");
    $loadingLayer.style.display = "none";
    const $dimLayer = getById("dimLayer");
    $dimLayer.style.zIndex = "1100";
}

/**
 * 바디의 fixed 클래스를 추가한다.
 */
function fixBackground() {
    document.documentElement.classList.add("fixed");
}

/**
 * 바디의 fixed 클래스를 삭제한다.
 */
function unfixBackground() {
    document.documentElement.classList.remove("fixed");
}

/**
 * layer.jsp 를 include 하였을 때, b2c 로그인 여부를 판단해준다.
 * @return {boolean}
 */
function layer_isB2cLoggedIn() {
    return window["__me"] && !!window["__me"].b2cId;
}

/**
 * layer.jsp 를 include 하였을 때, b2b 로그인 여부를 판단해준다.
 * @return {boolean}
 */
function layer_isB2bLoggedIn() {
    return window["__me"] && !!window["__me"].b2bId;
}

/**
 * layer.jsp 를 include 하였을 때, b2c ID 를 반환해준다.
 * @return {string}
 */
function layer_getB2cId() {
    return window["__me"] && window["__me"].b2cId;
}

/**
 * layer.jsp 를 include 하였을 때, b2b ID 를 반환해준다.
 * @return {string}
 */
function layer_getB2bId() {
    return window["__me"] && window["__me"].b2bId;
}

function fnUiUxPopup(b2c_id, b2b_id) {
    var ProxyUrl = (location.host.toLowerCase() != "www.dbpia.co.kr" && location.href.indexOf("www.dbpia.co.kr") > -1) ? ((location.href.indexOf("www.dbpia.co.kr") == 7) ? "http://" + location.host : location.href.substr(0, location.href.indexOf("www.dbpia.co.kr") + 15)) : "";

    fetchAPI(ProxyUrl + '/popupList', "POST", undefined, {
        showLoading: false
    }).then((data) => {
        let urlPath = window.location.pathname;
        let urlHref = window.location.href;
        data.forEach(function (val, idx) {
            let displayCheck = false;
            var dispOS = val.dispOS;
            var dispYN = val.dispYN;
            var array = [];
            array = val.dispUrl.split("||");

            for (let i = 0; i < array.length; i++) {
                if (array[i] == 'All' || (array[i] == '/' && array[i] == urlPath) || (array[i] != '/' && urlHref.indexOf(array[i]) >= 0)) {
                    displayCheck = true;
                }
            }

            if (isMobileApp()) {
                if (dispOS != null && dispOS != "" && dispOS.indexOf("Android App") < 0) {
                    displayCheck = false;
                }
            } else {
                if (dispYN != "Y") {
                    displayCheck = false;
                }
            }

            if (val.dispType === "B2C+B2B") {
                if (b2c_id === '' || b2b_id === '') {
                    displayCheck = false;
                }
            } else if (val.dispType === "B2C") {
                if (b2c_id === '' || b2b_id !== '') {
                    displayCheck = false;
                }
            } else if (val.dispType === "B2B") {
                if (b2b_id === '') {
                    displayCheck = false;
                }
            }

            if (displayCheck) {
                var notDispTermNm = '오늘 하루 그만 보기';
                if (val.notDispTermCode == "404002") {
                    notDispTermNm = '7일 동안 그만 보기';
                } else if (val.notDispTermCode == "404003") {
                    notDispTermNm = '30일 동안 그만 보기';
                }
                var noticePopup = '<dialog class="dpNotice" id="pub_noticeLayerPopup' + val.popupId + '" style="max-width:' + val.popWidthSize + 'px; left:' + val.locaLeftSpac + 'px; top:' + val.locaTopSpac + 'px;">';
                noticePopup += '<section class="dpNotice__header">'
                    + '<h1 class="dpNotice__tit">' + val.ttle + '</h1>'
                    + '<button class="dpNotice__closed" id="#pub_noticeLayerPopup' + val.popupId + '" onclick="fn_statistics(\'A165\', \'' + b2b_id + '\', \'' + b2c_id + '\');document.getElementById(\'pub_noticeLayerPopup' + val.popupId + '\').style.display = \'none\';"><span class="a11y">레이어닫기</span></button>'
                    + '</section>'
                    + '<section class="dpNotice__cont" onclick ="fn_statistics(\'A163\', \'' + b2b_id + '\', \'' + b2c_id + '\')"> <p>'
                    + val.epln
                    + '</p> </section>'
                    + '<section class="dpNotice__footer">'
                    + '<span class="fCheck">'
                    + '<input type="checkbox" class="dpNotice__check" id="pub_notice_check_' + val.popupId + '" style="top:4px;" onclick="fn_statistics(\'A164\', \'' + b2b_id + '\', \'' + b2c_id + '\');fnPopupCookieChk(\'pub_noticeLayerPopup' + val.popupId + '\',\'' + val.notDispTermCode + '\')">'
                    + '<label for="pub_notice_check_' + val.popupId + '">' + notDispTermNm + '</label>'
                    + '</section>'
                    + '</dialog>';

                var exceptedIcst = ['ICST00002768', 'ICST00003500', 'ICST00004871', 'ICST00003494', 'ICST00003502', 'ICST00003437', 'ICST00003244', 'ICST00006225', 'ICST00005105', 'ICST00004376', 'ICST00004368', 'ICST00003548', 'ICST00002648', 'ICST00001637', 'ICST00001526', 'ICST00001126', 'ICST00003603', 'ICST00001573', 'ICST00006361', 'ICST00004729', 'ICST00004551', 'ICST00003135', 'ICST00002767', 'ICST00002557', 'ICST00001450', 'ICST00004567', 'ICST00001545'];
                if (exceptedIcst.indexOf(b2b_id) < 0) {
                    document.querySelector("#dimLayer").insertAdjacentHTML('afterend', noticePopup);
                }

                if (getCookie("pub_noticeLayerPopup" + val.popupId) != "N") {
                    document.getElementById("pub_noticeLayerPopup" + val.popupId).style.display = "block";
                }

                if (val.b2cLognClikYN == 'Y') {
                    if (b2c_id == '') {
                        const $notices = $query(".dpNotice__cont");

                        for ($notice of $notices) {
                            $notice.onclick = function (e) {
                                e.preventDefault();
                                showLoginLayer();
                            };
                        }
                    }
                }

            }
        });
    });

}

/*메인팝업 안보기*/
function fnPopupCookieChk(popId, day) {
    document.getElementById(popId).style.display = 'none';
    var close_day = 1;
    if (day == "404002") {
        close_day = 7;
    } else if (day == "414003") {
        close_day = 30;
    }
    setCookie(popId, "N", close_day);
}