// api url
const api_url = 
      "https://az1ur8uy74.execute-api.eu-west-1.amazonaws.com/dev/";
  
// Defining async function
async function getapi(url) {
    // Storing response
    const response = await fetch(url+id_chat_js);//document.getElementById("id_chat").value);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    show(data);
}
// Calling that async function
getapi(api_url);
// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<tr>
        <th>Nombre del Graffiti</th>
        <th>Fecha publicacion</th>
        <th>Descripción del Graffiti</th>
        <th>Usuario Creador</th>
        </tr>`;
    
    // Loop to access all rows 
    for (let r of data.messages) {
        tab += `<tr> 
    <td>${r.id} </td>
    <td>${r.fecha_publicacion}</td>
    <td>${r.des_graffiti}</td> 
    <td>${r.usuario}</td>          
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("graffiti_table").innerHTML = tab;
}