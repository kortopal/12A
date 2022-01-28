const months_tr = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function $id(id) {
    return document.getElementById(id);
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