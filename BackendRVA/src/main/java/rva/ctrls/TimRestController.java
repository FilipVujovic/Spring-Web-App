package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Liga;
import rva.jpa.Tim;
import rva.repository.TimRepository;

@RestController
public class TimRestController {
	
	@Autowired
	private TimRepository timRepository;
	
	@Autowired
	private JdbcTemplate jbdcTemplate;
	
	@GetMapping("tim")
	public Collection<Tim> getTim() {
		return timRepository.findAll();
	}
	
	@GetMapping("tim/{id}")
	public Tim getTim(@PathVariable("id") Integer id) {
		return timRepository.getOne(id);
	}
	
	@GetMapping("timNaziv/{naziv}")
	public Collection<Tim> getTimByNaziv(@PathVariable("naziv") String naziv) {
		return timRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("tim")
	@CrossOrigin
	public ResponseEntity<Tim> insertTim(@RequestBody Tim tim){
		if(!timRepository.existsById(tim.getId())) {
			timRepository.save(tim);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("tim")
	@CrossOrigin
	public ResponseEntity<Tim> updateTim(@RequestBody Tim tim) {
		if(!timRepository.existsById(tim.getId()))
			return new ResponseEntity<Tim>(HttpStatus.NO_CONTENT);
		timRepository.save(tim);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@Transactional
	@DeleteMapping("tim/{id}")
	@CrossOrigin
	public ResponseEntity<Liga> deleteTim(@PathVariable ("id") Integer id) {
		if(!timRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		jbdcTemplate.execute("delete from igrac where tim = " + id);
		if(id != -100)
			timRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
