package com.example.todosimple.services;


import java.util.List;
import java.util.Optional;



import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todosimple.models.Material;
import com.example.todosimple.repositories.MaterialRepository;

@Service
public class MaterialService {
    
    @Autowired
    private MaterialRepository materialRepository;

    
    public Material findById(Long id){
        Optional<Material> material = this.materialRepository.findById(id);
        Material result = material.orElseThrow(() -> new RuntimeException ("Material não encontrado! Id: " + id));
        return result;
    }
    

     public List<Material> findAllByFornecedorId(Long fornecedorId){
        List<Material> materiais = this.materialRepository.findByFornecedor_Id(fornecedorId);
        return materiais;
    }
    
    @Transactional
    public Material create (Material obj){
        obj.setId(null);
        try{
            obj = this.materialRepository.save(obj);
        } catch (Exception e) {
            throw new RuntimeException( "Não é possível criar materiais iguais!");
        }
        return obj;
    }

    @Transactional
    public Material update(Material obj){
        Material newObj = findById(obj.getId());
        newObj.setNome(obj.getNome());
        newObj.setQuantidade(obj.getQuantidade());
        newObj.setCategoria(obj.getCategoria());
        newObj.setDescricao(obj.getDescricao());
        newObj.setPreco(obj.getPreco());
        return this.materialRepository.save(newObj);
    }

    
    public void delete(Long id){
        findById(id);
        try{
            this.materialRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException( "Não é possível excluir pois há entidades relacionadas!");
        }
    }


}
