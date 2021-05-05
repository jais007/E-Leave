package com.nitc.lms.repository;



import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nitc.lms.models.Request;

//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Repository
public interface RequestRepository extends JpaRepository<Request,Integer> {
	
	public List<Request> findAll();
	
	@Query(value="select u from requests u where u.empId= :empId ", nativeQuery=true)
	public Request findById(int empId);
	
	
	
	
   // public Page<Request> findAllByOrderByIdDesc(Pageable pageable);
    
}

