package communitymanagement.model;

public enum IssueEnum {
	SINK("Sink", 1),
	DISHWASHER("Dishwasher", 2),
	LIGHTNING("Lightning", 3),
	PLUBMING("Plubming", 4),
	HEATING("Heating", 5),
	ELECTRIC("Electric", 6),
	FURNITURE("Furniture", 7),
	WINDOW("Window", 8),
	FLOOR("Floor", 9),
	CEILING("Ceiling", 10),
	EXTERMINATING("Externimating", 11),
	PREVENTATIVE("Preventative", 12),
	AIRCONDITION("Aircondition", 13),
	NETWORK("Network", 14),
	OTHERS("Others", 15);
	
	public String issue;
	public int issueId;
	
	private IssueEnum (String issue, int issueId) {
		this.issue = issue;
		this.issueId = issueId;
	}
	
	public String getIssue() {
		return this.issue;
	}
	
	public int getIssueId() {
		return this.issueId;
	}
	
	public String toString() {
		return this.issue + ": " + this.issueId;
	}
}
