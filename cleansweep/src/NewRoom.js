import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';

class NewRoom extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Form>
                <FormGroup row>
                    <Label for="roomNum">
                        *Autopopulate Room Number*
                    </Label>
                    <Col sm={10}>
                        <Input type="text" name="textarea" id="roomNum"/>
                    </Col>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="checkbox" checked={true} id="isReservable"/>{' '}
                        Reservable
                    </Label>
                </FormGroup>
            </Form>
        );
    }

}
export default NewRoom;