package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import rva.jpa.Igrac;
import rva.jpa.Tim;

@Repository
public interface IgracRepository extends JpaRepository<Igrac, Integer> {
	
	Collection<Igrac> findByTim(Tim t);
	
	@Query(value = " select coalesce(max(redni_broj)+1 , 1) from tim where tim = ?1", nativeQuery = true)
	Integer nextBrReg (int idTim);
}
