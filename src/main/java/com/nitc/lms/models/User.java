package com.nitc.lms.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int empId;
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String joinDate;
	private String email;
	private long mobileNo;
	private String designation;
	private double sickLeave;
	private double casualLeave;
	private double earnedLeave;
	private boolean accountStatus;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "emp_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User() {
		
	}
	

	public User(String username, String password, String firstName, String lastName, String joinDate, String email,
			long mobileNo, String designation) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.joinDate = joinDate;
		this.email = email;
		this.mobileNo = mobileNo;
		this.designation = designation;
		this.sickLeave = 0;
		this.casualLeave = 0;
		this.earnedLeave = 0;
		this.accountStatus = false;
	}

	
	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(long mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public double getSickLeave() {
		return sickLeave;
	}

	public void setSickLeave(double sickLeave) {
		this.sickLeave = sickLeave;
	}

	public double getCasualLeave() {
		return casualLeave;
	}

	public void setCasualLeave(double casualLeave) {
		this.casualLeave = casualLeave;
	}

	public double getEarnedLeave() {
		return earnedLeave;
	}

	public void setEarnedLeave(double earnedLeave) {
		this.earnedLeave = earnedLeave;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}


	public Boolean getAccountStatus() {
		return accountStatus;
	}


	public void setAccountStatus(boolean accountStatus) {
		this.accountStatus = accountStatus;
	}
	
	


}
