package com.example.demo.models;

import javax.persistence.*;

@Entity
public class Room {

    private @Id Integer num;
    private String name;
    private Status status;

	private Long assignedEmployeeId;
    private Long incidentId;

	enum Status {
		DIRTY("Dirty"),
		CLEAN("Clean");

		private String string;

		Status(String string) {
			this.string = string;
		}

		@Override
		public String toString() {
			return string;
		}
	}

    public Room(int num, String name,
                Long assignedEmployeeId, String status, Long incidentId) {
        this.num = num;
        this.name = name;
        this.assignedEmployeeId = assignedEmployeeId;
        if (status.equalsIgnoreCase("clean"))
            this.status = Status.CLEAN;
        else
            this.status = Status.DIRTY;
        this.incidentId = incidentId;
    }

    public Room(int num){
		this.num = num;
		this.status = Status.CLEAN;
    }

    public boolean isReservable() {
        return false;
    }

    public Long getAssignedEmployeeId() {
        return assignedEmployeeId;
    }

    public void setAssignedEmployeeId(Long assignedEmployeeId) {
        this.assignedEmployeeId = assignedEmployeeId;
    }

    public String getStatus() {
        return status.toString();
    }

    public void setStatus(String statusCode){

        if(statusCode.equalsIgnoreCase("Dirty"))
            status = Status.DIRTY;
        else
            status = Status.CLEAN;
    }

    public Long getIncidentId() {
        return incidentId;
    }

    public void setIncidentId(Long incidentId) {
        this.incidentId = incidentId;
    }

    public int getNum() {
        return num;
    }

    public String getName() {
        return name;
    }
}
