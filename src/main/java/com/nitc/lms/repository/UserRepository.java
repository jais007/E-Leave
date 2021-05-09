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
	
	public User findById(int id);
	
	Boolean existsByUsername(String username);
	
	@Query(value = "SELECT account_status FROM USERS u WHERE u.username =:username", nativeQuery = true)
	Boolean isActive(String username);
	
	Boolean existsByEmail(String email);
	
	@Query(value = "SELECT role_id FROM USER_ROLES u WHERE u.emp_id =:id", nativeQuery = true)
	Integer isAdmin(int id);
	
	public List<User> findAll();
	
	@Modifying
	@Query(value = "UPDATE Users u set account_status = true where u.emp_id = :empId",nativeQuery = true)
	public void activation(int empId);
	
 // public Page<User> findAllByOrderByIdDesc(Pageable pageable);
    
}
