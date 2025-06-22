package sistema.moeda.studycash.dao;

import org.springframework.stereotype.Component;
import sistema.moeda.studycash.model.ExtratoAluno;
import sistema.moeda.studycash.repository.ExtratoAlunoRepository;

import java.util.List;

@Component
public class ExtratoAlunoDAO {

    private final ExtratoAlunoRepository extratoAlunoRepository;

    public ExtratoAlunoDAO(ExtratoAlunoRepository extratoAlunoRepository) {
        this.extratoAlunoRepository = extratoAlunoRepository;
    }

    public List<ExtratoAluno> buscarPorEmail(String email) {
        return extratoAlunoRepository.findByAlunoEmail(email);
    }

    public ExtratoAluno salvar(ExtratoAluno extratoAluno) {
        return extratoAlunoRepository.save(extratoAluno);
    }

    public List<ExtratoAluno> buscarTodos() {
        return extratoAlunoRepository.findAll();
    }
}

