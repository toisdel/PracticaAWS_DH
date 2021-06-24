// api url
const api_url_msg = 
      "https://az1ur8uy74.execute-api.eu-west-1.amazonaws.com/dev/";
  
// Defining async function
async function getapimsg(url) {
    // Storing response
    const response = await fetch(url+id_chat_js+"/msgs");
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    showmsg(data);
}
// Calling that async function
getapimsg(api_url_msg);
// Function to define innerHTML for HTML table
function showmsg(data) {
    let tab = 
        `<tr>
          <th>Fecha publicacion</th>
          <th>Usuario</th>
          <th>Comentario</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data.messages) {
        tab += `<tr> 
    <td>${r.fecha_publicacion}</td>
    <td>${r.usuario}</td>    
    <td>${r.text}</td> 
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("graffiti_msgs").innerHTML = tab;
}