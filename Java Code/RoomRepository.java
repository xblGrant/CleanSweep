package com.example.demo.repository;

import com.example.demo.models.Room;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository {

	List<Room> findAll();
	Optional<Room> findByNum(Integer num);
	Room edit(Integer num);

}
