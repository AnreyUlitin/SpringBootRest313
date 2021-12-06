package SpringRest.service;

import SpringRest.model.Role;
import SpringRest.model.User;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class UserDataBase {

    private final RoleService roleService;
    private final UserService userService;

    public UserDataBase(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @PostConstruct
    public void loadUserDataBase() {
        Set<Role> allRoles = new HashSet<>();
        allRoles.add(new Role("ROLE_ADMIN"));
        allRoles.add(new Role("ROLE_USER"));
        roleService.addRole(allRoles);

        User user1 = new User("user_first_name_1", "user_last_name_1", (byte) 90, "user1@bk", "user1");
        user1.setRoles("ROLE_ADMIN, ROLE_USER");
        userService.addUser(user1);

        User user2 = new User("user_first_name_2", "user_last_name_2", (byte) 100, "user2@bk", "user2");
        user2.setRoles("ROLE_USER");
        userService.addUser(user2);

        User user3 = new User("user_first_name_3", "user_last_name_3", (byte) 120, "user3@bk", "user3");
        user3.setRoles("ROLE_ADMIN");
        userService.addUser(user3);
    }
}
