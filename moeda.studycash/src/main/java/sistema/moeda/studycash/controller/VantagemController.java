package sistema.moeda.studycash.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sistema.moeda.studycash.model.Vantagem;
import sistema.moeda.studycash.repository.VantagemRepository;

@RestController
@RequestMapping("/api/vantagens")
@CrossOrigin(origins = "*")
public class VantagemController {

    @Autowired
    private VantagemRepository vantagemRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarVantagem(@RequestBody Vantagem vantagem) {
        vantagemRepository.save(vantagem);
        return ResponseEntity.ok("Vantagem cadastrada com sucesso");
    }

    @GetMapping("/empresa/{email}")
    public ResponseEntity<List<Vantagem>> listarPorEmpresa(@PathVariable String email) {
        List<Vantagem> vantagens = vantagemRepository.findByEmpresaEmail(email);
        return ResponseEntity.ok(vantagens);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarVantagem(@PathVariable Long id, @RequestBody Vantagem novaVantagem) {
        Optional<Vantagem> existente = vantagemRepository.findById(id);
        if (existente.isPresent()) {
            Vantagem v = existente.get();
            v.setNome(novaVantagem.getNome());
            v.setImagemUrl(novaVantagem.getImagemUrl());
            v.setPrecoEmMoedas(novaVantagem.getPrecoEmMoedas());
            vantagemRepository.save(v);
            return ResponseEntity.ok("Vantagem atualizada");
        } else {
            return ResponseEntity.badRequest().body("Vantagem não encontrada");
        }
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<String> excluirVantagem(@PathVariable Long id) {
        vantagemRepository.deleteById(id);
        return ResponseEntity.ok("Vantagem excluída com sucesso");
    }

    @GetMapping("/todas")
    public ResponseEntity<List<Vantagem>> listarTodas() {
        return ResponseEntity.ok(vantagemRepository.findAll());
    }
} 