package com.nitc.lms.models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Table;


@Entity
@Table(name="requests")
public class Request {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
//	@OneendDateMany(fetch = FetchType.LAZY)
//	@JoinTable(	name = "users", 
//				joinColumns = @JoinColumn(name = "emp_id"), 
//				inverseJoinColumns = @JoinColumn(name = "request_id"))
	private int empId;
	private String requestDate;
	private String startDate;
	private String endDate;
	private String status;
	
	public Request(int empId, String requestDate, String startDate, String endDate, String status) {
		super();
		this.empId = empId;
		this.requestDate = requestDate;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public String getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
	}

	public String getstartDate() {
		return startDate;
	}

	public void setstartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getendDate() {
		return endDate;
	}

	public void setendDate(String endDate) {
		this.endDate = endDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}


 

