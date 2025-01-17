package com.example.todosimple.services;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todosimple.models.Veiculo;
import com.example.todosimple.repositories.VeiculoRepository;

import jakarta.transaction.Transactional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Veiculo findByPlaca(String placa) {
        Optional<Veiculo> veiculo = this.veiculoRepository.findById(placa);
        return veiculo.orElseThrow(() -> new RuntimeException(
                "Veiculo não foi encontrado! Placa: " + placa + ", tipo: " + Veiculo.class.getName()));
    }
    //acho que não usaremos...
    
    public List<Veiculo> findAllV(){
        return veiculoRepository.findAll();
    }

    @Transactional
    public Veiculo create(Veiculo obj) {
        obj = this.veiculoRepository.save(obj);
        return obj;
    }

    @Transactional
    public Veiculo update(Veiculo obj) {
        Veiculo novoObj = findByPlaca(obj.getPlaca());
        novoObj.setCapacidade_carga_kg(obj.getCapacidade_carga_kg());
        novoObj.setServicoAtual(obj.getServicoAtual());
        return this.veiculoRepository.save(novoObj);
    }

    public void delete(String placa) {
        findByPlaca(placa);
        try {
            this.veiculoRepository.deleteById(placa);
        } catch (Exception e) {
            throw new RuntimeException(
                    "Veiculo não pode ser deletado, pois tem manutençoes dependentes relacionadas!");
        }
    }
}
