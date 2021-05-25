package com.nitc.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nitc.lms.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	
	Optional<User> findByUsername(String username);
//	select * from users where designation != "administrator";

	public List<User> findByDesignationNot(String designation);
	
	
	//@Query(value = "SELECT c FROM Country c WHERE c.designation !=:'administrator' AND c.designation !=:'HOD' ", nativeQuery = true)
	public List<User> findByDesignationNotIn(List<String> designation);
	
	public User findById(int empId);
	
//	 @Query(value="SELECT u FROM USERS u WHERE u.email =:email",nativeQuery = true)
	 public User findByEmail(String email); 
	 
	 public User findByResetPasswordToken(String token);
	
	public Boolean existsByUsername(String username);
	
	@Query(value = "SELECT account_status FROM USERS u WHERE u.username =:username", nativeQuery = true)
	public Boolean isActive(String username);
	
	public Boolean existsByEmail(String email);
	
	public User findByDesignation(String designation);
	@Query(value = "SELECT role_id FROM USER_ROLES u WHERE u.emp_id =:id", nativeQuery = true)
	Integer isAdmin(int id);
	
	public List<User> findAll();
	
	@Modifying
	@Query(value = "UPDATE Users u set account_status = true where u.emp_id = :empId",nativeQuery = true)
	public void activation(int empId);
	
 // public Page<User> findAllByOrderByIdDesc(Pageable pageable);
    
}
