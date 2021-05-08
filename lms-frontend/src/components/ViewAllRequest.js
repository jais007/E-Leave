import React, { Component } from 'react';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import { Redirect } from "react-router-dom";


class ViewAllRequest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            requests: [],
            redirect: null,
        }
        this.approveRequestHandler = this.approveRequestHandler.bind(this);
        this.declineRequestHandler = this.declineRequestHandler.bind(this);
        
    }
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
        }else{
            userService.getAllRequest().then((res) => {
                this.setState({requests: res.data});
            });
        }   
    }
    approveRequestHandler(requestId){
           console.log(requestId)
           let currRequest=this.state.requests.filter(res => res.id ==requestId)
           currRequest[0].status="Approved";
           console.log(currRequest);
           userService.changeRequestStatus(currRequest[0],requestId).then( res => {
                this.setState({requests:res.data});
            });
    }
    declineRequestHandler(requestId){
        console.log(requestId)
        let currRequest=this.state.requests.filter(res => res.id ==requestId)
        currRequest[0].status="Declined";
        console.log(currRequest);
        userService.changeRequestStatus(currRequest[0],requestId).then( res => {
             this.setState({requests:res.data});
         });
     }
  
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
                                <th>Request ID</th>
                                <th>Employee ID</th>
                                <th>Request Date</th>
                                <th>Leave Type</th>
                                <th>From </th>
                                <th>To </th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.requests.map(req =>
                                        <tr key={req.id}>
                                            <td>{req.id}</td>
                                            <td>{req.empId}</td>
                                            <td>{req.requestDate}</td>
                                            <td>{req.leaveType}</td>
                                            <td>{req.startDate}</td>
                                            <td>{req.endDate}</td>
                                             {req.status == "Approved" ? 
                                                 <td style={{color:'#40D428'}}> Approved</td> :
                                                 (req.status == "Declined" ?
                                                 <td style={{color:'#FF0000'}}> Declined</td> :
                                                 <td style={{color:'#FFA500'}}> Pending</td>)
                                             }
                                            <td>
                                              <button disabled={req.status=="Approved"} style={{marginLeft: "5px",marginTop: "5px"}} 
                                                  onClick={ () => this.approveRequestHandler(req.id)} className="btn btn-info"> Approve </button>
                                              <button disabled={req.status=="Declined"} style={{marginLeft: "5px",marginTop: "5px"}}
                                                  onClick={ () => this.declineRequestHandler(req.id)} className="btn btn-danger"> Decline </button>
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

export default ViewAllRequest;