package com.example.todosimple.controllers;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.todosimple.models.Fornecedor;
import com.example.todosimple.models.Fornecedor.CreateFornecedor;
import com.example.todosimple.models.Fornecedor.UpdateFornecedor;
import com.example.todosimple.services.FornecedorService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/fornecedor")
@Validated
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> findById(@PathVariable Long id){
        Fornecedor obj = this.fornecedorService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping
    public ResponseEntity<List<Fornecedor>> findAll() {
        List<Fornecedor> fornecedores = fornecedorService.findAll();
        return ResponseEntity.ok().body(fornecedores);
    }
    

    @PostMapping
    @Validated(CreateFornecedor.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Fornecedor obj){
        this.fornecedorService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    @Validated(UpdateFornecedor.class)
    public ResponseEntity<Void> update(@Valid @RequestBody Fornecedor obj, @PathVariable Long id){
        obj.setId(id);
        obj = this.fornecedorService.update(obj);
        return ResponseEntity.noContent().build();

    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.fornecedorService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    
}
