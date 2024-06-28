package com.example.todosimple.models;


import java.util.Set;

import java.util.HashSet;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PreRemove;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = Servico.TABLE_NAME)
public class Servico {
    public interface CreateServico {}
    public interface UpdateServico {}

    public static final String TABLE_NAME = "servico";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nomeCliente", length = 100, nullable = false)
    @NotBlank(groups = CreateServico.class)
    @Size(groups = CreateServico.class, min = 2, max = 100)
    private String nomeCliente;

    @Column(name = "endereco", length = 100, nullable = false)
    @NotBlank(groups = CreateServico.class)
    @Size(groups = CreateServico.class, min = 5, max = 100)
    private String endereco;

    @Column(name = "dataAgendamento", length = 10, nullable = false)
    @NotBlank(groups = CreateServico.class)
    @Size(groups = CreateServico.class, min = 10, max = 10)
    private String dataAgendamento;

    @Column(name = "previsaoTermino", length = 10, nullable = false)
    @NotBlank(groups = CreateServico.class)
    @Size(groups = CreateServico.class, min = 10, max = 10)
    private String previsaoTermino;

    @Column(name = "dataTermino", length = 10, nullable = true)
    @Size(groups = CreateServico.class, min = 0, max = 10)
    private String dataTermino;

    @Column(name = "valor", nullable = false)
    @NotNull(message = "O valor não pode ser nulo")
    private Float valor;

    @Column(name = "descricao", length = 255, nullable = false)
    @NotBlank(groups = CreateServico.class)
    @Size(groups = CreateServico.class, min = 5, max = 255)
    private String descricao;

    
    @ManyToMany
    @JoinTable(
        name = "servico_funcionario", 
        joinColumns = @JoinColumn(name = "servico_id"), 
        inverseJoinColumns = @JoinColumn(name = "funcionario_id"))
    private Set<Funcionario> funcionarios = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "servico_veiculo",
        joinColumns = @JoinColumn(name = "servico_id"),
        inverseJoinColumns = @JoinColumn(name = "veiculo_id"))
    private Set<Veiculo> veiculos = new HashSet<>();

    public Servico() {}

    public Servico(String endereco, String nomeCliente, String dataAgendamento, String previsaoTermino, String dataTermino, String descricao , Float valor, Set<Funcionario> funcionarios, Set <Veiculo> veiculos) {
        this.endereco = endereco;
        this.nomeCliente = nomeCliente;
        this.dataAgendamento = dataAgendamento;
        this.previsaoTermino = previsaoTermino;
        this.dataTermino = dataTermino;
        this.valor = valor;
        this.descricao = descricao;
        this.funcionarios = funcionarios;
        this.veiculos = veiculos;
    }

    @PreRemove
    private void preRemove() {
        for (Funcionario funcionario : funcionarios) {
            if (funcionario.getServicoAtual() != null && funcionario.getServicoAtual().equals(this)) {
                funcionario.setServicoAtual(null);
            }
        }

        for (Veiculo veiculo : veiculos) {
            if (veiculo.getServicoAtual() != null && veiculo.getServicoAtual().equals(this)) {
                veiculo.setServicoAtual(null);
            }
        }
    }


    public String getPrevisaoTermino() {
        return this.previsaoTermino;
    }

    public void setPrevisaoTermino(String previsaoTermino) {
        this.previsaoTermino = previsaoTermino;
    }

    public Float getValor() {
        return this.valor;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public Set<Veiculo> getVeiculos() {
        return this.veiculos;
    }

    public void setVeiculos(Set<Veiculo> veiculos) {
        this.veiculos = veiculos;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCliente() {
        return this.nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getEndereco() {
        return this.endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getDataAgendamento() {
        return this.dataAgendamento;
    }

    public void setDataAgendamento(String dataAgendamento) {
        this.dataAgendamento = dataAgendamento;
    }

    public String getDataTermino() {
        return this.dataTermino;
    }

    public void setDataTermino(String dataTermino) {
        this.dataTermino = dataTermino;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Funcionario> getFuncionarios() {
        return this.funcionarios;
    }

    public void setFuncionarios(Set<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
    }

    public void limpaFuncionarios() {
        this.funcionarios.clear();
    }

    @Override
    public boolean equals(Object obj){
        if (obj == this) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof Servico)) {
            return false;
        }
        Servico other = (Servico) obj;
        if (this.id == null) {
            if (other.id != null) {
                return false;
            } else if (!this.id.equals(other.id)) {
                return false;
            }
        }
        return Objects.equals(this.id, other.id) && Objects.equals(this.endereco, other.endereco);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        return result;
    }
}
