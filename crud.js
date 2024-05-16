function getData() {
    fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(data => 
            displayData(data)
            // console.log(data)
        )
}


function deleteData(id) {
    // const id = document.getElementById("id").value
    fetch(`http://localhost:3000/users/${id}`,{
       method:"DELETE"       
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            getData();
        })
}



function createData() {
    const id = document.getElementById("id").value
    if(id === ""){
        alert("Cannot create user without an id")
        return
    }
    const name = document.getElementById("name").value
    const branch = document.getElementById("branch").value

    fetch("http://localhost:3000/users",{
       method:"POST",
       body:JSON.stringify(
        {
            "id" : id,
            "name" : name,
            "branch": branch
        }
       )
    //    body:JSON.stringify({
    //     "id": "2",
    //     "name": "RaJ",
    //     "branch": "IT"
    //   } )      
    })
        .then(response => response.json())
        .then(data => console.log(data))
}


// function updateData(id) {
//     const id = document.getElementById("id").value
//     const name = document.getElementById("name").value
//     const branch = document.getElementById("branch").value
//     fetch(`http://localhost:3000/users/${id}`,{
//        method:"PATCH",
//        body:JSON.stringify({
//         // "id" : id,
//         "name" : name,
//         "branch": branch
//     })      
//     })
//         .then(response => response.json())
//         .then(data => console.log(data))
// }

function updateData(id) {
    // const id = document.getElementById("id").value
    const type = prompt("Which field do you want to update? Enter 'name' or 'branch':")
    if(type != 'name' && type != 'branch'){
        alert("Invalid field, enter 'name' or 'branch' ")
        return
    }
    
    const newVal = prompt(`Enter the new value for field '${type}'`)

    const newData = {}
    newData[type] = newVal
    
    fetch(`http://localhost:3000/users/${id}`,{
       method:"PATCH",
       body:JSON.stringify(newData),
       headers:{
        "Content-Type" : "application/json"
       }     
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            getData();
        })
        .catch(error => console.error('Error:', error));
}

function displayData(data){
    if(data.length === 0){
        alert("Table is empty")
        return
    }
    const user_table = document.createElement("table");
    user_table.id = "userTable"; // Assign an id to the table
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Branch</th>
            <th> </th>
        </tr>
    `;
    user_table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.id = "updateTable";

    // Add data rows to the table body
    data.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.branch}</td>
            <td>
                <button onclick="deleteData(${user.id})"><img src = "icons/delete.png" alt = "Insert"></button> <!-- Delete button -->
                <button onclick="updateData(${user.id})"><img src = "icons/update.png" alt = "Insert"></button> <!-- Update button -->
            </td>
        `;
        tbody.appendChild(row);
    });

    user_table.appendChild(tbody);

    const userDataDiv = document.getElementById("displayTable");
    userDataDiv.innerHTML = "";
    userDataDiv.appendChild(user_table);
}

// Call getData() when the document is ready
document.addEventListener("DOMContentLoaded", function() {
    getData();
});
// function deleteRow(id) {
//     axios.delete(`http://localhost:3000/users/${id}`)
//         .then(res => {
//             getData(); // Refresh the table after successful deletion
//         })
//         .catch(error => console.log(error));
// }

// function updateRow(id) {
//     const email = prompt("Enter new email:");

//     axios.patch(`http://localhost:3000/users/${id}`, {
//         email: email
//     })
//     .then(res => {
//         getData(); // Refresh the table after successful update
//     })
//     .catch(error => console.log(error));
// }
