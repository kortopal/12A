const months_tr = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function getDateAndTime(command) {
    const date = new Date();
    switch(command){
        case "Day":
            return (date.getDate()<10? "0" : "") + date.getDate();
        case "Month":
            return months_tr[date.getMonth()];
        case "Year":
            return date.getFullYear();
        case "Hours":
            return (date.getHours()<10? "0" : "") + date.getHours();
        case "Minutes":
            return (date.getMinutes()<10? "0" : "") + date.getMinutes();
        case "DateAndTime":
            return (date.getDate()<10? "0" : "") + date.getDate() + " " + months_tr[date.getMonth()] + " " + date.getFullYear() + " - " + (date.getHours()<10? "0" : "") + date.getHours() + ":" + (date.getMinutes()<10? "0" : "") + date.getMinutes();
    }
}