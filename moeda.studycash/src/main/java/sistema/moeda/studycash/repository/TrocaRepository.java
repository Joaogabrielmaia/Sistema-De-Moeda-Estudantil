package sistema.moeda.studycash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sistema.moeda.studycash.model.Troca;

@Repository
public interface TrocaRepository extends JpaRepository<Troca, Long> {
    List<Troca> findByAlunoEmail(String email);
}