promain = document.getElementById("main");
cnhelp = document.getElementById("help_cn");
enhelp = document.getElementById("help_en");
function help() {
if (navigator.language == 'zh-CN') {
    promain.style.display = 'none';
    cnhelp.style.display = '';
} else {
    promain.style.display = 'none';
    enhelp.style.display = '';
}
}
