$(document).ready(function () {

    // opcity 에서 visibility로 변경 - 익스에서 opcity 인식 오류
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.newFloat').css('visibility', 'visible');
        } else {
            $('.newFloat').css('visibility', 'hidden');
        }
    });

    if (typeof ProxyUrl == "undefined") {
        var ProxyUrl = "https://www.dbpia.co.kr";
    }

    // 모바일 nav 적용
    $(".menuButton, .menuPanelOverlay").off("click").on("click", function (event) {
        $(".menuButton, .menuPanelOverlay, .menuPanel").toggleClass("active");

        if ($('.menuPanel').hasClass('active')) {
            $("body").css("overflow", "hidden");
            $('.menuFoot').show();
        } else {
            $("body").css("overflow", "auto");
            $('.menuFoot').hide();
        }

        // menuPanelOverlay 활성화 체크
        if ($(".menuPanelOverlay").hasClass("active")) {
            $(".menuPanelOverlay").fadeIn();
        } else {
            $(".menuPanelOverlay").fadeOut();
        }
    });

    $(".eToggleSectionMobile a.mm").click(function (e) {
        $(".eHideSecMobile").slideUp(100);
        $(".eToggleSectionMobile").removeClass("selected");
        if (!$(this).siblings(".eHideSecMobile").is(":visible")) {
            $(this).siblings(".eHideSecMobile").slideDown(100);
            $(this).parent(".eToggleSectionMobile").addClass("selected");
        }
        e.preventDefault();
    });

    // 상단 배너 적용
    $("#pub_btnCloseBn").click(function (e) {
        e.preventDefault();
        $("#pub_banner").slideUp(50);

    });

    // 참고: placeholder 적용
    $(".placeholder + input").on({
        focus: function () {
            $(this).prev('.placeholder').hide();
        },
        blur: function () {
            $(this).prev('.placeholder').show();
            if ($(this).val().length) {
                $(this).prev('.placeholder').hide();
            }
        }
    });

    $(".placeholder + textarea").on({
        focus: function () {
            $(this).prev('.placeholder').hide();
        },
        blur: function () {
            $(this).prev('.placeholder').show();
            if ($(this).val().length) {
                $(this).prev('.placeholder').hide();
            }
        }
    });

    // $(".placeholder + input").keyup(function() {
    // 	if($(this).val().length) {
    // 		$(this).prev('.placeholder').hide();
    // 	} else {
    // 		$(this).prev('.placeholder').show();
    // 	}
    // });

    // $(".placeholder + textarea").on("keyup", function() {
    // 	if($(this).val().length) {
    // 		$(this).prev('.placeholder').hide();
    // 	} else {
    // 		$(this).prev('.placeholder').show();
    // 	}
    // });
    $(".placeholder").click(function () {
        $(this).next().focus();
    });

    // 참고: form 적용
    $(".fSelect").click(function () {
        var $select = $(this).children("select");
        $select.focus();
    });

    $(".fSelect:not(.noChange) option:selected").each(function () {
        $(this).parent().siblings("span").text($(this).text());
    });

    $(".fSelect:not(.noChange) select").change(function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("span").text(select_name);
    });

    // 참고: datePickter 적용
    $(function () {
        $("#pub_datePicker1").datepicker({
            showOn: "both",
            buttonImage: ProxyUrl + "/images/common/btn_calendar.png",
            buttonImageOnly: false,
            changeMonth: true,
            changeYear: true,
            nextText: '다음 달',
            prevText: '이전 달',
            dateFormat: 'yy.mm.dd',
        });
        $("#pub_datePicker2").datepicker({
            showOn: "both",
            buttonImage: ProxyUrl + "/images/common/btn_calendar.png",
            buttonImageOnly: false,
            changeMonth: true,
            changeYear: true,
            nextText: '다음 달',
            prevText: '이전 달',
            dateFormat: 'yy.mm.dd',
            maxDate: "0D" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        });
        $("#pub_datePickerMonth1").datepicker({
            showOn: "both",
            buttonImage: ProxyUrl + "/images/common/btn_calendar.png",
            buttonImageOnly: false,
            changeMonth: true,
            changeYear: true,
            nextText: '다음 달',
            prevText: '이전 달',
            dateFormat: 'yy.mm',
        });
        $("#pub_datePickerMonth2").datepicker({
            showOn: "both",
            buttonImage: ProxyUrl + "/images/common/btn_calendar.png",
            buttonImageOnly: false,
            changeMonth: true,
            changeYear: true,
            nextText: '다음 달',
            prevText: '이전 달',
            dateFormat: 'yy.mm',
        });
        $("#pub_datePickerMonth3").datepicker({
            showOn: "both",
            buttonImage: ProxyUrl + "/images/common/btn_calendar.png",
            buttonImageOnly: false,
            changeMonth: true,
            changeYear: true,
            nextText: '다음 달',
            prevText: '이전 달',
            dateFormat: 'yy.mm',
        });
        $("#pub_datePickerMonth4").datepicker({
            showOn: "both",
            buttonImage: ProxyUrl + "/images/common/btn_calendar.png",
            buttonImageOnly: false,
            changeMonth: true,
            changeYear: true,
            nextText: '다음 달',
            prevText: '이전 달',
            dateFormat: 'yy.mm',
        });
    });

    // 참고: 검색 토글 적용
    //$(".eToggleSection a.btnToggle").click(function(e){
    $(".eToggleSection a.btnToggle").unbind("click").bind('click', function (e) {
        $(this).parent().siblings(".eHideSec").slideToggle(100);
        var spreadBool = $(this).hasClass("open");

        if (spreadBool === false) {
            $(this).addClass("open");

        } else {
            $(this).removeClass("open");
        }
        e.preventDefault();
    })

    $(".eToggleSectionCategory a.btnToggle").click(function (e) {
        $(".eHideSec").slideUp(100);
        $(".eToggleSectionCategory a.btnToggle").removeClass("active");
        if (!$(this).parents().siblings(".eHideSec").is(":visible")) {
            $(this).parents().siblings(".eHideSec").slideDown(100);
            $(this).addClass("active");
        }
        e.preventDefault();
    })

    $(".eToggleSectionCategory a.btnToggle2").click(function (e) {
        $(this).parents().siblings(".eHideSec").slideUp(100);
        $(this).removeClass("active");
        if (!$(this).parents().siblings(".eHideSec").is(":visible")) {
            $(this).parents().siblings(".eHideSec").slideDown(100);
            $(this).addClass("active");
        }
        e.preventDefault();
    })

    $(".eToggleSectionDetail a.btnToggleDetail").click(function (e) {
        $(this).parent().siblings(".eHideSecDetail").slideToggle(100);
        var spreadBool = $(this).hasClass("open");

        if (spreadBool === false) {
            $(this).addClass("open");
        } else {
            $(this).removeClass("open");
        }
        e.preventDefault();
    })

    $(".eToggleSectionTab a.mm").click(function (e) {
        $(".eHideSec").hide();
        $(".eToggleSectionTab").removeClass("selected");
        if (!$(this).siblings(".eHideSec").is(":visible")) {
            $(this).siblings(".eHideSec").show();
            $(this).parent(".eToggleSectionTab").addClass("selected");
        }
        e.preventDefault();
    })

    // 참고: 논문상세 내용없을때 토글 비활성화 적용
    $(".thesisDetailArea.eToggleSection:not(:has('.eHideSec'))").addClass("empty");
    //$(".thesisDetailArea.eToggleSection:not(:has('.eHideSec ul.list li'))").addClass("empty");

    // 참고: 논문상세 내용없을때 높이값 디폴트 적용
    $(".thesisDetailArea.eToggleSection .abstract:has('.nodata')").addClass("autoHeight");

    // 참고: 논문상세 저자키워드 내용없을때 회색배경 삭제 적용
    $(".thesisDetailArea.eToggleSection dl.keyword:has('.nodata')").addClass("delBackground");

    // 참고: faq 토글 적용
    $(".eToggleSection a.btnToggleTable").click(function (e) {
        $(this).parent().siblings(".eHideSec").slideToggle(100);
        var spreadBool = $(this).hasClass("open");
        var langChk = $(this).next().val();

        var btnTextOpen = 'Open';
        var btnTextClose = 'Close';

        if (langChk === 'ko_KR') {
            btnTextOpen = '열기';
            btnTextClose = '접기'
        }

        if (spreadBool === false) {
            $(this).addClass("open");
            $(this).text(btnTextOpen);
            $(this).parent().css({"margin-bottom": "20px", "border-bottom": "1px solid #e7e7e7"});
        } else {
            $(this).removeClass("open");
            $(this).text(btnTextClose);
            $(this).parent().css({"margin-bottom": "0px", "border-bottom": "none"});
        }
        e.preventDefault();
    })

    // 참고: 다국어입력 토글 적용
    $(".eToggleSection button.btnMultiLangInput").click(function (e) {
        $(this).parent().siblings().children(".eHideSec").slideToggle(100);
        var spreadBool = $(this).hasClass("open");
        var lo = getCookie("language");
        var txt = "다국어해제";
        var txt2 = "다국어입력";
        if (lo.indexOf('e') > -1) {
            txt = "Multilingual";
            txt2 = "Multilingual";
        }

        if (spreadBool === false) {
            $(this).addClass("open");
            $(this).text(txt);
        } else {
            $(this).removeClass("open");
            $(this).text(txt2);
        }
        e.preventDefault();
    })

    // 참고: 다국어입력 토글 적용 - 상세검색 외
    $(".eToggleSection button.btnMultiLangInputOther").click(function (e) {
        $(this).parent().siblings(".eHideSec").slideToggle(100);
        var spreadBool = $(this).hasClass("open");
        var txt = "다국어해제";
        var txt2 = "다국어입력";
        if (lo.indexOf('e') > -1) {
            txt = "Multilingual";
            txt2 = "Multilingual";
        }

        if (spreadBool === false) {
            $(this).addClass("open");
            $(this).text(txt);
        } else {
            $(this).removeClass("open");
            $(this).text(txt2);
        }
        e.preventDefault();
    })

    // 참고: 더보기/닫기 적용
    $(".eShowAll").click(function (e) {
        var hiddenArea = $(this).parents(".option").parent(".eHidden");
        var baseHeight = hiddenArea.outerHeight();

        if (hiddenArea.data("height") === undefined) {
            hiddenArea.data("height", baseHeight);
        }
        var spreadBool = $(this).hasClass("open");

        if (spreadBool === false) {
            hiddenArea.css('height', 'auto');
            var autoHeight = hiddenArea;
            $(this).addClass("open");
            $(this).children(".unfold").hide();
            $(this).children(".fold").show();

            hiddenArea.animate({
                height: autoHeight
            }, 100);
        } else {
            $(this).removeClass("open");
            $(this).children(".fold").hide();
            $(this).children(".unfold").show();
            var basicH = hiddenArea.data("height");

            hiddenArea.animate({
                height: basicH
            }, 100);
        }
        e.preventDefault();
    });

    // 참고: 더보기/닫기 (세로형태) 적용
    $(".eShowAllVert").click(function (e) {
        var hiddenArea = $(this).parents(".option").siblings(".eHidden");
        var baseHeight = hiddenArea.outerHeight();

        if (hiddenArea.data("height") === undefined) {
            hiddenArea.data("height", baseHeight);
        }
        var spreadBool = $(this).hasClass("open");

        if (spreadBool === false) {
            hiddenArea.css('height', 'auto');
            var autoHeight = hiddenArea;
            $(this).addClass("open");
            $(this).children(".unfold").hide();
            $(this).children(".fold").show();

            hiddenArea.animate({
                height: autoHeight
            }, 100);
        } else {
            $(this).removeClass("open");
            $(this).children(".fold").hide();
            $(this).children(".unfold").show();
            var basicH = hiddenArea.data("height");

            hiddenArea.animate({
                height: basicH
            }, 100);
        }
        e.preventDefault();
    });

    // 참고: 알림 목록 적용
    function cuteHide(el) {
        el.animate({opacity: '0'}, 50, function () {
            el.animate({height: '0px'}, 50, function () {
                el.remove();
            });
        });
    }

    $('.del').on('click', function () {
        var el = $(this).closest('.alarm');
        cuteHide(el);
    });

    $(document).off('click', '#pub_btnAlarm').on('click', '#pub_btnAlarm', function (e) {
        var spreadBool = $(this).hasClass("open");
        if (spreadBool === false) {
            $(this).addClass("open");
            $("#pub_alarmArea").show();
            $("#pub_alarmArea").animate({
                "top": "35px",
                opacity: 1
            }, 100);
        } else {
            $(this).removeClass("open");
            $("#pub_alarmArea").animate({
                "top": "25px",
                opacity: 0
            }, 100, function () {
                $("#pub_alarmArea").hide();
            });
        }
        e.preventDefault();
    });

    // 참고: 내 서재 폴더 관리 적용
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
    });

    // 참고: 내 서재 이용수 추이 차트 적용
    $("#pub_usageChart").click(function (e) {
        var spreadBool = $(this).hasClass("open");
        if (spreadBool === false) {
            $(this).addClass("open");
            $("#pub_usageChartArea").show();
            $("#pub_usageChartArea").animate({
                "top": "32px",
                opacity: 1
            }, 100);
        } else {
            $(this).removeClass("open");
            $("#pub_usageChartArea").animate({
                "top": "21px",
                opacity: 0
            }, 100, function () {
                $("#pub_usageChartArea").hide();
            });
        }
        e.preventDefault();
    });

    // 참고: lnb 적용
    //$(".lnb li.group ul.sub").hide();	//모든 서브 메뉴 감추기
    //init(0);	//첫번째 메뉴 활성화

    /*$(function(){
        $(".lnb li.group a.tit").click(function(){
            console.log($(this).next().is(":visible"));
            $(".lnb li.group ul.sub").slideUp(150);
            $(".lnb li.group a.fold").removeClass("open");
            if(!$(this).next().is(":visible"))
            {
                $(this).next().slideDown(150);
                $(this).addClass("open");
            }
        })
    });

    function init(n) {
        $(".lnb li.group").eq(n).find("ul.sub").show(); //특정 서브메뉴를 활성화 시키는 함수
    };*/

    // 참고: 슬림 스크롤 적용
    $('.slimScrollWrap').slimScroll({
        height: '',
        size: '4px',
        color: '#fff',
        alwaysVisible: true,
        railVisible: true,
        railColor: '#bfbfbf',
        railOpacity: 1,
    });

    var num = $(".slimScrollWrap ul").find("li").length;
    if (num < 6) {
        $(".slimScrollBar").css({"opacity": "0"});
        $(".slimScrollRail").css({"opacity": "0"});
    }

    // 참고: 행 추가/삭제 적용
    var count = 0;
    var fullcount = 9;
    $("#pub_btnAddRowAdvanced").on("click", function () {
        if ($("#pub_advancedSearchBox>li").length >= 5) return false;
        $("#pub_advancedSearchBox").append("<li>" + $("#pub_advancedSearchBox li:first").html() + "</li>");
        $("#pub_advancedSearchBox li:last>button").attr({
            class: "btn btnIcon subColor minus",
            id: "pub_btnRemoveRowAdvanced"
        });
    });

    $("#pub_advancedSearchBox").on("click", "#pub_btnRemoveRowAdvanced", function () {
        $(this).parent("li").remove();
    });

    $("#pub_advancedSearchBox").on("click", ".fSelect", function () {
        var $select = $(this).children("select");
        $select.focus();
    });

    $("#pub_advancedSearchBox").on("change", ".fSelect select", function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("span").text(select_name);
    });

    $("#pub_advancedSearchBox").on("change", ".fSelect select", function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("span").text(select_name);
    });

    $("#pub_btnAddRow").on("click", function () {
        if ($("#pub_formGroup>li").length >= 10) {
            var lang = getCookie("language");
            if (typeof lang !== 'undefined' && lang === 'en_US') {
                $.jQueryAlert("참고문헌신청은 최대 10개까지만 등록 가능합니다."); // 영문 추가
            } else {
                $.jQueryAlert("참고문헌신청은 최대 10개까지만 등록 가능합니다.");
            }
            return false;
        }

        $("#pub_formGroup").append("<li>" + $("#pub_formGroup li:first").html() + "</li>");
        $("#pub_formGroup li:last>button").attr({class: "btn btnIcon subColor minus", id: "pub_btnRemoveRow"});
    });

    $("#pub_formGroup").on("click", "#pub_btnRemoveRow", function () {
        $(this).parent("li").remove();
    });

    $("#pub_btnAddRowEmail").on("click", function () {
        var i = parseInt($("#pub_formGroupEmail li:last").attr('class').substring(9)) + 1;

        if ($("#pub_formGroupEmail>li").length >= 10) {
            $.jQueryAlert("추가 이메일은 최대 10개 등록이 가능합니다.");
            return false;
        }

        $("#pub_formGroupEmail").append("<li class=emailarea" + i + ">" + $("#pub_formGroupEmail li:first").html().replace('selectEmailAuth1', 'selectEmailAuth' + i).replace('fnSelectAuthMail(1)', 'fnSelectAuthMail(' + i + ')') + "</li>");
        $(".selectEmailAuth" + i + " option[value='']").attr("selected", true);
        $(".selectEmailAuth" + i).siblings("span").text("직접입력");
        $(".selectEmailAuth" + i).parent().parent().siblings("span").children("input[name='add_email1']").val("");
        $(".selectEmailAuth" + i).parent().parent().siblings("span").children("#dev_add_email2").val("");
        $(".selectEmailAuth" + i).parent().parent().siblings("span").children("#dev_add_email2").attr("readOnly", false);
        $("#pub_formGroupEmail li:last>button").attr({
            class: "btn btnIcon subColor minus",
            id: "pub_btnRemoveRowEmail"
        });
    });

    $("#pub_formGroupEmail").on("click", "#pub_btnRemoveRowEmail", function () {
        $(this).parent("li").remove();
    });

    $("#pub_formGroupEmail").on("click", ".fSelect", function () {
        var $select = $(this).children("select");
        $select.focus();
    });

    $("#pub_formGroupEmail").on("change", ".fSelect select", function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("span").text(select_name);
    });

    $("#pub_btnAddRowResearch").on("click", function () {
        if ($("#pub_formGroupResearch>li").length >= 10) {
            $.jQueryAlert("연구분야는 최대 10개까지 등록할 수 있습니다.");
            return false;
        }
        $("#pub_formGroupResearch").append("<li>" + $("#pub_formGroupResearch li:first").html() + "</li>");
        $("#pub_formGroupResearch li:last>button").attr({
            class: "btn btnIcon subColor minus",
            id: "pub_btnRemoveRowResearch"
        });
    });

    $("#pub_formGroupResearch").on("click", "#pub_btnRemoveRowResearch", function () {
        $(this).parent("li").remove();
    });

    $("#pub_btnAddRowResearch").on("click", ".fSelect", function () {
        var $select = $(this).children("select");
        $select.focus();
    });

    $("#pub_btnAddRowResearch").on("change", ".fSelect select", function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("span").text(select_name);
    });

    // 참고: 행 추가/삭제 적용 - 저자 상세 동일저자 병합요청
    $("#pub_btnAddRowAuthor").on("click", function () {
        if ($("#pub_formGroupAuthor>li").length >= 5) {
            var varLang = $(this).next().val();
            var varMsg;
            if (varLang === 'ko_KR') {
                varMsg = '저자명은 최대 5개까지 입력하실 수 있습니다.';
            } else {
                varMsg = 'You can enter up to 5 author names.';
            }
            $.jQueryAlert(varMsg, varLang);
            return false;
        }
        $("#pub_formGroupAuthor").append("<li>" + $("#pub_formGroupAuthor li:first").html() + "</li>");
        $("#pub_formGroupAuthor li:last>button").attr({
            class: "btn btnIcon subColor minus",
            id: "pub_btnRemoveRowAuthor"
        });
    });

    $("#pub_formGroupAuthor").on("click", "#pub_btnRemoveRowAuthor", function () {
        $(this).parent("li").remove();
    });

    $("#pub_btnAddRowAuthor").on("click", ".fSelect", function () {
        var $select = $(this).children("select");
        $select.focus();
    });

    $("#pub_btnAddRowAuthor").on("change", ".fSelect select", function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("span").text(select_name);
    });

    // 참고: 행 추가/삭제 적용 - 저자 상세 논문추가요청
    $("#pub_btnAddRowAuthor2").on("click", function () {
        if ($("#pub_formGroupAuthor2>li").length >= 5) return false;
        $("#pub_formGroupAuthor2").append("<li>" + $("#pub_formGroupAuthor2 li:first").html() + "</li>");
        $("#pub_formGroupAuthor2 li:last>button").attr({
            class: "btn btnIcon subColor minus",
            id: "pub_btnRemoveRowAuthor2"
        });
    });

    $("#pub_formGroupAuthor2").on("click", "#pub_btnRemoveRowAuthor2", function () {
        $(this).parent("li").remove();
    });

    $("#pub_btnAddRowAuthor2").on("click", ".fSelect", function () {
        var $select = $(this).children("select");
        $select.focus();
    });

    $("#pub_btnAddRowAuthor2").on("change", ".fSelect select", function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("span").text(select_name);
    });

    // 참고: 체크박스 show/hide 적용
    $('.checkOption').on('click', function () {
        if ($("input:checkbox.checkOption").is(":checked") == true) {
            $(".showInfo").show();
        } else {
            $(".showInfo").hide();
        }
    });

    // 체크박스 추가 210511
    $('#pub_check_all').on('click', function () {
        if ((location.href).indexOf("mylib") == -1) {
            if ($("input:checkbox#pub_check_all").is(":checked") == true) {
                $("#pub_funcButton button:not('.btnRegThesis')").addClass("active");
            } else {
                $("#pub_funcButton button:not('.btnRegThesis')").removeClass("active");
            }
        }
    });

    // 참고: 체크박스 기능버튼 활성화/비활성화 적용
    /*	$('.checkButtonActive').on('click', function() {
            if($("input:checkbox.checkButtonActive").is(":checked") == true){
                $("#pub_funcButton button:not('.btnRegThesis')").addClass("active");
            }else{
                $("#pub_funcButton button:not('.btnRegThesis')").removeClass("active");
                $("#pub_btnFolderManage").removeClass("open");
                $("#pub_folderManageArea").animate({
                    "top":"15px",
                    opacity:0
                }, 100);
            }
        });*/

    // 참고: 체크박스 텍스트 이탤릭체 적용
    $('.checkTextItalic').on('click', function () {
        if ($("input:checkbox.checkTextItalic").is(":checked") == true) {
            $(this).parents(".textOpt").children(".btnTextOpt").addClass("txtItalic");
        } else {
            $(this).parents(".textOpt").children(".btnTextOpt").removeClass("txtItalic");
        }
    });

    // 참고: 본문 상단 플로팅 메뉴 적용
    $(window).scroll(function () {
        if ($(this).scrollTop() > 542) {
            $('.floatingBarWrap').fadeIn(50);
        } else {
            $('.floatingBarWrap').fadeOut(50);
        }
    });

    // 참고: top 버튼 적용
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.gTopNavi').fadeIn(50);
        } else {
            $('.gTopNavi').fadeOut(50);
        }
    });

    $("#pub_btnTop").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 200);
        return false;
    });

    // 참고: tab 메뉴 적용
    $('.eTab').each(function () {
        var selected = $(this).find('> ul > li.selected > a');
        if (selected.siblings('ul').length <= 0) {
            $(this).removeClass('gExtend');
        }
    });
    $('body').delegate('.eTab a', 'click', function (e) {
        var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
            _target = $(this).attr('href');
        var _this = $(this);
        if ($(_target).hasClass('tabContent')) {
            var _targetClass = '.' + 'tabContent';
        }
        $(_target).show().siblings(_targetClass).hide();

        // gExtend ctrl
        var mtab = $(this).parents('.mTab:first');
        if ($(this).siblings('ul').length > 0) {
            if (!mtab.hasClass('gExtend')) {
                mtab.addClass('gExtend');
            }
        } else {
            if ($(this).parents('ul:first').siblings('a').length <= 0) {
                mtab.removeClass('gExtend');
            }
        }
        e.preventDefault();
    });

    // 참고: 약관동의 체크박스 적용
    $('.checkAll').click(function () {
        $('.abs').prop('checked', this.checked);
    });

    // 참고: 자동로그인 툴팁 적용
    $("#pub_autoLogin").change(function () {
        if ($("#pub_autoLogin").is(":checked")) {
            $("#pub_tooltip_autoLoginSNS").hide();
            $("#pub_tooltip_autoLogin").show();
        } else {
            $("#pub_tooltip_autoLogin").hide();
        }
    });

    $("#pub_autoLoginSNS").change(function () {
        if ($("#pub_autoLoginSNS").is(":checked")) {
            $("#pub_tooltip_autoLogin").hide();
            $("#pub_tooltip_autoLoginSNS").show();
        } else {
            $("#pub_tooltip_autoLoginSNS").hide();
        }
    });

    $("#dev_pub_autoLogin").change(function () {
        if ($("#dev_pub_autoLogin").is(":checked")) {
            $("#dev_pub_tooltip_autoLogin").show();
            // setTimeout(function(){
            // 	$("#pub_tooltip_autoLogin").fadeOut();
            // }, 3000);
        } else {
            $("#dev_pub_tooltip_autoLogin").hide();
        }
    });

    // 참고: 마우스 오버 적용
    $("#pub_tileUI .btnLink").hover(function () {
        $(this).parent().addClass("over");
    });
    $("#pub_tileUI .btnLink").mouseleave(function () {
        $(this).parent().removeClass("over");
    });

    // 참고: 충전 안내 적용
    $("#pub_paymentMethod a, #pub_paymentAmount button, #pub_sort a").click(function () {
        if ($(this).parent().hasClass('selected')) {
            $(this).parent().removeClass("selected");
        } else {
            $(this).parent().addClass("selected");
            $(this).parent().siblings().removeClass("selected");
        }

    });

    // 참고: 결제하기 결제수단 적용
    $(".buttonArea.payMent button").click(function () {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
    });

    // 참고: 정렬 순서 적용
    $("#pub_sort a").click(function () {
        $(this).parent().addClass("selected");
        $(this).parent().siblings().removeClass("selected");
    });

    // 참고: 버튼 선택 적용
    $(".gSelected").click(function (e) {
        var spreadBool = $(this).hasClass("selected");
        if (spreadBool === false) {
            $(this).addClass("selected");
        } else {
            $(this).removeClass("selected");
        }
        e.preventDefault();
    });

    /* 참고: 논문상세 북마크 버튼 적용
    $(".bookmarkSelected").click(function(e) {
        var spreadBool = $(".bookmarkSelected").hasClass("selected");
        if(spreadBool === false) {
            $(".bookmarkSelected").addClass("selected");
        } else {
            $(".bookmarkSelected").removeClass("selected");
        }
        e.preventDefault();
    });
     */
    // 참고: 버튼 선택 (one) 적용
    $(function () {
        $(".gSelectedOne").click(function () {
            $(".gSelectedOne").removeClass("selected");
            if (!$(this).next().is(":visible")) {
                $(this).addClass("selected");
            }
        })
    });

    // 참고: 버튼 선택 (one) 적용 - 패싯
    $(function () {
        $(".gSelectedFaceted").click(function () {
            $(".gSelectedFaceted").removeClass("selected");
            if (!$(this).next().is(":visible")) {
                $(this).addClass("selected");
                $(this).parent().siblings(".directMod").addClass("selected");
            }
        })
    });

    // 참고: TR 토글 적용
    if ($("tr").is(".trVisible") === true) {
        $(".trVisible>td:gt(0)").append("<a href='#none'>View More</a>");
    }


    /*$(".trVisible a").click(function() {
        $(this).parent().parent().nextUntil(".trVisible").toggle();

        var spreadBool = $(this).parent().siblings(".iconArrow").hasClass("open");
        if(spreadBool === false) {
            $(this).parent().siblings(".iconArrow").addClass("open").html('<span class="icon arrowUp">화살표</span>');
        } else {
            $(this).parent().siblings(".iconArrow").removeClass("open").html('<span class="icon arrowDown">화살표</span>');
        }
        e.preventDefault();
    });*/

    /* 참고: 말줄임 처리 적용*/
    var ellipsisText = function (e, etc) {
        var abst = $.trim($(e).text());
        var wordArray = abst.split(" ");
        if (wordArray.length < 2) {
            wordArray = [];
            for (var i = 0; i < abst.length; i++) {
                wordArray.push(abst.substring(i, i + 1));
            }
        }
        while (e.scrollHeight > e.offsetHeight) {
            wordArray.pop();
            e.innerHTML = wordArray.join(" ") + (etc || " ...");
        }
    };
    [].forEach.call(document.querySelectorAll(".txtEllipsisPureJS"), function (elem) {
        ellipsisText(elem);
    });

    // 참고: 모달 팝업 적용
    $('.btnModal').on('click', function () {
        var layerId = $(this).attr('id');
        if(typeof layerId === "undefined"){
            layerId = "#"+$(this).attr('data-layer-id');
        }
        var screenW = $(window).width();
        var screenH = $(window).height();
        var scrollTop = $(window).scrollTop();
        var popW = $(layerId).innerWidth();
        var popH = $(layerId).innerHeight();
        var posX = (screenW - popW) / 2;
        var posY = ((screenH - popH) / 2) + scrollTop;
        $(layerId).css({
            left: posX,
            top: posY
        }).fadeIn(150);
        $(layerId).wrap('<div></div>');
        $(layerId).parent('div').addClass('modalWrap');
        $('body').addClass('modalOpen');
        $('button, a').blur();
        return false;
    });

    $.fn.openLayerId = function () {
        var screenW = $(window).width();
        var screenH = $(window).height();
        var scrollTop = $(window).scrollTop();
        var popW = $(this).innerWidth();
        var popH = $(this).innerHeight();
        var posX = (screenW - popW) / 2;
        var posY = ((screenH - popH) / 2) + scrollTop;
        $(this).css({
            left: posX,
            top: posY
        }).fadeIn(150);
        $('button, a').blur();
        return false;
    };

    $('.closeModal').on('click', function () {
        var layerId = $(this).attr('id');
        if(typeof layerId === "undefined"){
            layerId = "#"+$(this).attr('data-layer-id');
        }
        $(layerId).hide();
        $(this).parents('.modal').unwrap();
        $(this).parents('.modal').removeClass('modalWrap');
        $('body').removeClass('modalOpen');

        //모달 1개 일때 배경색 조정
        if ($('.modalWrap').length < 2) {
            $('.modalWrap').removeClass('adjustBG');
        }


        return false;
    });

    $.fn.openLayer = function (id, zIndex) {
        if(id === "#pub_modalLoginPop" && typeof showLoginLayer !== "undefined") {
            showLoginLayer();
            return;
        }

        if(id === "#pub_modalOrganPop" && typeof showOrganizationLayer !== "undefined") {
            showOrganizationLayer();
            return;
        }

        var layerId = id;
        var screenW = $(window).width();
        var screenH = $(window).height();
        var scrollTop = $(window).scrollTop();
        var popW = $(layerId).innerWidth();
        var popH = $(layerId).innerHeight();
        var posX = (screenW - popW) / 2;
        var posY = ((screenH - popH) / 2) + scrollTop;
        $(layerId).css({
            left: posX,
            top: posY
        }).fadeIn(150);
        $(layerId).wrap('<div></div>');
        $(layerId).parent('div').addClass('modalWrap');

        if (typeof zIndex !== 'undefined' && zIndex !== '') {
            $(layerId).parent('div').css('z-index', zIndex);
        }

        setTimeout(function () {
            $('body').addClass('modalOpen');
        }, 0);
        $('button, a').blur();

        //인증 모달 2개 일때 배경색 조정
        if ($('.modalWrap').length > 1) {
            $('.modalWrap').addClass('adjustBG');
        } else {
            $('.modalWrap').removeClass('adjustBG');
        }

        // 외부영역 클릭 시 모달창 닫기
        $('.modalWrap').mouseup(function (e) {
            var modalWrap = $(this);

            if (modalWrap.length < 1) {
                modalWrap = $(this).parents('.modalWrap');
                if (modalWrap.length < 1)
                    return false;
            }

            //모달 밖을 클릭했을 때 outClickNoClose 가있으면 닫도록 하지 않음
            if (modalWrap.children('.outClickNoClose').length > 0)
                return false

            var modal = modalWrap.find('.modal');

            // 기관 인증 - 목록 버튼 누른 경우
            if (e.target.className === 'ui-menu-item-wrapper ui-state-active')
                return false;
            if (e.target.className !== 'modalScreen opacity' && modal.has(e.target).length !== 0)
                return false;

            // 모달창이 보이고 있는 경우
            if (modal.is(':visible') === false)
                return false;

            if (modal.length < 1)
                return false;

            // 닫기 버튼 class가 closeModal 인 경우
            var closeModal = modal.find('.closeModal');
            if (closeModal.length > 0) {
                closeModal.trigger('click');
                return false;
            }

            // 닫기 버튼 class가 close 인 경우
            var close = modal.find('.close');
            if (close.length > 0) {
                close.trigger('click');
                return false;
            }

            return false;
        });

        return false;
    };

    /**
     * 모달창 닫는경우 URL 해시값 삭제 로직 포함
     * @param id
     * @param zIndex
     * @returns {boolean}
     */
    $.fn.openLayerHashDelete = function (id, zIndex) {
        var layerId = id;
        var screenW = $(window).width();
        var screenH = $(window).height();
        var scrollTop = $(window).scrollTop();
        var popW = $(layerId).innerWidth();
        var popH = $(layerId).innerHeight();
        var posX = (screenW - popW) / 2;
        var posY = ((screenH - popH) / 2) + scrollTop;
        $(layerId).css({
            left: posX,
            top: posY
        }).fadeIn(150);
        $(layerId).wrap('<div></div>');
        $(layerId).parent('div').addClass('modalWrap');

        if (typeof zIndex !== 'undefined' && zIndex !== '') {
            $(layerId).parent('div').css('z-index', zIndex);
        }

        setTimeout(function () {
            $('body').addClass('modalOpen');
        }, 0);
        $('button, a').blur();

        //인증 모달 2개 일때 배경색 조정
        if ($('.modalWrap').length > 1) {
            $('.modalWrap').addClass('adjustBG');
        } else {
            $('.modalWrap').removeClass('adjustBG');
        }

        $('.closeModal').on('click', function () {
            if (document.location.hash)
                document.location.hash = '';
            return false;
        });

        // 외부영역 클릭 시 모달창 닫기
        $('.modalWrap').mouseup(function (e) {
            var modalWrap = $(this);

            if (modalWrap.length < 1) {
                modalWrap = $(this).parents('.modalWrap');
                if (modalWrap.length < 1)
                    return false;
            }

            //모달 밖을 클릭했을 때 outClickNoClose 가있으면 닫도록 하지 않음
            if (modalWrap.children('.outClickNoClose').length > 0)
                return false

            var modal = modalWrap.find('.modal');

            // 기관 인증 - 목록 버튼 누른 경우
            if (e.target.className === 'ui-menu-item-wrapper ui-state-active')
                return false;
            if (e.target.className !== 'modalScreen opacity' && modal.has(e.target).length !== 0)
                return false;

            // 모달창이 보이고 있는 경우
            if (modal.is(':visible') === false)
                return false;

            if (modal.length < 1)
                return false;

            // 닫기 버튼 class가 closeModal 인 경우
            var closeModal = modal.find('.closeModal');
            if (closeModal.length > 0) {
                closeModal.trigger('click');
                if (document.location.hash)
                    document.location.hash = '';
                return false;
            }

            // 닫기 버튼 class가 close 인 경우
            var close = modal.find('.close');
            if (close.length > 0) {
                close.trigger('click');
                if (document.location.hash)
                    document.location.hash = '';
                return false;
            }

            return false;
        });

        return false;
    };

    $.fn.closeLayer = function (id) {
        var layerId = $(this).attr('id');
        $(layerId).hide();
        $('.modal').hide();
        $('.modalWrap').contents().unwrap();
        $('body').removeClass('modalOpen');

        //모달 1개 일때 배경색 조정
        if ($('.modalWrap').length < 2) {
            $('.modalWrap').removeClass('adjustBG');
        }


        return false;
    };

    /*$("body").click(function(e){
        if(!$(".modalContent").has(e.target).length){ // modal에 클릭 이벤트가 발생되어 있는게 없다면 아래 내용을 실행.
            $('.modal').hide();
            $( '.modalWrap' ).contents().unwrap();
            $('body').removeClass('modalOpen');
            return false;
        }
    });*/

    // 참고: 모달 팝업 (다중) 적용
    $(function () {
        $('.modal .modalScreen').addClass("opacity");
    });

    // 참고: 공지사항 레이어 팝업 적용
    $.fn.openLayerPopup = function (id) {
        var layerId = id;
        $(layerId).fadeIn(150);
        return false;
    };

    $.fn.closeLayerPopup = function (id) {
        var layerId = $(this).attr('id');
        $(layerId).hide();
        return false;
    };

    $('.closeLayer').on('click', function () {
        var layerId = $(this).attr('id');
        $(layerId).hide();
        return false;
    });

    // 참고: 얼러트 적용
    jQuery.jQueryAlert = function (msg, lang, cura_nodeId) {
        var returnBoolean = false;
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var varBtnNm = '확인';
        if (typeof lang !== 'undefined' && lang === 'en_US') {
            varBtnNm = 'Done';
        } else {
            if (typeof getCookie === "function" && //getCookie 함수가 있는지 확인
                typeof getCookie('language') !== "undefined" && //language 값이 있는지 확인
                getCookie('language').indexOf("e") !== -1) { //language가 영문이면
                varBtnNm = 'Done';
            }
        }

        $($messageBox).dialog({
            open: $($messageBox).append(msg),
            title: "경고창",
            autoOpen: true,
            modal: true,
            buttons: [
                {
                    text: varBtnNm,
                    click: function () {
                        $(this).dialog("close");
                        returnBoolean = true;
                        if (cura_nodeId != undefined && cura_nodeId.indexOf('cura') == 0) {
                            nodeUse(cura_nodeId.substring(cura_nodeId.lastIndexOf('cura') + 4) + '|147003');
                        }
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert");
        $(".ui-dialog").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1)").css({
            "background-color": "#3c63e0",
            "border": "1px solid #3c63e0"
        });
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1):hover").css({
            "background-color": "#304fb3 !important;",
            "border": "1px solid #304fb3 !important;"
        });

        return returnBoolean;
    };

    jQuery.jQueryAlertForLogin = function (msg, lang) {
        var returnBoolean = false;
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var varBtnNm = '확인';
        if (typeof lang !== 'undefined' && lang === 'en_US') {
            varBtnNm = 'Done';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(msg),
            title: "경고창",
            autoOpen: true,
            modal: true,
            buttons: [
                {
                    text: varBtnNm,
                    click: function () {
                        $(this).dialog("close");
                        returnBoolean = true;
                        $.fn.openLayer('#pub_modalLoginPop');
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert");
        $(".ui-dialog").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1)").css({
            "background-color": "#3c63e0",
            "border": "1px solid #3c63e0"
        });
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1):hover").css({
            "background-color": "#304fb3 !important;",
            "border": "1px solid #304fb3 !important;"
        });

        return returnBoolean;
    };

    jQuery.jQueryAlertMove = function (msg, url, color) {
        let btnNm = '확인';
        if (typeof getCookie === "function" && //getCookie 함수가 있는지 확인
            typeof getCookie('language') !== "undefined" && //language 값이 있는지 확인
            getCookie('language').indexOf("e") !== -1) { //language가 영문이면
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

    // 참고: 얼러트 (버튼2개) 적용
    jQuery.jQueryAlertTwoButton = function (msg, lang, todayChk) {
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var varBtnNmOk = '확인';
        var varBtnNmCancel = '취소';
        var alertMsg = '오늘 하루 그만 보기';

        if (typeof lang !== 'undefined' && lang === 'en_US') {
            varBtnNmOk = 'OK';
            varBtnNmCancel = 'Cancel';
            alertMsg = 'Do not show today';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(msg),
            title: "경고창",
            autoOpen: true,
            modal: true,
            create: function (e, ui) {
                if (typeof todayChk !== 'undefined' && todayChk === 'Y') {
                    var pane = $(this).dialog('widget').find('.ui-dialog-buttonpane');
                    $('<label class="cookieChk"><input type="checkbox" id="notSee"/>' + alertMsg + '</label>').prependTo(pane);
                }
            },
            buttons: [
                {
                    text: varBtnNmCancel,
                    click: function () {
                        if (typeof todayChk !== 'undefined' && todayChk === 'Y' && $("input:checkbox[id='notSee']").is(":checked")) {
                            setCookie('alertNotView', 'Y', 1);
                        }
                        $(this).dialog("close");
                    }
                },
                {
                    text: varBtnNmOk,
                    click: function () {
                        if (typeof todayChk !== 'undefined' && todayChk === 'Y' && $("input:checkbox[id='notSee']").is(":checked")) {
                            setCookie('alertNotView', 'Y', 1);
                        }
                        if (typeof url !== 'undefined') location.href = url;
                        $(this).dialog("close");
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert");
        $(".ui-dialog").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button").css("width", "135px");

        if (typeof todayChk !== 'undefined' && todayChk === 'Y') {
            $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("margin-bottom", "1em");
            $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("display", "block");
        }
    };

    jQuery.jQueryAlertTwoButtonCheck = function (msg, lang) {
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var varBtnNmOk = '확인';
        var varBtnNmCancel = '취소';

        if (typeof lang !== 'undefined' && lang === 'en_US') {
            varBtnNmOk = 'Ok';
            varBtnNmCancel = 'Cancel';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(msg),
            title: "",
            autoOpen: true,
            modal: true,
            create: function (e, ui) {
                var pane = $(this).dialog('widget').find('.ui-dialog-buttonpane');
                $('<label class="cookieChk"><input type="checkbox" id="notSee"/> <spring:message code="page.common.articleDetailModal.st.label_0004"/></label>').prependTo(pane)
            },
            buttons: [
                {
                    text: varBtnNmCancel,
                    click: function () {
                        if ($("input:checkbox[id='notSee']").is(":checked")) {
                            setCookie('eventNotView', 'Y', 1);
                        }
                        $(this).dialog("close");
                    }
                },
                {
                    text: varBtnNmOk,
                    click: function () {
                        if ($("input:checkbox[id='notSee']").is(":checked")) {
                            setCookie('eventNotView', 'Y', 1);
                        }
                        $.fn.openLayerNew('#pub_modalDownloadEvent');
                        $(this).dialog("close");
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert");
        $(".ui-dialog").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button").css("width", "135px");
        $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("margin-bottom", "1em");
        $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("display", "block");
    };

    /**
     * 로그인 시 등장하는 기관인증 남은 기한 알림 팝업 (최초 기관 인증시 등장)
     * @param {lang, loginMsg, b2c_id, b2b_id, dayCnt} args
     */
    jQuery.alertConn = function (args) {
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var btnNm = '확인';
        if (typeof args[0] !== 'undefined' && args[0] === 'en_US') {
            btnNm = 'Ok';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(args[1]),
            title: "alert",
            autoOpen: true,
            modal: true,
            buttons: [
                {
                    text: btnNm,
                    click: function () {
                        $.ajax({
                            type: "GET",
                            url: "/member/b2cAlrtChk",
                            data: {"id": args[2]},
                            dataType: "json",
                            success: function () {
                            }
                        });
                        $(this).dialog("close");
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1)").css({
            "background-color": "#3c63e0",
            "border": "#3c63e0"
        });
    };

    /**
     * 로그인 시 등장하는 기관인증 남은 기한 알림 팝업 (D-1 ~ D-7 사용)
     * @param {lang, loginMsg, dev_b2cId_chk, dev_b2bId_chk, dayCnt} args
     */
    jQuery.alertConnChk = function (args) {
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var btnNm = '확인';
        var chkNm = ' 다시 보지 않기';
        var loginMsg = '기관인증 연결 기간이<span style=\"color:red\"> ' + args[4] + '</span>일 남았습니다.'
            + '</br>기간이 끝나면, 기관인증을 다시 진행해주세요.';

        var notSeeFnc = function () {
            if ($("#notSee").is(":checked")) {
                $.ajax({
                    type: "GET",
                    url: "/member/b2cAlrtChk",
                    data: {"id": args[2]},
                    dataType: "json",
                    success: function () {
                        fn_statistics('A179', args[3], args[2]);
                    }
                });
            }
        };

        if (typeof args[0] !== 'undefined' && args[0] === 'en_US') {
            btnNm = 'Ok';
            chkNm = ' Do not show again';
            loginMsg = 'You have<span style=\"color:red\">  ' + args[4] + '</span>'
                + ' days left to maintain institutional access.'
                + '</br>When period is over, please proceed with Institutional Access again.';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(loginMsg),
            title: "alert",
            autoOpen: true,
            modal: true,
            create: function () {
                var pane = $(this).dialog('widget').find('.ui-dialog-buttonpane');
                $('<label class="cookieChk" id="labelCookieChk"><input type="checkbox" id="notSee"/>' + chkNm + '</label>').prependTo(pane);
            },
            buttons: [
                {
                    text: btnNm,
                    click: function () {
                        notSeeFnc();
                        $(this).dialog("close");
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1)").css({
            "background-color": "#3c63e0",
            "border": "#3c63e0"
        });
        $("#labelCookieChk").css({
            "margin-bottom": "1em",
            "display": "block"
        });
        $("#notSee").css("vertical-align", "-1px").blur();
    };

    /**
     * 로그인 시 등장하는 기관인증 남은 기한 알림 팝업 (D-0 사용)
     * @param {lang, loginMsg, dev_b2cId_chk, dev_b2bId_chk, dayCnt} args
     */
    jQuery.alertConnMoveChkTwoBtn = function (args) {
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var btnNm = '기관인증 바로가기';
        var chkNm = ' 다시 보지 않기';
        var cancelNm = '닫기';
        var notSeeFnc = function () {
            if ($("#notSee").is(":checked")) {
                $.ajax({
                    type: "GET",
                    url: "/member/b2cAlrtChk",
                    data: {"id": args[2]},
                    dataType: "json",
                    success: function () {
                        fn_statistics('A179', args[3], args[2]);
                    }
                });
            }
        };

        if (typeof args[0] !== 'undefined' && args[0] === 'en_US') {
            btnNm = 'Institutional Access shortcuts';
            chkNm = ' Do not show again';
            cancelNm = 'Close';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(args[1]),
            title: "alert",
            autoOpen: true,
            modal: true,
            create: function () {
                var pane = $(this).dialog('widget').find('.ui-dialog-buttonpane');
                $('<label class="cookieChk" id="labelCookieChk"><input type="checkbox" id="notSee"/>' + chkNm + '</label>').prependTo(pane);
            },
            buttons: [
                {
                    text: cancelNm,
                    click: function () {
                        notSeeFnc();
                        $(this).dialog("close");
                    }
                },
                {
                    text: btnNm,
                    click: function () {
                        notSeeFnc();
                        $(this).dialog("close");
                        fn_statistics('A180', args[3], args[2]);
                        location.href = "/member/b2bLogin";
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1)").css({
            "min-width": "50px",
            "width": "50px",
            "background-color": "#ffffff00",
            "color": "#444444",
            "border": "#ffffff00"
        });
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(2)").css("width", "220px");
        $("#labelCookieChk").css({"margin-bottom": "1em", "display": "block"});
        $("#notSee").css("vertical-align", "-1px").blur();
    };

    /**
     * 확인 버튼을 누른 뒤에 다음 함수를 실행
     */
    jQuery.jQueryAlertSync = function (msg, func, paramArr, lang) {
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var varBtnNm = '확인';
        if (typeof lang !== 'undefined' && lang === 'en_US') {
            varBtnNm = 'Done';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(msg),
            title: "경고창",
            autoOpen: true,
            modal: true,
            buttons: [
                {
                    text: varBtnNm,
                    click: function () {
                        $(this).dialog("close");
                        func(paramArr);
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert");
        $(".ui-dialog").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1)").css({
            "background-color": "#3c63e0",
            "border": "1px solid #3c63e0"
        });
        $(".ui-dialog .ui-dialog-buttonpane button:nth-child(1):hover").css({
            "background-color": "#304fb3 !important;",
            "border": "1px solid #304fb3 !important;"
        });

    }

    /**
     * 확인 버튼을 누른 뒤에 다음 함수를 실행(버튼 2개)
     */
    jQuery.jQueryAlertTwoButtonSync = function (msg, func, paramArr, lang) {
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var varBtnNmOk = '확인';
        var varBtnNmCancel = '취소';

        if (typeof lang !== 'undefined' && lang === 'en_US') {
            varBtnNmOk = 'Ok';
            varBtnNmCancel = 'Cancel';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(msg),
            title: "",
            autoOpen: true,
            modal: true,
            buttons: [
                {
                    text: varBtnNmCancel,
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: varBtnNmOk,
                    click: function () {
                        $(this).dialog("close");
                        func(paramArr);
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert");
        $(".ui-dialog").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button").css("width", "135px");
        $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("margin-bottom", "1em");
        $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("display", "block");
    };

    jQuery.jQueryAlertTwoButtonSyncButtonNames = function (msg, callback, callbackParams, lang, okButtonName, cancelButtonName) {
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var varBtnNmOk = okButtonName;
        var varBtnNmCancel = cancelButtonName;

        if (typeof lang !== 'undefined' && lang === 'en_US') {
            varBtnNmOk = 'Ok';
            varBtnNmCancel = 'Cancel';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(msg),
            title: "",
            autoOpen: true,
            modal: true,
            buttons: [
                {
                    text: varBtnNmCancel,
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: varBtnNmOk,
                    click: function () {
                        $(this).dialog("close");
                        callback(callbackParams);
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert");
        $(".ui-dialog").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button").css("width", "135px");
        $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("margin-bottom", "1em");
        $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("display", "block");
    };


    /*
    $(document).on('change', '.cookieChk input', function(){
        if ($("input:checkbox[id='notSee']").is(":checked"))
            $("input:checkbox[id='notSee']").prop("checked", false);
        else
            $("input:checkbox[id='notSee']").prop("checked", true);
    });
*/


    /**
     * layer open 방식 변경
     */
    $.fn.openLayerNew = function (id, isDivision) {
        var layerId = id;
        var screenW = $(window).width();
        var screenH = $(window).height();
        var scrollTop = $(window).scrollTop();
        var popW = $(layerId).innerWidth();
        var popH = $(layerId).innerHeight();
        var posX = (screenW - popW) / 2;
        var posY = ((screenH - popH) / 2) + scrollTop;

        var varOepenLayer = $(layerId).clone();
        varOepenLayer.attr('id', 'openPopLayer');

        // 기본적으로 팝업 오픈 시 팝업 안에 value 값 초기화
        // isDivision 값이 있으면 특수한 경우라 판단 초기화 안함
        if (typeof isDivision === 'undefined') {
            if (layerId !== '#pub_modalDownloadEvent' && layerId !== '#pub_modalReportError') {
                // 복제된 layer input 값 초기화
                varOepenLayer.find('input, textarea').each(function () {
                    $(this).val('');
                });
            }
        }

        $('body').append(varOepenLayer);

        $('#openPopLayer').wrap('<div class="modalWrap"></div>');
        $('#openPopLayer').css({left: posX, top: posY}).fadeIn(150);

        setTimeout(function () {
            $('body').addClass('modalOpen');
        }, 0);

        //인증 모달 2개 일때 배경색 조정
        if ($('.modalWrap').length > 1) {
            $('.modalWrap').addClass('adjustBG');
        } else {
            $('.modalWrap').removeClass('adjustBG');
        }
    };

    /**
     * layer close 방식 변경
     */
    $.fn.closeLayerNew = function (id) {
        $(id).hide();
        $(id).unwrap();
        $(id).remove();
        $('body').removeClass('modalOpen');

        //모달 1개 일때 배경색 조정
        if ($('.modalWrap').length < 2) {
            $('.modalWrap').removeClass('adjustBG');
        }
    };

    // layer close
    $(document).on('click', '#openPopLayer .closeModal', function () {
        $.fn.closeLayerNew('#openPopLayer');
    });


    // 라디오 버튼 다시 선택 시 선택 해제
    var varRadioChecked = -1;
    $(".fRadio > input[type=radio]").click(function () {
        var index = $(this).next().index("label");

        if (varRadioChecked === index) {
            varRadioChecked = -1;
            $(this).prop('checked', false);
        } else {
            varRadioChecked = index;
        }
    });

    // 동일저자 병합요청 시 체크 항목 같은 건 동시에 체크되게 설정
    $(document).on('click', 'input[name=mergeAutrReq]', function () {
        var varIsChk = $(this).is(':checked');
        var varThisId = $(this).attr('id');
        var varGroupChk = $(this).attr('chk');	// 전체 체크와 하위 체크박스를 비교하기 위한 값
        var isChecked = 0;	// 체크 된 체크박스 계수
        var chkLen = 0;		// 하위 체크박스 개수

        $('input[name=mergeAutrReq]').each(function (idx) {	// 같은 종류의 논문이면 같이 체크
            var varChkId = $(this).attr('id');
            if (varThisId === varChkId) {
                $(this).prop('checked', varIsChk);
            }
        });

        $('input[name=mergeAutrReq]').each(function (idx) {	// 체크된 논문 확인
            if (varGroupChk === $(this).attr('chk')) {
                chkLen++;
                if ($(this).is(':checked')) {
                    isChecked++;
                }
            }
        });

        $('input[name=ck_merge_anc_id]').each(function (idx) {	// 논문이 전체 체크가 되어있으면 상위 체크박스 선택 아닐 경우 해제
            if ($(this).val() === varGroupChk) {
                if (chkLen === isChecked) {
                    $(this).prop('checked', true);
                } else {
                    $(this).prop('checked', false);
                }
            }
        });

    });

    // 동일저자 병합요청 시 전체 체크박스 선택 시 동일 건이면 동시에 체크되게 설정
    $(document).on('click', 'input[name=ck_merge_anc_id]', function () {
        var varIsChk = $(this).is(':checked');
        var varThisVal = $(this).val();
        $('input[name=ck_merge_anc_id]').each(function (idx) {
            var varChkVal = $(this).val();
            if (varThisVal === varChkVal) {
                $(this).prop('checked', varIsChk);
            }
        });
    });

    //병합 논문 체크박스 전체 체크 (병합 신청 step2)
    fnCkAllMergeNode = function (chk) {
        $('.ck_merge_autr_id_' + chk.value).prop("checked", chk.checked);
    };

    fncStampEvtAlertOneButtonCheck = function (msg, lang, cookieSec) {
        var $messageBox = $.parseHTML('<div id="alertBox"></div>');
        $("body").append($messageBox);

        var varBtnNmOk = '이벤트 페이지 바로가기';
        var varBtnNmCancel = '닫기';

        if (typeof lang !== 'undefined' && lang === 'en_US') {
            varBtnNmOk = 'Move to event page';
            varBtnNmCancel = 'Close';
        }

        $($messageBox).dialog({
            open: $($messageBox).append(msg),
            title: "",
            autoOpen: true,
            modal: true,
            create: function (e, ui) {
                var pane = $(this).dialog('widget').find('.ui-dialog-buttonpane');
                $('<label class="cookieChk"><input type="checkbox" id="notSee"/> 하루동안 보지 않기</label>').prependTo(pane)
            },
            buttons: [
                {
                    text: varBtnNmCancel,
                    click: function () {
                        if ($("input:checkbox[id='notSee']").is(":checked")) {
                            setCookie(cookieSec, 'Y', 1);
                        }
                        $(this).dialog("close");
                    }
                },
                {
                    text: varBtnNmOk,
                    click: function () {
                        if ($("input:checkbox[id='notSee']").is(":checked")) {
                            setCookie(cookieSec, 'Y', 1);
                        }
                        window.location.href = '/event/stamp/stampEventMain';
                        $(this).dialog("close");
                    }
                }
            ]
        });

        $(".ui-dialog").addClass("jQueryAlert");
        $(".ui-dialog").css("margin-top", "-42px");
        $(".ui-dialog .ui-dialog-buttonpane button").css("width", "160px");
        $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("margin-bottom", "1em");
        $(".ui-dialog .ui-dialog-buttonpane .cookieChk").css("display", "block");

        // 팝업창이 2개 중복으로 출력 될 경우 위치 수정
        /*if($('.jQueryAlert').size() === 2){
            var positionX = 40;
            $(".ui-dialog").eq(0).attr('style', 'top:531px;left:'+positionX+'%;');
            $(".ui-dialog").eq(1).attr('style', 'top:240px;left:'+positionX+'%;');
        }*/
    };

    /**
     * 스탬프 이벤트 참여 ( 리포트 확인, 논문 5편 이용, 인용하기 5번 이용, DBpia 채널 추가 )
     */
    fncSetStampEventPartInfo = function (params) {

        var retVal = '';
        var url = '/event/stamp/setStampEvtPartInfo';

        $.ajax({
            url: url,
            type: 'post',
            async: false,
            data: params,
            success: function (data) {
                var jsonData = JSON.parse(data);
                if (typeof jsonData.RET_CODE !== 'undefined') {
                    if (jsonData.RET_CODE === 0) {
                        retVal = true;
                    } else if (jsonData.RET_CODE === 5) {
                        if (typeof (getCookie('thesisUseEventView')) == 'undefined' || getCookie('thesisUseEventView') == null || getCookie('thesisUseEventView') === '') {
                            fncStampEvtAlertOneButtonCheck('논문 5편을 이용하셔서 스탬프 5개가 <br/>적립되었습니다.', 'kr', 'thesisUseEventView');
                        }
                        retVal = true;
                    } else if (jsonData.RET_CODE === -1) {
                        if (typeof (getCookie('todayStamp')) == 'undefined' || getCookie('todayStamp') == null || getCookie('todayStamp') === '') {
                            fncStampEvtAlertOneButtonCheck('하루에 적립할 수 있는 스탬프 수는 10개 입니다.', 'kr', 'todayStamp');
                        }
                        retVal = false;
                    } else if (jsonData.RET_CODE === -2) {
                        console.log('이미 스탬프 적립을 한 논문입니다.');
                        retVal = true;
                    }
                } else {
                    alert(jsonData.ERROR_MSG);
                    retVal = false;
                }
            },
            error: function (error) {
                console.log(error);
            }
        });

        return retVal;
    };

    /**
     * 서버 시간 조회
     * @returns {serverDate, serverTime}
     */
    fncGetServerDate = function () {
        var url = '/common/getServerDateInfo';
        var returnJsonDate;

        $.ajax({
            url: url,
            type: 'post',
            async: false,
            dataType: 'json',
            success: function (data) {
                returnJsonDate = data;
            },
            error: function (error) {
                console.log(error);
            }
        });
        return returnJsonDate;
    };

    //2021.02.18 SNS 로그인(kakao) - 더보기 클릭시
    $(".line_wrap").bind("click", function () {
        //더보기 숨김처리
        $(".line_wrap").css("display", "none");
        //상단 여백 0으로 초기화
        $(".snsTopArea").css("margin-top", "0px");
        //모바일버전일때 SNS 간편 로그인에 여백 및 밑줄 추가
        $(".loginArea .gLeft").addClass("snsMb20");
        //카카오 로그인 외 보여주기
        $(".snsClose").removeClass("snsClose").addClass("snsOpen");

        //2021.02.19 마지막으로 SNS 로그인 내역 표시
        if (getCookie("l-s") != null) {
            var snsNm = getCookie("l-s");
            $(".req_" + snsNm).removeClass("textHidden").addClass("textShow");
        }
    });

});

//location 쿠키에 URL 저장
function setCookieLocation(href) {
    setCookie("location", href, 1);
}

//챗봇 추가
function fnChatBot() {
    // 챗봇 추가 2021-02-26
    window.__ht_wc = window.__ht_wc || {};
    window.__ht_wc.host = 'design.happytalkio.com';
    window.__ht_wc.site_id = '6000000268'; // site_id
    window.__ht_wc.site_name = '피아'; // 회사 이름
    window.__ht_wc.category_id = '129659'; // 대분류 id
    window.__ht_wc.division_id = '129660'; // 중분류 id

    // 고정 및 Custom 파라미터 추가 영역, 파라미터가 여러개인 경우 ,(콤마)로 구분
    // window.__ht_wc.params = 'site_uid=abcd1234,parameter1=param1';
    // 앱 개발시, 웹뷰 Local Storage 사용가능하도록 처리

    let bodyElementTag = document.getElementsByTagName('body')[0];

    let happyTalkImageDiv = document.createElement("div");
    happyTalkImageDiv.classList.add("happyTalkImageDiv");
    happyTalkImageDiv.id = "happyTalkImageDiv"

    let happyTalkImageWrapper = document.createElement("div");
    happyTalkImageWrapper.classList.add("happyTalkImageWrapper");
    happyTalkImageDiv.appendChild(happyTalkImageWrapper);

    let happyTalkImage = document.createElement("img");
    happyTalkImage.src = "/images/common/happytalk_small.png";
    happyTalkImage.width = "70";
    happyTalkImage.height = "70";
    happyTalkImage.alt = "happytalk";
    happyTalkImage.classList.add("happyTalkImage");
    happyTalkImageWrapper.appendChild(happyTalkImage);

    happyTalkImageDiv.onclick = function () {
        callHappyTalk(this);
    };

    function callHappyTalk(prevElement) {
        var happytalk = (function () {
            function WebChatting() {
                this.host = window.__ht_wc.host;
                this.siteId = window.__ht_wc.site_id;
                this.siteName = window.__ht_wc.site_name;
                this.categoryId = window.__ht_wc.category_id;
                this.divisionId = window.__ht_wc.division_id;
                this.params = window.__ht_wc.params || '';
                this.partnerId = window.__ht_wc.partner_id;
                this.shopId = window.__ht_wc.shop_id;
                this.iframe = null;
                this.protocol = 'https:' == document.location.protocol ? 'https://' : 'http://';
                this.shadowSize = 20; // box-shadow 처리를 위한 변수값
                this.halfShadowSize = this.shadowSize / 2;
            }

            WebChatting.prototype = {
                createIframe: function (extraParams) {
                    var url = this.protocol + this.host + '/chatting';
                    var src = url +
                        '?siteId=' + this.siteId +
                        '&categoryId=' + this.categoryId +
                        '&divisionId=' + this.divisionId +
                        '&siteName=' + encodeURI(this.siteName) +
                        '&params=' + encodeURI(this.params) + (extraParams ? extraParams : '') +
                        '&partnerId=' + (this.partnerId ? this.partnerId : '') +
                        '&shopId=' + (this.shopId ? this.shopId : '');

                    this.iframe = document.createElement('iframe');
                    this.iframe.id = 'HappytalkIframe';
                    this.iframe.src = src;

                    this.iframe.setAttribute('allowtransparency', 'true');
                    this.iframe.setAttribute('frameborder', '0');

                    this.iframe.style.margin = '0px';
                    this.iframe.style.zIndex = '999999999';

                    document.body.appendChild(this.iframe);

                    return this.iframe;
                },
                setButtonInfo: function (data) {
                    this.iframe.style.position = 'fixed';
                    this.iframe.style.left = data.position === 'left' ? (data.left - this.halfShadowSize) + 'px' : 'auto';
                    this.iframe.style.right = data.position === 'right' ? (data.right - this.halfShadowSize) + 'px' : 'auto';
                    this.iframe.style.bottom = (data.bottom - this.halfShadowSize) + 'px';
                    this.iframe.style.width = (data.size + this.shadowSize) + 'px';
                    this.iframe.style.height = data.chatButtonsHeight ? (data.chatButtonsHeight + this.shadowSize) + 'px' : '0px';
                },
                setChatWindow: function (data) {
                    var device = data.device;
                    var chatWindowBottom = data.size + 10;

                    if (device === 'pc') {
                        this.iframe.style.width = (data.width + this.shadowSize) + 'px';
                        this.iframe.style.height = (data.height + chatWindowBottom + this.shadowSize) + 'px';
                    }

                    if (device === 'mobile') {
                        this.iframe.style.left = 0;
                        this.iframe.style.right = 0;
                        this.iframe.style.bottom = 0;
                        this.iframe.style.width = '100%';
                        this.iframe.style.height = '100%';
                    }
                },
                callback: function (type) {
                    var cb = window.__ht_wc.callback;
                    if (typeof cb === 'function') {
                        cb(type);
                    }
                },
                receiveMessage: function (e) {
                    if (e.data.type === 'SET_BUTTON_INFO') {
                        this.setButtonInfo(e.data.value);
                        this.iframe.contentWindow.postMessage({
                            type: 'WINDOW_SIZE',
                            value: {windowWidth: window.innerWidth, windowHeight: window.innerHeight}
                        }, '*');
                    }
                    if (e.data.type === 'SET_CHAT_WINDOW') {
                        this.setChatWindow(e.data.value);
                        this.callback('happytalk_button:open');
                    }
                    if (e.data.type === 'UNSET_CHAT_WINDOW') {
                        this.callback('happytalk_button:close');
                    }
                    if (e.data.type === 'COMPLETE_BUTTON_LOAD') {
                        this.callback('happytalk_button:ready');
                        happytalkIframe.contentWindow.postMessage({type: 'OPEN_CHAT_WINDOW'}, '*');
                    }
                    if (e.data.type === 'CREATE_CHAT_ROOM') {
                        this.callback('happytalk:createChatRoom');
                        $(prevElement).remove();
                        this.iframe.contentWindow.postMessage({type: 'READY_CHAT_ROOM'}, '*');
                    }
                    if (e.data.type === 'CHANGE_PARAMS') {
                        this.callback('happytalk_params:change');
                    }
                    if (e.data.type === 'OPEN_HAPPYTALK_CHANNEL') {
                        this.callback('happytalk_channel:open');
                    }
                    if (e.data.type === 'OPEN_KAKAOTALK_CHANNEL') {
                        this.callback('kakaotalk_channel:open');
                    }
                    if (e.data.type === 'OPEN_NAVERTALK_CHANNEL') {
                        this.callback('navertalk_channel:open');
                    }
                },
            };

            var webChatting = new WebChatting();
            var happytalkIframe = null;

            // 예외 처리
            if (window.__ht_wc.site_id === '') {
                console.log('site_id is not found.');
                return;
            }

            happytalkIframe = webChatting.createIframe();

            window.addEventListener('message', webChatting.receiveMessage.bind(webChatting));

            return {
                open: function () {
                    if (!happytalkIframe) return;
                    happytalkIframe.contentWindow.postMessage({type: 'OPEN_CHAT_WINDOW'}, '*');
                },
                close: function () {
                    if (!happytalkIframe) return;
                    happytalkIframe.contentWindow.postMessage({type: 'CLOSE_CHAT_WINDOW'}, '*');
                    webChatting.callback('happytalk_button:close');
                },
                linkToKakao: function () {
                    if (!happytalkIframe) return;
                    happytalkIframe.contentWindow.postMessage({type: 'LINK_TO_KAKAO'}, '*');
                },
                linkToNaver: function () {
                    if (!happytalkIframe) return;
                    happytalkIframe.contentWindow.postMessage({type: 'LINK_TO_NAVER'}, '*');
                },
                setParams: function (params) {
                    if (!happytalkIframe) return;
                    happytalkIframe.contentWindow.postMessage({type: 'SET_PARAMS', value: params}, '*');
                },
            }
        })();
    }

    bodyElementTag.appendChild(happyTalkImageDiv);
}

function fnPopup(b2c_id, b2b_id) {
    $.ajax({
        url: ProxyUrl + '/popupList',
        type: 'POST',
        success: function (data) {
            let urlPath = window.location.pathname;
            let urlHref = window.location.href;
            $.each(data, function (idx, val) {
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
                    var noticePopup = '<div id="pub_noticeLayerPopup' + val.popupId + '" class="layerPopup" style="max-width:' + val.popWidthSize + 'px; left:' + val.locaLeftSpac + 'px; top:' + val.locaTopSpac + 'px;">';
                    noticePopup += '<div class="layerContent">'
                        + '<div class="layerHeader">'
                        + '<p class="tit txtEllipsis">' + val.ttle + '</p>'
                        + '<button class="closeLayer" id="#pub_noticeLayerPopup' + val.popupId + '"onclick="fn_statistics(\'A165\', \'' + b2b_id + '\', \'' + b2c_id + '\');$(\'#pub_noticeLayerPopup' + val.popupId + '\').hide();"><span class="blind">닫기</span></button>'
                        + '</div>'
                        + '<div class="layerBody" onclick ="fn_statistics(\'A163\', \'' + b2b_id + '\', \'' + b2c_id + '\')">'
                        + val.epln
                        + '</div>'
                        + '<div class="layerFooter">'
                        + '<span class="fCheck">'
                        + '<input type="checkbox" id="pub_notice_check_' + val.popupId + '"onclick="fn_statistics(\'A164\', \'' + b2b_id + '\', \'' + b2c_id + '\');fnPopupCookieChk(\'pub_noticeLayerPopup' + val.popupId + '\',\'' + val.notDispTermCode + '\')">'
                        + '<label for="pub_notice_check_' + val.popupId + '">' + notDispTermNm + '</label>'
                        + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</div>';

                    var exceptedIcst = ['ICST00002768', 'ICST00003500', 'ICST00004871', 'ICST00003494', 'ICST00003502', 'ICST00003437', 'ICST00003244', 'ICST00006225', 'ICST00005105', 'ICST00004376', 'ICST00004368', 'ICST00003548', 'ICST00002648', 'ICST00001637', 'ICST00001526', 'ICST00001126', 'ICST00003603', 'ICST00001573', 'ICST00006361', 'ICST00004729', 'ICST00004551', 'ICST00003135', 'ICST00002767', 'ICST00002557', 'ICST00001450', 'ICST00004567', 'ICST00001545'];
                    if (exceptedIcst.indexOf(b2b_id) < 0) {
                        $("body").append(noticePopup);
                    }

                    if (getCookie("pub_noticeLayerPopup" + val.popupId) != "N") {
                        $("#pub_noticeLayerPopup" + val.popupId).fadeIn(150);
                    }

                    if (val.b2cLognClikYN == 'Y') {
                        if (b2c_id == '') {
                            $(".layerBody").click(function (e) {
                                e.preventDefault();
                                fnLoginLayer();
                            });
                        }
                    }

                }
            });
        }
    });
}

function fnModalClose(modalId, type) {
    $.fn.closeLayer("#" + modalId);
    if (modalId == "pub_modalRegisterBiblio" && type == "view") {
        fnBiblioInfo();
    }
}

const guidanceDomains = ["korea.kr"];
function isGuidanceNeededDomain(domain){
    for(let i=0; i<guidanceDomains.length; i++){
        if(domain === guidanceDomains[i]){
            return true;
        }
    }
    return false;
}

var varFullDate = '';
var varFullTime = '';
var varChkDate = '';
var baseStartDate = '20211005000000';   // 연구지원 프로그램 접수 시작일
var baseEndDate = '20211101000000';     // 연구지원 프로그램 접수 종료일