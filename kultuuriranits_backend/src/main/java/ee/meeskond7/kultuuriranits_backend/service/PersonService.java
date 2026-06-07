package ee.meeskond7.kultuuriranits_backend.service;

import com.github.vladislavgoltjajev.personalcode.locale.estonia.EstonianPersonalCodeValidator;
import ee.meeskond7.kultuuriranits_backend.entity.Person;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;

@Service
public class PersonService {
    private final Pattern pattern = Pattern.compile("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$");
    private final EstonianPersonalCodeValidator validator = new EstonianPersonalCodeValidator();
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public void validate(Person person, boolean isNew) {
        if (isNew && person.getId() != null) {
            throw new RuntimeException("Uuel kasutajal ei tohi olla ID-d");
        }
        if (!isNew && person.getId() == null) {
            throw new RuntimeException("Profiili uuendamiseks on ID vajalik");
        }
        if (person.getEmail() == null || person.getEmail().isBlank()) {
            throw new RuntimeException("E-mail on kohustuslik");
        }
        if (person.getPersonalCode() == null || person.getPersonalCode().isBlank()) {
            throw new RuntimeException("Isikukood on kohustuslik");
        }
        if (!pattern.matcher(person.getEmail()).matches()) {
            throw new RuntimeException("Vigane e-maili formaat");
        }
        if (!validator.isValid(person.getPersonalCode())) {
            throw new RuntimeException("Vigane isikukood. Server sai väärtuseks: [" + person.getPersonalCode() + "]");
        }
    }
}