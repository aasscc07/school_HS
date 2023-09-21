var ProxyUrl = (location.host.toLowerCase() != "www.dbpia.co.kr" && location.href.indexOf("www.dbpia.co.kr") > -1) ? ((location.href.indexOf("www.dbpia.co.kr") == 7) ? "http://" + location.host : location.href.substr(0, location.href.indexOf("www.dbpia.co.kr") + 15)) : "";
//테스트 커밋 2021-11-12-2
$(document).ready(function () {
    //오늘 버튼 클릭 시 시작일, 종료일에 오늘 날짜 선택
    $(".today").click(function () {
        $("#pub_datePicker1").datepicker("setDate", new Date());
        $("#pub_datePicker2").datepicker("setDate", new Date());
    });

    //일주일 버튼 클릭 시 시작일에 오늘날짜, 종료일에 오늘기준 일주일 전 날짜 선택
    $(".1week").click(function () {
        var date = new Date();
        date.setDate(date.getDate() - 7);
        $("#pub_datePicker1").datepicker("setDate", date);
        $("#pub_datePicker2").datepicker("setDate", new Date());
    });

    //3개월 버튼 클릭 시 시작일에 오늘날짜, 종료일에 오늘기준 3개월 전 날짜 선택
    $(".3month").click(function () {
        var date = new Date();
        date.setMonth(date.getMonth() - 3);
        $("#pub_datePicker1").datepicker("setDate", date);
        $("#pub_datePicker2").datepicker("setDate", new Date());
    });

    //6개월 버튼 클릭 시 시작일에 오늘날짜, 종료일에 오늘기준 6개월 전 날짜 선택
    $(".6month").click(function () {
        var date = new Date();
        date.setMonth(date.getMonth() - 6);
        $("#pub_datePicker1").datepicker("setDate", date);
        $("#pub_datePicker2").datepicker("setDate", new Date());
    });

    //6개월 버튼 클릭 시 시작일에 오늘날짜, 종료일에 오늘기준 6개월 전 날짜 선택
    $(".alldate").click(function () {
        var date = new Date();
        $("#pub_datePicker1").datepicker("setDate", "");
        $("#pub_datePicker2").datepicker("setDate", "");
    });

    //alert창 확인 클릭 시 다른페이지로 이동하는 로직 제어 팝업
    jQuery.jQueryAlertMove = function (msg, url, color) {
        let btnNm = '확인';
        if (typeof getCookie('language') !== "undefined" &&
            getCookie('language').indexOf("e") !== -1) {
            btnNm = 'OK';
        }

        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        $($messageBox).dialog({
            open: $($messageBox).append(msg),
            title: "경고창",
            autoOpen: true,
            modal: true,
            buttons: [
                {
                    text: btnNm,
                    click: function () {
                        $(this).dialog("close");
                        location.href = url;
                    }
                }
            ]
        })

        $(".ui-dialog").addClass("jQueryAlert");
        $(".ui-dialog").css("margin-top", "-42px");
        if (typeof color !== "undefined") {
            $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1)").css({
                "background-color": color,
                "border": "1px solid " + color
            });
        }
    };

    /*상세 검색  셀렉트 박스 선택 기능*/
    $("#dev_advancedSearchBox").on("click", ".fSelect", function () {
        var $select = $(this).children("select");
        $select.focus();
    });
    /*상세 검색  셀렉트 박스 선택 기능*/
    $("#dev_advancedSearchBox").on("change", ".fSelect select", function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("span").text(select_name);
    });


    //자동로그인, 아이디 저장 체크박스 제어
    /*$("input[type='checkbox']").click(function() {
		$("input[type='checkbox']").not(this).attr("checked", false);
	});*/

    $("#dev_hp_num2, #dev_hp_num3").on("keyup", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ""));
    });

    $("input[name='orcid'],input[name='orc_id']").on("keydown", function (event) {
        var key = event.charCode || event.keyCode || 0;
        $text = $(this);
        if (key !== 8 && key !== 9) {
            if ($text.val().length === 4) {
                $text.val($text.val() + '-');
            }
            if ($text.val().length === 9) {
                $text.val($text.val() + '-');
            }
            if ($text.val().length === 14) {
                $text.val($text.val() + '-');
            }
        }

        return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key >= 65 && key <= 90));
        // Key 8번 백스페이스, Key 9번 탭, Key 46번 Delete 부터 0 ~ 9까지, Key 96 ~ 105까지 넘버패트
        // 한마디로 JQuery 0 ~~~ 9 숫자 백스페이스, 탭, Delete 키 넘버패드외에는 입력못함
    });

    //숫자만 입력 되게 체크
    var numValidCheck = {
        keyDown: function (e) {
            var key;
            if (window.event)
                key = window.event.keyCode; //IE
            else
                key = e.which; //firefox
            var event;
            if (key == 0 || key == 8 || key == 46 || key == 9) {
                event = e || window.event;
                if (typeof event.stopPropagation != "undefined") {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
                return;
            }
            if (key < 48 || (key > 57 && key < 96) || key > 105 || e.shiftKey) {
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
            }
        },
        keyUp: function (e) {
            var key;
            if (window.event)
                key = window.event.keyCode; //IE
            else
                key = e.which; //firefox
            var event;
            event = e || window.event;
            if (key == 8 || key == 46 || key == 37 || key == 39)
                return;
            else
                event.target.value = event.target.value.replace(/[^0-9]/g, "");
        },
        focusOut: function (ele) {
            ele.val(ele.val().replace(/[^0-9]/g, ""));
        }
    };

    $('input:text[numberOnly]').css("ime-mode", "disabled").keydown(function (e) {
        numValidCheck.keyDown(e);
    }).keyup(function (e) {
        numValidCheck.keyUp(e);
    }).focusout(function (e) {
        numValidCheck.focusOut($(this));
    });
    //end 숫자만 입력 되게 체크

    // 한글만 입력가능
    $('input:text[koreanOnly]').css("ime-mode", "disabled").keypress(function (e) {
        var pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*_+=,.;:\"'\\]/g;
        this.value = this.value.replace(pattern, '');
    }).keyup(function (e) {
        var pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*_+=,.;:\"'\\]/g;
        this.value = this.value.replace(pattern, '');
    });

    // 영어만 입력 가능
    $('input:text[engOnly]').css("ime-mode", "disabled").keyup(function (e) {
        var pattern = /[^a-z]|[ \[\]{}()<>?|`~!@#$%^&*_+=,.;:\"'\\]/g;
        this.value = this.value.replace(pattern, '');
    });
});

// 한글, 영어, 하이픈(-) 만 입력가능
$(document).on('keypress, keyup', 'input:text[alt=koreanEnglishOnly]', function (e) {
    $(this).css("ime-mode", "disabled");
    var pattern = /[0-9]|[\[\]{}()<>?|`~!@#$%^&*_+=,.;:\"'\\]/g;
    this.value = this.value.replace(pattern, '');
});

/*유효성 검사 및 치환*/
var ValiObj = {};

ValiObj.exp;
ValiObj.pass;

//전화번호 검증 : 000-0000-0000
ValiObj.mobileVali = function (str) {
    exp = /^\d{3}-\d{3,4}-\d{4}$/;
    pass = false;
    if (!exp.test(str)) {
        alert("휴대폰 번호 형식을 확인 해 주세요");
    } else {
        alert("성공!!");
        pass = true;
    }
    return pass;
}

//ORCID 검증 : 0000-0000-0000-0000
ValiObj.orcidVali = function (str) {
    var rule = /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/;

    if (!rule.test(str)) {
        console.log('11');
        //alert("ORCID 번호 형식을 확인 해 주세요");
        return false;
    }
    return true;
}

//< 또는 > 치환, .js 치환
ValiObj.replace = function (str) {
    var ltReplace = str.replace(/(<)/ig, "&lt");
    var gtReplace = ltReplace.replace(/(>)/ig, "&gt");
    var excReplace = gtReplace.replace(/(.js)/ig, "");
    return excReplace;
}

//패스워드 체크
ValiObj.passChk = function (str) {
    var strArr = [];//문자 배열
    var charCnt = 0;// 갯수 체크
    var numCnt = 0;//숫자 갯수 체크
    var sSymbol = 0;//대문자 갯수 체크

    //#1. 글자수 체크
    if (str.length < 1) {
        //alert("영문, 숫자, 특수문자를 혼용하여 8자이상으로 설정해주세요");
        return false;
    }

    //#2. 배열 생성
    for (var i = 0; i < str.length; i++) {
        strArr.push(str.charCodeAt(i));
    }


    //연속 문자 체크
    for (var i = 0; i <= strArr.length - 3; i++) {
        first = Math.abs(strArr[i] - strArr[i + 1]);
        second = Math.abs(strArr[i + 1] - strArr[i + 2]);
        third = Math.abs(strArr[i] - strArr[i + 2]);
        if (first == 1 && second == 1 && third == 2) {
            $.jQueryAlert("123, abc 등과 같은 연속된 문자는 사용 할 수 없습니다.");
            return false;
        }
    }


    //3 공백 및 문자열 체크
    strArr.forEach(function (c) {
        //공백 체크(32)
        if (c == 32) {
            //alert("비밀번호 안에 공백이 포함 될 수 없습니다.");
            return false;
        }
        //문자 소:(97-122), 대:(65-90) 포함 여부
        if ((c >= 97 && c <= 122) || (c >= 65 && c <= 90)) {
            charCnt++;
        }

        //숫자(48-57)
        if (c >= 48 && c <= 57) {
            numCnt++;
        }

        //특수문자 포함(33-47,58-64,91-95,123,125)
        if ((c >= 33 && c <= 47) || (c >= 58 && c <= 64) || (c >= 91 && c <= 95) || c == 123 || c == 125) {
            sSymbol++;
        }
    });


    if (charCnt < 1 || numCnt < 1 || sSymbol < 1) {
        //alert("영문, 숫자, 특수문자가 최소 1자씩은 들어가 있어야 합니다.");
        return false;
    }


    return true;
}

function replaceTest() {
    var str = $("#test1").val();
    ValiObj.replace(str);
}

function pwVal() {
    var str = $("#pw").val();
    ValiObj.passChk(str);
}

//제휴문의 layer 팝업
function fnContact() {
    $.fn.openLayer('#pub_modalContact');
}

//숫자의 콤마 체크
function commaChk(num) {
    if (num == null) {
        return "0";
    } else {
        if (typeof num === 'number') {
            num = String(num);
        }
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

//화폐일 경우 단위 체크
function wonChk(price, type) {
    if (price.indexOf(',') > -1 && price.indexOf('.') == -1) {
        price += " 원";
    } else if (price.indexOf('.') > -1 && price.indexOf(',') == -1) {
        switch (type) {
            case 1 :
                price = "US $ " + price;
                break;
            default :
                price = "$ " + price;
        }
    } else {
        price += " 원";
    }
    return price;
}


//주석 삭제 체크
function commentChk(str) {
    var replace = str.replace(/(<([^>]+)>)/gi, "");
    return replace;
}

//하이라이트 태그 변형
function highLight(title) {
    title = title.replace(/</gi, "&lt;");
    title = title.replace(/>/gi, "&gt;");
    var hTitle = title.replace(/&lt;!HS&gt;/gi, "<font color='#cc4736'>");
    hTitle = hTitle.replace(/&lt;!HE&gt;/gi, "</font>");
    //sub 태그에 대해서 치환
    hTitle = hTitle.replace(/&lt;SUB&gt;/gi, "<SUB>");
    hTitle = hTitle.replace(/&lt;\/SUB&gt;/gi, "</SUB>");
    //sup 태그에 대해서 치환
    hTitle = hTitle.replace(/&lt;SUP&gt;/gi, "<SUP>");
    hTitle = hTitle.replace(/&lt;\/SUP&gt;/gi, "</SUP>");

    return hTitle;
}


/*null값 빈값으로 변경*/
function ifnull(data) {
    if (data == null || data == "null" || typeof data == "undefined") {
        return "";
    } else {
        return data;
    }
}

//참고: 내 서재 폴더 관리 적용
$("#pub_btnFolderManage").click(function (e) {
    var spreadBool = $(this).hasClass("open");
    if (spreadBool === false) {
        $(this).addClass("open");
        $("#pub_folderManageArea").show();
        $("#pub_folderManageArea").animate({
            "top": "27px",
            opacity: 1
        }, 100);
    } else {
        $(this).removeClass("open");
        $("#pub_folderManageArea").animate({
            "top": "16px",
            opacity: 0,
        }, 100, function () {
            $("#pub_folderManageArea").hide();
        });
    }
    e.preventDefault();

    var selectCnt = 0;
    var selectNmBak = "";

    var columnNm = ",";
    var columnCnt = ",";

    $(".checkButtonActive").each(function (index2, item) {
        if ($(this).is(':checked')) {
            var fNm = $(this).parent().parent().parent().find(".folder_nm").val();
            selectNmBak = selectNmBak + fNm;
            selectCnt++;
        }
    });

    $('.folderChkList').each(function (index1, item) {
        var folder_nm = $(this).text();
        var ch = ".";
        var ddddd = selectNmBak.split("_" + folder_nm + "_");

        if (selectCnt == (ddddd.length - 1) && (ddddd.length - 1) > 0) {
            ch = "checked";
        } else if (selectCnt != (ddddd.length - 1) && (ddddd.length - 1) > 0) {
            ch = "hyphen";
        }
        folder_nm = folder_nm.replace(/\)/gi, '_').replace(/\(/gi, '_');
        if (ch == "checked") {
            $("input[value='" + folder_nm + "']").attr("checked", true);
        } else if (ch == "hyphen") {
            $("input[value='" + folder_nm + "']").parent().parent().find('.fCheck').addClass("hyphen");
        }

    });

});

/* 이용권한 및 북마크 가져오기 */
function getAddItem(nodeId) {
    var items;
    $.ajax({
        url: ProxyUrl + '/search/getAddItem',
        scriptCharset: 'utf-8',
        type: 'post',
        data: {"nodeId": nodeId},
        async: false,
        success: function (data) {
            items = data;
        },
        error: function () {

        }
    });
    return items;
}

/**
 * <p>이용하기 레이어 팝업</p>
 * */
function nodeUse(elem) {
    $.fn.openLayer('#pub_modalBuying');
    const nodeElem = document.getElementById("pub_modalBuying").getElementsByClassName("nodeElem")[0];
    if (typeof elem == "string") {
        nodeElem.value = elem;
        drawDownPrice(elem);
    } else {
        nodeElem.value = elem.value;
        drawDownPrice(elem.value);
    }
}


/**
 * 장바구니 담기
 *
 * @returns
 */
function setCart() {
    if (dev_b2cId_chk === "") {
        $.fn.openLayer('#pub_modalLoginPop');
        return;
    }
    const nodeElem = document.getElementById("pub_modalBuying").getElementsByClassName("nodeElem")[0];
    $.ajax({
        url: ProxyUrl + "/mypage/cartAdd",
        type: "post",
        data: {data: nodeElem.value},
        success: function (d) {
            if (ifnull(d.errCd) !== '') {
                $.jQueryAlert(d.msg);
            } else if (ifnull(d.msg) !== '') {
                $("#cartMsg").text(d.msg);
                $.fn.openLayer('#pub_modalCart');
            } else {
                $.jQueryAlert("에러가 발생했습니다. 다시 시도해주세요.");
            }
        }, error: function (e) {
        }
    });
    $.fn.closeLayer("#pub_modalBuying");
}

/**
 * 해당 논문 구매하기
 *
 */
function buyContent() {
    // 인앱 결제인 경우 결제 프로세스를 중단한다.
    if (isInAppPayment()) {
        return;
    }

    if (dev_b2cId_chk) {
        const nodeElem = document.getElementById("pub_modalBuying").getElementsByClassName("nodeElem")[0];
        let data = nodeElem.value;

        if (ifnull(data) === "") {
            data = $("#dev_preview_nodeId").val();
        }

        const nodeId = data.split("|")[0];
        if (location.hostname === 'localhost' || location.host === 'v2.dbpia.co.kr') {
            moveHref_blank('http://' + location.hostname + '/pay/contentBuy?nodeId=' + nodeId);
        } else {
            moveHref_blank('https://' + location.hostname + '/pay/contentBuy?nodeId=' + nodeId);
        }
    } else {
        $.fn.openLayer('#pub_modalLoginPop');
    }
}


/**
 공통 사용 북마크 - DB 기반
 result :
 flag : add 북마크 추가, del 북마크 지운
 cnt : -1 미로그인 상태로 실패,  북바크 수(0 또는 1)
 msg : 성공 또는 실패 메시지(success OR fail)
 */
function fnNewSetBookmark(nodeId, b2cId) {
    var result = {};
    $.ajax({
        url: ProxyUrl + "/search/newSetBookmark",
        type: "POST",
        data: {"nodeId": nodeId},
        async: false,
        success: function (data) {
            result = data;
        }, error: function (e) {
            result.cnt = 0;
        }
    });
    return result;
}

/**
 * 비로그인 북마크 로그인 시 저장 처리
 * @param nodeId
 * @param flag
 * @returns {
 *     flag : add 북마크 추가, del 북마크 지운
 *     cnt : -1 미로그인 상태로 실패,  북바크 수(0 또는 1)
 *     msg : 성공 또는 실패 메시지(success OR fail) }
 */
fnNotLoginBookmark = function (nodeId, flag, bookMarkCntAll, bookMarkCntCur, bookMarkCnt) {
    var result = {};
    $.ajax({
        url: ProxyUrl + '/search/setNotLoginBookmark',
        type: 'POST',
        data: {
            'nodeId': nodeId,
            'flag': flag,
            'bookMarkCntAll': bookMarkCntAll,
            'bookMarkCntCur': bookMarkCntCur,
            'bookMarkCnt': bookMarkCnt
        },
        async: false,
        success: function (data) {
            result = data;
        }, error: function (e) {
            result.cnt = 0;
        }
    });
    return result;
};

/**
 공통 사용 북마크
 */
function fnSetBookmark(elem, b2cLogin) {
    if (b2cLogin != null && b2cLogin != "") {
        var params = {};
        var $item = $(elem).parentsUntil("li.item").eq(2);
        params.autr = $item.find("li.author input[name='autrList']").val();
        params.node_id = $item.find("span.fCheck input").val();				// ID
        params.node_ttle = commentChk($item.find("div.titWrap h5 a").html()); // TITLE
        params.abst = $item.find("p.abstract.txtEllipsisPureJS").html(); // NODE_ABST

        params.pvnc_nm = $item.find("ul.info li.journal a").html(); // PLCT_NM

        params.pbsh_date = $item.find("ul.info li.date").html(); // PBSH_YY, PBSH_MM
        params.vol = $item.find("ul.info li.volume a").html(); // VOL(ISUE)

        params.page = $item.find("ul.info li.page").html(); // NODE_STAT_PAGE - NODE_END_PAGE
        params.iprd_nm = $item.find("ul.info li.publisher a").html(); // IPRD_NM
        params.doi_code = $item.find("#doi_code").val(); // DOI_CODE
        params.url = $item.find("#url").val(); // PRDT_URL

        if ($(elem).hasClass("selected")) {
            params.flag = 'del';
        } else {
            params.flag = 'add';
        }

        $.ajax({
            url: ProxyUrl + "/search/setBookmark",
            type: "POST",
            data: params,
            success: function (data) {
                if (data.cnt < 0) {
                    $.jQueryAlert(data.msg);
                } else {
                    if (params.flag == 'add') {
                        $(elem).addClass("selected");
                    } else {
                        $(elem).removeClass("selected");
                    }
                }
            },
            error: function (error) {
                //console.log(error);
            }
        });
    } else {
        $.fn.openLayer('#pub_modalLoginPop');
    }

}


/**
 * 검색 엔진 저자 replace 담기
 * */
function authorSplit(id, str, name, inner) {
    var autrArr = str.split("^ ");
    var content = "";
    var lang = getCookie("language");

    for (var i = 0; i < autrArr.length; i++) {
        //if(inner){
        var res1 = autrArr[i].replace("&lt;", '<a href="#" ');
        var res2 = res1.replace(" !!!('',", 'onclick="goArcPage(');
        var res3 = res2.replace("@@@&gt;", ">");
        var res4 = res3.replace(" @#@####", "</a>");
        //}else{
        //	var res1 = autrArr[i];
        //	var res4 = res1.substring(res1.lastIndexOf(";")+1, res1.lastIndexOf(" @"));
        //}

        var names = name.split(";");
        for (var n = 0; n < names.length; n++) {
            var hls = names[n].indexOf("<!HS>");
            if (hls > -1) {
                hls = hls + 5
                var hle = names[n].indexOf("<!HE>");
                var srch_autr = names[n].substring(hls, hle);
                var displayName = res4.substring(res4.indexOf(" >") + 2, res4.lastIndexOf("</a>"));
                if (displayName == srch_autr) {
                    if (res4.indexOf(srch_autr) != -1) {
                        res4 = res4.replace(srch_autr, "<font color='red'>" + srch_autr + "</font>");
                    }
                }
            }
        }

        /*
		if(res4.indexOf(name)!=-1){
			res4 = res4.replace(name,"<font color='red'>"+name+"</font>");
		}
		*/

        if (autrArr.length > 1 && (i < autrArr.length - 1)) {
            if (i < 2) {
                res4 += ", ";
            }
        }

        if (i == 2 && autrArr.length > 3) {
            if (lang != null && lang.indexOf('e') > -1) {
                res4 += " and others " + (autrArr.length - 3);
            } else {
                res4 += " 외 " + (autrArr.length - 3) + "명";
            }
            content += res4;
            break;
        }
        content += res4;
    }
    return content;
}


/**
 * 검색 엔진 저자 출력
 * */
function authorprint() {
    contentArr.forEach(function (obj) {
        $("#" + obj.id).html(obj.content);
    });
    contentArr = [];
}


/**
 * <p>인용하기</p>
 */
function fnQuoteDownload(type) {
    var node_id = $("#dev_node_id").val(); //논문목록에서 인용하기 버튼 선택했을때 node_id 값
    var cttn_div_code = $("#quote_type").val(); //관리자 인용양식인지 사용자 인용양식인지 구분
    var cttn_stle_id = $("#dev_sel_quote").val(); //선택된 인용양식 id
    var chkField = $(".checkButtonActive"); //체크버튼
    var checkedseq = ""; //체크된 논문 번호
    var checkedCount = 0;
    /*var lang = $("input:radio[name='choice']:checked").val(); //사용언어*/

    let lang = '';

    //인용하기 팝업을 열때, 기존에 저장해둔 인용하기 언어가 세팅됨
    //세팅된 언어 값이 없다면, 쿠키를 기준으로 언어를 세팅함
    if (!$("#dev_lang").val()) {

        lang = getCookie("language");

        //쿠키마저 없다면, 국문으로 설정
        if (lang == undefined) {

            lang = "ko_KR";
        }

    } else {

        lang = $("#dev_lang").val();
    }

    var quote_type = ""; //인용양식 코드
    if (cttn_div_code == "414003" || cttn_div_code == "414002" || cttn_div_code == "") {
        //$("#quote_type").val("N"); //APA 타입일때와 관리자 타입일 때 인용양식 타입 관리자로 셋팅
        quote_type = "N"; //APA 타입일때와 관리자 타입일 때 인용양식 타입 관리자로 셋팅
    } else {
        //$("#quote_type").val("Y"); //사용자 인용양식일 때 인용양식 타입 사용자로 셋팅
        quote_type = "Y"; //사용자 인용양식일 때 인용양식 타입 사용자로 셋팅
    }


    if (chkField.length == 0) {

    } else {
        if (chkField) {
            if (chkField.length > 0) {
                for (var i = 0; i < chkField.length; i++) {
                    if (chkField[i].checked) {
                        checkedseq += ((checkedCount == 0 ? "" : ";") + chkField[i].value);
                        checkedCount++;
                    }
                }
            }
        }
    }


    if (node_id != '') { //논문목록에서 인용양식 버튼 선택했을때 node_id 셋팅(인용눈문이 하나일때)
        checkedseq = node_id;
    }
    //히스토리 테이블에 등록
    $.ajax({
        type: "POST",
        url: ProxyUrl + "/mylib/setQuoteHistory",
        data: {"cttnStleId": cttn_stle_id, "quote_type": quote_type, "cttnDivCode": cttn_div_code, "quote_lang": lang},
        async: false,
        success: function (data) {
        }
    });

    //1: 클립보드복사, 2: html, 3: txt, 4: endnote, 5: refworks, 6: mendeley, 7: scholar's aid, 8: bibtex, 9: excel, 10: 아래아한글
    if (type == 1 || type == 2 || type == 3) {
        $.ajax({
            type: "POST",
            url: ProxyUrl + "/mylib/getQuoteNodeList",
            data: {"node_id": checkedseq, "cttnStleId": cttn_stle_id, "quote_lang": lang, "quote_type": quote_type},
            async: false,
            success: function (data) {


                var contents = "";
                if (type === '2') {
                    contents += '<!DOCTYPE html><head><meta charset="UTF-8"></head>'
                }
                $.each(data, function (idx, val) {
                    contents += val + "\n";
                });

                if (type == 1) {
                    contents = contents.replace(/<ITLC style='font-style:italic'>/g, '').replace(/<\/ITLC>/g, '');
                }

                $("#dev_textarea").html(contents);
            }
        });
    } else if (type == 9) {
        $.fn.closeLayer("#pub_modalQuoteThesis"); //다운로드시 modal 닫음
        $("#dev_quote_node_id").val(checkedseq);
        $("#dev_lang").val(lang);

        $("#quoteForm").attr("action", "/mylib/quoteExcelDownload");
        $("#quoteForm").submit();

    } else {

        $.ajax({
            type: "POST",
            url: ProxyUrl + "/mylib/nodeDownForm",
            data: {"node_id": checkedseq, "quote_lang": lang},
            async: false,
            success: function (data) {

                var contents = "";
                if (lang == "K" || lang == "ko_KR") {
                    lang = "한국어";
                } else {
                    lang = "English";
                }
                $.each(data, function (idx, val) {
                    var plct_nm = '';

                    if (ifnull(val.pvnc_nm) != '') {
                        plct_nm = val.pvnc_nm;
                    }
                    if (ifnull(val.plct_nm) != '') {
                        plct_nm = val.plct_nm;
                    }
                    var pbsh_date = "";
                    if (ifnull(val.pbsh_yy) != "") {
                        pbsh_date += ifnull(val.pbsh_yy);
                    }
                    if (ifnull(val.pbsh_mm) != "") {
                        pbsh_date += "." + ifnull(val.pbsh_mm);
                    }
                    var volisue = "";
                    if (ifnull(val.vol) != "") {
                        volisue += " 제" + ifnull(val.vol) + "권";
                    }
                    if (ifnull(val.isue) != "") {
                        volisue += " 제" + ifnull(val.isue) + "호";
                    }
                    if (type == 7) {
                        var dataDivCode = val.data_div_code;
                        if (dataDivCode == "025001") {
                            contents += "TY  - JOUR" + "\n";
                        } else if (dataDivCode == "025002") {
                            contents += "TY  - COMF" + "\n";
                        } else if (dataDivCode == "025003") {
                            contents += "TY  - MGZN" + "\n";
                        } else if (dataDivCode == "025004") {
                            contents += "TY  - RPRT" + "\n";
                        } else if (dataDivCode == "025005") {
                            contents += "TY  - GEN" + "\n";
                        }
                        contents += "TI - " + ifnull(val.node_ttle) + "\n"; //제목
                        contents += "TT - " + ifnull(val.node_ttle_equal) + "\n"; //대등제
                        contents += "AB - " + ifnull(val.abst) + "\n"; //초록
                        if (type == 7) {
                            if (ifnull(val.autr_nm) != '') {
                                var autr_nm = val.autr_nm.split(';');
                                for (var i = 0; i < autr_nm.length; i++) {
                                    contents += "AU - " + autr_nm[i] + "\r\n"; //저자
                                }
                            }
                        } else {
                            contents += "AU - " + ifnull(val.autr_nm) + "\n"; //저자
                        }
                        contents += "DB - DBpia" + "\n";
                        contents += "DP - 누리미디어" + "\n";
                        contents += "JO - " + plct_nm + "\n"; //저널명
                        contents += "SN - " + ifnull(val.issn) + "\n"; //IBSN or ISSN
                        contents += "VL - " + ifnull(val.vol) + "\n"; //권
                        contents += "IS - " + ifnull(val.isue) + "\n"; //호
                        contents += "SP - " + ifnull(val.frst_page) + "\n"; //시작페이지
                        contents += "EP - " + ifnull(val.end_page) + "\n"; //종료페이지
                        if (ifnull(val.kwd) != '') {
                            var keyword = val.kwd.split(';');
                            for (var i = 0; i < keyword.length; i++) {
                                contents += "KW - " + keyword[i] + "\n"; //키워드
                            }
                        }
                        contents += "LA - " + lang + "\n"; //작성언어
                        contents += "PB - " + ifnull(val.iprd_nm) + "\n"; //발행기관명
                        contents += "PY - " + ifnull(val.pbsh_yy) + "/" + ifnull(val.pbsh_mm) + "\n"; //발행년월
                        contents += "UR - " + "http://www.dbpia.co.kr/journal/articleDetail?nodeId=" + val.node_id + "\n" + "\n"; //url
                    } else if (type == 5) {
                        if (val.data_div_code == "025001" || val.data_div_code == "025012") {
                            contents += "RT  Journal Article" + "\r\n"; //논문종류
                        } else if (val.data_div_code == "025002") {
                            contents += "RT  Conference Proceedings" + "\r\n"; //논문종류
                        } else if (val.data_div_code == "025004") {
                            contents += "RT  Report" + "\r\n"; //논문종류
                        } else if (val.data_div_code == "025003") {
                            contents += "RT  Magazine Article" + "\r\n"; //논문종류
                        }
                        contents += "SR  Electronic(1) \r\n" //SR
                        contents += "ID  " + ifnull(val.node_id) + "\r\n"; //논문번호
                        if (ifnull(val.autr_nm) != '') {
                            var autr_nm = val.autr_nm.split(';');
                            for (var i = 0; i < autr_nm.length; i++) {
                                contents += "A1  " + autr_nm[i] + "\r\n"; //저자
                            }
                        } else {
                            contents += "A1  " + "\r\n"; //저자
                        }
                        contents += "T1  " + ifnull(val.node_ttle) + "\r\n"; //제목
                        contents += "JF  " + plct_nm + "\r\n"; //저널명
                        contents += "YR  " + ifnull(val.pbsh_yy) + "\r\n"; //발행년도
                        contents += "FD  " + ifnull(val.pbsh_yy) + "/" + ifnull(val.pbsh_mm) + "\r\n"; //발행년월
                        contents += "VO  " + ifnull(val.vol) + "\r\n"; //권
                        contents += "IS  " + ifnull(val.isue) + "\r\n"; //호
                        contents += "SP  " + ifnull(val.frst_page) + "\r\n"; //시작페이지
                        contents += "OP  " + ifnull(val.end_page) + "\r\n"; //종료페이지
                        if (ifnull(val.kwd) != '') {
                            var keyword = val.kwd.split(';');
                            for (var i = 0; i < keyword.length; i++) {
                                contents += "K1 " + keyword[i] + "\n"; //키워드
                            }
                        }
                        contents += "AB  " + ifnull(val.abst) + "\r\n"; //초록
                        contents += "PB  " + ifnull(val.iprd_nm) + "\r\n"; //발행기관명
                        contents += "SN  " + ifnull(val.issn) + "\r\n"; //ISSN
                        contents += "CL  " + ifnull(val.rsrh_info) + "\r\n"; //주제어
                        contents += "UL  " + "http://www.dbpia.co.kr/journal/articleDetail?nodeId=" + val.node_id + "\r\n"; //url
                        contents += "LA  " + lang + "\r\n"; //작성언어
                        contents += "\r\n"; //구분자
                        $("textarea[name='ImportData']").html(contents);
                    } else if (type == 8) {
                        contents += "@article{" + val.node_id + "," + "\n";
                        contents += "author={" + val.autr_nm.replace(/;/, ',') + "}," + "\n";
                        contents += "title={{" + val.node_ttle + "}}," + "\n";
                        contents += "booltitle={{" + plct_nm + volisue + "}}," + "\n";
                        contents += "journal={{" + plct_nm + "}}," + "\n";
                        contents += "volume={{" + val.vol + "}}," + "\n";
                        contents += "issue={{" + val.isue + "}}," + "\n";
                        contents += "publisher={" + val.iprd_nm + "}," + "\n";
                        contents += "year={" + val.pbsh_yy + "}," + "\n";
                        contents += "ISSN={{" + val.issn + "}}," + "\n";
                        contents += "abstract={{" + val.abst + "}}," + "\n";
                        contents += "pages={" + val.frst_page + "-" + val.end_page + "}," + "\n";
                        contents += "url={" + "http://www.dbpia.co.kr/journal/articleDetail?nodeId=" + val.node_id + "}}" + "\n";
                    } else if (type == 10) {

                        /*contents += '<?xml version="1.0" encoding="UTF-8"?>\n';
						contents += '<b:Sources xmlns="http://schemas.openxmlformats.org/officeDocument/2006/bibliography" xmlns:b="http://schemas.openxmlformats.org/officeDocument/2006/bibliography" Version="6" StyleName="APA" SelectedStyle="BibStyle_APA6.xml"> \n';
						contents += '<b:Source>\n';
						contents += '<b:Tag>' + plct_nm +'</b:Tag>';
						contents += '</b:Source>\n';
						contents += '</b:Source>\n';*/
                    }
                });
                $("#dev_textarea").html(contents);
            }
        });
    }


    //1:클립보드복사
    if (type == 1) {
        $("#dev_textarea").select();
        document.execCommand('copy');
        $.jQueryAlert("<b>" + $("#dev_sel_quote_nm").val() + "</b> 양식으로 복사되었습니다.<br/>논문을 인용할 위치에 붙여넣기 하세요.");
    } else if (type == 5) {
        var refWin = window.open('about:blank', 'refworks');
        var frm = ExportRWForm;
        frm.target = "refworks";
        frm.submit();
    } else if (type == 2 || type == 3 || type == 4 || type == 6 || type == 7 || type == 8 || type == 10) {
        $("#dev_quote_node_id").val(checkedseq);
        if (type == 2) {
            $("#dev_contents").val($("#dev_textarea").text().replace("\n", "<br/>"));
        } else {
            //클립보드복사, html 제외 하고 이탤릭 태그 삭제
            $("#dev_contents").val($("#dev_textarea").text().replace(/<ITLC style='font-style:italic'>/g, '').replace(/<\/ITLC>/g, ''));
        }
        $("#dev_type").val(type); //다운로드 타입

        $("#dev_lang").val(lang); //다운로드 언어

        $("#quoteForm").attr("action", "/mylib/fileDownload");
        $("#quoteForm").submit();
    }

    $.fn.closeLayer("#pub_modalQuoteThesis"); //다운로드시 modal 닫음

}

/**
 * <p>내서재 인용하기</p>
 * */
function fnMyLibQuoteDownload(type) {
    var thesis_id = $("#dev_thesis_id").val(); //내서재 논문아이디
    var cttn_div_code = $("#quote_type").val(); //관리자 인용양식인지 사용자 인용양식인지 구분
    var cttn_stle_id = $("#dev_sel_quote").val(); //선택된 인용양식 id
    var chkField = $(".checkButtonActive"); //체크버튼
    var checkedseq = ""; //체크된 내서재 번호
    var checkedCount = 0;
    var lang = $("input:radio[name='choice']:checked").val();
    var quote_type = ""; //인용양식 코드
    if (cttn_div_code == "414003" || cttn_div_code == "414002") {
        quote_type = "N"; //APA 타입일때와 관리자 타입일 때 인용양식 타입 관리자로 셋팅
    } else {
        quote_type = "Y"; //사용자 인용양식일 때 인용양식 타입 사용자로 셋팅
    }
    $("#data_type").val("mynode");
    if (chkField) {
        if (chkField.length > 0) {
            for (var i = 0; i < chkField.length; i++) {
                if (chkField[i].checked) {
                    checkedseq += ((checkedCount == 0 ? "" : ";") + chkField[i].value);
                    checkedCount++;
                }
            }
        }
    }

    if (thesis_id != '') { //논문목록에서 인용양식 버튼 클릭했을때 내서재 논문번호 셋팅
        checkedseq = thesis_id;
    }
    //히스토리 테이블에 등록
    $.ajax({
        type: "POST",
        url: ProxyUrl + "/mylib/setQuoteHistory",
        data: {"cttnStleId": cttn_stle_id, "quote_type": quote_type, "cttnDivCode": cttn_div_code},
        async: false,
        success: function (data) {
        }
    });

    console.log(checkedseq);
    console.log(cttn_stle_id);
    console.log(lang);
    console.log(quote_type);

    //1: 클립보드복사, 2: html, 3: txt, 4: endnote, 5: refworks, 6: mendeley, 7: scholar's aid, 8: bibtex, 9: excel
    if (type == 1 || type == 2 || type == 3) {
        $.ajax({
            type: "POST",
            url: ProxyUrl + "/mylib/getMyLibQuoteNodeList",
            data: {
                "thesis_info_id": checkedseq,
                "cttnStleId": cttn_stle_id,
                "quote_lang": lang,
                "quote_type": quote_type
            },
            async: false,
            success: function (data) {
                var contents = "";
                if (type === '2') {
                    contents += '<!DOCTYPE html><head><meta charset="UTF-8"></head>'
                }
                $.each(data, function (idx, val) {
                    contents += val + "\n";
                });
                if (type == 1) {
                    contents = contents.replace(/<ITLC style='font-style:italic'>/g, '').replace(/<\/ITLC>/g, '');
                }
                $("#dev_textarea").html(contents);
            }
        });
    } else if (type == 9) {
        $.fn.closeLayer("#pub_modalQuoteThesis"); //다운로드시 modal 닫음
        $("#dev_quote_node_id").val(checkedseq);
        $("#dev_lang").val(lang);

        $("#quoteForm").attr("action", "/mylib/quoteExcelDownload");
        $("#quoteForm").submit();
    } else {
        $.ajax({
            type: "POST",
            url: ProxyUrl + "/mylib/myNodeDownForm",
            data: {"thesis_info_id": checkedseq, "lang": lang},
            async: false,
            success: function (data) {
                var contents = "";
                if (lang == "K") {
                    lang = "한국어";
                } else {
                    lang = "English";
                }
                $.each(data, function (idx, val) {
                    if (val != null) {
                        if (type == 4 || type == 6) {
                            var dataDivCode = val.data_div_code;
                            if (dataDivCode == "025001") {
                                contents += "TY  - JOUR" + "\n";
                            } else if (dataDivCode == "025002") {
                                contents += "TY  - CONF" + "\n";
                            } else if (dataDivCode == "025003") {
                                contents += "TY  - MGZN" + "\n";
                            } else if (dataDivCode == "025004") {
                                contents += "TY  - RPRT" + "\n";
                            } else if (dataDivCode == "025005") {
                                contents += "TY  - GEN" + "\n";
                            } else if (dataDivCode == "505001") {
                                contents += "TY  - JOUR" + "\n";
                            } else if (dataDivCode == "505002") {
                                contents += "TY  - THES" + "\n";
                            } else if (dataDivCode == "505003") {
                                contents += "TY  - Book" + "\n";
                            } else if (dataDivCode == "505004") {
                                contents += "TY  - ELEC" + "\n";
                            }
                            contents += "T1  - " + ifnull(val.node_ttle) + "\n"; //제목
                            contents += "TT  - " + "\n"; //저널영문명
                            contents += "AB  - " + ifnull(val.abst) + "\n"; //초록
                            if (ifnull(val.autr_nm) != '') {
                                var autr_nm = val.autr_nm.split(',');
                                for (var i = 0; i < autr_nm.length; i++) {
                                    contents += "A1  - " + autr_nm[i] + "\r\n"; //저자
                                }
                            }
                            contents += "DB  - DBpia" + "\n";
                            contents += "DP  - 누리미디어" + "\n";
                            if (lang == "English") {
                                contents += "JO  - " + ifnull(val.iprd_nm) + "\n"; //저널명
                                contents += "SN  - " + ifnull(val.issn) + "\n"; //IBSN or ISSN
                            } else {
                                contents += "JO  - " + ifnull(val.pvnc_nm) + "\n"; //저널명
                                contents += "SN  - " + "\n"; //IBSN or ISSN
                            }
                            contents += "VL  - " + ifnull(val.vol) + "\n"; //권
                            if (ifnull(val.isue) == '' && ifnull(val.vol) == '' && ifnull(val.cnum_vol) != '') {
                                contents += "IS  - " + ifnull(val.cnum_vol) + "\n"; //통권
                            } else {
                                contents += "IS  - " + ifnull(val.isue) + "\n"; //호
                            }
                            contents += "SP  - " + ifnull(val.frst_page) + "\n"; //시작페이지
                            contents += "EP  - " + ifnull(val.end_page) + "\n"; //종료페이지
                            if (ifnull(val.kwd) != '') {
                                var keyword = val.kwd.split(';');
                                for (var i = 0; i < keyword.length; i++) {
                                    contents += "KW - " + keyword[i] + "\n"; //키워드
                                }
                            }
                            contents += "LA  - " + lang + "\n"; //작성언어
                            contents += "PB  - " + ifnull(val.iprd_nm) + "\n"; //발행기관명
                            contents += "PY  - " + ifnull(val.pbsh_yy) + "/" + ifnull(val.pbsh_mm) + "\n"; //발행년월
                            contents += "UR  - " + "http://www.dbpia.co.kr/journal/articleDetail?nodeId=" + val.node_id + "\n"; //url
                            contents += "DO  - " + ifnull(val.doi_info) + "\n"; //DOI
                            contents += "ER  - " + "\n\n";
                        } else if (type == 7) {
                            var dataDivCode = val.data_div_code;
                            if (dataDivCode == "025001") {
                                contents += "TY  - JOUR" + "\n";
                            } else if (dataDivCode == "025002") {
                                contents += "TY  - COMF" + "\n";
                            } else if (dataDivCode == "025003") {
                                contents += "TY  - MGZN" + "\n";
                            } else if (dataDivCode == "025004") {
                                contents += "TY  - RPRT" + "\n";
                            } else if (dataDivCode == "025005") {
                                contents += "TY  - GEN" + "\n";
                            }
                            contents += "TI - " + ifnull(val.node_ttle) + "\n"; //제목
                            contents += "TT - " + "\n"; //저널영문명
                            contents += "AB - " + ifnull(val.abst) + "\n"; //초록
                            contents += "AU - " + ifnull(val.autr_nm) + "\n"; //저자
                            contents += "DB - DBpia" + "\n";
                            contents += "DP - 누리미디어" + "\n";
                            contents += "JO - " + ifnull(val.pvnc_nm) + "\n"; //저널명
                            contents += "SN - " + "\n"; //IBSN or ISSN
                            contents += "VL - " + ifnull(val.vol) + "\n"; //권
                            contents += "IS - " + ifnull(val.isue) + "\n"; //호
                            contents += "SP - " + ifnull(val.frst_page) + "\n"; //시작페이지
                            contents += "EP - " + ifnull(val.end_page) + "\n"; //종료페이지
                            contents += "KW - " + "\n"; //키워드
                            contents += "LA - " + lang + "\n"; //작성언어
                            contents += "PB - " + ifnull(val.iprd_nm) + "\n"; //발행기관명
                            contents += "PY - " + ifnull(val.pbsh_yy) + "/" + ifnull(val.pbsh_mm) + "\n"; //발행년월
                            contents += "UR - " + ifnull(val.url) + "\n" + "\n"; //url
                        } else if (type == 5) {
                            if (val.data_div_code == "025001" || val.data_div_code == "025012") {
                                contents += "RT  Journal Article" + "\r\n"; //논문종류
                            } else if (val.data_div_code == "025002") {
                                contents += "RT  Conference Proceedings" + "\r\n"; //논문종류
                            } else if (val.data_div_code == "025004") {
                                contents += "RT  Report" + "\r\n"; //논문종류
                            } else if (val.data_div_code == "025003") {
                                contents += "RT  Magazine Article" + "\r\n"; //논문종류
                            } else {
                                contents += "RT  " + "\r\n"; //논문종류
                            }
                            contents += "SR  Electronic(1) \r\n" //SR
                            contents += "ID  " + ifnull(val.node_id) + "\r\n"; //논문번호
                            if (ifnull(val.autr_nm) != '') {
                                var autr_nm = val.autr_nm.split(',');
                                for (var i = 0; i < autr_nm.length; i++) {
                                    contents += "A1  " + autr_nm[i] + "\r\n"; //저자
                                }
                            } else {
                                contents += "A1  " + "\r\n"; //저자
                            }
                            contents += "T1  " + ifnull(val.node_ttle) + "\r\n"; //제목
                            contents += "JF  " + ifnull(val.pvnc_nm) + "\r\n"; //저널명
                            contents += "YR  " + ifnull(val.pbsh_yy) + "\r\n"; //발행년도
                            contents += "FD  " + ifnull(val.pbsh_yy) + "/" + ifnull(val.pbsh_mm) + "\r\n"; //발행년월
                            contents += "VO  " + ifnull(val.vol) + "\r\n"; //권
                            contents += "IS  " + ifnull(val.isue) + "\r\n"; //호
                            contents += "SP  " + ifnull(val.frst_page) + "\r\n"; //시작페이지
                            contents += "OP  " + ifnull(val.end_page) + "\r\n"; //종료페이지
                            contents += "AB  " + ifnull(val.abst) + "\r\n"; //초록
                            contents += "PB  " + ifnull(val.iprd_nm) + "\r\n"; //발행기관명
                            contents += "UL  " + "http://www.dbpia.co.kr/journal/articleDetail?nodeId=" + val.node_id + "\r\n"; //url
                            contents += "LA  " + lang + "\r\n"; //작성언어
                            contents += "\r\n" + "\r\n";
                            $("textarea[name='ImportData']").html(contents);
                        } else if (type == 8) {
                            contents += "@article{" + ifnull(val.node_id) + "," + "\n";
                            contents += "author={" + ifnull(val.autr_nm) + "}," + "\n";
                            contents += "title={{" + ifnull(val.node_ttle) + "}}," + "\n";
                            contents += "booltitle={{" + ifnull(val.pvnc_nm) + " 제" + ifnull(val.vol) + "권 제" + ifnull(val.isue) + "호" + "}}," + "\n";
                            contents += "journal={{" + ifnull(val.pvnc_nm) + "}}," + "\n";
                            contents += "volume={{" + ifnull(val.vol) + "}}," + "\n";
                            contents += "issur={{" + ifnull(val.isue) + "}}," + "\n";
                            contents += "publisher={" + ifnull(val.iprd_nm) + "}," + "\n";
                            contents += "year={" + ifnull(val.pbsh_yy) + "}," + "\n";
                            contents += "pages={" + ifnull(val.frst_page) + "-" + ifnull(val.end_page) + "}," + "\n";
                            contents += "url={" + "http://www.dbpia.co.kr/journal/articleDetail?nodeId=" + val.node_id + "}}" + "\n";
                        }
                    }

                });
                $("#dev_textarea").html(contents);
            }
        });
    }


    //1:클립보드복사
    if (type == 1) {
        $("#dev_textarea").select();
        document.execCommand('copy');
        $.fn.closeLayer("#pub_modalQuoteThesis"); //복사후 modal 닫음
        $.jQueryAlert("<b>" + $("#dev_sel_quote_nm").val() + "</b> 양식으로 복사되었습니다.<br/>논문을 인용할 위치에 붙여넣기 하세요.");
    } else if (type == 5) {
        var refWin = window.open('about:blank', 'refworks');
        var frm = ExportRWForm;
        frm.target = "refworks";
        frm.submit();
        $.fn.closeLayer("#pub_modalQuoteThesis"); //다운로드시 modal 닫음
    } else if (type == 2 || type == 3 || type == 4 || type == 6 || type == 7 || type == 8 || type == 10) {
        $.fn.closeLayer("#pub_modalQuoteThesis"); //다운로드시 modal 닫음
        $("#dev_quote_node_id").val(checkedseq);
        if (type == 2) {
            $("#dev_contents").val($("#dev_textarea").text().replace(/\n/g, "<br/>"));
        } else {
            //클립보드복사, html 제외 하고 이탤릭 태그 삭제
            $("#dev_contents").val($("#dev_textarea").text().replace(/<ITLC style='font-style:italic'>/g, '').replace(/<\/ITLC>/g, ''));
        }
        $("#dev_type").val(type); //다운로드 타입

        $("#quoteForm").attr("action", "/mylib/fileDownload");
        $("#quoteForm").submit();
    }

}

//PDF VIEW
function fnPdfView(node_id) {
    if (dev_b2bId_chk !== "" || dev_b2cId_chk !== "") {
        const param = {};
        param.depth = "Article";
        param.shape = "pdf";
        param.systemCode = "";
        param.nodeId = node_id;
        param.authSessionCreate = "N";
        let authCheck = downloadAuthCheck(param);
        if (authCheck) {
            const node_url = ProxyUrl + "/pdf/pdfView.do?nodeId=" + node_id;
            if (navigator.appVersion.indexOf('Chrome') === -1) {
                const targetName = "popPdf" + node_id;
                const referLink = document.createElement('a');
                referLink.href = node_url;
                referLink.target = targetName;
                document.body.appendChild(referLink);
                referLink.click();
            } else {
                if (authCheck.isMobileFreeNode === "Y" && ifnull(authCheck.msg) !== "") {
                    const msgLenMiddle = authCheck.msg.length / 2;
                    $.jQueryAlert([authCheck.msg.slice(0, msgLenMiddle), "<br>", authCheck.msg.slice(msgLenMiddle)].join(''));
                } else {
                    window.open(node_url, "popPdf" + node_id);
                }
            }
        }
    } else {
        $.fn.openLayer('#pub_modalLoginPop');
    }
}

//미리보기
function fnPreView(elem, nodeId) {

    $("#pub_modalQuickView").css({"top": "25%", "left": "25%"});
    var title = $(elem).parentsUntil("li.item").find("div.titWrap h5 a").html();

    if (title == null) {
        title = $("#dev_node_title").html();
    }
    $("#dev_title").html(title);

    $("#pub_comtBox").attr("data", nodeId + "|");
    $("#dev_preview_nodeId").val(nodeId + "|");
    $.ajax({
        url: ProxyUrl + '/pdf/preView',
        data: {
            'nodeId': nodeId
        },
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.msg !== "") {
                $.fn.closeLayer("#pub_modalQuickView");
                $.jQueryAlert(data.msg);
            } else {
                drawPreViewPrice(nodeId); //가격정보 입력
                mobileFreeNodeFn(nodeId)// 모바일 무료논문 관련
                $.fn.openLayer("#pub_modalQuickView");
                $("#dev_total_page").html(data.total);
                var content = "";
                for (var i = 1; i <= data.end; i++) {
                    content += "<li class='quickViewItem'>";
                    content += "<p class='img'><img src='" + data.url + "&page=" + i + "'></p>";
                    content += "<p class='pageNum'>" + i + " page</p>";
                    content += "</li>";
                }
                $("#dev_imgList").empty();
                $("#dev_imgList").append(content);
            }

        }, error: function (e) {
            //console.log(e);
        }
    });

}

//로딩 시작
function loadingOpen() {
    $("body").mLoading({
        icon: ProxyUrl + "/assets/mloading/loading.gif",
        text: "Loading..."
    });
}

//로딩 종료
function loadingClose() {
    $("body").mLoading('hide');
}

//로그인 팝업
function fnLoginLayer() {
    $.fn.openLayer('#pub_modalLoginPop', 1061);
}

//링크 이동
function fnLinkGo(url, nodeId) {
    multiCPStatics(nodeId, url);
}

//멀티CP 통계
function multiCPStatics(nodeId, url) {
    console.log(nodeId, url);
    $.ajax({
        type: "get",
        url: "/journal/multCpStatics",
        data: {"nodeId": nodeId},
        success: function (d) {

        }
    });
    window.open(url, "_blank");
}


//오늘 날짜 가져 오기
function fnGetdate(token) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    var today = "";
    if (token == null) {
        today = year.toString() + month.toString() + day.toString();
    } else {
        today = year + token + month + token + day;
    }
    return today;
}

//내서재 폴더리스트
function fnFolderList() {
    var b2bLogin = dev_b2bId_chk;
    var b2cLogin = dev_b2cId_chk;
    var lo = getCookie("language");
    var lang = "k";
    if (getCookie("language") != null && getCookie("language").indexOf("e") > -1) {
        lang = "e";
    }
    $.ajax({
        type: "POST",
        url: ProxyUrl + "/mylib/folderList",
        success: function (data) {
            fnFolederMenuSet(data);
        }
    });
}

//내서재 폴더 다시그리기(좌측메뉴)
function fnFolederMenuSet(data) {
    $("#dev_slimDiv").empty();

    if (data.length > 0) {
        var folderMenuList = '<div class="slimScrollWrap" style="overflow-y: hidden; width: auto;">';
        folderMenuList += '<ul>';

        $.each(data, function (idx, val) {
            folderMenuList += '<li onclick="fnSelectFolder(\'' + val.folder_id + '\')" id="droppable' + val.folder_id + '" class="ui-droppable">';
            folderMenuList += '<a href="/mylib/totalNodeList?folder=' + val.folder_id + '" class="SCMenu">' + val.folder_nm + ' (' + val.node_cnt + ')';
            folderMenuList += '</li>';
        });

        folderMenuList += '</ul>';
        folderMenuList += '</div>';

        $("#dev_slimDiv").append(folderMenuList);
    }

    $('.slimScrollWrap').slimScroll({
        height: '',
        size: '4px',
        color: '#fff',
        alwaysVisible: true,
        railVisible: true,
        railColor: '#bfbfbf',
        railOpacity: 1
    });

    var num = $(".slimScrollWrap ul").find("li").length;
    if (num < 6) {
        $(".slimScrollBar").css({"opacity": "0"});
        $(".slimScrollRail").css({"opacity": "0"});
    }

    var num = $(".slimScrollWrap ul").find("li").length;
    if (num < 6) {
        $(".slimScrollBar").css({"opacity": "0"});
        $(".slimScrollRail").css({"opacity": "0"});
    }
    fnDrag();
}

//다운로드
function download(nodeId, systemCode) {
    let param = {};

    let lang = "ko";
    if (getCookie("language") != null && getCookie("language").indexOf("en") > -1) {
        lang = "en";
    }

    param.nodeId = nodeId;
    param.systemCode = systemCode;
    param.depth = "Article";
    param.shape = "download";

    if (researchYN === "Y" && researchCnt < 1) {
        console.log();
        $.jQueryAlert("남은 논문 수가 부족하여 선택하신 논문을 저장하실 수 없습니다.");
        return false;
    }

    let authCheck = downloadAuthCheck(param);

    if (authCheck) {
        if (authCheck.link !== "") {
            let articleName = authCheck.articleName;
            if (lang === "en" && ifnull(authCheck.articleNameEn) !== "") {
                articleName = authCheck.articleNameEn;
            }
            mobileAppNodeDown(authCheck.link, articleName);
            let pageLink = document.location.href;
            if (getCookie("downloadPop") !== "N" && pageLink.indexOf("/knowledgeSharing") === -1) {
                recommendPopup(nodeId, lang);
            }
        }
    }
}

//다운로드 후 추천논문 팝업 새로고침 안함
function downloadNoRecommPopup(nodeId, systemCode) {

    let param = {};

    let lo = getCookie("language");
    let lang = "ko";
    if (getCookie("language") != null && getCookie("language").indexOf("en") > -1) {
        lang = "en";
    }

    param.nodeId = nodeId;
    param.systemCode = systemCode;
    param.depth = "Article";
    param.shape = "download";

    if (researchYN == "Y" && researchCnt < 1) {
        console.log();
        $.jQueryAlert("남은 논문 수가 부족하여 선택하신 논문을 저장하실 수 없습니다.");
        return false;
    }

    let authCheck = downloadAuthCheck(param);
    if (authCheck) {
        if (authCheck.link !== "") {
            let articleName = authCheck.articleName;
            if (lang === "en" && ifnull(authCheck.articleNameEn) !== "") {
                articleName = authCheck.articleNameEn;
            }
            mobileAppNodeDown(authCheck.link, articleName);
        }
    }
}

//다운로드 체크
function downloadAuthCheck(param) {
    let lang = "ko";
    if (getCookie("language") != null && getCookie("language").indexOf("en") > -1) {
        lang = "en";
    }

    let result;
    $.ajax({
        url: ProxyUrl + "/download/downloadData",
        type: "post",
        data: param,
        async: false,
        success: function (d) {
            if (d.cnt == null || d.cnt == "-1") {
                $.fn.openLayer('#pub_modalLoginPop');
            } else {
                result = d;
            }
        }
    });

    if (result && (param.shape === "download")) {
        if (result.b2cSubscription === "Y") {
            nodeUse(param.nodeId + "|147003");
            return false;
        }

        if (result.msg !== "") {
            if (result.curaYN === "Y") {
                if (result.currB2cSub) { //구독권이 있을 경우 알럿 띄우지 않음
                    nodeUse(param.nodeId + "|147003");
                } else {
                    $.jQueryAlert(result.msg, lang, 'cura' + param.nodeId);
                }
            } else if (result.b2cLoginYN === "Y") {
                $.jQueryAlertForLogin(result.msg, lang);
            } else {
                $.jQueryAlert(result.msg, lang);
            }
        }
    }

    return result;
}

//url 링크
function fnUrlLink(url, node_id) {
    var myConnUrl = "";

    $.ajax({
        type: "POST",
        url: ProxyUrl + "/mylib/getConnectInfo",
        async: false,
        success: function (data) {
            if (data.setg_url != null) {
                myConnUrl = data.setg_url;
            }
        }
    });

    var node_url = "";

    if (myConnUrl != "") {
        if (url.indexOf("https://") > -1) {
            var urlSplit = url.split('https://');
            node_url = "https://" + myConnUrl + "/" + urlSplit[1];
        } else if (url.indexOf("http://") > -1) {
            var urlSplit = url.split('http://');
            node_url = "http://" + myConnUrl + "/" + urlSplit[1];
        } else {
            node_url = "http://" + myConnUrl + "/" + url;
        }
    } else if (myConnUrl == "") {
        node_url = url;
    }

    multiCPStatics(node_id, node_url);
}

//숫자외 문자 입력방지
function fnReplaceString(elem) {
    $(elem).val($(elem).val().replace(/[^0-9]/g, ""));
}

//한글입력방지
function fnReplaceKorean(elem) {
    $(elem).val($(elem).val().replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
}

//목록에 저자 표시
function fnAuthorMake(autr_nm, urlYN) {
    var autrArr = autr_nm.split("^");
    var content = "";
    var urlYN = urlYN;
    var lang = getCookie("language");
    //console.log(urlYN);
    for (var i = 0; i < autrArr.length; i++) {
        autrId = autrArr[i].split(";");
        if (i > 0 && i < 3) {
            content += ', ';
        }
        if (i < 3) {
            if (autrId[1] != '') {
                if (urlYN != "Y") {
                    content += '<a href="/author/authorDetail?ancId=' + autrId[1] + '">';
                }

            }
            content += autrId[0];
            if (autrId[1] != '') {
                if (urlYN != "Y") {
                    content += '</a>';
                }

            }
        }

    }
    //console.log(content);
    if (autrArr.length > 3) {
        if (lang != null && lang.indexOf("e") > -1) {
            content += " and others " + (autrArr.length - 3);
        } else {
            content += " 외 " + (autrArr.length - 3) + "명";
        }
    }
    return content;
}

//기관 계정 권한 확인
function getB2bPermission(id) {

    var result = {};
    $.ajax({
        url: ProxyUrl + "/member/getB2bPermission",
        type: "POST",
        data: {b2bId: id},
        async: false,
        dataType: "json",
        success: function (data) {
            result = data;
        }
    });
    return result;
}

//권호상세 페이지 호출
function goVoisDetail(voisId) {
    var voisId = voisId;
    window.open('/journal/voisDetail?voisId=' + voisId + '', '_self');
}


//특정 쿠키값 가져오기
function getCookie(name) {
    var cookieValues = document.cookie.split(";");
    var ckMap = {};

    if (cookieValues[0] != "") {
        cookieValues.forEach(function (item) {
            var keyVal = item.split("=");
            ckMap[keyVal[0].trim()] = keyVal[1].trim();
        });
    }

    return ckMap[name];
}

//쿠키값 설정
function setCookie(key, value, day) {
    var expire = new Date();
    expire.setDate(expire.getDate() + day);//기간
    var cookieValues = key + '=' + escape(value) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    cookieValues += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookieValues;
}

// 쿠키값 배열 설정 ( 추가 / 제거 )
setCookies = function (key, value, day) {
    var expire = new Date();
    expire.setDate(expire.getDate() + day);//기간

    var cookieValues = '';
    var befCookie = getCookie(key);

    if (typeof befCookie !== 'undefined') {
        /*
		* value 값이 기존 쿠키 key에 포함되어 있으면 삭제 없으면 추가 처리
		* */
        if (befCookie.indexOf(value) > -1) {
            befCookie = befCookie.split('\|');
            befCookie.splice(befCookie.indexOf(value), 1);	// key 에 포함된 값 삭제 처리
            var lastVal = '';
            for (var i = 0; i < befCookie.length; i++) {
                if (lastVal !== '') {
                    lastVal += '|' + escape(befCookie[i]);	// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
                } else {
                    lastVal = escape(befCookie[i]);	// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
                }
            }
            // 값이 있으면 key 생성
            if (lastVal !== '') {
                cookieValues = key + '=' + lastVal + ';  ';
            }
        } else if (befCookie.indexOf(value) && befCookie === '') {	// 기존 key에 값이 없으면 쿠키 생성 처리
            cookieValues = key + '=' + escape(value) + ';  '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        } else {
            cookieValues = key + '=' + befCookie + '|' + escape(value) + ';  '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        }
    } else {
        cookieValues = key + '=' + escape(value) + ';  '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    }

    if (cookieValues !== '') {
        cookieValues += ' path=/ ;expires=' + expire.toGMTString() + ';';
        document.cookie = cookieValues;
    } else {
        setCookie(key, value, -1);	// 쿠키 값이 없으면 해당 쿠키 key 삭제
    }
};

//쿠키값 배열 설정 ( 추가 / 제거 )
setKeywordCookies = function (key, value, day) {
    var expire = new Date();
    expire.setDate(expire.getDate() + day);//기간

    var cookieValues = '';
    var befCookie = getCookie(key);

    if (typeof befCookie !== 'undefined') {
        /*
		* value 값이 기존 쿠키 key에 포함되어 있으면 삭제 없으면 추가 처리
		* */
        //21.09.27, 단일 숫자 검색시 한글 깨짐 현상 해결을 위해 숫자로 들어오는 검색값을 문자열로 변환, jaekyungkim
        if (befCookie.indexOf("'" + value + "'") > -1) {
            befCookie = befCookie.split('\|');
            //befCookie.splice(befCookie.indexOf(value), 1);	// key 에 포함된 값 삭제 처리
            var lastVal = '';
            for (var i = 0; i < befCookie.length; i++) {
                if (lastVal !== '') {
                    lastVal += '|' + escape(befCookie[i]);	// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
                } else {
                    lastVal = escape(befCookie[i]);	// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
                }
            }
            // 값이 있으면 key 생성
            if (lastVal !== '') {
                cookieValues = key + '=' + lastVal + ';  ';
            }
            //21.09.27, 단일 숫자 검색시 한글 깨짐 현상 해결을 위해 숫자로 들어오는 검색값을 문자열로 변환, jaekyungkim
        } else if (befCookie.indexOf("'" + value + "'") && befCookie === '') {	// 기존 key에 값이 없으면 쿠키 생성 처리
            cookieValues = key + '=' + escape(value) + ';  '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        } else {
            cookieValues = key + '=' + befCookie + '|' + escape(value) + ';  '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        }
    } else {
        cookieValues = key + '=' + escape(value) + ';  '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    }

    if (cookieValues !== '') {
        cookieValues += ' path=/ ;expires=' + expire.toGMTString() + ';';
        document.cookie = cookieValues;
    } else {
        setCookie(key, value, -1);	// 쿠키 값이 없으면 해당 쿠키 key 삭제
    }

};

//쿠키값 배열 설정 ( 추가 / 제거 )
setReadNodeCookies = function (key, value, day) {
    var expire = new Date();
    expire.setDate(expire.getDate() + day);//기간

    var cookieValues = '';
    var befCookie = getCookie(key);

    if (typeof befCookie !== 'undefined') {
        /*
		* value 값이 기존 쿠키 key에 포함되어 있으면 삭제 없으면 추가 처리
		* */
        if (befCookie.indexOf(value) > -1) {
            befCookie = befCookie.split('\|');
            befCookie.splice(befCookie.indexOf(value), 1);	// key 에 포함된 값 삭제 처리
            var lastVal = '';
            for (var i = 0; i < befCookie.length; i++) {
                if (lastVal !== '') {
                    lastVal += '|' + escape(befCookie[i]);	// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
                } else {
                    lastVal = escape(befCookie[i]);	// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
                }
            }
            // 값이 있으면 key 생성
            if (lastVal !== '') {
                cookieValues = key + '=' + escape(value) + '|' + lastVal + ';  ';
            }
        } else if (befCookie.indexOf(value) && befCookie === '') {	// 기존 key에 값이 없으면 쿠키 생성 처리
            cookieValues = key + '=' + escape(value) + ';  '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        } else {
            cookieValues = key + '=' + escape(value) + '|' + befCookie + ';  '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        }
    } else {
        cookieValues = key + '=' + escape(value) + ';  '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    }

    if (cookieValues !== '') {
        cookieValues += ' path=/ ;expires=' + expire.toGMTString() + ';';
        document.cookie = cookieValues;
    } else {
        setCookie(key, value, -1);	// 쿠키 값이 없으면 해당 쿠키 key 삭제
    }
};

function fnUrlEncode(loc) {
    loc = loc.replace(/%3F/g, "?");
    loc = loc.replace(/%3A/g, ":");
    loc = loc.replace(/%3D/g, "=");
    loc = loc.replace(/%26/g, "&");
    return loc;
}

//10월 이전일 경우 월 앞에 0 추가
function fnChkMonth(month) {
    if (month < 10 && month.length < 2) {
        return 0 + month;
    } else {
        return month;
    }
}

//모바일일때 select 변경 시 페이지 이동
function fnMobPageChange(thisarea) {
    location.href = $(thisarea).val();
}

//추천 논문 다운로드
function recommendPopup(nodeId, lang) {
    let userType = ourAg_common.userType;
    let bestCode = userType.icstInfo.best_code;
    let type = userType.type;
    let icstYn = true;
    let schoolYn = true;

    let params = ourAg_best_node.getSearchParams();
    params.nodeId = nodeId;

    // 구독기관 여부
    if ((type != 'typeC' && type != 'typeD') && userType.icstInfo.icstYN != 'Y')
        icstYn = false;
    // 관련 기관이 대학교, 초중고가 아닌 경우
    if ((type === 'typeA' || type === 'typeB') && (bestCode != 'BN01' && bestCode != 'BN03'))
        schoolYn = false;

    $.ajax({
        type: 'GET',
        url: ProxyUrl + '/journal/recList',
        data: params,
        async: false,
        success: function (data) {
            const relate = data.relate;
            const withDown = data.withDown;
            const bestNode = data.bestNode;

            if (!relate && !bestNode)
                return
            if (relate.length < 1 && bestNode.length < 1)
                return

            // 추천 논문
            if (relate.length > 0) {
                $("#recommList").empty();
                printRecommList(relate, "recommList", lang, nodeId);
            }
            // 많이 보고있는 논문
            if (bestNode.length > 0 && icstYn && schoolYn) {
                $("#bestNodeList_eToggleSection").show();
                $("#withDownListToggleWrap").hide();

                bestNode.articleDownAllCnt = data.articleDownAllCnt;
                ourAg_recommend.printBestNode(bestNode, nodeId);
            }
            // 함께 다운받은 논문
            else if (withDown.length > 0) {
                // 많이 보고있는 논문이 보이지 않는 경우 숨김 처리
                $("#bestNodeList_eToggleSection").hide();
                $("#withDownListToggleWrap").show();

                $("#withDownList").empty();
                printRecommList(withDown, "withDownList", lang, nodeId);
            }

            $('.recomWrap').css('display', 'block');
            $('#pub_modalRecommendThesis').css('display', 'block');
            $('body').addClass('modalOpen');

            $('#recommList').find('.item').eq(1).find('.bookTool-1').css('display', 'block');
            setTimeout(function () {
                $(".bookTool-1").fadeOut(500);
            }, 5000);
        }
    });

    /*오늘 하루 안보기*/
    $("#pub_today_check_01").click(function () {
        $.fn.closeLayer('#pub_modalRecommendThesis');
        setCookie("downloadPop", "N", 1);
    });

}

/*추천 논문 리스트 출력*/
function printRecommList(list, id, lang, nodeId) {
    var b2bLogin = dev_b2bId_chk;
    var b2cLogin = dev_b2cId_chk;

    var content = "";
    var recType = '';

    // 추천 유형 코드
    switch (id) {
        // 추천 논문
        case 'recommList':
            recType = '350001';
            break;
        // 함께 다운받은 논문
        case 'withDownList':
            recType = '350002';
            break;
        // 많이 본 논문
        case 'bestNodeList':
            recType = '350003';
            break;
        default:
            break;
    }

    list.forEach(function (item, idx) {
        var title = lang.indexOf("e") > -1 ? item.titleEn : item.titleKr;
        var authors = lang.indexOf("e") > -1 ? item.authoren : item.author;
        var pshtitle = lang.indexOf("e") > -1 ? item.pshtitleEn : item.pshtitle;
        // 제목
        if (ifnull(title) == "")
            title = item.titleKr;
        // 저자
        if (ifnull(authors) == "")
            authors = item.author;
        // 분야
        if (ifnull(pshtitle) == "")
            pshtitle = item.pshtitle;

        if (idx >= 2) {
            content += '<li class="item hidden">';
        } else {
            content += '<li class="item">';
        }

        content += '    <a target="_blank" href="/journal/articleDetail?nodeId=' + item.id + '" onclick="setSideStatistics(\'\', \'' + nodeId + '\', \'' + item.id + '\', \'349004\', \'' + recType + '\')">' + title + '</a>';
        content += '<div class="thesis__btnWrap">';

        // 북마크 생성
        if (id === 'withDownList' || id === 'recommList') {
            if (item.bookmark > 0) {
                content += '<button type="button" onclick="setNewBookmark(\'' + item.id + '\',\'' + dev_b2cId_chk + '\',this);fn_statistics(\'Z413\', \'' + b2bLogin + '\', \'' + b2cLogin + '\')" class="thesis__libraryBtn selected on">';
            } else {
                content += '<button type="button" onclick="setNewBookmark(\'' + item.id + '\',\'' + dev_b2cId_chk + '\',this);fn_statistics(\'Z413\', \'' + b2bLogin + '\', \'' + b2cLogin + '\')" class="thesis__libraryBtn">';
            }
        } else if (id === 'bestNodeList') {
            if (item.bookmark > 0) {
                content += '<button type="button" onclick="setNewBookmark(\'' + item.id + '\',\'' + dev_b2cId_chk + '\',this);fn_statistics(\'Z423\', \'' + b2bLogin + '\', \'' + b2cLogin + '\')" class="thesis__libraryBtn selected on">';
            } else {
                content += '<button type="button" onclick="setNewBookmark(\'' + item.id + '\',\'' + dev_b2cId_chk + '\',this);fn_statistics(\'Z423\', \'' + b2bLogin + '\', \'' + b2cLogin + '\')" class="thesis__libraryBtn">';
            }
        }
        // 다운로드 버튼 생성
        if (item.permission == 1) {
            if (item.multiCPYN !== 'Y') {
                if (id === 'withDownList') {
                    content += '<button type="button" onclick="downloadNoRecommPopup(\'' + item.id + '\',147003);fn_statistics(\'Z412\', \'' + b2bLogin + '\', \'' + b2cLogin + '\');gtag(\'event\', \'click\', {\'event_category\':\'논문이용_new\',\'event_action\':\'다운로드\',\'event_label\':\'함께이용한논문레이어\',\'value\':\'1\'})" class="thesis__downBtn"></button>';
                } else if (id === 'recommList') {
                    content += '<button type="button" onclick="downloadNoRecommPopup(\'' + item.id + '\',147003);fn_statistics(\'Z412\', \'' + b2bLogin + '\', \'' + b2cLogin + '\');gtag(\'event\', \'click\', {\'event_category\':\'논문이용_new\',\'event_action\':\'다운로드\',\'event_label\':\'추천논문레이어\',\'value\':\'1\'})" class="thesis__downBtn"></button>';
                } else if (id === 'bestNodeList') {
                    content += '<button type="button" onclick="downloadNoRecommPopup(\'' + item.id + '\',147003);fn_statistics(\'Z422\', \'' + b2bLogin + '\', \'' + b2cLogin + '\');gtag(\'event\', \'click\', {\'event_category\':\'논문이용_new\',\'event_action\':\'다운로드\',\'event_label\':\'많이본논문레이어\',\'value\':\'1\'})" class="thesis__downBtn"></button>';
                }
            }
        }
        content += '</div>';

        if (lang == "ko") {
            content += '<div class="bookTool">';
            content += '<div class="bookToolAll bookTool-2">';
            content += '<span>내서재에 추가<br>되었습니다.</span></div>';
            content += '<div class="bookToolAll bookTool-3">';
            content += '<span>내서재 담기가<br>취소되었습니다.</span>';
            content += '</div></div>';
        } else {
            content += '<div class="bookTool">';
            content += '<div class="bookToolAll bookTool-2">';
            content += '<span>Article has been<br />added to Library.</span></div>';
            content += '<div class="bookToolAll bookTool-3">';
            content += '<span>Add to Library has<br />been canceled.</span></div>';
            content += '</div></div>';
        }

        content += '</li>';
    });

    $("#" + id).append(content);
    $("#" + id).parents('.toggleBody').find('.paginate').show();

    $.fn.openLayer('#pub_modalRecommendThesis');

    if (list.length > 3) {
        $("#" + id).parent().siblings().removeClass("hidden");
    }
}

//더보기
function recommendMore(id, elem) {
    if ($(elem).hasClass("open")) {
        $("#" + id + " li:gt(1)").addClass("hidden");
        $(elem).removeClass("open").find("span").text("더보기");
        return;
    }
    $("#" + id + " li").removeClass("hidden");
    $(elem).addClass("open").find("span").text("접어두기");
}

function fnPopupChk(dev_b2bId, dev_b2cId, exCheck) {
    var b2bPopup = getCookie("b2bLayer");
    var b2cPopup = getCookie("b2cLayer");

    if (exCheck !== "true") {
        //1일 1회 로그인 팝업(b2b 로그인 팝업)
        if (dev_b2bId == "") {
            if (b2bPopup != "N") {
                $.fn.openLayer('#pub_modalOrganPop');
            }
        }
    }
}

//세션 체크 여부
function sessionDel() {
    setTimeout(function () {
        $.ajax({
            type: 'get',
            url: ProxyUrl + '/test/sessionDel',
            success: function (data) {

            }
        });
    }, 3000);
}

//추천논문 모달닫기
function fnCloseRecommendModal(modalId) {
    $.fn.closeLayer(modalId);

    // viewMore 클래스의 display 초기화
    for (const viewMore of document.getElementsByClassName("viewMore")) {
        viewMore.style.display = "";
    }
}


//글자수 바이트 계산
var calByte = {
    getByteLength: function (s) {
        if (s == null || s.length == 0) {
            return 0;
        }
        var size = 0;

        for (var i = 0; i < s.length; i++) {
            size += this.charByteSize(s.charAt(i));
        }

        return size;
    },

    cutByteLength: function (s, len) {

        if (s == null || s.length == 0) {
            return 0;
        }
        var size = 0;
        var rIndex = s.length;

        for (var i = 0; i < s.length; i++) {
            size += this.charByteSize(s.charAt(i));
            if (size == len) {
                rIndex = i + 1;
                break;
            } else if (size > len) {
                rIndex = i;
                break;
            }
        }

        return s.substring(0, rIndex);
    },

    charByteSize: function (ch) {

        if (ch == null || ch.length == 0) {
            return 0;
        }

        var charCode = ch.charCodeAt(0);

        if (charCode <= 0x00007F) {
            return 1;
        } else if (charCode <= 0x0007FF) {
            return 2;
        } else if (charCode <= 0x00FFFF) {
            return 3;
        } else {
            return 4;
        }
    }
};

/*메인팝업 안보기*/
function fnPopupCookieChk(popId, day) {
    $('#' + popId).hide();
    var close_day = 1;
    if (day == "404002") {
        close_day = 7;
    } else if (day == "414003") {
        close_day = 30;
    }
    setCookie(popId, "N", close_day);
}

//서비스 종료 메세지
function getServiceStopMessage(stopCode, depth) {
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
            message = ""; //안내문구 미표시
            break;
        case "018005": //서비스중지
            if (lang != null && lang.indexOf("e") > -1) {
                message = "The service is suspended at the request of the copyright holder or issuing institution.";
            } else {
                message = "저작권자·발행기관의 요청으로 서비스 중지된 저널입니다.";
            }
            break;
        case "018006": //내역확인 불가능
            message = ""; //안내문구 미표시
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

//달 영어로 변환
function monthEn(mon) {
    var monthEn = "";
    switch (mon) {
        case "01":
            monthEn = "January";
            break;
        case "02":
            monthEn = "February";
            break;
        case "03":
            monthEn = "March";
            break;
        case "04":
            monthEn = "April";
            break;
        case "05":
            monthEn = "May";
            break;
        case "06":
            monthEn = "June";
            break;
        case "07":
            monthEn = "July";
            break;
        case "08":
            monthEn = "August";
            break;
        case "09":
            monthEn = "September";
            break;
        case "10":
            monthEn = "October";
            break;
        case "11":
            monthEn = "November";
            break;
        case "12":
            monthEn = "December";
            break;
    }
    return monthEn;
}


//멀티 CP 연계 팝업을 띄우기 전 알럿 창
function fnMoveToMultiCp(argUrl, argNodeId, argArticleTitleKr, argArticleTitleEn, argIprdId, from) {
    // 모바일 앱에서 내서재를 이용해 호출하면, 바로 논문 상세 페이지로 이동함
    if (from === "mylib" && (isMobileApp() || $(window).width() < 959)) {
        window.location = "/journal/articleDetail?nodeId=" + argNodeId;
        return;
    }

    let lang = ifnull(getCookie("language"));
    let alertLang = 'ko_KR';
    let alertMsg = '해당 논문 열람을 위해 사이트가 이동됩니다.<br><br>' +
        'dbpia의 기관인증 / 로그인정보는 연동 되지 않으며<br>' +
        '논문 이용에 제한이 있을 수 있습니다.<br><br>' +
        '이동하시겠습니까?'
    if (lang !== '' && lang.indexOf('e') >= 0) {
        alertLang = 'en_US';
        alertMsg = 'The website is moved to view the article.<br><br>' +
            'DBpia institutional access / Log in information is not connected<br>' +
            'and there may be a limit to the use of article.<br><br>' +
            'Do you still want to move?'
    }
    let dataArr = {};
    dataArr.argUrl = argUrl;
    dataArr.argNodeId = argNodeId;
    dataArr.argArticleTitleKr = argArticleTitleKr;
    dataArr.argArticleTitleEn = argArticleTitleEn;
    dataArr.argIprdId = argIprdId;
    dataArr.from = from;

    $.jQueryAlertTwoButtonSync(alertMsg, fnMoveToMultiCp_ver2, dataArr, alertLang);

}


// 멀티 CP 연계 팝업
fnMoveToMultiCp_ver2 = function (dataArr) {
    if (typeof dataArr == 'undefined') {
        return;
    }

    fn_statistics('Z421', dev_b2bId_chk, dev_b2cId_chk);
    let argUrl = dataArr.argUrl;

    if (argUrl != null && argUrl.indexOf("://kiss.") != -1) {
        $.jQueryAlert("KISS 자료의 경우에는 KISS측의 요청으로<br>URL 링크 연결을 지원하고 있지 않습니다.<br>인용하기, 수정하기만 이용 가능합니다.");
        return;
    }

    let argNodeId = dataArr.argNodeId;
    let argArticleTitleKr = dataArr.argArticleTitleKr;
    let argArticleTitleEn = dataArr.argArticleTitleEn;
    let argIprdId = dataArr.argIprdId;

    var node_url = "";
    var myConnUrl = "";

    if (dev_b2cId_chk !== '') {
        $.ajax({
            type: "POST",
            url: ProxyUrl + "/mylib/getConnectInfo",
            async: false,
            success: function (data) {
                if (data.setg_url != null) {
                    myConnUrl = data.setg_url;
                }
            }
        });

        if (myConnUrl !== "") {
            if (argUrl.indexOf("https://") > -1) {
                var urlSplit = argUrl.split('https://');
                node_url = "https://" + myConnUrl + "/" + urlSplit[1];

            } else if (argUrl.indexOf("http://") > -1) {
                var urlSplit = argUrl.split('http://');
                node_url = "http://" + myConnUrl + "/" + urlSplit[1];

            } else {
                node_url = "http://" + myConnUrl + "/" + argUrl;
            }

        } else {
            node_url = argUrl;
        }
    } else {
        node_url = argUrl;
    }

    // 멀티CP 통계
    $.ajax({
        type: "get",
        url: "/journal/multCpStatics",
        data: {"nodeId": argNodeId},
        success: function (d) {
        }
    });

    // 멀티 CP 제외 발행기관 체크
    var varLinkChk = 0;
    var varLinkUrl = '';

    $.ajax({
        type: 'post',
        url: '/journal/getMultCpExcptIprd',
        data: {'iprdId': argIprdId},
        async: false,
        success: function (data) {
            varLinkChk = data;
        }
    });

    // 주제분류가 학위논문 또는 url에 riss가 포함되어있을 경우 일반 팝업창으로 node_url 연결
    if (dataArr.from === 'riss') {
        varLinkChk = 1;
    }

    // 멀티 cp 제외 발행기관 테이블에 정보가 있으면 일반 팝업창으로 node_url 연결
    if (varLinkChk > 0) {
        varLinkUrl = node_url;
    }

    window.open(varLinkUrl, 'multiCpPop' + argNodeId, 'resizable=yes,top=0, left=0, height=' + screen.height + ',width=' + screen.width);

    if (node_url.indexOf("https://") > -1) {
        var node_urlSplit = node_url.split('https://');
        if (ifnull(node_urlSplit[1]) == '') {
            node_url = node_url.substring(node_url.lastIndexOf("https://") + 8);
        } else {
            node_url = node_urlSplit[1];
        }
    }

    if (varLinkChk === 0) {
        $('body').append('<form name="multiCpForm" method="post" action="/pdf/cpViewer" target="multiCpPop' + argNodeId + '"></form>');
        $('form[name=multiCpForm]')
            .append('<input type="hidden" name="cpUrl" value="' + node_url + '"/>')
            .append('<input type="hidden" name="cpNodeId" value="' + argNodeId + '"/>')
            .append('<input type="hidden" name="articleTitleKr" value="' + argArticleTitleKr + '"/>')
            .append('<input type="hidden" name="articleTitleEn" value="' + argArticleTitleEn + '"/>')
            .append('<input type="hidden" name="iprdId" value="' + argIprdId + '"/>')
            .submit();

        $('form[name=multiCpForm]').remove();
    }
};


function setSideStatistics(rbokId, nodeId, targetNodeId, usedSpot, recType) {
    var params = {};
    params.rbokId = rbokId;
    params.nodeId = nodeId;
    if (!targetNodeId || targetNodeId === 'null') {
        targetNodeId = ''
    }
    params.trgtNodeId = targetNodeId;

    params.usedSpot = usedSpot;
    params.rcmdType = recType;
    params.sort = recType ? 'rec' : 'rbok';

    sideStatistics(params, '/logutil/sidelog');
}


/**
 * 참고문헌/추천논문 이용통계
 * @returns
 */
function sideStatistics(params, url) {
    $.ajax({
        type: 'post',
        url: url,
        data: params,
        async: false,
        success: function (data) {

        }
    });
}

//논문 상세페이지로 이동(타겟 설정)
function fnGoNodeDetailTarget(node_id, target) {
    var url = "/journal/articleDetail?nodeId=" + node_id;
    var target_link = "_blank";
    if (target != undefined) {
        if (target == '402001') {
            target_link = '_self';
        } else if (target == '402003') {
            return
        }
    }
    window.open(url, target_link);
}

//url 이동(타겟 설정)
function fnGoUrlTarget(url, target) {
    var url = url;
    var target_link = "_blank";
    if (target != undefined) {
        if (target == '402001') {
            target_link = '_self';
        } else if (target == '402003') {
            return
        }
    }
    window.open(url, target_link);
}

// 21.10.28, 다양한 상황에서 대응하기 위해 url 파라미터 추가, jaekyungkim
//배너 클릭 수
function fnBannerClickCount(banner_id, url, rgstUser_id) {
    $.ajax({
        type: "post",
        data: {
            "banner_id": banner_id
            , "rgstUserId": rgstUser_id
        },
        url: url,
        success: function (d) {
        }
    });
}

function sslMove(call) {
    var host = location.host;
    var url = "";
    let lang = ifnull(getCookie("language"));

    //2021.02.02 SNS로그인 개편_kakao 추가
    var regExp_call = /naver|google|facebook|kakao/i;

    if (regExp_call.test(call)) {
        // Proxy Domain 을 이용한 경우, Redirect URL 이 올바르지 않기 때문에 SNS 로그인을 이용할 수 없음.
        if (!isDbpiaDomain(host)) {
            let alertMsg = '도서관 사이트에서 기관인증하여 DBpia 사이트로 이동하신 경우,</br>Kakao, Naver, Google 사이트 정책상 SNS 로그인이 제한됩니다.';
            if (lang !== '' && lang.indexOf('e') >= 0) {
                alertMsg = 'If you go to the DBpia after Institutional Access on the library site,</br>login to SNS is restricted according to Kakao, Naver, and Google policies.';
            }
            $.jQueryAlert(alertMsg);
            return;
        }
    }

    if (host.indexOf("dbpia.co.kr") > -1) {
        url = "";
        host = "";
    } else {
        url = location.protocol + "//";
    }

    url += host + call;

    if (url.indexOf("lps3.") > -1) {
        url = url.replace(/lps3./gi, "");
    }

    //자동로그인 여부
    let element = document.querySelector("input[id=pub_check_autoLogin]");
    if (element) {
        let isAutoLogin = element.checked;
        url += '?autoLogin=' + isAutoLogin;
    }

    location.href = url;
}

function proxyYN(url) {
    let regExp_host = /^ac\.kr|proxy|ssl|access|edu|openlink|kesli\.or\.kr|ebscohost|summon|primo|hs\.kr|leidenuniv|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;

    return regExp_host.test(url);
}

function isDbpiaDomain(url) {
    return /\.dbpia\.co\.kr$/.test(url);
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

function buyCancel(saleId) {
    $.ajax({
        url: "/pay/buyCancel",
        type: 'post',
        data: {"saleId": saleId}
    })
}

function siblingsFn(t) {
    const childrenList = t.parentElement.children;
    const tempArr = [];

    for (const children of childrenList) {
        tempArr.push(children);
    }

    return tempArr.filter(function (e) {
        return e !== t;
    });
}

function moveHref(href) {
    location.href = href;
}

function moveHref_blank(href) {
    window.open(href, '_blank')
}