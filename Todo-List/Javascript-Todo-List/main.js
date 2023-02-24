let addtaskinput = document.getElementById("addtaskinput")
let addtaskbtn = document.getElementById("addtaskbtn")

addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    
    if(addtaskinputval.trim()!=0){
        let webtask = localStorage.getItem("localtasks");
        if(webtask == null){
            taskObj = [];

        }
        else{
            taskObj = JSON.parse(webtask);
        }
        //if(taskObj == null){ 
        
        taskObj.push({"task_name":addtaskinputval,"completeStatus":false});
       // console.log(taskObj,"Ram",);
        localStorage.setItem("localtasks", JSON.stringify(taskObj));
        addtaskinput.value = '';
    }
    showTask();
})
showTask();



// SHOW TASK FUNCTION


function showTask(){

    let webtask = localStorage.getItem("localtasks");
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj= JSON.parse(webtask);
    }

    let html = '';
    let addtasklist  = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {
        
        if(item.completeStatus == true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }
        else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }

        html = html +`<tr>
                        <th scope = "row">${index+1}</th>
                        ${taskCompleteValue}
                        <td><button type="button" onclick="editTask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                        <td><button type="button" class ="text-success" id = ${index}><i class= "fa fa-check-square-o"></i>Complete</button></td>
                        <td><button type="button" onclick ="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td> 
                        </tr>`
        
    });
    addtasklist.innerHTML = html;
}

//class = "text-success" id=${index}
// Edit Task

function editTask(index){
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);
    
    addtaskinput.value = taskObj[index]['task_name'];
    addtaskbtn.style.display = "none";
    savetaskbtn.style.display ="block";
}

// Save Task

let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function() {
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;

    for(keys in taskObj[saveindex]){
        if(keys == 'task_name'){
            taskObj[saveindex].task_name = addtaskinput.value;
        }
    }

    // taskObj[saveindex] = {'task_name : addtaskinput.value, 'completeStatus':false};


    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtasks",JSON.stringify(taskObj));
    addtaskinput.value = '';
    showTask();
})


// DELETE ITEM

function deleteitem(index){
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index,1);
    localStorage.setItem("localtasks",JSON.stringify(taskObj));
    showTask();
}

// // Complete task
let addedtasklist = document.getElementById("addedtasklist");
    addedtasklist.addEventListener("click",function(e){
        console.log(e);

        let webtask = localStorage.getItem("localtasks");
        let taskObj = JSON.parse(webtask);

        let myTarget = e.target;
        if(myTarget.classList[0] === 'text-success'){ 
        let myTargetid  = myTarget.getAttribute("id");

       // myTargetpresibling = myTarget.parentElement.previousElementSibling.previousElementSibling;

        for(keys in taskObj[myTargetid]){
            if (keys == 'completeStatus' && taskObj[myTargetid][keys]==true){
                taskObj[myTargetid].completeStatus = false;
               
            }
            else if(keys == 'completeStatus' && taskObj[myTargetid][keys]==false){
                taskObj[myTargetid].completeStatus = true;
                //addedtasklist.style.display = "Green";
            }
        }
        localStorage.setItem("localtasks",JSON.stringify(taskObj));
        
        showTask();
    }

    })





// Delete All Btn

let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click",function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);
    if(webtask == null){
        taskObj =[];
    }
    else{
        taskObj = JSON.parse(webtask);
        taskObj =[];
    }
    savetaskbtn.style.display= "none";
    localStorage.setItem("localtasks", JSON.stringify(taskObj));

    showTask();
})


// Search List 

let searchtext = document.getElementById("searchtextbox");
searchtext.addEventListener("input",function(){
    let tryList = document.querySelectorAll("tr");
    Array.from(tryList).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtext.value;
        let re = new RegExp(searchtextboxval, "gi");

        if(searchedtext.match(re)){
            item.style.display = "table-row";
        }
        else{
            item.style.display = "none";
        }

    })
})
