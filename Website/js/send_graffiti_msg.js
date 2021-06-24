
// api url
const api_url_post = 
      "https://az1ur8uy74.execute-api.eu-west-1.amazonaws.com/dev/";
 
// Defining async function
async function postapimsg() {
    
    // Storing response
    console.log(id_chat_js)
    const response = await fetch(api_url_post+id_chat_js+"/msgs", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({usuario: document.getElementById("usuario").value, text:document.getElementById("texto").value})
      });
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    showdet(data);
}
// Function to define innerHTML for HTML table
function showdet(data) {
    tab = `<tr> 
    <td>${data.detail} </td>         
  </tr>`;
    
    // Setting innerHTML as tab variable
    document.getElementById("detailmsg").innerHTML = tab;
}