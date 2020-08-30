let daysOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function fillMainTable() {
    let main_table=document.getElementById("main-table");
    let time_col=document.createElement("div");
    time_col.id="time-col";
    populateTime(time_col); //default 6am
    main_table.appendChild(time_col);
    populateWeekDays(main_table);
    time_col.style.marginTop=document.getElementById("day-header").clientHeight/2+"px";
    populateToolbar(main_table);
    console.log(main_table);
}
let padding="0000";
function populateTime(timeCol) {
    let night=document.createElement("div");
    let day=document.createElement("div");
    night.id="time-night";
    day.id="time-day";
    for(let i=0;i<600;i+=100) {
        let div_time=document.createElement("div");
        div_time.id="time-value";
        let time=padding.substring(0,padding.length-i.toString().length)+i.toString();
        div_time.innerHTML=time.slice(0,2)+":"+time.slice(2);
        night.appendChild(div_time);
    }
    for(let i=600;i<=2300;i+=100) {
        let div_time=document.createElement("div");
        div_time.id="time-value";
        let time=padding.substring(0,padding.length-i.toString().length)+i.toString();
        div_time.innerHTML=time.slice(0,2)+":"+time.slice(2);
        day.appendChild(div_time);
    }
    day.innerHTML+="00:00";
    timeCol.appendChild(night);
    timeCol.appendChild(day);
}
function populateWeekDays(mainTable) {
    for(let day of daysOfWeek) {
        let col=document.createElement("div");
        col.id=day;
        let day_header=document.createElement("div");
        let content=document.createElement("div");
        day_header.id="day-header";
        day_header.innerHTML=day;
        content.id="day-content";
        for(let i=0;i<6;i++) {
            let divder=document.createElement("div");
            divder.id="divider-night";
            content.appendChild(divder);
        }
        for(let i=0;i<18;i++) {
            let divder=document.createElement("div");
            divder.id="divider-day";
            content.appendChild(divder);
        }
        col.appendChild(day_header);
        col.appendChild(content);
        mainTable.appendChild(col);
    }
} 
function populateToolbar(mainTable) {
    let toolbar=document.createElement("div");
    toolbar.id="toolbar";
    mainTable.appendChild(toolbar);
}

fillMainTable();