let daysOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function createNewElt(type,ID,action,...children) {
    let element=document.createElement(type);
    if(ID!="")
        element.id=ID;
    if(action)
        Object.assign(element,action);
    for(let child of children) {
        if(typeof child!="string")
            element.appendChild(child);
        else
            element.appendChild(document.createTextNode(child));
    }
    return element;
}
function createFormElt(type,formtype,ID,value) {
    let element=document.createElement(type);
    if(ID!="")
        element.id=ID;
    if(value)
        element.value=value;
    if(formtype)
        element.type=formtype;
    return element;
}
function createSelectElt(value,text) {
    let element=document.createElement("option");
    element.value=value;
    element.appendChild(document.createTextNode(text));
    return element;
}

function fillMainTable() {
    let main_table=document.getElementById("main-table");
    let time_col=document.createElement("div");
    time_col.id="time-col";
    populateTime(time_col); //default 6am
    main_table.appendChild(time_col);
    populateWeekDays(main_table);
    time_col.style.marginTop=document.getElementById("day-header").clientHeight/2+"px";
    populateToolbar(main_table);
    updateTime();
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
function updateTime() {
    let today=new Date();
    let cWeekday=today.getDay();
    let day=String(today.getDate());
    let month=String(today.getMonth()+1); //January is 0!
    let year=today.getFullYear();
    let endOfMonth=new Date(year,month,0);
    let lastDay=endOfMonth.getDate();
    let daysOfWeek_header=document.querySelectorAll("#day-header");
    for(let i=0;i<cWeekday;i++) {
        if((day-(cWeekday-i))<=0) {
            let nmonth=new Date(year,month-1,0);
            daysOfWeek_header[i].innerHTML+=" "+((nmonth.getDate()+(day-(cWeekday-i)))+"/"+nmonth.getMonth());
        }
        else
            daysOfWeek_header[i].innerHTML+=" "+((day-(cWeekday-i))+"/"+month);
    }
    for(let i=0;i<7-cWeekday;i++) {
        if((Number(day)+i)>lastDay) {
            let nmonth=new Date(year,month+1,1);
            daysOfWeek_header[cWeekday+i].innerHTML+=" "+((nmonth.getDate()+(lastDay-Number(day)+i)));
        }
        daysOfWeek_header[cWeekday+i].innerHTML+=" "+(Number(day)+i+"/"+month);
    }
}
function populateToolbar(mainTable) {
    let toolbar=document.createElement("div");
    toolbar.id="toolbar";
    let prev_button=createNewElt("button","prev-button", {
        onclick:()=>prevWeek()
    }, "Prev");
    let next_button=createNewElt("button","next-button", {
        onclick:()=>nextWeek()
    }, "Next");
    let new_button=createNewElt("button","new-button", {
            onclick:()=> {
                document.querySelector("#new-button").style.display="none";
                document.querySelector("#display-new").style.display="block";
            }
    },"Add New Event");
    let display=populateDisplay();
    let new_display=populateNewDisplay();
    toolbar.appendChild(prev_button);
    toolbar.appendChild(next_button);
    toolbar.appendChild(display);
    toolbar.appendChild(new_button);
    toolbar.appendChild(new_display);
    mainTable.appendChild(toolbar);
}
function populateDisplay() {
    let display=createNewElt("div","main-display",null,
        populateEventInfo(),
        createNewElt("button","edit-button", {
            onclick:()=> {
                document.querySelector("#edit-button").style.display="none";
                document.querySelector("#display-event").style.display="none";
                document.querySelector("#display-info").style.display="block";
            }
        },"Edit"),
        createNewElt("div","display-info",null,populateForm())
    );
    return display;
}
function populateNewDisplay() {
    let new_display=createNewElt("div","display-new",null,populateForm());
    return new_display;
}
function populateEventInfo() {
    let event_info=createNewElt("div","display-event",null,
        createNewElt("button","x-button", {
            onclick:()=> {
                document.querySelector("#display-event").style.display="none";
                document.querySelector("#edit-button").style.display="none";
            }
        },"X"),
        createNewElt("div","display-title",null,"Event Title"),
        createNewElt("div","display-date",null,"Date: mm-dd-yyyy"),
        createNewElt("div","display-time",null,"Time: 6am-6pm"),
        createNewElt("div","display info",null,"Here contains a sentence"),
    );
    return event_info;
}
function populateForm() {
    let form=createNewElt("div","form-div",null,
        createNewElt("button","x-button", {
            onclick:function(event) {
                if(event.path[2].id==="display-new") {
                    event.path[2].style.display="none";
                    document.querySelector("#new-button").style.display="block";
                }
                if(event.path[2].id==="display-info") {
                    event.path[2].style.display="none";
                    document.querySelector("#display-event").style.display="block";
                    document.querySelector("#edit-button").style.display="block";
                }
            }
        },"X"),
        createNewElt("form","event-form", {
            onclick:()=>newEvent()},
            createNewElt("label","event-title",null,"Event Title"),
            createFormElt("input","text","form-title","Enter Event Title"),
            createNewElt("div","date-wrapper",null,
                createNewElt("label","event-date",null,"Month-Day-Year: "),
                createFormElt("input","text","form-month","mm"),
                createNewElt("div","date-dash",null,"-"),
                createFormElt("input","text","form-day","dd"),
                createNewElt("div","date-dash",null,"-"),
                createFormElt("input","text","form-year","yyyy")
            ),
            createNewElt("div","time-wrapper",null,
                createNewElt("label","time-label",null,"From"),
                createFormElt("input","text","time-from","6:00"),
                createNewElt("select","period-from",null,
                    createSelectElt("am","am"),
                    createSelectElt("pm","pm"),
                ),
                createNewElt("label","time-label",null,"To"),
                createFormElt("input","text","time-to","6:00"),
                createNewElt("select","period-to",null,
                    createSelectElt("am","am"),
                    createSelectElt("pm","pm"),
                )
            ),
            createNewElt("label","event-info",null,"Event Description"),
            createFormElt("input","text","form-info-new","To be added"),
            createFormElt("input","submit","save-button","Save"),
            createFormElt("input","reset","reset-button","Reset")
        )
    );
    return form;
}
function save() { //TODO: When JSON file is created

}
function newEvent() { //TODO: When JSON file is created

}
function prevWeek() { //TODO: When JSON file is created

}
function nextWeek() { //TODO: When JSON file is created

}
fillMainTable();