package com.nitc.lms.repository;



import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nitc.lms.models.Request;
import com.nitc.lms.models.User;

//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Repository
public interface RequestRepository extends JpaRepository<Request,Integer> {
	
	@Query(value="select * from Requests a where a.emp_id =:id and status ='Pending' ", nativeQuery=true)
	public Request checkPendingRequest(int id);
	
	@Query(value="select role_id from Requests a where a.emp_id = :Id ", nativeQuery=true)
	public int findUserId(int Id);
	
	
	public List<Request> findAll();
	public List<Request> findByOrderByIdDesc();
	
	@Query(value="select * from Requests a where a.designation <> 'HOD' Order By request_date desc ", nativeQuery=true)
	public List<Request> findByDesignationNotByOrderByIdDesc(String designation);
	
	@Query(value="select * from Requests a where a.emp_id =:id AND a.designation <> 'HOD' Order By request_date desc ", nativeQuery=true)
	public List<Request> findByIdByDesignationNotOrderByDateDesc(int id);
	
	public Request findById(int requestId);
	
	//@Query(value="select * from Requests a where a.emp_id = :empId ", nativeQuery=true)
	public List<Request> findByEmpIdOrderByIdDesc(int id);
	
	@Modifying
	@Query(value = "UPDATE Requests u set status = 'Approved' where u.id = :requestId",nativeQuery = true)
	public void approveLeaveRequest(int requestId);
	
	
   //public Page<Request> findAllByOrderByIdDesc(Pageable pageable);
}

