package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.jpa.Nacionalnost;
@Repository
public interface NacionalnostRepository extends JpaRepository<Nacionalnost, Integer>{
	Collection<Nacionalnost> findByNazivContainingIgnoreCase(String naziv);
}

