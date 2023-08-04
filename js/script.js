
/*
상태에 따라 화면이 변하게 하기 위한 state 생성
 */
let state = {
    _state : "login",
    get getState() {
        return this._state;
    },
    set setState(state) {
        this._state = state;
        if(this._state=="main") {
            Main();
        }
        else if(this._state=="projects") {
            Main();
            $(".folder").addClass("on");
            $(".folder > .folder_header > .title").text("Projects");
            $(".folder > .list > .game_list").css("display","none");
            $(".folder > .list > .project_list").css("display","block");
            $(".folder > .container > .project_container").css("display","block");
            $(".project_container").children().css("display","none");
            $(".project_container").children().eq(0).css("display","block");
            $(".project_list > li > ul").children().eq(0).css("font-weight","bold").css("color","#7070f0");
            $(".folder > .container > .game_container").css("display","none");
        }
        else if(this._state=="games") {
            Main();
            $(".folder").addClass("on");
            $(".folder > .folder_header > .title").text("Games");
            $(".folder > .list > .game_list").css("display","block");
            $(".folder > .list > .project_list").css("display","none");
            $(".folder > .container > .project_container").css("display","none");
            $(".folder > .container > .game_container").css("display","block");
        }
        sessionStorage.setItem("state",this.getState);
        console.log(this.getState);
    }
};
//페이지를 다시키지 않는한 상태 저장(로그인을 새로고침때마다 다시 하지 않기 위함.)
if (sessionStorage.getItem("state")) {
    state.setState = sessionStorage.getItem("state");
}
$(document).ready(() => {
    $(".login_container .login_btn").click(function () {
        $(".login_container p").css("display", "block");
        $(".login_container .login_btn").css("display", "none");
        setTimeout(() => 
        {
            $(".main_container").fadeIn(500);
            state.setState = "main";
        }, 1200);
    });
    // 헤더
    $("#gnb li a").click(() => {
        console.log(state.getState);
        sessionStorage.setItem("state",state.getState);
    });
    $("#gnb > li:first-child").click(() => {
        state.setState = "main";
    });
    $("#gnb > .projects").click(() => {
        state.setState = "projects";
    });
    $("#gnb > .games").click(() => {
        state.setState = "games";
    });
    //메인
    $(".background").click(function() {
        $(".main_container > div").css("background-color","rgba(0,0,0,0)");
        $(".main_container > div").css("outline","none");
    });
    $(".main_container > div").click(function() {
        $(this).css("background-color","rgba(150,150,255,0.4)");
        $(this).css("outline","2px solid rgba(200,200,255,0.6)");
        $(".main_container > div").not(this).css("background-color","rgba(0,0,0,0)");
        $(".main_container > div").not(this).css("outline","none");
    });
    $(".main_container > .about").dblclick(function() {
        $(this).css("background-color","rgba(150,150,255,0.8)");
        location.href="about/index.html";
    });
    $(".main_container > .github").dblclick(function() {
        $(this).css("background-color","rgba(150,150,255,0.8)");
        window.open('https://github.com/younv2 ', '_blank'); 
    });
    
    $(".main_container > .projects").dblclick(() => {
        state.setState = "projects";
    });
    
    $(".main_container > .games").dblclick(() => {
        state.setState = "games";
    });
    //폴더
    $(".folder > .folder_header > ul > .close_btn").click(() => {
        $(".folder").removeClass("on");
        $(".folder").removeClass("max");
        state.setState = "main";
    });
    $(".folder > .folder_header > ul > .maximize_btn").click(() => {
        $(".folder").toggleClass("max");      
    });
    $(".project_list > li > ul").children().click(function() {
        let class_name = $(this).attr("class");
        console.log(class_name);
        $(".project_list > li > ul").children().css("font-weight","normal").css("color","black");
        $(this).css("font-weight","bold").css("color","#7070f0");
        $(".project_container").children().css("display","none");
        $(".project_container").children("." + class_name).css("display","block");
    });
});
function Main() {
    $("header").css("display","block");
    $(".login_container").css("display","none");
    $(".background").css("filter","none");
    $(".earth").css("filter","none");
    $(".char").css("display","block");
    $(".earth").addClass("animation");
    $(".main_container").css("display","flex");
    $("header").css("z-index",1);
    $(".folder").removeClass("on");
}
