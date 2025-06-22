package sistema.moeda.studycash.dao;

import org.springframework.stereotype.Component;
import sistema.moeda.studycash.model.Vantagem;
import sistema.moeda.studycash.repository.VantagemRepository;

import java.util.List;

@Component
public class VantagemDAO {

    private final VantagemRepository vantagemRepository;

    public VantagemDAO(VantagemRepository vantagemRepository) {
        this.vantagemRepository = vantagemRepository;
    }

    public List<Vantagem> buscarPorEmailEmpresa(String email) {
        return vantagemRepository.findByEmpresaEmail(email);
    }

    public Vantagem salvar(Vantagem vantagem) {
        return vantagemRepository.save(vantagem);
    }

    public List<Vantagem> buscarTodas() {
        return vantagemRepository.findAll();
    }
}
