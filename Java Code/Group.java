import java.util.ArrayList;

public class Group {
	private ArrayList<Room> rooms;
	private String name;
	
	public Group() {}
	
	public Group(String name) {
		this.name = name;
	}
	
	public void addRoom(Room room) {
		rooms.add(room);
	}
	
	public void removeRoom(int i) {
		rooms.remove(i);
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String toString() {
		return "name: " + name +
				"\nrooms: " + rooms.toString();
	}
}
