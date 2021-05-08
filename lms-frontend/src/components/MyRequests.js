import React, { Component } from 'react';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import { Redirect } from "react-router-dom";


class MyRequests extends Component {

    constructor(props) {
        super(props)
        this.state = {
            requests: [],
            redirect: null,
        }
    }
    componentDidMount(){
        const currentUser = authService.getCurrentUser();
        let isAdmin =false
        if(currentUser){
            isAdmin =  currentUser.roles.includes("ROLE_ADMIN")
        }
      console.log("currentuser",currentUser.id)
        if (!currentUser) 
              this.setState({ 
                  redirect: "/login",
                }); 
        else if(isAdmin){
            this.setState({ 
                redirect: "/admin/requests",
              }); 
        }else{
            userService.getRequestById(currentUser.id).then((res) => {
                this.setState({requests: res.data});
            });
        }   
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
                                <th>Request Date</th>
                                <th>Leave Type</th>
                                <th>From </th>
                                <th>To </th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.requests.map(req =>
                                        <tr key={req.id}>
                                            <td>{req.id}</td>
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

export default MyRequests;