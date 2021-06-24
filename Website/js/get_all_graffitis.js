// api url
const api_url = 
      "https://az1ur8uy74.execute-api.eu-west-1.amazonaws.com/dev/all_graf";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
    funchr();

}
// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    var cell=document.createElement("td");
    var btn = document.createElement("BUTTON");
    let tab = 
        `<tr>
          <th>Nombre del Graffiti</th>
          <th>Fecha publicacion</th>
          <th>Descripción del Graffiti</th>
          <th>Usuario Creador</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data.messages) {
        btn.appendChild(document.createTextNode("test"));
        btn.setAttribute("id",r.id);
        tab += `<tr> 
        <td>${r.id} </td>
        <td>${r.fecha_publicacion}</td>
        <td>${r.des_graffiti}</td> 
        <td>${r.usuario}</td>        
        </tr>`
        
    }
    
    // Setting innerHTML as tab variable
    document.getElementById("id_graffiti").innerHTML = tab;
}
function addButtonToTable(button, table, rowid) {
    var cell = document.createElement("td");
    // Get first row of table
    var row = table.rows[rowid];

    // Add button to table cell
    cell.appendChild(button);
    row.appendChild(cell);
  }
  // Your old function
function funchr()
  {   
    // Get table
    var table = document.getElementById("id_graffiti");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var id_chat = getidtable(i, table);
        var btn = document.createElement("BUTTON");       
        btn.appendChild(document.createTextNode("CHAT"));
        btn.setAttribute("type","submit");                              
        btn.setAttribute("id",id_chat);
        btn.setAttribute("class","vp");
        addButtonToTable(btn, table, i);
        //btn.setAttribute("onclick",redirect(id_chat))
        //btn.addEventListener("click", redirect(id_chat),false);
    }
      
}
function getidtable(row_id, myTab) {
    var objCells = myTab.rows.item(row_id).cells;
    return objCells.item(0).innerHTML;
}


function redirect(id_chat)
{
    window.location.href = 'postchatmsg.html?id_graffiti='+id_chat;
}


