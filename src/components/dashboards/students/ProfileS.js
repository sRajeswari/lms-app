import React from 'react';
import profile from './profile.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { getUser } from './../../Common.js';
import './ProfileS.css';
class ProfileS extends React.Component
{
   

    render() {
        //const fname = profile.firstName;
        //const lname = profile.lastName;
        //const email = profile.email;
        //const name = fname + ' ' + lname;
        //const phonenum = profile.phoneNumbers[0].number;
        const profile = getUser();
        //const fname = profile.firstName;
        //const lname = profile.lastName;
        const email = profile.email;
        const name = profile.name;
        const phonenum = profile.phonenum.substring( 0, 3) + "- " + profile.phonenum.substring( 3, 6) + "- " + profile.phonenum.substring( 6);


        return (
            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Student Profile</h4></div>
                        <div className="panel-body">
                            <Form>
                                
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} controlId="name">
                                            <Form.Label column="lg">Student Name</Form.Label>
                                            <Col>
                                                <Form.Control className="profile-data"  font-size="xx-large" type="text" value={name}  />
                                            </Col>
                                             </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} controlId="totcredits">
                                                <Form.Label column="lg">
                                                    Total Credit(s)
                                                </Form.Label>
                                                <Col>
                                                <Form.Control className="profile-data" type="text"  placeholder="" value={this.props.tot_credits} />
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group as={Row} controlId="email">
                                            <Form.Label column="lg">
                                                Email
                                            </Form.Label>
                                            <Col>
                                                <Form.Control className="profile-data"  value={email}  type="email" placeholder="Email" />
                                            </Col>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group as={Row} controlId="phonenum">
                                            <Form.Label column="lg">
                                                Phone Number
                                                </Form.Label>
                                            <Col>
                                                <Form.Control className="profile-data"  type="text"   size="lg" value={phonenum} />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                   
                                </Row>
                               
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            );
     }
}


export default  ProfileS;
