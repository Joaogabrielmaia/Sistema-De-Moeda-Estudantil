package com.studycash.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.studycash.dao.EmpresaDAO;
import com.studycash.model.Empresa;
import java.util.List;

@Service
public class EmpresaService {
    
    @Autowired
    private EmpresaDAO empresaDAO;
    
    public List<Empresa> listarTodos() {
        return empresaDAO.listarTodos();
    }
    
    public Empresa buscarPorId(Long id) {
        return empresaDAO.buscarPorId(id);
    }
    
    public void cadastrar(Empresa empresa) {
        empresaDAO.salvar(empresa);
    }
    
    public void atualizar(Empresa empresa) {
        empresaDAO.atualizar(empresa);
    }
    
    public void deletar(Long id) {
        empresaDAO.deletar(id);
    }
}   