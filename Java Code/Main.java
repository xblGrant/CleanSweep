
public class Main {
    public static void main(String[] args) {
        Employee bruce = new Employee("Bruce", "psswrd");
        System.out.println(bruce.getName());
        System.out.println(bruce.getPassword());
        Incident uhoh = new Incident(102, "fix it", bruce);
        System.out.println(uhoh.getReportingEmployee());
        System.out.println(uhoh.getRoom());
        System.out.println(uhoh.getComment());
        System.out.println(uhoh.isResolved());
    }
}
