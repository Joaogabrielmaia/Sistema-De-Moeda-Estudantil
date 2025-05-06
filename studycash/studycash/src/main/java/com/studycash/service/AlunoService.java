package com.studycash.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studycash.dao.AlunoDAO;
import com.studycash.model.Aluno;

import java.time.LocalDate;
import java.util.List;

@Service
public class AlunoService {
    
    @Autowired
    private AlunoDAO alunoDAO;
    
    public List<Aluno> listarTodos() {
        return alunoDAO.listarTodos();
    }
    
    public Aluno buscarPorId(Long id) {
        return alunoDAO.buscarPorId(id);
    }
    
    public void cadastrar(Aluno aluno) {
        aluno.setDataCadastro(LocalDate.now());
        alunoDAO.salvar(aluno);
    }
    
    public void atualizar(Aluno aluno) {
        alunoDAO.atualizar(aluno);
    }
    
    public void deletar(Long id) {
        alunoDAO.deletar(id);
    }
    
    public String[] listarInstituicoes() {
        return new String[] {
            "PUC-Rio (Pontifícia Universidade Católica do Rio de Janeiro)",
            "PUC-SP (Pontifícia Universidade Católica de São Paulo)",
            "PUC-MG (Pontifícia Universidade Católica de Minas Gerais)",
            "PUC-RS (Pontifícia Universidade Católica do Rio Grande do Sul)",
            "PUC-PR (Pontifícia Universidade Católica do Paraná)"
        };
    }
}
