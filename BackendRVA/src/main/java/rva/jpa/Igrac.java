package rva.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the igrac database table.
 * 
 */
@Entity
@NamedQuery(name="Igrac.findAll", query="SELECT i FROM Igrac i")
public class Igrac implements Serializable {
	private static final long serialVersionUID = 1L;
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@Id
	@SequenceGenerator(name="IGRAC_ID_GENERATOR", sequenceName="IGRAC_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="IGRAC_ID_GENERATOR")
	private Integer id;

	@Column(name="broj_reg")
	private String brojReg;

	@Column(name="datum_rodjenja")
	private String datumRodjenja;

	private String ime;

	private String prezime;

	//bi-directional many-to-one association to Nacionalnost
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="nacionalnost")
	private Nacionalnost nacionalnost;

	//bi-directional many-to-one association to Tim
	@ManyToOne
	@JoinColumn(name="tim")
	private Tim tim;

	public Igrac() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBrojReg() {
		return this.brojReg;
	}

	public void setBrojReg(String brojReg) {
		this.brojReg = brojReg;
	}

	public String getDatumRodjenja() {
		return this.datumRodjenja;
	}

	public void setDatumRodjenja(String datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}

	public String getIme() {
		return this.ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return this.prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public Nacionalnost getNacionalnost() {
		return this.nacionalnost;
	}

	public void setNacionalnost(Nacionalnost nacionalnost) {
		this.nacionalnost = nacionalnost;
	}

	public Tim getTim() {
		return this.tim;
	}

	public void setTim(Tim tim) {
		this.tim = tim;
	}

}