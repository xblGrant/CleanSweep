import java.util.ArrayList;

public class Room {

    private int roomNumber;
    private ArrayList<Incident> incidents;
    private String status;
    private static String[] statusOptions = {"Dirty", "Clean"};

    Room(int roomNumber){
        this.roomNumber = roomNumber;
        incidents = new ArrayList<>();
        status = statusOptions[0];
    }

    public boolean isReservable(){
        return false;
    }

    // NEED TO UPDATE addIncident FOR INPUT VALIDATION
    public void addIncident(Incident i){
        incidents.add(i);
    }
    public int getRoomNumber() {
        return roomNumber;
    }
    public ArrayList<Incident> getIncidents() {
        return incidents;
    }
    public Incident getIncident(int i){
        return incidents.get(i);
    }
    // INT VALUE BETWEEN 0 & 1
    public void setStatus(int statusCode){
        status = statusOptions[statusCode];
    }
    public String getStatus(){
        return status;
    }

    //TODO: Didn't implement because I was confused as to what this even means
    public void updateEmployeeStatus(Employee employee, String status) {

    }

    @Override
    public String toString(){
        return "Room #" + roomNumber +
                "\nStatus: " + status;
    }
}