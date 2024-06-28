package com.example.todosimple.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.todosimple.models.Material;


@SuppressWarnings("unused")
@Repository
public interface MaterialRepository extends JpaRepository<Material, Long>{
    
    List<Material> findByFornecedor_Id(Long id);
    


}
