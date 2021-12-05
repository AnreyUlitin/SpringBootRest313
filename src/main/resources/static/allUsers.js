allUsers();

function allUsers() {
    let tBody = document.getElementById("tBody");
    tBody.innerHTML = "";
    fetch('http://localhost:8080/getAllUsers')
        .then(response => response.json())
        .then(users => {
            users.forEach(function (user) {
                var row = tBody.insertRow();
                row.setAttribute("id", user.id);
                var cell0 = row.insertCell();
                cell0.innerHTML = user.id;
                var cell1 = row.insertCell();
                cell1.innerHTML = user.firstName;
                var cell2 = row.insertCell();
                cell2.innerHTML = user.lastName;
                var cell3 = row.insertCell();
                cell3.innerHTML = user.age;
                var cell4 = row.insertCell();
                cell4.innerHTML = user.username;
                var cell5 = row.insertCell();
                cell5.innerHTML = allRoles(user).textContent;

                var cell6 = row.insertCell();
                cell6.innerHTML =
                    '<button type="button" onclick="modalEdit(' + user.id + ')" class="btn btn-info">Edit</button>';

                var cell7 = row.insertCell();
                cell7.innerHTML =
                    '<button type="button" onclick="modalDelete(' + user.id + ')" class="btn btn-danger">Delete</button>';
            })
        });
}