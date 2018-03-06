package com.example.demo.service.impl;

import com.example.demo.models.Room;
import com.example.demo.repository.RoomRepository;
import com.example.demo.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

	@Autowired
	private RoomRepository roomRepository;

	@Override
	public List<Room> findAll() {
		List<Room> rooms = new ArrayList<>();

		rooms.addAll(roomRepository.findAll());

		return rooms;
	}

	@Override
	public Room findOne(Integer num) {
		return null;
	}

	@Override
	public List<Room> findByNum(Integer num) {
		return null;
	}

	@Override
	public Room edit(Integer num) {
		return null;
	}
}
