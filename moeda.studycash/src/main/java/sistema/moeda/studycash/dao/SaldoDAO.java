package sistema.moeda.studycash.dao;

import org.springframework.stereotype.Component;
import sistema.moeda.studycash.model.Saldo;
import sistema.moeda.studycash.repository.SaldoRepository;

import java.util.List;
import java.util.Optional;

@Component
public class SaldoDAO {

    private final SaldoRepository saldoRepository;

    public SaldoDAO(SaldoRepository saldoRepository) {
        this.saldoRepository = saldoRepository;
    }

    public Saldo salvar(Saldo saldo) {
        return saldoRepository.save(saldo);
    }

    public Optional<Saldo> buscarPorId(String id) {
        return saldoRepository.findById(id);
    }

    public List<Saldo> buscarTodos() {
        return saldoRepository.findAll();
    }
}
