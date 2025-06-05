package sistema.moeda.studycash.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vantagens")
public class Vantagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String imagemUrl;
    private int precoEmMoedas;
    private String empresaEmail;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public int getPrecoEmMoedas() {
        return precoEmMoedas;
    }

    public void setPrecoEmMoedas(int precoEmMoedas) {
        this.precoEmMoedas = precoEmMoedas;
    }

    public String getEmpresaEmail() {
        return empresaEmail;
    }

    public void setEmpresaEmail(String empresaEmail) {
        this.empresaEmail = empresaEmail;
    }
}