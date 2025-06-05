package sistema.moeda.studycash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sistema.moeda.studycash.model.ExtratoAluno;

@Repository
public interface ExtratoAlunoRepository extends JpaRepository<ExtratoAluno, Long> {
    List<ExtratoAluno> findByAlunoEmail(String email);
}