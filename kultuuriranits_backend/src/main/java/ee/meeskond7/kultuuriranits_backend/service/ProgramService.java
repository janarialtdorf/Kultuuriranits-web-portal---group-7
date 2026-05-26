package ee.meeskond7.kultuuriranits_backend.service;

import ee.meeskond7.kultuuriranits_backend.entity.Program;
import ee.meeskond7.kultuuriranits_backend.repository.ProgramRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ProgramService {

    private final ProgramRepository programRepository;

    public Page<Program> searchPrograms(String keyword, Long categoryId, Pageable pageable) {
        // Kui kasutaja valis otsingule lisaks ka kategooria
        if (categoryId != null) {
            return programRepository.searchProgramsWithCategory(keyword, categoryId, pageable);
        }

        // Kui otsitakse ainult märksõna järgi ilma kategooriata
        return programRepository.searchPrograms(keyword, pageable);
    }
}