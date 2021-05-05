package com.nitc.lms.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nitc.lms.models.Request;
import com.nitc.lms.repository.RequestRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/test")
public class RequestController {

	@Autowired
	private RequestRepository requestRepository;
	
////	get all applications handler
//	@GetMapping("/user/requests")
//	public List<Request> getMyRequest(@PathVariable("id") int id){
//		return this.requestRepository.findById(id);
//	}
	
	
	@GetMapping("/admin/requests")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Request> getAllRequest(){
		return this.requestRepository.findAll();
	}
	
	//get Application by Id handler
	@GetMapping("/user/requests/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public Request getRequest(@PathVariable("id") int empId) {
		return this.requestRepository.findById(empId);
	}
	
	//adding new Application handler
	@PostMapping("/user/new-request")
	@PreAuthorize("hasRole('USER')")
	public Request addRequest(@RequestBody Request request) {
		Request res=this.requestRepository.save(request);
		 return res;
	}

}
