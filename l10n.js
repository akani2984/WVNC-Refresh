const en = {
    'websocketp' : 'WebsocketPath: ',
    'passp' : 'Password:',
    'checkboxzoom' : 'Zoom',
    'checkboxresize' : 'Remote Resize (Tigerxvnc only)',
    'connectbtn' : 'Connect',
    'helpbtn': 'Help',
    'usernamep' : 'Username'
};
const cn = {
    'websocketp' : 'Websocket路径: ',
    'passp' : '密码:',
    'checkboxzoom' : '缩放',
    'checkboxresize' : '远程调整大小 (Tigerxvnc)',
    'connectbtn' : '连接',
    'helpbtn': '帮助',
    'usernamep' : '用户名'
};
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

