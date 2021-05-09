package com.nitc.lms.controllers;


import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nitc.lms.exception.ResourceNotFoundException;
import com.nitc.lms.models.User;
import com.nitc.lms.repository.UserRepository;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	//private EmployeeServices employeeService;
	
    //	get all employees handler
	@GetMapping("/admin/employees")
	@PreAuthorize("hasRole('ADMIN')")
	public List<User> getAllEmployee(){
		return this.userRepository.findAll();
	}
	
//	get employees by Id handler
//	@GetMapping("/admin/employees/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//	public User getEmployee(@PathVariable("id") int empId) {
//		return this.userRepository.findById(empId);
//	}

	
	//activate user's account
	@Transactional
	@PutMapping("/admin/employees/{empId}")
	public List<User> activateAccount(@PathVariable("empId") int empId) {
			this.userRepository.activation(empId);
		    return this.userRepository.findAll();
		}
	
    
	  // delete employee rest api
	  @DeleteMapping("/admin/employees/{id}")
	  public List<User> deleteEmployee(@PathVariable int id){
	  User user = userRepository.findById(id);
					//.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			Integer roleId=this.userRepository.isAdmin(id);
			if(roleId==1 || roleId=='1')
			  this.userRepository.delete(user);
			
			return this.userRepository.findAll();
		}
}
