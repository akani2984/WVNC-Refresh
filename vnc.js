import RFB  from 'https://cdn.jsdelivr.net/gh/novnc/noVNC@1.6.0/core/rfb.js';
let sfalert;
let errora;
let rfb;
let keyboard = 0;

const opt = new URLSearchParams(window.location.search);
const pass = opt.get('pass');
const path = opt.get('path');
const zoom = opt.get('zoom');
const uname = opt.get('username');


const cn = ['鉴权失败', '无法连接到服务器'];
const en = ['auth failed.', 'Connection Failed'];

const aaa = {
                'SHIF' : '0xffe2',
                'BACK' : '0xff08',
                'CTRL': '0xffE3',
                'CAPS': '0xffe5',
                'ALT': '0xffe9',
                'SUPE': '0xffeB',
                'PU': '0xff55',
                'PD': '0xff56',
                'DOWN': '0xff54',
                'UP' : '0xff52',
                'LEFT' : '0xff51',
                'RIGH': '0xff53',
                'HOME' : '0xff50',
                'END' : '0xff57',
                'ESC' : '0xff1B',
                'TAB' : '0xff09',
                'ENTE': '0xff0d',
                'A' : '0x0041',
                'B' : '0x0042',
                'C': '0x0043',
                'D': '0x0044',
                'E': '0x0045',
                'F': '0x0046',
                'G': '0x0047',
                'H': '0x0048',
                'I': '0x0049',
                'J' : '0x004a',
                'K' : '0x004b',
                'L': '0x004c',
                'M' : '0x004d',
                'N' : '0x004e',
                'O' : '0x004f',
                'P' : '0x0050',
                'Q' : '0x0051',
                'R' : '0x0052',
                'S' : '0x0053',
                'T': '0x0054',
                'U': '0x0055',
                'V': '0x0056',
                'W': '0x0057',
                'X': '0x0058',
                'Y': '0x0059',
                'Z': '0xF005a',
                'a' : '0x0061',
                'b' : '0x0062',
                'c': '0x0063',
                'd': '0x0064',
                'e': '0x0065',
                'f': '0x0066',
                'g': '0x0067',
                'h': '0x0068',
                'i': '0x0069',
                'j' : '0x006a',
                'k' : '0x006b',
                'l': '0x006c',
                'm' : '0x006d',
                'n' : '0x006e',
                'o' : '0x006f',
                'p' : '0x0070',
                'q' : '0x0071',
                'r' : '0x0072',
                's' : '0x0073',
                't': '0x0074',
                'u': '0x0075',
                'v': '0x0076',
                'w': '0x0077',
                'x': '0x0078',
                'y': '0x0079',
                'z': '0x007a',
                '1' : '0x0031',
                '2' : '0x0032',
                '3': '0x0033',
                '4' : '0x0034',
                '5' : '0x0035',
                '6' : '0x0036',
                '7' : '0x0037',
                '8' : '0x0038',
                '9' : '0x0039',
                '0' : '0x0030',
                '~' : '0x007e',
                '`' : '0x0060',
                '!': '0x0021',
                '@' : '0x0040',
                '#' : '0x0023',
                '$' : '0x0024',
                '%' : '0x0025',
                '^' : '0x005e',
                '&' : '0x0026',
                '*' : '0x002a',
                '[' : '0x005b',
                ']' : '0x005d',
                '_': '0x005f',
                '-' : '0x002d',
                '=' : '0x003d',
                '+' : '0x002b',
                '{' : '0x007b',
                '}' : '0x007d',
                '(' : '0x0028',
                ')' : '0x0029',
                '\\' : '0x005c',
                '|' : '0x007c',
                ':': '0x003a',
                ';' : '0x003b',
                "'" : '0x0027',
                '"' : '0x0022',
                '/' : '0x002f',
                '?' : '0x003f',
                ',' : '0x002c',
                '.' : '0x002e',
                '<' : '0x003c',
                '>' : '0x003e',
                'SPAC': '0x0020'

            }
const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function rclip(e) {
            navigator.clipboard.writeText(e.detail.text)
}

function sendclip() {
    navigator.clipboard.readText().then(
        (text) => (rfb.clipboardPasteFrom(text)),
    );
}

function truekeyboard() {
    let kboard = document.getElementById("kboard");
    let kb = document.getElementById("kb")
    if(keyboard == 0) {
        kboard.style.display = ''
        kb.style.display = 'none'
        keyboard = 1
    } else if(keyboard == 1) {
        kboard.style.display = 'none'
        kb.style.display = ''
        keyboard = 2
    } else if (keyboard == 2) {
        keyboard = 0
        kboard.style.display = 'none'
         kb.style.display = 'none'
    }
}

function firekeyboard(keys, k8, kb) {
    let container = document.getElementById(k8);
    let kboard = document.getElementById(kb);
    let drag;
    container.style.display = 'flex';
    container.style.flexWrap = 'nowrap';
    container.style.height = '8vh';
    container.style.width = '100%';
    keys.forEach(key => {
        const button = document.createElement('button');
        if(key == 'DRAG') {
            drag = document.createElement('button');
            drag.textContent = 'Drag';
            container.appendChild(drag);
            drag.addEventListener('touchmove', (e) => {
                e.preventDefault();
                kboard.style.top = e.touches[0].clientY + 'px'
            })
            } else {
                button.textContent = key;
                button.style.flex = 1
                button.style.minWidth = 0
                button.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    keyfiredown(`${key}`);
                });
                button.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    keyfireup(`${key}`);
                });
                container.appendChild(button);
            }
        });
}

async function maketruekeyboard () {
    let container = document.getElementById("kboard");
    container.style.position = 'fixed';
    container.style.width = '100%';
    container.style.top = '10vh';
    container.style.opacity = '0.6';
    container.style.display = 'none'
    container = document.getElementById("kb");
    container.style.position = 'fixed';
    container.style.width = '100%';
    container.style.top = '10vh';
    container.style.opacity = '0.6';
    container.style.display = 'none'
    let keys1 = ['DRAG' ,'`', '1', '2', '3' ,'4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACK'];
    let keys2 = ['TAB', 'q', 'w', 'e' ,'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
    let keys3 = ['a', 's', 'd' ,'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, 'ENTE'];
    let keys4 = [ 'z', 'x', 'c' ,'v', 'b', 'n', 'm', ',', '.', '/'];
    let keys5 = ['CTRL', 'ALT', 'SPAC', 'HOME' ,'END', 'UP', 'DOWN', 'LEFT', 'RIGH'];
    firekeyboard(keys1, 'k1', "kboard");
    firekeyboard(keys2, 'k2');
    firekeyboard(keys3, 'k3');
    firekeyboard(keys4, 'k4');
    firekeyboard(keys5, 'k5');
    let keys6 = ['DRAG' ,'~', '!', '@', '#' ,'$', '%', '^', '&', '&', '*', '(', ')', '_', 'BACK'];
    let keys7 = ['Q', 'W', 'E' ,'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'];
    let keys8 = ['A', 'S', 'D' ,'F', 'G', 'H', 'J', 'K', 'L', ':', `"`, 'ENTE'];
    let keys9 = ['Z', 'X', 'C' ,'V', 'B', 'N', 'M', '<', '>', '?'];
    let keys10 = ['SPAC'];
    firekeyboard(keys6, 'k6', "kb");
    firekeyboard(keys7, 'k7');
    firekeyboard(keys8, 'k8');
    firekeyboard(keys9, 'k9');
    firekeyboard(keys10, 'k10');
}

function keyfiredown(b) {
    rfb.sendKey(aaa[b], null ,true)
}

function keyfireup(b) {
    rfb.sendKey(aaa[b], null ,false)
}

function keypageup() {
    rfb.sendKey('0xff55');
}

function keypagedown() {
    rfb.sendKey('0xff56');
}

function fullscreen() {
    document.documentElement.requestFullscreen();
}

function sf() {
    alert(sfalert);
}

function l10n(c) {
    sfalert = c[0];
    errora = c[1]
}

function sendCtrlAltDel() {
    rfb.sendKey("0xff67", "ContextMenu");
    return false;
}

function dis(e) {
    alert(errora)
}

if (!hasTouch) {
            document.getElementById("rightclickbtn").style.display = 'none';
            document.getElementById("keyboardbtn").style.display  = 'none';
            document.getElementById("PageDownbtn").style.display = 'none';
            document.getElementById("PageUpbtn").style.display = 'none';
}

document.getElementById("rightclickbtn").onclick = sendCtrlAltDel;
document.getElementById("keyboardbtn").onclick = truekeyboard;
document.getElementById("fullscreenbtn").onclick = fullscreen;
document.getElementById("PageDownbtn").onclick = keypagedown;
document.getElementById("PageUpbtn").onclick = keypageup;
document.getElementById("clipbtn").onclick = sendclip;

maketruekeyboard();

if (navigator.language == 'zh-CN') {
    l10n(cn);
} else {
    l10n(en);
}

rfb = new RFB(document.body, path, {shared: true, credentials: { password: pass, username: uname} });
rfb.addEventListener("securityfailure", sf);
rfb.addEventListener("clipboard", rclip);
rfb.addEventListener("disconnect", dis);


if (zoom == 'zoom') {
    rfb.scaleViewport = true;
} else {
    rfb.resizeSession =  true;
}