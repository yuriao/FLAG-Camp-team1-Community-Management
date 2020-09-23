package communitymanagement.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "authorities")
@Setter
@Getter
public class Authorities implements Serializable {
	private static final long serialVersionUID = 8733140534986494039L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private int user_id;

	private String authorities;
}