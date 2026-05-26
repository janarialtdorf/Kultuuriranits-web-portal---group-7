package ee.meeskond7.kultuuriranits_backend.repository;

import ee.meeskond7.kultuuriranits_backend.entity.Program;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {

    //Tavaline filtreerimine ainult kategooria järgi
    Page<Program> findByCategoryId(Long categoryId, Pageable pageable);

    //Otsing nime/kirjelduse järgi ILMA kategooriata
    @Query("SELECT p FROM Program p WHERE " +
            "LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Program> searchPrograms(@Param("keyword") String keyword, Pageable pageable);

    //Otsing nime/kirjelduse järgi JA kategooria järgi koos
    @Query("SELECT p FROM Program p WHERE " +
            "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
            "p.category.id = :categoryId")
    Page<Program> searchProgramsWithCategory(@Param("keyword") String keyword, @Param("categoryId") Long categoryId, Pageable pageable);
}