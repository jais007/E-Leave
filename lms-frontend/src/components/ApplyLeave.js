import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import DatePicker from 'react-datepicker';
import Select from 'react-select'
import { Redirect } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css'
import userService from "../services/user.service";
import authService from "../services/auth.service";


const leaveOptions=[
  {value :"Sick Leave", label:"Sick Leave"},
  {value :"Casual Leave", label:"Casual Leave"},
  {value :"Earned Leave", label:"Earned Leave"}
];

export default class ApplyLeave extends Component {

  constructor(props) {
    super(props);
    this.state = {
      empId: "",
      designation:"",
      leaveType:"",
      startDate: new Date(),
	    endDate:  new Date(),
      successful: false,
      message: "",
      redirect: null,
    //  userReady: false,
     currentUser: {}
    }
    this.handleNewRequest = this.handleNewRequest.bind(this);
   // this.onChangeEmpId = this.onChangeEmpId.bind(this);
  }
  
  componentDidMount() {
    const currentUser = authService.getCurrentUser();
    console.log("Designation",currentUser.designation);
    let isAdmin =false
    if(currentUser){
        isAdmin =  currentUser.roles.includes("ROLE_ADMIN")
    }
    console.log("isAdmin",isAdmin)
    if (!currentUser) 
          this.setState({ 
              redirect: "/login",
            }); 
    else if(isAdmin){
        this.setState({ 
            redirect: "/profile",
          }); 
    }else{
        this.setState({ 
          empId: currentUser.id,
          designation:currentUser.designation,
           })
    }  
    
 }
  handleLeaveTypeChange=(op)=>{
    this.setState({
        leaveType: op
    })
  }

  handleStartDateChange=(date)=>{
    this.setState({
        startDate:date
    })
  }
  handleEndDateChange=(date)=>{
    this.setState({
        endDate:date
    })
  }

  handleNewRequest(e) {
    e.preventDefault();
    let appliedDate= new Date()
    let requestday =appliedDate.getDate() <=9 ? ('0'+appliedDate.getDate()):appliedDate.getDate();
    let requestmonth =(appliedDate.getMonth()+1)  <=9 ? ( '0'+(appliedDate.getMonth()+1)):(appliedDate.getMonth()+1);
    let today =requestday+ '-' + requestmonth + '-' + appliedDate.getFullYear();

    let startDay =this.state.startDate.getDate() <=9 ? ('0'+this.state.startDate.getDate()):this.state.startDate.getDate();
    let startMonth =(this.state.startDate.getMonth()+1)  <=9 ? ( '0'+(this.state.startDate.getMonth()+1)):(this.state.startDate.getMonth()+1);
    let start =startDay+ '-' + startMonth + '-' + this.state.startDate.getFullYear();

    let endDay =this.state.endDate.getDate() <=9 ? ('0'+this.state.endDate.getDate()):this.state.endDate.getDate();
    let endMonth =(this.state.endDate.getMonth()+1)  <=9 ? ( '0'+(this.state.endDate.getMonth()+1)):(this.state.endDate.getMonth()+1);
    let end =endDay+ '-' + endMonth + '-' + this.state.endDate.getFullYear();

    // let start=this.state.startDate.getDate() + '-' + (this.state.startDate.getMonth() + 1) + '-' + this.state.startDate.getFullYear();
    // let end=this.state.endDate.getDate() + '-' + (this.state.endDate.getMonth() + 1) + '-' + this.state.endDate.getFullYear();
    console.log("leaveType",this.state.leaveType.value)
    console.log("Date",today)
    let leaveRequest = {
        empId : this.state.empId,
        designation:this.state.designation,
        leaveType:(this.state.leaveType =="") ? "" : this.state.leaveType.value,
        requestDate:today,
        startDate:start,
        endDate:end,
    }
    console.log("new request",leaveRequest)
    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService.applyLeave(leaveRequest).then( response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
               error.message || error.toString();
            this.setState({
                successful: false,
                message: resMessage
            });
        }
      );
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const {currentUser} =this.state
    return (
      <div className="col-md-12">
        <div className="container col-md-6">
        
          <Form onSubmit={this.handleNewRequest} ref={c => { this.form = c; }}>
            {!this.state.successful && (
              <div>
                    
                <div className="form-group">
                     <label>Type of Leave </label>
                        <Select  name="leaveType"  
                                  value={this.state.leaveType}
                                  onChange={this.handleLeaveTypeChange}
                                  options={leaveOptions} 
                        />
                </div>

                
                <div className="form-group">
                  <label htmlFor="startDate"> Start Date</label>
                            <DatePicker
                                name="startDate"
                                selected={ this.state.startDate}
                                dateFormat='dd-MM-yyyy'
                                minDate={new Date()}
                                onChange={this.handleStartDateChange} 
                              />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate"> End Date</label>
                            <DatePicker
                                name="endDate"
                                selected={ this.state.endDate}
                                dateFormat='dd-MM-yyyy'
                                minDate={new Date()}
                                onChange={this.handleEndDateChange} 
                              />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Submit </button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
