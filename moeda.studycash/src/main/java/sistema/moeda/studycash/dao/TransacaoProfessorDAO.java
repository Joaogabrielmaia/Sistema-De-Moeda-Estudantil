package sistema.moeda.studycash.dao;

import org.springframework.stereotype.Component;
import sistema.moeda.studycash.model.TransacaoProfessor;
import sistema.moeda.studycash.repository.TransacaoProfessorRepository;

import java.util.List;

@Component
public class TransacaoProfessorDAO {

    private final TransacaoProfessorRepository transacaoProfessorRepository;

    public TransacaoProfessorDAO(TransacaoProfessorRepository transacaoProfessorRepository) {
        this.transacaoProfessorRepository = transacaoProfessorRepository;
    }

    public List<TransacaoProfessor> buscarPorEmail(String professorEmail) {
        return transacaoProfessorRepository.findByProfessorEmail(professorEmail);
    }

    public TransacaoProfessor salvar(TransacaoProfessor transacao) {
        return transacaoProfessorRepository.save(transacao);
    }

    public List<TransacaoProfessor> buscarTodos() {
        return transacaoProfessorRepository.findAll();
    }
}

