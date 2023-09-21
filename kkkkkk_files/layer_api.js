/**
 * ------------------- API 호출 -----------------------------------
 */

/**
 * 내 로그인 정보 가져오기
 *
 * @return {Promise<Me>}
 */
function getMeAPI() {
    return fetchAPI("/member/me", "GET", undefined, {
        showLoading: false
    });
}

/**
 * 로그인이 되었는지 확인한다.
 * @return {Promise<boolean>}
 */
async function getIsLoggedIn() {
    const me = await getMeAPI();
    return !!me.b2cId;
}

/**
 * 논문 다운로드
 *
 * @param nodeId
 * @return {Promise<DownloadLinkObject>}
 */
function downloadNodeAPI(nodeId) {
    return fetchAPI("/download/downloadData", "POST", {
        nodeId,
        systemCode: 147003,
        depth: "Article",
        shape: "download"
    });
}

/**
 * 논문 다운로드
 *
 * @param nodeId
 * @return {Promise<DownloadLinkObject>}
 */
function syncDownloadNodeAPI(nodeId) {
    return syncFetchAPI("/download/downloadData", "POST", {
        nodeId,
        systemCode: 147003,
        depth: "Article",
        shape: "download"
    });
}

/**
 * 논문 다운로드
 *
 * @param nodeId
 * @return {Promise<DownloadLinkObject>}
 */
function syncReadNodeAPI(nodeId) {
    return syncFetchAPI("/download/downloadData", "POST", {
        nodeId,
        systemCode: 147003,
        depth: "Article",
        shape: "pdf"
    });
}

/**
 * 베스트 논문인지 확인
 *
 * @param nodeId
 * @return {IsBestResponse}
 */
function syncIsBestNodeAPI(nodeId) {
    return syncFetchAPI(`/api/pdf/is-best/${nodeId}`);
}

/**
 * 동기 내 로그인 정보 가져오기
 */
function syncGetMeAPI() {
    return syncFetchAPI("/member/me", "GET");
}

/**
 * 논문 구매에 필요한 상세정보 가져오기
 * @param nodeId
 * @return {Promise<Object|string|"redirected">}
 */
function nodeDetailAPI(nodeId) {
    return fetchAPI(`/api/pdf/detail/${nodeId}`);
}

/**
 * 동기) 논문 구매에 필요한 상세정보 가져오기
 * @param nodeId
 * @return {any|string}
 */
function syncNodeDetailAPI(nodeId) {
    return syncFetchAPI(`/api/pdf/detail/${nodeId}`);
}

/**
 * 베스트 논문인지 확인
 *
 * @param nodeId
 * @return {Promise<IsBestResponse>}
 */
function isBestNodeAPI(nodeId) {
    return fetchAPI(`/api/pdf/is-best/${nodeId}`);
}

/**
 * 추천 논문 응답을 반환하는 API 를 호출한다.
 * @param nodeId
 * @return {Promise<Object|string>}
 */
function recommendNodesAPI(nodeId) {
    return fetchAPI(`/journal/recommendNodes?nodeId=${nodeId}`)
}

/**
 * 여러 개의 논문을 다운로드 하기 위한 API 를 호출한다.
 * @param nodes
 * @return {Promise<MultipleDownloadResponse>}
 */
function downloadMultipleNodesAPI(nodes) {
    return fetchAPI(`/download/multiDownload`, "POST", {
        dataString: nodes.join("^")
    });
}

/**
 * 기관인증 로그인을 진행하고 응답을 반환한다.
 * @param id
 * @param password
 * @param organizationId
 * @return {Promise<B2bLoginResponse>}
 */
function b2bLoginAPI(id, password, organizationId) {
    return fetchAPI("/member/b2bLoginProc", "POST", {
        b2bAcc: id,
        userPass: password,
        b2bLoginType: 151004,
        b2bId: organizationId,
    });
}

/**
 * B2C 로그인
 * @param id
 * @param password
 * @param autoLogin
 * @return {Promise<Object|string|"redirected">|*}
 */
function b2cLoginAPI(id, password) {
    return fetchAPI("/member/b2cLoginProcForChrome", "POST", {
        userId: id,
        userPw: password
    });
}

/**
 * 로그인 된 경우 호출되는 북마크 API 이다.
 *
 * @param {string} nodeId
 * @param {function} addCallback
 * @param {function} removeCallback
 * @return void
 */
function toggleBookmarkAPI(nodeId, addCallback, removeCallback) {
    fetchAPI("/search/newSetBookmark"
        , 'POST'
        , {
            nodeId
        }
    ).then((json) => {
        const {cnt: numberOfBookmarks, flag, msg} = json;
        const isNotLoggedIn = numberOfBookmarks === -1;

        // window.sessionScope 에 b2c_id 가 있지만, 인증이 만료된 상태인 경우 (API 의 cnt 값이 -1 이 나온다.)
        if (isNotLoggedIn) {
            alert("로그인 세션이 만료되었습니다. 재로그인이 필요합니다.");
            return;
        }

        // 북마크 추가
        if (flag === "add") {
            addCallback()
            return;
        }

        if (flag === "del") {
            removeCallback();
        }
    });
}

/**
 * 기관 목록을 조회한 결과를 반환하는 API 를 호출한다.
 * @param searchTerm
 * @return {Promise<[SearchOrganizationResponse]>}
 */
function searchOrganizationListAPI(searchTerm) {
    return fetchAPI("/member/getB2bList", "POST", {keyword: searchTerm});
}

/**
 * 해당 기관 ID 가 DBpia 를 구독중인지 여부를 판단하여 응답을 반환하는 API 를 호출한다.
 * @param organizationId
 * @return {Promise<IsSubscribingResponse>}
 */
function isSubscribingAPI(organizationId) {
    return fetchAPI("/member/getB2bPermission", "POST", {
        b2bId: organizationId
    });
}

/**
 * 간행물 ID 배열을 보내어, 표지 이미지를 가져온다.
 * @param plctIdArray
 * @return {Promise<Object|string|"redirected">|*}
 */
function getImageUrlAPI(plctIdArray) {
    return fetchAPI("/search/getImageUrl", "POST", {
        "plctIdArray[]": plctIdArray
    }, {
        showLoading: false
    });
}

/**
 * 해당 논문에 대해 논문 상세에 존재하는 모든 논문 정보를 가져온다.
 * @param nodeId 논문 아이디
 */
function getFullNodeDetailAPI(nodeId) {
    return fetchAPI(`/journal/api/detail/${nodeId}`);
}