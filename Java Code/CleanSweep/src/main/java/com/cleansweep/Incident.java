package com.cleansweep;

import java.util.ArrayList;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Incident {

    // Rooms are assigned incidents, so do we need a room number value?
	private @Id @GeneratedValue int id;
    private int room;
    private boolean resolved;
    private ArrayList<String> comment;
    private ArrayList<Employee> reportingEmployees;

    // TODO: input validation on constructor, updateComment & setResolved
    Incident(int room, String comment, Employee emp){
        resolved = false;
        this.room = room;

        this.comment = new ArrayList<>();
        this.comment.add(comment);

        reportingEmployees = new ArrayList<>();
        reportingEmployees.add(emp);
    }

    public void updateComment(String addedComment, Employee emp){
        comment.add(addedComment);
        // TODO: not use contains as it is O(n)
        if (!reportingEmployees.contains(emp))
            reportingEmployees.add(emp);
    }
    public String getComment() {
        StringBuilder fullComment = new StringBuilder();
        for (String entry: comment){
            String temp = entry + " ";
            fullComment.append(temp);
        }
        return fullComment.toString();
    }
    public String getReportingEmployee() {
        StringBuilder allEmployees = new StringBuilder();
        for (Employee entry: reportingEmployees){
            String temp = entry.toString() + "\n";
            allEmployees.append(temp);
        }
        return allEmployees.toString();
    }
    public void setStatus(boolean status){
        resolved = status;
    }
    public boolean isResolved(){
        return resolved;
    }
    public int getRoom() {
        return room;
    }
    public void setRoom(int room) {
        this.room = room;
    }

    @Override
    public String toString(){
        String status = isResolved() ? "Resolved" : "Unresolved";
        return "Room #" + room +
                "\nStatus: " + status +
                "\nComments: " + this.getComment() +
                "\nReporting Employees: " + this.getReportingEmployee();
    }
}
