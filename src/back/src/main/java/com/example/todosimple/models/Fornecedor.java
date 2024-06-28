package com.example.todosimple.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = Fornecedor.TABLE_NAME)
public class Fornecedor {
    
    public interface CreateFornecedor{}
    public interface UpdateFornecedor{}

    public static final String TABLE_NAME = "fornecedor";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    @NotNull(groups = {CreateFornecedor.class, UpdateFornecedor.class})
    @NotEmpty(groups = {CreateFornecedor.class, UpdateFornecedor.class})
    @Size(groups = {CreateFornecedor.class, UpdateFornecedor.class}, min= 2, max = 100)
    private String nome;

    @Column(name = "contato", length = 20, nullable = false, unique = true)
    @NotNull(groups = {CreateFornecedor.class, UpdateFornecedor.class})
    @NotEmpty(groups = {CreateFornecedor.class, UpdateFornecedor.class})
    @Size(groups = {CreateFornecedor.class, UpdateFornecedor.class}, min= 10, max = 20)
    private String contato;

    @Column(name = "categoria", length = 20, nullable = false)
    @NotNull(groups = {CreateFornecedor.class, UpdateFornecedor.class})
    @NotEmpty(groups = {CreateFornecedor.class, UpdateFornecedor.class})
    @Size(groups = {CreateFornecedor.class, UpdateFornecedor.class}, min= 2, max = 20)
    private String categoria;


    @Column(name = "cnpj", length = 20, nullable = false, unique = true)
    @NotNull(groups = {CreateFornecedor.class, UpdateFornecedor.class})
    @NotEmpty(groups = {CreateFornecedor.class, UpdateFornecedor.class})
    @Size(groups = {CreateFornecedor.class, UpdateFornecedor.class}, min= 14, max = 20)
    private String cnpj;

    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Material> materiais = new ArrayList<Material>();

    @JsonIgnore
    public List<Material> getMateriais() {
        return this.materiais;
    }

    public Fornecedor() {
    }

    public Fornecedor(Long id, String nome, String contato, String categoria, String cnpj) {
        this.id = id;
        this.nome = nome;
        this.contato = contato;
        this.categoria = categoria;
        this.cnpj = cnpj;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getContato() {
        return this.contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public String getCategoria() {
        return this.categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getCnpj() {
        return this.cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this)
        return true;

        if (obj == null)
            return false;
        
        if (!(obj instanceof Fornecedor))
            return false;

        Fornecedor other = (Fornecedor) obj;   
        
        if (this.id == null)
            if (other.id != null)
                return false;
            else if (!this.id.equals(other.id))    
            return false;
        return Objects.equals(this.id, other.id) && Objects.equals(this.nome, other.nome) 
        && Objects.equals(this.contato, other.contato) && Objects.equals(this.categoria, other.categoria) 
        && Objects.equals(this.cnpj, other.cnpj);    
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        return result;
    }


}
