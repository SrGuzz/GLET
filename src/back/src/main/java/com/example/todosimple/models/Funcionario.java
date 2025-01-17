package com.example.todosimple.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



@Entity
@Table(name = Funcionario.TABLE_NAME)

public class Funcionario {
    public interface ICreateFuncionario {

    }

    public interface IUpdateFuncionario {

    }

    public static final String TABLE_NAME = "Funcionario";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    @NotNull(groups = { ICreateFuncionario.class })
    @NotEmpty(groups = { ICreateFuncionario.class })
    @Size(groups = ICreateFuncionario.class, min = 2, max = 100)
    private String username;

    @Column(name = "CPF", length = 11, nullable = false, unique = true)
    @NotNull(groups = { ICreateFuncionario.class, IUpdateFuncionario.class })
    @NotEmpty(groups = { ICreateFuncionario.class })
    @Size(groups = ICreateFuncionario.class, min = 11, max = 11)
    private String cpf;

    @Column(name = "cargo", length = 100, nullable = false)
    @NotNull(groups = { ICreateFuncionario.class, IUpdateFuncionario.class })
    @NotEmpty(groups = { ICreateFuncionario.class })
    @Size(groups = ICreateFuncionario.class, min = 2, max = 60)
    private String cargo;
    
    @Column(name = "TipoCNH")
    @NotNull(groups = { ICreateFuncionario.class, IUpdateFuncionario.class })
    private char tipoCNH;

    @Column(name = "DataAdmissao")
    @NotEmpty(groups = { ICreateFuncionario.class, IUpdateFuncionario.class })
    @NotNull(groups = { ICreateFuncionario.class, IUpdateFuncionario.class })
    private String dataAdmissao; 

    @Column(name = "Status", length = 20)
    @NotEmpty(groups = { ICreateFuncionario.class, IUpdateFuncionario.class })
    @NotNull(groups = { ICreateFuncionario.class, IUpdateFuncionario.class })
    private String status;

    @Column(name = "Observações")
    @NotEmpty(groups = { ICreateFuncionario.class, IUpdateFuncionario.class })
    @NotNull(groups = { ICreateFuncionario.class, IUpdateFuncionario.class })
    @Size(groups = ICreateFuncionario.class, min = 2, max = 200)
    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "servicoAtual", nullable = true)
    @JsonIgnoreProperties({"funcionarios", "veiculos"})
    private Servico servicoAtual;

    @ManyToMany(mappedBy = "funcionarios")
    @JsonIgnore
    private Set<Servico> servicos = new HashSet<>();

    public Funcionario() {
    }

    public Funcionario(Long id, String username, String Cargo, String cpf, char tipoCNH, String dataAdmissao, String status, String observacoes) {
        this.id = id;
        this.username = username;
        this.cpf = cpf;
        this.tipoCNH = tipoCNH;
        this.dataAdmissao = dataAdmissao;
        this.status = status;
        this.observacoes = observacoes;
    }    

    public Servico getServicoAtual() {
        return this.servicoAtual;
    }

    public void setServicoAtual(Servico servicoAtual) {
        this.servicoAtual = servicoAtual;
    }    

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCargo() {
        return this.cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public char getTipoCNH() {
        return this.tipoCNH;
    }

    public void setTipoCNH(char tipoCNH) {
        this.tipoCNH = tipoCNH;
    }

    public String getDataAdmissao() {
        return this.dataAdmissao;
    }

    public void setDataAdmissao(String dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getObservacoes() {
        return this.observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Set<Servico> getServicos() {
        return this.servicos;
    }

    public void setServicos(Set<Servico> servicos) {
        this.servicos = servicos;
    }
    
    @Override
    public boolean equals (Object obj) {
        if (obj == this) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof Funcionario)) {
            return false;
        }
        Funcionario other = (Funcionario) obj;
        if (this.id == null) {
            if (other.id != null) {
                return false;
            } else if (!this.id.equals(other.id)) {
                return false;
            }
        }
        return Objects.equals(this.id, other.id) && Objects.equals(this.username, other.username)
                    && Objects.equals(this.cpf, other.cpf);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        return result;
    }

}
    