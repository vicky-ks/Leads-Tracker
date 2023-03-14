const inputbtn = document.getElementById("ip-bt");
const inputEl = document.getElementById("inp-el");
const deleteBtn = document.getElementById("de-bt");
const ulEl = document.getElementById("ul-el");
const tabBtn = document.getElementById("tb-bt");
let myLeads = [];

//localStorage.setItem(key,value)
// localStorage.getItem(key)
// localStorage.clear()
//both and value need to be in strings
const LeadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (LeadsFromLocalStorage) {
  myLeads = LeadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputbtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  //   myLeads = JSON.stringify(myLeads);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  //   myLeads = JSON.parse(myLeads);
  render(myLeads);
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
        <li>
        <a target = '_blank' href= '${leads[i]}'>
        ${leads[i]}
        </a>
        </li>
    `;
    //the end "" with `` and "+ anything +" ==> ${anything}
    //listItems += "<li><a target = '_blank' href= '" + myLeads[i] + "'>" + myLeads[i] + "</a> </li>";
  }

  ulEl.innerHTML = listItems; //manipulate the dom outside the loop as it's costly
}
