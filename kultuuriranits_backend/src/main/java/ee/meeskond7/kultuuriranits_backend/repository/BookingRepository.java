package ee.meeskond7.kultuuriranits_backend.repository;

import ee.meeskond7.kultuuriranits_backend.entity.Booking;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<@NonNull Booking,@NonNull Long> {
}
