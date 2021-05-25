import React, { Component } from 'react';
import userService from '../services/user.service';
import { MDBCard, MDBCardTitle, MDBCardBody, MDBBtn, MDBRow, MDBCol,MDBContainer, MDBIcon } from 'mdbreact';

export default class ViewEmployeeById extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }
    componentDidMount() {
        userService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        })
    }
    render() {
        console.log("empdata ",this.state.employee)

        return (
            <div>
                <div className="card col-md-7 offset-md-3">
                    <h3 className="text-center"> Employee Details</h3>
                    <MDBContainer style={{backgroundColor:'#33CAFF'}}>
                        <MDBRow>
                        <MDBCol md="6">Employee ID </MDBCol>
                        <MDBCol md="6">{this.state.employee.empId}</MDBCol>
            
                       </MDBRow>
                      <MDBRow>
                        <MDBCol md="6"> Name</MDBCol>
                        <MDBCol md="6">  {this.state.employee.firstName} {this.state.employee.lastName}</MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md="6"> Date of Joining</MDBCol>
                        <MDBCol md="6"> {this.state.employee.joinDate}</MDBCol>
                      </MDBRow>
                     
                      <MDBRow>
                        
                        <MDBCol md="6">  Email ID </MDBCol>
                        <MDBCol md="6"> {this.state.employee.email}</MDBCol>
                      </MDBRow>
                    
                    <MDBRow>
                        <MDBCol md="6">  Mobile Number</MDBCol>
                        <MDBCol md="6">{this.state.employee.mobileNo}</MDBCol>
                    </MDBRow>
                    
                    <MDBRow>
                        <MDBCol md="6">  Designation </MDBCol>
                        <MDBCol md="6"> {this.state.employee.designation}</MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="6">  Remaining Sick Leave </MDBCol>
                        <MDBCol md="6"> {this.state.employee.sickLeave}</MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="6">  Remaining Casual Leave </MDBCol>
                        <MDBCol md="6"> {this.state.employee.casualLeave}</MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="6">  Remaining Earned Leave </MDBCol>
                        <MDBCol md="6"> {this.state.employee.earnedLeave}</MDBCol>
                    </MDBRow>

                  </MDBContainer>
                </div>
            </div>
        )
    }
}