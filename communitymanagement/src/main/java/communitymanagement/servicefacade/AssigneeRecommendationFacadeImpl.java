package communitymanagement.servicefacade;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.entity.AssigneeEntity;
import communitymanagement.model.Staff;
import communitymanagement.model.StaffCategory;
import communitymanagement.model.User;
import communitymanagement.model.WorkAssignment;
import communitymanagement.service.StaffCategoryService;
import communitymanagement.service.StaffService;
import communitymanagement.service.WorkAssignmentService;

@Service
public class AssigneeRecommendationFacadeImpl implements AssigneeRecommendationFacade{
	@Autowired
    private WorkAssignmentService workAssignmentService;
		
	@Autowired
	private StaffService staffService;
	
	@Autowired
	private StaffCategoryService staffCategoryService;
	
	
	private List<User> getStaffUsersByWorkAssignment(List<WorkAssignment> workAssignments) {
		if (workAssignments == null | workAssignments.size() == 0) {
			return null;
		}
		// work assignment -> staff category
		Set<Integer> staffCategoryIds = new HashSet<>();
		for (WorkAssignment wa: workAssignments) {
			StaffCategory staffCategory = staffCategoryService.getStaffCategoryByWorkAssignmentId(wa.getId());
			if (staffCategory != null) {
				staffCategoryIds.add(staffCategory.getId());
			}
		}
		if (staffCategoryIds.size() == 0) {
			return null;
		}
		
		// staff category -> user
		Set<User> unique_users = new HashSet<>();
        Iterator<Integer> staffCategoryIdsIter = staffCategoryIds.iterator();
        while (staffCategoryIdsIter.hasNext()) {        	
        	List<Staff> staffs = staffService.getStaffsByCategoryId(staffCategoryIdsIter.next());
        	for (Staff staff : staffs) {
        		unique_users.add(staff.getUser());
        	}
        }
        
        if (unique_users.size() == 0) {
        	return null;
        }
		return new ArrayList<User>(unique_users);
	
	}
		
    @Override
    public List<AssigneeEntity> getTicketAssineeRecommendation(int issueCategoryId) {
    	
    	
    	List<AssigneeEntity> recommendation = new ArrayList<>();
    	// get list of work assignment based on issue category id
    	List<WorkAssignment> workAssignments = workAssignmentService.getWorkAssignmentByIssueCategoryId(issueCategoryId);
    	if (workAssignments == null | workAssignments.size() == 0) {
    		return null;
    	}
    	
    	// get list of staff users based on work assignment 
    	List<User> users = getStaffUsersByWorkAssignment(workAssignments);
    	if (users == null | users.size() == 0) {
    		return null;
    	}
    	
    	// if candidate staff can be found collect info and return
    	for (User user : users) {
    		AssigneeEntity recommendAssignee = AssigneeEntity.builder()
    				.name(user.getFirstName() + " " + user.getLastName())
    				.userId(user.getId())
    				.build();
    		recommendation.add(recommendAssignee);
    		
    	}
  
    	return recommendation;
    }
}
