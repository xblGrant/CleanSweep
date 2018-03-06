package com.example.demo.jpa;

import com.example.demo.models.Room;
import org.springframework.data.repository.CrudRepository;

public interface RoomCrudRepository extends CrudRepository<Room, Integer> {
}
