package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.jpa.Tim;
@Repository
public interface TimRepository extends JpaRepository<Tim, Integer>{
	Collection<Tim> findByNazivContainingIgnoreCase(String naziv);
}
