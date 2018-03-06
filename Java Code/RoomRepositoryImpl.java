package com.example.demo.repository.impl;

import com.example.demo.models.Room;
import com.example.demo.jpa.RoomCrudRepository;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class RoomRepositoryImpl implements RoomRepository {

	@Autowired
	private RoomCrudRepository roomCrudRepository;

	@Override
	public List<Room> findAll() {

		List<Room> rooms = new ArrayList<>();
		roomCrudRepository.findAll().forEach(rooms::add);
		return rooms;
	}

	@Override
	public Optional<Room> findByNum(Integer num) {
		return roomCrudRepository.findById(num);
	}

	@Override
	public Room edit(Integer num) {
		Room room = roomCrudRepository.findById(num).get();
		if(room != null) {
			room = new Room(num);
		}
		return room;
	}
}
