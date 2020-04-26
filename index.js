function switchitem() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 ||
        bIsUc || bIsAndroid || bIsCE || bIsWM) {
        window.location = 'm.html';
    } else {
        window.location = 'pc.html'
    }
};

function start() {
    setTimeout(() => {
        switchitem()
    }, 500);
    coveron(1)
}

function load() {
    document.getElementById('toloadin').style.top = '-100%'
    coveroff()
    setTimeout(() => {
        var loadin = document.getElementById('tanchuin').value
        document.getElementById('tanchuin').value = ''
        while (loadin.indexOf(' ') >= 0) {
            loadin = loadin.replace(' ', '')
        }
        if (loadin == '' || loadin == null) {} else {
            if (md5check(loadin)) {
                if (loadin != '') {
                    window.localStorage.setItem('localload', loadin)
                    var a = confirm('已导入，现在进入游戏吗')
                    if (a) {
                        start()
                    }
                }
            } else {
                alert('存档代码无效')
            }
        }
    }, 500);

}

function loadin() {
    coveron(0.5)
    document.getElementById('toloadin').style.top = '30%'
}

function gitee() {
    window.open('https://gitee.com/cherrling/I-Am-Alive')
}

function github() {
    window.open('https://github.com/Cherrling/cherrling.github.io')
}

function author(a) {
    if (a == 0) {
        document.getElementById('author').style.top = '-100%'
        coveroff()
    }
    if (a == 1) {
        document.getElementById('author').style.top = '30%'
        coveron()
    }

}

function record() {
    coveron(0.5)
    setTimeout(() => {
        jumpurl('record')
    }, 500);
}