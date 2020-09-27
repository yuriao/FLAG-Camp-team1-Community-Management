package communitymanagement.servicefacade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.entity.AssigneeEntity;
import communitymanagement.model.Staff;
import communitymanagement.model.User;
import communitymanagement.model.WorkAssignment;
import communitymanagement.service.WorkAssignmentService;

@Service
public class AssigneeRecommendationFacadeImpl implements AssigneeRecommendationFacade{
	@Autowired
    private WorkAssignmentService workAssignmentService;

    @Override
    public List<AssigneeEntity> getTicketAssineeRecommendation(int issueCategoryId) {
    	
    	List<AssigneeEntity> recommendation = new ArrayList<>();
    	// get list of work assignment based on issue category id
    	List<WorkAssignment> workAssignment = workAssignmentService.getWorkAssignmentByIssueCategoryId(issueCategoryId);
    	
    	// based on staff category to find list of staff for recommendation
    	List<Staff> targetStaff = new ArrayList<>();
    	for (WorkAssignment wa : workAssignment) {
    		targetStaff.addAll(wa.getStaffCategory().getStaff());
    	}
    	
    	// from list of staff get staff user info
    	for (Staff staff : targetStaff) {
    		User user = staff.getUser();
    		AssigneeEntity recommendAssignee = AssigneeEntity.builder()
    				.name(user.getFirstName() + " " + user.getLastName())
    				.userId(user.getId())
    				.build();
    		recommendation.add(recommendAssignee);
    		
    	}
    	
    	if (recommendation.size() == 0) {
    		return null;
    	}
    	return recommendation;
    }
}
