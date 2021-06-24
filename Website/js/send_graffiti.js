
// api url
const api_url = 
      "https://az1ur8uy74.execute-api.eu-west-1.amazonaws.com/dev/";
//var WildRydes = window.WildRydes || {};
// Defining async function
async function getapi() {
  //var authToken;
  //authtoken= await WildRydes.authToken;
  // Storing response
  //console.log(authtoken);
  const response = await fetch(api_url+document.getElementById("ID_GRAFFITI").value, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        //'Authorization': authToken
      },
      body: JSON.stringify({id_graffiti: document.getElementById("ID_GRAFFITI").value, usuario: document.getElementById("USUARIO").value, des_graffiti:document.getElementById("DES_GRAFFITI").value})
    });
  
  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  show(data);
}
// Function to define innerHTML for HTML table
function show(data) {
    tab = `<tr> 
    <td>${data.detail} </td>         
  </tr>`;
    
    // Setting innerHTML as tab variable
    document.getElementById("id_graffiti").innerHTML = tab;
}