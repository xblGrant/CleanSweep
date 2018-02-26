package com.cleansweep;

import javax.persistence.*;
import java.util.Date;

@Entity
public class ReservableRoom extends Room {

	private Status status;

    private Long guestId;
    private Date checkoutTime, wakeUpCall;

    enum Status {
    	VACANTDIRTY("Vacant-Dirty"),
	    VACANTCLEAN("Vacant-Clean"),
	    READY("Ready"),
	    OCCUPIEDDIRTY("Occupied-Dirty"),
	    OCCUPIEDCLEAN("Occupied-Clean"),
	    DONOTDISTURB("Do-Not-Disturb");

	    private String string;

	    Status(String string) {
		    this.string = string;
	    }

	    @Override
	    public String toString() {
		    return string;
	    }
    }

	public ReservableRoom(int num, String name, Long assignedEmployeeId, String status, Long incidentId,
	                      Status status1, Long guestId, Date checkoutTime, Date wakeUpCall) {
		super(num, name, assignedEmployeeId, status, incidentId);
		this.status = status1;
		this.guestId = guestId;
		this.checkoutTime = checkoutTime;
		this.wakeUpCall = wakeUpCall;
	}

	@Override
    public void setStatus(String statusCode) {
        switch (statusCode.toLowerCase()) {
	        case "vacant-dirty" : case "vacantdirty" :
	        	status = Status.VACANTDIRTY;
                break;
            case "vacant-clean" : case "vacantclean" :
            	status = Status.VACANTCLEAN;
            	break;
	        case "ready" :
	        	status = Status.READY;
	        	break;
	        case "occupied-dirty" : case "occupieddirty" :
	        	status = Status.OCCUPIEDDIRTY;
	        	break;
	        case "occupied-clean" : case "occupiedclean" :
	        	status = Status.OCCUPIEDCLEAN;
	        	break;
	        case "do-not-disturb" : case "donotdisturb" :
	        	status = Status.DONOTDISTURB;
	        	break;
	        	default: status = Status.VACANTDIRTY;
        }
    }

    @Override
    public String getStatus(){
        return status.toString();
    }
    @Override
    public boolean isReservable(){
        return true;
    }

	public void setStatus(Status status) {
		this.status = status;
	}

	public Long getGuestId() {
		return guestId;
	}

	public void setGuestId(Long guestId) {
		this.guestId = guestId;
	}

	public Date getCheckoutTime() {
		return checkoutTime;
	}

	public void setCheckoutTime(Date checkoutTime) {
		this.checkoutTime = checkoutTime;
	}

	public Date getWakeUpCall() {
		return wakeUpCall;
	}

	public void setWakeUpCall(Date wakeUpCall) {
		this.wakeUpCall = wakeUpCall;
	}
}
