package com.example.demo.controllers;

import com.example.demo.models.Room;
import com.example.demo.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class RoomRestController {

	@Autowired
	private RoomService roomService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Room> findAllRooms() {
		return roomService.findAll();
	}

}
