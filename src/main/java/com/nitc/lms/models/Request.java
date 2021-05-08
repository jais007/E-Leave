package com.nitc.lms.models;

import javax.persistence.Column;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
	private int id;
    
//	@OneendDateMany(fetch = FetchType.LAZY)
//	@JoinTable(	name = "users", 
//				joinColumns = @JoinColumn(name = "emp_id"), 
//				inverseJoinColumns = @JoinColumn(name = "request_id"))
	private int empId;
	private String leaveType;
	private String requestDate;
	private String startDate;
	private String endDate;
	private String status;
	
	
	public Request() {
		this.status = "Pending";
	}
	public Request(int empId, String leaveType, String requestDate, String startDate, String endDate) {
		super();
		this.empId = empId;
		this.leaveType =leaveType;
		this.requestDate = requestDate;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = "Pending";
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

	public String getLeaveType() {
		return leaveType;
	}

	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}

	public String getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
	}
    
	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Request [id=" + id + ", empId=" + empId + ", leaveType=" + leaveType + ", requestDate=" + requestDate
				+ ", startDate=" + startDate + ", endDate=" + endDate + ", status=" + status + "]";
	}

	
	
	
}


 

