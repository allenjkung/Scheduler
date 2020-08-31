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
    let prev_button=createNewElt("button","prev-button", {
        onclick:()=>prevWeek()
    }, "Prev");
    let next_button=createNewElt("button","next-button", {
        onclick:()=>nextWeek()
    }, "Next");
    let display=populateDisplay();
    let new_display=populateNewDisplay();
    let newButton=createNewElt("button","new-button", {
        onclick:()=>addNewDisplay()
    },"Add New Event");
    toolbar.appendChild(prev_button);
    toolbar.appendChild(next_button);
    toolbar.appendChild(display);
    toolbar.appendChild(newButton);
    toolbar.appendChild(new_display);
    mainTable.appendChild(toolbar);
}
function populateDisplay() {
    let exitButton=createNewElt("button","x-button", {
        onclick:()=>exitElement()
    },"X");
    let editButton=createNewElt("button","edit-button", {
        onclick:()=>editDisplay()
    },"Edit");
    let saveButton=createNewElt("button","save-button", {
        onclick:()=>save()
    },"Save");
    let cancelButton=createNewElt("button","cancel-button", {
        onclick:()=>cancelElement()
    },"Cancel");
    let display=createNewElt("div","display-info",null,exitButton,editButton,saveButton,cancelButton); //TODO: convert into form
    return display
}
function populateNewDisplay() {
    let exitButton=createNewElt("button","x-button", {
        onclick:()=>exitElement()
    },"X");
    let form=createNewElt("form","event-form", { //TODO: add more soon
        onclick:()=>newEvent()},
        createFormElt("label",undefined,"event-title","Event Title"),
        createFormElt("input","text","title-info","Enter Event Title"),
        createFormElt("input","submit","save-button","Save"),
        createFormElt("input","submit","cancel-button","Cancel")
    );
    let new_display=createNewElt("div","display-new",null,exitButton,form);
    return new_display;
}
function exitElement() { //TODO: soon

}
function editDisplay() { //TODO: soon

}
function cancelElement() { //TODO: soon

}
function addNewDisplay() { //TODO: soon

}
function save() { //TODO: When JSON file is created

}
function prevWeek() { //TODO: When JSON file is created

}
function nextWeek() { //TODO: When JSON file is created

}
fillMainTable();