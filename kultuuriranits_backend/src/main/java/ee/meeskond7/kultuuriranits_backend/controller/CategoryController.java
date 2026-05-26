package ee.meeskond7.kultuuriranits_backend.controller;

import ee.meeskond7.kultuuriranits_backend.entity.Booking;
import ee.meeskond7.kultuuriranits_backend.entity.Category;
import ee.meeskond7.kultuuriranits_backend.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("category")
    public List<Category> getCategory(){
        return categoryRepository.findAll();
    }

    @PostMapping("category")
    public List<Category> addCategory(@RequestBody Category category){
        if (category.getId() != null){
            throw new RuntimeException("Cannot add with ID");
        }
        categoryRepository.save(category); //siin salvestab
        return categoryRepository.findAll(); //siin on uuenenud seis
    }
}
