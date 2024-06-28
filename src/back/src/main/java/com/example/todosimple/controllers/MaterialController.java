package com.example.todosimple.controllers;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.todosimple.models.Material;
import com.example.todosimple.services.MaterialService;
import com.example.todosimple.services.FornecedorService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/material")
@Validated
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping("{id}")
    public ResponseEntity<Material> findById(@PathVariable Long id){
        Material obj = this.materialService.findById(id);
        return ResponseEntity.ok(obj);
    }

    @GetMapping("/fornecedor/{fornecedorId}")
    public ResponseEntity<List<Material>> findAllByFornecedorId(@PathVariable Long fornecedorId){
        this.fornecedorService.findById(fornecedorId);
        List<Material> objs = this.materialService.findAllByFornecedorId(fornecedorId);
        return ResponseEntity.ok().body(objs);
    }

    @PostMapping
    @Validated
    public ResponseEntity<Void> create(@Valid @RequestBody Material obj){
        this.materialService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/id").buildAndExpand(obj.getId()).toUri();
            return ResponseEntity.created(uri).build();
    }
    
    @PutMapping("/{id}")
    @Validated
    public ResponseEntity<Void> update(@Valid @RequestBody Material obj, @PathVariable Long id){
        obj.setId(id);
        this.materialService.update(obj);
        return ResponseEntity.noContent().build();
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        this.materialService.delete(id);
        return ResponseEntity.noContent().build();
    }

    

}
