var pagingObj = {};

(function () {
    pagingObj.dataPerPage = 5;     // 한 페이지에 나타낼 데이터 수
    pagingObj.pageCount = 3;       // 한 화면에 나타낼 페이지 수
    pagingObj.prev = 0;             // 이전 페이지 값
    pagingObj.next = 0;             // 다음 페이지 값
    pagingObj.windowWidth = 1065;    // 모바일 / PC 확인을 위한 window size

    window.paging = function (target, totalDataCnt, currentPage, callback) {
        var curPageId, totalPage, pageGroup, last, first, pagingHtml = '';

        // 현재 페이지 A tag ID
        // curPageId = currentPage>1?Math.round(currentPage/pagingObj.dataPerPage)+1:currentPage;

        // 총 페이지 수
        totalPage = Math.ceil(totalDataCnt / pagingObj.dataPerPage);

        // 페이지 그룹
        pageGroup = Math.ceil(currentPage / pagingObj.pageCount);

        // 화면에 보여질 마지막 페이지 번호
        last = pageGroup * pagingObj.pageCount;

        // 화면에 보여질 첫번째 페이지 번호
        first = last - (pagingObj.pageCount - 1);

        // 첫페이지가 1보다 작을 경우 1로 세팅
        if (first < 1) first = 1;

        // 마지막 페이지 번호가 총 페이지 수 보다 많으면 총 페이지 수 세팅
        if (last > totalPage) last = totalPage;

        pagingObj.next = last + 1;
        pagingObj.prev = first - 1;

        if (pagingObj.prev < 1) {
            pagingObj.prev = 1;
        }

        if (pagingObj.next > totalPage) {
            pagingObj.next = totalPage;
        }

        pagingHtml += '<a onclick="' + callback + '(pagingObj.prev)" href="javascript:void(0)" class="prev" id="prev" style="margin-right: 15px;">이전</a>';

        pagingHtml += '<ol>';

        for (var i = first; i <= last; i++) {
            let className = "";
            if (i === currentPage) className = "curpage";

            pagingHtml += '<li class="' + className + '" id="' + i + '"><a onclick="' + callback + '(' + i + ')" href="javascript:void(0)" id="pcPaging">' + i + '</a></li>';
        }

        pagingHtml += '</ol>';

        pagingHtml += '<a onclick="' + callback + '(pagingObj.next)" href="javascript:void(0)" class="next" id="next">다음</a>';

        // 페이지 목록 생성
        $(target).html(pagingHtml);
        $(target).addClass('num');

        // 현재 페이지 표시
        // $(target + ' li#'+curPageId).addClass('curpage');

        // 데이터 없을 경우 페이징 삭제 처리
        if (totalDataCnt > 0) $(target).show();
        else $(target).hide();
    };
})(window);