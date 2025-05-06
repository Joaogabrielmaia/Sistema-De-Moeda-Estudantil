package com.studycash.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vantagens")
public class Vantagem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String descricao;
    private double custoMoedas;
    private String fotoProduto; // Caminho da imagem ou Base64
    
    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getCustoMoedas() {
        return custoMoedas;
    }

    public void setCustoMoedas(double custoMoedas) {
        this.custoMoedas = custoMoedas;
    }

    public String getFotoProduto() {
        return fotoProduto;
    }

    public void setFotoProduto(String fotoProduto) {
        this.fotoProduto = fotoProduto;
    }
}