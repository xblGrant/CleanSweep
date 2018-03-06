package com.example.demo.bootstrap;

import com.example.demo.models.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader
        implements CommandLineRunner {

	@Autowired
    private final RoomRepository roomRepository;

    @Autowired
    public DatabaseLoader(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {

        jdbcTemplate.query(
                "SELECT * FROM `dbCleanSweep`.`room`;", new Object[] { "roomRepository" },
                (rs, rowNum) -> new Room(rs.getInt("num"), rs.getString("name"),
                        0L, rs.getString("status"), 0L)
        );

    }
}
