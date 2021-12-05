function editUser() {

    let form = window.formEditUser.editRoles;
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

    let id = window.formEditUser.editID.value;

    fetch('http://localhost:8080/edit', {
        method: 'PUT',
        body: JSON.stringify({
            id: window.formEditUser.editID.value,
            firstName: window.formEditUser.editFirstName.value,
            lastName: window.formEditUser.editLastName.value,
            age: window.formEditUser.editAge.value,
            username: window.formEditUser.editUsername.value,
            password: window.formEditUser.editPassword.value,
            roles: new_Roles
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            $('#' + id).replaceWith('<tr id=' + id + '>' +
                '<td>' + id + '</td>' +
                '<td>' + window.formEditUser.editFirstName.value + '</td>' +
                '<td>' + window.formEditUser.editLastName.value + '</td>' +
                '<td>' + window.formEditUser.editAge.value + '</td>' +
                '<td>' + window.formEditUser.editUsername.value + '</td>' +
                '<td>' + rolesList.textContent + '</td>' +
                '<td> <button type="button" onclick="modalEdit(' + id + ')" class="btn btn-info">Edit</button> </td>' +
                '<td> <button type="button" onclick="modalDelete(' + id + ')" class="btn btn-danger">Delete</button> </td>' +
                '</tr>');
        });
}