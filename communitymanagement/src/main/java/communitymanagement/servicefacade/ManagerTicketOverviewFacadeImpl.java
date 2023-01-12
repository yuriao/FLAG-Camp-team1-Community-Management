package communitymanagement.servicefacade;

import java.text.ParseException;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.entity.AssigneeEntity;
import communitymanagement.entity.AssigneeRawData;
import communitymanagement.entity.ManagerTicketOverview;
import communitymanagement.service.TicketWorkAssigneeService;

@Service
public class ManagerTicketOverviewFacadeImpl implements ManagerTicketOverviewFacade {
	@Autowired
	private TicketWorkAssigneeService ticketWorkAssigneeService;

	@Override
	public List<ManagerTicketOverview> getAllManagerTicketOverview() throws ParseException {
		// goal:
		List<ManagerTicketOverview> result = new ArrayList<>();

		// get result:
		//List<AssigneeRawData> ticketStaffRecommend = ticketWorkAssigneeService.getAllPossibleStaffRecommendation();
		List<AssigneeRawData> ticketStaffRecommend = ticketWorkAssigneeService.getAllSuitableStaffRecommendation();
		List<AssigneeRawData> ticketStaffAssigned = ticketWorkAssigneeService.getAllExistingAssignment();
		
		//System.out.println(ticketStaffAssigned.get(0));
		
		// collect from ticketStaffAssigned:
		Map<Integer, ManagerTicketOverview> ticketStaffAssignedMap = new HashMap<>();
		for (AssigneeRawData e : ticketStaffAssigned) {
			int ticketId = e.getTicketId();
			ManagerTicketOverview managerTicketOverview = ticketStaffAssignedMap.get(ticketId);
			ZonedDateTime utc = Instant.ofEpochMilli(e.getCreated().getTime()).atZone(ZoneOffset.UTC);

			AssigneeEntity assignee = AssigneeEntity.builder().name(e.getUserFirstName() + " " + e.getUserLastName())
					.userId(e.getUserId()).build();
			// where to add this assignee
			if (managerTicketOverview == null) {
				List<AssigneeEntity> assignees = new ArrayList<>();
				assignees.add(assignee);
				managerTicketOverview = ManagerTicketOverview.builder().ticketId(e.getTicketId())
						.submittedDate(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(utc))
						.issue(e.getIssueType()).assignees(assignees).recommendStaff(null).build();
				ticketStaffAssignedMap.put(ticketId, managerTicketOverview);
			} else {
				List<AssigneeEntity> assignees = managerTicketOverview.getAssignees();
				assignees.add(assignee);
				managerTicketOverview.setAssignees(assignees);
				ticketStaffAssignedMap.put(ticketId, managerTicketOverview);
			}
		}
		result.addAll(ticketStaffAssignedMap.values());

		// collect from ticketStaffRecommend:
		Map<Integer, ManagerTicketOverview> ticketStaffRecommendMap = new HashMap<>();
		for (AssigneeRawData e : ticketStaffRecommend) {
			int ticketId = e.getTicketId();
			ManagerTicketOverview managerTicketOverview = ticketStaffRecommendMap.get(ticketId);

			AssigneeEntity recommend = AssigneeEntity.builder().name(e.getUserFirstName() + " " + e.getUserLastName())
					.userId(e.getUserId()).build();

			// where to add this assignee
			if (managerTicketOverview == null) {
				List<AssigneeEntity> recommends = new ArrayList<>();
				recommends.add(recommend);
				ZonedDateTime utc = Instant.ofEpochMilli(e.getCreated().getTime()).atZone(ZoneOffset.UTC);
				managerTicketOverview = ManagerTicketOverview.builder().ticketId(e.getTicketId())
						.submittedDate(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(utc))
						.issue(e.getIssueType()).assignees(null).recommendStaff(recommends).build();
				ticketStaffRecommendMap.put(ticketId, managerTicketOverview);
			} else {
				List<AssigneeEntity> recommends = managerTicketOverview.getRecommendStaff();
				recommends.add(recommend);
				managerTicketOverview.setRecommendStaff(recommends);
				ticketStaffRecommendMap.put(ticketId, managerTicketOverview);
			}
		}
		result.addAll(ticketStaffRecommendMap.values());
		return result;
	}
}
