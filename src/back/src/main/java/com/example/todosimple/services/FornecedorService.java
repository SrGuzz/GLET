package com.example.todosimple.services;

import java.util.List;
import java.util.Optional;


import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todosimple.models.Fornecedor;

import com.example.todosimple.repositories.FornecedorRepository;

@Service
public class FornecedorService {
    
    @Autowired
    private FornecedorRepository fornecedorRepository;


    public Fornecedor findById(Long id){
        Optional<Fornecedor> Fornecedor = this.fornecedorRepository.findById(id);
        return Fornecedor.orElseThrow(() -> new RuntimeException ("Usuário não encontrado! Id: " + id + ", Tipo: " + Fornecedor.class.getName()));
    }

    public List<Fornecedor> findAll() {
        return fornecedorRepository.findAll();
    }
    
    
    @Transactional
    public Fornecedor create (Fornecedor obj){
        obj.setId(null);
        try{
            obj = this.fornecedorRepository.save(obj);
        } catch (Exception e) {
            throw new RuntimeException( "Não é possível criar usuários iguais!");
        }
        return obj;
    }

    @Transactional
    public Fornecedor update(Fornecedor obj){
        Fornecedor newObj = findById(obj.getId());
        newObj.setNome(obj.getNome());
        newObj.setContato(obj.getContato());
        newObj.setCategoria(obj.getCategoria());
        newObj.setCnpj(obj.getCnpj());
        return this.fornecedorRepository.save(newObj);
    }

    
    public void delete(Long id){
        findById(id);
        try{
            this.fornecedorRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException( "Não é possível excluir pois há entidades relacionadas!");
        }
    }

}
