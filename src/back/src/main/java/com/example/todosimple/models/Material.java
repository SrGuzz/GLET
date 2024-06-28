package com.example.todosimple.models;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = Material.TABLE_NAME)
public class Material {
    public static final String TABLE_NAME = "Material";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id", nullable = false)
    private Fornecedor fornecedor;

    @Column(name = "nome", length = 50, nullable = false)
    @NotNull
    @NotEmpty
    @Size
    private String nome;

    @Column(name = "quantidade", length = 20, nullable = false)
    @NotNull
    @NotEmpty
    @Size
    private String quantidade;

    @Column(name = "categoria", length = 30, nullable = false)
    @NotNull
    @NotEmpty
    @Size
    private String categoria;

    @Column(name = "descricao", length = 150)
    @Size
    private String descricao;

    @Column(name = "preco", nullable = false)
    @NotNull
    @DecimalMin(value = "0.01")
    private Double preco;



    public Material() {
    }

    public Material(Long id, Fornecedor fornecedor, String nome, String quantidade, String categoria, String descricao, Double preco) {
        this.id = id;
        this.fornecedor = fornecedor;
        this.nome = nome;
        this.quantidade = quantidade;
        this.categoria = categoria;
        this.descricao = descricao;
        this.preco = preco;
    }
   

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Fornecedor getFornecedor() {
        return this.fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getQuantidade() {
        return this.quantidade;
    }

    public void setQuantidade(String quantidade) {
        this.quantidade = quantidade;
    }

    public String getCategoria() {
        return this.categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return this.preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }
    
    
    @Override
public boolean equals(Object obj) {
    if (this == obj)
        return true;
    if (obj == null || getClass() != obj.getClass())
        return false;
    
    Material other = (Material) obj;
    return Objects.equals(id, other.id) && Objects.equals(nome, other.nome) &&
           Objects.equals(quantidade, other.quantidade) && Objects.equals(categoria, other.categoria) &&
           Objects.equals(descricao, other.descricao) && Objects.equals(preco, other.preco);
}


@Override
public int hashCode() {
    return Objects.hash(id, nome, quantidade, categoria, descricao, preco);
}


}
