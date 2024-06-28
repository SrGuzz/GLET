package com.example.todosimple.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todosimple.models.Manutencao;
import com.example.todosimple.models.Veiculo;
import com.example.todosimple.repositories.ManutencaoRepository;

import jakarta.transaction.Transactional;

@Service
public class ManutencaoService {

    @Autowired
    private ManutencaoRepository manutencaoRepository;

    @Autowired
    private VeiculoService veiculoService;

    public Manutencao findById(Long id) {
        Optional<Manutencao> manutencao = this.manutencaoRepository.findById(id);
        return manutencao.orElseThrow(() -> new RuntimeException(
                "Manutencao não foi encontrada! Id: " + id + ", tipo: " + Manutencao.class.getName()));
    }

    public List<Manutencao> findAllByVeiculoPlaca(String veiculoPlaca) {
        List<Manutencao> manutencoes = this.manutencaoRepository.findByVeiculo_Placa(veiculoPlaca);
        return manutencoes;
    }

    @Transactional
    public Manutencao create(Manutencao obj) {
        Veiculo veiculo = this.veiculoService.findByPlaca(obj.getVeiculo().getPlaca());
        obj.setVeiculo(veiculo);
        obj = this.manutencaoRepository.save(obj);
        return obj;
    }

    @Transactional
    public Manutencao update(Manutencao obj) {
        Manutencao novoObj = findById(obj.getId());
        novoObj.setData_manutencao(obj.getData_manutencao());
        novoObj.setDescricao(obj.getDescricao());
        novoObj.setOficina(obj.getOficina());
        novoObj.setTipo_manutencao(obj.getTipo_manutencao());
        return this.manutencaoRepository.save(obj);
    }

    public void delete(Long id) {
        findById(id);
        try {
            this.manutencaoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(
                "Manutecao não pode ser deletada.");
            }
    }
}
