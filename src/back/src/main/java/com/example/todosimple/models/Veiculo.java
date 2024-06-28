package com.example.todosimple.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = Veiculo.TABLE_NAME)
public class Veiculo {
    public interface ICreateVeiculo {
    }

    public interface IUpdateVeiculo {
    }

    public static final String TABLE_NAME = "Veiculo";

    @Column(name = "modelo", length = 50, nullable = false)
    @NotNull(groups = ICreateVeiculo.class)
    @NotEmpty(groups = ICreateVeiculo.class)
    @Size(groups = ICreateVeiculo.class, min = 2, max = 50)
    private String modelo;

    @Id
    @Column(name = "placa", length = 7, nullable = false, unique = true)
    @NotNull(groups = ICreateVeiculo.class)
    @NotEmpty(groups = ICreateVeiculo.class)
    @Size(groups = ICreateVeiculo.class, min = 7, max = 7)
    private String placa;

    @Column(name = "ano", length = 4, nullable = false)
    @NotNull(groups = ICreateVeiculo.class)
    @Min(groups = ICreateVeiculo.class, value = 1)
    @Max(groups = ICreateVeiculo.class, value = 2025)
    private Long ano;

    @Column(name = "capacidade_carga_kg", length = 10, nullable = false)
    @NotNull(groups = { ICreateVeiculo.class, IUpdateVeiculo.class })
    @Min(groups = { ICreateVeiculo.class, IUpdateVeiculo.class }, value = 1)
    @Max(groups = { ICreateVeiculo.class, IUpdateVeiculo.class }, value = 50000)
    private Long capacidade_carga_kg;

    @Column(name = "tipo_veiculo", length = 20, nullable = false)
    @NotNull(groups = ICreateVeiculo.class)
    @NotEmpty(groups = ICreateVeiculo.class)
    @Size(groups = ICreateVeiculo.class, min = 3, max = 20)
    private String tipo_veiculo;

    @OneToMany(mappedBy = "veiculo")
    @JsonProperty(access = Access.WRITE_ONLY)
    private List<Manutencao> manutencoes = new ArrayList<Manutencao>();

    @ManyToOne
    @JoinColumn(name = "servicoAtual", nullable = true)
    @JsonIgnoreProperties({"veiculos", "funcionarios"})
    private Servico servicoAtual;

    @ManyToMany(mappedBy = "veiculos")
    @JsonIgnore
    private Set<Servico> servicos = new HashSet<>();

    public Veiculo() {
    }


    public Veiculo(String modelo, String placa, Long ano, Long capacidade_carga_kg, String tipo_veiculo, List<Manutencao> manutencoes) {
        this.modelo = modelo;
        this.placa = placa;
        this.ano = ano;
        this.capacidade_carga_kg = capacidade_carga_kg;
        this.tipo_veiculo = tipo_veiculo;
        this.manutencoes = manutencoes;
    }


    public Servico getServicoAtual() {
        return this.servicoAtual;
    }

    public void setServicoAtual(Servico servicoAtual) {
        this.servicoAtual = servicoAtual;
    }


    public Set<Servico> getServicos() {
        return this.servicos;
    }

    public void setServicos(Set<Servico> servicos) {
        this.servicos = servicos;
    }


    public String getModelo() {
        return this.modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getPlaca() {
        return this.placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Long getAno() {
        return this.ano;
    }

    public void setAno(Long ano) {
        this.ano = ano;
    }

    public Long getCapacidade_carga_kg() {
        return this.capacidade_carga_kg;
    }

    public void setCapacidade_carga_kg(Long capacidade_carga_kg) {
        this.capacidade_carga_kg = capacidade_carga_kg;
    }

    public String getTipo_veiculo() {
        return this.tipo_veiculo;
    }

    public void setTipo_veiculo(String tipo_veiculo) {
        this.tipo_veiculo = tipo_veiculo;
    }

    public List<Manutencao> getManutencoes() {
        return this.manutencoes;
    }

    public void setManutencoes(List<Manutencao> manutencoes) {
        this.manutencoes = manutencoes;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.placa == null) ? 0 : this.placa.hashCode());
        return result;
    }
}
