package sistema.moeda.studycash.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sistema.moeda.studycash.model.Saldo;
import sistema.moeda.studycash.model.TransacaoProfessor;
import sistema.moeda.studycash.repository.SaldoRepository;
import sistema.moeda.studycash.repository.TransacaoProfessorRepository;

@RestController
@RequestMapping("/api/professor")
@CrossOrigin(origins = "*")
public class ProfessorController {

    @Autowired
    private SaldoRepository saldoRepository;

    @Autowired
    private TransacaoProfessorRepository transacaoRepository;

    @PostMapping("/enviar")
    public ResponseEntity<String> enviarMoedas(@RequestBody TransacaoProfessor transacao) {
        Optional<Saldo> saldoProfessor = saldoRepository.findById(transacao.getProfessorEmail());
        Optional<Saldo> saldoAluno = saldoRepository.findById(transacao.getAlunoEmail());

        if (saldoProfessor.isEmpty()) {
            Saldo s = new Saldo();
            s.setEmail(transacao.getProfessorEmail());
            s.setMoedas(1000);
            saldoRepository.save(s);
            saldoProfessor = Optional.of(s);
        }

        if (saldoAluno.isEmpty()) {
            Saldo s = new Saldo();
            s.setEmail(transacao.getAlunoEmail());
            s.setMoedas(0);
            saldoRepository.save(s);
            saldoAluno = Optional.of(s);
        }

        Saldo professor = saldoProfessor.get();
        Saldo aluno = saldoAluno.get();

        if (professor.getMoedas() < transacao.getQuantidade()) {
            return ResponseEntity.badRequest().body("Saldo insuficiente do professor");
        }

        professor.setMoedas(professor.getMoedas() - transacao.getQuantidade());
        aluno.setMoedas(aluno.getMoedas() + transacao.getQuantidade());

        saldoRepository.save(professor);
        saldoRepository.save(aluno);

        transacao.setData(LocalDate.now());
        transacaoRepository.save(transacao);

        return ResponseEntity.ok("Moedas enviadas com sucesso");
    }

    @GetMapping("/saldo/{email}")
    public ResponseEntity<Integer> consultarSaldo(@PathVariable String email) {
        Optional<Saldo> saldo = saldoRepository.findById(email);
        if (saldo.isPresent()) {
            return ResponseEntity.ok(saldo.get().getMoedas());
        } else {
            Saldo s = new Saldo();
            s.setEmail(email);
            s.setMoedas(1000);
            saldoRepository.save(s);
            return ResponseEntity.ok(1000);
        }
    }

    @GetMapping("/transacoes/{email}")
    public ResponseEntity<List<TransacaoProfessor>> extrato(@PathVariable String email) {
        return ResponseEntity.ok(transacaoRepository.findByProfessorEmail(email));
    }
}