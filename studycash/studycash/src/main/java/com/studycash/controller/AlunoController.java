package com.studycash.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.studycash.model.Aluno;
import com.studycash.service.AlunoService;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "*")
public class AlunoController {
    
    @Autowired
    private AlunoService alunoService;
    
    @GetMapping
    public List<Aluno> listarTodos() {
        return alunoService.listarTodos();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        Aluno aluno = alunoService.buscarPorId(id);
        return aluno != null ? ResponseEntity.ok(aluno) : ResponseEntity.notFound().build();
    }
    
    @PostMapping
public ResponseEntity<Aluno> cadastrar(@RequestBody Aluno aluno) {
    // Verifica se a instituição foi enviada
    if (aluno.getInstituicao() == null || aluno.getInstituicao().trim().isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Instituição é obrigatória");
    }
    
    alunoService.cadastrar(aluno);
    return ResponseEntity.ok(aluno);
}

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizar(@PathVariable Long id, @RequestBody Aluno aluno) {
        aluno.setId(id);
        alunoService.atualizar(aluno);
        return ResponseEntity.ok(aluno);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        alunoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/instituicoes")
    public String[] listarInstituicoes() {
        return alunoService.listarInstituicoes();
    }
}
