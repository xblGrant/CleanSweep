
public class Employee {
	private int userID;
	private String name;
	private boolean isManager;
	private String password;
	
	public Employee() {}
	
	public Employee(int userID, String name, boolean isManager, String password) {
		this.userID = userID;
		this.name = name;
		this.isManager = isManager;
		this.password = password;
	}
	
	public void setUserID(int userID) {
		this.userID = userID;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setIsManager(boolean isManager) {
		this.isManager = isManager;
	}
	
	
	//TODO: Encryption on password instead of plaintext
	public void setPassword(String password) {
		this.password = password;
	}
	
	public int getUserID() {
		return userID;
	}
	
	public String getName() {
		return name;
	}
	
	public boolean getIsManager() {
		return isManager;
	}
	
	public String getPassword() {
		return password;
	}
	
	
	//TODO: complete method.
	public void setRoomASsignedToEmployee(Room room, Employee e) {
		
	}
	
	public String toString() {
		return "userID: " + userID +
				"\nname: " + name +
				"\nisManager: " + isManager +
				"\npassword: " + password;
	}
}
