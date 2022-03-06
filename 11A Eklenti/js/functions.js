const months_tr = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function $id(id) {
    return document.getElementById(id);
}

function hexToRgba(hex,type){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');

        switch(type) {
            case "rgba":
                return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
            case "r":
                return +[(c>>16)&255];
            case "g":
                return +[(c>>8)&255];
            case "b":
                return +[c&255];
        }
    }
    throw new Error('Bad Hex');
}

function getThemeColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--theme-color');
}

function getDateAndTime(command) {
    const date = new Date();
    switch(command){
        case "Day": //Integer
            return date.getDate();
        case "0Day": //String
            return (date.getDate()<10? "0" : "") + date.getDate();
        case "Month": //Integer
            return (date.getMonth() + 1);
        case "0Month": //String
            return (date.getMonth()<10? "0" : "") + (date.getMonth() + 1);
        case "MonthTR": //String
            return months_tr[date.getMonth()];
        case "Year": //Integer
            return date.getFullYear();
        case "Hours": //Integer
            return date.getHours();
        case "0Hours": //String
            return (date.getHours()<10? "0" : "") + date.getHours();
        case "Minutes": //Integer
            return date.getMinutes();
        case "0Minutes": //String
            return (date.getMinutes()<10? "0" : "") + date.getMinutes();
        case "Date": //String
            return (date.getDate()<10? "0" : "") + date.getDate() + "/" + (date.getMonth()<10? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear();
        case "Time": //String
            return (date.getHours()<10? "0" : "") + date.getHours() + ":" + (date.getMinutes()<10? "0" : "") + date.getMinutes();
        case "DateAndTime": //String
            return date.getDate() + " " + months_tr[date.getMonth()] + " " + date.getFullYear() + " - " + (date.getHours()<10? "0" : "") + date.getHours() + ":" + (date.getMinutes()<10? "0" : "") + date.getMinutes();
    }
}