package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.jpa.Liga;
@Repository
public interface LigaRepository extends JpaRepository<Liga, Integer>{
	Collection<Liga> findByNazivContainingIgnoreCase(String naziv);
}
