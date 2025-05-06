package com.studycash.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.studycash.model.Aluno;

import jakarta.persistence.*;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class AlunoDAOImpl implements AlunoDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void salvar(Aluno aluno) {
        entityManager.persist(aluno);
    }

    @Override
    public void atualizar(Aluno aluno) {
        entityManager.merge(aluno);
    }

    @Override
    public void deletar(Long id) {
        Aluno aluno = entityManager.find(Aluno.class, id);
        if (aluno != null) {
            entityManager.remove(aluno);
        }
    }

    @Override
    public Aluno buscarPorId(Long id) {
        return entityManager.find(Aluno.class, id);
    }

    @Override
    public List<Aluno> listarTodos() {
        return entityManager.createQuery("SELECT a FROM Aluno a", Aluno.class).getResultList();
    }
}
