function random100() { //1-100随机数
    var a = Math.floor(Math.random() * 100) + 1;
    return a;
}

function random(n, m) { //【n,m】随机数 
    var a = Math.floor(Math.random() * (m - n + 1)) + n;
    return a;
}

function onbutton(id, cla = '') { //带有特殊class值的按钮开关
    document.getElementById(id).disabled = false;
    document.getElementById(id).className = cla + ' button on';
}

function disbutton(id, cla = '') { //带有特殊class值的按钮开关
    document.getElementById(id).disabled = true;
    document.getElementById(id).className = cla + ' button off';
}

function add(w) { //消息框内加文本
    var html = document.getElementById('message').innerHTML;
    var id = 'mess' + mes;
    document.getElementById('message').innerHTML = "<div id='" + id + "'>" + w + "</div>" + html;
    mes++;
    if (mes >= 40) {
        var a = mes - 40;
        var b = 'mess' + a;
        var re = document.getElementById(b);
        re.parentNode.removeChild(re);
    }

}

function delaybutton(id, t, cla = '') { //带有特殊class值的按钮在一定时间内禁用
    var button = document.getElementById(id);
    button.disabled = true;
    button.className = cla + ' button off'
    var html = button.innerHTML;
    delaybutton1(button, t, html, cla);
}

function delaybutton1(button, t, html, cla) { //带有特殊class值的按钮在一定时间内禁用辅助模块
    button.innerHTML = '(' + t + ')';
    if (load['dead'] == 1) {
        button.innerHTML = html;
        return false;
    }
    if (t <= 0) {
        button.innerHTML = html;
        button.className = cla + ' button on'
        button.disabled = false;
        return false;
    }
    t--;
    setTimeout(function() { delaybutton1(button, t, html, cla) }, 1000)
}

function tanchuin() {
    coveron(0.7)
    document.getElementById('toloadin').style.top = '30%'
}

function loadin(a = 0) {
    document.getElementById('toloadin').style.top = '-100%'
    coveroff()
    if (a == 1) {
        setTimeout(() => {
            var loadin = document.getElementById('tanchuin').value
            document.getElementById('tanchuin').value = ''
            while (loadin.indexOf(' ') >= 0) {
                loadin = loadin.replace(' ', '')
            }
            loaded(loadin)
        }, 200);
    }
}

function loaded(loadin) { //代码转码后，写入数组loadmid,由for函数按names数组转录到load数组
    if (loadin == '' || loadin == null) {} //无输入或点取消时不执行
    else {
        if (md5check(loadin)) {
            loadin = md5off(loadin)
            loadin = atob(loadin);
            loadin = unescape(loadin); //存档解码完        
            loadmid = loadin.split(',');
            loadmid = loadmid.map(Number); //loadmid字符数组转为数字数组
            for (var i = 0; i < loadlength; i++) {
                var d = names[i];
                load[d] = loadmid[i];
            }
            reload()
            if (load['gongfang'] == 1) {
                qiyonggongfang()
            }
            if (load['health'] == 0) {
                dead()
            }
            save()
            clearmessage()
        } else {
            alert('存档代码无效')
        }

    }
}

function tanchuout() {
    coveron(0.7)
    document.getElementById('toloadout').style.top = '30%'
    document.getElementById('tanchuout').value = out()
}

function outsubmit() {
    document.getElementById('toloadout').style.top = '-100%'
    coveroff()
}

function out() { //load数组按names数组转码到loadmid数组后,转到变量编码输出
    for (var i = 0; i < loadlength; i++) {
        var n = names[i];
        loadmid[i] = load[n];
    }
    var loadout = loadmid;
    //存档加密与输出----------------------------------------------------------
    loadout = escape(loadout);
    loadout = btoa(loadout);
    loadout = md5on(loadout)
    return loadout;
}

function clearmessage() { //清除消息框多余缓存
    document.getElementById("message").innerHTML = "";
}

function writeload(val, id) { //向指定id写入
    document.getElementById(id).innerHTML = val;
}

function getbyid(id) {
    var a = document.getElementById(id);
    return a;
}

function reload() { //刷新右侧的显示
    for (var o = 0; o < loadnames.length; o++) {
        name = loadnames[o];
        var a = load[name]
        writeload(a, name)
    }
}

function hungerminus(val) {
    if (load['hunger'] <= val) {
        add('饱食度-' + load['hunger'])
        load['hunger'] = 0;
    } else {
        load['hunger'] = load['hunger'] - val
        add('饱食度-' + val)
    }
}

function hungeradd(val) {
    var aim = load['hunger'] + val;
    if (aim >= 100) {
        var dert = 100 - load['hunger']
        load['hunger'] = 100;
        add('饱食度+' + dert)
        add('饱食度满,你吃饱了')
    } else {
        load['hunger'] = load['hunger'] + val
        add('饱食度+' + val)
    }
}

function healthminus(val) {
    if (load['health'] <= val) {
        add('生命值-' + load['health'])
        load['health'] = 0;
        dead()
    } else {
        load['health'] = load['health'] - val
        add('生命值-' + val)
    }
}

function healthadd(val) {
    var aim = load['health'] + val;
    if (aim >= 100) {
        var dert = 100 - load['health']
        load['health'] = 100;
        add('生命值+' + dert)
    } else {
        load['health'] = load['health'] + val
        add('生命值+' + val)
    }
}

function checkhunger() {
    var hunger = load['hunger']
    if (hunger <= 3) {
        healthminus(10)
        if (load['dead'] == 1) {
            return false;
        }
        add('你感觉自己快不行了')
    } else if (hunger <= 10) {
        healthminus(5)
        if (load['dead'] == 1) {
            return false;
        }
        add('你已经无法忍受饿肚子了')
    }
}

function dead() {
    load['dead'] = 1
    setTimeout(() => {
        add('你死了')
    }, 300);
    var a = document.getElementsByClassName('button')
    for (let e = 0; e < a.length; e++) {
        var q = a[e].className
        q = q.replace(' on', ' off')
        a[e].className = q
        a[e].disabled = true
    }
    var s = document.getElementsByClassName('sys')
    for (let u = 0; u < s.length; u++) {
        s[u].className = 'button on sys'
        s[u].disabled = false
    }
    document.getElementById('jianzaogongfang').className = 'button off g'
    save()
}

function handleLocalStorage(method, key, value) {
    switch (method) {
        case 'get':
            {
                var temp = window.localStorage.getItem(key);
                if (temp) {
                    return temp
                } else {
                    return false
                }
            }
        case 'set':
            {
                window.localStorage.setItem(key, value);
                break
            }
        case 'remove':
            {
                window.localStorage.removeItem(key);
                break
            }
        default:
            {
                return false
            }
    }
}

function tanchuchongzhi() {
    document.getElementById('tanchuchongzhi').style.top = '30%'
    coveron(0.7)
}

function chongzhi(a = 0) {
    document.getElementById('tanchuchongzhi').style.top = '-100%'
    coveroff()
    if (a == 1) {
        setTimeout(() => {
            handleLocalStorage('remove', 'localload', '')
            location.reload()
        }, 300);
    }

}

function guiling() {
    for (var start = 0; start < loadlength; start++) {
        var name = names[start];
        load[name] = 0;
    }
    load['health'] = 100;
    load['hunger'] = 100;
}

function save() {
    var localload = out()
    handleLocalStorage('set', 'localload', localload)
    add('已保存')
    console.log('saved');
}
//以上是模块化模组-----------------------------------------------------------------
//以下是加载页面时预执行操作--------------------------------------------------------

var mes = 0


var load = new Array();
var loadmid = new Array();
var gongfang = [ //工坊内元素id
    'kaomianbao_', 'kaorou_', 'zhizuoshengzi_',
    'zhizuoshigao_', 'zhizuoshimao_',
    'zhizuoshifu_', 'zhizuoshichu_'
]

var names = [ //最终存档时用的数组
    'log', 'stone', 'health', 'hunger', 'leaf',
    'meat', 'cooked_meat', 'wheat', 'bread',
    'stone_knife', 'stone_pickaxe', 'stone_hoe',
    'stone_axe', 'hide', 'leather', 'rope', 'seed',
    'medicine', 'gongfang', 'dead'
];

var loadnames = [ //刷新时用，防报错和误写入
    'log', 'stone', 'health', 'hunger', 'leaf',
    'meat', 'cooked_meat', 'wheat', 'bread',
    'stone_knife', 'stone_pickaxe', 'stone_hoe',
    'stone_axe', 'hide', 'leather', 'rope', 'seed',
    'medicine'
];


loadlength = names.length;


function open_load() {
    var exist = localStorage.hasOwnProperty('localload')
    if (exist) {
        var load = handleLocalStorage('get', 'localload')
        while (load.indexOf(' ') >= 0) {
            load = load.replace(' ', '')
        }
        if (load != '') {
            loaded(load)
        } else {
            guiling()
        }
    } else {
        guiling()
    }
    var localload = out()
    handleLocalStorage('set', 'localload', localload)
    reload()
}

function md5on(putin) {
    var md5 = hex_md5(putin);
    md5 = md5.slice(0, 8);
    md5 = md5.toUpperCase()
    var out = putin + md5;
    return out;
}

function md5off(putin) {
    putin = putin.slice(0, -8);
    return putin;
}

function md5check(putin) {
    var load = md5off(putin)
    var md5 = putin.slice(-8);
    md5 = md5.toUpperCase()
    var loadmd5 = hex_md5(load)
    loadmd5 = loadmd5.slice(0, 8)
    loadmd5 = loadmd5.toUpperCase()
    if (loadmd5 == md5) {
        return true;
    } else {
        return false;
    }
}

function coveron(toumingdu = 0.5) {
    var color = 'rgba(39, 39, 39,' + toumingdu + ')'
    document.getElementById('cover').style.backgroundColor = color
    document.getElementById('cover').style.position = 'fixed'
}

function coveroff() {
    document.getElementById('cover').style.backgroundColor = 'rgba(39, 39, 39, 0)'
    setTimeout(() => {
        document.getElementById('cover').style.position = 'initial'
    }, 500);
}

function tanchuguize(a = 0) {
    if (a == 0) {
        coveroff()
        document.getElementById('tanchuguize').style.top = '-100%'
    }
    if (a == 1) {
        coveron(0.7)
        document.getElementById('tanchuguize').style.top = '30%'
    }
}

function jumpurl(link) {
    if (link == 'm') {
        window.location.href = 'm.html'
    }
    if (link == 'pc') {
        window.location.href = 'pc.html'
    }
    if (link == 'index') {
        window.location.href = 'index.html'
    }
    if (link == 'record') {
        window.location.href = 'record.html'
    }
}
//以上为加载页面时预执行操作--------------------------------------------------------