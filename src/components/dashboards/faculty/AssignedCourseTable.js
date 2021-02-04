import React from 'react';
import assignedCourses from './AssingedCourses.json';
import './AssignedCourseTable.css';
import AssignedCourseRow from './AssignedCourseRow.js';
class AssignedCourseTable extends React.Component {
    constructor(props) {
        super(props);
       
        this.tot_classes = 0;
        
        assignedCourses.forEach((course) => {
            
            this.tot_classes = this.tot_classes + 1;
        });
        this.props.setTotalClasses(this.tot_classes);
    }
    render() {
        const rows = [];
        assignedCourses.forEach((course) => {
            rows.push(<AssignedCourseRow course={course} />);
            
        });
        var recCount = rows.length;
        return (
           
                    <div className="row">
                        <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary">
                                <div className="container-fluid panel-heading"><h4>Assigned Courses</h4></div>
                        <div className="panel-body">
                            {
                                recCount == 0 ?
                                    <h2 className='noCourse'> No Courses </h2> :
                                    <table className="table table-bordered table-hover">
                                        <thead >
                                            <tr className="bg-primary">

                                                <th scope="col">Course Id</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">StartDate</th>
                                                <th scope="col">EndDate</th>
                                                <th scope="col">Credits</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows}
                                        </tbody></table>
                            }
                                </div>
                            </div>
                        </div>
                    </div>
            
            );
    }
}
export default AssignedCourseTable;