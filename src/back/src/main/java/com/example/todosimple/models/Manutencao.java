package com.example.todosimple.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = Manutencao.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Manutencao {
    private static final String TABLE_NAME = "manutecao";

    @ManyToOne
    @JoinColumn(name = "placa_veiculo", nullable = false, updatable = false)
    private Veiculo veiculo;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "oficina", nullable = false, length = 30)
    @NotNull
    @NotEmpty
    @Size(min = 5, max = 30)
    private String oficina;

    @Column(name = "tipo_manutencao", nullable = false, length = 20)
    @NotNull
    @NotEmpty
    @Size(min = 5, max = 20)
    private String tipo_manutencao;

    @Column(name = "descricao", length = 255, nullable = false)
    @NotNull
    @NotEmpty
    @Size(min = 1, max = 255)
    private String descricao;

    @Column(name = "data_manutencao", length = 10, nullable = false)
    @NotNull
    @NotEmpty
    @Size(min = 10, max = 10)
    private String data_manutencao;
}
