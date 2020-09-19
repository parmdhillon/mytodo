!function(t){var e={};function s(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);const a=document.getElementById("switchBtnActive"),n=document.getElementById("switchBtnCompleted"),l=document.querySelectorAll(".task--wrapper"),o=document.querySelectorAll(".overlay"),i=document.querySelectorAll(".closeModal"),c=document.getElementById("addTaskModalBtn"),r=document.getElementById("addTaskModal"),d=document.getElementById("addTaskForm"),u=document.getElementById("activeTaskList"),k=document.getElementById("completedTaskList"),m=document.getElementById("viewTaskModal");class y{constructor(t,e,s,a=!1){this.taskEl,this.taskName=t,this.taskStatus=e,this.taskInfo=s,this.taskID=a||Math.random()+1}storeTask(){let t;t=localStorage.getItem("allTasks")?JSON.parse(localStorage.getItem("allTasks")):{tasks:[]},t.tasks.push({taskName:this.taskName,taskStatus:this.taskStatus,taskID:this.taskID,taskInfo:this.taskInfo}),localStorage.setItem("allTasks",JSON.stringify(t))}updatedUI(){this.taskEl=document.createElement("div"),"active"==this.taskStatus?this.taskEl.classList.add("task--content","active"):this.taskEl.classList.add("task--content","completed");const t=`\n          <span>${this.taskName}</span>\n          <div class="actions">\n            <button class="button small">View Task</button>\n            <button class="button small danger">Delete</button>\n          </div>`;this.taskEl.innerHTML=t,this.taskEl.querySelector("button:first-of-type").addEventListener("click",this.viewTask.bind(this)),this.taskEl.querySelector("button:last-of-type").addEventListener("click",this.deleteTask.bind(this)),"active"==this.taskStatus?activeTaskList.insertAdjacentElement("beforeend",this.taskEl):completedTaskList.insertAdjacentElement("beforeend",this.taskEl),y.checkEmpty(this.taskStatus)}viewTask(){let t=document.createElement("div"),e=`\n      <span class="tag ${this.taskStatus}">${this.taskStatus} Task</span>\n      <span class="title text-primary ${this.taskStatus}">${this.taskName}</span>\n      <p class="info">${this.taskInfo}</p>\n      `,s=document.createElement("button");"active"==this.taskStatus?(s.classList.add("button","danger"),s.textContent="Set Task Completed"):(s.classList.add("button"),s.textContent="Set Task Active"),s.addEventListener("click",this.deleteTask.bind(this,!0)),t.innerHTML=e,m.querySelector("#viewTaskContent").innerHTML="",m.querySelector("#viewTaskContent").appendChild(t),m.querySelector("#viewTaskContent").appendChild(s),m.style.display="block"}deleteTask(t,e=!1){this.taskEl.remove(),y.checkEmpty(this.taskStatus);let s=JSON.parse(localStorage.getItem("allTasks"));if(s&&(s.tasks.splice(s.tasks.findIndex(t=>t.taskID==this.taskID),1),localStorage.setItem("allTasks",JSON.stringify(s))),e){m.style.display="none",this.taskStatus="completed"==this.taskStatus?"active":"completed";const t=new y(this.taskName,this.taskStatus,this.taskInfo,this.taskID);t.storeTask(),t.updatedUI()}}static checkEmpty(t){"active"==t?null==u.querySelector(".task--content")?u.querySelector(".empty").style.display="block":u.querySelector(".empty").style.display="none":null==k.querySelector(".task--content")?k.querySelector(".empty").style.display="block":k.querySelector(".empty").style.display="none"}}const p=()=>{window.matchMedia("(max-width: 600px)").matches&&(h(),f())},h=()=>{document.querySelector(".taskSwitches--wrapper").classList.toggle("slide"),setTimeout(()=>{n.classList.toggle("active"),a.classList.toggle("active")},200)},f=()=>{l.forEach(t=>{t.classList.toggle("shift")})},S=function(){this.closest(".modal").style.display="none"},v=t=>{t.nextElementSibling.style.display="block",setTimeout(()=>{t.nextElementSibling.style.display="none"},2e3)};a.addEventListener("click",p),n.addEventListener("click",p),c.addEventListener("click",()=>{r.style.display="block"}),d.addEventListener("submit",t=>{t.preventDefault();const e=document.getElementById("taskName"),s=e.value,a=document.getElementById("taskInfo"),n=a.value;if(""==s)return void v(e);if(""==n)return void v(a);const l=new y(s,"active",n);l.storeTask(),l.updatedUI(),r.style.display="none",e.value="",a.value=""});for(let t of o)t.addEventListener("click",S);for(let t of i)t.addEventListener("click",S);(class{static init(){(()=>{if(!localStorage.getItem("allTasks")){let t={tasks:[{taskName:"House Cleaning",taskStatus:"active",taskID:1,taskInfo:"I have to clean the whole house today till 10AM"},{taskID:2,taskName:"GitHub Project",taskStatus:"completed",taskInfo:"I have completed MyToDo Project on GitHub"}]};localStorage.setItem("allTasks",JSON.stringify(t))}})(),(()=>{const t=JSON.parse(localStorage.getItem("allTasks"));for(let e of t.tasks){new y(e.taskName,e.taskStatus,e.taskInfo,e.taskID).updatedUI()}y.checkEmpty("completed"),y.checkEmpty("active")})()}}).init()}]);