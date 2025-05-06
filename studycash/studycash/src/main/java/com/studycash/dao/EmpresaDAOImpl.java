package com.studycash.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.studycash.model.Empresa;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class EmpresaDAOImpl implements EmpresaDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void salvar(Empresa empresa) {
        entityManager.persist(empresa);
    }

    @Override
    public void atualizar(Empresa empresa) {
        entityManager.merge(empresa);
    }

    @Override
    public void deletar(Long id) {
        Empresa empresa = entityManager.find(Empresa.class, id);
        if (empresa != null) {
            entityManager.remove(empresa);
        }
    }

    @Override
    public Empresa buscarPorId(Long id) {
        return entityManager.find(Empresa.class, id);
    }

    @Override
    public List<Empresa> listarTodos() {
        return entityManager.createQuery("SELECT e FROM Empresa e", Empresa.class).getResultList();
    }
}