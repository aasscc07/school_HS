/**
 --------------------------- 이벤트 바인딩 -----------------------------------
 */

/**
 * 로그인 레이어의 UI 효과를 바인딩한다.
 *
 * @param prefix
 */
function bindLoginLayerEffect(prefix) {
    $query(`#${prefix}_loginId`).onkeyup = (event) => onKeyUpLoginInput(event, prefix);
    $query(`#${prefix}_loginIdDeleteButton`).onclick = (event) => cleanLoginInput(event, `${prefix}_loginId`);
    $query(`#${prefix}_loginPassword`).onkeyup = (event) => onKeyUpLoginPassword(event, `${prefix}_toggleShowPassword`, prefix);
    $query(`#${prefix}_loginPasswordDeleteButton`).onclick = (event) => cleanLoginInput(event, `${prefix}_loginPassword`, `${prefix}_toggleShowPassword`);
    $query(`#${prefix}_toggleShowPassword`).onclick = (event) => onClickToggleShowPassword(event, `${prefix}_loginPassword`);
}

/**
 * GNB - 상세검색 레이어 검색어 조건 추가, 삭제 UI
 */
function bindOnClickAddSearchCondition() {
    const $addSearchConditionButton = $query("#detailSearch_addSearchConditionButton");
    const $detailSearchWrapper = $query("#detailSearch_wrapper");
    let idSequence = 1;

    $addSearchConditionButton.onclick = (e) => {
        e.preventDefault();
        const maximumRow = 5;

        if ($detailSearchWrapper.children.length >= maximumRow) {
            return false;
        }

        const detailSearchConditionHtml = e.target.parentNode.outerHTML
            .replace("dpDetailSearch__addBtn", "dpDetailSearch__deleteBtn")
            .replace("detailSearch_searchField", `detailSearch_searchField${idSequence}`)
            .replace("detailSearch_searchLogicGate", `detailSearch_searchLogicGate${idSequence}`)
            .replace("addSearchConditionButton", `deleteSearchConditionButton${idSequence}`);

        $detailSearchWrapper.insertAdjacentHTML('beforeend', detailSearchConditionHtml);

        $query(`#detailSearch_deleteSearchConditionButton${idSequence}`).onclick = (e) => {
            e.target.parentNode.remove();
        }

        idSequence++;
    }
}

//자동로그인 툴팁 hide and show
function bindOnClickAutoLoginCheckBox() {
    if ($query("#pub_check_autoLogin")) {
        $query("#pub_check_autoLogin").onclick = (e) => {
            if (e.target.checked) {
                getById("autoLogin-tooltip-keep").style.display = "block";
                getById("autoLogin-tooltip-info").style.display = "none";
            } else {
                getById("autoLogin-tooltip-keep").style.display = "none";
                getById("autoLogin-tooltip-info").style.display = "block";
            }
        }
    } else {
        console.warn("자동 로그인 엘리먼트(#pub_check_autoLogin)가 존재하지 않습니다.");
    }
}

function bindOnClickClosePartnershipLayer() {
    const $elem = $query("#closePartnershipLayerButton");

    if ($elem) {
        $elem.onclick = () => {
            hidePartnershipLayer();
        }
    }
}

function bindOnClickCloseBcSubPaymentPolicyLayer() {
    $query("#closeB2cSubPaymentPolicyLayerButton").onclick = () => {
        hideB2cSubPaymentPolicyLayer();
    }
}

function bindOnClickCloseB2cTelAlertRegisterLayer() {
    $query("#closeB2cTelAlertRegisterButton").onclick = () => {
        hideB2cTelAlertRegisterLayer(true);
    }
}

function bindOnClickCloseShareLayer() {
    const $elem = $query("#closeShareLayer");

    if ($elem) {
        $elem.onclick = (e) => {
            e.stopPropagation();

            hideShareLayer();
        }
    }
}

/**
 * 상세검색 버튼을 눌렀을 때, 수행할 코드 바인딩
 */
function bindOnClickDetailSearchButton() {
    const $detailSearchButton = $query("#detailSearch");

    if ($detailSearchButton) {
        $detailSearchButton.onclick = (e) => {
            e.preventDefault();
            showDpDetailSearch();
        }
    }
}

function bindOnClickDetailSearchCloseButton() {
    $query("#detailSearchClosed").onclick = (e) => {
        e.preventDefault();

        if (e.pointerId === -1) {
            submitSearchDetail($query("#detailSearch_form"));
            return;
        }

        hideDpDetailSearch();
    }
}

function bindOnClickDetailSearchResetButton() {
    $query("#detailSearch_reset").onclick = () => {
        $query("#detailSearch_form").reset();
    }
}

/**
 * 레이어가 활성화된 상태에서 검은색 그림자 부분을 클릭했을 때의 이벤트 바인딩
 */
function bindOnClickDimLayer() {
    $query("#dimBgLayer").onclick = (e) => {
        e.stopPropagation();

        if (e.target.id === "dimBgLayer") {
            hideAllLayers();
        }
    }
}

function bindOnClickSocialNetworkButtons(prefix) {
    if (!prefix) {
        $query('#twitterShareButton').onclick = twitterSocialShare;
        $query('#facebookShareButton').onclick = facebookSocialShare;
        $query('#kakaoShareButton').onclick = kakaoSocialShare;
        $query('#naverShareButton').onclick = naverSocialShare;
        $query('#linkShareButton').onclick = copyLink;
        return;
    }

    const $twitterShareButton = $query(`#${prefix}twitterShareButton`);

    if ($twitterShareButton) {
        $twitterShareButton.onclick = twitterSocialShare;
    }

    const $facebookShareButton = $query(`#${prefix}facebookShareButton`);

    if ($facebookShareButton) {
        $facebookShareButton.onclick = facebookSocialShare;
    }

    const $kakaoShareButton = $query(`#${prefix}kakaoShareButton`);

    if ($kakaoShareButton) {
        $kakaoShareButton.onclick = kakaoSocialShare;
    }

    const $naverShareButton = $query(`#${prefix}naverShareButton`);

    if ($naverShareButton) {
        $naverShareButton.onclick = naverSocialShare;
    }
    const $linkShareButton = $query(`#${prefix}linkShareButton`);

    if ($linkShareButton) {
        $linkShareButton.onclick = copyLink;
    }
}

function removeSelectedItemClass() {
    const $selectedItems = $query('.dpOrganization__searchItem.selectedItem');

    for (const $selectedItem of $selectedItems) {
        $selectedItem.classList.remove('selectedItem');
    }
}

function bindOnKeyDownOrganizationLayer() {
    const $organizationInputs = $query(".dpOrganization__input");

    for (const $organizationInput of $organizationInputs) {
        $organizationInput.onkeydown = (e) => {
            if (e.key === "Enter") {
                return;
            }

            if (e.key !== "ArrowDown" && e.key !== "ArrowUp") {
                removeSelectedItemClass();
                return;
            }

            if (e.key === "ArrowDown") {
                const type = e.target.parentNode.id.replace("searchOrganizationForm", "");
                const $searchItemContainer = $query(`#searchResultOrganizationList${type}`);
                const $searchItems = $searchItemContainer.children;
                const selectedClassName = "selectedItem";

                let foundSelected = false;
                let itemIndex = 0;

                for (const $searchItem of $searchItems) {
                    if (foundSelected) {
                        $searchItem.classList.add(selectedClassName);

                        const upperItemNumber = 3;
                        const minimumScrollTop = $searchItem.clientHeight * (itemIndex - upperItemNumber);

                        if ($searchItemContainer.scrollTop < minimumScrollTop) {
                            $searchItemContainer.scrollTop = minimumScrollTop;
                        }

                        return;
                    }

                    if ($searchItem.classList.contains(selectedClassName)) {
                        $searchItem.classList.remove(selectedClassName);
                        foundSelected = true;
                    }

                    itemIndex++;
                }

                if ($searchItems.length > 0) {
                    $searchItems[0].classList.add(selectedClassName);
                    $searchItemContainer.scrollTop = 0;
                }
            }

            if (e.key === "ArrowUp") {
                const type = e.target.parentNode.id.replace("searchOrganizationForm", "");
                const $searchItemContainer = $query(`#searchResultOrganizationList${type}`);
                const $searchItems = Array.prototype.slice.call($searchItemContainer.children).reverse();
                const selectedClassName = "selectedItem";

                let foundSelected = false;
                let itemIndex = 0;

                for (const $searchItem of $searchItems) {
                    if (foundSelected) {
                        $searchItem.classList.add(selectedClassName);

                        const minimumScrollTop = $searchItem.clientHeight * ($searchItems.length - itemIndex - 1);

                        if ($searchItemContainer.scrollTop > minimumScrollTop) {
                            $searchItemContainer.scrollTop = minimumScrollTop;
                        }

                        return;
                    }

                    if ($searchItem.classList.contains(selectedClassName)) {
                        $searchItem.classList.remove(selectedClassName);
                        foundSelected = true;
                    }

                    itemIndex++;
                }

                if ($searchItems.length > 0) {
                    $searchItems[0].classList.add(selectedClassName);
                    $searchItemContainer.scrollTop = $searchItems[0].clientHeight * $searchItems.length;
                }
            }
        }
    }
}

function bindOnSubmitDetailSearchForm() {
    $query(`#detailSearch_form`).onsubmit = (e) => {
        e.preventDefault();
        const $form = e.target;
        submitSearchDetail($form);
    }
}

/**
 * 논문 오류 제보하기 레이어에서 취소 버튼이나 X 버튼을 눌렀을 때 닫는다.
 */
function bindOnClickCloseNodeErrorReportLayer() {
    $query("#dpReportClosed").onclick = (e) => {
        e.preventDefault();
        hideNodeErrorReportLayer();
    }

    $query("#cancelErrorReportButton").onclick = (e) => {
        e.preventDefault();
        hideNodeErrorReportLayer();
    }
}

/**
 * 논문 오류 제보하기 레이어에서 제출 버튼을 눌렀을 때 제출한다.
 */
function bindOnClickSubmitNodeErrorReportLayer() {
    $query("#submitErrorReportButton").onclick = async (e) => {
        e.preventDefault();
        /**
         * @type ErrorReportType
         */
        const errorType = $query("#nodeErrorReportLayer_select").value;

        if (errorType === "none") {
            showAlertDialog("신고항목을 선택해주세요.");
            return;
        }

        if (errorType === "title") {
            const formData = new FormData($query("#nodeErrorReportLayer_type_title"));
            const {mainTtl, subTtl, eqTtl} = Object.fromEntries(formData);

            if (!mainTtl && !subTtl && !eqTtl) {
                showAlertDialog("수정하신 내용이 없습니다.");
                return;
            }

            const reportResponse = await fetchAPI("/journal/errReport/title", "POST", formData);

            if (reportResponse && reportResponse.success === -1) {
                showAlertDialog("로그인이 필요한 항목입니다.");
                return;
            }

            if (reportResponse && reportResponse.success === 0) {
                showAlertDialog("오류신고가 접수되었습니다. 관리자의 승인 후 반영됩니다.");
                document.querySelector('#nodeErrorReportLayer_mainTitle_input').value = '';
                document.querySelector('#nodeErrorReportLayer_subTitle_input').value = '';
                document.querySelector('#nodeErrorReportLayer_equalTitle_input').value = '';
                $query(`#nodeErrorReportLayer_type_${errorType}`).style.display = 'none';
                document.querySelector('#nodeErrorReportLayer_select option[value="none"]').selected = true;
                hideNodeErrorReportLayer();
                return
            }

            showAlertDialog("네트워크 에러가 발생했습니다. 잠시 후에 다시 시도해주세요.");
        }

        if (errorType === "page") {
            const formData = new FormData($query("#nodeErrorReportLayer_type_page"));

            const {ustart, uend} = Object.fromEntries(formData);

            if (!ustart || !uend) {
                showAlertDialog("페이지를 모두 입력해 주세요.");
                return;
            }

            const reportResponse = await fetchAPI("/journal/errReport/page", "POST", formData);

            if (reportResponse && reportResponse.success === -1) {
                showAlertDialog("로그인이 필요한 항목입니다.");
                return;
            }

            if (reportResponse && reportResponse.success === 0) {
                showAlertDialog("오류신고가 접수되었습니다. 관리자의 승인 후 반영됩니다.");
                $query(`#nodeErrorReportLayer_type_${errorType}`).style.display = 'none';
                document.querySelector('#nodeErrorReportLayer_select option[value="none"]').selected = true;
                hideNodeErrorReportLayer();
                return
            }

            showAlertDialog("네트워크 에러가 발생했습니다. 잠시 후에 다시 시도해주세요.");
        }

        if (errorType === "author") {
            const formData = new FormData($query("#nodeErrorReportLayer_type_author"));

            let autrIstn = document.querySelectorAll('#nodeErrorReportLayer_type_author .dpReport__input[name=autrIstn]');
            let autrNm = document.querySelectorAll('#nodeErrorReportLayer_type_author .dpReport__input[name=autrNm]');
            let authorCheck = 'F';
            autrIstn.forEach((el) => {
                if (el.value != '')
                    authorCheck = 'T'
            });
            autrNm.forEach((el) => {
                if (el.value != '')
                    authorCheck = 'T'
            });
            if (authorCheck === 'F') {
                showAlertDialog("수정하신 내용이 없습니다.");
                return;
            }

            const reportResponse = await fetchAPI("/journal/errReport/author", "POST", formData);

            if (reportResponse && reportResponse.success === -1) {
                showAlertDialog("로그인이 필요한 항목입니다.");
                return;
            }

            if (reportResponse && reportResponse.success === 0) {
                showAlertDialog("오류신고가 접수되었습니다. 관리자의 승인 후 반영됩니다.");
                $query(`#nodeErrorReportLayer_type_${errorType}`).style.display = 'none';
                document.querySelector('#nodeErrorReportLayer_select option[value="none"]').selected = true;
                hideNodeErrorReportLayer();
                return
            }

            showAlertDialog("네트워크 에러가 발생했습니다. 잠시 후에 다시 시도해주세요.");
            return;
        }

        if (errorType === "tableOfContents") {
            const formData = new FormData($query("#nodeErrorReportLayer_type_tableOfContents"));
            const reportResponse = await fetchAPI("/journal/errReport/toc", "POST", formData);

            if (reportResponse && reportResponse.success === -1) {
                showAlertDialog("로그인이 필요한 항목입니다.");
                return;
            }

            if (reportResponse && reportResponse.success === 0) {
                showAlertDialog("오류신고가 접수되었습니다. 관리자의 승인 후 반영됩니다.");
                $query(`#nodeErrorReportLayer_type_${errorType}`).style.display = 'none';
                document.querySelector('#nodeErrorReportLayer_select option[value="none"]').selected = true;
                hideNodeErrorReportLayer();
                return
            }

            showAlertDialog("네트워크 에러가 발생했습니다. 잠시 후에 다시 시도해주세요.");
        }
    }
}

/**
 * 논문 오류 제보하기 레이어에서
 * 제보할 오류의 종류 변화에 따라 UI 가 변경된다.
 */
function bindOnChangeNodeErrorReportLayerSelect() {
    $query("#nodeErrorReportLayer_select").onchange = (e) => {
        /**
         * @type ErrorReportType
         */
        const errorType = e.target.value;
        const $bodyElems = $query("#nodeErrorReportLayer_bodySection").children;

        // Initialization. hide all body sections.
        for (const $bodyElem of $bodyElems) {
            $bodyElem.style.display = "none";
        }

        // Show user selected body section.
        if (errorType !== "none") {
            $query(`#nodeErrorReportLayer_type_${errorType}`).style.display = "block";
        }
    }
}

/**
 * 참고문헌 레이어에서 '취소' 버튼 혹은 'X' 버튼을 클릭했을 때 일어나는 이벤트를 바인딩한다.
 */
function bindOnClickReferenceNodeReportCloseButton() {
    $query("#referenceNodeReportLayer_close").onclick = (e) => {
        e.preventDefault();
        hideReferenceNodeReportLayer();
    }

    $query("#referenceNodeReportLayer_cancel").onclick = (e) => {
        e.preventDefault();
        hideReferenceNodeReportLayer();
    }
}

function hideAlertInReferenceNodeReportLayer() {
    $query("#referenceNodeReportLayer_info").style.display = "none";
}

/**
 * 참고문헌 레이어에서 + 버튼을 클릭해 문헌 수를 늘리는 이벤트를 바인딩한다.
 */
function bindOnClickAddReferenceNodeButton() {
    let index = 0;

    $query("#referenceNodeReportLayer_addButton").onclick = (e) => {
        const innerIndex = index;
        e.preventDefault();

        if ($query(".dpReferences__input").length >= 5) {
            showAlertDialog(LAYER_MESSAGE.addUpTo5Items);
            return;
        }

        $query("#referenceNodeReportLayer_nodeWrapper").insertAdjacentHTML(
            "beforeend",
            `
            <div class="dpReferences__item">
                <input type="text" id="referenceNodeInput_${innerIndex}" name="node[]" class="dpReferences__input" placeholder="${LAYER_MESSAGE.PLEASE_ENTER_DBPIA_URL}">
                <button type="button" id="deleteReferenceNodeInputButton_${innerIndex}" class="dpReferences__deleteBtn"><span class="a11y">검색조건삭제</span></button>
            </div>
            `
        );

        $query(`#deleteReferenceNodeInputButton_${innerIndex}`).onclick = (e) => {
            e.preventDefault();

            if ($query(`#referenceNodeInput_${innerIndex}`).classList.contains("error")) {
                hideAlertInReferenceNodeReportLayer();
            }

            e.target.parentNode.remove();
        }

        index = index + 1;
    }
}

/**
 * 참고문헌 레이어에서 다음 버튼을 클릭했을 때 일어나는 이벤트를 바인딩한다.
 */
function bindOnClickNextReferenceNodeButton() {
    $query("#referenceNodeReportLayer_next").onclick = (e) => {
        e.preventDefault();

        const formData = new FormData($query("#referenceNodeReportLayer_form"));
        const nodeIds = []

        const $nodeElems = $query("[name='node[]']");

        for (const $nodeElem of $nodeElems) {
            $nodeElem.style.border = "";
        }

        function showAlertInReferenceNodeReportLayer(text, $elem) {
            $query("#referenceNodeReportLayer_info").textContent = text;
            $query("#referenceNodeReportLayer_info").style.display = "block";

            $elem.onkeyup = (e) => {
                e.preventDefault();
                hideAlertInReferenceNodeReportLayer();
                $elem.classList.remove("error");
                $elem.onkeyup = null;
            }
        }

        for (const url of formData.getAll("node[]")) {
            const nodeId = url.replaceAll(/.*dbpia\.co\.kr\/journal\/articledetail\?nodeId=/gi, "");

            if (!url || !/node[0-9]{8}$/gi.test(nodeId)) {
                showAlertInReferenceNodeReportLayer(LAYER_MESSAGE.THERE_IS_UNAVAILABLE_URL, $nodeElems[nodeIds.length]);
                $nodeElems[nodeIds.length].classList.add("error");
                return;
            }

            if (nodeIds.includes(nodeId)) {
                showAlertInReferenceNodeReportLayer(LAYER_MESSAGE.THERE_ARE_DUPLICATE_URLS, $nodeElems[nodeIds.length]);
                $nodeElems[nodeIds.length].classList.add("error");
                return;
            }

            if ($query("#referenceNodeReportLayer_nodeId_input").value.includes(nodeId)) {
                showAlertInReferenceNodeReportLayer(LAYER_MESSAGE.SAME_URL, $nodeElems[nodeIds.length]);
                $nodeElems[nodeIds.length].classList.add("error");
                return;
            }

            nodeIds.push(nodeId);
        }

        hideAlertInReferenceNodeReportLayer();

        formData.set("node[]", nodeIds);

        fetchAPI("/journal/getNodeName", "POST", formData).then(
            (getNodeNameResponse) => {
                /**
                 * @type NodeDetailResponse[]
                 */
                const nodeDetailResponses = getNodeNameResponse.list;

                // 현재 서비스중이지 않은 논문이 존재할 때, 각각 사이즈가 다름
                if (nodeDetailResponses.length < nodeIds.length) {
                    showAlertDialog("현재 서비스중이지 않은 논문이 존재합니다.");

                    // node element 빨간줄 표기해주기
                    for (const $nodeElem of $nodeElems) {
                        const filter = nodeDetailResponses.filter(
                            (e) => e.articleId === $nodeElem.value.match(/NODE[0-9]{8}/i)[0]
                        );

                        if (filter.length === 0) {
                            $nodeElem.classList.add("error");
                        }
                    }

                    return;
                }

                if (!nodeDetailResponses) {
                    showAlertDialog("유효한 논문이 없거나 네트워크 에러입니다. 새로고침 후 다시 시도해주세요.")
                    return;
                }

                $query("#referenceNodeReportLayer_nodeWrapper").innerHTML = "";

                let index = 0;

                for (const nodeDetailResponse of nodeDetailResponses) {
                    $query("#referenceNodeReportLayer_nodeWrapper").insertAdjacentHTML(
                        'beforeend',
                        `
                        <div class="dpReferences__item">
                            <input type="hidden" name="notdNode[]" value="${nodeDetailResponse.articleId}" />
                            <div style="flex: 1; padding: 0;" class="dpReferences__items">${isLocaleKorean() ? nodeDetailResponse.articleTitleKr : nodeDetailResponse.articleTitleEn}</div>
                            <button type="button" id="referenceNodeReportLayer_deleteNodeButton${index}" class="dpReferences__deleteBtn">
                                <span class="a11y">검색결과 논문 삭제</span>
                            </button>
                        </div>
                        `
                    );

                    $query(`#referenceNodeReportLayer_deleteNodeButton${index}`).onclick = (e) => {
                        e.preventDefault();
                        e.target.parentNode.remove();
                    }

                    index += 1;
                }

                e.target.style.display = "none";
                $query("#referenceNodeReportLayer_submit").style.display = "block";
            }
        );
    }
}

/**
 * 참고문헌 레이어에서 확인 버튼을 클릭했을 때 일어나는 이벤트를 바인딩한다.
 */
function bindOnClickSubmitReferenceNodeButton() {
    $query("#referenceNodeReportLayer_submit").onclick = (e) => {
        e.preventDefault();

        const formData = new FormData($query("#referenceNodeReportLayer_form"));

        if (!formData.get("notdNode[]")) {
            showAlertDialog("신청할 참고문헌이 없습니다.");
            return;
        }

        fetchAPI("/journal/setRefBook", "POST", formData).then((res) => {
            hideReferenceNodeReportLayer();
            showAlertDialog("참고문헌 신청이 완료되었습니다. 관리자의 승인 후 반영됩니다.");
        });
    }
}

/**
 * ------------------------- 콜백 메서드 --------------------------------
 */

/**
 * 내서재 담기를 클릭했을 때
 * 사용 시 /js/cookie_task.js 를 추가해야 한다.
 *
 * @param {string} nodeId 논문 아이디
 * @param {function} addCallback 내서재 추가 시 호출될 콜백 함수
 * @param {function} removeCallback 내서재 삭제 시 호출될 콜백 함수
 * @param {MouseEvent} e 클릭 이벤트
 * @return void
 * @example
 * onClickBookmarkNode(
 *              'NODE10723261'
 *              , function () { alert("내 서재에 담김"); }
 *              , function () { alert("내 서재에서 삭제됨"); }
 * );
 */
function onClickBookmarkNode(nodeId, addCallback, removeCallback, e) {
    if (e) {
        // 추천 논문 레이어의 버튼을 눌러 다운로드한 경우
        if (e.target.id.includes("recommendLayer")) {
            setDynamicStatisticsCode(e.target.id, 'Z413');
        } else {
            setDynamicStatisticsCode(e.target.id, 'Z103');
        }
    }

    // 로그인 된 상태인 경우
    if (layer_isB2cLoggedIn()) {
        toggleBookmarkAPI(nodeId, addCallback, removeCallback);

        return;
    }

    // 로그인되지 않은 상태인 경우 쿠키에 저장한다.
    toggleBookmarkWithCookie(nodeId, addCallback, removeCallback);

    if (isBookmarkedWithCookie(nodeId) && getCookie("noLoginAlertCheck") !== "true") {
        setCookie("noLoginAlertCheck", "true");

        showConfirmDialog(LAYER_MESSAGE.NO_LOGIN_BOOKMARK
            , () => {
                window.location.href = "/mylib/totalNodeList";
            }
            , () => {
            });
    }
}

/**
 * 구매하기 버튼을 클릭했을 때
 * @param me
 * @param nodeId
 */
function onClickPurchase(me, nodeId) {
    if (!me.b2cId) {
        showLoginLayer();
        return;
    }

    window.location.href = `/pay/contentBuy?nodeId=${nodeId}`;
}


/**
 * 장바구니로 가기를 클릭했을 때
 */
function onClickToCart() {
    window.location.href = "/mypage/cartList";
}

/**
 * 논문 다운로드 버튼을 클릭했을 때
 *
 * @param {string} nodeId
 * @param {string} elemId 통계 코드를 넣기 위한 엘리먼트 아이디
 * @param {boolean} isFloating 통계코드를 위해 플로팅 버튼인지 판단하기 위한 파라미터
 */
async function onClickDownloadNode(nodeId, elemId, isFloating, e) {
    let currentB2cLoginYN = getB2cLoginYN();

    if(checkb2cLogin(currentB2cLoginYN)){
        const downloadNodeResult = await downloadNode(nodeId);

        //상세페이지 구분
        if (elemId && elemId.indexOf("_detail") > -1) isFloating = document.querySelector(`.personalBtn.scroll`);

        // 추천 논문 레이어의 버튼을 눌러 다운로드한 경우
        if (e && e.target.id.includes("recommendLayer")) {
            //setDynamicStatisticsCode(elemId, 'Z412'); 코드 이곳에서 넣어주지 않으나 아래 return 문은 필요
            return;
        }

        // 로그인 레이어를 띄우는 경우
        if (downloadNodeResult === "SHOW_LOGIN_LAYER") {
            const statisticsCode = isFloating ? 'Z363' : isMobileWeb() ? 'Z359' : 'Z138';
            setDynamicStatisticsCode(elemId, statisticsCode)
            return;
        }

        // 추천 논문 레이어 띄우는 경우 -> 다운로드 정상적으로 이루어진 경우
        if (downloadNodeResult === "SHOW_RECOMMENDED_NODES_LAYER") {
            const statisticsCode = isFloating ? 'Z344' : isMobileWeb() ? 'Z349' : 'Z102';
            setDynamicStatisticsCode(elemId, statisticsCode)
            return;
        }

        const me = await getMeAPI();

        // 스탠다드 구독인 경우
        if (downloadNodeResult === "SHOW_PURCHASE_LAYER" && me.b2cSubDay > 0 && !me.checkPremium) {
            const statisticsCode = isFloating ? 'Z361' : isMobileWeb() ? 'Z357' : 'Z136';
            setDynamicStatisticsCode(elemId, statisticsCode)
            return;
        }

        // 프리미엄 구독인 경우
        if (downloadNodeResult === "SHOW_PURCHASE_LAYER" && me.b2cSubDay > 0 && me.checkPremium) {
            const statisticsCode = isFloating ? 'Z362' : isMobileWeb() ? 'Z358' : 'Z137';
            setDynamicStatisticsCode(elemId, statisticsCode)
            return;
        }

        // 일반 구매하기 레이어
        if (downloadNodeResult === "SHOW_PURCHASE_LAYER") {
            const statisticsCode = isFloating ? 'Z347' : isMobileWeb() ? 'Z350' : 'Z113';
            setDynamicStatisticsCode(elemId, statisticsCode)
        }
    }
}

/**
 * BIS에서 이용기관 IP 정보 B2C 로그인 필수 여부 체크 시에 로그인 시에만 이용할 수 있도록
 * @param b2cLoginYN
 * @returns {boolean}
 */
function checkb2cLogin(b2cLoginYN){
    //b2c 필수인데
    if(b2cLoginYN){
        //로그인 하지 않았다면
        if(isEmptyStr(b2cId)){
            showAlertDialog(
                //"는(은) DBpia 제휴기관으로 로그인 후 모든 논문을 무료로 이용하실 수 있습니다.",
                b2bName + " " + LAYER_MESSAGE.B2C_LOGIN_YN,
                () => {
                    showLoginLayer();
                }
            );
            return false;
        }
    }
    return true;
}

/**
 * 외부링크 버튼을 클릭했을 때
 *
 * @param {string} url 외부 링크 주소 ex) 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002532540'
 * @param {string} nodeId 논문의 NODE ID ex) 'NODE10723261'
 * @param {string} titleKr 한글 제목 ex) '소셜커머스의 신뢰전이에 대한 실증적 검증: <!HS>사이트<!HE>와 입점업체 간의 신뢰를 중심으로'
 * @param {string} titleEn 영문 제목 ex) 'An Empirical study on the Trust Transfer in Social Commerce Site: With a Focus on Trust between the Site and Occupants'
 * @param {string} iprdId 생성기관 아이디 ex) 'IPRD00016034'
 * @param {string} from 특정 페이지에서 접근 시 로직을 태우기 위한 용도의 파라미터
 * @param {string} elemId 통계코드를 삽입하기 위한 엘리먼트 아이디
 * @param {boolean} isFloating 통계코드를 구분하기 위해 플로팅인지 구분하기 위한 플래그
 * @param {boolean} isDissertation 학위 논문인지 구분하기 위한 변수
 */
async function onClickExternalLinkNode(url, nodeId, titleKr, titleEn, iprdId, from, elemId, isFloating, isDissertation, e) {
    const me = syncGetMeAPI();

    /**
     * 외부링크 로그인 레이어 전에 뜨는 레이어
     */
    if (isEmptyStr(me.b2cId)) {
        showLinkLoginLayer(me, onClickExternalLinkNodeCallBack, url, nodeId, titleKr, titleEn, iprdId, from, elemId, isFloating, isDissertation, e);
    }else{
        onClickExternalLinkNodeCallBack(me, url, nodeId, titleKr, titleEn, iprdId, from, elemId, isFloating, isDissertation, e);
    }
}

async function onClickExternalLinkNodeCallBack(me, url, nodeId, titleKr, titleEn, iprdId, from, elemId, isFloating, isDissertation, e) {
    let readExternalLinkNodeResult;

    //상세페이지 구분
    if (elemId && elemId.indexOf("_detail") > -1) isFloating = document.querySelector(`.personalBtn.scroll`);

    // 학위 논문은 별개로 처리한다.
    if (isDissertation) {
        if(isMobileAgent()){
            url = url.replace("www.riss.kr", "m.riss.kr");
        }
        readExternalLinkNodeResult = readDissertationLinkNode(me, url);
    } else {
        readExternalLinkNodeResult = await readExternalLinkNode(me, from, nodeId, url, titleKr, titleEn, iprdId, isDissertation);
    }

    if (readExternalLinkNodeResult === "SHOW_LOGIN_LAYER") {
        let statisticsCode = '';

        if (isDissertation) {
            statisticsCode = isFloating ? 'Z146' : isMobileWeb() ? 'Z147' : 'Z145';
        } else {
            statisticsCode = isFloating ? 'Z374' : isMobileWeb() ? 'Z376' : 'Z373';
        }
        setDynamicStatisticsCode(elemId, statisticsCode);
    }

    if (readExternalLinkNodeResult === "POPUP_MULTI_CP_LAYER") {
        const statisticsCode = isFloating ? 'Z348' : isMobileWeb() ? 'Z375' : 'Z314';
        setDynamicStatisticsCode(elemId, statisticsCode);
    }

    if (readExternalLinkNodeResult === "GO_TO_DISSERTATION_LINK") {
        const statisticsCode = isFloating ? 'Z143' : isMobileWeb() ? 'Z144' : 'Z142';
        logDissertationUsageAPI(nodeId, iprdId);
        setDynamicStatisticsCode(elemId, statisticsCode);
    }
}

/**
 * 논문 보기 버튼을 클릭했을 때
 * element id 를 받으면, 해당 element Id 에 통계 함수를 바인딩한다.
 * @param {string} nodeId
 * @param {string} elemId 통계코드를 넣기 위한 Element ID
 * @param {boolean} isFloating 통계코드를 위해 플로팅 버튼인지 판단하기 위한 파라미터
 */
function onClickReadNode(nodeId, elemId, isFloating) {
    let currentB2cLoginYN = getB2cLoginYN();
    if(checkb2cLogin(currentB2cLoginYN)){
        const readNodeResult = readNode(nodeId);

        //상세페이지 구분
        if (elemId && elemId.indexOf("_detail") > -1) isFloating = document.querySelector(`.personalBtn.scroll`);

        if (readNodeResult === "SHOW_LOGIN_LAYER") {
            const statisticsCode = isFloating ? 'Z360' : isMobileWeb() ? 'Z356' : 'Z139';
            setDynamicStatisticsCode(elemId, statisticsCode)
            return;
        }

        if (readNodeResult === "SHOW_PREVIEW_LAYER") {
            const statisticsCode = isFloating ? 'Z346' : isMobileWeb() ? 'Z355' : 'Z114';
            setDynamicStatisticsCode(elemId, statisticsCode)
            return;
        }

        if (readNodeResult === "POPUP_PDF_VIEWER") {
            const statisticsCode = isFloating ? 'Z345' : isMobileWeb() ? 'Z353' : 'Z101';
            setDynamicStatisticsCode(elemId, statisticsCode)
        }
    }
}

/**
 * SNS 로그인을 클릭했을 때
 * @param e
 * @param service
 */
function onClickSocialLogin(e, service) {
    e.preventDefault();
    let url = `/member/login/${service}`;

    //자동로그인 주석처리
    //자동로그인 여부
    /*let element = document.querySelector("input[id=pub_check_autoLogin]");
    if(element){
        let isAutoLogin = element.checked;
        url+= '?autoLogin=' + isAutoLogin;
    }*/

    window.location.href = url;
}

/**
 * 아이디 찾기를 클릭했을 때
 * @param e
 */
function onClickFindAccount(e) {
    e.preventDefault();
    window.location.href = '/member/accFind'
}

/**
 * 회원가입을 클릭했을 때
 * @param e
 */
function onClickJoin(e) {
    e.preventDefault();
    window.location.href = '/join/joinAgree'
}

/**
 * 패스워드 보여주기 버튼을 토글했을 때
 * @param e
 * @param id
 */
function onClickToggleShowPassword(e, id) {
    e.preventDefault();
    const button = e.target;

    if (button.classList.contains("on")) {
        button.classList.remove("on");
        $query(`#${id}`).setAttribute("type", "password");
        return
    }

    button.classList.add("on");
    $query(`#${id}`).setAttribute("type", "text");
}

/**
 * 기관인증 레이어에서 검색한 기관을 클릭했을 때
 * @return {(function(*): Promise<void>)|*}
 */
function onClickSearchList() {
    return async (e) => {
        const organizationId = e.currentTarget.getAttribute("data-organization-id");
        const organizationName = e.currentTarget.getAttribute("data-organization-name");

        await processIsSubscribing(organizationId, organizationName);
    };
}

/**
 * 기관인증에서 소속기관이 없습니다 체크박스 체크했을 때
 * @param e
 * @return {Promise<void>}
 */
async function onChangeNoOrganizationCheckBox(e) {
    const me = await getMeAPI();
    setOrganizationLayerButton(me && me.b2cId)

    const isChecked = e.target.checked;
    setOrganizationLayerButtonWrapper(isChecked);
}

/**
 * 로그인 암호를 입력했을 때
 * @param e
 * @param toggleShowPasswordId
 * @param prefix
 */
function onKeyUpLoginPassword(e, toggleShowPasswordId, prefix) {
    onKeyUpLoginInput(e, prefix);
    const {id, value} = e.target;
    displayToggleShowPassword(value, toggleShowPasswordId);
}

/**
 * 로그인 정보를 입력했을 때
 * @param e
 * @param prefix
 */
function onKeyUpLoginInput(e, prefix) {
    const {id, value} = e.target;
    loginInputPlaceHolderUiEffect(value, prefix);
}

/**
 * 로그인 폼을 제출했을 때
 * @param e
 * @return {Promise<void>}
 */
async function onSubmitLoginForm(e) {
    e.preventDefault();

    const formData = new FormData($query("#loginForm"));

    const userId = formData.get("userId");
    const userPassword = formData.get("userPw");
    let autoLogin = formData.get("autoLogin");

    if (autoLogin && autoLogin === "on") {
        autoLogin = "Y";
    } else {
        autoLogin = "N";
    }

    const isSaveIdChecked = $query("#saveIdCheckBox").checked;
    setCookie("idSave", isSaveIdChecked ? userId : "");

    const loginResponse = await b2cLoginAPI(userId, userPassword);
    const {loginMsg, loginYN, dayCnt, alertCode, deltYn} = loginResponse;
    const isLoggedIn = loginResponse && loginResponse.loginYN !== "F";

    if (dayCnt && !isEmptyStr(loginMsg)) {
        organizationAuthAlert({
            dayCnt,
            loginMessage: loginMsg,
            b2cId: userId,
            shouldReload: true,
            alertCode,
            deltYn
        });
        return;
    }

    if (!isEmptyStr(loginMsg)) {
        showAlertDialog(loginMsg, () => {
            if (isLoggedIn) {
                window.location.reload();
            }
        });
        return;
    }

    window.location.reload()
}

/**
 * 기관인증 레이어에서 검색할 기관명을 입력하고 제출했을 때
 * @param type
 * @return {(function(*): Promise<void>)|*}
 */
function onSubmitSearchOrganizationForm(type) {
    return async (e) => {
        e.preventDefault();

        const $searchItems = $query(`#searchResultOrganizationList${type}`).children;

        for (const $searchItem of $searchItems) {
            if ($searchItem.classList.contains("selectedItem")) {
                const organizationId = $searchItem.getAttribute("data-organization-id");
                const organizationName = $searchItem.getAttribute("data-organization-name");

                await processIsSubscribing(organizationId, organizationName);

                return;
            }
        }

        const formData = new FormData(e.target);
        const searchTerm = formData.get("searchTerm");

        if (!searchTerm || searchTerm.trim().length < 2) {
            showAlertDialog("검색어를 2자 이상 입력해주세요.")
            return;
        }

        const searchCandidates = await searchOrganizationListAPI(searchTerm);

        if (!searchCandidates || searchCandidates.length === 0) {
            // 구독하지 않은 기관인 경우에는 B 타입의 레이어를 표기한다.
            showOrganizationLayer("B", {
                organizationName: searchTerm,
                organizationId: "NONE"
            });

            return;
        }

        let listHtml = "";

        for (const [index, candidate] of searchCandidates.entries()) {
            const {b2b_id: b2bId, b2b_name: b2bName} = candidate;
            listHtml += searchListHtml(searchTerm, b2bName, b2bId, index === 0);
        }

        const $searchResultListWrapper = $query(`#searchResultOrganizationList${type}`);
        $searchResultListWrapper.innerHTML = listHtml;
        $searchResultListWrapper.style.display = "block";

        const searchListElems = $query(".dpOrganization__searchItem");

        for (const $searchList of searchListElems) {
            $searchList.onclick = onClickSearchList();
            $searchList.onmouseover = (e) => {
                removeSelectedItemClass();

                const $currentTarget = e.currentTarget;
                $currentTarget.classList.add("selectedItem");
            };
        }
    };
}

/**
 * ------------------------- 레이어 내부 기능 ----------------------------
 */

/**
 * 로그인 레이어 입력 값 초기화하기
 * @param e
 * @param inputId
 * @param toggleShowPasswordId
 */
function cleanLoginInput(e, inputId, toggleShowPasswordId) {
    const $loginInput = $query(`#${inputId}`);

    $loginInput.value = "";
    $loginInput.classList.remove("dpLogin__input__hasText");
    $query(`#${inputId}DeleteButton`).classList.remove("on");

    if (toggleShowPasswordId) {
        displayToggleShowPassword($loginInput.value, toggleShowPasswordId);
    }
}

/**
 * 상세 검색 폼 제출하기
 * @param $form
 */
function submitSearchDetail($form) {
    const formData = new FormData($form);

    // get collection queries.
    const searchQueries = formData.getAll("searchQuery");
    const searchFields = formData.getAll("searchField");
    const searchLogicGates = formData.getAll("searchLogicGate");

    const collectionQueryString = searchQueries.reduce((collectionQuery, searchQuery, index) => {
        if (searchQuery) {
            const searchField = searchFields[index];
            const searchLogicGate = searchLogicGates[index];

            return collectionQuery + `(${getCollectionQuery(searchField, searchQuery)})${getSearchLogicGateString(searchLogicGate)}`;
        }

        return collectionQuery
    }, "");

    // get filters.
    const searchLanguages = formData.getAll("searchLanguage");
    const filterString = searchLanguages.reduce((filter, searchLanguage, index) => {
        if (searchLanguage === "all") {
            return filter;
        }

        if (searchLanguage === "others") {
            const languages = "한국어 중국어 일본어 영어"
            return filter + `<NODE_LANG:notin:${languages}>`;
        }

        const isLast = index === searchLanguages.length - 1;

        return filter + `<NODE_LANG:match:${searchLanguage}> ${isLast ? "" : " | "}`;
    }, "");

    const searchIncludeNoService = formData.get("searchIncludeNoService");
    const searchUseTypes = formData.getAll("searchUseType");
    const searchISSN = formData.get("issnInput1") + " " + formData.get("issnInput2");

    /**
     * ISSN 검색 키워드 값 모두 들어왔는지 validation
     * ISSN 검색은 무조건 8글자. 공백포함 9글자인지 확인
     */
    if(searchISSN && ' ' !== searchISSN){
        if(!formData.get("issnInput1") || !formData.get("issnInput2") || searchISSN.length != 9){
            if(isLocaleKorean()){
                showAlertDialog("ISSN 형식이 올바르지 않습니다.");
            }else{
                showAlertDialog("The ISSN format is incorrect.");
            }
            return;
        }
    }

    // get prefix.
    const prefixString = getDetailSearchPrefix(searchIncludeNoService, searchUseTypes, searchISSN);

    /**
     * ISSN 검색도 검색 키워드여서 ISSN 검색어도 없을때 검색어 입력 팝업 노출
     */
    if (!collectionQueryString && prefixString.indexOf("ISSN") <= -1) {
        showAlertDialog("검색어를 입력해주세요.");
        return;
    }

    const urlSearchParams = new URLSearchParams({
        collectionQuery: collectionQueryString,
        filter: filterString,
        prefix: prefixString
    });

    location.href = `/search/topSearch?${urlSearchParams.toString()}`;
}

/**
 * 오늘 하루 논문 추천 안보기
 */
function setHideRecommendedNodesToday() {
    setCookie("hideRecommendedNodes", "true");
    hideRecommendedNodesToday();
}

/**
 * 장바구니에 논문 담기
 * @param nodeId
 * @return {Promise<void>}
 */
async function addNodeToCart(nodeId) {
    const addNodeToCartResponse = await fetchAPI("/mypage/cartAdd", "POST", {data: `${nodeId}|147003`});

    if (addNodeToCartResponse.code === "redirected") {
        showLoginLayer();
        return;
    }

    const {errCd, result, msg} = addNodeToCartResponse;

    hidePurchaseLayer();

    if (result === 7777) {
        showAlertDialog(msg);
        return;
    }

    showCartLayer();
}

/**
 * 로그인 레이어에 저장된 아이디 히스토리 보여주기
 */
function displaySavedIdHistory() {
    const savedId = getCookie("idSave");
    const idPrefix = "b2c";

    if (!isEmptyStr(savedId)) {
        $query(`#${idPrefix}_loginId`).value = savedId;
        $query(`#saveIdCheckBox`).checked = true;
    }

    loginInputPlaceHolderUiEffect(savedId, idPrefix);
    bindLoginLayerEffect(idPrefix);
}

/**
 * SNS 로그인 레이어 히스토리 보여주기
 */
function displaySocialLoginHistory() {
    const socialLoginType = getCookie("l-s");

    if (socialLoginType) {
        const $socialLoginButton = $query(`#layer_${socialLoginType}SocialLogin`);

        if ($socialLoginButton) {
            $socialLoginButton.classList.add("displayShow")
        }

        const $alertSocialLoginHistory = $query("#layer_alertSocialLoginHistory");

        if ($alertSocialLoginHistory) {
            $alertSocialLoginHistory.style.display = "block";
        }
    }
}

/**
 * 로그인 레이어 입력값 placeholder 넣기
 * @param value
 * @param prefix
 */
function loginInputPlaceHolderUiEffect(value, prefix) {
    const inputId = $query(`#${prefix}_loginId`).value;
    const inputPassword = $query(`#${prefix}_loginPassword`).value;

    const loginId = `${prefix}_loginId`;
    const loginPassword = `${prefix}_loginPassword`;
    const cssPrefix = prefix === "b2c" ? "dpLogin" : "certWrap";
    const hasTextClassName = `${cssPrefix}__input__hasText`;

    if (inputId) {
        $query(`#${loginId}`).classList.add(hasTextClassName);
        $query(`#${loginId}DeleteButton`).classList.add("on");
    }

    if (!inputId) {
        $query(`#${loginId}`).classList.remove(hasTextClassName);
        $query(`#${loginId}DeleteButton`).classList.remove("on");
    }

    if (inputPassword) {
        $query(`#${loginPassword}`).classList.add(hasTextClassName);
        $query(`#${loginPassword}DeleteButton`).classList.add("on");
    }

    if (!inputPassword) {
        $query(`#${loginPassword}`).classList.remove(hasTextClassName);
        $query(`#${loginPassword}DeleteButton`).classList.remove("on");
    }
}

/**
 * 로그인 레이어 패스워드 보여주기 토글
 * @param value
 * @param toggleShowPasswordId
 */
function displayToggleShowPassword(value, toggleShowPasswordId) {
    if (!isEmptyStr(value)) {
        $query(`#${toggleShowPasswordId}`).classList.add("show");
        return;
    }

    $query(`#${toggleShowPasswordId}`).classList.remove("show");
}

/**
 * 모바일 무료 논문 확인
 * @param node_id
 */
async function mobileFreeNodeFn(node_id) {
    //모바일 체크
    if (isMobileWeb()) {
        const mobileFreeNode__text = document.getElementsByClassName("mobileFreeNode__text")[0];
        const mobileFreeNode__subText = document.getElementsByClassName("mobileFreeNode__subText")[0];

        const mobileFreeNode = document.getElementsByClassName("mobileFreeNode")[0];

        mobileFreeNode.style.display = "block";

        //서브 텍스트 분기에 따른 문구&기능 설정
        const mobileFreeNode__subText_a = mobileFreeNode__subText.querySelector("a");
        const me = await getMeAPI();
        if (isEmptyStr(me.b2cId)) {// B2C 로그인이 안되어 있는경우
            mobileFreeNode__text.innerHTML = LAYER_MESSAGE.preViewLoginText;
            mobileFreeNode__subText_a.innerText = LAYER_MESSAGE.preViewLoginSubText;
            mobileFreeNode__subText.setAttribute("type", "login");
        } else {
            const free_node_count_response = await fetchAPI("/modal/free-node-count", "GET");

            //로그인 되있을 경우 오늘 모바일 무료 남은 횟수 체크
            if (free_node_count_response.max_MOBILE_FREE_NODE_COUNT > free_node_count_response.today_use_node_count) {
                mobileFreeNode__text.innerHTML = `${LAYER_MESSAGE.preViewNodeViewText}
                            (${free_node_count_response.max_MOBILE_FREE_NODE_COUNT - free_node_count_response.today_use_node_count} / ${free_node_count_response.max_MOBILE_FREE_NODE_COUNT})`
                mobileFreeNode__subText_a.innerText = LAYER_MESSAGE.preViewNodeViewSubText;
                mobileFreeNode__subText.setAttribute("type", "nodeView");
                mobileFreeNode__subText.setAttribute("node_id", node_id);
            } else { //오늘 무료 이용 횟수 초과
                mobileFreeNode__text.innerHTML = LAYER_MESSAGE.preViewB2BLoginText;
                mobileFreeNode__subText_a.innerText = LAYER_MESSAGE.preViewB2BLoginSubText;
                mobileFreeNode__subText.setAttribute("type", "b2bLogin");
            }
        }
    }
}

/**
 * 서브 텍스트 클릭 시 기능 설정 분기
 */
function mobileFreeNodeSubTextClick() {
    const mobileFreeNode__subText = document.getElementsByClassName("mobileFreeNode__subText")[0];

    const subTextAttr = mobileFreeNode__subText.getAttribute("type");
    const node_id = mobileFreeNode__subText.getAttribute("node_id");
    switch (subTextAttr) {
        case "login" :
            showLoginLayer();
            break;
        case "nodeView" :
            showConfirmDialog(LAYER_MESSAGE.preViewNodeViewSubTextClick, freeNodeUse, undefined, undefined, undefined, node_id);
            break;
        case "b2bLogin" :
            showOrganizationLayer("A");
            break;
    }

    //무료 논문 이용
    async function freeNodeUse(node_id) {
        if (isEmptyStr(node_id)) {
            showAlertDialog(LAYER_MESSAGE.preViewError);
            return;
        }

        switch (await fetchAPI("/modal/free-node-use", "POST", {node_id: node_id})) {
            case -1:
                showAlertDialog(LAYER_MESSAGE.preViewError);
                break;
            case 0:
                showAlertDialog(LAYER_MESSAGE.preViewNodeViewTodayNotView);
                break;
            case 1:
            case 2:
                hidePreviewLayer();
                readNode(node_id);
                break;
        }
    }
}

/**
 * 추천 논문을 렌더링한다.
 * @param recommendResponse
 */
function renderRecommendedNodes(recommendResponse) {
    const {
        bestNode: mostUsedInOrganizationNodes,
        relate: recommendedNodes,
        withDown: downloadedTogetherNodes
    } = recommendResponse;

    renderRecommendedNodeList("mostUsedInOrganizationNodes", mostUsedInOrganizationNodes);
    renderRecommendedNodeList("recommendedNodes", recommendedNodes);
    renderRecommendedNodeList("downloadedTogetherNodes", downloadedTogetherNodes);

    const $bookmarkButtons = $query(".dpRecommendThesis__item .dpRecommendThesis__bookmark");

    for (const $bookmarkButton of $bookmarkButtons) {
        const nodeId = $bookmarkButton.getAttribute("data-node-id");

        $bookmarkButton.onclick = (e) => {
            onClickBookmarkNode(
                nodeId,
                () => {
                    e.target.classList.add('on');

                    $query(`#bookToolN_${nodeId}`).style.display = 'none';
                    $query(`#bookTool2_${nodeId}`).style.display = 'block';

                    setTimeout(() => {
                        $query(`#bookTool2_${nodeId}`).style.display = 'none';
                    }, 1000);

                    renderMyLibCountByCondition();
                },
                () => {
                    e.target.classList.remove('on');

                    $query(`#bookTool3_${nodeId}`).style.display = 'block';

                    setTimeout(() => {
                        $query(`#bookTool3_${nodeId}`).style.display = 'none';
                    }, 1000);

                    renderMyLibCountByCondition();
                }
            );
        };

        $bookmarkButton.onmouseover = (e) => {
            if (!e.target.classList.contains('on')) {
                $query(`#bookToolN_${nodeId}`).style.display = 'block';
            }
        };

        $bookmarkButton.onmouseout = (e) => {
            $query(`#bookToolN_${nodeId}`).style.display = "none";
        }
    }

    const $downloadButtons = $query(".dpRecommendThesis__item .dpRecommendThesis__download");

    for (const $downloadButton of $downloadButtons) {
        const nodeId = $downloadButton.getAttribute("data-node-id");

        $downloadButton.onclick = async () => {
            await onClickDownloadNode(nodeId);
        }
    }
}

const setItViewMore = ($elem) => {
    $elem.innerHTML = `<span>${LAYER_MESSAGE.VIEW_MORE}</span>`;
    $elem.setAttribute('data-func', 'show');
    $elem.classList.remove('open');
}

const setItViewLess = ($elem) => {
    $elem.innerHTML = `<span>${LAYER_MESSAGE.VIEW_LESS}</span>`;
    $elem.setAttribute('data-func', 'hide');
    $elem.classList.add('open');
}

const setShowMoreButton = ($showMoreButton, id) => {
    setItViewMore($showMoreButton);

    $showMoreButton.onclick = (e) => {
        const $target = e.currentTarget;

        if ($target.getAttribute('data-func') === 'show') {
            for (const $child of $query(`#${id}Wrapper`).children) {
                $child.classList.remove('hide');
            }

            setItViewLess($target);
            return;
        }

        for (const $child of $query(`#${id}Wrapper`).children) {
            $child.classList.add('hide');
        }

        setItViewMore($target);
    }
}

/**
 * 추천 논문을 렌더링한다.
 * @param id
 * @param nodes
 */
function renderRecommendedNodeList(id, nodes) {
    const [html, eventQueue] = recommendedNodesHtml(id, nodes);

    const filteredEventQueue = eventQueue.filter((e) => {
        return !e.id.includes("popupNodeButton") && !e.id.includes("externalLinkButton")
    });

    $query(`#${id}Wrapper`).innerHTML = html;
    $query(`#${id}NoData`).style.display = !html ? "block" : "none";
    const $showMoreButton = $query(`#${id}ShowMore`);

    const initialCount = 2;

    if (nodes.length > initialCount) {
        setShowMoreButton($showMoreButton, id);
    } else {
        $showMoreButton.style.display = "none";
    }

    registerSearchResultEvents(filteredEventQueue);
}

/**
 * 구매하기 레이어의 원화 값을 설정한다.
 * @param nodeId
 * @return {Promise<void>}
 */
async function setPriceInPurchaseLayer(nodeId) {
    const listPrice_popupList = $query(".purchase_layer_price");
    const discountPrice_popupList = $query(".purchase_layer_discount_price");

    const {price, discountPrice} = await fetchAPI(`/modal/node-price?nodeId=${nodeId}`);

    for (const $listPrice_popup of listPrice_popupList) {
        $listPrice_popup.textContent = formatNumber(price) + LAYER_MESSAGE.won;
    }

    for (const $discountPrice_popup of discountPrice_popupList) {
        $discountPrice_popup.textContent = formatNumber(discountPrice) + LAYER_MESSAGE.won;
    }
}

/**
 * 기관인증에서 선택된 아이템을 초기화한다.
 */
function initSelectedItems() {
    const $selectedItems = $query(".selectedItem");

    for (const $selectedItem of $selectedItems) {
        $selectedItem.classList.remove("selectedItem");
    }
}

/**
 * 기관인증에서 B2C 아이디의 존재 유무에 따라 UI 를 다르게 세팅한다.
 * @param b2cId
 */
function setOrganizationLayerButton(b2cId) {
    if (isEmptyStr(b2cId)) {
        $query("#organizationLayerUseDBpia").style.display = "none";
        $query("#organizationLayerGoLogin").style.display = "flex";
        return;
    }

    $query("#organizationLayerUseDBpia").style.display = "flex";
    $query("#organizationLayerGoLogin").style.display = "none";
}

/**
 * 구매 레이어에서 해외 아이피인 경우 구독 버튼이 보이지 않게 한다.
 */
function initPurchaseLayer() {
    if (isForeignIp()) {
        $query("#purchaseLayerSubscribeButton").style.display = "none";
    }
}

/**
 * 미리보기 레이어에서 해외 아이피인 경우 구독 버튼이 보이지 않게 한다.
 */
function initPreviewLayer() {
    if (isForeignIp()) {
        $query("#previewLayer_b2cSubscription").style.display = "none";
    }
}

/**
 * 상세 검색의 prefix 를 얻는다.
 * @param searchIncludeNoService
 * @param searchUseTypes
 * @param searchISSN
 * @returns {string}
 */
function getDetailSearchPrefix(searchIncludeNoService, searchUseTypes, searchISSN) {
    let prefix = "";

    if (searchIncludeNoService === "true") {
        prefix += '<SVC_AVBL_YN:contains:Y>'
    }

    if (searchUseTypes.length > 0) {
        let adds = [];

        if (searchUseTypes.includes("pdfViewer")) {
            adds.push("Y");
        }

        if (searchUseTypes.includes("externalLink")) {
            adds.push("N");
        }

        prefix += `<OTXT_OFFR_YN:contains:${adds.join("|")}>`
    }

    /**
     *  prefix 항목중 ISSN만 검색결과 페이지에서 검색내용 나와야 해서 ISSN을 젤 마지막에 넣어주기.
     *  getIssnPrefix() 에서 잘라서 사용중
     */
    if(searchISSN && ' ' !== searchISSN){
        prefix += `<ISSN:contains:${searchISSN}> | <E_ISSN:contains:${searchISSN}>`
    }

    return prefix;
}

/**
 * 상세 검색의 collectionQuery 를 얻는다.
 * @param field
 * @param query
 * @return {string}
 */
function getCollectionQuery(field, query) {
    if (field === "all") {
        return `<*:contains:${query}>`
    }

    if (field === "node") {
        return `<TITLE:contains:${query}> | <NODE_NM_2:contains:${query}>`;
    }

    if (field === "journal") {
        return `<PLCT_NM:contains:${query}> | <SRCH_PLCT_NM:contains:${query}> | <PLCT_NM_ENG:contains:${query}>`;
    }

    if (field === "publisher") {
        return `<IPRD_NM:contains:${query}> | <SRCH_IPRD_NM:contains:${query}> | <IPRD_NM_ENG:contains:${query}>`
    }

    if (field === "author") {
        return `<AUTR_NM_2:contains:${query}> | <SRCH_AUTR_NM:contains:${query}> | <SRCH_AUTR_NM_2:contains:${query}> | <AUTR_NM_3:contains:${query}>`
    }

    throw new Error("There is no such field.");
}

/**
 * 검색 로직 게이트를 문자열로 얻는다.
 * @param logicGate
 * @return {string}
 */
function getSearchLogicGateString(logicGate) {
    if (logicGate === "and") {
        return " ";
    }

    if (logicGate === "or") {
        return " | ";
    }

    if (logicGate === "andNot") {
        return " ! ";
    }

    throw new Error("There is no such logic gate.");
}

function initErrorReportLayer_title(nodeDetailResponse) {
    const mainTitleText = isLocaleKorean()
        ? nodeDetailResponse.articleTitleKr : nodeDetailResponse.articleTitleEn;
    const subTitleText = isLocaleKorean()
        ? nodeDetailResponse.articleTitleSub : nodeDetailResponse.articleTitleSubEn;
    const equalTitleText = nodeDetailResponse.articleTitleEqual;

    $query("#nodeErrorReportLayer_mainTitle").textContent = mainTitleText || "-";
    $query("#nodeErrorReportLayer_subTitle").textContent = subTitleText || "-";

    if (subTitleText) {
        $query("#nodeErrorReportLayer_subTitle_input").removeAttribute("disabled");
    } else {
        $query("#nodeErrorReportLayer_subTitle_input").setAttribute("disabled", "true");
    }

    $query("#nodeErrorReportLayer_equalTitle").textContent = equalTitleText || "-";

    if (equalTitleText) {
        $query("#nodeErrorReportLayer_equalTitle_input").removeAttribute("disabled");
    } else {
        $query("#nodeErrorReportLayer_equalTitle_input").setAttribute("disabled", "true");
    }
}

function errorReportLayerAuthorElementHtml(authorId, authorName, istnName) {
    return `
    <div class="dpReport__row">
        <strong class="dpReport__th">수정 전</strong>
        <div class="dpReport__td half">
            <p class="dpReport__t1">${authorName || "-"}</p>
        </div>
        <div class="dpReport__td half">
            <p class="dpReport__t1">${istnName || "-"}</p>
        </div>
    </div>
    <div class="dpReport__row">
        <strong class="dpReport__th">수정 후</strong>
        <input type="hidden" name="autrId" class="dpReport__input" placeholder="수정하실 내용을 입력해 주세요." value="${authorId}"/>
        <div class="dpReport__td half">
            <input type="hidden" name="autrNmOrg" class="dpReport__input" value="${authorName}"/>
            <input type="text" name="autrNm" class="dpReport__input" placeholder="수정하실 내용을 입력해 주세요." value="${authorName}"/>
        </div>
        <div class="dpReport__td half">
            <input type="hidden" name="autrIstnOrg" class="dpReport__input" value="${istnName}"/>
            <input type="text" name="autrIstn" class="dpReport__input" placeholder="수정하실 내용을 입력해 주세요." value="${istnName}"/>
        </div>
    </div>
    `;
}

function initErrorReportLayer_author(nodeDetailResponse) {
    const authorIdIstnNameMap = nodeDetailResponse.authorIstnName
        .split("|")
        .reduce((p, c) => {
            const [authorId, istnName] = c.split("^");

            return {
                ...p,
                [authorId]: istnName
            }
        }, {});

    const authorNameIds = nodeDetailResponse.authorNmIdKR.split("|");

    let resultHtml = `<input type="hidden" name="nodeId" class="nodeErrorReportLayer_nodeId_input" value="${nodeDetailResponse.articleId}"/>`;

    for (const authorNameId of authorNameIds) {
        const [name, tid, authorId] = authorNameId.split("^");
        const istnName = authorIdIstnNameMap[authorId];
        resultHtml += errorReportLayerAuthorElementHtml(authorId, name, istnName);
    }

    $query("#nodeErrorReportLayer_type_author").innerHTML = resultHtml;
}

function initErrorReportLayer_toc(nodeDetailResponse) {
    $query("#nodeErrorReportLayer_toc").innerHTML = nodeDetailResponse.articleContents;
    $query("#nodeErrorReportLayer_toc_input_hidden").value = nodeDetailResponse.articleContents;
    $query("#nodeErrorReportLayer_toc_input").value = nodeDetailResponse.articleContents
        .replaceAll(/<BR>|<br>/g, "\n");
}

function initErrorReportLayer_page(nodeDetailResponse) {
    const articlePage = nodeDetailResponse.articlePage.split("-");
    $query("#nodeErrorReportLayer_firstPage").textContent = articlePage[0];
    $query("#nodeErrorReportLayer_lastPage").textContent = articlePage.length > 1 ? articlePage[1] : "-";
    $query("#nodeErrorReportLayer_firstPage_input").value = articlePage[0];
    $query("#nodeErrorReportLayer_lastPage_input").value = articlePage.length > 1 ? articlePage[1] : "-";
}

function initErrorReportLayer_common(nodeId) {
    const nodeIdInputs = $query(".nodeErrorReportLayer_nodeId_input");

    for (const nodeIdInput of nodeIdInputs) {
        nodeIdInput.value = nodeId;
    }
}

/**
 *
 * @param nodeId
 * @return {Promise<void>}
 */
async function setNodeErrorReportLayerInitialData(nodeId) {
    /**
     * @type {NodeDetailResponse} 논문 상세 응답
     */
    const nodeDetailResponse = await getFullNodeDetailAPI(nodeId);

    initErrorReportLayer_common(nodeId);
    // 제목 영역 초기화
    initErrorReportLayer_title(nodeDetailResponse);
    // 저자 영역 초기화
    initErrorReportLayer_author(nodeDetailResponse);
    // 목차 영역 초기화
    initErrorReportLayer_toc(nodeDetailResponse);
    // 페이지 영역 초기화
    initErrorReportLayer_page(nodeDetailResponse);
}

async function setReferenceNodeReportLayerInitialData(nodeId) {
    /**
     * @type {NodeDetailResponse} 논문 상세 응답
     */
    const nodeDetailResponse = await getFullNodeDetailAPI(nodeId);

    $query("#referenceNodeReportLayer_form").innerHTML = `
        <input type="hidden" name="node" id="referenceNodeReportLayer_nodeId_input">
        <div class="dpReferences__row">
            <h2 class="dpReferences__h2">${LAYER_MESSAGE.THESIS_NAME}</h2>
            <div class="dpReferences__items" id="referenceNodeReportLayer_title"></div>
        </div>
        <div class="dpReferences__row">
            <h2 class="dpReferences__h2">${LAYER_MESSAGE.ADD_REFERENCE}</h2>
            <div class="dpReferences__items" id="referenceNodeReportLayer_nodeWrapper">
                <div class="dpReferences__item">
                    <input type="text" name="node[]" class="dpReferences__input" placeholder="${LAYER_MESSAGE.PLEASE_ENTER_DBPIA_URL}">
                    <button type="button" class="dpReferences__addBtn" id="referenceNodeReportLayer_addButton"><span class="a11y">검색조건추가</span></button>
                </div>
            </div>
        </div>`

    $query("#referenceNodeReportLayer_title").textContent = isLocaleKorean()
        ? nodeDetailResponse.articleTitleKr : nodeDetailResponse.articleTitleEn || nodeDetailResponse.articleTitleKr;

    $query("#referenceNodeReportLayer_nodeId_input").value = nodeId;

    $query("#referenceNodeReportLayer_next").style.display = "block";
    $query("#referenceNodeReportLayer_submit").style.display = "none";
    $query("#referenceNodeReportLayer_info").style.display = "none";

    bindOnClickAddReferenceNodeButton();
}

function initUsageChartLayerRecentYearButtons() {
    const $recentYearsButtons = $query("#usageChartLayer_recentYearsWrapper").children;

    for (const $recentYearsButton of $recentYearsButtons) {
        $recentYearsButton.classList.remove("on");
    }
}

function subtractMonths(numOfMonths, date = new Date()) {
    const dateCopy = new Date(date.getTime());
    dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);

    return dateCopy;
}

function convertDateToYyyyMm(date) {
    return date
        .toISOString()
        .match(/\d{4}-\d{2}/)[0]
        .replace("-", "");
}

function renderUsageChartLayerChart(chartXDateForAnYear, chartXUsageForAnYear) {
    c3.generate({
        bindto: '#usageChartLayer_chart',
        size: {
            width: isMobileWeb() ? 325 : 455,
            height: 350
        },
        padding: {
            bottom: 30
        },
        legend: {
            hide: true
        },
        data: {
            x: 'x',
            xFormat: '%Y%m',
            columns: [
                chartXDateForAnYear,
                chartXUsageForAnYear
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m'
                }
            }
        }
    });
}

/**
 *
 * @param {NodeUsageGraphData[]} graphData 논문 이용수 그래프 데이터
 */
function setUsageChartLayerChart(graphData) {
    initUsageChartLayerRecentYearButtons();
    $query("#usageChartLayer_recent3Year").classList.add("on");

    const threeYearDateString = convertDateToYyyyMm(subtractMonths(36, new Date()));
    const anYearDateString = convertDateToYyyyMm(subtractMonths(12, new Date()));
    const halfYearDateString = convertDateToYyyyMm(subtractMonths(6, new Date()));

    const graphDataForHalfYear = graphData.filter((e) => +e.yyyymm >= +halfYearDateString);
    const graphDataForAnYear = graphData.filter((e) => +e.yyyymm >= +anYearDateString);
    const graphDataForThreeYear = graphData.filter((e) => +e.yyyymm >= +threeYearDateString);

    const chartXDateForThreeYear = ["x", ...graphDataForThreeYear.map((e) => e.yyyymm)];
    const chartXUsageForThreeYear = ["이용수", ...graphDataForThreeYear.map((e) => e.used_cnt)];

    const chartXDateForAnYear = ["x", ...graphDataForAnYear.map((e) => e.yyyymm)];
    const chartXUsageForAnYear = ["이용수", ...graphDataForAnYear.map((e) => e.used_cnt)];

    const chartXDateForHalfYear = ["x", ...graphDataForHalfYear.map((e) => e.yyyymm)];
    const chartXUsageForHalfYear = ["이용수", ...graphDataForHalfYear.map((e) => e.used_cnt)];

    renderUsageChartLayerChart(chartXDateForThreeYear, chartXUsageForThreeYear);

    $query("#usageChartLayer_recent3Year").onclick = (e) => {
        e.preventDefault();
        initUsageChartLayerRecentYearButtons();
        e.target.classList.add("on");
        renderUsageChartLayerChart(chartXDateForThreeYear, chartXUsageForThreeYear);
    }

    $query("#usageChartLayer_recentAnYear").onclick = (e) => {
        e.preventDefault();
        initUsageChartLayerRecentYearButtons();
        e.target.classList.add("on");
        renderUsageChartLayerChart(chartXDateForAnYear, chartXUsageForAnYear);
    }

    $query("#usageChartLayer_recentHalfYear").onclick = (e) => {
        e.preventDefault();
        initUsageChartLayerRecentYearButtons();
        e.target.classList.add("on");
        renderUsageChartLayerChart(chartXDateForHalfYear, chartXUsageForHalfYear);
    }
}

/**
 * 논문 이용 수 테이블을 그린다.
 * @param {NodeUsageTableData[]} tableData
 */
function setUsageChartLayerTable(tableData) {
    $query("#usageChartLayer_tbody").innerHTML = tableData.reverse().map((e) => {
        return `
            <div class="dpUserChart__row">
                <p class="dpUserChart__td">${e.used_yy}</p>
                <p class="dpUserChart__td">${e.used_mm}</p>
                <p class="dpUserChart__td">${e.used_cnt}</p>
            </div>
        `
    }).join("");
}

async function setUsageChartLayerInitialData(nodeId) {
    /**
     * @type {NodeDetailResponse} 논문 상세 응답
     */
    const nodeDetailResponse = await getFullNodeDetailAPI(nodeId);
    $query("#usageChartLayer_title").textContent = isLocaleKorean()
        ? nodeDetailResponse.articleTitleKr : nodeDetailResponse.articleTitleEn;

    /**
     * @type NodeUsageData
     */
    const nodeUsageData = await fetchAPI("/journal/getUseData", "POST", {
        nodeId,
        eDate: new Date()
            .toISOString()
            .replaceAll(/T.*/g, "")
            .replaceAll("-", ""),
        calDate: -36
    });

    setUsageChartLayerChart(nodeUsageData.graph);
    setUsageChartLayerTable(nodeUsageData.table);
}

/**
 * 기관인증에서 소속기관 없음 체크 유무에 따라 UI 를 다르게 세팅한다.
 * @param isChecked
 */
function setOrganizationLayerButtonWrapper(isChecked) {
    if (isChecked) {
        $query("#organizationLayerButtonWrapper").style.display = "block";
        $query("#noOrganizationMessage").style.display = "block";
        return;
    }

    $query("#organizationLayerButtonWrapper").style.display = "none";
    $query("#noOrganizationMessage").style.display = "none";
}

/**
 * 해당 기관이 구독 중인지 검증하고
 * 그 결과에 따라서 해당하는 타입의 기관인증 레이어를 표출해준다.
 * @param organizationId
 * @param organizationName
 * @return {Promise<void>}
 */
async function processIsSubscribing(organizationId, organizationName) {
    const isSubscribingResponse = await isSubscribingAPI(organizationId);

    const {service_yn, auth, b2b_bannerYN, library_addr, b2b_tel: organizationTel} = isSubscribingResponse;
    const isSubscribing = service_yn && service_yn === "Y";
    const supportBannerAuthentication = b2b_bannerYN === "Y";

    if (isSubscribing) {
        showOrganizationLayer("C", {
            organizationName,
            organizationId,
            organizationTel,
            supportBannerAuthentication,
            libraryUrl: library_addr
        });

        return;
    }

    // 구독하지 않은 기관인 경우에는 B 타입의 레이어를 표기한다.
    showOrganizationLayer("B", {
        organizationName,
        organizationId
    });
}

/**
 * 모바일 앱 내서재에서 호출이 온 것인지 여부를 반환한다.
 * @param {string} from
 * @return {false|*|boolean}
 */
function isFromMobileMyLibrary(from) {
    return from === "mylib" && ((typeof isMobileApp !== 'undefined' && isMobileApp()) || window.screen.width < 959);
}

/**
 * 추천 논문 레이어의 버튼에 통계 코드를 부여한다.
 */
function setStatisticsCodeToRecommendNodes() {
    setOnClickFnStatisticsCode('.dpRecommendThesis__download', 'Z412');
    setOnClickFnStatisticsCode('.dpRecommendThesis__bookmark', 'Z413');
}

/**
 * ------------------------- 레이어 보여주기 ------------------------------
 */

function showOptionButtons(buttonWrapperId) {
    const selector = `#${buttonWrapperId}`
    if ($query(selector)) {
        $query(selector).style.display = "flex";
    }
}

function hideOptionButtons(buttonWrapperId) {
    const selector = `#${buttonWrapperId}`

    if ($query(selector)) {
        $query(selector).style.display = "none";
    }
}

function initAlertDontShowAgainCheckBox(checkBoxId) {
    const selector = `#${checkBoxId}`

    if ($query(selector)) {
        $query(selector).checked = false;
    }
}

function getAlertDontShowAgainChecked(id) {
    const selector = `#${id}`

    if (!$query(selector)) {
        console.warn(`${selector} 는 존재하지 않습니다.`);
        return false;
    }

    return $query(selector).checked;
}

const setDialogButtonColor = (selector, buttonColorParam) => {
    const defaultButtonColor = '#3c63e0';
    let buttonColorResult = buttonColorParam || defaultButtonColor;

    if (buttonColorParam === 'red') {
        buttonColorResult = '#ef4348';
    }

    addStyle(selector, 'backgroundColor', buttonColorResult);
}

const setDialogButtonFontSize = (selector, buttonFontSizeParam) => {
    const defaultFontSize = '16px';
    let buttonFontSizeResult = buttonFontSizeParam || defaultFontSize;

    if(!buttonFontSizeResult.toString().endsWith("px")) {
        buttonFontSizeResult = `${buttonFontSizeResult}px`;
    }

    addStyle(selector, 'fontSize', buttonFontSizeResult);
}

/**
 * 알람 레이어 보여주기
 * @param {string} messageHtml
 * @param {Function?} confirmCallback
 * @param {string?} confirmText
 * @param {object?} param
 * @param {TimeoutOption?} timeoutOption
 * @param {AlertLayerOption?} options
 */
function showAlertDialog(messageHtml, confirmCallback, confirmText = LAYER_MESSAGE['ok'], param, timeoutOption, options) {
    hideOptionButtons("alert_optionButtonWrap");
    initAlertDontShowAgainCheckBox("alert_dontShowAgain");
    initShowDialog("alert", {});

    let isConfirmed = false;

    const id = "alertDialog";
    activateDimmed(id);

    const $alertDialog = getById(id);
    $alertDialog.style.display = "block";

    if (options && options.dontShowAgain) {
        showOptionButtons("alert_optionButtonWrap");
    }

    const $alertDialogHtmlArea = getById('alertDialogHtmlArea');
    $alertDialogHtmlArea.innerHTML = messageHtml;

    const $alertDialogConfirm = getById("alertDialogConfirm");
    $alertDialogConfirm.focus();
    $alertDialogConfirm.textContent = confirmText;
    $alertDialogConfirm.onclick = () => {
        isConfirmed = true;

        if (confirmCallback) {
            if (options && options.dontShowAgain) {
                const dontShowAgain = getAlertDontShowAgainChecked("alert_dontShowAgain");
                confirmCallback({dontShowAgain});
            } else if (param) {
                confirmCallback(param);
            } else {
                confirmCallback();
            }
        }

        hideAlertDialog();
    }

    if (timeoutOption) {
        setTimeout(
            () => {
                if (isConfirmed) {
                    return;
                }

                hideAlertDialog();
                timeoutOption.timeoutCallback();
            },
            timeoutOption.timeoutMs
        );
    }
}

const setInformationMark = (selector, showInformationMark) => {
    if(!showInformationMark) {
        addClass(selector, "noBeforeAfter");
        return
    }

    removeClass(selector, "noBeforeAfter");
}

const setSectionBorder = (selector, showSectionBorder) => {
    if(!showSectionBorder) {
        addClass(selector, "noSectionBorder");
        return;
    }

    removeClass(selector, "noSectionBorder");
}

const setXPadding = (selector, showSidePadding) => {
    if(showSidePadding) {
        addClass(selector, "px-15");
        return;
    }

    removeClass(selector, "px-15");
}

const setBottomBanner = (selector, showBottomBanner) => {
    if(!validateSelector(selector)) {
        return;
    }

    if(showBottomBanner) {
        addStyle(selector, "display", "flex");
        const $elem = $query(selector);

        $elem.innerHTML = `
        <a href="#" class="phraseBanner__link__read personalApply" id="goToB2cPayBanner">
            <span class="phraseBannerRead__desc"><b>졸업생</b>이라면,</span>
            <span class="phraseBannerRead__desc"><b>정기 구독 서비스</b>를 이용해보세요</span>
            <span class="phraseBanner__link__btn">바로가기</span>
        </a>`;

        addEventCallback("#goToB2cPayBanner", "onclick", async () => {
            await fn_statistics("T705", layer_getB2bId(), layer_getB2cId());
            window.location.href = "/b2c-subscription/pay-info";
        });

        return;
    }

    addStyle(selector, "display", "none");
};

const setBottomDontShowAgain = (type, showBottomDontShowAgain) => {
    if(showBottomDontShowAgain && typeof(showBottomDontShowAgain) === 'function') {
        addStyle(`#${type}_bottomDontShowAgainWrap`, "display", "flex");
        $query(`#${type}_bottomDontShowAgainButton`).onclick = () => {
            showBottomDontShowAgain();
            hideDialog(type);
        };

        return;
    }

    addStyle(`#${type}_bottomDontShowAgainWrap`, "display", "none");
}

const setTopCloseButton = (type, showTopCloseButton) => {
    const selector = `#${type}_topButtonWrap`;

    if(!validateSelector(selector)) {
        return;
    }

    if(showTopCloseButton) {
        addStyle(selector, "display", "flex");
        return;
    }

    addStyle(selector, "display", "none");
};
const initShowDialog = (type, {
    buttonColor
    , buttonFontSize
    , showInformationMark = true
    , showSectionBorder = true
    , showXPadding = false
    , showBottomBanner = false
    , showBottomDontShowAgain = undefined
    , showTopCloseButton = false
}) => {
    const id = `${type}Dialog`;

    setDialogButtonColor(`#${type}DialogConfirm`, buttonColor);
    setDialogButtonFontSize(`#${type}DialogConfirm`, buttonFontSize);
    setInformationMark(`#${id}`, showInformationMark);
    setSectionBorder(`#${id}`, showSectionBorder);
    setXPadding(`#${id}`, showXPadding);
    setBottomBanner(`#${type}_bottomBannerWrap`, showBottomBanner);
    setBottomDontShowAgain(type, showBottomDontShowAgain);
    setTopCloseButton(type, showTopCloseButton);
};

/**
 * 다이얼로그 보여주기
 * @example
 * showDialog({
 *  type: "alert"
 *  , messageHtml: "alertHtml"
 *  , confirmCallback: () => {}
 *  , confirmText: "확인"
 *  , confirmCallbackParam: []
 *  , buttonColor: "red"
 *  , buttonFontSize: 14
 *  , showInformationMark: false
 *  , showSectionBorder: false
 *  , showXPadding: true
 *  });
 */
const showDialog =
    ({
        type = "alert"
        , messageHtml
        , confirmCallback = undefined
        , confirmText = LAYER_MESSAGE['ok']
        , confirmCallbackParam = undefined
        , timeoutOption = undefined
        , dontShowAgain = undefined
        , buttonColor = undefined
        , buttonFontSize = undefined
        , showInformationMark = undefined
        , showSectionBorder = undefined
        , showXPadding = undefined
        , showBottomBanner = undefined
        , showBottomDontShowAgain = undefined
        , showTopCloseButton = undefined
    }) => {
    hideOptionButtons(`${type}_optionButtonWrap`);
    initAlertDontShowAgainCheckBox(`${type}_dontShowAgain`);
    initShowDialog(type,
        {
        buttonColor
        , buttonFontSize
        , showInformationMark
        , showSectionBorder
        , showXPadding
        , showBottomBanner
        , showBottomDontShowAgain
        , showTopCloseButton });

    let isConfirmed = false;

    const id = `${type}Dialog`;
    activateDimmed(id);

    const $dialog = getById(id);
    $dialog.style.display = "block";

    if (dontShowAgain) {
        showOptionButtons(`${type}_optionButtonWrap`);
    }

    const $dialogHtmlArea = getById(`${type}DialogHtmlArea`);
    $dialogHtmlArea.innerHTML = messageHtml;

    const $dialogConfirm = getById(`${type}DialogConfirm`);
    $dialogConfirm.focus();
    $dialogConfirm.textContent = confirmText;
    $dialogConfirm.onclick = () => {
        isConfirmed = true;

        if (confirmCallback) {
            if (dontShowAgain) {
                const dontShowAgainChecked = getAlertDontShowAgainChecked(`${type}_dontShowAgain`);
                confirmCallback({dontShowAgainChecked});
            } else if (confirmCallbackParam) {
                confirmCallback(confirmCallbackParam);
            } else {
                confirmCallback();
            }
        }

        hideDialog(type);
    }

    if (timeoutOption) {
        setTimeout(
            () => {
                if (isConfirmed) {
                    return;
                }

                hideAlertDialog();
                timeoutOption.timeoutCallback();
            },
            timeoutOption.timeoutMs
        );
    }
}

/**
 * 장바구니 레이어 보여주기
 */
function showCartLayer() {
    const id = "cartLayer";
    $query(`#${id}`).style.display = "block";
    $query(`#${id}`).style.zIndex = "999";
    activateDimmed(id);
}

/**
 * 확인/취소 레이어 보여주기
 * @param {string} messageHtml
 * @param {function?} confirmCallback
 * @param {function?} cancelCallback
 * @param {string?} confirmText
 * @param {string?} cancelText
 * @param {object?} confirmParam
 * @param {object?} cancelParam
 * @param {ConfirmLayerOption?} options
 */
function showConfirmDialog(messageHtml, confirmCallback, cancelCallback, confirmText = LAYER_MESSAGE['ok'], cancelText = LAYER_MESSAGE['cancel'], confirmParam, cancelParam, options) {
    hideOptionButtons("confirm_optionButtonWrap");
    initAlertDontShowAgainCheckBox("confirm_dontShowAgain");

    const id = "confirmDialog";
    activateDimmed(id);
    const $confirmDialog = getById(id);
    $confirmDialog.style.display = "block";

    if (options && options.dontShowAgain) {
        showOptionButtons("confirm_optionButtonWrap");
    }

    const $confirmDialogHtmlArea = getById("confirmDialogHtmlArea");
    $confirmDialogHtmlArea.innerHTML = messageHtml;

    const $confirmDialogConfirm = getById("confirmDialogConfirm");
    $confirmDialogConfirm.focus();

    $confirmDialogConfirm.textContent = confirmText;
    $confirmDialogConfirm.onclick = () => {
        if (confirmCallback) {
            if (options && options.dontShowAgain) {
                const dontShowAgain = getAlertDontShowAgainChecked("confirm_dontShowAgain");
                confirmCallback({dontShowAgain});
            } else if (confirmParam) {
                confirmCallback(confirmParam);
            } else {
                confirmCallback();
            }
        }

        hideConfirmDialog();
    }

    const $confirmDialogCancel = getById("confirmDialogCancel");

    $confirmDialogCancel.textContent = cancelText;
    $confirmDialogCancel.onclick = () => {
        if (cancelCallback) {
            if (options && options.dontShowAgain) {
                const dontShowAgain = getAlertDontShowAgainChecked("confirm_dontShowAgain");
                cancelCallback({dontShowAgain});
            } else if (cancelParam) {
                cancelCallback(cancelParam);
            } else {
                cancelCallback();
            }
        }

        hideConfirmDialog();
    }
}

/**
 * 검색 필터 우측 팝업 레이어 보여주기
 */
function showDpFilter() {
    const $dpFilter = $query("#dpFilter");

    if ($dpFilter) {
        activateDimmed("dpFilter");
        $dpFilter.setAttribute("data-slide", "in");
    }
}

/**
 * 상세검색 레이어 보여주기
 */
function showDpDetailSearch() {
    const $dpSearch = $query("#detailSearchLayer");

    if ($dpSearch) {
        activateDimmed("detailSearchLayer");
        $dpSearch.style.display = "block";
    }
}

/**
 * 로그인 레이어 보여주기
 */
function showLoginLayer() {
    if (window.location.href.includes("/search/topSearch")) {
        saveSearchOption();
    }

    const id = "loginLayer";
    $query(`#${id}`).style.display = "block";
    // 외부링크 안내 메세지 숨기기 -> 필요에 따라 onClickExternalLinkNode 함수에서 활성화 시킨다.
    $query("#externalLinkGuideMessage").style.display = "none";

    // 이전에 소셜 로그인 이용 이력이 있는 경우
    displaySocialLoginHistory();
    // 이전에 아이디 저장 이용 이력이 있는 경우
    displaySavedIdHistory();

    activateDimmed(id);
}

/**
 * 공유하기 레이어 보여주기
 */
function showShareLayer() {
    const id = "shareLayer";
    $query(`#${id}`).style.display = "block";

    // set links
    const $linkTextArea = $query("#linkTextArea");
    $linkTextArea.value = window.location.href;
    $query("#linkShareInput").value = window.location.href;

    activateDimmed("shareLayer");
}

/**
 * 추천 논문 레이어 보여주기
 * @param nodeId
 * @return {Promise<void>}
 */
async function showRecommendedNodes(nodeId) {
    const id = "recommendedNodeWrapper";

    if ($query(`#${id}`).style.display === "block") {
        return;
    }

    if (!getCookie("hideRecommendedNodes")) {
        const recommendResponse = await recommendNodesAPI(nodeId);
        renderRecommendedNodes(recommendResponse);

        $query("#organizationName").textContent = "기관명";
        const id = "recommendedNodeWrapper";
        $query(`#${id}`).style.display = "block";
        $query(`#${id}`).style.display = "block";

        activateDimmed(id);
    }
}

function initOrganizationSearchInputs() {
    const $inputs = $query(".dpOrganization__input");

    for (const $input of $inputs) {
        $input.value = "";
    }
}

/**
 * 기관인증 레이어 보여주기
 * @param {"A"|"B"|"C"|"CE1"|"CE2"} type 기관 인증 화면의 타입은 임의로 정한 것이 아니라 서비스기획팀의 스토리보드에 기반한다.
 * A 타입: 초기 기관인증 레이어
 * B 타입: 구독기관이 아닌 기관을 선택한 경우 보여줄 레이어
 * C 타입: 구독기관인 기관을 선택한 경우 보여줄 레이어
 * CE1, CE2 (C타입 확장)타입: C타입에서 대표계정 인증이나 직원 계정인증을 클릭했을 때 보여주는 레이어
 * @param {Object?} options 레이어에 추가적으로 전달해야할 정보를 오브젝트 형태로 제공한다.
 */
function showOrganizationLayer(type = "A", options = {}) {
    hideOrganizationLayer();

    initOrganizationSearchInputs();
    initSelectedItems();

    const {organizationName, organizationId, organizationTel} = options;

    $query(`#authenticateOrganization${type}`).style.display = "block";
    activateDimmed(`authenticateOrganization${type}`);

    if (type === "CE2") {
        $query("#b2bAccountAuthenticationForm").onsubmit = async (e) => {
            e.preventDefault();
            await authB2bAccount(organizationId);
        }

        $query("#authenticateB2bAccount").onclick = async (e) => {
            e.preventDefault();
            await authB2bAccount(organizationId);
        }

        $query("#goBackCE2").onclick = () => {
            showOrganizationLayer("C", options);
        }

        return;
    }

    if (type === "CE1") {
        if (options && options.libraryUrl) {
            $query("#goToLibraryUrl").href = options.libraryUrl;
        }

        $query("#goBackCE1").onclick = () => {
            showOrganizationLayer("C", options);
        }

        return;
    }

    if (type === "C") {
        $query("#organizationInputC").value = organizationName;
        $query("#organizationNameC1").textContent = organizationName;
        $query("#organizationNameC2").textContent = organizationName;
        $query("#organizationTel").textContent = (organizationName && organizationTel) ? `${organizationName} 담당자: ${organizationTel}` : ``;

        $query("#organizationMemberAuthentication").onclick = () => {
            showOrganizationLayer("CE1", options);
        }

        $query("#organizationAccountAuthentication").onclick = () => {
            showOrganizationLayer("CE2", options);
            bindLoginLayerEffect("b2b");
            loginInputPlaceHolderUiEffect("", "b2b");
        }

        if (options.supportBannerAuthentication) {
            $query("#organizationMemberAuthentication").style.display = "flex";
        }else{
            $query("#organizationMemberAuthentication").style.display = "none";
        }

    }

    if (type === "B") {
        const organizationName = options && options.organizationName;

        $query("#organizationInputB").value = organizationName;
        $query("#organizationNameB1").textContent = organizationName;
    }

    $query(`#searchOrganizationForm${type}`).onsubmit = onSubmitSearchOrganizationForm(type);
    $query("#noOrganizationCheckBox").onchange = onChangeNoOrganizationCheckBox;
}

/**
 * 제휴문의 레이어 보여주기
 */
function showPartnershipLayer() {
    activateDimmed("partnershipLayer");
}

/**
 * B2C 구독권 결제 하기 페이지 이용약관 레이어
 */
function showB2cSubPaymentPolicyLayer() {
    activateDimmed("b2cSubPaymentPolicyLayer");
}

/**
 * 미리보기 레이어 보여주기
 */
async function showPreviewLayer(nodeId) {
    const id = "previewLayer";
    const previewResponse = await fetchAPI(`/pdf/preView?nodeId=${nodeId}`);
    const {msg, end, url, total} = previewResponse;

    if (msg !== "") {
        showAlertDialog(msg, () => {
            showPurchaseLayer(nodeId);
        });
        return;
    }

    let listItemsTemplate = "";

    for (let pageIndex = 1; pageIndex <= end; pageIndex++) {
        listItemsTemplate += previewItemHtml(url, pageIndex);
    }

    const {price, discountPrice} = await fetchAPI(`/modal/node-price?nodeId=${nodeId}`);
    const me = await getMeAPI();
    const query = getParams().query;

    const pdfDetail = await fetchAPI(`/api/pdf/detail/${nodeId}`);

    const {title_kr, title_en} = pdfDetail;
    const title = isLocaleKorean() ? title_kr : title_en;

    $query("#previewLayerTitle").innerHTML = (
        query && title.replaceAll(query, (highlight) => `<b>${highlight}</b>`)
    ) || title || "";
    $query("#previewLayerTotalPage").textContent = total;
    $query("#previewLayerImageList").innerHTML = listItemsTemplate;
    $query(`#${id}`).style.display = "block";
    $query("#priceInPurchaseBox").textContent = formatNumber(price);
    $query("#priceInSubscribeBox").textContent = formatNumber(price);
    $query("#previewPurchaseButton").onclick = () => {
        onClickPurchase(me, nodeId)
    };

    activateDimmed(id);
    await mobileFreeNodeFn(nodeId);
}

/**
 * 구매하기 레이어 보여주기
 */
async function showPurchaseLayer(nodeId) {
    await setPriceInPurchaseLayer(nodeId);

    $query("#addNodeToCartButton").onclick = () => {
        addNodeToCart(nodeId);
    }

    $query("#purchaseNodeButton").onclick = () => {
        if (!layer_isB2cLoggedIn()) {
            showLoginLayer();
            return;
        }

        window.open(`/pay/contentBuy?nodeId=${nodeId}`, "_blank");
    }


    const $purchaseLayerSubscribeButton = $query("#purchaseLayerSubscribeButton");

    if ($purchaseLayerSubscribeButton) {
        $purchaseLayerSubscribeButton.onclick = () => {
            window.location.href = "/b2c-subscription/pay-info";
        }
    }

    const id = "purchaseLayer";
    $query(`#${id}`).style.display = "block";
    activateDimmed(id);
}

/**
 * 논문 오류 제보하기 레이어 보여주기
 * @param {string} nodeId
 */
async function showNodeErrorReportLayer(nodeId) {
    await setNodeErrorReportLayerInitialData(nodeId);
    const id = "dpNodeErrorReportLayer";
    activateDimmed(id);
    const $nodeErrorReportLayer = $query(`#${id}`);
    $nodeErrorReportLayer.style.display = "block";
}

/**
 * 참고문헌 신청 레이어 보여주기
 * @param nodeId
 * @return {Promise<void>}
 */
async function showReferenceNodeReportLayer(nodeId) {
    if (!layer_isB2cLoggedIn()) {
        showLoginLayer();
        return;
    }

    await setReferenceNodeReportLayerInitialData(nodeId);
    const id = "referenceNodeReportLayer";
    activateDimmed(id);
    const $nodeErrorReportLayer = $query(`#${id}`);
    $nodeErrorReportLayer.style.display = "block";
}

/**
 * 이용지표 차트 레이어 보여주기
 * @param nodeId
 * @return {Promise<void>}
 */
async function showUsageChartLayer(nodeId) {

    await setUsageChartLayerInitialData(nodeId);
    const id = "usageChartLayer";
    activateDimmed(id);
    const $nodeErrorReportLayer = $query(`#${id}`);
    $nodeErrorReportLayer.style.display = "block";
}

/**
 * ----------------------------- 레이어 숨기기 -------------------------------
 */

/**
 * 알람 레이어 숨기기
 */
function hideAlertDialog() {
    let id = "alertDialog";
    deactivateDimmed(id);
    const $confirmDialog = getById(id);
    $confirmDialog.style.display = "none";
}

const hideDialog = (type) => {
    let id = `${type}Dialog`;
    deactivateDimmed(id);
    addStyle(`#${id}`, "display", "none");
}

/**
 * 상세페이지 - 저자 상세 레이어 숨기기
 * 2022-09-14 ShinYS
 * @returns
 */
function hideAuthorLayer() {
    const id = "authorLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 상세페이지 - 댓글 신고 레이어 숨기기
 * 2022-09-14 ShinYS
 * @returns
 */
function hideReplyClaimLayer() {
    const id = "replyClaimLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 상세검색 레이어 숨기기
 */
function hideDpDetailSearch() {
    const $dpSearch = $query("#detailSearchLayer");

    if ($dpSearch) {
        deactivateDimmed("detailSearchLayer");
        $dpSearch.style.display = "none";
    }
}

/**
 * 상세페이지 - 공유 버튼 레이어 숨기기
 * 2022-09-14 ShinYS
 * @returns
 */
function hideDetailShareLayer() {
    const id = "shareLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 상세페이지 - 판례 상세 레이어 숨기기
 * 2022-09-14 ShinYS
 * @returns
 */
function hidePrecedentLayer() {
    const id = "precedentLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 상세페이지 - 인용하기 레이어 숨기기
 * 2022-09-14 ShinYS
 * @returns
 */
function hideQuoteLayer() {
    const id = "dpQuoteLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 상세페이지 - 인용양식 변경하기 레이어를 숨기기
 * 2022-09-14 ShinYS
 * @returns
 */
function hideQuoteChangeLayer() {
    const id = "dpQuoteChangeLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 제휴 문의 레이어 숨기기
 */
function hidePartnershipLayer() {
    deactivateDimmed("partnershipLayer");
}

/**
 * B2C 구독권 결제 하기 페이지 이용약관 레이어 숨기기
 */
function hideB2cSubPaymentPolicyLayer() {
    deactivateDimmed("b2cSubPaymentPolicyLayer");
}

/**
 * 전화번호 등록 레이어 숨기기
 */
function hideB2cTelAlertRegisterLayer(checkAlert) {
    if (checkAlert) {
        showConfirmDialog(
            "전화번호를 입력하지 않으면,<br>" +
            "이메일로만 결제 안내 드립니다.<br>" +
            "전화번호 입력 후, 카카오로 수신하시겠습니까?",
            () => {

            }, () => {
                deactivateDimmed("b2cTelAlertRegister");
            });
    } else {
        deactivateDimmed("b2cTelAlertRegister");
    }
}

/**
 * 장바구니 레이어를 숨기기
 */
function hideCartLayer() {
    const id = "cartLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 확인/취소 레이어 숨기기
 */
function hideConfirmDialog() {
    const id = "confirmDialog";
    deactivateDimmed(id);

    const $confirmDialog = getById(id);
    $confirmDialog.style.display = "none";
}

/**
 * 모든 기관인증 레이어 숨기기
 */
function hideOrganizationLayer() {
    const layerTypes = ["A", "B", "C", "CE1", "CE2"];

    for (const type of layerTypes) {
        const $layer = $query(`#authenticateOrganization${type}`);
        const $searchListWrapper = $query(`#searchResultOrganizationList${type}`);

        if ($layer) {
            $layer.style.display = "none";
        }

        if ($searchListWrapper) {
            $searchListWrapper.style.display = "none";
        }

        deactivateDimmed(`authenticateOrganization${type}`)
    }
}

/**
 * 검색 페이지 우측 필터 레이어 숨기기
 */
function hideDpFilter() {
    const $dpFilter = $query("#dpFilter");

    if ($dpFilter) {
        deactivateDimmed("dpFilter");
        $dpFilter.setAttribute("data-slide", "out");
        $dpFilter.style.zIndex = "";
    }
}

/**
 * 로그인 레이어 숨기기
 */
function hideLoginLayer() {
    const id = "loginLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 공유하기 레이어 숨기기
 */
function hideShareLayer() {
    const id = "shareLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed("shareLayer");
}

/**
 * 미리보기 레이어 숨기기
 */
function hidePreviewLayer() {
    const id = "previewLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 구매하기 레이어 숨기기
 */
function hidePurchaseLayer() {
    const id = "purchaseLayer";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 논문 추천 레이어 숨기기
 */
function hideRecommendedNodes() {
    const id = "recommendedNodeWrapper";
    $query(`#${id}`).style.display = "none";
    deactivateDimmed(id);
}

/**
 * 논문 오류 제보하기 레이어 숨기기
 */
function hideNodeErrorReportLayer() {
    const id = "dpNodeErrorReportLayer";
    deactivateDimmed(id);
    const $nodeErrorReportLayer = $query(`#${id}`);
    $nodeErrorReportLayer.style.display = "none";
}

/**
 * 참고문헌 신청 레이어 숨기기
 */
function hideReferenceNodeReportLayer() {
    const id = "referenceNodeReportLayer";
    deactivateDimmed(id);
    const $nodeErrorReportLayer = $query(`#${id}`);
    $nodeErrorReportLayer.style.display = "none";
}

/**
 * 이용지표 차트 레이어 숨기기
 */
function hideUsageChartLayer() {
    const id = "usageChartLayer";
    deactivateDimmed(id);
    const $nodeErrorReportLayer = $query(`#${id}`);
    $nodeErrorReportLayer.style.display = "none";
}

/**
 * ------------------- DOM 로드 완료 후 초기화 ----------------------
 */

/**
 * 논문 오류 제보 레이어를 초기화한다.
 */
function initNodeErrorReportLayer() {
    bindOnClickCloseNodeErrorReportLayer();
    bindOnClickSubmitNodeErrorReportLayer();
    bindOnChangeNodeErrorReportLayerSelect();
}

/**
 * 상세검색 레이어를 초기화한다.
 */
function initDetailSearchLayer() {
    bindOnClickDetailSearchButton();
    bindOnClickDetailSearchCloseButton();
    bindOnClickDetailSearchResetButton();
    bindOnClickAddSearchCondition();
    bindOnSubmitDetailSearchForm();
}

/**
 * 참고문헌 레이어를 초기화한다.
 */
function initReferenceNodeReportLayer() {
    bindOnClickReferenceNodeReportCloseButton();
    bindOnClickNextReferenceNodeButton();
    bindOnClickSubmitReferenceNodeButton();
}

function initUsageChartLayer() {
    $query("#usageChartLayer_closeButton").onclick = (e) => {
        e.preventDefault();
        hideUsageChartLayer();
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    bindOnClickDimLayer();
    bindOnClickCloseShareLayer();
    bindOnClickSocialNetworkButtons("layer_");
    bindOnClickAutoLoginCheckBox();
    bindOnClickClosePartnershipLayer();
    bindOnClickCloseBcSubPaymentPolicyLayer();
    bindOnClickCloseB2cTelAlertRegisterLayer();

    bindOnKeyDownOrganizationLayer();

    initPurchaseLayer();
    initPreviewLayer();
    initDetailSearchLayer();
    initNodeErrorReportLayer();
    initReferenceNodeReportLayer();
    initUsageChartLayer();

    $query("#todayCheck").onchange = (e) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            setHideRecommendedNodesToday();
        }
    }
});

//숫자 말고는 입력 불가능
function checkInputNumber(elem) {
    elem.value = elem.value.replace(/[^0-9]/g, '');
}

//전화번호 등록하기 버튼 활성화 비활성화
function checkB2cTelRegisterBtn(elem, btnId) {
    $query(btnId).disabled = elem.value === "";
}

function setB2cMembTel(inputId, b2cTelRegisterSaleId) {
    const b2cTel = $query(inputId).value;
    const saleId = $query(b2cTelRegisterSaleId).value;
    const errMsg = "전화번호 등록에 실패 하였습니다.<br>다시 시도해 주세요.";
    fetchAPI("/member/set-b2c-memb-tel", "POST", {b2cTel: b2cTel}, {
        showLoading: false
    }).then((result) => {
        if (result === "0") {
            hideB2cTelAlertRegisterLayer();
            fetchAPI("/b2c-subscription/send-kakaoAlimTalk", "POST", {saleId: saleId}, {
                showLoading: false
            });
        } else {
            showAlertDialog(errMsg);
        }
    }).catch(() => {
        showAlertDialog(errMsg);
    });
}

const isLayerActive = (layerId) => {
    if(!validateSelector(`#${layerId}`)) {
        return false;
    }

    const $elem = $query(`#${layerId}`);

    return !!($elem
        && $elem instanceof HTMLElement
        && $elem.style.display !== "none");
}

function showLinkLoginLayer(me, callback){
    let args = Array.prototype.slice.call(arguments, 2);
    let alertHtml = "";
    //기관인증 X
    if (isEmptyStr(me.b2bId)){
        alertHtml += `${LAYER_MESSAGE.LINK_LOGIN_TEXT_003}`;
    }else{
        //기관인증 O
        alertHtml += `<b>`;
        if(isLocaleKorean()){
            alertHtml += `'${me.b2bName}'${LAYER_MESSAGE.LINK_LOGIN_TEXT_002}`;
        }else{
            alertHtml += `${LAYER_MESSAGE.LINK_LOGIN_TEXT_002} '${me.b2bName}'!`;
        }
        alertHtml += `</b><br>${LAYER_MESSAGE.LINK_LOGIN_TEXT_003}`;
    }
    showDialog({
        type: "alert"
        , messageHtml: alertHtml
        , confirmCallback: () => {
            fn_statistics("Z148", '', '');
            callback.apply(this, args);
        }
        , confirmText: LAYER_MESSAGE.LINK_LOGIN_TEXT_001
        , confirmCallbackParam: []
        , buttonColor: "red"
        , buttonFontSize: 14
        , showInformationMark: false
        , showSectionBorder: false
        , showXPadding: true
    });
}

/**
 * b2cLoginYN이 선언 안 되어 있으면 false return
 */
function getB2cLoginYN(){
    if (typeof b2cLoginYN === 'undefined') {
        return false;
    }else{
        return b2cLoginYN;
    }
}

/**
 * 논문 읽기 전 b2c 체크후 readNode 실행
 */
function beforeReadNode(nodeId){
    let currentB2cLoginYN = getB2cLoginYN();
    if(checkb2cLogin(currentB2cLoginYN)){
        readNode(nodeId);
    }
}

/**
 * 논문 다운로드 전 b2c 체크후 downloadNode 실행
 */
function beforeDownloadNode(nodeId, onlyAuthCheck = false) {
    let currentB2cLoginYN = getB2cLoginYN();
    if(checkb2cLogin(currentB2cLoginYN)){
        downloadNode(nodeId);
    }
}