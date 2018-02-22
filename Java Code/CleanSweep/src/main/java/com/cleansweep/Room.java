package com.cleansweep;

import javax.persistence.*; // - JR
import java.util.ArrayList;

@Entity
public class Room {

    private @Id int number; // Room.number - JR
    private String name; // Such as "Lobby" - JR
    private Long assignedEmployeeId; // - JR
    private ArrayList<Incident> incidents;
    private Status status;
    enum Status { DIRTY, CLEAN } // ftw - JR

    Room(int roomNumber){
        this.roomNumber = roomNumber;
        incidents = new ArrayList<Incident>();
        status = Status.DIRTY;
    }

    public boolean isReservable(){
        return false;
    }

    // NEED TO UPDATE addIncident FOR INPUT VALIDATION
    public void addIncident(Incident i){
        incidents.add(i);
    }
    public Incident getIncident(int i){
        return incidents.get(i);
    }
    public ArrayList<Incident> getIncidents() {
        return incidents;
    }

    public int getRoomNumber() {
        return roomNumber;
    }
    // TODO: Validate that param RN is valid and not taken by any other Room
    public void setRoomNumber(int RN) { roomNumber = RN;}

    // INT VALUE BETWEEN 0 & 1
    public void setStatus(int statusCode){

        if(statusCode != 0)
            status = Status.DIRTY;
        else 
            status = Status.CLEAN;
    } // This could also be changed to boolean - JR
    
    public String getStatus(){
        return status.toString(); // - JR
    }

    //TODO: When employee selects "Clean" on their assignment list.
    public void updateEmployeeStatus(Employee employee, String status) {

    }

    @Override
    public String toString(){
        return "Room #" + roomNumber +
                "\nStatus: " + status;
    }
}
