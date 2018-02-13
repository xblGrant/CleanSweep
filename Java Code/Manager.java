public class Manager extends Employee {

    Manager(String name, String password){
        super(name, password);
    }
    Manager(Employee emp){
        super(emp);
    }

    @Override
    public boolean isManager(){
        return true;
    }

    //TODO: complete method.
    public void assignRoomToEmployee(ArrayList<Room> roomArrayList, ArrayList<Employee> employeeArrayList) {
        final int NumEmployees = employeeArrayList.size();
        final int NumRooms = roomArrayList.size();



    }
}
