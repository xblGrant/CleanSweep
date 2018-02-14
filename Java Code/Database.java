import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Database {
	static final String DATABASE_URL = "jdbc:ucanaccess://cleansweep.cyvvqf59kbdk.us-east-2.rds.amazonaws.com";
    Connection connection = null;
    Statement statement = null;
    ResultSet rSet = null;
	DateFormat df = new SimpleDateFormat("MM/dd/YYYY");
	
	PreparedStatement searchEmployeeById = null;
	PreparedStatement searchByRoomNumber = null;
	
	
	public Database() {
		try {
			connection = DriverManager.getConnection(DATABASE_URL);
			System.out.println("A connection to the database has been made");
		}
		catch(SQLException e) {
			//TODO: change error message to be useful to user
			 e.printStackTrace();
		}
	}
	
	//Returns all employees with that associated ID
	ResultSet searchEmployeeById(int id) {
		try {
			searchEmployeeById = connection.prepareStatement(
					"SELECT * FROM employee WHERE id = ?");
			
			rSet = searchEmployeeById.executeQuery();
			
			return rSet;
		}
		catch(SQLException e) {
			//TODO: change error message to be useful to user
			e.printStackTrace();
			return null;
		}
	}
	
	ResultSet searchByRoomnumber(int roomnum) {
		try {
			searchByRoomNumber = connection.prepareStatement(
					"SELECT * FROM room WHERE roomnum = ?");
			rSet = searchByRoomNumber.executeQuery();
			
			return rSet;
		}
		catch(SQLException e) {
			//TODO: change error message to be useful to user
			e.printStackTrace();
			return null;
		}
	}
}
