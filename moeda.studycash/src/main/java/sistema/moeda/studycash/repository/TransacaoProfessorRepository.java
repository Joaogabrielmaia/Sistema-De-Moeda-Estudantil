package sistema.moeda.studycash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sistema.moeda.studycash.model.TransacaoProfessor;

@Repository
public interface TransacaoProfessorRepository extends JpaRepository<TransacaoProfessor, Long> {
    List<TransacaoProfessor> findByProfessorEmail(String professorEmail);
}