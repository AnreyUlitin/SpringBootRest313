function newUser() {
    let form = window.formNewUser.newRoles;
    let new_Roles = "";
    let rolesList = document.createElement('ul');

    for (var i = 0; i < form.length; i++) {
        var option = form.options[i];
        let role = document.createElement('li');
        if (option.selected) {
            new_Roles = new_Roles.concat(option.value + (i != (form.length - 1) ? "," : ""));

            role.textContent = option.value + " ";
            rolesList.appendChild(role);
        }
    }

    fetch('http://localhost:8080/create', {
        method: 'POST',
        body: JSON.stringify({
            firstName: window.formNewUser.newFirstName.value,
            lastName: window.formNewUser.newLastName.value,
            age: window.formNewUser.newAge.value,
            username: window.formNewUser.newUsername.value,
            password: window.formNewUser.newPassword.value,
            roles: new_Roles
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(user => {
            $('#tBody tr:last').after('<tr id=' + user.id + '>' +
                '<td>' + user.id + '</td>' +
                '<td>' + window.formNewUser.newFirstName.value + '</td>' +
                '<td>' + window.formNewUser.newLastName.value + '</td>' +
                '<td>' + window.formNewUser.newAge.value + '</td>' +
                '<td>' + window.formNewUser.newUsername.value + '</td>' +
                '<td>' + rolesList.textContent + '</td>' +
                '<td> <button type="button" onclick="modalEdit(' + user.id + ')" class="btn btn-info">Edit</button> </td>' +
                '<td> <button type="button" onclick="modalDelete(' + user.id + ')" class="btn btn-danger">Delete</button> </td>' +
                '</tr>');

            // window.formNewUser.newFirstName.value = "";
            // window.formNewUser.newLastName.value = "";
            // window.formNewUser.newAge.value = "";
            // window.formNewUser.newUsername.value = "";
            // window.formNewUser.newPassword.value = "";
            // window.formNewUser.newRoles.value = "";

            $('#NewUserCreated').modal();
        });
}