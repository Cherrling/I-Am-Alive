//以下为具体按钮操作---------------------------------------------------------------
function jianzaogongfang() {
    var delay = 20;
    if (load['gongfang'] == 0) {
        if (load['stone'] >= 25 &&
            load['log'] >= 45 &&
            load['rope'] >= 10 &&
            load['hide'] >= 3) {
            load['stone'] = load['stone'] - 25
            load['log'] = load['log'] - 45
            load['rope'] = load['rope'] - 10
            load['hide'] = load['hide'] - 3
            delaybutton('jianzaogongfang', delay)
            checkhunger()
            hungerminus(20)
            setTimeout(() => {
                if (random100() <= 90) {
                    qiyonggongfang()
                    add('建造成功')
                } else {
                    add('建造失败了')
                }
                reload()
            }, delay * 1000);

        } else {
            add('材料不足,无法建造工坊')
        }
    }
}

function qiyonggongfang() {
    load['gongfang'] = 1;
    var g = document.getElementById('jianzaogongfang');
    if (document.getElementById('gspan')) {
        document.getElementById('gspan').style.display = 'none'
    }
    setTimeout(() => {
        g.innerText = '工坊已建造';
        g.className = 'button';
    }, 300);
    g.style.width = '100%';
    g.style.height = '40px';
    g.disabled = true;
    for (var e = 0; e < gongfang.length; e++) {
        var id = gongfang[e];
        onbutton(id, 'g')
    }
}

function qianwanggongfang() {
    getbyid('gongfang').style.display = 'block';
    getbyid('nongchang').style.display = 'none';
    disbutton('qianwanggongfang', 'qianwang')
    onbutton('qianwangnongchang', 'qianwang')
}

function qianwangnongchang() {
    getbyid('nongchang').style.display = 'block';
    getbyid('gongfang').style.display = 'none';
    disbutton('qianwangnongchang', 'qianwang')
    onbutton('qianwanggongfang', 'qianwang')
}

//以下为徒手操作----------------------------------------------------------------------

function kanshu() {
    var delay = 6;
    delaybutton('kanshu', delay, 't');
    checkhunger()
    hungerminus(5)
    var log = random(1, 3);
    if (load['stone_axe'] > 0) {
        load['stone_axe'] = load['stone_axe'] - 1;
        log = log + random(0, 3);
    }
    reload();
    setTimeout(function() {
        if (load['dead'] == 1) {
            return false;
        }
        load['log'] = load['log'] + log;
        add('获得木头' + log + '个')
        if (random100() <= 50) {
            var leaf = random(1, 2);
            load['leaf'] = load['leaf'] + leaf;
            add('获得棕榈叶' + leaf + '个')
        }
        reload();
    }, delay * 1000)
}

function caijishitou() {
    var delay = 8;
    if (load['stone_pickaxe'] > 0) {
        delay = 6;
    }
    delaybutton('caijishitou', delay, 't');
    checkhunger()
    hungerminus(10)
    var a = random(1, 2);
    if (load['stone_pickaxe'] > 0) {
        load['stone_pickaxe'] = load['stone_pickaxe'] - 1;
        a = a + random(1, 3);
    }
    reload();
    setTimeout(() => {
        if (load['dead'] == 1) {
            return false;
        }
        load['stone'] = load['stone'] + a;
        add('获得石头' + a + '个')
        reload();
    }, delay * 1000);
}

function caijizhiwu() {
    var delay = 3;
    delaybutton('caijizhiwu', delay, 't');
    checkhunger()
    hungerminus(3)
    var a = random(1, 3);
    if (load['stone_axe'] > 0) {
        load['stone_axe'] = load['stone_axe'] - 1;
        a = a + random(0, 3);
    }
    reload();
    setTimeout(() => {
        if (load['dead'] == 1) {
            return false;
        }
        load['leaf'] = load['leaf'] + a;
        add('获得棕榈叶' + a + '个')
        if (random100() <= 45) {
            var seed = random(1, 2)
            load['seed'] = load['seed'] + seed;
            add('获得种子' + seed + '个')
        }
        if (random100() <= 20) {
            var medicine = random(1, 2)
            load['medicine'] = load['medicine'] + medicine;
            add('获得草药' + medicine + '个')
        }
        if (random100() <= 10) {
            var meat = random(1, 2)
            load['meat'] = load['meat'] + meat;
            add('发现了新鲜的动物尸体')
            add('获得生肉' + meat + '个')
        }

        reload();
    }, delay * 1000)
}

function zhizuoshengzi() {
    var delay = 3;
    if (load['leaf'] >= 2) {
        delaybutton('zhizuoshengzi', delay, 't');
        load['leaf'] = load['leaf'] - 2;
        checkhunger()
        hungerminus(1)
        reload();
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 70) {
                add('获得绳子1个')
                load['rope'] = load['rope'] + 1;
            } else {
                add('树叶品质不好，绳子损坏了')
            }
            reload()
        }, delay * 1000);
    } else {
        add('棕榈叶不够了')
    }
}

function kaorou() {
    var delay = 6;
    if (load['meat'] < 1) {
        add('生肉不够了')
    } else if (load['log'] < 2) {
        add('木头不够了')
    } else {
        load['meat'] = load['meat'] - 1;
        delaybutton('kaorou', delay, 't');
        checkhunger()
        hungerminus(1)
        load['log'] = load['log'] - 2;
        reload();
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 90) {
                load['cooked_meat'] = load['cooked_meat'] + 1;
                add('获得熟肉1个');
            } else {
                add('肉烤糊了');
            }
            reload();
        }, delay * 1000);

    }
}

function dalie() {
    var delay = 10;
    var meat = 0
    var hide = 0
    delaybutton('dalie', delay, 't');
    checkhunger()
    hungerminus(7)
    if (load['stone_knife'] >= 1) {
        load['stone_knife'] = load['stone_knife'] - 1;
    }
    reload();
    setTimeout(() => {
        if (load['dead'] == 1) {
            return false;
        }
        if (random100() <= 77) {
            meat = random(2, 3)
        }
        if (random100() <= 45) {
            hide = 1
        } else {
            if (random100() <= 70) {
                meat = random(1, 2)
            }
            if (random100() <= 40) {
                hide = 1
            }
        }
        if (meat == 0 && hide == 0) {
            add('什么也没捕到')
        }
        if (meat != 0) {
            load['meat'] = load['meat'] + meat;
            add('获得生肉' + meat + '个')
        }
        if (hide != 0) {
            load['hide'] = load['hide'] + hide;
            add('获得兽皮' + hide + '个')
        }
        reload()
    }, delay * 1000);
}

function shiyongshengrou() {
    if (load['hunger'] == 100) {
        add('你已经吃饱了，不需要再吃东西了')
    } else {
        if (load['meat'] >= 1) {
            var delay = 4
            load['meat'] = load['meat'] - 1;
            delaybutton('shiyongshengrou', delay, 't');
            if (random100() <= 40) {
                add('你吃到了腐烂的肉，开始肚子疼了')
                healthminus(5)
            }
            reload();
            setTimeout(() => {
                if (load['dead'] == 1) {
                    return false;
                }
                hungeradd(10)
                reload()
            }, delay * 1000);
        } else {
            add('生肉不够了')
        }
    }
}

function shiyongshurou() {
    if (load['hunger'] == 100) {
        add('你已经吃饱了，不需要再吃东西了')
    } else {
        if (load['cooked_meat'] >= 1) {
            var delay = 3
            delaybutton('shiyongshurou', delay, 't');
            load['cooked_meat'] = load['cooked_meat'] - 1;
            reload();
            setTimeout(() => {
                if (load['dead'] == 1) {
                    return false;
                }
                hungeradd(40)
                reload()
            }, delay * 1000);
        } else {
            add('熟肉不够了')
        }
    }
}

function shiyongmianbao() {
    if (load['hunger'] == 100) {
        add('你已经吃饱了，不需要再吃东西了')
    } else {
        if (load['bread'] >= 1) {
            var delay = 2
            delaybutton('shiyongmianbao', delay, 't');
            load['bread'] = load['bread'] - 1;
            reload();
            setTimeout(() => {
                if (load['dead'] == 1) {
                    return false;
                }
                hungeradd(30)
                reload()
            }, delay * 1000);
        } else {
            add('面包不够了')
        }
    }
}

function shiyongcaoyao() {
    if (load['medicine'] >= 1) {
        var delay = 5
        delaybutton('shiyongcaoyao', delay, 't');
        load['medicine'] = load['medicine'] - 1;
        reload();
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 70) {
                healthadd(30)
            } else {
                add('吃到了有毒的草药')
                healthminus(15)
            }
            reload()
        }, delay * 1000);
    } else {
        add('草药不够了')
    }
}
//以上为徒手操作------------------------------------------------------------------
// 以下为工坊内操作-----------------------------------------------------------------
function kaomianbao_() {
    if (load['wheat'] < 2) {
        add('小麦不够了')
    } else if (load['log'] < 2) {
        add('木头不够了')
    } else {
        load['log'] = load['log'] - 2;
        load['wheat'] = load['wheat'] - 2;
        checkhunger()
        hungerminus(3)
        var delay = 10;
        reload();
        delaybutton('kaomianbao_', delay, ' g')
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 90) {
                load['bread'] = load['bread'] + 1;
                add('获得面包1个')
            } else {
                add('面包烤糊了')
            }
            reload()
        }, delay * 1000);
    }
}

function kaorou_() {
    var delay = 6;
    if (load['meat'] < 1) {
        add('生肉不够了')
    } else if (load['log'] < 2) {
        add('木头不够了')
    } else {
        load['meat'] = load['meat'] - 1;
        delaybutton('kaorou_', delay, ' g')
        checkhunger()
        hungerminus(1)
        load['log'] = load['log'] - 2;
        reload();
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 95) {
                load['cooked_meat'] = load['cooked_meat'] + 1;
                add('获得熟肉1个');
            } else {
                add('肉烤糊了');
            }
            reload();
        }, delay * 1000);

    }
}

function zhizuoshengzi_() {
    var delay = 3;
    if (load['leaf'] >= 2) {
        delaybutton('zhizuoshengzi_', delay, ' g')
        load['leaf'] = load['leaf'] - 2;
        checkhunger()
        hungerminus(1)
        reload();
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 90) {
                var rope = 1;
                if (random100() <= 50) {
                    rope = rope + 1
                }
                add('获得绳子' + rope + '个')
                load['rope'] = load['rope'] + rope;
            } else {
                add('树叶品质不好，绳子损坏了')
            }
            reload()
        }, delay * 1000);
    } else {
        add('棕榈叶不够了')
    }
}

function zhizuoshigao_() {
    if (load['stone'] < 10) {
        add('石头不够了')
    } else if (load['log'] < 3) {
        add('木头不够了')
    } else if (load['rope'] < 2) {
        add('绳子不够了')
    } else {
        load['stone'] = load['stone'] - 10;
        load['log'] = load['log'] - 3;
        load['rope'] = load['rope'] - 2;
        checkhunger()
        hungerminus(4)
        reload()
        var delay = 12;
        delaybutton('zhizuoshigao_', delay, ' g')
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 95) {
                load['stone_pickaxe'] = load['stone_pickaxe'] + 40;
                add('石镐使用次数+40')
            } else {
                add('制作失败了')
            }
            reload();
        }, delay * 1000);
    }
}

function zhizuoshimao_() {
    if (load['stone'] < 5) {
        add('石头不够了')
    } else if (load['log'] < 4) {
        add('木头不够了')
    } else if (load['rope'] < 1) {
        add('绳子不够了')
    } else {
        load['stone'] = load['stone'] - 5;
        load['log'] = load['log'] - 4;
        load['rope'] = load['rope'] - 1;
        checkhunger()
        hungerminus(2)
        reload()
        var delay = 9;
        delaybutton('zhizuoshimao_', delay, ' g')
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 95) {
                load['stone_knife'] = load['stone_knife'] + 30;
                add('石矛使用次数+30')
            } else {
                add('制作失败了')
            }
            reload();
        }, delay * 1000);
    }
}

function zhizuoshifu_() {
    if (load['stone'] < 6) {
        add('石头不够了')
    } else if (load['log'] < 3) {
        add('木头不够了')
    } else if (load['rope'] < 3) {
        add('绳子不够了')
    } else {
        load['stone'] = load['stone'] - 6;
        load['log'] = load['log'] - 3;
        load['rope'] = load['rope'] - 3;
        checkhunger()
        hungerminus(3)
        reload()
        var delay = 10;
        delaybutton('zhizuoshifu_', delay, ' g')
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 95) {
                load['stone_axe'] = load['stone_axe'] + 40;
                add('石斧使用次数+40')
            } else {
                add('制作失败了')
            }
            reload();
        }, delay * 1000);
    }
}

function zhizuoshichu_() {
    if (load['stone'] < 1) {
        add('石头不够了')
    } else if (load['log'] < 2) {
        add('木头不够了')
    } else if (load['rope'] < 1) {
        add('绳子不够了')
    } else {
        load['stone'] = load['stone'] - 1;
        load['log'] = load['log'] - 2;
        load['rope'] = load['rope'] - 1;
        checkhunger()
        hungerminus(1)
        reload()
        var delay = 8;
        delaybutton('zhizuoshichu_', delay, ' g')
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            if (random100() <= 95) {
                load['stone_hoe'] = load['stone_hoe'] + 20;
                add('石锄使用次数+20')
            } else {
                add('制作失败了')
            }
            reload();
        }, delay * 1000);
    }
}

//以上为工坊内操作------------------------------------------------------------
//以下为农田内操作------------------------------------------------------------
function zhongtian_() {
    var delay = 60;
    if (load['seed'] < 3) {
        add('种子不够了');
    } else if (load['stone_hoe'] < 1) {
        add('没有锄头，无法耕种');
    } else {
        delaybutton('zhongtian_', delay, ' n');
        checkhunger();
        hungerminus(7);
        reload();
        load['stone_hoe'] = load['stone_hoe'] - 1;
        load['seed'] = load['seed'] - 3;
        setTimeout(() => {
            if (load['dead'] == 1) {
                return false;
            }
            var wheat = random(1, 3);
            load['wheat'] = load['wheat'] + wheat;
            add('获得小麦' + wheat + '个');
            reload()
        }, delay * 1000);

    }
}