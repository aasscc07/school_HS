const SHARE_URL = document.URL.replace('stg-', '');

function naverSocialShare() {
    const {query} = getParams();

    if (query) {
        window.open(
            `http://share.naver.com/web/shareView.nhn?url=${encodeURI(
                encodeURIComponent(
                    `https://dbpia.co.kr/search/topSearch?query=${query}`
                )
            )}&title=${encodeURIComponent(document.title)}`,
            'naversharedialog',
            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
        );
        return;
    }

    window.open(
        `http://share.naver.com/web/shareView.nhn?url=${encodeURI(
            encodeURIComponent(SHARE_URL)
        )}&title=${encodeURIComponent(document.title)}`,
        'naversharedialog',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
}

function facebookSocialShare() {
    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            SHARE_URL
        )}&t=${encodeURIComponent(document.title)}`,
        'facebooksharedialog',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
}

function twitterSocialShare() {
    window.open(
        `https://twitter.com/intent/tweet?text=[%EA%B3%B5%EC%9C%A0]%20${encodeURIComponent(
            SHARE_URL
        )}%20-%20${encodeURIComponent(document.title)}`,
        'twittersharedialog',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
}

function kakaoSocialShare() {
    if (!Kakao.isInitialized()) {
        Kakao.init('2beded4e0f724f4b1648d82e6a157be1');
    }

    if (Kakao.isInitialized()) {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: document.title,
                description: '논문, 학술저널 검색 플랫폼 서비스',
                imageUrl:
                    ($query('#twitterImageUrl') &&
                        $query('#twitterImageUrl').getAttribute('content')) ||
                    'https://www.dbpia.co.kr/images/common/dbpia.jpg',
                link: {
                    webUrl: document.URL,
                    mobileWebUrl: document.URL
                }
            }
        });
    }
}

function copyLink() {
    if ($query('#shareLayer').style.display === 'none') {
        const $linkTextArea = $query('#linkTextArea');
        $linkTextArea.value = window.location.href;
        $linkTextArea.style.setProperty('display', 'block');
        $linkTextArea.focus();
        $linkTextArea.select();
        document.execCommand('copy');
        $linkTextArea.style.setProperty('display', 'none');
    } else {
        const $linkShareInput = $query('#linkShareInput');
        $linkShareInput.focus();
        $linkShareInput.select();
        document.execCommand('copy');
    }

    showAlertDialog(
        (typeof SOCIAL_SHARE_MESSAGE !== 'undefined' &&
            SOCIAL_SHARE_MESSAGE.copyUrl) ||
        '링크가 복사되었습니다.', () => {
            hideShareLayer();
        }
    );
}