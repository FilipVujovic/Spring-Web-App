package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Igrac;
import rva.jpa.Liga;
import rva.jpa.Tim;
import rva.repository.IgracRepository;
import rva.repository.TimRepository;
@Api(tags = {"Igrac CRUD operacije"})
@RestController
public class IgracRestController {

	@Autowired
	IgracRepository igracRepository;
	
	@Autowired
	TimRepository timRepository;
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@ApiOperation(value = "Vraca kolekciju svih igraca")
	@GetMapping("igrac")
	public Collection<Igrac> getTim() {
		return igracRepository.findAll();
	}
	@ApiOperation(value = "Vraca igraca po id-ju")
	@GetMapping("igrac/{id}")
	public Igrac getIgrac(@PathVariable("id") Integer id) {
		return igracRepository.getOne(id);
	}
	
	/*@GetMapping("igracNaziv/{naziv}")
	public Collection<Igrac> getIgracByNaziv(@PathVariable("naziv") String naziv) {
		return igracRepository.findByNazivContainingIgnoreCase(naziv);
	}*/
	
	@ApiOperation(value = "Dodaje igraca u bazu")
	@PostMapping("igrac")
	public ResponseEntity<Igrac> insertIgrac(@RequestBody Igrac igrac){
		if(!igracRepository.existsById(igrac.getId())) 
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		igrac.setId(igracRepository.nextBrReg(igrac.getTim().getId()));
		igracRepository.save(igrac);
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	@ApiOperation(value = "Azurira igraca")
	@PutMapping("igrac")
	public ResponseEntity<Igrac> updateIgrac(@RequestBody Igrac igrac) {
		if(!igracRepository.existsById(igrac.getId()))
			return new ResponseEntity<Igrac>(HttpStatus.NO_CONTENT);
		igracRepository.save(igrac);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@ApiOperation(value = "Brise igraca iz baze")
	@Transactional
	@DeleteMapping("igras/{id}")
	public ResponseEntity<Igrac> deleteIgrac(@PathVariable ("id") Integer id) {
		if(!igracRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			igracRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Vraca igraca po timu")
	@GetMapping(value = "igracZaTimId/{id}")
	public Collection<Igrac> igracPoTimId(@PathVariable("id") int id) {
		Tim t = timRepository.getOne(id);
		return igracRepository.findByTim(t);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
