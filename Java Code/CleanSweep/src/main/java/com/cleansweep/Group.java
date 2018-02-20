package com.cleansweep;

import java.util.ArrayList;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Group {
	private ArrayList<Room> rooms;
	private String name;
	private @Id @GeneratedValue int id;
	
	public ArrayList<Room> getRooms() {
		return rooms;
	}

	public void setRooms(ArrayList<Room> rooms) {
		this.rooms = rooms;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

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
