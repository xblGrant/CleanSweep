
public class Incident {
	private int room;
	private int employee;
	private String description;
	private boolean isResolved;
	
	public Incident() {}
	
	public Incident(int room, int employee, String description) {
		isResolved = false;
		this.room = room;
		this.employee = employee;
		this.description = description;
	}
	
	public void setRoom(int room) {
		this.room = room;
	}
	
	public void setEmployee(int employee) {
		this.employee = employee;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public void setIsResolved(boolean isResolved) {
		this.isResolved = isResolved;
	}
	
	public int getRoom() {
		return room;
	}
	
	public int getEmployee() {
		return employee;
	}
	
	public String getDescription() {
		return description;
	}
	
	public boolean getIsResolved() {
		return isResolved;
	}
	
	public String toString() {
		return "room: " + room +
				"\nemployee: " + employee +
				"\nisResolved: " + isResolved + 
				"\ndescription: " + description;
	}
	
}
