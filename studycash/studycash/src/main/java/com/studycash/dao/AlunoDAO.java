package com.studycash.dao;

import java.util.List;

import com.studycash.model.Aluno;

public interface AlunoDAO {
    void salvar(Aluno aluno);
    void atualizar(Aluno aluno);
    void deletar(Long id);
    Aluno buscarPorId(Long id);
    List<Aluno> listarTodos();
}
