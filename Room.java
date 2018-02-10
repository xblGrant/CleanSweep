import java.util.ArrayList;
import java.util.Date;

public class Room {
	private boolean isRoomReady;
	private int number;
	private String guest;
	private Date checkoutTime;
	private Employee assignedEmployee;
	private Date wakeUpCall;
	private String status;
	private ArrayList<Incident> incidents;
	
	public Room() {}
	
	public Room(int number) {
		this.number = number;
	}
	
	public Room(boolean isRoomReady, int number, String guest, Date checkoutTime, Employee assignedEmployee, Date wakeUpCall, String status) {
		this.isRoomReady = isRoomReady;
		this.number = number;
		this.guest = guest;
		this.checkoutTime = checkoutTime;
		this.assignedEmployee = assignedEmployee;
		this.wakeUpCall = wakeUpCall;
		this.status = status;
	}
	
	public void setRoomReady(boolean isRoomReady) {
		this.isRoomReady = isRoomReady;
	}
	
	public void setNumber(int number) {
		this.number = number;
	}
	
	public void setGuest(String guest) {
		this.guest = guest;
	}
	
	public void setCheckoutTime(Date checkoutTime) {
		this.checkoutTime = checkoutTime;
	}
	
	public void setAssignedEmployee(Employee assignedEmployee) {
		this.assignedEmployee = assignedEmployee;
	}
	
	public void setWakeUpCall(Date wakeUpCall) {
		this.wakeUpCall = wakeUpCall;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public void addIncident(Incident i) {
		incidents.add(i);
	}
	
	public boolean getRoomReady() {
		return isRoomReady;
	}
	
	public int getNumber() {
		return number;
	}
	
	public String getGuest() {
		return guest;
	}
	
	public Date getCheckoutTime() {
		return checkoutTime;
	}
	
	public Employee getAssignedEmployee() {
		return assignedEmployee;
	}
	
	public Date getWakeupCall() {
		return wakeUpCall;
	}
	
	public String getStatus() {
		return status;
	}
	
	public ArrayList<Incident> getIncidents(){
		return incidents;
	}
	
	public Incident getIncident(int i) {
		return incidents.get(i);
	}
	
	//TODO: Didn't implement because I was confused as to what this even means
	public void updateEmployeeStatus(Employee employee, String status) {
		
	}
	
	public String toString() {
		return "number: " + number +
				"\nguest: " + guest +
				"\nisRoomReady: " + isRoomReady +
				"\ncheckoutTime: " + checkoutTime +
				"\nassignedEmployee: " + assignedEmployee +
				"\nwakeUpCall: " + wakeUpCall +
				"\nstatus " + status +
				"\nincidents " + incidents.toString();
	}
	
}
