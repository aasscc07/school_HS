function getLanguage() {
    let language = 'ko-KR'

    if (navigator.language) {
        language = navigator.language;
    }

    if (!navigator.language && navigator.browserLanguage) {
        language = navigator.browserLanguage;
    }

    return language.toLowerCase();
}

async function fn_statistics(code, b2bId, b2cId) {
    let nio = '', nbr = '', nsc = '', nbi = '', nla = '', nnd = '', nnf = '', nnp = '', nrd = '', nrf = '', nrp = '';
    let ref = "", rh = "", rp = "", rq = "", ru = "", i = "", page = "";

    //이전페이지 쪼개기
    //팝업일 경우 opener 주소로 처리
    if (opener == null) {
        i = document.referrer.indexOf("://");
        ref = document.referrer.substring(i + 3, document.referrer.length);
    } else {
        //예외처리==>타 도메인간 오픈창을 열었을때 엑세스 거부로 예외처리 시킴
        try {
            let openUrl2 = opener.document.location.toString();
            i = openUrl2.indexOf("://");
            ref = openUrl2.substring(i + 3, openUrl2.length);
        } catch (e) {
            opener = null;
            i = document.referrer.indexOf("://");
            ref = document.referrer.substring(i + 3, document.referrer.length);
        }
    }

    if ((i = ref.indexOf("/")) > -1) {
        ru = ref.substring(i, ref.length);
        rh = ref.substring(0, i);
    }

    if ((i = ru.indexOf("?")) > -1) {
        rp = ru;
        ru = ru.substring(0, i);
        rp = rp.substring(i, rp.length);
    }

    nio = niO(); //운영체제
    nbr = niB(); //브라우저
    nsc = screen.width + "x" + screen.height; //해상도
    nbi = screen.colorDepth + "-bit"; //bit
    nla = getLanguage(); //언어
    nnd = document.location.hostname; //현재 페이지 도메인
    nnf = document.location.pathname.replace("/", ""); //현재 페이지 path
    nnp = document.location.search.replace("?", "").replace(/&/g, "/"); //현재 페이지 파라미터
    nrd = rh; //이전 페이지 도메인
    nrf = ru.replace("/", ""); //이전 페이지 path
    nrp = rp.replace("?", "").replace(/&/g, "/"); //이전 페이지 파라미터

    let pc = nnf;

    if (nnp.indexOf('nodeId') < 0 && nnp.indexOf('language') < 0) {
        pc = pc + document.location.search;
    }

    page = pageCode(pc); //URL에 따라 공통기능 페이지 코드 변경

    b2bId = emptyToBlank(b2bId);
    b2cId = emptyToBlank(b2cId);

    await fetchAPI("/statisticsJson", "POST", {
        "nio": nio,
        "nbr": nbr,
        "nsc": nsc,
        "nbi": nbi,
        "nla": nla,
        "nnd": nnd,
        "nnf": nnf,
        "nnp": nnp,
        "nrd": nrd,
        "nrf": nrf,
        "nrp": nrp,
        "b": b2bId || "",
        "c": b2cId || "",
        "page": page,
        "code": code || "",
        "timestamp": (new Date()).getTime()
    }, {
        showLoading: false
    }).then(() => {
        console.log(`statistics sent successfully. [code: ${code}, b2bId: ${b2bId}, b2cId: ${b2cId}]`);
    }).catch((e) => {
        if (e && e.status === '952') {
            location.href = '/member/logout?no=1';
        }
    });
}

function emptyToBlank(str) {
    if (typeof str === undefined || str === null || str === "null") {
        return ""
    }

    return str;
}

//운영체제
function niO() {
    let n = navigator, to = "-", tv = "-", o = to;
    if (n.platform) {
        to = n.platform.toLowerCase();
    }
    if (n.appVersion) {
        tv = n.userAgent.toLowerCase();
    }
    if (niIN(to, 'win32')) {
        if (niIN(tv, '98')) {
            o = 'Windows 98';
        } else if (niIN(tv, '95')) {
            o = 'Windows 95';
        } else if (niIN(tv, 'nt 10.0')) {
            o = 'Windows 10';
        } else if (niIN(tv, 'nt 6.3')) {
            o = 'Windows 8';
        } else if (niIN(tv, 'nt 6.2')) {
            o = 'Windows Server 2008';
        } else if (niIN(tv, 'nt 6.1')) {
            o = 'Windows 7';
        } else if (niIN(tv, 'nt 6.0')) {
            o = 'Windows Vista';
        } else if (niIN(tv, 'nt 5.0')) {
            o = 'Windows 2000';
        } else if (niIN(tv, 'nt 5.1')) {
            o = 'Windows XP';
        } else if (niIN(tv, 'nt 5.2')) {
            o = 'Windows Server 2003';
        } else if (niIN(tv, 'nt')) {
            o = 'Windows NT';
        } else if (niIN(tv, 'me')) {
            o = 'Windows Me';
        } else {
            o = 'Windows';
        }
    } else {
        let st = to.substring(0, 4);
        if (st == 'win1') {
            o = 'Windows 3.1';
        } else if (st == 'mac6') {
            o = 'Mac';
        } else if (st == 'maco') {
            o = 'Mac';
        } else if (st == 'macp') {
            o = 'Mac';
        } else if (st == 'linu') {
            o = 'Linux';
        } else if (st == 'webt') {
            o = 'WebTV';
        } else if (st == 'osf1') {
            o = 'Compaq Open VMS';
        } else if (st == 'hp-u') {
            o = 'HP Unix';
        } else if (st == 'os/2') {
            o = 'OS/2';
        } else if (st == 'aix4') {
            o = 'AIX';
        } else if (st == 'free') {
            o = 'FreeBSD';
        } else if (st == 'suno') {
            o = 'SunO';
        } else if (st == 'drea') {
            o = 'Drea';
        } else if (st == 'plan') {
            o = 'Plan';
        } else {
            o = to;
        }
    }
    return o;
}

//브라우저
function niB() {
    let n = navigator, tb = "-", b = tb;
    if (n.userAgent) {
        tb = navigator.userAgent.toLowerCase();
    }
    if (niIN(tb, 'msie')) {
        if (niIN(tb, '7.0')) b = "IE7"; else if (niIN(tb, '8.0')) b = "IE8"; else if (niIN(tb, '9.0')) b = "IE9"; else b = "IE";
    } else if (niIN(tb, 'edge')) {
        b = "Edge";
    } else if (niIN(tb, 'opera')) {
        b = "Opera";
    } else if (niIN(tb, 'netscape')) {
        b = "Netscape";
    } else if (niIN(tb, 'firefox/3.')) {
        b = "Firefox3";
    } else if (niIN(tb, 'firefox/2')) {
        b = "Firefox2";
    } else if (niIN(tb, 'firefox')) {
        b = "Firefox";
    } else if (niIN(tb, 'chrome')) {
        b = "Chrome";
    } else if (niIN(tb, 'safari')) {
        b = "Safari";
    } else if (niIN(tb, 'mozilla/5.0 (ipad')) {
        b = "ipad";
    } else if (niIN(tb, 'mozilla/5.0 (iphone')) {
        b = "ipad";
    } else {
        b = tb;
    }
    return b;
}

//문자열 포함여부판단
function niIN(s, t) {
    if (niNULL(s) == 1) return false;
    if (s.indexOf(t) > -1)
        return true;
    else
        return false;
}

//null여부판단
function niNULL(s) {
    if (!s || s == "" || s == "undefined" || s == "unknown") return 1;
    else return 0;
}

function pageCode(v) {

    let page = "NON";

    //URL에 따라 공통기능 페이지 코드 변경
    if (niIN(v, "SKnowledge/ArticleList/"))  // 상세_간행물(첫단추)
        page = "C14";
    else if (niIN(v, "SKnowledge/ArticleDetail/"))  // 상세_첫단추 논문
        page = "C15";
    else if (niIN(v, "SearchResult/")) //검색결과 페이지
        page = "D01";
    else if (niIN(v, "journal/journal-recommend-search")) //저널추천서비스 검색페이지
        page = "D02";
    else if (niIN(v, "journal/journal-recommend-detail")) //저널추천서비스 상세페이지
        page = "D03";
    else if ((niIN(v, "Scrap")) || (niIN(v, "Tag")) || (niIN(v, "BuyList")) || (niIN(v, "MyPoint")) || (niIN(v, "AlrimService")) || (niIN(v, "Member/MemberModify")) || (niIN(v, "SearchOpt")) || (niIN(v, "MobileView")) || (niIN(v, "MyArticle")) || (niIN(v, "SearchHistory")) || (niIN(v, "Member/MemberHome"))) //마이페이지
        page = "E01";
    else if (niIN(v, "Cart")) //장바구니
        page = "E02";
    else if ((niIN(v, "Helpdesk")) || (niIN(v, "Notice")) || (niIN(v, "Faq")) || (niIN(v, "QNA")) || (niIN(v, "SrvImp")) || (niIN(v, "ErrReport")) || (niIN(v, "Trial"))) //고객센터
        page = "E03";
    else if (niIN(v, "Member/MemberJoin"))// 회원가입
        page = "E07";
    else if (niIN(v, "Member/"))  //회원가입
        page = "E04";
    else if (niIN(v, "IndulRcmd/IndulRcmdList"))  // 맞춤 추천 목록
        page = "E05";
    else if (niIN(v, "IndulRcmd/MyViewList"))  // 내가 열람한 논문 목록
        page = "E06";
    else if (niIN(v, "Journal/PDFViewNew"))
        page = "H02";
    else if (niIN(v, "Journal/TextViewNew"))
        page = "H03";
    else if ((v === "") || (niIN(v, "Home"))) //메인화면
        page = "A01";
    else if (niIN(v, "search/topSearch")) // 상단_검색결과
        page = "Z01";
    else if (niIN(v, "#pub_modalAdvancedSearch")) // 상단_상세검색
        page = "Z02";
    else if (niIN(v, "subject/subjectList?subjCode=NA00")) // 인문학_인문학일반
        page = "I01";
    else if (niIN(v, "subject/subjectList?subjCode=NA01")) // 인문학_역사학
        page = "I02";
    else if (niIN(v, "subject/subjectList?subjCode=NA02")) // 인문학_철학
        page = "I03";
    else if (niIN(v, "subject/subjectList?subjCode=NA03")) // 인문학_종교학/신학
        page = "I04";
    else if (niIN(v, "subject/subjectList?subjCode=NA04")) // 인문학_언어학
        page = "I05";
    else if (niIN(v, "subject/subjectList?subjCode=NA05")) // 인문학_문학
        page = "I06";
    else if (niIN(v, "subject/subjectList?subjCode=NA06")) // 인문학_한국어문학
        page = "I07";
    else if (niIN(v, "subject/subjectList?subjCode=NA07")) // 인문학_중국어문학
        page = "I08";
    else if (niIN(v, "subject/subjectList?subjCode=NA08")) // 인문학_일본어문학
        page = "I09";
    else if (niIN(v, "subject/subjectList?subjCode=NA10")) // 인문학_영어문학
        page = "I10";
    else if (niIN(v, "subject/subjectList?subjCode=NA11")) // 인문학_프랑스어문학
        page = "I11";
    else if (niIN(v, "subject/subjectList?subjCode=NA12")) // 인문학_독일어문학
        page = "I12";
    else if (niIN(v, "subject/subjectList?subjCode=NA14")) // 인문학_러시아어문학
        page = "I13";
    else if (niIN(v, "subject/subjectList?subjCode=NB00")) // 사회과학_사회과학일반
        page = "J01";
    else if (niIN(v, "subject/subjectList?subjCode=NB11")) // 사회과학_정치외교학
        page = "J02";
    else if (niIN(v, "subject/subjectList?subjCode=NB14")) // 사회과학_경제학
        page = "J03";
    else if (niIN(v, "subject/subjectList?subjCode=NB01")) // 사회과학_경영학
        page = "J04";
    else if (niIN(v, "subject/subjectList?subjCode=NB15")) // 사회과학_무역학
        page = "J05";
    else if (niIN(v, "subject/subjectList?subjCode=NB08")) // 사회과학_사회학
        page = "J06";
    else if (niIN(v, "subject/subjectList?subjCode=NB16")) // 사회과학_사회복지학
        page = "J07";
    else if (niIN(v, "subject/subjectList?subjCode=NB17")) // 사회과학_지역학
        page = "J08";
    else if (niIN(v, "subject/subjectList?subjCode=NB03")) // 사회과학_교육학
        page = "J09";
    else if (niIN(v, "subject/subjectList?subjCode=NB07")) // 사회과학_법학
        page = "J10";
    else if (niIN(v, "subject/subjectList?subjCode=NB13")) // 사회과학_행정학
        page = "J11";
    else if (niIN(v, "subject/subjectList?subjCode=NB12")) // 사회과학_지리/지역개발학
        page = "J12";
    else if (niIN(v, "subject/subjectList?subjCode=NB02")) // 사회과학_관광학
        page = "J13";
    else if (niIN(v, "subject/subjectList?subjCode=NB09")) // 사회과학_신문방송학
        page = "J14";
    else if (niIN(v, "subject/subjectList?subjCode=NB04")) // 사회과학_군사학
        page = "J15";
    else if (niIN(v, "subject/subjectList?subjCode=NB10")) // 사회과학_심리과학
        page = "J16";
    else if (niIN(v, "subject/subjectList?subjCode=NB05")) // 사회과학_문헌정보학
        page = "J17";
    else if (niIN(v, "subject/subjectList?subjCode=NC00")) // 자연과학_자연과학일반
        page = "K01";
    else if (niIN(v, "subject/subjectList?subjCode=NC04")) // 자연과학_수학/통계학
        page = "K02";
    else if (niIN(v, "subject/subjectList?subjCode=NC01")) // 자연과학_물리학
        page = "K03";
    else if (niIN(v, "subject/subjectList?subjCode=NC02")) // 자연과학_생물학
        page = "K04";
    else if (niIN(v, "subject/subjectList?subjCode=NC05")) // 자연과학_천문/지구과학
        page = "K05";
    else if (niIN(v, "subject/subjectList?subjCode=NC03")) // 자연과학_생물과학
        page = "K06";
    else if (niIN(v, "subject/subjectList?subjCode=ND00")) // 공학_공학일반
        page = "L01";
    else if (niIN(v, "subject/subjectList?subjCode=ND02")) // 공학_기계공학
        page = "L02";
    else if (niIN(v, "subject/subjectList?subjCode=ND12")) // 공학_항공우주공학
        page = "L03";
    else if (niIN(v, "subject/subjectList?subjCode=ND13")) // 공학_컴퓨터학
        page = "L04";
    else if (niIN(v, "subject/subjectList?subjCode=ND11")) // 공학_화학/생물공학
        page = "L05";
    else if (niIN(v, "subject/subjectList?subjCode=ND07")) // 공학_전기/제어계측공학
        page = "L06";
    else if (niIN(v, "subject/subjectList?subjCode=ND10")) // 공학_토목/환경공학
        page = "L07";
    else if (niIN(v, "subject/subjectList?subjCode=ND08")) // 공학_전자/정보통신공학
        page = "L08";
    else if (niIN(v, "subject/subjectList?subjCode=ND01")) // 공학_건축공학
        page = "L09";
    else if (niIN(v, "subject/subjectList?subjCode=ND03")) // 공학_산업공학
        page = "L10";
    else if (niIN(v, "subject/subjectList?subjCode=ND09")) // 공학_조선/해양공학
        page = "L11";
    else if (niIN(v, "subject/subjectList?subjCode=ND05")) // 공학_자원/재료공학
        page = "L12";
    else if (niIN(v, "subject/subjectList?subjCode=NE00")) // 의약학_의학일반
        page = "M01";
    else if (niIN(v, "subject/subjectList?subjCode=NE04")) // 의약학_의학일반
        page = "M02";
    else if (niIN(v, "subject/subjectList?subjCode=NE05")) // 의약학_치의학
        page = "M03";
    else if (niIN(v, "subject/subjectList?subjCode=NE02")) // 의약학_수의학
        page = "M04";
    else if (niIN(v, "subject/subjectList?subjCode=NE01")) // 의약학_간호학
        page = "M05";
    else if (niIN(v, "subject/subjectList?subjCode=NE06")) // 의약학_한의학
        page = "M06";
    else if (niIN(v, "subject/subjectList?subjCode=NE03")) // 의약학_약학
        page = "M07";
    else if (niIN(v, "subject/subjectList?subjCode=NF00")) // 농수해양학_농수해양학일반
        page = "N01";
    else if (niIN(v, "subject/subjectList?subjCode=NF01")) // 농수해양학_농학
        page = "N02";
    else if (niIN(v, "subject/subjectList?subjCode=NF04")) // 농수해양학_임학
        page = "N03";
    else if (niIN(v, "subject/subjectList?subjCode=NF06")) // 농수해양학_축산학
        page = "N04";
    else if (niIN(v, "subject/subjectList?subjCode=NF02")) // 농수해양학_수산학
        page = "N05";
    else if (niIN(v, "subject/subjectList?subjCode=NF07")) // 농수해양학_해상운송학
        page = "N06";
    else if (niIN(v, "subject/subjectList?subjCode=NF03")) // 농수해양학_식품과학
        page = "N07";
    else if (niIN(v, "subject/subjectList?subjCode=NG00")) // 예술체육학_예술체육학일반
        page = "O01";
    else if (niIN(v, "subject/subjectList?subjCode=NG09")) // 예술체육학_음악
        page = "O02";
    else if (niIN(v, "subject/subjectList?subjCode=NG04")) // 예술체육학_미술
        page = "O03";
    else if (niIN(v, "subject/subjectList?subjCode=NG02")) // 예술체육학_디자인
        page = "O04";
    else if (niIN(v, "subject/subjectList?subjCode=NG10")) // 예술체육학_의상
        page = "O05";
    else if (niIN(v, "subject/subjectList?subjCode=NG06")) // 예술체육학_사진
        page = "O06";
    else if (niIN(v, "subject/subjectList?subjCode=NG05")) // 예술체육학_미용
        page = "O07";
    else if (niIN(v, "subject/subjectList?subjCode=NG07")) // 예술체육학_연극
        page = "O08";
    else if (niIN(v, "subject/subjectList?subjCode=NG08")) // 예술체육학_영화
        page = "O09";
    else if (niIN(v, "subject/subjectList?subjCode=NG11")) // 예술체육학_체육
        page = "O10";
    else if (niIN(v, "subject/subjectList?subjCode=NG03")) // 예술체육학_무용
        page = "O11";
    else if (niIN(v, "subject/subjectList?subjCode=NG01")) // 예술체육학_건축
        page = "O12";
    else if (niIN(v, "subject/subjectList?subjCode=NH02")) // 복합학_과학기술학/기술정책
        page = "P01";
    else if (niIN(v, "subject/subjectList?subjCode=NH05")) // 복합학_여성학
        page = "P02";
    else if (niIN(v, "subject/subjectList?subjCode=NH03")) // 복합학_뇌/인지과학
        page = "P03";
    else if (niIN(v, "subject/subjectList?subjCode=NH00")) // 복합학_학제간연구
        page = "P04";
    else if (niIN(v, "journal/articleDetail") || niIN(v, "Journal/articleDetail") || niIN(v, "journal/detail")) // 논문상세
        page = "Z03";
    else if (niIN(v, "#pub_modalReportError")) // 논문상세_오류신고
        page = "Z04";
    else if (niIN(v, "journal/publicationDetail") || niIN(v, "Journal/publicationDetail") || niIN(v, "journalDetail") || niIN(v, "Publication")) // 저널상세
        page = "Z05";
    else if (niIN(v, "author/authorDetail")) // 저자상세
        page = "Z06";
    else if (niIN(v, "#pub_modalJointAuthorStep1")) // 저자상세_저자병합
        page = "Z07";
    else if (niIN(v, "#pub_modalThesisAdditionStep1")) // 저자상세_논문추가
        page = "Z07";
    else if (niIN(v, "journal/iprdDetail") || niIN(v, "Institute/journalDetail") || niIN(v, "Publisher")) // 발행기관
        page = "Z08";
    else if (niIN(v, "journal/voisDetail") || niIN(v, "Journal/voisDetail")) // 권호상세
        page = "Z09";
    else if (niIN(v, "knowledgeSharing/monthKnowledgeList")) // 지식누림_이달의지식누림
        page = "U01";
    else if (niIN(v, "knowledgeSharing/lastKnowledgeList")) // 지식누림_지난지식누림
        page = "U02";
    else if (niIN(v, "mypage/memberInfoView")) // 마이페이지_프로필관리_회원기본정보
        page = "Q02";
    else if (niIN(v, "mypage/updateMemberView")) // 마이페이지_프로필관리_회원정보수정
        page = "Q03";
    else if (niIN(v, "mypage/authorInfoWrite")) // 마이페이지_프로필관리_저자등록
        page = "Q04";
    else if (niIN(v, "mypage/informSetting")) // 마이페이지_내소식설정
        page = "Q05";
    else if (niIN(v, "mypage/informList")) // 마이페이지_내소식모아보기
        page = "Q06";
    else if (niIN(v, "mypage/buyList")) // 마이페이지_구매내역
        page = "Q07";
    else if (niIN(v, "mypage/moneyUsageList?use=useage")) // 마이페이지_Dbpia머니_사용내역
        page = "Q08";
    else if (niIN(v, "mypage/moneyUsageList")) // 마이페이지_Dbpia머니_충전내역
        page = "Q09";
    else if (niIN(v, "mypage/cartList")) // 마이페이지_장바구니
        page = "Q10";
    else if (niIN(v, "mypage/inquireList")) // 마이페이지_1:1문의답변
        page = "Q11";

    else if (niIN(v, "mypage/inquireWrite")) // 고객센터_1:1문의하기
        page = "S06";
    else if (niIN(v, "mypage/inquireList")) // 고객센터_1:1문의답변
        page = "S07";

    else if (niIN(v, "mypage/")) // 마이페이지_메인
        page = "Q01";
    else if (niIN(v, "snsManage")) // 마이페이지_SNS로그인관리
        page = "Q12";
    else if (niIN(v, "mylib/totalNodeList")) { // 내서재_전체논문
        if (v.indexOf("?folder") == -1)
            page = "R01";
        else
            page = "R02";
    } else if (niIN(v, "mylib/recommendList")) // 내서재_맞춤추천논문
        page = "R03";
    else if (niIN(v, "mylib/historyList")) // 내서재_내가이용한논문
        page = "R04";
    else if (niIN(v, "mylib/reviewMemoManage")) // 내서재_리뷰메모관리
        page = "R05";
    else if (niIN(v, "informSetting")) // 내서재_알림설정
        page = "R06";
    else if (niIN(v, "mylib/quoteSetting")) // 내서재_인용양식설정
        page = "R07";
    else if (niIN(v, "mylib/thesisTipList")) // 내서재_논문작성Tip
        page = "R08";
    else if (niIN(v, "mylib/thesisTipDetail")) // 내서재_논문작성Tip_동영상
        page = "R09";
    else if (niIN(v, "mylib/noteNodeList")) // 내서재_내노트
        page = "R10";
    else if (niIN(v, "notice/noticeList")) // 고객센터_공지사항_목록
        page = "S01";
    else if (niIN(v, "notice/noticeView")) // 고객센터_공지사항_상세
        page = "S02";
    else if (niIN(v, "notice/newsList")) // 고객센터_학회소식_목록
        page = "S03";
    else if (niIN(v, "notice/newsView")) // 고객센터_학회소식_상세
        page = "S04";
    else if (niIN(v, "faq/faqList")) // 고객센터_FAQ
        page = "S05";
    else if (niIN(v, "join/joinAgree")) // 회원가입_약관동의
        page = "T01";
    else if (niIN(v, "join/joinRegister")) // 회원가입_개인정보입력
        page = "T02";
    else if (niIN(v, "member/login")) // 로그인
        page = "T03";
    else if (niIN(v, "member/accFind")) // 아이디 / 비밀번호 찾기
        page = "T04";
    else if (niIN(v, "member/b2bLogin")) // 기관인증
        page = "T05";
    else if (niIN(v, "intro/dbpia")) // Dbpia소개
        page = "T06";
    else if (niIN(v, "trial/trial")) // 트라이얼신청
        page = "T07";
    else if (niIN(v, "trial/enterprise")) // 트라이얼신청
        page = "T13";
    else if (niIN(v, "trial/schoolLibrary")) // 트라이얼신청
        page = "T14";
    else if (niIN(v, "join/facebookMemberChange")) // 페이스북 회원_일반회원으로 전환, 2021.03.10 추가
        page = "T08";
    else if (niIN(v, "join/joinComplete")) // 회원가입 완료, 2021.04.15 추가
        page = "T09";
    else if (niIN(v, "pdfviewer/web/viewer.html") || niIN(v, "pdf/pdfView.do")) // PDF 뷰어(pdf/pdfView.do)
        page = "Z10";
    else if (niIN(v, "pdf/cpViewer")) // 멀티CP 뷰어
        page = "Z11";
    else if (niIN(v, "curation/curationList?bestCode=BN00")) // 논문 큐레이션_주제별 베스트_급상승
        page = "C01";
    else if (niIN(v, "curation/curationList?bestCode=BN01")) // 논문 큐레이션_주제별 베스트_대학교
        page = "C02";
    else if (niIN(v, "curation/curationList?bestCode=BN02")) // 논문 큐레이션_주제별 베스트_직장인
        page = "C03";
    else if (niIN(v, "curation/curationList?bestCode=BN03")) // 논문 큐레이션_주제별 베스트_고등학교
        page = "C04";
    else if (niIN(v, "curation/curationList?bestCode=NA")) // 논문 큐레이션_주제별 베스트_인문학
        page = "C05";
    else if (niIN(v, "curation/curationList?bestCode=NB")) // 논문 큐레이션_주제별 베스트_사회과학
        page = "C06";
    else if (niIN(v, "curation/curationList?bestCode=NC")) // 논문 큐레이션_주제별 베스트_자연과학
        page = "C07";
    else if (niIN(v, "curation/curationList?bestCode=ND")) // 논문 큐레이션_주제별 베스트_공학
        page = "C08";
    else if (niIN(v, "curation/curationList?bestCode=NE")) // 논문 큐레이션_주제별 베스트_의약학
        page = "C09";
    else if (niIN(v, "curation/curationList?bestCode=NF")) // 논문 큐레이션_주제별 베스트_농수해양학
        page = "C10";
    else if (niIN(v, "curation/curationList?bestCode=NG")) // 논문 큐레이션_주제별 베스트_예술체육학
        page = "C11";
    else if (niIN(v, "curation/curationList?bestCode=NH")) // 논문 큐레이션_주제별 베스트_복합학
        page = "C12";
    else if (niIN(v, "curation/curationList?bestCode=CC")) // 논문 큐레이션_세상의 모든 지식
        page = "C13";
    else if (niIN(v, "curation/curationList?bestCode=CD")) // 논문 큐레이션_3분 논문
        page = "C14";
    else if (niIN(v, "curation/curationList?bestCode=CE")) // 논문 큐레이션_주간 급상승
        page = "C15";
    else if (niIN(v, "curation/curationList?bestCode=CF")) // 논문 큐레이션_취업 비법 논문
        page = "C16";
    else if (niIN(v, "community/boardList?menuId=MN_001")) // 커뮤니티_논문TIP
        page = "C17";
    else if (niIN(v, "community/popularList?menuId=MN_004")) // 커뮤니티_인기글
        page = "C18";
    else if (niIN(v, "community/search")) // 커뮤니티_검색
        page = "C19";
    else if (niIN(v, "community/boardView")) // 커뮤니티_게시글
        page = "C20";
    else if (niIN(v, "community/write/")) // 커뮤니티_글쓰기
        page = "C21";
    else if (niIN(v, "community/boardList?menuId=MN_005")) // 커뮤니티_대학원생
        page = "C22";
    else if (niIN(v, "community/boardList?menuId=MN_006")) // 커뮤니티_대학생
        page = "C23";
    else if (niIN(v, "community/boardList?menuId=MN_007")) // 커뮤니티_고교생
        page = "C24";
    else if (niIN(v, "community/")) // 커뮤니티_메인 (제일 큰 범주이기 때문에 다른 페이지 코드를 덮어씌워서 제일 마지막에 넣음)
        page = "C16";
    else if (niIN(v, "join/joinIndex")) // 회원가입_분류
        page = "T10";
    else if (niIN(v, "join/joinRegister2")) // 회원가입_저자회원가입
        page = "T11";
    else if (niIN(v, "member/joinAgreeSns")) // 회원가입_SNS가입
        page = "T12";
    else if (niIN(v, "journal/journal-iprd-search")) // 저널-발행기관 페이지
        page = "D01";
    else if (niIN(v, "mypage/login-history")) // 마이페이지-로그인 내역 관리
        page = "Q14";
    else if (niIN(v, "mypage/regi-b2cCoupon")) // 마이페이지- 이용권 쿠폰 등록
        page = "Q15";
    else if (niIN(v, "b2c-subscription/pay-info")) // 정기구독(개인)
        page = "B01";
    else if (niIN(v, "b2c-subscription/pay-complete")) // B2C 구독권 결제완료
        page = "B02";
    else if (niIN(v, "b2c-subscription/payment")) //B2C 구독 결제 페이지
        page = "B03";
    else if (niIN(v, "pay/contentBuy")) // B2C 상품결제 페이지 - 논문 결제
            page = "B04";
    return page;
}

function fn_statisticsFunctionReject(sttCode, code, b2b, b2c, nodeId) {
    let page = pageCode(document.location.pathname.replace("/", "")); //URL에 따라 공통기능 페이지 코드 변경

    if (b2c == undefined) b2c = "";
    if (b2b == "") b2b = "";

    fetchAPI("/statisticsFunctionRejectJson", "POST", {
        "b": b2b,
        "c": b2c,
        "page": page,
        "code": code,
        "sttCod e": sttCode,
        "nodeId": nodeId
    }).then(result => {
        let data = JSON.parse(result.result);
        console.log(data.SearchQueryResult.Collection[0].DocumentSet);
    }).catch(e => {
        console.error(e);
    });
}

async function sendStatisticsCode(code) {
    await getMeAPI().then((me) => {
        const {b2bId, b2cId} = me;

        fn_statistics(code, b2bId, b2cId);
    });
}

function fn_statistics_call(code, mobileCode) {
    getMeAPI().then((me) => {
        const {b2bId, b2cId} = me;

        function isMobileAgent() {
            const ua = navigator.userAgent;

            return /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua);
        }

        if (mobileCode && isMobileAgent()) {
            fn_statistics(mobileCode, b2bId, b2cId);
        } else {
            fn_statistics(code, b2bId, b2cId);
        }
    });
}

function setStatisticsCode($elem, code, event = "click") {
    if (event === "enter") {
        $elem.addEventListener("keyup", function (e) {
            if (e.key === "Enter") {
                sendStatisticsCode(code);
            }
        });

        return;
    }

    if ($elem.getAttribute('data-statistics-code') === code) {
        return;
    }

    $elem.setAttribute('data-statistics-code', code);

    $elem.addEventListener(event, function (e) {
        sendStatisticsCode(code);
    });
}

/**
 * 기능 이용 통계 코드를 세팅한다.
 */
function setOnClickFnStatisticsCode(selector, code, event = "click") {
    const queryResult = $query(selector);

    if (!queryResult) {
        console.warn("no element found.")
        return;
    }

    // 클래스를 기반으로 select 했을 때
    if (queryResult.length !== undefined) {
        for (const $elem of queryResult) {
            if (!$elem.getAttribute('data-statistics-code')) {
                setStatisticsCode($elem, code, event);
            }
        }

        return;
    }

    // ID 를 기반으로 select 했을 때
    if (!queryResult.getAttribute('data-statistics-code')) {
        setStatisticsCode(queryResult, code, event);
    }
}

/**
 * 동적 기능 이용 통계 코드를 세팅한다.
 */
function setDynamicStatisticsCode(elemId, code) {
    if (!elemId) {
        console.warn("통계 코드를 삽입할 엘리먼트의 ID 가 존재하지 않습니다.");
        return;
    }

    const $elem = $query(`#${elemId}`);

    // 입력된 elemId 의 element 가 존재하지 않는 경우
    if (!$elem) {
        console.warn("no element found.");
        return;
    }

    // ID 를 기반으로 select 했을 때
    if ($elem.getAttribute('data-statistics-code') !== code) {
        $elem.setAttribute('data-statistics-code', code);
    }

    sendStatisticsCode(code);
}

function setOnSelectFnStatisticsCode(selector, codeObj) {
    $query(selector).setAttribute('data-statistics-code', JSON.stringify(codeObj));

    $query(selector).addEventListener("change", function (e) {
        getMeAPI().then((me) => {
            const {b2bId, b2cId} = me;

            fn_statistics(codeObj[e.target.value], b2bId, b2cId);
        });
    });
}