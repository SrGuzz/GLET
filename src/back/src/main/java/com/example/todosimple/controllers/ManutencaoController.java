package com.example.todosimple.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.todosimple.models.Manutencao;
import com.example.todosimple.services.ManutencaoService;
import com.example.todosimple.services.VeiculoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/manutencao")
@Validated
public class ManutencaoController {
    
    @Autowired
    private ManutencaoService manutencaoService;

    @Autowired
    private VeiculoService veiculoService;

    @GetMapping("/{id}")
    public ResponseEntity<Manutencao> findById(@PathVariable Long id){
        Manutencao obj = this.manutencaoService.findById(id);
        return ResponseEntity.ok(obj);
    }

    @GetMapping("/veiculo/{veiculoPlaca}")
    public ResponseEntity<List<Manutencao>> findAllByVeiculoPlaca(@PathVariable String veiculoPlaca){
        veiculoService.findByPlaca(veiculoPlaca);
        List<Manutencao> objs =  this.manutencaoService.findAllByVeiculoPlaca(veiculoPlaca);
        return ResponseEntity.ok().body(objs);
    }

    @PostMapping
    @Validated
    public ResponseEntity<Manutencao> create (@Valid @RequestBody Manutencao obj){
        this.manutencaoService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }

    @PutMapping("/{id}")
    @Validated
    public ResponseEntity<Manutencao> update(@Valid @RequestBody Manutencao obj, @PathVariable Long id){
        obj.setId(id);
        this.manutencaoService.update(obj);
        return ResponseEntity.ok().body(obj);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        this.manutencaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
