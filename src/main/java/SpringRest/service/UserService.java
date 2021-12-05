package SpringRest.service;

import SpringRest.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void addUser(User user);

    void updateUser(User user);

    void deleteUserById(Long id);

    User getUser(Long id);

    Optional<User> getUserById(Long id);

    User getByUsername(String username);

    List<User> getAllUsers();

}
