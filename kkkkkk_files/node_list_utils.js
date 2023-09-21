/**
 * top 퍼센트 html 을 구한다.
 * @param rate
 * @param useCount
 * @return {string}
 */
const getTopPercentageHtml = (rate, useCount) => {
    if (!rate || !useCount) {
        return "";
    }

    const rateNum = Number(rate);
    const useCountNum = Number(useCount);

    if (rateNum
        && +rateNum !== -1
        && +rateNum !== 0.0
        && +rateNum <= 10
        && useCountNum >= 50
    ) {
        return `<span class="thesis__item top">TOP ${getNodeTopPercentage(rateNum)}</span>`
    }

    return "";
}

const isMyLibPage = () => {
    return window.location.href.includes("/mylib/");
};

/**
 * 외부링크 논문을 읽는다.
 * @param me
 * @param from
 * @param nodeId
 * @param url
 * @param titleKr
 * @param titleEn
 * @param iprdId
 * @param isDissertation
 * @return {Promise<"SHOW_LOGIN_LAYER" | "POPUP_MULTI_CP_LAYER" | undefined>}
 */
async function readExternalLinkNode(me, from, nodeId, url, titleKr, titleEn, iprdId, isDissertation) {
    if (!isLoggedIn(me)) {
        showLoginLayer();
        return "SHOW_LOGIN_LAYER";
    }

    if (isMobileApp() && isMyLibPage()) {
        const messageKey = "page.mylib.linkIsNotAvailableInApp";
        const message = await getMessages([messageKey]);
        showAlertDialog(message[messageKey]);
        return;
    }

    if (isMobileApp() && !isDissertation) {
        const messageKeys = ["page.thesis.detail.linkIsAvailableInPc", "page.search.thesis_basic_view.st.span_0032"];
        const messages = await getMessages(messageKeys);
        const dialogMessage = messages[messageKeys[0]];
        const buttonMessage = messages[messageKeys[1]];

        showConfirmDialog(
            dialogMessage,
            () => {
                //검색 결과 페이지
                if ($query(`#bookmarkButton_` + nodeId)) {
                    $query(`#bookmarkButton_` + nodeId).dispatchEvent(new Event("click"));
                }

                //논문 상세 페이지
                else {
                    $query(`#libraryBtn1`).dispatchEvent(new Event("click"));
                }

                renderMyLibCountByCondition();
            },
            () => {
            },
            buttonMessage);

        return "POPUP_MULTI_CP_LAYER";
    }

    // 모바일 앱에서 내서재를 이용해 호출하면, 바로 논문 상세 페이지로 이동함
    if (isFromMobileMyLibrary(from)) {
        goToUrl(`/journal/articleDetail?nodeId=${nodeId}`);
        return;
    }

    const externalNodeObj = {
        url,
        nodeId,
        titleKr,
        titleEn,
        iprdId
    };

    goToExternalLink(externalNodeObj)
        .then(() => {
            // Nothing to do...
        })
        .catch((e) => {
            console.error(e);
        });

    return "POPUP_MULTI_CP_LAYER"
}

/**
 * 학위 논문을 읽는다.
 * @param me
 * @param url
 * @return {string}
 */
function readDissertationLinkNode(me, url) {
    if (isEmptyStr(me.b2cId)) {
        showLoginLayer();
        return "SHOW_LOGIN_LAYER";
    }

    window.open(url, "_blank");
    return "GO_TO_DISSERTATION_LINK";
}

/**
 *
 * @param {NodeDetailResponse} nodeDetailResponse
 * @param {Me} me
 * @return {GetIsExceptionalResult}
 */
function getIsExceptionalObject(nodeDetailResponse, me) {
    const {
        FreeYN: freeYN,
        B2cSaleYN: b2cSaleYN,
        ServiceStopReason: serviceStopReasonCode,
        ServiceYN: serviceYN
    } = nodeDetailResponse;

    // 무료 논문인데 로그인을 하지 않은 경우
    const accessFreeNodeWithoutLogin = isEmptyStr(me.b2bId) && isEmptyStr(me.b2cId) && freeYN === "Y";
    // 기관은 볼 수 있지만, 개인이 구매할 수 없는 논문.
    const accessNeedOrganizationAuthNode = freeYN === "N" && b2cSaleYN === "N" && isEmptyStr(me.b2bId);

    return {
        accessFreeNodeWithoutLogin,
        accessNeedOrganizationAuthNode,
        serviceStopReason: getServiceStopMessage(serviceStopReasonCode),
        doesService: serviceYN === "Y"
    };
}

/**
 * 예외적인 조건을 가진 논문인지 검증하고, 오브젝트 내부의 boolean 프로퍼티 값을 반환한다.
 * @param nodeId
 * @param me
 * @return {Promise<GetIsExceptionalResult>}
 */
async function isExceptionalNode(nodeId, me) {
    const nodeDetailResponse = await nodeDetailAPI(nodeId);
    return getIsExceptionalObject(nodeDetailResponse, me);
}

/**
 * 예외적인 조건을 가진 논문인지 검증하고, 오브젝트 내부의 boolean 프로퍼티 값을 반환한다.
 * @param nodeId
 * @param me
 * @return {GetIsExceptionalResult}
 */
function syncIsExceptionalNode(nodeId, me) {
    const nodeDetailResponse = syncNodeDetailAPI(nodeId);
    return getIsExceptionalObject(nodeDetailResponse, me);
}

/**
 * 논문 읽기를 처리하는 함수
 * @param nodeId 논문의 ID
 * @return {"SHOW_LOGIN_LAYER" | "POPUP_PDF_VIEWER" | "SHOW_PREVIEW_LAYER" | ""} 어떤 레이어로 연동되는지에 대해 반환한다.
 */
function readNode(nodeId) {
    const me = syncGetMeAPI();

    const {
        accessFreeNodeWithoutLogin,
        accessNeedOrganizationAuthNode,
        serviceStopReason,
        doesService
    } = syncIsExceptionalNode(nodeId, me);

    if (!isEmptyStr(serviceStopReason)) {
        showAlertDialog(serviceStopReason);
        return "";
    }

    if (!doesService) {
        showAlertDialog("저작권자·발행기관의 요청으로 서비스 중지된 저널입니다.");
        return "";
    }

    if (accessFreeNodeWithoutLogin) {
        alertLoginForFreeNode();
        return "SHOW_LOGIN_LAYER";
    }

    if (accessNeedOrganizationAuthNode) {
        alertOrganizationAuthenticationForNode();
        return "SHOW_ORGANIZATION_LAYER";
    }

    const isBestResponse = syncIsBestNodeAPI(nodeId);

    // 베스트 논문인 경우에는 로그인만 하면 볼 수 있기 때문에 로그인 레이어를 띄워 로그인을 유도한다.
    const accessBestNodeWithoutLogin = !me.b2cId && isBestResponse && isBestResponse.isBest;
    // 기관인증된 경우에는 로그인 하지 않아도 볼 수 있다.
    const accessBestNodeWithLogin = (me.b2cId && isBestResponse && isBestResponse.isBest) || (me.b2bId && isBestResponse && isBestResponse.isBest);

    // 로그인한 상태에서 베스트 논문에 접근한 경우
    if (accessBestNodeWithLogin) {
        const openNodeWindow = () => window.open(`/pdf/pdfView.do?nodeId=${nodeId}`, `popPdf${nodeId}`);

        const hasB2bId = !!me.b2bId;
        const hasSubscription = !!me.b2cSubDay;

        // 기관인증이나 구독 정보가 있는 경우
        if (hasB2bId || hasSubscription) {
            openNodeWindow();
        }
        // 기관인증이나 구독 정보가 없는 경우 / b2c 아이디 정보만 있는 경우
        else {
            showAlertDialog(LAYER_MESSAGE.FREE_BEST_NODE_GO_DIRECTLY_PDF_VIEWER, () => {
                openNodeWindow();
            }, undefined, undefined, {
                timeoutCallback: openNodeWindow,
                timeoutMs: 3000
            });
        }

        return "POPUP_PDF_VIEWER";
    }

    if (accessBestNodeWithoutLogin) {
        alertLoginForBestNode();
        return "SHOW_LOGIN_LAYER";
    }

    const auth = syncReadNodeAPI(nodeId);

    // 논문 보기에 대한 권한이 있다면, PDF 뷰어 오픈 -> 권한: 기관인증 / B2C구독 / B2C 구매
    if (typeof (auth) !== 'string' && (auth.link !== "" || auth.currB2cSub === "true")) {
        window.open(`/pdf/pdfView.do?nodeId=${nodeId}`, `popPdf${nodeId}`);
        return "POPUP_PDF_VIEWER";
    }

    //모바일 무료 논문인데 PC로 접근한경우 -> 알럿
    if (auth.isMobileFreeNode === "Y") {
        showAlertDialog(auth.msg);
        return "";
    }

    // 논문보기 권한이 없을 때는 미리보기를 보여준다.
    showPreviewLayer(nodeId);
    return "SHOW_PREVIEW_LAYER";
}

/**
 * 연구지원사업 논문 업데이트
 */
function updateResearchCnt() {
    getMeAPI().then((updatedMe) => {
        if (updatedMe.researchYN && updatedMe.researchYN === 'Y') {
            document.querySelectorAll('strong[data-name="researchCnt"]').forEach(element => {
                element.innerHTML = `(${updatedMe.researchCnt})`;
            });
        }
    });
}

/**
 * 논문을 다운로드한다.
 * @param nodeId
 * @return {Promise<"SHOW_RECOMMENDED_NODES_LAYER" | "SHOW_PURCHASE_LAYER" | "SHOW_LOGIN_LAYER" | "SHOW_ORGANIZATION_LAYER">}
 */
async function downloadNode(nodeId, onlyAuthCheck = false) {
    let me = await getMeAPI();

    const {
        accessFreeNodeWithoutLogin,
        accessNeedOrganizationAuthNode,
        serviceStopReason,
        doesService
    } = await isExceptionalNode(nodeId, me);

    // 서비스가 중지된 논문인 경우
    if (!isEmptyStr(serviceStopReason)) {
        showAlertDialog(serviceStopReason);
        return "";
    }

    if (!doesService) {
        showAlertDialog("저작권자·발행기관의 요청으로 서비스 중지된 저널입니다.");
        return "";
    }

    // 무료 논문인데 로그인을 하지 않은 경우
    if (accessFreeNodeWithoutLogin) {
        alertLoginForFreeNode();
        return "SHOW_LOGIN_LAYER";
    }

    // 기관은 볼 수 있지만, 개인이 구매할 수 없는 논문.
    if (accessNeedOrganizationAuthNode) {
        alertOrganizationAuthenticationForNode();
        return "SHOW_ORGANIZATION_LAYER";
    }

    const downloadLinkObject = await downloadNodeAPI(nodeId);

    updateResearchCnt();

    const hasDownloadLink = downloadLinkObject
        && downloadLinkObject.link !== ""
        && downloadLinkObject.link !== undefined
        && typeof downloadLinkObject.link === "string";

    // 로그인하지 않고 기관인증되지 않은 경우, 구매하기 레이어 오픈
    // 로그인은 했으나 다운로드 권한이 없는 경우, 구매하기 레이어 오픈
    if ((typeof (downloadLinkObject) !== "undefined" && downloadLinkObject.code === "redirected")
        || !hasDownloadLink) {
        await showPurchaseLayer(nodeId);
        return "SHOW_PURCHASE_LAYER";
    }

    if (downloadLinkObject.cnt === "-1") {
        showAlertDialog("권한이 없습니다.");
        return;
    }

    // 다운로드 후 추천 논문 보여주기
    if (hasDownloadLink) {
        // PDF 뷰어에서는 추천 논문을 보여주지 않는다.
        if (!window.location.href.includes("pdfView.do")) {
            await showRecommendedNodes(nodeId);
        }

        setStatisticsCodeToRecommendNodes();

        if (onlyAuthCheck) {
            return downloadLinkObject.link;
        }

        // Safari 브라우저 호환성 처리
        setTimeout(() => {
            try {
                location.href = downloadLinkObject.link;
            } catch (e) {
                console.error(e);
            }
        }, 100);

        return "SHOW_RECOMMENDED_NODES_LAYER";
    }
}

/**
 * 검색결과에 들어가는 이벤트들을 정의한다.
 * @param {MyLibVONodeObject} bestNodeObject
 * @param events
 * @param {string} prefix
 */
function buildNodeListEventRegisterQueue(bestNodeObject, events, prefix = "") {
    const {node_ttle, url, node_id, iprd_id} = bestNodeObject;

    // 학위 논문인지 판단
    const isDissertation = node_id.startsWith("T");

    if (!isPdfFile(url)) {
        /**
         * @type {ReservedEvent} 등록이 예약된 이벤트
         */
        const externalLinkButtonEvent = {
            id: `${prefix}externalLinkButton_${node_id}`,
            eventProperty: 'click',
            functionRef: onClickExternalLinkNode,
            args: [url, node_id, node_ttle, node_ttle, iprd_id, undefined, `externalLinkButton_${node_id}`, false, isDissertation]
        };

        events.push(externalLinkButtonEvent);
    }

    if (isPdfFile(url)) {
        const popupNodeButtonEvent = {
            id: `${prefix}popupNodeButton_${node_id}`,
            eventProperty: 'click',
            functionRef: onClickReadNode,
            args: [node_id, `popupNodeButton_${node_id}`, false]
        };

        events.push(popupNodeButtonEvent);

        const downloadNodeButtonEvent = {
            id: `${prefix}downloadNodeButton_${node_id}`,
            eventProperty: 'click',
            functionRef: onClickDownloadNode,
            args: [node_id, `${prefix}downloadNodeButton_${node_id}`, false]
        };

        events.push(downloadNodeButtonEvent);
    }

    const bookmarkButtonEvent = {
        id: `${prefix}bookmarkButton_${node_id}`,
        eventProperty: 'click',
        functionRef: onClickBookmarkNode,
        args: [node_id
            , () => {
                renderBookmarkUIEffect(node_id, "ADD", prefix);
                renderMyLibCountByCondition();
            }
            , () => {
                renderBookmarkUIEffect(node_id, "REMOVE", prefix);
                renderMyLibCountByCondition();
            }]
    };

    // 학위 논문인 경우에는 내서재 담기를 비활성화한다.
    if (!isDissertation) {
        events.push(bookmarkButtonEvent);
    }
}

/**
 * 내서재 논문 추가/제거 시 UI 효과
 * @param {string} nodeId
 * @param {"ADD" | "REMOVE"} type
 * @param {string} prefix
 */
function renderBookmarkUIEffect(nodeId, type, prefix = "") {
    const $bookmarkButtons = $query(`.bookmarkButton_${nodeId}`);

    for (const $bookmarkButton of $bookmarkButtons) {
        if (type === "ADD") {
            $bookmarkButton.classList.add("add");
            $bookmarkButton.classList.add("addBtn");
        } else {
            $bookmarkButton.classList.remove("add");
            $bookmarkButton.classList.remove("addBtn");
        }
    }

    const $bookmarkAddMessage = $query(`#${prefix}bookmarkAddMessage_${nodeId}`);

    if (type === "ADD") {
        $bookmarkAddMessage.classList.remove("on");
        $bookmarkAddMessage.classList.add("on");
    } else {
        $bookmarkAddMessage.classList.remove("on");
    }

    const $bookmarkRemoveMessage = $query(`#${prefix}bookmarkRemoveMessage_${nodeId}`);

    if (type === "ADD") {
        $bookmarkRemoveMessage.classList.remove("on");
    } else {
        $bookmarkRemoveMessage.classList.remove("on");
        $bookmarkRemoveMessage.classList.add("on");
    }


    const $bookmarkTooltips = $query(`.bookmarkTooltip_${nodeId}`);

    for (const $bookmarkTooltip of $bookmarkTooltips) {
        if (type === "ADD") {
            $bookmarkTooltip.textContent = LAYER_MESSAGE.bookmarkAdded; //내서재담김
        } else {
            $bookmarkTooltip.textContent = LAYER_MESSAGE.bookmarkAdd; //내서재담기
        }
    }
}

function alertOrganizationAuthenticationForNode() {
    showAlertDialog(
        //"발행기관의 요청으로 개인이 구매하실 수 없습니다.",
        LAYER_MESSAGE.NOT_ALLOWED_TO_B2C_USERS,
        () => {
            // TODO: 기관인증 레이어 오픈 처리하기
            showOrganizationLayer("A");
        }
    );
}

function alertLoginForFreeNode() {
    showAlertDialog(
        //"저작권자의 요청에 따라 무료로 제공되는 논문입니다.<br>로그인 후 이용하실 수 있습니다.",
        LAYER_MESSAGE.FREE_COPY_NODE_AFTER_LOGIN,
        () => {
            showLoginLayer();
        }
    );
}

function alertLoginForBestNode() {
    showAlertDialog(
        // 무료로 열람 가능한 BEST 논문입니다. 로그인 후 이용하실 수 있습니다.
        LAYER_MESSAGE.FREE_BEST_NODE_AFTER_LOGIN,
        () => {
            showLoginLayer();
        });
}

/**
 * B2B 로그인을 진행한다.
 * @param organizationId
 * @return {Promise<void>}
 */
async function authB2bAccount(organizationId) {
    const formData = new FormData($query("#b2bAccountAuthenticationForm"));
    const b2bLoginResponse = await b2bLoginAPI(formData.get("b2bAccount"), formData.get("b2bPassword"), organizationId);
    const {b2bLoginType, loginMsg, loginSucYN, redirectPage} = b2bLoginResponse;

    if (loginSucYN === "Y") {
        if (!isEmptyStr(loginMsg)) {
            showAlertDialog(loginMsg, () => {
                if (loginSucYN === "Y") {
                    window.location.reload();
                }
            });

            return;
        }

        window.location.reload();
        return;
    }

    showAlertDialog("소속 기관과 아이디 또는 비밀번호를 확인해 주세요!")
}

/**
 * 베스트 논문의 HTML 을 반환한다.
 * @param {MyLibVONodeObject} bestNodeObject
 * @param {boolean} isB2cLoggedIn
 * @param {number} index
 * @param {Object} options 추가 옵션 ex) type: subject -> 주제분류 전용 렌더링
 * @return {string}
 */
function getBestNodeHtml(bestNodeObject, isB2cLoggedIn, index, options) {
    // 저자 이름 표기
    const authorNames = bestNodeObject.autr_nm.split("^");
    const authorTemplate = authorNames
        .filter((e, i) => i < 3)
        .map((authorElem) => {
            const [authorName, authorId] = authorElem.split(";");
            return `<a href="/author/authorDetail?ancId=${authorId}" target="_blank" class="bestThesis__author">${authorName}</a>`;
        }).join(", ");

    // 자체 제공 링크 여부이다. 외부 URL 을 가지고 있다면, 외부 링크이다.
    const hasPdfFile = isPdfFile(bestNodeObject.url);
    // 학위 논문인지 체크
    const isDissertation = bestNodeObject.node_id.startsWith("T");

    const isBookmarked = isB2cLoggedIn ?
        bestNodeObject.nodeButtonType && bestNodeObject.nodeButtonType.bookmark === "1"
        : isBookmarkedWithCookie(bestNodeObject.node_id);
    const voisNumText = getVoisNumText({vol: bestNodeObject.vol, isue: bestNodeObject.isue, cnumVol: bestNodeObject.cnum_vol});

    return `
        <li class="bestThesis ${index >= 10 ? 'hide' : ''}">
            <article class="bestThesis__summary">
                <a href="/journal/articleDetail?nodeId=${bestNodeObject.node_id}" target="_blank" class="bestThesis__link">
                    <h2 class="bestThesis__tit">${bestNodeObject.node_ttle}</h2>
                    <span class="bestThesis__abstract"></span>
                </a>
                <section class="bestThesis__info">
                    <div class="bestThesis__item">
                        ${authorTemplate}
                    </div>
                    <a href="/journal/iprdDetail?iprdId=${bestNodeObject.iprd_id}" class="nodeIprd bestThesis__item" m-hidden="" target="_blank">${bestNodeObject.iprd_nm}</a>
                    <a href="/journal/publicationDetail?publicationId=${bestNodeObject.plct_id}" class="nodePlct bestThesis__item" target="_blank">${bestNodeObject.plct_nm}</a>
                    ${voisNumText ? `<a href="/journal/voisDetail?voisId=${bestNodeObject.vois_id}" class="bestThesis__item" m-hidden="" target="_blank">${voisNumText}</a>` : ``}
                    <span class="bestThesis__item">${bestNodeObject.pbsh_yy}${bestNodeObject.pbsh_mm ? `.${bestNodeObject.pbsh_mm}` : ''}</span>
                    <span class="bestThesis__item" m-hidden="">${bestNodeObject.frst_page}-${bestNodeObject.end_page} (${bestNodeObject.end_page - bestNodeObject.frst_page}pages)</span>
                </section>
                <section class="bestThesis__info">
                    <span class="bestThesis__item" m-hidden="">${bestNodeObject.data_div}</span>
                    ${bestNodeObject.dmst_lstd_info ? `<span class="bestThesis__item" m-hidden="">${bestNodeObject.dmst_lstd_info}</span>` : ``}
                    ${bestNodeObject.clssNm ? `<span class="bestThesis__item">${bestNodeObject.clssDivNm}>${bestNodeObject.clssNm}</span>` : ``}
                    ${bestNodeObject.article_down_cnt && options && options.type === "subject" ? `<span class="bestThesis__item">이용수 ${formatNumber(bestNodeObject.article_down_cnt)}</span>` : ``}
                </section>
                <section class="bestThesis__btnWrap">
                    ${hasPdfFile ?
        `<button class="bestThesis__pdfBtn" id="popupNodeButton_${bestNodeObject.node_id}" aria-label="pdfbutton">
                        <span class="bestThesis__tooltip" m-hidden="">${LAYER_MESSAGE.btnInfoViewPDF}</span>
                    </button>
                    <button class="bestThesis__downBtn" id="downloadNodeButton_${bestNodeObject.node_id}" aria-label="downbutton">
                        <span class="bestThesis__tooltip" m-hidden="">${LAYER_MESSAGE.btnInfoDownload}</span>
                    </button>` :
        `<button class="thesis__linkBtn" id="externalLinkButton_${bestNodeObject.node_id}" aria-label="linkbutton">
                        <span class="thesis__tooltip" m-hidden="">${LAYER_MESSAGE.btnInfoArticleLink}</span>
                    </button>`}
    
                    <button ${isDissertation ? 'm-hidden' : ''} class="bookmarkButton_${bestNodeObject.node_id} ${isDissertation ? ` disabled` : ``} bestThesis__libraryBtn${isBookmarked ? ` add addBtn` : ``}" id="bookmarkButton_${bestNodeObject.node_id}" aria-label="btnBookmark">
                        <span class="bestThesis__tooltip" m-hidden="" id="bookmarkTooltip_${bestNodeObject.node_id}">내서재담기</span>
                        <span class="bestThesis__toggle add" onclick="event.stopPropagation();" id="bookmarkAddMessage_${bestNodeObject.node_id}">내서재에 추가<br>되었습니다.</span>
                        <span class="bestThesis__toggle" onclick="event.stopPropagation();" id="bookmarkRemoveMessage_${bestNodeObject.node_id}">내서재에서<br>삭제되었습니다.</span>
                    </button>
                </section>
            </article>
        </li>
        `;
}

/**
 * 권호 상세 페이지의 논문 개별 HTML 을 반환한다.
 * @param {VoisNode} voisNode
 * @param {boolean} isB2cLoggedIn
 * @return {string}
 */
function getVoisNodeHtml(voisNode, isB2cLoggedIn) {
    // 실제 논문이 아닌, 권호 주제 레이블 렌더링
    if (voisNode.node_ATTB_CODE === '087002') {
        return `<p class="session"><span>${voisNode.node_ttle}</span></p>`;
    }

    // 저자 이름 표기
    const authorNames = (voisNode.autr_nm && voisNode.autr_nm.split('^')) || '';
    const authorTemplate =
        (authorNames &&
            authorNames
                .filter((e, i) => i < 3)
                .map((authorElem) => {
                    const [authorName, authorId] = authorElem.split(';');
                    if (authorId) {
                        return `<a href="/author/authorDetail?ancId=${authorId}" target="_blank" class="bestThesis__author">${authorName}</a>`;
                    }

                    return `<a class="bestThesis__author">${authorName}</a>`;
                })
                .join(', ')) ||
        '';

    // 자체 제공 링크 여부이다. 외부 URL 을 가지고 있다면, 외부 링크이다.
    const hasPdfFile = isPdfFile(voisNode.url);
    // 학위 논문인지 체크
    const isDissertation = voisNode.node_ID.startsWith('T');

    const isBookmarked = isB2cLoggedIn
        ? voisNode.isBookmarked && voisNode.isBookmarked === '1'
        : isBookmarkedWithCookie(voisNode.node_ID);

    const voisNumText = getVoisNumText({vol: voisNode.vol, isue: voisNode.isue, cnumVol: voisNode.cnum_vol});

    return `
        <article class="thesis">
            <label class="thesis__label" m-hidden="">
            <input 
                type="checkbox" 
                data-has-pdf="true" 
                name="checked-node" 
                value="${voisNode.node_ID}" 
                class=" thesis__check"
                aria-label="check">
            </label>
            <article class="thesis__summary">
                <a href="/journal/articleDetail?nodeId=${
        voisNode.node_ID
    }" target="_blank" class="thesis__link">
                    <h2 class="thesis__tit">${voisNode.node_ttle}</h2>
                    <span class="thesis__abstract"></span>
                </a>
                <section class="thesis__info">
                    <div class="thesis__item">
                        ${authorTemplate}
                    </div>
                    <a href="/journal/iprdDetail?iprdId=${
        voisNode.iprd_ID
    }" class="nodeIprd thesis__item" m-hidden="" target="_blank">${
        voisNode.iprd_NM
    }</a>
                    <a href="/journal/publicationDetail?publicationId=${
        voisNode.plct_ID
    }" class="nodePlct thesis__item" target="_blank">${
        voisNode.svc_ORGN_PLCT_NM
    }</a>
    ${
        voisNumText ? `<a href="/journal/voisDetail?voisId=${voisNode.vois_ID}" class="thesis__item" m-hidden="" target="_blank">${voisNumText}</a>` : ``
    }
                    <span class="thesis__item muted">${voisNode.pbsh_yy}${
        voisNode.pbsh_mm ? `.${voisNode.pbsh_mm}` : ``
    }</span>
                    <span class="thesis__item muted" m-hidden="">${
        voisNode.frst_page
    }-${voisNode.end_page} (${
        voisNode.end_page - voisNode.frst_page + 1
    }pages)</span>
                </section>
                <section class="thesis__info">
                    <span class="thesis__item muted" m-hidden="">${
        voisNode.data_div
    }</span>
                    ${
        voisNode.dmst_lstd_info
            ? `<span class="thesis__item muted" m-hidden="">${voisNode.dmst_lstd_info}</span>`
            : ``
    }
                    ${
        voisNode.clssNm
            ? `<span class="thesis__item muted">${voisNode.clssDivNm}>${voisNode.clssNm}</span>`
            : ``
    }
                    ${
        voisNode.article_down_cnt
            ? `<span class="thesis__item muted">이용수 ${formatNumber(
                voisNode.article_down_cnt
            )}</span>`
            : ``
    }
                    ${getTopPercentageHtml(voisNode.rate, voisNode.article_down_cnt)}
                </section>
                <section class="thesis__btnWrap">
                    ${
        hasPdfFile
            ? `<button class="thesis__pdfBtn" id="popupNodeButton_${voisNode.node_ID}" aria-label="pdfbutton">
                        <span class="thesis__tooltip" m-hidden="">${LAYER_MESSAGE.btnInfoViewPDF}</span>
                    </button>
                    <button class="thesis__downBtn" id="downloadNodeButton_${voisNode.node_ID}" aria-label="downbutton">
                        <span class="thesis__tooltip" m-hidden="">${LAYER_MESSAGE.btnInfoDownload}</span>
                    </button>`
            : `<button class="thesis__linkBtn" id="externalLinkButton_${voisNode.node_ID}" aria-label="linkbutton">
                        <span class="thesis__tooltip" m-hidden="">${LAYER_MESSAGE.btnInfoArticleLink}</span>
                    </button>`
    }
    
                    <button ${
        isDissertation ? 'm-hidden' : ''
    } class="bookmarkButton_${voisNode.node_ID} ${
        isDissertation ? ` disabled` : ``
    } thesis__libraryBtn${
        isBookmarked ? ` add addBtn` : ``
    }" id="bookmarkButton_${voisNode.node_ID}" aria-label="bookmarkbutton">
                        <span class="thesis__tooltip" m-hidden="" id="bookmarkTooltip_${
        voisNode.node_ID
    }">내서재담기</span>
                        <span class="thesis__toggle add" onclick="event.stopPropagation();" id="bookmarkAddMessage_${
        voisNode.node_ID
    }">내서재에 추가<br>되었습니다.</span>
                        <span class="thesis__toggle" onclick="event.stopPropagation();" id="bookmarkRemoveMessage_${
        voisNode.node_ID
    }">내서재에서<br>삭제되었습니다.</span>
                    </button>
                </section>
            </article>
        </article>
        `;
}

/**
 * 저자 상세 페이지의 논문 개별 HTML 을 반환한다.
 * @param {AuthorNode} authorNode
 * @param {boolean} isB2cLoggedIn
 * @return {string}
 */
function getAuthorNodeHtml(authorNode, isB2cLoggedIn) {
    const {
        autr_nm,
        url,
        node_id,
        node_svc_ttle,
        pshid: iprd_id,
        pshname: iprd_name,
        plct_id,
        svc_orgn_plct_nm,
        vol,
        isue,
        isid: vois_id,
        pbsh_mm,
        pbsh_yy,
        spage,
        epage,
        data_div,
        dmst_lstd_info,
        articleDownCnt: article_down_cnt,
        rate,
        nontCnt,
        node_order
    } = authorNode;

    const voisNumText = getVoisNumText({vol: authorNode.vol, isue: authorNode.isue, cnumVol: authorNode.cnum_vol});
    // 저자 이름 표기
    const authorNames = (autr_nm && autr_nm.split('^')) || '';
    const authorTemplate =
        (authorNames &&
            authorNames
                .filter((e, i) => i < 3)
                .map((authorElem) => {
                    const [authorName, authorId] = authorElem.split(';');
                    if (authorId) {
                        return `<a href="/author/authorDetail?ancId=${authorId}" target="_blank" class="bestThesis__author">${authorName}</a>`;
                    }

                    return `<a class="bestThesis__author">${authorName}</a>`;
                })
                .join(', ')) ||
        '';

    // 자체 제공 링크 여부이다. 외부 URL 을 가지고 있다면, 외부 링크이다.
    const hasPdfFile = isPdfFile(url);
    // 학위 논문인지 체크
    const isDissertation = node_id.startsWith('T');
    const isBookmarked = isB2cLoggedIn
        ? authorNode.isBookmarked
        : isBookmarkedWithCookie(node_id);
    const fullYear = new Date().getFullYear();

    if (authorNode['listSection'] === 'authorNotnUseYearList' && authorNode.cnt7 === undefined) {
        authorNode.cnt7 = 0;
    }

    return `
        <article class="thesis">
            <label class="thesis__label" m-hidden=""><input type="checkbox" data-has-pdf="true" name="checked-node" value="${node_id}" class=" thesis__check" aria-label="check"></label>
            <article class="thesis__summary">
                <a href="/journal/articleDetail?nodeId=${node_id}" target="_blank" class="thesis__link">
                    <h2 class="thesis__tit">${node_svc_ttle}</h2>
                    <span class="thesis__abstract"></span>
                </a>
                <section class="thesis__info">
                    <div class="thesis__item">
                        ${authorTemplate}
                    </div>
                    <a href="/journal/iprdDetail?iprdId=${iprd_id}" class="nodeIprd thesis__item" m-hidden="" target="_blank">${iprd_name}</a>
                    <a href="/journal/publicationDetail?publicationId=${plct_id}" class="nodePlct thesis__item" target="_blank">${svc_orgn_plct_nm}</a>
                    ${voisNumText ? `<a href="/journal/voisDetail?voisId=${vois_id}" class="thesis__item" m-hidden="" target="_blank">${voisNumText}</a>` : ``}
                    <span class="thesis__item muted">${pbsh_yy}${
        pbsh_mm ? `.${pbsh_mm}` : ``
    }</span>
                    <span class="thesis__item muted" m-hidden="">${spage}-${epage} (${
        epage - spage + 1
    }pages)</span>
                </section>
                <section class="thesis__info">
                    <span class="thesis__item muted" m-hidden="">${data_div}</span>
                    ${
        dmst_lstd_info
            ? `<span class="thesis__item muted" m-hidden="">${dmst_lstd_info}</span>`
            : ``
    }
                    ${
        (node_order !== "3"
            && (article_down_cnt || article_down_cnt === 0))
        && !authorNode.cnt7
        && authorNode['listSection'] !== 'authorNotnUseYearList'
            ? `<span class="thesis__item muted">이용수 ${formatNumber(
                article_down_cnt
            )}</span>`
            : ``
    }
                    ${
        (node_order === "3" && (nontCnt || nontCnt === 0))
            ? `<span class="thesis__item muted">피인용수 ${formatNumber(
                nontCnt
            )}</span>`
            : ``
    }
                    ${
        authorNode.cnt7 || authorNode.cnt7 === 0
            ? `<span class="thesis__item muted">${
                authorNode['listSection'] ===
                'authorNotnUseYearList'
                    ? '피인용수'
                    : '이용수'
            } ${formatNumber(authorNode.cnt7)}</span>`
            : ``
    }
                    ${getTopPercentageHtml(authorNode.rate, authorNode.articleDownCnt)}
                </section>
                <section class="thesis__btnWrap">
                    ${
        hasPdfFile
            ? `<button class="thesis__pdfBtn" id="popupNodeButton_${node_id}" aria-label="pdfbutton">
                        <span class="thesis__tooltip" m-hidden="">${LAYER_MESSAGE.btnInfoViewPDF}</span>
                    </button>
                    <button class="thesis__downBtn" id="downloadNodeButton_${node_id}" aria-label="downbutton">
                        <span class="thesis__tooltip" m-hidden="">${LAYER_MESSAGE.btnInfoDownload}</span>
                    </button>`
            : `<button class="thesis__linkBtn" id="externalLinkButton_${node_id}" aria-label="linkbutton">
                        <span class="thesis__tooltip" m-hidden="">${LAYER_MESSAGE.btnInfoArticleLink}</span>
                    </button>`
    }
    
                    <button ${
        isDissertation ? 'm-hidden' : ''
    } class="bookmarkButton_${node_id} ${
        isDissertation ? ` disabled` : ``
    } thesis__libraryBtn${
        isBookmarked ? ` add addBtn` : ``
    }" id="bookmarkButton_${node_id}" aria-label="bookmarkbutton">
                        <span class="thesis__tooltip" m-hidden="" id="bookmarkTooltip_${node_id}">내서재담기</span>
                        <span class="thesis__toggle add" onclick="event.stopPropagation();" id="bookmarkAddMessage_${node_id}">내서재에 추가<br>되었습니다.</span>
                        <span class="thesis__toggle" onclick="event.stopPropagation();" id="bookmarkRemoveMessage_${node_id}">내서재에서<br>삭제되었습니다.</span>
                    </button>
                </section>
            </article>
        </article>
        ${
        $query('#pub_year_check_03').checked
            ? `
            <div class="listTableWrapper">
            <p class="listTableTxt">연도별 이용수는 하루에 한 번 업데이트됩니다.</p>
            <table class="listTable">
                <tbody>
                <tr>
                    <td>${fullYear}</td>
                    <td>${fullYear - 1}</td>
                    <td>${fullYear - 2}</td>
                    <td>${fullYear - 3}</td>
                    <td>${fullYear - 4}</td>
                    <td>${fullYear - 4} 이전</td>
                </tr>
                <tr>
                    <td id="${node_id}_cnt6">${authorNode.cnt6 || 0}</td>
                    <td id="${node_id}_cnt5">${authorNode.cnt5 || 0}</td>
                    <td id="${node_id}_cnt4">${authorNode.cnt4 || 0}</td>
                    <td id="${node_id}_cnt3">${authorNode.cnt3 || 0}</td>
                    <td id="${node_id}_cnt2">${authorNode.cnt2 || 0}</td>
                    <td id="${node_id}_cnt1">${authorNode.cnt1 || 0}</td>
                </tr>
                </tbody>
            </table>
        </div>
        `
            : ``
    }
        `;
}

function getCheckedNodes() {
    const checkedNodes = [];

    for (const $checkBox of $query('.thesis__check')) {
        if ($checkBox.checked) {
            checkedNodes.push($checkBox.value);
        }
    }
    return checkedNodes;
}

function getAllCheckboxNodes() {
    const checkedNodes = [];

    for (const $checkBox of $query('.thesis__check')) {
        checkedNodes.push($checkBox.value);
    }

    return checkedNodes;
}

/**
 * PC의 경우, 체크박스에 체크된 노드를 북마크한다.
 * 모바일의 경우, 체크박스가 없어 모든 노드를 북마크한다.
 * @param isMobile
 * @return {(function(*): Promise<void>)|*}
 */
function onClickBookmarkAll(isMobile = false) {
    return async (e) => {
        const checkedBookmarkNodeIds = isMobile
            ? getAllCheckboxNodes()
            : getCheckedNodes();

        if (checkedBookmarkNodeIds.length === 0) {
            showAlertDialog('선택한 논문이 없습니다.');
            return;
        }

        const me = await getMeAPI();

        if (isEmptyStr(me.b2cId)) {
            const bookmarkResult = bookmarkAllWithCookie(
                checkedBookmarkNodeIds,
                renderBookmarkUIEffect
            );

            if (bookmarkResult === 'added') {
                showConfirmDialog(
                    `내서재에 추가 되었습니다.<br>로그인 하지 않으면 내서재 담기가 취소됩니다.<br>내서재에서 확인하시겠습니까?`,
                    () => {
                        window.location.href = '/mylib/totalNodeList';
                    }
                );
            }

            renderMyLibCountByCondition();
            return;
        }

        const checkedBookmarkResponse = await fetchAPI(
            '/api/mylib/bookmark/check',
            'POST',
            {nodeIdList: checkedBookmarkNodeIds.join(',')},
            {
                contentType: 'JSON',
                showLoading: false
            }
        );

        if (
            checkedBookmarkResponse.nodeIdList &&
            arrayEquals(
                checkedBookmarkResponse.nodeIdList.split(','),
                checkedBookmarkNodeIds
            )
        ) {
            const removeBookmarkResponse = await fetchAPI(
                '/api/mylib/bookmark/delete',
                'POST',
                {nodeIdList: checkedBookmarkNodeIds.join(',')},
                {
                    contentType: 'JSON',
                    showLoading: true
                }
            );

            for (const removedNodeId of removeBookmarkResponse.nodeIdList.split(
                ','
            )) {
                renderBookmarkUIEffect(removedNodeId, 'REMOVE');
            }

            renderMyLibCountByCondition();
            return;
        }

        const addBookmarkResponse = await fetchAPI(
            '/api/mylib/bookmark/add',
            'POST',
            {nodeIdList: checkedBookmarkNodeIds.join(',')},
            {
                contentType: 'JSON',
                showLoading: true
            }
        );

        for (const addedNodeId of addBookmarkResponse.nodeIdList.split(',')) {
            renderBookmarkUIEffect(addedNodeId, 'ADD');
        }

        showConfirmDialog(
            `내서재에 추가 되었습니다.<br>내서재에서 확인하시겠습니까?`,
            () => {
                window.location.href = '/mylib/totalNodeList';
            }
        );

        renderMyLibCountByCondition();
    };
}

function onClickDownloadAll() {
    let currentB2cLoginYN = getB2cLoginYN();
    if(checkb2cLogin(currentB2cLoginYN)){
        return async (e) => {
            const allCheckedNodeIds = getCheckedNodes();

            if (allCheckedNodeIds.length === 0) {
                showAlertDialog('선택한 논문이 없습니다.');
                return;
            }

            const checkedDownloadNodeIds = allCheckedNodeIds.filter(
                (nodeId) => $query(`#downloadNodeButton_${nodeId}`) !== null
            );

            if (checkedDownloadNodeIds.length === 0) {
                showAlertDialog('다운로드 가능한 논문이 없습니다.');
                return;
            }

            if (checkedDownloadNodeIds.length > 20) {
                showAlertDialog('20개 이하만 한번에 다운로드 하실 수 있습니다.');
                return;
            }

            const downloadResponse = await downloadMultipleNodesAPI(
                checkedDownloadNodeIds
            );

            if (downloadResponse.researchTrgtYn === 'Y') {
                // TODO: researchCount 로 남은 논문 수 확인하고 예외처리하기
            }

            if (!downloadResponse.cnt || downloadResponse.cnt === '-1') {
                showAlertDialog(
                    '이용권한이 없으므로 전체 다운받기가 불가합니다.',
                    () => {
                        showLoginLayer();
                    }
                );

                return;
            }

            if (downloadResponse.cnt === '-2') {
                showAlertDialog('이용권한이 없으므로 전체 다운받기가 불가합니다.');
                return;
            }

            const timeoutOption = {
                timeoutCallback: () => {}
                , timeoutMs: 7000
            }

            showAlertDialog(
                '이용권한이 있는 논문만 다운받기가 가능합니다. 다운로드가 완료될 때까지 기다려주세요.',undefined,undefined,undefined,timeoutOption
            );
            window.location.href = `${
                downloadResponse.down_svc_path
            }?${new URLSearchParams(downloadResponse).toString()}`;
        };
    }
}

function onChangeAllNodeCheckBox() {
    return (e) => {
        for (const $checkBox of $query('[name=checked-node]')) {
            if (
                $checkBox.classList.contains('disabled')
            ) {
                continue;
            }

            $checkBox.checked = e.target.checked;
        }
    };
}
