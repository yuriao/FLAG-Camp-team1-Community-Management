package communitymanagement.model;

public enum LocationEnum {
	BALCONY("Balcony", 1), 
	BATHROOM("Bathroom", 2), 
	BEDROOM("Bedroom", 3), 
	CLOSET("Closet", 4), 
	DINING("Dining", 5),
	LIVING("Living", 6), 
	KITCHEN("Kitchen", 7), 
	OTHERS("Others", 8);

	public String location;
	public int locationId;

	private LocationEnum(String location, int locationId) {
		this.location = location;
		this.locationId = locationId;
	}

	public String getLocation() {
		return this.location;
	}

	public int getLocationId() {
		return this.locationId;
	}

	public String toString() {
		return this.location + ": " + this.locationId;
	}
}