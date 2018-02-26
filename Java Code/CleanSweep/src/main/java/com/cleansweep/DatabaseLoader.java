package com.example.demo.dB;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader
        implements CommandLineRunner {

    private final RoomRepository roomRepository;

    @Autowired
    public DatabaseLoader(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {

//        jdbcTemplate.query(
//                "Select * FROM room", new Object[] { "room" },
//                (rs, rowNum) -> new Room(rs.getInt("num"), rs.getString("name"),
//                        0L, rs.getString("status"), 0L)
//        );

    }
}
