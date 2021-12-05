function allRoles(user) {
    let rolesList = document.createElement('ul');

    for (let i = 0; i < user.roles.length; i++) {

        let role = document.createElement('li');
        role.textContent = user.roles[i].role + " ";
        rolesList.appendChild(role);

    }
    return rolesList;
}

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

function deleteUser(id) {
    fetch("http://localhost:8080/delete/" + id, {
        method: "DELETE",
        headers: {"Content-type":"application/json; charset=UTF-8"}
    })
        .then(response => {
            $("#" + id).remove();
        });
}

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

Header();

function Header() {
    //запрос на получение данных в виде json
    fetch('http://localhost:8080/getAuthorizedUser')
        .then(response => response.json())
        .then(user => {

            //ищем по id email юзера и записываем в header_email в виде строки (.innerHTML)
            document.getElementById("header_email").innerHTML = user.username;
            //удобнее выводить в консоль получаемые значения для понимания запросов
            console.log(user)
            console.log(user.username)

            //создаем новый элемент маркированного списка(ul) в который позже вставляются элементы списка (li)
            //т.е. переданная роль или роли юзера, например передаем роль ROLE_ADMIN
            let rolesList = document.createElement('ul');
            for (let i = 0; i < user.roles.length; i++) {

                //создаем элемент списка li со значением роли, например <li>ROLE_ADMIN</li>
                let role = document.createElement('li');
                //в переменную role записываем массив полученных текстовых значений роли/ей, например ROLE_ADMIN
                role.textContent = user.roles[i].role + " ";
                //записываем маркированный список в переменную roleList
                //<ul>
                //  <li>ROLE_ADMIN </li>
                //</ul>
                rolesList.appendChild(role);
            }
            //записываем в header_roles в виде строки (.innerHTML) роль юзера, например with roles: ROLE_ADMIN
            document.getElementById("header_roles").innerHTML = ' with roles: ' + rolesList.textContent;
        });
}

function modalDelete(id) {

    fetch('http://localhost:8080/getUserById/' + id)
        .then(response => response.json())
        .then(user => {

            let adminSelect = "";
            let userSelect = "";

            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].role == "ROLE_ADMIN") {
                    adminSelect = "selected";
                }
                if (user.roles[i].roles == "ROLE_USER") {
                    userSelect = "selected";
                }
            }

            let modal = document.getElementById('modalWindow');

            modal.innerHTML =
                '<div id="modalDelete" ' +
                '     class="modal fade" tabindex="-1" role="dialog"' +
                '     aria-labelledby="TitleModalLabel" aria-hidden="true" ' +
                '     data-backdrop="static" data-keyboard="false">' +
                '    <div class="modal-dialog modal-dialog-scrollable">' +
                '        <div class="modal-content">' +
                '            <div class="modal-header">' +
                '                <h5 class="modal-title" id="TitleModalLabel">Delete user</h5>' +
                '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '                    <span aria-hidden="true">&times;</span>' +
                '                </button>' +
                '            </div>' +
                '            <div class="modal-body bg-white">' +
                '                <form id="formEditUser" style="width: 200px;" ' +
                '                       class="form-signin mx-auto font-weight-bold text-center">' +
                '                    <p>' +
                '                        <label>ID</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               name="id" value="' + user.id + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>First name</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               value="' + user.firstName + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Last name</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               value="' + user.lastName + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Age</label>' +
                '                        <input class="form-control form-control-sm" type="number"' +
                '                               value="' + user.age + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Email</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               value="' + user.username + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Role</label>' +
                '                        <select class="form-control form-control-sm" multiple size="2" readonly>' +
                '                            <option value="ROLE_ADMIN"' + adminSelect + ' >ROLE_ADMIN</option>' +
                '                            <option value="ROLE_USER"' + userSelect + '>ROLE_USER</option>' +
                '                        </select>' +
                '                    </p>' +
                '                </form>' +
                '            </div>' +
                '            <div class="modal-footer">' +
                '                <button type="button" class="btn btn-secondary"' +
                '                        data-dismiss="modal">Close</button>' +
                '                <button class="btn btn-danger" data-dismiss="modal"' +
                '                        onclick="deleteUser(' + user.id + ')">Delete</button>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>';

            $("#modalDelete").modal();

        });
}

function modalEdit(id) {

    fetch('http://localhost:8080/getUserById/' + id)
        .then(response => response.json())
        .then(user => {

            let adminSelect = "";
            let userSelect = "";

            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].role == "ROLE_ADMIN") {
                    adminSelect = "selected";
                }
                if (user.roles[i].role == "ROLE_USER") {
                    userSelect = "selected";
                }
            }

            let modal = document.getElementById('modalWindow');

            modal.innerHTML =
                '<div id="modalEdit"' +
                '     class="modal fade" tabindex="-1" role="dialog"' +
                '     aria-labelledby="TitleModalLabel" aria-hidden="true"' +
                '     data-backdrop="static" data-keyboard="false">' +
                '    <div class="modal-dialog modal-dialog-scrollable">' +
                '        <div class="modal-content">' +
                '            <div class="modal-header">' +
                '                <h5 class="modal-title" id="TitleModalLabel">Edit user</h5>' +
                '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '                    <span aria-hidden="true">x</span>' +
                '                </button>' +
                '            </div>' +
                '            <div class="modal-body bg-white">' +
                '                <form id="formEditUser" style="width: 200px;"' +
                '                       class="form-signin mx-auto font-weight-bold text-center">' +
                '                    <p>' +
                '                        <label>ID</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               id="editID" name="id" value="' + user.id + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>First name</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               id="editFirstName" value="' + user.firstName + '"' +
                '                               placeholder="First name" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Last name</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               id="editLastName" value="' + user.lastName + '" ' +
                '                               placeholder="Last name" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Age</label>' +
                '                        <input class="form-control form-control-sm" type="number"' +
                '                               id="editAge" value="' + user.age + '" ' +
                '                               placeholder="Age" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Email</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               id="editUsername" value="' + user.username + '"' +
                '                               placeholder="Email" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Password</label>' +
                '                        <input class="form-control form-control-sm" type="password"' +
                '                               id="editPassword" placeholder="Password">' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Role</label>' +
                '                        <select id="editRoles" name="roles" multiple size="2" required ' +
                '                               class="form-control form-control-sm">' +
                '                            <option value="ROLE_ADMIN"' + adminSelect + '>ROLE_ADMIN</option>' +
                '                            <option value="ROLE_USER"' + userSelect + '>ROLE_USER</option>' +
                '                        </select>' +
                '                    </p>' +
                '                </form>' +
                '            </div>' +
                '            <div class="modal-footer">' +
                '                <button type="button" class="btn btn-secondary"' +
                '                        data-dismiss="modal">Close</button>' +
                '                <button class="btn btn-primary" data-dismiss="modal"' +
                '                        onclick="editUser()">Edit</button>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>';

            $("#modalEdit").modal();

        });
}

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

userInfo();

function userInfo(user) {
    //запрос на получение данных в виде json
    fetch('http://localhost:8080/getAuthorizedUser')
        .then(response => response.json())
        .then(user => {

            //по id получаем юзера и заполняем таблицу
            let tBody = document.getElementById("userInfo");
            console.log(tBody)

            //добавляем строку в таблицу <tr> и возвращаем ее индекс
            var row = tBody.insertRow(0);

            //добавляем ячейку <td> в строке таблицы <tr>
            var cell0 = row.insertCell(0);
            cell0.innerHTML = user.id;
            var cell1 = row.insertCell(1);
            cell1.innerHTML = user.firstName;
            var cell2 = row.insertCell(2);
            cell2.innerHTML = user.lastName;
            var cell3 = row.insertCell(3);
            cell3.innerHTML = user.age;
            var cell4 = row.insertCell(4);
            cell4.innerHTML = user.username;
            var cell5 = row.insertCell(5);
            cell5.innerHTML = allRoles(user).textContent;
        });

}