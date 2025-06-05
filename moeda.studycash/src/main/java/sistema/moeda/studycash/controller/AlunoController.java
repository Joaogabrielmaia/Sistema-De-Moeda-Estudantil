package sistema.moeda.studycash.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sistema.moeda.studycash.model.*;
import sistema.moeda.studycash.repository.*;

@RestController
@RequestMapping("/api/aluno")
@CrossOrigin(origins = "*")
public class AlunoController {

    @Autowired
    private SaldoRepository saldoRepository;

    @Autowired
    private TrocaRepository trocaRepository;

    @Autowired
    private VantagemRepository vantagemRepository;

    @Autowired
    private ExtratoAlunoRepository extratoAlunoRepository;

    @GetMapping("/saldo/{email}")
    public ResponseEntity<Integer> getSaldo(@PathVariable String email) {
        Optional<Saldo> saldo = saldoRepository.findById(email);
        return ResponseEntity.ok(saldo.map(Saldo::getMoedas).orElse(0));
    }

    @GetMapping("/vantagens")
    public ResponseEntity<List<Vantagem>> listarVantagens() {
        return ResponseEntity.ok(vantagemRepository.findAll());
    }

   @PostMapping("/trocar")
public ResponseEntity<String> trocar(@RequestBody Map<String, String> dados) {
    String email = dados.get("email");
    Long idVantagem = Long.parseLong(dados.get("idVantagem"));

    Optional<Saldo> optSaldo = saldoRepository.findById(email);
    Optional<Vantagem> optVantagem = vantagemRepository.findById(idVantagem);

    if (optSaldo.isEmpty() || optVantagem.isEmpty()) {
        return ResponseEntity.badRequest().body("Dados inválidos");
    }

    Saldo saldo = optSaldo.get();
    Vantagem vantagem = optVantagem.get();

    if (saldo.getMoedas() < vantagem.getPrecoEmMoedas()) {
        return ResponseEntity.badRequest().body("Saldo insuficiente");
    }

    saldo.setMoedas(saldo.getMoedas() - vantagem.getPrecoEmMoedas());
    saldoRepository.save(saldo);

    Troca troca = new Troca();
    troca.setAlunoEmail(email);
    troca.setVantagem(vantagem.getNome());
    troca.setEmpresa(vantagem.getEmpresaEmail());
    troca.setCusto(vantagem.getPrecoEmMoedas());
    troca.setData(LocalDate.now());
    troca.setCodigoCupom("CUPOM" + ThreadLocalRandom.current().nextInt(100000, 999999));
    trocaRepository.save(troca);

    return ResponseEntity.ok(troca.getCodigoCupom());
}


    @GetMapping("/trocas/{email}")
    public ResponseEntity<List<Troca>> historicoTrocas(@PathVariable String email) {
        return ResponseEntity.ok(trocaRepository.findByAlunoEmail(email));
    }

    @GetMapping("/extrato/{email}")
    public ResponseEntity<List<ExtratoAluno>> extratoAluno(@PathVariable String email) {
        return ResponseEntity.ok(extratoAlunoRepository.findByAlunoEmail(email));
    }
}
