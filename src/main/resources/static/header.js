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