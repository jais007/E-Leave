package com.nitc.lms.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nitc.lms.models.Request;
import com.nitc.lms.models.User;
import com.nitc.lms.repository.RequestRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class RequestController {

	@Autowired
	private RequestRepository requestRepository;
		
	
	@GetMapping("/admin/requests")
	public List<Request> getAllRequest(){
		return this.requestRepository.findAll();
	}
	
     //get Application by Id handler
	@GetMapping("/user/requests/{empId}")
	public List<Request> getRequestById(@PathVariable("empId") int empId) {
		return this.requestRepository.findByEmpId(empId);
	}
	
	
	//adding new Application handler
	@PostMapping("/user/add-leave")
	public Request addRequest(@RequestBody Request request) {
		System.out.println(request.toString());
		Request res=this.requestRepository.save(request);
		return res;
	}
	
//	@Transactional
//	@PutMapping("/admin/requests/{requestId}")
//	public List<Request> approveRequestStatus(@PathVariable("requestId") int requestId) {
//			this.requestRepository.approveLeaveRequest(requestId);
//		    return this.requestRepository.findAll();
//		}
   
	@PutMapping("/admin/requests/{requestId}")
	public List<Request> changeRequestStatus(@PathVariable("requestId") int requestId, @RequestBody Request request){
		System.out.println(request.toString());
		this.requestRepository.save(request);
		return this.requestRepository.findAll();
	}

}
