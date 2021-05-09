package com.nitc.lms.controllers;


import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.nitc.lms.payload.response.MessageResponse;
import com.nitc.lms.repository.RequestRepository;
import com.nitc.lms.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class RequestController {

	@Autowired
	private RequestRepository requestRepository;
		
	@Autowired
	private UserRepository userRepository;
	
	
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
//	@PostMapping("/user/add-leave")
//	public Request addRequest(@RequestBody Request request) {
//		System.out.println(request.toString());
//		Request res=this.requestRepository.save(request);
//		return res;
//	}
	
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
   
	@PostMapping("/user/add-leave")
	public ResponseEntity<?> addRequest(@Valid @RequestBody Request request) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate LocalStartDate = LocalDate.parse(request.getStartDate(), formatter);
        LocalDate LocalEndDate   = LocalDate.parse(request.getEndDate(), formatter);
        Period difference = Period.between(LocalStartDate, LocalEndDate);   
        int vacationDays=difference.getDays() + 1; 
        if(request.getLeaveType().equals("")) {
        	return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Please select type of leave"));
        }
        if(vacationDays <= 0 ) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Invalid Period"));
			
		}
        User user= this.userRepository.findById(request.getEmpId());
        System.out.println("LeaveType "+request.getLeaveType());
        System.out.println(vacationDays > user.getSickLeave());
		if(request.getLeaveType().equals("Sick Leave") && vacationDays > user.getSickLeave()) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Don't have enough sick leave"));
		}else if(request.getLeaveType().equals("Casual Leave") && vacationDays > user.getCasualLeave() ) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Don't have enough casual leave"));
			
		}else if(request.getLeaveType().equals("Earned Leave") && vacationDays > user.getEarnedLeave() ) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Don't have enough earned leave"));
		}else {
			Request res=this.requestRepository.save(request);
			if(request.getLeaveType().equals("Casual Leave")) {
				user.setCasualLeave(user.getCasualLeave()-vacationDays);
			}
			if(request.getLeaveType().equals("Sick Leave")) {
				user.setSickLeave(user.getSickLeave()-vacationDays);
			}
			if(request.getLeaveType().equals("Earned Leave")) {
				user.setEarnedLeave(user.getEarnedLeave()-vacationDays);
			}
			this.requestRepository.save(request);
			this.userRepository.save(user);
	        return ResponseEntity.ok(new MessageResponse("Leave applied successfully!"));
		}
	}
}
