const cn = {
    
    'keyboardbtn' : '键盘',
    'fullscreenbtn': '全屏',
    'PageUpbtn': 'Page UP',
    'PageDownbtn': 'Page Down',
    'clipbtn': '写剪贴板'
}
const en = {
    
    'keyboardbtn' : 'Keyboard',
    'fullscreenbtn': 'Fullscreen',
    'PageUpbtn': 'Page UP',
    'PageDownbtn': 'Page Down',
    'clipbtn': 'SendClip'
}
async function l10n(l) {
    for (i in l ) {
        document.getElementById(i).innerHTML = await l[i];
    }
}
if (navigator.language == 'zh-CN') {
    l10n(cn);
} else {
    l10n(en);
}
