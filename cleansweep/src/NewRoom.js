import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';
import NavigationBar from "./NavigationBar";

class NewRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavigationBar/>
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
                            <Input type="checkbox" name="checkbox" id="isReservable"/>{' '}
                            Reservable
                        </Label>
                    </FormGroup>
                </Form>
            </div>
        );
    }

}

export default NewRoom;