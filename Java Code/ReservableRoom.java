import java.util.Date;

public class ReservableRoom extends Room{

    private String guest;
    private boolean roomReady;
    private Employee assignedEmployee;
    private Date checkoutTime, wakeUpCall;
    private String status;
    private static String[] statusOptions = {"Vacant-Dirty", "Vacant-Clean", "Ready",
            "Occupied-Dirty", "Occupied-Clean", "Do-Not-Disturb"};

    ReservableRoom(int roomNumber){
        super(roomNumber);
        roomReady = false;
        guest = null;
        wakeUpCall = null;
        checkoutTime = null;
        assignedEmployee = null;
        status = statusOptions[0];
    }

    // INT VALUE BETWEEN 0 & 5
    @Override
    public void setStatus(int statusCode){
        status = statusOptions[statusCode];
    }
    @Override
    public String getStatus(){
        return status;
    }
    @Override
    public boolean isReservable(){
        return true;
    }

    // NEED TO UPDATE ALL SETTERS FOR INPUT VALIDATION
    public String getGuest() {
        return guest;
    }
    public void setGuest(String guest) {
        this.guest = guest;
    }
    public boolean isRoomReady() {
        return roomReady;
    }
    public void setRoomReady(boolean roomReady) {
        this.roomReady = roomReady;
    }
    public Employee getAssignedEmployee() {
        return assignedEmployee;
    }
    public void setAssignedEmployee(Employee assignedEmployee) {
        this.assignedEmployee = assignedEmployee;
    }
    public Date getCheckoutTime() {
        return checkoutTime;
    }
    public void setCheckoutTime(Date checkoutTime) {
        this.checkoutTime = checkoutTime;
    }
    public Date getWakeUpCall() {
        return wakeUpCall;
    }
    public void setWakeUpCall(Date wakeUpCall) {
        this.wakeUpCall = wakeUpCall;
    }
}
