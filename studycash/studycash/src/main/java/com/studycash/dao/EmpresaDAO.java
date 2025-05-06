package com.studycash.dao;

import java.util.List;
import com.studycash.model.Empresa;

public interface EmpresaDAO {
    void salvar(Empresa empresa);
    void atualizar(Empresa empresa);
    void deletar(Long id);
    Empresa buscarPorId(Long id);
    List<Empresa> listarTodos();
}