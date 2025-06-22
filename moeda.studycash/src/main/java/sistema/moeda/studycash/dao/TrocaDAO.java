package sistema.moeda.studycash.dao;

import org.springframework.stereotype.Component;
import sistema.moeda.studycash.model.Troca;
import sistema.moeda.studycash.repository.TrocaRepository;

import java.util.List;

@Component
public class TrocaDAO {

    private final TrocaRepository trocaRepository;

    public TrocaDAO(TrocaRepository trocaRepository) {
        this.trocaRepository = trocaRepository;
    }

    public List<Troca> buscarPorEmailAluno(String email) {
        return trocaRepository.findByAlunoEmail(email);
    }

    public Troca salvar(Troca troca) {
        return trocaRepository.save(troca);
    }

    public List<Troca> buscarTodos() {
        return trocaRepository.findAll();
    }
}
