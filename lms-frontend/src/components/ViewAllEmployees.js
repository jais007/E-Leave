import React, { Component } from 'react';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import { Redirect } from "react-router-dom";


class ViewAllEmployees extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: [],
           // totalpages:[],
           // applicationPerPage:5,
           redirect: null,
        }
        this.changeAccountStatus = this.changeAccountStatus.bind(this);
        
    }
    // viewApplication(id){
    //     this.props.history.push(`/view-application/${id}`);
    // }
    componentDidMount(){
        const currentUser = authService.getCurrentUser();
        let isAdmin =false
        if(currentUser){
            isAdmin =  currentUser.roles.includes("ROLE_ADMIN")
        }
        console.log("isAdmin",isAdmin)
        if (!currentUser) 
              this.setState({ 
                  redirect: "/login",
                }); 
        else if(!isAdmin && currentUser){
            this.setState({ 
                redirect: "/profile",
              }); 
        }   
         userService.getAllEmployee().then((res) => {
            this.setState({employees: res.data});
        });
    }
        // ApplicationService.getApplications()
        // .then((res) => {
        //     this.setState({application: res.data});
        // })

         // let page=this.state.currentPage;
        // ApplicationService.getApplications(page-1)
        // .then(res => {
        //     this.setState({ 
        //         application: res.data,
        //         totalPages:res.data.totalPages,
        //         totalElements:res.data.totalElements,
        //         currentPage:res.number + 1
        //     });
        // })

    changeAccountStatus(empId){
            console.log("empId",empId)
            userService.activateAccount(empId).then( res => {
                this.setState({employees:res.data});
            });
    }
    
    deleteEmployee(id){
        userService.deleteEmployee(id).then( res => {
            this.setState({employees:res.data});
            //this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    // pageChange(e){
    //     ApplicationService.getApplications(e.target.id)
    //     .then((res)=>{
    //         this.setState({
    //             totalpages: new Array(res.data.totalPages).fill(0),
    //             applications:[],
    //             applications: res.data.content 
    //         });
    //     })
    // }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return (
            <div>
                 <div children="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>EMP ID</th>
                                <th>EMP Name</th>
                                <th>Account Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(emp =>
                                        <tr key={emp.empId}>
                                            <td><a href="" onClick={()=> this.viewApplication(emp.empId)}>{emp.empId}</a></td>
                                            <td>{emp.firstName} {emp.lastName}</td>
                                             {emp.accountStatus == true ? 
                                               <td style={{color:'#40D428'}}> Active</td> :
                                               <td style={{color:'#FF0000'}}> Not Active</td> 
                                             }
                                            <td>
                                              <button disabled={emp.accountStatus} style={{marginLeft: "5px",marginTop: "5px"}} onClick={ () => this.changeAccountStatus(emp.empId)} className="btn btn-info"> Approve </button>
                                              <button style={{marginLeft: "5px",marginTop: "5px"}} onClick={ () => this.deleteEmployee(emp.empId)} className="btn btn-danger">Delete </button>
                                             </td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                    {/* {this.state.totalpages.map((ele,index)=>{
                        return <button onClick={this.pageChange.bind(this)} id={index+1}>{index+1}</button>
                    })
                    } */}
                </div>
                <div>
                    <br></br><br></br>
                </div>
            </div>
        );
    }
}

export default ViewAllEmployees;