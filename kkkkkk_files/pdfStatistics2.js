/**
 * 기능 이용 통계를 위해 추가된 페이지
 * B2B_ID 와 B2C_ID가 수집이 필요없다고 하여, NULL처리되어 있음
 * **/

const addStatistics = {

    click: function () {

        // 뷰어 상단, 미리보기 / 목차
        document.getElementById('sidebarToggle').addEventListener("click", function () {
            fn_statistics('Z028', null, null);
        });

        // 뷰어 상단, 하이라이트
        document.getElementById('highlightText').addEventListener("click", function () {
            fn_statistics('Z029', null, null);
        });

        // 뷰어 상단, 밑줄
        document.getElementById('underlineText').addEventListener("click", function () {
            fn_statistics('Z030', null, null);
        });

        // 뷰어 상단, 물결선
        document.getElementById('sineText').addEventListener("click", function () {
            fn_statistics('Z031', null, null);
        });

        // 뷰어 상단, 말풍선
        document.getElementById('speechBubble').addEventListener("click", function () {
            fn_statistics('Z032', null, null);
        });

        // 뷰어 상단, 되돌리기
        document.getElementById('historyBack').addEventListener("click", function () {
            fn_statistics('Z033', null, null);
        });

        // 뷰어 상단, 되살리기
        document.getElementById('historyForward').addEventListener("click", function () {
            fn_statistics('Z034', null, null);
        });

        // 뷰어 상단, 지우개
        document.getElementById('eraseAnnotation').addEventListener("click", function () {
            fn_statistics('Z035', null, null);
        });

        // 뷰어 상단, 논문인용정보
        document.getElementById('doubleQuotes').addEventListener("click", function () {
            fn_statistics('Z036', null, null);
        });

        // 뷰어 상단, 각주와함께복사
        document.getElementById('copyWithFootnote').addEventListener("click", function () {
            fn_statistics('Z037', null, null);
        });

        // 뷰어 상단, 본문 검색
        document.getElementById('searchTextButton').addEventListener("click", function () {
            fn_statistics('Z038', null, null);
        });

        // 뷰어 상단, 본문 내 검색
        document.getElementById('viewFind').addEventListener("click", function () {
            fn_statistics('Z039', null, null);
        });

        // 뷰어 상단, 내 메모 보기
        document.getElementById('comment').addEventListener("click", function () {
            fn_statistics('Z040', null, null);
        });

        // 텍스트 드래그, 하이라이트
        document.getElementById('popupHighlightButton').addEventListener("click", function () {
            fn_statistics('Z041', null, null);
        });

        // 텍스트 드래그, 밑줄
        document.getElementById('popupUnderlineButton').addEventListener("click", function () {
            fn_statistics('Z042', null, null);
        });

        // 텍스트 드래그, 물결선
        document.getElementById('popupSineButton').addEventListener("click", function () {
            fn_statistics('Z043', null, null);
        });

        // 텍스트 드래그, 각주와함께복사
        document.getElementById('popupCopyWithFootnoteButton').addEventListener("click", function () {
            fn_statistics('Z044', null, null);
        });

        // 텍스트 드래그, 메모작성 / 메모수정
        document.getElementById('popupCommentButton').addEventListener("click", function () {
            fn_statistics('Z045', null, null);
        });

        // 텍스트 드래그, 색상 변경
        document.getElementById('popupColorButton').addEventListener("click", function () {
            fn_statistics('Z046', null, null);
        });

        // 텍스트 드래그, 삭제
        document.getElementById('popupDeleteButton').addEventListener("click", function () {
            fn_statistics('Z047', null, null);
        });

        // 로그인 바로가기
        document.getElementById('loginButton').addEventListener("click", function () {
            fn_statistics('Z054', null, null);
        });

        // 인쇄
        document.getElementById('doPrint').addEventListener("click", function () {
            // 메모와 함께 인쇄 활성화 여부 점검
            if(document.getElementById("printWithAnnotation").checked) {
                // 인쇄하기 - 메모와 함께 인쇄
                fn_statistics('Z053', null, null);
            } else {
                // 인쇄하기 - 원본 문서만 인쇄
                fn_statistics('Z052', null, null);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {

    addStatistics.click();
});
