package com.example.demo.service;

import com.example.demo.models.Room;

import java.util.List;

public interface RoomService {

	List<Room> findAll();
	Room findOne(Integer num);
	List<Room> findByNum(Integer num);
	Room edit(Integer num);

}
