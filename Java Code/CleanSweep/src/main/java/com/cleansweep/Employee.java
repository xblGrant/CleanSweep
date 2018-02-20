package com.cleansweep;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Employee {

    private @Id @GeneratedValue int id;
    private String name;
    private String password;

    // TODO: need to hash password before sending to constructor.
        // SECURITY SHOULD ALL BE DONE IN ONE LOCATION, FUNNEL THROUGH ONE LOCATION
    // TODO: make white list restrictions for name & password
    // TODO: input validation on setters and getters
    Employee(String name, String password){
        this.id = generateId();
        this.name = name;
        this.password = password;
    }

    Employee(Employee emp){
        this.id = emp.getId();
        this.name = emp.getName();
        this.password = emp.getPassword();
    }

    // TODO: Generate unique id, limit # of Employees?
    private static int generateId(){

        return 0;
    }
    // TODO: Encryption on password
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword() {
        return password;
    }

    public boolean isManager(){
        return false;
    }
    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name + " " + id;
    }
}
