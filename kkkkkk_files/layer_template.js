/**
 * ----------------------- HTML 템플릿 제공 ----------------------------
 */

/**
 * 추천논문 렌더링에 필요한 html 템플릿을 제공한다.
 * @param id 추천 타입 아이디
 * @param nodes 추천 논문 정보
 * @return {string}
 */
function recommendedNodesHtml(id, nodes) {
    let resultHtml = "";
    const eventQueue = [];

    for (const [index, node] of nodes.entries()) {
        const {
            id: nodeId,
            titleKr: titleKr,
            titleEn: titleEn,
            author,
            pshtitle: publisher,
            pid: publisherId,
            yytime: year,
            mmtime: month,
            bookmark
        } = node

        // prefix 는 통계코드를 쌓는데도 사용되어 함부로 바꾸면 안 된다.
        const prefix = `recommendLayer_${id}_${index}_`;
        const title = isLocaleEnglish() && titleEn ? titleEn : titleKr;
        const isBookmarked = layer_isB2cLoggedIn() ? bookmark === 1 : isBookmarkedWithCookie(nodeId);
        resultHtml += recommendedNodeListElementHtml(id, nodeId, title, author, publisher, month !== null ? `${year}.${month}` : year, isBookmarked, index, publisherId, node.cpLinkUrl, prefix);

        /**
         * @type {MyLibVONodeObject}
         */
        const myLibVO = {
            node_ttle: title,
            url: node.cpLinkUrl,
            node_id: nodeId,
            iprd_id: node.pshid
        };

        buildNodeListEventRegisterQueue(myLibVO, eventQueue, prefix);
    }

    return [resultHtml, eventQueue];
}

/**
 * 검색어 추천에 이용되는 li 태그 템플릿을 반환한다.
 * @param searchTerm
 * @param text
 * @param b2bId
 * @param isSelected
 * @return {string}
 */
function searchListHtml(searchTerm, text, b2bId, isSelected = false) {
    const highlightedSearchTerm = text.replaceAll(searchTerm, `<span class="searchText">${searchTerm}</span>`);
    const className = isSelected ?
        "dpOrganization__searchItem selectedItem" : "dpOrganization__searchItem"

    return `<li class="${className}" data-organization-name="${text}" data-organization-id="${b2bId}">${highlightedSearchTerm}</li>`
}

/**
 * 미리보기 요소의 Html 템플릿을 제공한다.
 * @param url
 * @param page
 * @return {string}
 */
function previewItemHtml(url, page) {
    return `
        <li class="quickViewItem">
            <p class="img">
            <img src="${url}?t=1660801661664&amp;prevPathCode=&amp;token=&amp;page=${page}">
            </p>
            <p class="pageNum">${page} page</p>
        </li>
        `
}

/**
 * 추천 논문 리스트 HTML
 * @param id
 * @param nodeId
 * @param title
 * @param author
 * @param publisher
 * @param date
 * @param isBookmarked
 * @param index
 * @param publisherId
 * @param url
 * @param prefix
 * @return {string}
 */
function recommendedNodeListElementHtml(id, nodeId, title, author, publisher, date, isBookmarked, index, publisherId, url, prefix) {
    let nodeClickCode;
    let downloadClickCode;
    switch (id) {//기능이용통계 작업
        case "recommendedNodes"://함께 읽어보면 좋을 논문
            nodeClickCode = "Z465";
            downloadClickCode = "Z412"
            break;
        case "downloadedTogetherNodes": //이 논문과 함꼐 이용한 논문
            nodeClickCode = "Z466";
            downloadClickCode = "Z467"
    }

    return `
        <li class="dpRecommendThesis__item hide">
            <a href="/journal/articleDetail?nodeId=${nodeId}" target="_blank" class="dpRecommendThesis__link" onclick="fn_statistics_call('${nodeClickCode}')">
                ${title}
            </a>
            
            <section class="thesis__btnWrap">
                <span style="display: none" class="bookmarkTooltip_${nodeId} bestThesis__tooltip" m-hidden="" id="${prefix}bookmarkTooltip_${nodeId}">내서재담기</span>
                <button class="bookmarkButton_${nodeId} thesis__libraryBtn${isBookmarked ? ' add addBtn' : ''}" id="${prefix}bookmarkButton_${nodeId}" data-statistics-code="Z103">
                    <span class="thesis__toggle add" id="${prefix}bookmarkAddMessage_${nodeId}" onclick="event.stopPropagation();">내서재에 추가<br>되었습니다.</span>
                    <span class="thesis__toggle" id="${prefix}bookmarkRemoveMessage_${nodeId}" onclick="event.stopPropagation();">내서재에서<br>삭제되었습니다.</span>                    
                </button>
                ${url ? '' : `<button class="thesis__downBtn" id="${prefix}downloadNodeButton_${nodeId}" onclick="fn_statistics_call('${downloadClickCode}')"></button>`}
            </section>            
        </li>
    `
}